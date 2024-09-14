import { APIInteraction } from 'discord.js';
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { discordApi } from '@viserya/services/bot/discordApi';
import { viseryaApi } from '@viserya/services/viseryaApi';
import { SessionRecordParams } from '@viserya/types';

type RequestJSON = APIInteraction & {
  userId: string;
};

export async function POST(
  request: NextRequest,
  { params: { channelId } }: SessionRecordParams,
) {
  const requestJson = await request.json();
  const { id, application_id, token, userId, member } =
    requestJson as RequestJSON;
  const shouldCallDiscord = (id || application_id || userId || member) && token;

  try {
    console.log('🤖 EXECUTING STARTSESSION COMMAND');

    if (shouldCallDiscord) {
      await discordApi.post(`/interactions/${id}/${token}/callback`, {
        type: 5,
        data: {
          content: 'Weaving the threads of your request...',
          flags: 64,
        },
      });
    }

    console.log('🔎 CHECKING FOR EXISTING SESSION');

    const existingSession = await sql`
      SELECT * FROM sessions
      WHERE channel_id=${channelId} AND status='active';
    `;

    if (shouldCallDiscord && existingSession.rows.length > 0) {
      await discordApi.patch(
        `/webhooks/${application_id}/${token}/messages/@original`,
        {
          content:
            'A session currently breathes in this channel. Please conclude the ongoing tale before commencing a new one.',
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

    if (shouldCallDiscord) {
      await discordApi.patch(
        `/webhooks/${application_id}/${token}/messages/@original`,
        {
          content: 'The session has been summoned successfully!',
        },
      );
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(
      '💀 Error while trying to execute the startsession command:',
      NextResponse.json(error),
    );

    if (shouldCallDiscord) {
      await discordApi.patch(
        `/webhooks/${application_id}/${token}/messages/@original`,
        {
          content:
            'A shadow has fallen; an error disrupts the initiation of the session. Ponder and try again later.',
        },
      );
    }

    return NextResponse.error();
  }
}
