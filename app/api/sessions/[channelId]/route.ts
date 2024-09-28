import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { discordApi } from '@viserya/services/bot/discordApi';
import { SessionsRecord, SessionRecordParams } from '@viserya/types';
import { convertKeys } from '@viserya/utils/convertKeys';

export async function GET(
  request: NextRequest,
  { params: { channelId } }: SessionRecordParams,
) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const applicationId = searchParams.get('applicationId');
  const token = searchParams.get('token');
  const shouldCallDiscord = (id || applicationId) && token;

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
        `/webhooks/${applicationId}/${token}/messages/@original`,
        { content: messageContent },
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
        `/webhooks/${applicationId}/${token}/messages/@original`,
        {
          content:
            'A misfortune has struck while fetching session details. Please try again later.',
        },
      );
    }

    return NextResponse.error();
  }
}

export async function PUT(
  request: NextRequest,
  { params: { channelId } }: SessionRecordParams,
) {
  const requestJson = await request.json();
  const { id, status } = requestJson as SessionsRecord;

  if (!status) {
    return NextResponse.json(
      { error: '💀 `status` parameter is required.' },
      { status: 400 },
    );
  }

  try {
    await sql`BEGIN`;

    const result = await sql`
      UPDATE sessions
      SET status=${status}, end_time=NOW()
      WHERE id=${id} AND channel_id=${channelId};
    `;

    if (result.rowCount === 0) {
      throw new Error('No session found to delete');
    }

    await sql`COMMIT`;

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('💀 Error while trying to update the session:', error);
    return NextResponse.json({ error });
  }
}

export async function DELETE(
  request: NextRequest,
  { params: { channelId } }: SessionRecordParams,
) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id || typeof id !== 'string') {
    return NextResponse.json(
      { error: '💀 `id` parameter is required and must be a string.' },
      { status: 400 },
    );
  }

  if (!channelId || typeof channelId !== 'string') {
    return NextResponse.json(
      { error: '💀 `channelId` parameter is required and must be a string.' },
      { status: 400 },
    );
  }

  try {
    console.log('🤞 ATTEMPTING TO DELETE SESSION:', channelId);

    await sql`BEGIN`;

    const result = await sql`
      DELETE FROM sessions
      WHERE id=${id} AND channel_id=${channelId};
    `;

    if (result.rowCount === 0) {
      throw new Error('No session found to delete');
    }

    await sql`COMMIT`;
    console.log('🗑️ SESSION DELETED');
    return NextResponse.json({}, { status: 200 });
  } catch (error: any) {
    await sql`ROLLBACK`;
    if (error.message === 'No session found to delete') {
      return NextResponse.json(
        { error: '💀 No session found to delete.' },
        { status: 404 },
      );
    }

    console.error('💀 Error while trying to delete the session:', error);
    return NextResponse.json(
      { error: '💀 Internal server error occurred.' },
      { status: 500 },
    );
  }
}
