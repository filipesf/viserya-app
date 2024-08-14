import { PromptAndTemplate } from '@viserya/types';
import { getRandomItem } from '@viserya/utils/getRandomElement';
import { getTemplateById } from '@viserya/utils/getTemplateById';

export const createItem = async (
  prompt: string,
): Promise<PromptAndTemplate> => {
  const template = await getTemplateById('item');

  console.log(`Item created: ${prompt}`);

  return {
    prompt,
    template,
  };
};

export const createRandomItem = async (): Promise<PromptAndTemplate> => {
  const prompt = await getRandomItem();
  const template = await getTemplateById('item');

  console.log(`Random item created: ${prompt}`);

  return {
    prompt,
    template,
  };
};
