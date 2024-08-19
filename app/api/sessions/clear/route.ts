import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function DELETE(_request: Request) {
  try {
    console.log('🤞 ATTEMPTING TO DELETE SESSIONS');

    await sql`DELETE FROM sessions;`;

    console.log('🗑️ SESSIONS CLEARED');

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error(
      '💀 Error while trying to delete the sessions:',
      NextResponse.json(error),
    );
    return NextResponse.error();
  }
}
