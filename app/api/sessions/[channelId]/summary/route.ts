import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import {
  SessionRecordParams,
  SessionsRecord,
  TypeToCamelCase,
} from '@viserya/types';

export async function PUT(
  request: NextRequest,
  { params: { channelId } }: SessionRecordParams,
) {
  const requestJson = await request.json();
  const { threadId, status, summary } =
    requestJson as TypeToCamelCase<SessionsRecord>;

    console.log('🪲 ENDSESSION REQUEST', requestJson)

  if (!status || !summary || !threadId) {
    return NextResponse.json(
      {
        error: '💀 `status`, `summary` and `threadId` parameters are required.',
      },
      { status: 400 },
    );
  }

  try {
    await sql`BEGIN`;

    const result = await sql`
      UPDATE sessions
      SET summary=${summary}
      WHERE thread_id=${threadId} AND channel_id=${channelId};
    `;

    if (result.rowCount === 0) {
      throw new Error('No session found to update');
    }

    await sql`COMMIT`;

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('💀 Error while trying to update the session:', error);
    return NextResponse.json({ error });
  }
}
