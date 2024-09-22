import { NextRequest, NextResponse } from 'next/server';
import { createRandomSessionName } from '@viserya/services/gpt/actions';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const result = await createRandomSessionName(body.type);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error creating entity:', error);
    return NextResponse.json(
      { error: 'Failed to create entity' },
      { status: 500 },
    );
  }
}
