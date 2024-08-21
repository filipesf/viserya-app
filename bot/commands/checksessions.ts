import { SlashCommandBuilder } from '@discordjs/builders';
import { viseryaApi } from '@viserya/services/viseryaApi';
import { ExecuteCommand } from '@viserya/types';

export const register = new SlashCommandBuilder()
  .setName('checksessions')
  .setDescription('Check if there are any active D&D sessions')
  .addBooleanOption((option) =>
    option
      .setName('all')
      .setDescription('Check for active sessions in all channels.'),
  );

export const execute: ExecuteCommand = async (interaction) => {
  const channelId = interaction.channel?.id;
  const hasOptions = !!interaction.data?.options;
  const checkForAllChannels = hasOptions && interaction.data?.options[0]?.value;

  console.log('🤖 EXECUTING CHECKSESSIONS COMMAND');

  const endpoint = checkForAllChannels ? '/sessions' : `/sessions/${channelId}`;
  const response = await viseryaApi.get(endpoint);
  const { totalSessionsCount, activeSessionsInChannels } = response.data;

  const plural = (count: number) => (count === 1 ? '' : 's');

  let content;
  if (checkForAllChannels) {
    const activeSessionsCount = activeSessionsInChannels.length;
    content =
      totalSessionsCount === 0
        ? 'There are no active sessions in this server.'
        : `There's a total of ${totalSessionsCount} session${plural(totalSessionsCount)} across all channels, and ${activeSessionsCount} active session${plural(activeSessionsCount)}.`;
  } else {
    content =
      totalSessionsCount === 0
        ? 'There are no active sessions in this channel.'
        : `There's a total of ${totalSessionsCount} session${plural(totalSessionsCount)} in this channel.`;
  }

  console.log('🎉 COMMAND EXECUTED SUCCESSFULLY!');

  return {
    type: 4,
    data: { content },
  };
};
