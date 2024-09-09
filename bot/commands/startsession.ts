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

  console.log('🪲', interaction);

  // Step 2: Defer reply to prevent premature Discord error
  await interaction.deferReply({ ephemeral: true });

  try {
    console.log('🔍 Checking for active session in channel:', channelId);

    // Step 3: API call to start session (or whatever logic you have)
    const result = await viseryaApi.post(`/sessions/${channelId}/start`, {
      userId,
    });

    console.log('🎉 Session started successfully for channel:', channelId);

    // Step 4: Update the deferred reply with success message
    await interaction.editReply({
      content: '🤖 Session started successfully!',
    });

    return result.data;
  } catch (error) {
    console.error('💥 Error starting session:', error);

    // Step 5: If there's an error, update the deferred reply with an error message
    await interaction.editReply({
      content:
        '💥 There was an error starting the session. Please try again later.',
    });
  }
};
