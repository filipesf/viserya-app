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
  const type = interaction.data?.options[0]?.value;

  console.log('🤖 EXECUTING GENERATE COMMAND');

  switch (type) {
    case 'adventure':
      content = await getRandomAdventure();
      console.log('📜 ADVENTURE GENERATED:', content);
      break;
    case 'character':
      content = await getRandomCharacter();
      console.log('🧙‍♂️ CHARACTER GENERATED:', content);
      break;
    case 'item':
      content = await getRandomItem();
      console.log('🪄 ITEM GENERATED:', content);
      break;
    case 'location':
      content = await getRandomLocation();
      console.log('🏰 LOCATION GENERATED:', content);
      break;
    case 'monster':
      content = await getRandomMonster();
      console.log('👹 MONSTER GENERATED:', content);
      break;
    case 'organisation':
      content = await getRandomOrganisation();
      console.log('⚒️ ORGANISATION GENERATED:', content);
      break;
    default:
      content = 'Invalid type selected.';
      break;
  }

  console.log('🎉 COMMAND EXECUTED SUCCESSFULLY');

  return {
    type: 4,
    data: {
      content,
    },
  };
};
