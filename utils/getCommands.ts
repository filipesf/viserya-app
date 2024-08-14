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
  const commandDir = resolve(process.cwd(), 'src/bot/commands');
  const commandFiles = getTsFiles(commandDir);
  const commands: { [key: string]: CommandModule } = {};

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

  return commands;
};

export default getCommands;
