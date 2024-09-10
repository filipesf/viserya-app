import { NextRequest } from 'next/server';
import { createRandomTavern } from '@viserya/gpt/actions';
import { handleAction } from '@viserya/services/handleAction';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  return handleAction(request, createRandomTavern);
}
