import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { viseryaApi } from '@viserya/services/api';
import { SessionsParams } from '@viserya/types';

export async function POST(
  _request: NextRequest,
  { params: { channelId, userId } }: SessionsParams,
) {
  try {
    console.log('🤖 EXECUTING STARTSESSION COMMAND');

    const existingSession = await sql`
      SELECT * FROM sessions
      WHERE channel_id = ${channelId} AND status = 'active'
    `;

    if (existingSession.rows.length > 0) {
      return NextResponse.json(
        {
          type: 4,
          ephemeral: true,
          data: {
            content:
              'There is already an active session in this channel. Please end the current session before starting a new one.',
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
      RETURNING id
    `;

    console.log('🎉 COMMAND EXECUTED SUCCESSFULLY!');

    return NextResponse.json(
      {
        type: 4,
        data: {
          content: 'Session started successfully!',
        },
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(
      '💀 ERROR DURING COMMAND EXECUTION:',
      NextResponse.json(error),
    );
    return NextResponse.error();
  }
}
