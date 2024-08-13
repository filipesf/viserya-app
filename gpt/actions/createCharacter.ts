import { PromptAndTemplate } from '@viserya/types';
import { getTemplateById, getRandomCharacter } from '@viserya/utils';

/**
 * Creates a formatted character prompt.
 * @param prompt - The initial prompt string.
 * @returns The formatted character prompt object containing the prompt and its template.
 */
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

/**
 * Creates a random formatted character prompt.
 * @returns The formatted random character prompt object containing the prompt and its template.
 */
export const createRandomCharacter = async (): Promise<PromptAndTemplate> => {
  const prompt = getRandomCharacter();
  const template = await getTemplateById('character');

  console.log(`Random character created: ${prompt}`);

  return {
    prompt,
    template,
  };
};
