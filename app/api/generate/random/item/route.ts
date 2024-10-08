import { NextRequest, NextResponse } from 'next/server';
import { createRandomItem } from '@viserya/services/gpt/actions';
import { handleMiddleware } from '@viserya/services/handleMiddleware';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authResponse = await handleMiddleware(request);
  if (authResponse) return authResponse;

  const data = await createRandomItem();

  return NextResponse.json(data, { status: 200 });
}
