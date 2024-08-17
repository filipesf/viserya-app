import { SlashCommandBuilder } from '@discordjs/builders';
import { ExecuteCommand } from '@viserya/types';
import {
  getRandomAdventure,
  getRandomCharacter,
  getRandomItem,
  getRandomLocation,
  getRandomMonster,
  getRandomOrganisation,
} from '@viserya/utils/getRandomElement';

export const register = new SlashCommandBuilder()
  .setName('generate')
  .setDescription('Generate a random concept based on the provided type')
  .addStringOption((option) =>
    option
      .setName('type')
      .setDescription('The type of concept to generate')
      .setRequired(true)
      .addChoices(
        { name: 'Adventure', value: 'adventure' },
        { name: 'Character', value: 'character' },
        { name: 'Item', value: 'item' },
        { name: 'Location', value: 'location' },
        { name: 'Monster', value: 'monster' },
        { name: 'Organisation', value: 'organisation' },
      ),
  );

export const execute: ExecuteCommand = async (interaction) => {
  let content = '';

  console.log('--- GENERATE ---', interaction.data.options);

  // const type = interaction.options.getString('type');

  // switch (type) {
  //   case 'adventure':
  //     content = await getRandomAdventure();
  //     break;
  //   case 'character':
  //     content = await getRandomCharacter();
  //     break;
  //   case 'item':
  //     content = await getRandomItem();
  //     break;
  //   case 'location':
  //     content = await getRandomLocation();
  //     break;
  //   case 'monster':
  //     content = await getRandomMonster();
  //     break;
  //   case 'organisation':
  //     content = await getRandomOrganisation();
  //     break;
  //   default:
  //     content = 'Invalid type selected.';
  //     break;
  // }

  return {
    type: 4,
    data: {
      content,
    },
  };
};
