import { NextRequest } from 'next/server';
import { createRandomLocation } from '@viserya/services/gpt/actions';
import { handleAction } from '@viserya/services/handleAction';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  return handleAction(request, createRandomLocation);
}
