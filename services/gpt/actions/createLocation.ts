import { PromptAndTemplate } from '@viserya/types';
import { getRandomLocation } from '@viserya/utils/getRandomElement';
import { getTemplateById } from '@viserya/utils/getTemplateById';

/**
 * Creates a formatted location prompt.
 * @param prompt - The initial prompt string.
 * @returns The formatted location prompt object containing the prompt and its template.
 */
export const createLocation = async (
  prompt: string,
): Promise<PromptAndTemplate> => {
  const template = await getTemplateById('location');

  console.log(`Location created: ${prompt}`);

  return {
    prompt,
    template,
  };
};

/**
 * Creates a random formatted location prompt.
 * @returns The formatted random location prompt object containing the prompt and its template.
 */
export const createRandomLocation = async (): Promise<PromptAndTemplate> => {
  const prompt = await getRandomLocation();
  const template = await getTemplateById('location');

  console.log(`Random location created: ${prompt}`);

  return {
    prompt,
    template,
  };
};
