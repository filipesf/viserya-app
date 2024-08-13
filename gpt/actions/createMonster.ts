import { PromptAndTemplate } from '@viserya/types';
import { getTemplateById, getRandomMonster } from '@viserya/utils';

/**
 * Creates a formatted monster prompt.
 * @param prompt - The initial prompt string.
 * @returns The formatted monster prompt object containing the prompt and its template.
 */
export const createMonster = async (
  prompt: string,
): Promise<PromptAndTemplate> => {
  const template = await getTemplateById('monster');

  console.log(`Monster created: ${prompt}`);

  return {
    prompt,
    template,
  };
};

/**
 * Creates a random formatted monster prompt.
 * @returns The formatted random monster prompt object containing the prompt and its template.
 */
export const createRandomMonster = async (): Promise<PromptAndTemplate> => {
  const prompt = getRandomMonster();
  const template = await getTemplateById('monster');

  console.log(`Random monster created: ${prompt}`);

  return {
    prompt,
    template,
  };
};
