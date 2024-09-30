import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { convertKeys } from '@viserya/utils/convertKeys';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get('channelId');

    console.log(
      channelId
        ? '🔎 CHECKING FOR EXISTING MESSAGES IN CHANNEL'
        : '🔎 CHECKING FOR EXISTING MESSAGES IN ALL CHANNELS',
    );

    const query = channelId
      ? sql`SELECT * FROM messages WHERE channel_id=${channelId};`
      : sql`SELECT * FROM messages;`;

    const result = await query;

    console.log('📦 MESSAGES RETRIEVED');

    return NextResponse.json(convertKeys(result.rows), { status: 200 });
  } catch (error) {
    console.error('💀 Error while fetching messages:', error);

    return NextResponse.json(
      { error: '💀 An error occurred while retrieving messages' },
      { status: 400 },
    );
  }
}

export async function POST(request: NextRequest) {
  const { id, channelId, threadId, userId, text, type, guildId } =
    await request.json();

  try {
    console.log('📝 STORING MESSAGE');

    await sql`
      INSERT INTO messages (id, server_id, channel_id, thread_id, user_id, text, type)
      VALUES (${id}, ${guildId}, ${channelId}, ${threadId}, ${userId}, ${text}, ${type});
    `;

    console.log('✅ MESSAGE STORED');

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('💀 Error while trying to store messages:', error);
    return NextResponse.error();
  }
}

export async function DELETE() {
  try {
    console.log('🤞 ATTEMPTING TO DELETE MESSAGES');

    await sql`DELETE FROM messages;`;

    console.log('🗑️ MESSAGES CLEARED');

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.error(
      '💀 Error while trying to delete messages:',
      NextResponse.json(error),
    );
    return NextResponse.error();
  }
}
