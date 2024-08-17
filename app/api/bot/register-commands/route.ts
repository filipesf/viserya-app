import { NextRequest, NextResponse } from 'next/server';
import { discord_api } from '@viserya/utils/discordApi';
import getCommands from '@viserya/utils/getCommands';
import { handleMiddleware } from '@viserya/utils/handleMiddleware';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const authResponse = await handleMiddleware(request);
  if (authResponse) {
    return authResponse;
  }

  try {
    const allCommands = await getCommands();
    const arrayOfSlashCommandsRegister = Object.values(allCommands);
    const arrayOfSlashCommandsRegisterJSON = arrayOfSlashCommandsRegister.map(
      (command) => command.register.toJSON(),
    );

    const registerCommands = await discord_api.put(
      `/applications/${process.env.NEXT_PUBLIC_DISCORD_APP_ID!}/commands`,
      arrayOfSlashCommandsRegisterJSON,
    );

    console.log('=== COMMANDS REGISTERED ===');
    console.log(registerCommands.data);
    console.log('=== COMMANDS REGISTERED ===');

    return NextResponse.json({ error: null });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error Occured' }, { status: 500 });
  }
}
