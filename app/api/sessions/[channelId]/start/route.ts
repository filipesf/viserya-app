import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { discordApi } from '@viserya/services/discordApi';
import { viseryaApi } from '@viserya/services/viseryaApi';
import { SessionRecordParams } from '@viserya/types';

export async function POST(
  request: NextRequest,
  { params: { channelId } }: SessionRecordParams,
) {
  const { id, application_id, token, userId } = await request.json(); // Extract userId and token from the request body

  try {
    console.log('🤖 EXECUTING STARTSESSION COMMAND');

    await discordApi.post(`/interactions/${id}/${token}/callback`, {
      type: 5,
      data: {
        content: '🤖 Processing your request... This might take a few seconds.',
        flags: 64,
      },
    });

    console.log('🔎 CHECKING FOR EXISTING SESSION');

    const existingSession = await sql`
      SELECT * FROM sessions
      WHERE channel_id=${channelId} AND status='active';
    `;

    if (existingSession.rows.length > 0) {
      await discordApi.patch(
        `/webhooks/${application_id}/${token}/messages/@original`,
        {
          content:
            '🤖 There is already an active session in this channel. Please end the current session before starting a new one.',
        },
      );

      return NextResponse.json({ status: 200 });
    }

    const threads = await viseryaApi.post('/assistants/threads');
    const threadId = threads.data.threadId;

    console.log(`📋 NEW GPT THREAD CREATED FOR ${channelId} CHANNEL`);

    await sql`
      INSERT INTO sessions (thread_id, channel_id, user_id)
      VALUES (${threadId}, ${channelId}, ${userId})
      RETURNING id;
    `;

    console.log('🎉 SESSION STARTED SUCCESSFULLY');

    await discordApi.patch(
      `/webhooks/${application_id}/${token}/messages/@original`,
      {
        content: '🤖 Session started successfully!',
      },
    );

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(
      '💀 Error while trying to execute the startsession command:',
      error,
    );

    await discordApi.patch(
      `/webhooks/${application_id}/${token}/messages/@original`,
      {
        content:
          '💥 An error occurred while trying to start the session. Please try again later.',
      },
    );

    return NextResponse.error();
  }
}
