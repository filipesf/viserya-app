import { APIInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { viseryaApi } from '@viserya/services/viseryaApi';
import { ExecuteCommand } from '@viserya/types';

export const register = new SlashCommandBuilder()
  .setName('startsession')
  .setDescription('Start a new D&D session in this channel.');

export const execute: ExecuteCommand = async (interaction: APIInteraction) => {
  const channelId = interaction.channel?.id;
  const userId = interaction.member?.user.id;

  console.log('🤖 EXECUTING STARTSESSION COMMAND');

  try {
    console.log('🔍 CHECKING FOR ACTIVE SESSION IN CHANNEL:', channelId);

    const response = await viseryaApi.post(`/sessions/${channelId}/start`, {
      userId,
      ...interaction,
    });

    return response.data;
  } catch (error) {
    console.error('💥 ERROR STARTING SESSION:', error);
  }
};
