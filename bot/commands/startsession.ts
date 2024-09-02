import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { viseryaApi } from '@viserya/services/viseryaApi';
import { ExecuteCommand } from '@viserya/types';

export const register = new SlashCommandBuilder()
  .setName('startsession')
  .setDescription('Start a new D&D session in this channel.');

export const execute: ExecuteCommand = async (
  interaction: CommandInteraction,
) => {
  const channelId = interaction.channel?.id;
  const userId = interaction.member?.user.id;

  console.log('🤖 EXECUTING STARTSESSION COMMAND');

  const result = await viseryaApi.post(`/sessions/${channelId}/start`, {
    userId,
  });

  console.log({ ...result });

  interaction.reply({
    content: result.data.content,
    ephemeral: true,
  });

  console.log('🎉 COMMAND EXECUTED SUCCESSFULLY');

  // return result.data;
};
