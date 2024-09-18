import { NextRequest, NextResponse } from 'next/server';
import { AUTHORIZATION_KEY } from '@viserya/config/constants';

export default async function middleware(request: NextRequest) {
  console.log('🐞', request);
  console.log('--------------------------------');
  console.log(`🐞 Request method: ${request.method}`);
  console.log('--------------------------------');
  console.log(`🐞 Request path: ${request.nextUrl.pathname}`);
  console.log('--------------------------------');

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers':
          'Content-Type, Authorization, AUTHORIZATION_KEY',
      },
    });
  }

  const exceptionPaths = ['/api/bot/interactions'];

  if (
    exceptionPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.next();
  }

  const authKey = request.headers.get('AUTHORIZATION_KEY');

  console.log(`🐞 Auth key: ${authKey}`);
  console.log('--------------------------------');

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

  console.log('🔑 REQUEST AUTHENTICATED');

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
