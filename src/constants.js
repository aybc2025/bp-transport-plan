// ── Design Tokens ──────────────────────────────────────────────────
export const COLORS = {
  primary: '#0A5E8A',
  primaryLight: '#0D7AB5',
  secondary: '#00B4D8',
  accent: '#FF6B35',
  success: '#2D9F4F',
  danger: '#D63031',
  warning: '#F9A825',
  neutral900: '#1A1A2E',
  neutral50: '#F8F9FA',
};

// ── Route Change Types ──────────────────────────────────────────
export const CHANGE_TYPES = {
  new: { label: 'New Route', color: COLORS.success, bg: '#ECFDF5', icon: '＋' },
  modify: { label: 'Modified', color: COLORS.accent, bg: '#FFF7ED', icon: '✎' },
  remove: { label: 'Removed', color: COLORS.danger, bg: '#FEF2F2', icon: '✕' },
};

// ── Map Config ──────────────────────────────────────────────────
export const MAP_CONFIG = {
  center: [-123.05, 49.25],
  zoom: 11.5,
  minZoom: 9,
  maxZoom: 18,
  bounds: [[-123.27, 49.19], [-122.89, 49.31]],
  tileUrl: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
};

// ── SkyTrain line colors ────────────────────────────────────────
export const SKYTRAIN_COLORS = {
  'Expo Line': '#0033a0',
  'Millennium Line': '#ffcd00',
  'Canada Line': '#009AC7',
};

// ── Navigation Items ────────────────────────────────────────────
export const NAV_ITEMS = [
  { id: 'map', label: 'Map', icon: 'map' },
  { id: 'routes', label: 'Routes', icon: 'route' },
  { id: 'dashboard', label: 'Plan', icon: 'dashboard' },
  { id: 'timeline', label: 'Timeline', icon: 'timeline' },
];

// ── Dashboard Tabs ──────────────────────────────────────────────
export const DASHBOARD_TABS = [
  { id: 'bus', label: 'Bus Service', goals: '1–3' },
  { id: 'active', label: 'Active Transport', goals: '4–5' },
  { id: 'goods', label: 'Goods Movement', goals: '6–8' },
  { id: 'engagement', label: 'Engagement', goals: '' },
];

// ── Neighbourhoods for "What's near me?" ────────────────────────
export const NEIGHBOURHOODS = [
  { name: 'Kitsilano', lat: 49.2667, lon: -123.1625 },
  { name: 'Mount Pleasant', lat: 49.2625, lon: -123.1005 },
  { name: 'Commercial Drive', lat: 49.2705, lon: -123.0694 },
  { name: 'Metrotown', lat: 49.2276, lon: -123.0008 },
  { name: 'Downtown Vancouver', lat: 49.2827, lon: -123.1207 },
  { name: 'UBC', lat: 49.2606, lon: -123.2460 },
  { name: 'Burnaby Heights', lat: 49.2827, lon: -123.0167 },
  { name: 'New Westminster', lat: 49.2057, lon: -122.9110 },
  { name: 'Marpole', lat: 49.2108, lon: -123.1288 },
  { name: 'Renfrew-Collingwood', lat: 49.2467, lon: -123.0357 },
  { name: 'South Vancouver', lat: 49.2185, lon: -123.1042 },
  { name: 'Kerrisdale', lat: 49.2333, lon: -123.1560 },
  { name: 'Hastings-Sunrise', lat: 49.2811, lon: -123.0417 },
  { name: 'Dunbar', lat: 49.2497, lon: -123.1867 },
  { name: 'Stanley Park', lat: 49.3017, lon: -123.1417 },
];

// ── Data file paths ─────────────────────────────────────────────
const base = import.meta.env.BASE_URL;
export const DATA_PATHS = {
  routes: `${base}data/routes.geojson`,
  proposedRoutes: `${base}data/proposedRoutes.geojson`,
  stops: `${base}data/stops.geojson`,
  stations: `${base}data/stations.geojson`,
  planActions: `${base}data/planActions.json`,
  surveyResults: `${base}data/surveyResults.json`,
  timelineEvents: `${base}data/timelineEvents.json`,
  cyclingGaps: `${base}data/cyclingGaps.json`,
  transitPriority: `${base}data/transitPriority.json`,
  keyStats: `${base}data/keyStats.json`,
};
