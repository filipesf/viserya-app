import { PromptAndTemplate } from '@viserya/types';
import { getTemplateById, getRandomAdventure } from '@viserya/utils';

/**
 * Creates a formatted adventure prompt.
 * @param prompt - The initial prompt string.
 * @returns The formatted adventure prompt object containing the prompt and its template.
 */
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

/**
 * Creates a random formatted adventure prompt.
 * @returns The formatted random adventure prompt object containing the prompt and its template.
 */
export const createRandomAdventure = async (): Promise<PromptAndTemplate> => {
  const prompt = getRandomAdventure();
  const template = await getTemplateById('adventure');

  console.log(`Random adventure created: ${prompt}`);

  return {
    prompt,
    template,
  };
};
