import { InteractionType, APIInteractionResponse } from 'discord.js';
import { NextRequest, NextResponse } from 'next/server';
import { DISCORD_KEY } from '@viserya/config/constants';
import getCommands from '@viserya/utils/getCommands';
import { verifyInteractionRequest } from '@viserya/utils/verifyDiscordRequest';

export async function POST(request: NextRequest) {
  console.log('🤖 INTERACTION REQUEST');

  try {
    const verifyRes = await verifyInteractionRequest(request, DISCORD_KEY);

    if (!verifyRes.isValid || !verifyRes.interaction) {
      console.log('❌ INVALID REQUEST');
      return new NextResponse('Invalid request', { status: 401 });
    }

    console.log('✅ VERIFIED REQUEST');

    const { interaction } = verifyRes;

    // Check if the interaction type is a ping
    // PING message, respond with ACK (part of Discord's security and authorization protocol)
    if (interaction.type === InteractionType.Ping) {
      console.log('🏓 INTERACTION PING REQUEST');
      return NextResponse.json({ type: 1 });
    }

    console.log('🥺 TRYING TO GET COMMANDS');

    const allCommands = await getCommands();

    console.log('✅ COMMANDS RETRIEVED');

    let reply: APIInteractionResponse | null = null;
    const commandName = interaction.data.name + '.ts';

    console.log('🕵️‍♂️ COMMAND FOUND', commandName);

    if (allCommands[commandName]) {
      reply = await allCommands[commandName].execute(interaction);
    }

    console.log('✅ COMMAND EXECUTED', reply);

    if (!reply) throw new Error();

    console.log('🎉 INTERACTION RESPONSE SENT');

    return NextResponse.json(reply);
  } catch (error: any) {
    console.error(
      '💀 Error during command interaction:',
      NextResponse.json(error),
    );
    return NextResponse.error();
  }
}
