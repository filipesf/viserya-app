import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(_request: NextRequest) {
  try {
    console.log(`🔎 CHECKING FOR EXISTING SESSIONS IN ALL CHANNELs`);

    const result = await sql`SELECT * FROM sessions;`;

    console.log('✅ SESSIONS RETRIEVED');

    const sessionsInChannels = result.rows;
    const activeSessionsInChannels = result.rows.filter(
      (session) => session.status === 'active',
    );
    const totalSessionsCount = result.rowCount;

    console.log(
      `🧐 THERE'S A TOTAL OF ${totalSessionsCount} SESSION(S) ACCROSS ALL CHANNELS`,
    );

    return NextResponse.json(
      {
        sessionsInChannels,
        totalSessionsCount,
        activeSessionsInChannels,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      '💀 Error while trying to delete sessions from channel:',
      NextResponse.json(error),
    );
    return NextResponse.error();
  }
}
