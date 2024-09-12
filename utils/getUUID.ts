import crypto from 'crypto';

/**
 * Generates a random unique ID similar to OpenAI's assistant_ID or thread_ID.
 * @param length - The length of the ID to generate (default: 21 characters).
 * @returns A unique ID string.
 */
export function getUUID(length: number = 21): string {
  // Generate a buffer of random bytes
  const randomBytes = crypto.randomBytes(Math.ceil(length * 0.75)); // Base64 will increase size by ~33%

  // Convert the random bytes to a base64 URL-safe string
  let id = randomBytes
    .toString('base64')
    .replace(/\+/g, '')
    .replace(/\//g, '')
    .replace(/=+$/, '');

  // Trim the string to the desired length
  return id.substring(0, length);
}
