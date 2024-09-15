import { APIInteraction } from 'discord.js';
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { discordApi } from '@viserya/services/bot/discordApi';
import { viseryaApi } from '@viserya/services/viseryaApi';
import { SessionRecordParams } from '@viserya/types';
import { getRandomTavernName } from '@viserya/utils/getRandomElement';

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

    if (existingSession.rows.length > 0) {
      if (shouldCallDiscord) {
        await discordApi.patch(
          `/webhooks/${application_id}/${token}/messages/@original`,
          {
            content:
              'A session currently breathes in this channel. Please conclude the ongoing tale before commencing a new one.',
          },
        );
      }

      return NextResponse.json({ status: 200 });
    }

    const channelResponse = await discordApi.get(`/channels/${channelId}`);
    const channel = channelResponse.data;

    let channelThreadId;
    let channelThreadName;

    if ([10, 11, 12].includes(channel.type)) {
      channelThreadId = channel.id;
      channelThreadName = channel.name;
    } else {
      console.log(`📜 CREATING A NEW THREAD IN CHANNEL ${channelId}`);

      channelThreadName = await getRandomTavernName();

      const newThreadResponse = await discordApi.post(
        `/channels/${channelId}/threads`,
        {
          name: channelThreadName,
          type: 11, // Public thread
        },
      );

      channelThreadId = newThreadResponse.data.id;
      channelThreadName = newThreadResponse.data.name;

      console.log(
        `📋 NEW THREAD CREATED: ${channelThreadName} (${channelThreadId})`,
      );

      await discordApi.put(
        `/channels/${channelThreadId}/thread-members/${userId}`,
      );

      console.log(`👤 USER ${userId} ADDED TO THE THREAD ${channelThreadId}`);
    }

    const assistantThreads = await viseryaApi.post('/assistants/threads');
    const assistantThreadId = assistantThreads.data.threadId;

    console.log(`📋 NEW GPT THREAD CREATED FOR ${channelId} CHANNEL`);

    await sql`
      INSERT INTO sessions (thread_id, channel_id, user_id)
      VALUES (${assistantThreadId}, ${channelThreadId}, ${userId})
      RETURNING id;
    `;

    console.log(
      `🎉 SESSION STARTED SUCCESSFULLY IN THREAD: ${channelThreadName}`,
    );

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
      error,
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
