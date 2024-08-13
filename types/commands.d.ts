import type {
  APIApplicationCommandInteraction,
  APIInteractionResponse,
  Interaction,
} from 'discord.js';

export type ExecuteCommand = (
  interaction: APIApplicationCommandInteraction,
) => Promise<APIInteractionResponse>;
