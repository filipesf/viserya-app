import { PromptAndTemplate } from '@viserya/types';
import { getRandomCharacter } from '@viserya/utils/getRandomElement';
import { getTemplateById } from '@viserya/utils/getTemplateById';

export const createCharacter = async (
  prompt: string,
): Promise<PromptAndTemplate> => {
  const template = await getTemplateById('character');

  console.log(`Character created: ${prompt}`);

  return {
    prompt,
    template,
  };
};

export const createRandomCharacter = async (): Promise<PromptAndTemplate> => {
  const prompt = await getRandomCharacter();
  const template = await getTemplateById('character');

  console.log(`Random character created: ${prompt}`);

  return {
    prompt,
    template,
  };
};
