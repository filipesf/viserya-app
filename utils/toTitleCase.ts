/**
 * Converts a string to title case.
 *
 * Title case is a convention in which the first word of a sentence is capitalized,
 * and each subsequent word is capitalized if it is not a preposition or article.
 *
 * @param content - The string to convert to title case.
 * @returns A new string in title case.
 * @example
 *
 * toTitleCase("hello world") // "Hello World"
 */
export function toTitleCase(content: string) {
  return content.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
}
