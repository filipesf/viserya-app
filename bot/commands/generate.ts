import { SlashCommandBuilder } from '@discordjs/builders';
import { discordApi } from '@viserya/services/discordApi';
import { ExecuteCommand } from '@viserya/types';
import { getCharacterAttributes } from '@viserya/utils/getCharacterAttributes';
import {
  getRandomAdventure,
  getRandomCharacter,
  getRandomItem,
  getRandomLocation,
  getRandomMonster,
  getRandomOrganisation,
  getRandomTavern,
  getRandomTavernName,
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
        { name: 'Tavern', value: 'tavern' },
      ),
  );

export const execute: ExecuteCommand = async (interaction) => {
  const { id, token, application_id, data } = interaction;

  try {
    await discordApi.post(`/interactions/${id}/${token}/callback`, {
      type: 5,
      data: {
        content: '🤖 Processing your request... This might take a few seconds.',
        flags: 64,
      },
    });

    let messageContent = '';
    const type = data?.options[0]?.value;

    console.log('🤖 EXECUTING GENERATE COMMAND');

    switch (type) {
      case 'adventure':
        messageContent = await getRandomAdventure();
        console.log('📜 ADVENTURE GENERATED:', messageContent);
        break;
      case 'character':
        const randomCharacter = await getRandomCharacter();
        const abilityScores = getCharacterAttributes();
        messageContent = `${randomCharacter} ${Object.values(abilityScores)}`;
        console.log('🧙‍♂️ CHARACTER GENERATED:', messageContent);
        break;
      case 'item':
        messageContent = await getRandomItem();
        console.log('🪄 ITEM GENERATED:', messageContent);
        break;
      case 'location':
        messageContent = await getRandomLocation();
        console.log('🏰 LOCATION GENERATED:', messageContent);
        break;
      case 'monster':
        messageContent = await getRandomMonster();
        console.log('👹 MONSTER GENERATED:', messageContent);
        break;
      case 'organisation':
        messageContent = await getRandomOrganisation();
        console.log('⚒️ ORGANISATION GENERATED:', messageContent);
        break;
      case 'tavern':
        messageContent = `${await getRandomTavernName()}: ${await getRandomTavern()}`;
        console.log('🍻 TAVERN GENERATED:', messageContent);
        break;
      default:
        messageContent = 'Invalid type selected.';
        break;
    }

    const response = await discordApi.patch(
      `/webhooks/${application_id}/${token}/messages/@original`,
      { content: messageContent },
    );

    console.log('🎉 COMMAND EXECUTED SUCCESSFULLY');

    return response.data;
  } catch (error) {
    console.error('💀 ERROR EXECUTING /GENERATE COMMAND:', error);

    await discordApi.patch(
      `/webhooks/${application_id}/${token}/messages/@original`,
      {
        content:
          '🤖 An error occurred while generating your content. Please try again later.',
      },
    );
  }
};
