import { APIInteraction, Interaction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { viseryaApi } from '@viserya/services/viseryaApi';
import {
  AutocompleteOption,
  ExecuteCommand,
  SessionsRecord,
} from '@viserya/types';

export const register = new SlashCommandBuilder()
  .setName('startsession')
  .setDescription('Start a new session in this channel.')
  .addStringOption((option) =>
    option
      .setName('language')
      .setDescription(
        'In which language should the session be in. Default: Português',
      )
      .setRequired(false)
      .addChoices(
        { name: 'Português', value: 'pt-br' },
        { name: 'English', value: 'en-gb' },
      ),
  )
  .addStringOption((option) =>
    option
      .setName('previoussession')
      .setDescription('Select a previously ended session')
      .setRequired(false)
      .setAutocomplete(true),
  );

export const execute: ExecuteCommand = async (interaction: APIInteraction) => {
  const { id, channel, application_id, token, member, data } = interaction;

  const channelId = channel?.id;
  const userId = member?.user.id;

  console.log('🤖 EXECUTING STARTSESSION COMMAND');

  try {
    console.log('🔍 CHECKING FOR ACTIVE SESSION IN CHANNEL:', channelId);

    const response = await viseryaApi.post(`/sessions/${channelId}/start`, {
      application_id,
      data,
      id,
      member,
      token,
      userId,
    });

    return response.data;
  } catch (error) {
    console.error('💀 ERROR STARTING SESSION:', error);
  }
};

export const autocomplete: AutocompleteOption = async (interaction) => {
  type PreviousSessionOption = { name: string; value: string };

  if (
    interaction.commandName === 'startsession' &&
    interaction.options.getFocused(true).name === 'previoussession'
  ) {
    console.log('🔍 FETCHING PREVIOUS SESSIONS');

    try {
      const {
        data: { endedSessionsInChannels },
      } = await viseryaApi.get('/sessions');

      const choices: PreviousSessionOption[] = endedSessionsInChannels
        .filter((session: SessionsRecord) => session.name && session.id)
        .map((session: SessionsRecord) => ({
          type: 3,
          name: session.name,
          value: session.id,
          focused: true,
        }));

      return await interaction.respond(choices.slice(0, 25));
    } catch (error) {
      console.error('💀 ERROR FETCHING PREVIOUS SESSIONS:', error);
      return await interaction.respond([]);
    }
  }
};
