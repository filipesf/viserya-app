import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { discordApi } from '@viserya/services/bot/discordApi';
import { SessionRecordParams } from '@viserya/types';
import { convertKeys } from '@viserya/utils/convertKeys';
import { plural } from '@viserya/utils/plural';

export async function GET(
  request: NextRequest,
  { params: { channelId } }: SessionRecordParams,
) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const application_id = searchParams.get('application_id');
  const token = searchParams.get('token');
  const shouldCallDiscord = (id || application_id) && token;

  try {
    console.log(`🔎 CHECKING FOR EXISTING SESSIONS IN ${channelId} CHANNEL`);

    if (shouldCallDiscord) {
      await discordApi.post(`/interactions/${id}/${token}/callback`, {
        type: 5,
        data: {
          content: 'Weaving the threads of your request...',
          flags: 64,
        },
      });
    }

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
    const messageContent: string =
      activeSessionInChannel === undefined
        ? 'No active sessions pulse within this channel.'
        : 'One daring session stands in the spotlight of this channel.';

    if (shouldCallDiscord) {
      await discordApi.patch(
        `/webhooks/${application_id}/${token}/messages/@original`,
        { content: `🤖 ${messageContent}` },
      );
    }

    console.log('✅ REQUEST COMPLETED');

    return NextResponse.json(
      {
        sessionsInChannel,
        totalSessionsCount,
        activeSessionInChannel,
        endedSessionsInChannel,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      '💀 Error while trying to retrieve sessions from channel:',
      error,
    );

    if (shouldCallDiscord) {
      await discordApi.patch(
        `/webhooks/${application_id}/${token}/messages/@original`,
        {
          content:
            'A misfortune has struck while fetching session details. Please try again later.',
        },
      );
    }

    return NextResponse.error();
  }
}
