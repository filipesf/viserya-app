import { PromptAndTemplate } from '@viserya/types';
import { getTemplateById } from '@viserya/utils/getTemplateById';

/**
 * Generates lore based on the provided prompt.
 *
 * @param {string} prompt - The prompt used to generate the lore.
 * @returns {Promise<PromptAndTemplate>} A promise that resolves to a TemplatedPrompt object containing the prompt and the lore template.
 */
export const writeLore = async (prompt: string): Promise<PromptAndTemplate> => {
  const template = await getTemplateById('lore');

  console.log(`Lore documented: ${prompt}`);

  return {
    prompt,
    template,
  };
};
