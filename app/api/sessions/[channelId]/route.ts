import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { SessionRecordParams } from '@viserya/types';
import { convertKeys } from '@viserya/utils/convertKeys';
import { plural } from '@viserya/utils/plural';

export async function GET(
  _request: NextRequest,
  { params: { channelId } }: SessionRecordParams,
) {
  try {
    console.log(`🔎 CHECKING FOR EXISTING SESSIONS IN ${channelId} CHANNEL`);

    const result = await sql`
      SELECT * FROM sessions
      WHERE channel_id=${channelId};
    `;

    console.log('📦 SESSIONS RETRIEVED');

    const sessionsInChannel = convertKeys(result.rows);
    const activeSessionInChannel = sessionsInChannel.filter(
      (session: any) => session.status === 'active',
    )[0];
    const endedSessionsInChannel = sessionsInChannel.filter(
      (session: any) => session.status === 'ended',
    );
    const totalSessionsCount = result.rowCount || 0;
    const replyToChannel: string =
      totalSessionsCount === 0
        ? 'There are no active sessions in this channel.'
        : `There's a total of ${totalSessionsCount} session${plural(totalSessionsCount)} in this channel.`;

    console.log('✅ REQUEST COMPLETED');

    return NextResponse.json(
      {
        sessionsInChannel,
        totalSessionsCount,
        activeSessionInChannel,
        endedSessionsInChannel,
        replyToChannel,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      '💀 Error while trying to retrieve sessions from channel:',
      error,
    );
    return NextResponse.error();
  }
}
