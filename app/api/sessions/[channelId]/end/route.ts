import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { SessionRecordParams } from '@viserya/types';

export async function POST(
  _request: NextRequest,
  { params: { channelId } }: SessionRecordParams,
) {
  try {
    console.log('🤖 EXECUTING ENDSESSION COMMAND');
    console.log('🔎 CHECKING FOR EXISTING SESSION');

    const existingSession = await sql`
      SELECT * FROM sessions
      WHERE channel_id=${channelId} AND status='active';
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

    console.log('💬 ATTEMPTING TO END ACTIVE SESSION');

    await sql`
      UPDATE sessions
      WHERE id=${existingSession.rows[0].id}
      SET status='ended', end_time=NOW();
    `;

    console.log('🎉 SESSION ENDED SUCCESSFULLY');

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
    console.error(
      '💀 Error while trying to execute the endsession command:',
      NextResponse.json(error),
    );
    return NextResponse.error();
  }
}
