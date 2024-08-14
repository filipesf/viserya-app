import axios, { AxiosResponse } from 'axios';
import { RESTGetAPIApplicationCommandsResult } from 'discord.js';
import { DISCORD_BOT_TOKEN } from '@viserya/config/constants';

export const discord_api = axios.create({
  baseURL: 'https://discord.com/api/',
  timeout: 3000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Authorization',
    Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
  },
});

export const fetchBotCommands = async () => {
  return (await discord_api.get(
    `/applications/${process.env.NEXT_PUBLIC_DISCORD_APP_ID!}/commands`,
  )) as AxiosResponse<RESTGetAPIApplicationCommandsResult>;
};
