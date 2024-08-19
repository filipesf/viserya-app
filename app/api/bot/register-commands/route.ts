import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_DISCORD_APP_ID } from '@viserya/config/constants';
import { discord_api } from '@viserya/utils/discordApi';
import getCommands from '@viserya/utils/getCommands';
import { handleMiddleware } from '@viserya/utils/handleMiddleware';

export async function POST(request: NextRequest): Promise<NextResponse> {
  console.log('🤖 REGISTERING COMMANDS');

  const authResponse = await handleMiddleware(request);
  if (authResponse) {
    return authResponse;
  }

  console.log('🔑 AUTHENTICATED REQUEST');

  try {
    const allCommands = await getCommands();
    const arrayOfSlashCommandsRegister = Object.values(allCommands);
    const arrayOfSlashCommandsRegisterJSON = arrayOfSlashCommandsRegister.map(
      (command) => command.register.toJSON(),
    );

    console.log('✅ COMMANDS RETRIEVED');

    console.log('🥺 TRYING TO REGISTER COMMANDS');

    const registerCommands = await discord_api.put(
      `/applications/${NEXT_PUBLIC_DISCORD_APP_ID!}/commands`,
      arrayOfSlashCommandsRegisterJSON,
    );

    console.log('🎉 COMMANDS REGISTERED');

    return NextResponse.json({ error: null });
  } catch (error) {
    console.error('💀 Error registering commands: ', NextResponse.json(error));
    return NextResponse.json({ error: 'Error Occured' }, { status: 500 });
  }
}
