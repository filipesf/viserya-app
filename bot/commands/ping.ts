import { SlashCommandBuilder } from '@discordjs/builders';
import { ExecuteCommand } from '@viserya/types';

export const register = new SlashCommandBuilder()
  .setName('ping')
  .setDescription("pong's you back! (bot check)");

export const execute: ExecuteCommand = async (interaction) => {
  return {
    type: 4,
    ephemeral: true,
    data: {
      content: `pong! ${interaction.member?.user.username}`,
    },
  };
};
