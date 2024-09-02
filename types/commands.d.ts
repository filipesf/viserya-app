import type {
  APIApplicationCommandInteraction,
  APIInteractionResponse,
  Interaction,
} from 'discord.js';

export type ExecuteCommand = (
  interaction:
    | APIApplicationCommandInteraction
    | APIChatInputApplicationCommandInteraction,
) => Promise<APIInteractionResponse> | Promise<void> | void;
