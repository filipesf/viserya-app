import { SlashCommandBuilder } from '@discordjs/builders';
import { viseryaApi } from '@viserya/services/viseryaApi';
import { ExecuteCommand } from '@viserya/types';

export const register = new SlashCommandBuilder()
  .setName('checksessions')
  .setDescription('Check if there are any active D&D sessions')
  .addBooleanOption((option) =>
    option
      .setName('All Channels')
      .setDescription('Check for active sessions in all channels')
      .setRequired(false),
  );

export const execute: ExecuteCommand = async (interaction) => {
  const channelId = interaction.channel?.id;
  const checkForAllChannels = interaction.data?.options[0]?.value;

  console.log('🤖 EXECUTING CHECKSESSIONS COMMAND');

  let response;

  if (checkForAllChannels) {
    response = await viseryaApi.get(`/sessions`);
    const { totalSessionsCount, activeSessionsInChannels } = response.data;
    const plural = totalSessionsCount > 1 ? 's' : '';
    const pluralActive = activeSessionsInChannels.length > 1 ? 's' : '';

    return {
      type: 4,
      data: {
        content: `There's a total of ${totalSessionsCount} session${plural} accross all channels, and ${activeSessionsInChannels.length} active session${pluralActive}.`,
      },
    };
  }

  response = await viseryaApi.get(`/sessions/${channelId}`);
  const { totalSessionsCount } = response.data;
  const plural = totalSessionsCount > 1 ? 's' : '';

  console.log('🎉 COMMAND EXECUTED SUCCESSFULLY!');

  return {
    type: 4,
    data: {
      content: `There's a total of ${totalSessionsCount} session${plural} accross all channels.`,
    },
  };
};
