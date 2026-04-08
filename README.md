# BP Transport Plan Explorer

Interactive web application for exploring the Burrard Peninsula Area Transport Plan (BP ATP) — understanding what's changing, where, when, and why.

**"Find out what's changing in your neighbourhood in 30 seconds, not 30 pages."**

## Features

- **Interactive Map** — Leaflet + OpenStreetMap map with bus routes, SkyTrain lines, stations, and layer toggles
- **Route Explorer** — Search and browse all 59 route change proposals with support/opposition data
- **Dashboard** — Four tabbed sections covering bus service, active transport, goods movement, and public engagement
- **Timeline** — Implementation milestones from 2026 to 2041+ with dependency tracking
- **Key Numbers** — Animated engagement statistics infographic
- **Search** — Unified search across routes, stops, and neighbourhoods (⌘K)
- **PWA** — Installable, works offline with cached data

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 (Vite) |
| Styling | Tailwind CSS 4 |
| Maps | Leaflet + OpenStreetMap/CARTO (free, no API key) |
| State | Zustand |
| Hosting | GitHub Pages |

**100% static. No backend. No database. No auth. No API keys. No secrets.**

## Quick Start

```bash
git clone https://github.com/<user>/bp-transport-plan.git
cd bp-transport-plan
npm install          # generates package-lock.json (must be committed for CI)
npm run dev          # → http://localhost:5173
```

Data files are already in `public/data/` — no build step needed. No API tokens required.

> **Important:** `package-lock.json` must be committed to Git. The CI/CD pipeline
> uses `npm ci` which requires it. Run `npm install` once locally before your first push.

## Deploy to GitHub Pages

```bash
npm run build        # outputs to dist/
git add -A && git commit -m "Initial commit"
git push origin main
# GitHub Actions deploys automatically — no secrets to configure
```

In GitHub: Settings → Pages → Source → GitHub Actions.

## Updating GTFS Data

Only needed if the GTFS source data changes:

```bash
mkdir -p gtfs-source
cp ~/Downloads/{routes,trips,shapes,stops}.txt gtfs-source/
npm run build:data   # regenerates public/data/*.geojson
git add public/data/ && git commit -m "Update GTFS data"
```

## Project Structure

```
src/
├── main.jsx, App.jsx         — Entry points
├── constants.js, store.js    — Config + Zustand state
├── components/
│   ├── layout/               — AppShell, Header, BottomNav, Sidebar
│   ├── map/                  — TransitMap, RouteLayer, StationMarkers, MapControls, MapLegend
│   ├── dashboard/            — TabContainer, BusServiceTab, GoalCard, ActionDetail, etc.
│   ├── routes-explorer/      — RouteSearch, RouteCard, SupportBar, BeforeAfter
│   ├── timeline/             — TimelineContent, TimelineNode, PhaseFilter
│   ├── stats/                — KeyNumbers, SupportChart, AnimatedCounter
│   └── shared/               — SearchOverlay, FilterPanel, LoadingSpinner, ErrorBoundary
├── hooks/                    — useRouteData, useSurveyData, useSearch, etc.
├── styles/                   — globals.css, map.css, animations.css
└── utils/                    — format.js, geo.js, search.js, accessibility.js
```

## Data Sources

- **GTFS** — TransLink's General Transit Feed Specification data
- **BP ATP PDF** — Burrard Peninsula Area Transport Plan, Final Report, March 2026

## License

This application is a civic engagement tool. Transit data © TransLink.
