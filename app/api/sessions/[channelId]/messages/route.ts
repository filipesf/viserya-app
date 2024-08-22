import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { ChatMessage, SessionsParams } from '@viserya/types';

export async function POST(
  request: Request,
  { params: { channelId } }: SessionsParams,
) {
  const { searchParams } = new URL(request.url);
  const messageString = searchParams.get('message');
  const threadId = searchParams.get('threadId');
  const userId = searchParams.get('userId');
  const type = searchParams.get('type');

  let message: ChatMessage;

  try {
    console.log('✍️ PARSING MESSAGE');

    if (messageString) {
      message = JSON.parse(messageString) as ChatMessage;
      console.log('🆗 MESSAGE PARSED');
    } else {
      return NextResponse.json(
        { error: '💀 Message parameter is missing.' },
        { status: 400 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: '💀 Invalid message format' },
      { status: 400 },
    );
  }

  try {
    console.log('📝 STORING MESSAGE');

    await sql`
      INSERT INTO messages (channel_id, thread_id, user_id, role, text, type)
      VALUES (${channelId}, ${threadId}, ${userId}, ${message.role}, ${message.text}, ${type});
    `;

    console.log('✅ MESSAGE STORED');

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('💀 Error while trying to store messages:', error);
    return NextResponse.error();
  }
}
