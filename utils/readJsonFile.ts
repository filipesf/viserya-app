'use server';

import { promises as fs } from 'fs';
import path from 'path';

const generateFilePath = (
  fileName: string,
  directory: string,
  extension: string,
): string => {
  return path.join(
    process.cwd(),
    'config',
    directory,
    `${fileName}.${extension}`,
  );
};

const readFileContent = async (filePath: string): Promise<string> => {
  return await fs.readFile(filePath, 'utf-8');
};

export const readDataFile = async <T>(fileName: string): Promise<any> => {
  try {
    const filePath = generateFilePath(fileName, 'data', 'json');
    const fileContents = await readFileContent(filePath);
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error reading JSON file: ${fileName}`, error);
    throw new Error('Could not read JSON file');
  }
};

export const readTemplateFile = async (fileName: string): Promise<string> => {
  try {
    const filePath = generateFilePath(fileName, 'templates', 'md');
    return await readFileContent(filePath);
  } catch (error) {
    console.error(`Error reading template file: ${fileName}`, error);
    throw new Error('Could not read template file');
  }
};
