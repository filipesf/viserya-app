import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { threadId, channelId, userId } = body;

  try {
    const result = await sql`
    INSERT INTO sessions (thread_id, channel_id, user_id)
    VALUES (${threadId}, ${channelId}, ${userId})
    RETURNING id
  `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
