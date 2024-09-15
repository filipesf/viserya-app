import { APIInteraction } from 'discord.js';
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { discordApi } from '@viserya/services/bot/discordApi';
import { SessionRecordParams } from '@viserya/types';

export async function POST(
  request: NextRequest,
  { params: { channelId } }: SessionRecordParams,
) {
  const requestJson = await request.json();
  const { id, application_id, token } = requestJson as APIInteraction;
  const shouldCallDiscord = (id || application_id) && token;

  try {
    console.log('🤖 EXECUTING ENDSESSION COMMAND');
    console.log('🔎 CHECKING FOR EXISTING SESSION');

    if (shouldCallDiscord) {
      await discordApi.post(`/interactions/${id}/${token}/callback`, {
        type: 5,
        data: {
          content: 'Weaving the threads of your request...',
          flags: 64,
        },
      });
    }

    const existingSession = await sql`
      SELECT * FROM sessions
      WHERE channel_id=${channelId} AND status='active';
    `;

    if (shouldCallDiscord && existingSession.rows.length === 0) {
      await discordApi.patch(
        `/webhooks/${application_id}/${token}/messages/@original`,
        {
          content: `No vibrant session exists within this channel's reach.`,
        },
      );

      return NextResponse.json({ status: 200 });
    }

    console.log('💬 ATTEMPTING TO END ACTIVE SESSION');

    await sql`
      UPDATE sessions
      SET status='ended', end_time=NOW()
      WHERE id=${existingSession.rows[0].id};
    `;

    console.log('🎉 SESSION ENDED SUCCESSFULLY');

    if (shouldCallDiscord) {
      await discordApi.patch(
        `/webhooks/${application_id}/${token}/messages/@original`,
        {
          content: 'The session has been laid to rest successfully!',
        },
      );

      await discordApi.patch(`/channels/${channelId}`, {
        locked: true,
      });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(
      '💀 Error while trying to execute the endsession command:',
      error,
    );

    if (shouldCallDiscord) {
      await discordApi.patch(
        `/webhooks/${application_id}/${token}/messages/@original`,
        {
          content:
            'A misstep has occurred while attempting to seal the session. Please try again later.',
        },
      );
    }

    return NextResponse.error();
  }
}
