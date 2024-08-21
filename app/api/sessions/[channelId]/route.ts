import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { SessionsParams } from '@viserya/types';

export async function GET(
  _request: NextRequest,
  { params: { channelId } }: SessionsParams,
) {
  try {
    console.log(`🔎 CHECKING FOR EXISTING SESSIONS IN ${channelId} CHANNEL`);

    const result = await sql`
      SELECT * FROM sessions
      WHERE channel_id = ${channelId};
    `;

    console.log('✅ SESSIONS RETRIEVED');

    const sessionsInChannel = result.rows;
    const activeSessionInChannel = result.rows.filter(
      (session) => session.status === 'active',
    );
    const totalSessionsCount = result.rowCount;

    console.log(
      `🧐 THERE'S A TOTAL OF ${totalSessionsCount} IN ${channelId} CHANNEL`,
    );

    return NextResponse.json(
      {
        sessionsInChannel,
        totalSessionsCount,
        activeSessionInChannel,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      '💀 Error while trying to delete sessions from channel:',
      NextResponse.json(error),
    );
    return NextResponse.error();
  }
}
