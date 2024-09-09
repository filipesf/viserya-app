import { APIInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { viseryaApi } from '@viserya/services/viseryaApi';
import { ExecuteCommand } from '@viserya/types';

export const register = new SlashCommandBuilder()
  .setName('endsession')
  .setDescription('End the current D&D session in this channel.');

export const execute: ExecuteCommand = async (interaction: APIInteraction) => {
  const channelId = interaction.channel?.id;

  console.log('🤖 EXECUTING ENDSESSION COMMAND');

  try {
    const response = await viseryaApi.post(`/sessions/${channelId}/end`, {
      ...interaction,
    });

    console.log('🎉 COMMAND EXECUTED SUCCESSFULLY');

    return response.data;
  } catch (error) {
    console.error('💥 ERROR STARTING SESSION:', error);
  }
};
