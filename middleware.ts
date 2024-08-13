import { NextRequest, NextResponse } from 'next/server';
import { AUTHORIZATION_KEY } from '@viserya/config/constants';

export default async function middleware(request: NextRequest) {
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
