/**
 * Shuffles an array in place.
 *
 * @template T
 * @param {T[]} array
 * @returns {T[]} the same array, shuffled
 */
export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
