import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { MessageRecordParams } from '@viserya/types';

export async function PUT(
  request: NextRequest,
  { params: { messageId } }: MessageRecordParams,
) {
  const { text, type } = await request.json();

  if (!messageId) {
    return NextResponse.json(
      { error: '💀 `id` parameters are required.' },
      { status: 400 },
    );
  }

  try {
    console.log('🔄 UPDATING MESSAGE');

    let query = `UPDATE messages SET edited_at=NOW()`;
    const params = [];

    if (text !== undefined && text !== '') {
      query += `, text=$${params.length + 1}`;
      params.push(text);
    }

    if (type !== undefined && type !== '') {
      query += `, type=$${params.length + 1}`;
      params.push(type);
    }

    query += ` WHERE id=$${params.length + 1}`;

    params.push(messageId);

    const result = await sql.query(query, params);

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

export async function DELETE(
  _request: NextRequest,
  { params: { messageId } }: MessageRecordParams,
) {
  if (!messageId) {
    return NextResponse.json(
      { error: '💀 `id` parameter is required.' },
      { status: 400 },
    );
  }

  try {
    console.log('🤞 ATTEMPTING TO DELETE MESSAGE:', messageId);

    await sql`
      DELETE FROM messages
      WHERE id=${messageId};
    `;

    console.log('🗑️ MESSAGE DELETED');

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('💀 Error while trying to delete the message:', error);
    return NextResponse.error();
  }
}
