/**
 * Simple fuzzy search (no external dependency for initial build).
 * Matches if all characters in query appear in target in order.
 */
export function fuzzyMatch(query, target) {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (t.includes(q)) return { match: true, score: t.indexOf(q) === 0 ? 2 : 1 };

  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return { match: qi === q.length, score: 0.5 };
}

/**
 * Search across an array of items with weighted fields
 */
export function searchItems(items, query, fields) {
  if (!query || query.length < 1) return items;

  const results = [];
  for (const item of items) {
    let bestScore = 0;
    for (const { key, weight = 1 } of fields) {
      const value = String(item[key] || '');
      const { match, score } = fuzzyMatch(query, value);
      if (match) bestScore = Math.max(bestScore, score * weight);
    }
    if (bestScore > 0) results.push({ item, score: bestScore });
  }

  results.sort((a, b) => b.score - a.score);
  return results.map((r) => r.item);
}
