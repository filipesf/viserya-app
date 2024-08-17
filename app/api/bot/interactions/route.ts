import { InteractionType, APIInteractionResponse } from 'discord.js';
import { NextResponse } from 'next/server';
import { PUBLIC_DISCORD_KEY } from '@viserya/config/constants';
import getCommands from '@viserya/utils/getCommands';
import { verifyInteractionRequest } from '@viserya/utils/verifyDiscordRequest';

export async function POST(req: Request) {
  try {
    const verifyRes = await verifyInteractionRequest(req, PUBLIC_DISCORD_KEY);

    if (!verifyRes.isValid || !verifyRes.interaction) {
      return new NextResponse('Invalid request', { status: 401 });
    }
    const { interaction } = verifyRes;

    // Check if the interaction type is a ping
    // PING message, respond with ACK (part of Discord's security and authorization protocol)
    if (interaction.type === InteractionType.Ping) {
      return NextResponse.json({ type: 1 });
    }

    // get all commands
    const allCommands = await getCommands();

    // execute command
    let reply: APIInteractionResponse | null = null;
    const commandName = interaction.data.name + '.ts';
    if (allCommands[commandName]) {
      reply = await allCommands[commandName].execute(interaction);
    }

    if (!reply) throw new Error();
    return NextResponse.json(reply);
  } catch (error: any) {
    console.log(error);
    console.log('SOMETHING WENT WRONG');
    return NextResponse.error();
  }
}
