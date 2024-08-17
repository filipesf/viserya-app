import { NextRequest, NextResponse } from 'next/server';
import { AUTHORIZATION_KEY } from '@viserya/config/constants';

export default async function middleware(request: NextRequest) {
  // List of URL paths to exclude from the authorization check
  const exceptionPaths = ['/api/bot/interactions'];

  // Check if the current request URL matches any of the exception paths
  if (
    exceptionPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    // If the request matches an exception, skip the authorization check
    return NextResponse.next();
  }

  const authKey = request.headers.get('AUTHORIZATION_KEY');

  if (!authKey || authKey !== AUTHORIZATION_KEY) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers':
          'Content-Type, Authorization, AUTHORIZATION_KEY',
      },
    });
  }

  const response = NextResponse.next();

  // Adding CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, AUTHORIZATION_KEY',
  );

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
