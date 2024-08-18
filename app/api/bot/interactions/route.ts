import { InteractionType, APIInteractionResponse } from 'discord.js';
import { NextRequest, NextResponse } from 'next/server';
import { DISCORD_KEY } from '@viserya/config/constants';
import getCommands from '@viserya/utils/getCommands';
import { verifyInteractionRequest } from '@viserya/utils/verifyDiscordRequest';

export async function POST(request: NextRequest) {
  try {
    const verifyRes = await verifyInteractionRequest(request, DISCORD_KEY);

    if (!verifyRes.isValid || !verifyRes.interaction) {
      return new NextResponse('Invalid request', { status: 401 });
    }
    const { interaction } = verifyRes;

    // Check if the interaction type is a ping
    // PING message, respond with ACK (part of Discord's security and authorization protocol)
    if (interaction.type === InteractionType.Ping) {
      return NextResponse.json({ type: 1 });
    }

    console.log('=== INTERACTION ===', interaction);

    console.log('=== NextResponse 1 ===', NextResponse);

    // get all commands
    const allCommands = await getCommands();

    console.log('=== allCommands ===', allCommands);

    // execute command
    let reply: APIInteractionResponse | null = null;
    const commandName = interaction.data.name + '.ts';
    if (allCommands[commandName]) {
      reply = await allCommands[commandName].execute(interaction);
    }

    console.log('=== NextResponse 2 ===', NextResponse);

    if (!reply) throw new Error();

    console.log('=== NextResponse 3 ===', NextResponse);
    console.log('=== reply ===', reply);
    return NextResponse.json(reply);
  } catch (error: any) {
    console.log(error);
    console.log('SOMETHING WENT WRONG');
    return NextResponse.error();
  }
}
