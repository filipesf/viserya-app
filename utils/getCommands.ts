import { resolve } from 'path';
import { SlashCommandBuilder } from '@discordjs/builders';
import { ExecuteCommand } from '@viserya/types';
import getTsFiles from './getTsFiles';

type CommandModule = {
  execute: ExecuteCommand;
  register: SlashCommandBuilder;
};

let SeenCommands: {
  [key: string]: CommandModule;
} | null = null;

const getCommands = async () => {
  if (SeenCommands) return SeenCommands;
  const commandDir = resolve(process.cwd(), 'bot/commands');
  const commandFiles = getTsFiles(commandDir);
  const commands: { [key: string]: CommandModule } = {};

  console.log('--- commandDir', commandDir);
  console.log('--- commandFiles', commandFiles);
  console.log('--- commands', commands);
  console.log('--- SeenCommands 1', SeenCommands);

  for (const file of commandFiles) {
    try {
      const fileContents = (await import(
        '../bot/commands/' + file
      )) as CommandModule;
      if (fileContents) commands[file] = fileContents;
    } catch (error) {
      continue;
    }
  }

  SeenCommands = commands;

  console.log('--- SeenCommands 2', SeenCommands);

  return commands;
};

export default getCommands;
