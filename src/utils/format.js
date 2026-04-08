/**
 * Format a number with commas: 9300 → "9,300"
 */
export function formatNumber(n) {
  return new Intl.NumberFormat('en-CA').format(n);
}

/**
 * Format a percentage with sign: 87 → "+87%", -37 → "-37%"
 */
export function formatNetSupport(n) {
  const sign = n > 0 ? '+' : '';
  return `${sign}${n}%`;
}

/**
 * Get color for net support value
 */
export function netSupportColor(n) {
  if (n >= 60) return '#2D9F4F';
  if (n >= 30) return '#F9A825';
  if (n >= 0) return '#FF6B35';
  return '#D63031';
}

/**
 * Clamp a value between min and max
 */
export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}
