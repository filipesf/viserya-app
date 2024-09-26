import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_DISCORD_APP_ID } from '@viserya/config/constants';
import { discordApi } from '@viserya/services/bot';
import { handleMiddleware } from '@viserya/services/handleMiddleware';
import getCommands from '@viserya/utils/getCommands';

export async function POST(request: NextRequest): Promise<NextResponse> {
  console.log('🤖 REGISTERING COMMANDS');

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

    console.log('📦 COMMANDS RETRIEVED');

    console.log('🤞 TRYING TO REGISTER COMMANDS');

    const response = await discordApi.put(
      `/applications/${NEXT_PUBLIC_DISCORD_APP_ID!}/commands`,
      arrayOfSlashCommandsRegisterJSON,
    );

    console.log('🎉 COMMANDS REGISTERED', arrayOfSlashCommandsRegisterJSON);

    console.log('🐛', response.data);

    return NextResponse.json({ error: null });
  } catch (error) {
    console.error('💀 Error registering commands: ', NextResponse.json(error));
    return NextResponse.json({ error: 'Error Occured' }, { status: 500 });
  }
}
