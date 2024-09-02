import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { viseryaApi } from '@viserya/services/viseryaApi';
import { SessionRecordParams } from '@viserya/types';

export async function POST(
  request: NextRequest,
  { params: { channelId } }: SessionRecordParams,
) {
  const { userId } = await request.json();

  try {
    console.log('🤖 EXECUTING STARTSESSION COMMAND');
    console.log('🔎 CHECKING FOR EXISTING SESSION');

    const existingSession = await sql`
      SELECT * FROM sessions
      WHERE channel_id=${channelId} AND status='active';
    `;

    if (existingSession.rows.length > 0) {
      return NextResponse.json(
        {
          type: 4,
          data: {
            content:
              '🤖 There is already an active session in this channel. Please end the current session before starting a new one.',
            ephemeral: true,
          },
        },
        { status: 200 },
      );
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

    return NextResponse.json(
      {
        type: 4,
        data: {
          content: '🤖 Session started successfully!',
          ephemeral: true,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      '💀 Error while trying to execute the startsession command:',
      NextResponse.json(error),
    );
    return NextResponse.error();
  }
}
