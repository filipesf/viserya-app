import { APIInteraction } from 'discord.js';
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { discordApi } from '@viserya/services/discordApi';
import { SessionRecordParams } from '@viserya/types';

export async function POST(
  request: NextRequest,
  { params: { channelId } }: SessionRecordParams,
) {
  const requestJson = await request.json();
  const { id, application_id, token } = requestJson as APIInteraction;

  try {
    console.log('🤖 EXECUTING ENDSESSION COMMAND');
    console.log('🔎 CHECKING FOR EXISTING SESSION');

    await discordApi.post(`/interactions/${id}/${token}/callback`, {
      type: 5,
      data: {
        content: '🤖 Processing your request... This might take a few seconds.',
        flags: 64,
      },
    });

    const existingSession = await sql`
      SELECT * FROM sessions
      WHERE channel_id=${channelId} AND status='active';
    `;

    if (existingSession.rows.length === 0) {
      await discordApi.patch(
        `/webhooks/${application_id}/${token}/messages/@original`,
        {
          content: '🤖 There is no active session in this channel.',
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

    await discordApi.patch(
      `/webhooks/${application_id}/${token}/messages/@original`,
      {
        content: '🤖 Session ended successfully!',
      },
    );

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(
      '💀 Error while trying to execute the endsession command:',
      error,
    );

    await discordApi.patch(
      `/webhooks/${application_id}/${token}/messages/@original`,
      {
        content:
          '💀 An error occurred while trying to end the session. Please try again later.',
      },
    );

    return NextResponse.error();
  }
}
