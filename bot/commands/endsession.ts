import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { viseryaApi } from '@viserya/services/api';
import { ExecuteCommand } from '@viserya/types';

export const register = new SlashCommandBuilder()
  .setName('endsession')
  .setDescription('End the current D&D session in this channel.');

export const execute: ExecuteCommand = async (
  interaction: CommandInteraction,
) => {
  const channelId = interaction.channel?.id;

  console.log('🤖 EXECUTING ENDSESSION COMMAND');

  const result = await viseryaApi.post(`/sessions/${channelId}/end`);

  console.log('🎉 COMMAND EXECUTED SUCCESSFULLY!');

  return result.data;
};
