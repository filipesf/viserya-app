import { NextRequest } from 'next/server';
import { createRandomMonster } from '@viserya/gpt/actions';
import { handleAction } from '@viserya/utils/handleAction';


export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  return handleAction(request, createRandomMonster);
}
