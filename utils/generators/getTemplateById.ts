import { readFileSync } from 'fs';
import { join } from 'path';
import { TEMPLATES_PATH } from '@viserya/config/constants';
import { readTemplateFile } from '../handlers/readJsonFile';

/**
 * Get a specific markdown template by filename.
 *
 * Reads the content of a markdown file based on the provided ID.
 *
 * @param {string} id - The unique identifier of the template.
 * @returns {Promise<string>} A promise that resolves to the content of the template.
 * @throws Will throw an error if the template is not found.
 */
export const getTemplateById = async (id: string): Promise<string> => {
  // const filePath = join(TEMPLATES_PATH, `${id}.md`);
  try {
    // const content = readFileSync(filePath, 'utf-8');
    const content = await readTemplateFile(id);
    return content;
  } catch (error) {
    throw new Error(`Template with ID '${id}' not found`);
  }
};
