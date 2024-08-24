import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { SessionRecordParams } from '@viserya/types';
import { convertKeys } from '@viserya/utils/convertKeys';

export async function GET(
  _request: Request,
  { params: { channelId } }: SessionRecordParams,
) {
  try {
    console.log('🔎 CHECKING FOR EXISTING MESSAGES');

    const result = await sql`
      SELECT * FROM messages
      WHERE channel_id=${channelId};
    `;

    console.log('📦 MESSAGES RETRIEVED');

    return NextResponse.json(convertKeys(result.rows), { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: '💀 Invalid message format' },
      { status: 400 },
    );
  }
}

export async function POST(
  request: Request,
  { params: { channelId } }: SessionRecordParams,
) {
  const { threadId, userId, role, text, type } = await request.json();

  try {
    console.log('📝 STORING MESSAGE');

    const result = await sql`
      INSERT INTO messages (channel_id, thread_id, user_id, role, text, type)
      VALUES (${channelId}, ${threadId}, ${userId}, ${role}, ${text}, ${type});
    `;

    console.log('✅ MESSAGE STORED', result);

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('💀 Error while trying to store messages:', error);
    return NextResponse.error();
  }
}

export async function PUT(
  request: Request,
  { params: { channelId } }: SessionRecordParams,
) {
  const { threadId, userId, type } = await request.json();

  if (!threadId || !userId || !type) {
    return NextResponse.json(
      { error: '💀 `threadId`, `userId`, and `type` parameters are required.' },
      { status: 400 },
    );
  }

  try {
    console.log('🔄 UPDATING MESSAGE');

    const result = await sql`
      UPDATE messages
      WHERE channel_id=${channelId}
        AND thread_id=${threadId}
        AND user_id=${userId}
      SET type=${type};
    `;

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: '💀 No message found to update.' },
        { status: 404 },
      );
    }

    console.log('✅ MESSAGE UPDATED');

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('💀 Error while trying to update message type:', error);
    return NextResponse.error();
  }
}
