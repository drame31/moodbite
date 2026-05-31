// src/utils/recommendationUtils.js
// All functions are pure. No React imports. No side effects. No mutation.

/**
 * Returns all recommendations for a given mood id.
 * O(1) lookup on the grouped data object.
 * Returns [] if moodId is unknown — never throws.
 */
export function getRecsForMood(data, moodId) {
  if (!data || !moodId) return [];
  return data[moodId] ?? [];
}

/**
 * Filters recommendations by active tags using AND logic.
 * A rec is included only if it contains ALL active tags.
 * Empty/null activeTags returns the full recs array unchanged.
 * Never mutates the input array.
 *
 * WHY AND: with 6 tags and 5 recs per mood, OR logic returns near-universal
 * matches — making filters feel decorative. AND means "narrow to exactly this."
 */
export function filterByTags(recs, activeTags) {
  if (!recs) return [];
  if (!activeTags || activeTags.length === 0) return recs;
  return recs.filter(rec =>
    activeTags.every(tag => rec.tags.includes(tag))
  );
}

/**
 * Picks a random recommendation from a pool.
 * Returns null if pool is empty — caller handles null.
 */
export function pickRandom(pool) {
  if (!pool || pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Picks the next recommendation, excluding the current one.
 *
 * Guarantees no immediate repeat if pool.length > 1.
 * If pool has only 1 item, returns that item (nowhere else to go).
 * Returns null only if the pool is empty.
 */
export function getNextRecommendation(pool, currentId) {
  if (!pool || pool.length === 0) return null;
  const others = pool.filter(rec => rec.id !== currentId);
  if (others.length === 0) return pool[0]; // single item — no choice
  return pickRandom(others);
}

/**
 * Returns true if a recommendation with the given id exists in favorites.
 * Used to drive isFavorite prop on RecommendationCard.
 */
export function isDuplicate(favorites, id) {
  if (!favorites || !id) return false;
  return favorites.some(fav => fav.id === id);
}

/**
 * Returns a new favorites array with rec appended — only if not already present.
 * Returns the original array reference on duplicate (prevents needless re-render).
 * Safe to use as a functional updater: setFavorites(prev => addFavorite(prev, rec))
 */
export function addFavorite(favorites, recommendation) {
  if (!favorites || !recommendation) return favorites ?? [];
  if (isDuplicate(favorites, recommendation.id)) return favorites;
  return [...favorites, recommendation];
}

/**
 * Returns a new favorites array with the given id removed.
 * Returns original reference if id not found.
 */
export function removeFavorite(favorites, id) {
  if (!favorites || !id) return favorites ?? [];
  return favorites.filter(fav => fav.id !== id);
}

