import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { sql } from '@vercel/postgres';
import { ExecuteCommand } from '@viserya/types';

export const register = new SlashCommandBuilder()
  .setName('endsession')
  .setDescription('End the current D&D session in this channel.');

export const execute: ExecuteCommand = async (
  interaction: CommandInteraction,
) => {
  const channelId = interaction.channel?.id;

  const existingSession = await sql`
    SELECT * FROM sessions
    WHERE channel_id = ${channelId} AND status = 'active'
  `;

  if (existingSession.rows.length === 0) {
    return {
      type: 4,
      ephemeral: true,
      data: {
        content: 'There is no active session in this channel.',
      },
    };
  }

  await sql`
    UPDATE sessions
    SET status = 'ended', end_time = NOW()
    WHERE id = ${existingSession.rows[0].id}
  `;

  return {
    type: 4,
    data: {
      content: 'Session ended successfully!',
    },
  };
};
