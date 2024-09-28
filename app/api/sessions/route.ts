import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { discordApi } from '@viserya/services/bot/discordApi';
import { convertKeys } from '@viserya/utils/convertKeys';
import { plural } from '@viserya/utils/plural';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const application_id = searchParams.get('application_id');
  const token = searchParams.get('token');
  const shouldCallDiscord = (id || application_id) && token;

  try {
    console.log(`🔎 CHECKING FOR EXISTING SESSIONS IN ALL CHANNELs`);

    if (shouldCallDiscord) {
      await discordApi.post(`/interactions/${id}/${token}/callback`, {
        type: 5,
        data: {
          content: 'Weaving the threads of your request...',
          flags: 64,
        },
      });
    }

    const result = await sql`SELECT * FROM sessions;`;

    console.log('📦 SESSIONS RETRIEVED');

    const sessionsInChannels = convertKeys(result.rows);
    const activeSessionsInChannels = sessionsInChannels.filter(
      (session: any) => session.status === 'active',
    );
    const endedSessionsInChannels = sessionsInChannels.filter(
      (session: any) => session.status === 'ended',
    );
    const totalSessionsCount = result.rowCount || 0;
    const activeSessionsCount = activeSessionsInChannels.length;
    const endedSessionsCount = endedSessionsInChannels.length;

    const messageContent: string =
      totalSessionsCount === 0
        ? 'There are no active sessions in this server.'
        : `There's a total of ${totalSessionsCount} session${plural(totalSessionsCount)} (${activeSessionsCount} active) across all channels in this server.`;

    if (shouldCallDiscord) {
      await discordApi.patch(
        `/webhooks/${application_id}/${token}/messages/@original`,
        { content: `🤖 ${messageContent}` },
      );
    }

    console.log('✅ REQUEST COMPLETED');

    return NextResponse.json(
      {
        sessionsInChannels,
        totalSessionsCount,
        activeSessionsInChannels,
        activeSessionsCount,
        endedSessionsInChannels,
        endedSessionsCount,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      '💀 Error while trying to retrieve sessions from channel:',
      NextResponse.json(error),
    );

    if (shouldCallDiscord) {
      await discordApi.patch(
        `/webhooks/${application_id}/${token}/messages/@original`,
        {
          content:
            '💀 An error occurred while trying to retrieve the session. Please try again later.',
        },
      );
    }
    return NextResponse.error();
  }
}

// export async function PUT(request: NextRequest) {
//   try {
//     return NextResponse.json({ status: 200 });
//   } catch (error) {
//     console.error(
//       '💀 Error while trying to update the sessions:',
//       NextResponse.json(error),
//     );
//     return NextResponse.error();
//   }
// }

// export async function DELETE() {
//   try {
//     console.log('🤞 ATTEMPTING TO DELETE SESSIONS');
//
//     await sql`DELETE FROM sessions;`;
//
//     console.log('🗑️ SESSIONS CLEARED');
//
//     return NextResponse.json(null, { status: 200 });
//   } catch (error) {
//     console.error(
//       '💀 Error while trying to delete the sessions:',
//       NextResponse.json(error),
//     );
//     return NextResponse.error();
//   }
// }
