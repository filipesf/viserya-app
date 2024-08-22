import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { plural } from '@viserya/utils/plural';

export async function GET(_request: NextRequest) {
  try {
    console.log(`🔎 CHECKING FOR EXISTING SESSIONS IN ALL CHANNELs`);

    const result = await sql`SELECT * FROM sessions;`;

    console.log('📦 SESSIONS RETRIEVED');

    const sessionsInChannels = result.rows;
    const activeSessionsInChannels = result.rows.filter(
      (session) => session.status === 'active',
    );
    const totalSessionsCount = result.rowCount || 0;
    const activeSessionsCount = activeSessionsInChannels.length;
    const replyToChannel: string =
      totalSessionsCount === 0
        ? 'There are no active sessions in this server.'
        : `There's a total of ${totalSessionsCount} session${plural(totalSessionsCount)} (${activeSessionsCount} active) across all channels in this server.`;

    console.log('✅ REQUEST COMPLETED');

    return NextResponse.json(
      {
        sessionsInChannels,
        totalSessionsCount,
        activeSessionsInChannels,
        activeSessionsCount,
        replyToChannel,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      '💀 Error while trying to retrieve sessions from channel:',
      NextResponse.json(error),
    );
    return NextResponse.error();
  }
}
