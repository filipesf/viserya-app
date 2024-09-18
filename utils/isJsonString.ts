/**
 * Checks if a given string is a valid JSON string.
 *
 * @param {string} str - The string to check.
 * @returns {boolean} true if the string is a valid JSON string, false otherwise.
 */
export function isJsonString(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}
