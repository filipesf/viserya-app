import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { SessionRecordParams } from '@viserya/types';
import { convertKeys } from '@viserya/utils/convertKeys';

export async function GET(
  _request: NextRequest,
  { params: { channelId } }: SessionRecordParams,
) {
  try {
    console.log(`🔎 CHECKING FOR EXISTING MESSAGES IN ${channelId}`);

    const result = await sql`
      SELECT * FROM messages WHERE channel_id=${channelId};
    `;

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
