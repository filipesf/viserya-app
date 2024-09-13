import { PromptAndTemplate } from '@viserya/types';
import { getRandomAdventure } from '@viserya/utils/getRandomElement';
import { getTemplateById } from '@viserya/utils/getTemplateById';

export const createAdventure = async (
  prompt: string,
): Promise<PromptAndTemplate> => {
  const template = await getTemplateById('adventure');

  console.log(`Adventure created: ${prompt}`);

  return {
    prompt,
    template,
  };
};

export const createRandomAdventure = async (): Promise<PromptAndTemplate> => {
  const prompt = await getRandomAdventure();
  const template = await getTemplateById('adventure');

  console.log(`Random adventure created: ${prompt}`);

  return {
    prompt,
    template,
  };
};
