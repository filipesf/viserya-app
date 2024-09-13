import { PromptAndTemplate } from '@viserya/types';
import { getRandomOrganisation } from '@viserya/utils/getRandomElement';
import { getTemplateById } from '@viserya/utils/getTemplateById';

/**
 * Creates a formatted organisation prompt.
 * @param prompt - The initial prompt string.
 * @returns The formatted organisation prompt object containing the prompt and its template.
 */
export const createOrganisation = async (
  prompt: string,
): Promise<PromptAndTemplate> => {
  const template = await getTemplateById('organisation');

  console.log(`Organisation created: ${prompt}`);

  return {
    prompt,
    template,
  };
};

/**
 * Creates a random formatted organisation prompt.
 * @returns The formatted random organisation prompt object containing the prompt and its template.
 */
export const createRandomOrganisation =
  async (): Promise<PromptAndTemplate> => {
    const prompt = await getRandomOrganisation();
    const template = await getTemplateById('organisation');

    console.log(`Random organisation created: ${prompt}`);

    return {
      prompt,
      template,
    };
  };
