import { SlashCommandBuilder } from '@discordjs/builders';
import { ExecuteCommand } from '@viserya/types';
import { getRandomCharacter } from '@viserya/utils/getRandomElement';

export const register = new SlashCommandBuilder()
  .setName('character')
  .setDescription('generate a random character concept');

export const execute: ExecuteCommand = async (interaction) => {
  return {
    type: 4,
    data: {
      content: await getRandomCharacter(),
    },
  };
};
