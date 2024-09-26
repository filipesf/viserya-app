import { APIInteraction } from 'discord.js';
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import {
  CHANNEL_ID_ADVENTURES,
  CHANNEL_ID_CHARACTERS,
  CHANNEL_ID_DOWNTIME,
  CHANNEL_ID_TAVERN,
  CHANNEL_ID_TRAINING,
} from '@viserya/config/constants';
import { discordApi } from '@viserya/services/bot/discordApi';
import { createRandomSessionName } from '@viserya/services/gpt/actions';
import { viseryaApi } from '@viserya/services/viseryaApi';
import { SessionRecordParams, SessionType } from '@viserya/types';
import { getRandomTavernName } from '@viserya/utils/getRandomElement';

type Option = {
  name: string;
  type: number;
  value: string;
};

type Data = {
  id: string;
  name: string;
  options: Option[];
  type: number;
};

type RequestJSON = APIInteraction &
  Partial<{
    userId: string;
    data: Data;
  }>;

export async function POST(
  request: NextRequest,
  { params: { channelId } }: SessionRecordParams,
) {
  const requestJson = (await request.json()) as RequestJSON;
  const { id, application_id, token, userId, member, data } =
    requestJson as RequestJSON;

  let channelThreadId;
  let sessionName;
  let sessionType;

  const sessionLanguage =
    data?.options?.find((option) => option?.name === 'language')?.value ??
    'pt-bt';

  const previouslyId =
    data?.options?.find((option) => option?.name === 'previousSession')
      ?.value ?? null;

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

    if ([10, 11, 12].includes(channel.type)) {
      channelThreadId = channel.id;
      sessionName = channel.name;

      const shouldReopenThread = channel.thread_metadata?.locked === true;

      if (shouldReopenThread) {
        await discordApi.patch(`/channels/${channelId}`, {
          locked: false,
        });
      }
    } else {
      console.log(`📜 CREATING A NEW THREAD IN CHANNEL ${channelId}`);

      const sessionChannels: Record<string, SessionType> = {
        [CHANNEL_ID_ADVENTURES]: 'adventure',
        [CHANNEL_ID_CHARACTERS]: 'character',
        [CHANNEL_ID_DOWNTIME]: 'downtime',
        [CHANNEL_ID_TAVERN]: 'tavern',
        [CHANNEL_ID_TRAINING]: 'training',
      };

      if (sessionChannels[channelId as string]) {
        sessionType = sessionChannels[channelId as string] as SessionType;

        sessionName = (
          await createRandomSessionName(
            sessionChannels[channelId as string] as SessionType,
          )
        ).name;
      } else {
        sessionType = 'tavern';
        sessionName = await getRandomTavernName();
      }

      const newThreadResponse = await discordApi.post(
        `/channels/${channelId}/threads`,
        {
          name: sessionName,
          type: 11, // Public thread
        },
      );

      channelThreadId = newThreadResponse.data.id;
      sessionName = newThreadResponse.data.name;

      console.log(`📋 NEW THREAD CREATED: ${sessionName} (${channelThreadId})`);

      await discordApi.put(
        `/channels/${channelThreadId}/thread-members/${userId}`,
      );

      console.log(`👤 USER ${userId} ADDED TO THE THREAD ${channelThreadId}`);
    }

    const assistantThreads = await viseryaApi.post('/assistants/threads');
    const assistantThreadId = assistantThreads.data.threadId;

    console.log(`📋 NEW GPT THREAD CREATED FOR ${channelId} CHANNEL`);

    console.log({
      sessionType,
      sessionLanguage,
      sessionName,
      assistantThreadId,
      channelThreadId,
      userId,
      previouslyId,
    });

    await sql`
      INSERT INTO sessions (type, language, name, thread_id, channel_id, user_id, previously_id)
      VALUES (${sessionType}, ${sessionLanguage}, ${sessionName}, ${assistantThreadId}, ${channelThreadId}, ${userId}, ${previouslyId})
      RETURNING id;
    `;

    console.log(`🎉 SESSION STARTED SUCCESSFULLY IN THREAD: ${sessionName}`);

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
