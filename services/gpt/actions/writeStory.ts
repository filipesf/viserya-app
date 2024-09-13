import { PromptAndTemplate } from '@viserya/types';
import { getTemplateById } from '@viserya/utils/getTemplateById';

/**
 * Generates a story based on the provided prompt.
 *
 * @param {string} prompt - The prompt used to generate the story.
 * @returns {Promise<PromptAndTemplate>} A promise that resolves to a TemplatedPrompt object containing the prompt and the story template.
 */
export const writeStory = async (
  prompt: string,
): Promise<PromptAndTemplate> => {
  const template = await getTemplateById('story');

  console.log(`Story written: ${prompt}`);

  return {
    prompt,
    template,
  };
};
