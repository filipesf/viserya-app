import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { SessionsParams } from '@viserya/types';

export async function POST(
  _request: NextRequest,
  { params: { channelId } }: SessionsParams,
) {
  try {
    const existingSession = await sql`
      SELECT * FROM sessions
      WHERE channel_id = ${channelId} AND status = 'active'
    `;

    if (existingSession.rows.length === 0) {
      return NextResponse.json(
        {
          type: 4,
          ephemeral: true,
          data: {
            content: 'There is no active session in this channel.',
          },
        },
        { status: 200 },
      );
    }

    await sql`
      UPDATE sessions
      SET status = 'ended', end_time = NOW()
      WHERE id = ${existingSession.rows[0].id}
    `;

    return NextResponse.json(
      {
        type: 4,
        data: {
          content: 'Session ended successfully!',
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
