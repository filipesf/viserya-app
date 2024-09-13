import axios, { AxiosResponse } from 'axios';
import {
  AUTHORIZATION_KEY,
  DISCORD_BOT_TOKEN,
} from '@viserya/config/constants';

export const discordApi = axios.create({
  baseURL: 'https://discord.com/api/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Authorization, AUTHORIZATION_KEY',
    Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
    AUTHORIZATION_KEY: AUTHORIZATION_KEY,
  },
});
