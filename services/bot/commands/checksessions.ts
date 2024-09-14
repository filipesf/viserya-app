import { SlashCommandBuilder } from '@discordjs/builders';
import { viseryaApi } from '@viserya/services/viseryaApi';
import { ExecuteCommand } from '@viserya/types';

export const register = new SlashCommandBuilder()
  .setName('checksessions')
  .setDescription('Check for an active session in current channel');

export const execute: ExecuteCommand = async (interaction) => {
  const channelId = interaction.channel?.id;

  console.log('🤖 EXECUTING CHECKSESSIONS COMMAND');

  try {
    const response = await viseryaApi.get(`/sessions/${channelId}`, {
      params: { ...interaction },
    });

    console.log('🎉 COMMAND EXECUTED SUCCESSFULLY');

    return response.data;
  } catch (error) {
    console.error('💀 ERROR CHECKING SESSION:', error);
  }
};
