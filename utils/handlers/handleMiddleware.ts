import { NextRequest } from 'next/server';
import middleware from '@viserya/middleware';

/**
 * Middleware handling function.
 * Checks authorization by calling the middleware function.
 * @param request - The incoming request object.
 * @returns The authorization response if not authorized, otherwise null.
 */
export async function handleMiddleware(request: NextRequest) {
  const authResponse = await middleware(request);
  if (authResponse.status !== 200) {
    return authResponse; // If not authorized, return the response from the middleware
  }
  return null;
}
