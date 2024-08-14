/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    AUTHORIZATION_KEY: process.env.AUTHORIZATION_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ASSISTANT_ID_DM: process.env.ASSISTANT_ID_DM,
    NEXT_PUBLIC_DISCORD_APP_ID: process.env.NEXT_PUBLIC_DISCORD_APP_ID,
    DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
    DISCORD_AUTH_KEY: process.env.DISCORD_AUTH_KEY,
    REGISTER_COMMANDS_KEY: process.env.REGISTER_COMMANDS_KEY,
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
