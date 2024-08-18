import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { SessionsParams } from '@viserya/types';

export async function GET(
  _request: Response,
  { params: { channelId } }: SessionsParams,
) {
  try {
    const result = await sql`
      SELECT * FROM sessions
      WHERE channel_id = ${channelId} AND status = 'active'
    `;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
