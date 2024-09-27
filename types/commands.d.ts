import { AutocompleteInteraction } from 'discord.js';
import type {
  APIApplicationCommandInteraction,
  APIInteractionResponse,
  Interaction,
} from 'discord.js';

export type ExecuteCommand = (
  interaction:
    | APIApplicationCommandInteraction
    | APIChatInputApplicationCommandInteraction,
) => Promise<APIInteractionResponse>;

export type AutocompleteOption = (
  interaction: AutocompleteInteraction,
) => Promise<APIInteractionResponse>;
