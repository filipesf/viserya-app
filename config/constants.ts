// export const CONFIG_PATH = join(process.cwd(), 'src/config');
// export const TEMPLATES_PATH = join(process.cwd(), 'src/utils/templates');
export const TEMPLATES_PATH = `${__dirname}/templates`;

export const LOCAL_STORAGE_THEME = 'viserya-theme';

export const COMMAND_END_SESSION = '!endsession';
export const COMMAND_SUBMIT = '!submit';
export const IGNORE_PREFIX = '!';
export const CHANNEL_IDS = ['1269072870605066270'];

if (!process.env.AUTHORIZATION_KEY)
  throw new Error('AUTHORIZATION_KEY is not set');
if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is not set');
if (!process.env.ASSISTANT_ID_DM) throw new Error('ASSISTANT_ID_DM is not set');
if (!process.env.NEXT_PUBLIC_APPLICATION_ID)
  throw new Error('APPLICATION_ID is not set');
if (!process.env.BOT_TOKEN) throw new Error('BOT_TOKEN is not set');
if (!process.env.PUBLIC_KEY) throw new Error('PUBLIC_KEY is not set');
if (!process.env.REGISTER_COMMANDS_KEY)
  throw new Error('REGISTER_COMMANDS_KEY is not set');

export const AUTHORIZATION_KEY = process.env.AUTHORIZATION_KEY!;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
export const ASSISTANT_ID_DM = process.env.ASSISTANT_ID_DM!;
export const CLIENT_APPLICATION_ID = process.env.NEXT_PUBLIC_APPLICATION_ID!;
export const BOT_TOKEN = process.env.BOT_TOKEN!;
export const PUBLIC_KEY = process.env.PUBLIC_KEY!;
export const REGISTER_COMMANDS_KEY = process.env.REGISTER_COMMANDS_KEY!;
