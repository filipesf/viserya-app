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
    if (!interaction || !interaction.member || !interaction.isCommand()) {
      throw new Error('Invalid interaction or member data.');
    }

    const member = interaction.member;
    const user = member.user;

    if (!user || !user.username) {
      throw new Error('User data is not available.');
    }

    const responseMessage = `🤖 pong! @${user.username}`;

    return {
      type: 4,
      ephemeral: true,
      data: {
        content: responseMessage,
      },
    };
  } catch (error: any) {
    console.error('💀 Error executing /ping command:', error.message);

    return {
      type: 4,
      ephemeral: true,
      data: {
        content:
          '🤖 Sorry, there was an error processing your ping request. Please try again later.',
      },
    };
  }
};
