import { PromptAndTemplate } from '@viserya/types';
import {
  getRandomTavern,
  getRandomTavernName,
} from '@viserya/utils/getRandomElement';
import { getTemplateById } from '@viserya/utils/getTemplateById';

/**
 * Creates a formatted tavern prompt.
 * @param prompt - The initial prompt string.
 * @returns The formatted tavern prompt object containing the prompt and its template.
 */
export const createTavern = async (
  prompt: string,
): Promise<PromptAndTemplate> => {
  const template = await getTemplateById('tavern');

  console.log(`Tavern created: ${prompt}`);

  return {
    prompt,
    template,
  };
};

/**
 * Creates a random formatted tavern prompt.
 * @returns The formatted random tavern prompt object containing the prompt and its template.
 */
export const createRandomTavern = async (): Promise<PromptAndTemplate> => {
  const prompt = await getRandomTavern();
  const template = await getTemplateById('tavern');

  console.log(`Random tavern created: ${prompt}`);

  return {
    prompt,
    template,
  };
};

/**
 * Creates a random tavern name.
 * @returns The random tavern name string.
 */
export const createRandomTavernName = async (): Promise<{ prompt: string }> => {
  const prompt = await getRandomTavernName();

  console.log(`Random tavern name created: ${prompt}`);

  return { prompt };
};
