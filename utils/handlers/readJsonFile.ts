import { promises as fs } from 'fs';
import path from 'path';

export function generateFilePath(
  fileName: string,
  directory: string,
  extension: string,
): string {
  return path.join(
    process.cwd(),
    'config',
    directory,
    `${fileName}.${extension}`,
  );
}

export async function readFileContent(filePath: string): Promise<string> {
  return await fs.readFile(filePath, 'utf-8');
}

export async function readDataFile(fileName: string): Promise<any> {
  const filePath = generateFilePath(fileName, 'data', 'json');
  const fileContents = await readFileContent(filePath);
  return JSON.parse(fileContents);
}

export async function readTemplateFile(fileName: string): Promise<string> {
  const filePath = generateFilePath(fileName, 'templates', 'md');
  return await readFileContent(filePath);
}
