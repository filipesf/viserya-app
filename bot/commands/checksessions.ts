import { SlashCommandBuilder } from '@discordjs/builders';
import { viseryaApi } from '@viserya/services/viseryaApi';
import { ExecuteCommand } from '@viserya/types';

export const register = new SlashCommandBuilder()
  .setName('checksessions')
  .setDescription('Check if there are any active D&D sessions')
  .addStringOption((option) =>
    option
      .setName('from')
      .setDescription('Check for active sessions in the specified scope.')
      .setRequired(true)
      .addChoices(
        { name: 'Channel', value: 'channel' },
        { name: 'Server', value: 'server' },
      ),
  );

export const execute: ExecuteCommand = async (interaction) => {
  const channelId = interaction.channel?.id;
  const checkSessionsFrom = interaction.data?.options[0]?.value;

  console.log('🤖 EXECUTING CHECKSESSIONS COMMAND');

  let endpoint;

  switch (checkSessionsFrom) {
    case 'server':
      endpoint = '/sessions';
      break;

    case 'channel':
    default:
      endpoint = `/sessions/${channelId}`;
      break;
  }

  console.log(interaction);

  try {
    const response = await viseryaApi.get(endpoint, {
      params: { ...interaction },
    });

    console.log('🎉 COMMAND EXECUTED SUCCESSFULLY');

    console.log({ ...response });

    return response.data;
  } catch (error) {
    console.error('💥 ERROR CHECKING SESSION:', error);
  }
};
