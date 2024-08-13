import { NextRequest } from 'next/server';
import { writeLore } from '@viserya/gpt/actions';
import { handleAction } from '@viserya/utils';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  return handleAction(request, writeLore);
}
