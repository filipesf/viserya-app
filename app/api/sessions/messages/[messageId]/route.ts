import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { MessageRecordParams } from '@viserya/types';

export async function PUT(
  request: NextRequest,
  { params: { messageId } }: MessageRecordParams,
) {
  const { text, type } = await request.json();

  // 1. Input validation: Ensure messageId is valid.
  if (!messageId || typeof messageId !== 'string') {
    return NextResponse.json(
      { error: '💀 `messageId` parameter is required and must be a string.' },
      { status: 400 },
    );
  }

  try {
    console.log('🔄 UPDATING MESSAGE');

    // 2. Manual transaction control
    await sql`BEGIN`; // Start transaction

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
      throw new Error('No message found to update');
    }

    await sql`COMMIT`; // Commit transaction
    console.log('✅ MESSAGE UPDATED');
    return NextResponse.json({}, { status: 200 });
  } catch (error: any) {
    await sql`ROLLBACK`; // Rollback on error
    if (error.message === 'No message found to update') {
      return NextResponse.json(
        { error: '💀 No message found to update.' },
        { status: 404 },
      );
    }

    console.error('💀 Error while trying to update message type:', error);
    return NextResponse.json(
      { error: '💀 Internal server error occurred.' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params: { messageId } }: MessageRecordParams,
) {
  // 1. Input validation: Ensure messageId is valid before attempting to delete.
  if (!messageId || typeof messageId !== 'string') {
    return NextResponse.json(
      { error: '💀 `messageId` parameter is required and must be a string.' },
      { status: 400 },
    );
  }

  try {
    console.log('🤞 ATTEMPTING TO DELETE MESSAGE:', messageId);

    // 2. Manual transaction control
    await sql`BEGIN`; // Start transaction

    const result = await sql`
      DELETE FROM messages
      WHERE id=${messageId};
    `;

    if (result.rowCount === 0) {
      throw new Error('No message found to delete');
    }

    await sql`COMMIT`; // Commit transaction
    console.log('🗑️ MESSAGE DELETED');
    return NextResponse.json({}, { status: 200 });
  } catch (error: any) {
    await sql`ROLLBACK`; // Rollback on error
    if (error.message === 'No message found to delete') {
      return NextResponse.json(
        { error: '💀 No message found to delete.' },
        { status: 404 },
      );
    }

    console.error('💀 Error while trying to delete the message:', error);
    return NextResponse.json(
      { error: '💀 Internal server error occurred.' },
      { status: 500 },
    );
  }
}
