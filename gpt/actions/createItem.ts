import { PromptAndTemplate } from '@viserya/types';
import { getTemplateById, getRandomItem } from '@viserya/utils';

/**
 * Creates a formatted item prompt.
 * @param prompt - The initial prompt string.
 * @returns The formatted item prompt object containing the prompt and its template.
 */
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

/**
 * Creates a random formatted item prompt.
 * @returns The formatted random item prompt object containing the prompt and its template.
 */
export const createRandomItem = async (): Promise<PromptAndTemplate> => {
  const prompt = getRandomItem();
  const template = await getTemplateById('item');

  console.log(`Random item created: ${prompt}`);

  return {
    prompt,
    template,
  };
};
