/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
    DISCORD_AUTH_KEY: process.env.DISCORD_AUTH_KEY,
    REGISTER_COMMANDS_KEY: process.env.REGISTER_COMMANDS_KEY,
    CLIENT_APPLICATION_ID: process.env.DISCORD_APP_ID,
    AUTHORIZATION_KEY: process.env.AUTHORIZATION_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ASSISTANT_ID_DM: process.env.ASSISTANT_ID_DM,
  },
  compiler: {
    styledComponents: true,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.node/,
      use: 'node-loader',
    });

    return config;
  },
};

export default nextConfig;
