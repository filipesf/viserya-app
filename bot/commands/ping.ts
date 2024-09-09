import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { ExecuteCommand } from '@viserya/types';

export const register = new SlashCommandBuilder()
  .setName('ping')
  .setDescription("pong's you back! (bot check)");

export const execute: ExecuteCommand = async (
  interaction: CommandInteraction,
) => {
  try {
    const member = interaction.member;
    const user = member?.user;

    return {
      type: 4,
      data: {
        content: `🤖 pong! @${user?.username}`,
        flags: 64,
      },
    };
  } catch (error) {
    console.error('💀 ERROR EXECUTING /PING COMMAND:', error);

    return {
      type: 4,
      data: {
        content: '🤖 Sorry, there was an error processing your ping request.',
        flags: 64,
      },
    };
  }
};
