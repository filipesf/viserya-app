import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { SessionsParams } from '@viserya/types';
import { plural } from '@viserya/utils/plural';

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
    const totalSessionsCount = result.rowCount || 0;
    const replyToChannel: string =
      totalSessionsCount === 0
        ? 'There are no active sessions in this channel.'
        : `There's a total of ${totalSessionsCount} session${plural(totalSessionsCount)} in this channel.`;

    console.log(`🧐 ${replyToChannel}`);

    return NextResponse.json(
      {
        sessionsInChannel,
        totalSessionsCount,
        activeSessionInChannel,
        replyToChannel,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      '💀 Error while trying to retrieve sessions from channel:',
      NextResponse.json(error),
    );
    return NextResponse.error();
  }
}
