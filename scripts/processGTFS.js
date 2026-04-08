#!/usr/bin/env node
/**
 * processGTFS.js — One-time GTFS → GeoJSON processor
 *
 * Reads raw GTFS files from gtfs-source/ and produces lightweight,
 * web-optimized GeoJSON/JSON files in public/data/.
 *
 * Usage:
 *   npm run build:data
 *   # or: node scripts/processGTFS.js
 *
 * Input:  gtfs-source/{routes,trips,shapes,stops,directions,direction_names_exceptions}.txt
 * Output: public/data/{routes,stops,stations}.geojson
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const GTFS = join(ROOT, 'gtfs-source');
const OUT = join(ROOT, 'public', 'data');

// Burrard Peninsula bounding box
const BP_BOUNDS = {
  minLat: 49.19,
  maxLat: 49.31,
  minLon: -123.27,
  maxLon: -122.89,
};

// ── Helpers ─────────────────────────────────────────────────────────

function parseCSV(filepath) {
  const text = readFileSync(filepath, 'utf8');
  const lines = text.trim().split('\n');
  const headers = lines[0].replace(/^\uFEFF/, '').split(',').map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = (values[i] || '').trim();
    });
    return obj;
  });
}

/**
 * Douglas-Peucker line simplification
 * @param {number[][]} coords - Array of [lon, lat] pairs
 * @param {number} tolerance - Tolerance in degrees (~0.0001° ≈ 11m)
 * @returns {number[][]} Simplified coordinates
 */
function simplifyLine(coords, tolerance) {
  if (coords.length <= 2) return coords;

  let maxDist = 0;
  let maxIdx = 0;
  const first = coords[0];
  const last = coords[coords.length - 1];

  for (let i = 1; i < coords.length - 1; i++) {
    const d = perpendicularDistance(coords[i], first, last);
    if (d > maxDist) {
      maxDist = d;
      maxIdx = i;
    }
  }

  if (maxDist > tolerance) {
    const left = simplifyLine(coords.slice(0, maxIdx + 1), tolerance);
    const right = simplifyLine(coords.slice(maxIdx), tolerance);
    return left.slice(0, -1).concat(right);
  }

  return [first, last];
}

function perpendicularDistance(point, lineStart, lineEnd) {
  const dx = lineEnd[0] - lineStart[0];
  const dy = lineEnd[1] - lineStart[1];
  const mag = Math.sqrt(dx * dx + dy * dy);
  if (mag === 0) {
    return Math.sqrt(
      (point[0] - lineStart[0]) ** 2 + (point[1] - lineStart[1]) ** 2
    );
  }
  const u =
    ((point[0] - lineStart[0]) * dx + (point[1] - lineStart[1]) * dy) /
    (mag * mag);
  const t = Math.max(0, Math.min(1, u));
  const closestX = lineStart[0] + t * dx;
  const closestY = lineStart[1] + t * dy;
  return Math.sqrt((point[0] - closestX) ** 2 + (point[1] - closestY) ** 2);
}

function roundCoord(c) {
  return [Math.round(c[0] * 100000) / 100000, Math.round(c[1] * 100000) / 100000];
}

// ── Main ────────────────────────────────────────────────────────────

function main() {
  console.log('🚌 GTFS → GeoJSON Processor');
  console.log('===========================\n');

  // Verify input files exist
  const requiredFiles = ['routes.txt', 'trips.txt', 'shapes.txt', 'stops.txt'];
  for (const f of requiredFiles) {
    if (!existsSync(join(GTFS, f))) {
      console.error(`❌ Missing: gtfs-source/${f}`);
      console.error('Place raw GTFS files in gtfs-source/ and run again.');
      process.exit(1);
    }
  }

  // ── Step 1: Read routes ──
  console.log('Step 1: Reading routes...');
  const routes = parseCSV(join(GTFS, 'routes.txt'));
  const routeMap = {};
  routes.forEach((r) => {
    routeMap[r.route_id] = {
      id: r.route_id,
      shortName: r.route_short_name || '',
      longName: r.route_long_name || '',
      type: parseInt(r.route_type, 10),
      color: r.route_color || null,
      textColor: r.route_text_color || null,
    };
  });
  console.log(`  → ${routes.length} routes loaded\n`);

  // ── Step 2: Read direction names ──
  console.log('Step 2: Reading direction names...');
  const dirNames = {};
  if (existsSync(join(GTFS, 'direction_names_exceptions.txt'))) {
    const dirData = parseCSV(join(GTFS, 'direction_names_exceptions.txt'));
    dirData.forEach((d) => {
      const key = `${d.route_name}_${d.direction_id}`;
      dirNames[key] = d.direction_name;
    });
    console.log(`  → ${dirData.length} direction name overrides\n`);
  }

  // ── Step 3: Find one shape per route+direction ──
  console.log('Step 3: Reading trips (finding representative shapes)...');
  const trips = parseCSV(join(GTFS, 'trips.txt'));
  const routeShapes = {};
  trips.forEach((t) => {
    const key = `${t.route_id}_${t.direction_id}`;
    if (!routeShapes[key] && t.shape_id) {
      routeShapes[key] = {
        route_id: t.route_id,
        direction_id: t.direction_id,
        shape_id: t.shape_id,
        headsign: t.trip_headsign || '',
      };
    }
  });
  const neededShapeIds = new Set(
    Object.values(routeShapes).map((rs) => rs.shape_id)
  );
  console.log(`  → ${trips.length} trips → ${Object.keys(routeShapes).length} unique route-directions`);
  console.log(`  → ${neededShapeIds.size} unique shapes needed\n`);

  // ── Step 4: Read shapes (streaming for memory efficiency) ──
  console.log('Step 4: Reading shapes...');
  const shapesText = readFileSync(join(GTFS, 'shapes.txt'), 'utf8');
  const shapeLines = shapesText.trim().split('\n');
  const shapeHeaders = shapeLines[0].replace(/^\uFEFF/, '').split(',').map((h) => h.trim());
  const sidIdx = shapeHeaders.indexOf('shape_id');
  const latIdx = shapeHeaders.indexOf('shape_pt_lat');
  const lonIdx = shapeHeaders.indexOf('shape_pt_lon');
  const seqIdx = shapeHeaders.indexOf('shape_pt_sequence');

  const shapePoints = {};
  let totalParsed = 0;
  for (let i = 1; i < shapeLines.length; i++) {
    const vals = shapeLines[i].split(',');
    const sid = vals[sidIdx];
    if (!neededShapeIds.has(sid)) continue;
    if (!shapePoints[sid]) shapePoints[sid] = [];
    shapePoints[sid].push({
      lat: parseFloat(vals[latIdx]),
      lon: parseFloat(vals[lonIdx]),
      seq: parseInt(vals[seqIdx], 10),
    });
    totalParsed++;
  }

  // Sort each shape by sequence
  Object.values(shapePoints).forEach((pts) => pts.sort((a, b) => a.seq - b.seq));
  console.log(`  → ${shapeLines.length - 1} total points → ${totalParsed} relevant points`);
  console.log(`  → ${Object.keys(shapePoints).length} shapes built\n`);

  // ── Step 5: Build routes GeoJSON ──
  console.log('Step 5: Building routes GeoJSON with simplification...');
  const routeFeatures = [];
  Object.values(routeShapes).forEach((rs) => {
    const pts = shapePoints[rs.shape_id];
    if (!pts || pts.length === 0) return;
    const route = routeMap[rs.route_id];
    if (!route) return;

    let coords = pts.map((p) => [p.lon, p.lat]);
    // Apply Douglas-Peucker simplification (0.0001° ≈ 11m)
    coords = simplifyLine(coords, 0.0001);
    coords = coords.map(roundCoord);

    routeFeatures.push({
      type: 'Feature',
      properties: {
        routeId: route.id,
        shortName: route.shortName,
        longName: route.longName,
        routeType: route.type,
        color: route.color,
        textColor: route.textColor,
        directionId: parseInt(rs.direction_id, 10),
        headsign: rs.headsign,
      },
      geometry: {
        type: 'LineString',
        coordinates: coords,
      },
    });
  });

  const routesGeoJSON = { type: 'FeatureCollection', features: routeFeatures };
  const routesPath = join(OUT, 'routes.geojson');
  writeFileSync(routesPath, JSON.stringify(routesGeoJSON));
  const routesSizeKB = (JSON.stringify(routesGeoJSON).length / 1024).toFixed(0);
  console.log(`  → ${routeFeatures.length} route features → ${routesSizeKB}KB\n`);

  // ── Step 6: Build stops GeoJSON ──
  console.log('Step 6: Reading and filtering stops to Burrard Peninsula...');
  const stops = parseCSV(join(GTFS, 'stops.txt'));

  // Regular bus stops within BP bounding box
  const busStopFeatures = [];
  const stationFeatures = [];

  stops.forEach((s) => {
    const lat = parseFloat(s.stop_lat);
    const lon = parseFloat(s.stop_lon);
    const locType = parseInt(s.location_type || '0', 10);

    // SkyTrain parent stations (location_type=1) — keep all
    if (locType === 1) {
      stationFeatures.push({
        type: 'Feature',
        properties: {
          stopId: s.stop_id,
          name: s.stop_name,
          code: s.stop_code || null,
          locationType: locType,
          wheelchairBoarding: parseInt(s.wheelchair_boarding || '0', 10),
          zone: s.zone_id || null,
        },
        geometry: {
          type: 'Point',
          coordinates: [
            Math.round(lon * 100000) / 100000,
            Math.round(lat * 100000) / 100000,
          ],
        },
      });
      return;
    }

    // Filter bus stops (location_type=0) to BP bounding box
    if (
      locType === 0 &&
      lat >= BP_BOUNDS.minLat &&
      lat <= BP_BOUNDS.maxLat &&
      lon >= BP_BOUNDS.minLon &&
      lon <= BP_BOUNDS.maxLon
    ) {
      busStopFeatures.push({
        type: 'Feature',
        properties: {
          stopId: s.stop_id,
          name: s.stop_name,
          code: s.stop_code || null,
          wheelchairBoarding: parseInt(s.wheelchair_boarding || '0', 10),
          zone: s.zone_id || null,
        },
        geometry: {
          type: 'Point',
          coordinates: [
            Math.round(lon * 100000) / 100000,
            Math.round(lat * 100000) / 100000,
          ],
        },
      });
    }
  });

  const stopsGeoJSON = { type: 'FeatureCollection', features: busStopFeatures };
  const stopsPath = join(OUT, 'stops.geojson');
  writeFileSync(stopsPath, JSON.stringify(stopsGeoJSON));
  const stopsSizeKB = (JSON.stringify(stopsGeoJSON).length / 1024).toFixed(0);

  const stationsGeoJSON = { type: 'FeatureCollection', features: stationFeatures };
  const stationsPath = join(OUT, 'stations.geojson');
  writeFileSync(stationsPath, JSON.stringify(stationsGeoJSON));
  const stationsSizeKB = (JSON.stringify(stationsGeoJSON).length / 1024).toFixed(0);

  console.log(`  → ${stops.length} total stops`);
  console.log(`  → ${busStopFeatures.length} bus stops in BP area → ${stopsSizeKB}KB`);
  console.log(`  → ${stationFeatures.length} parent stations → ${stationsSizeKB}KB\n`);

  // ── Summary ──
  console.log('✅ Processing complete!');
  console.log('========================');
  console.log(`Output files in public/data/:`);
  console.log(`  routes.geojson   ${routesSizeKB}KB  (${routeFeatures.length} features)`);
  console.log(`  stops.geojson    ${stopsSizeKB}KB  (${busStopFeatures.length} features)`);
  console.log(`  stations.geojson ${stationsSizeKB}KB  (${stationFeatures.length} features)`);
}

main();
