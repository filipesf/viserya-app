import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { sql } from '@vercel/postgres';
import { viseryaApi } from '@viserya/services/api';
import { ExecuteCommand } from '@viserya/types';

export const register = new SlashCommandBuilder()
  .setName('startsession')
  .setDescription('Start a new D&D session in this channel.');

export const execute: ExecuteCommand = async (
  interaction: CommandInteraction,
) => {
  console.log('Started refreshing application (/) commands.');

  const channelId = interaction.channel?.id;
  const userId = interaction.member?.user.id;

  const existingSession = await sql`
    SELECT * FROM sessions
    WHERE channel_id = ${channelId} AND status = 'active'
  `;

  if (existingSession.rows.length > 0) {
    return {
      type: 4,
      ephemeral: true,
      data: {
        content:
          'There is already an active session in this channel. Please end the current session before starting a new one.',
      },
    };
  }

  const threads = await viseryaApi.post('/assistants/threads');
  const threadId = threads.data.threadId;

  await sql`
    INSERT INTO sessions (thread_id, channel_id, user_id)
    VALUES (${threadId}, ${channelId}, ${userId})
    RETURNING id
  `;

  return {
    type: 4,
    data: {
      content: `Session started successfully!`,
    },
  };
};
