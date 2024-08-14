'use client';

import axios from 'axios';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { NEXT_PUBLIC_DISCORD_APP_ID } from '@viserya/config/constants';
import { Logo } from '@viserya/ui/Logo';
import { PageHeader } from '../../ui/PageHeader/PageHeader';

export default function Page() {
  const [registerCommandsKey, setRegisterCommandsKey] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const handleRegisterCommand = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestLink =
      '/api/bot/register-commands?REGISTER_COMMANDS_KEY=' + registerCommandsKey;

    try {
      setStatus('Loading...');
      if (registerCommandsKey.length > 0) {
        await axios.post(requestLink);
      }
      setStatus('Commands registered!');
    } catch (error: any) {
      console.log(error);
      setStatus(error.message);
    }
  };

  return (
    <>
      <PageHeader>
        <Logo />
      </PageHeader>

      {status && <p className="status">{status}</p>}

      <form onSubmit={handleRegisterCommand}>
        <input
          type="text"
          placeholder="Register Commands Key"
          value={registerCommandsKey}
          onChange={(e) => setRegisterCommandsKey(e.target.value)}
        />

        <button disabled={registerCommandsKey.length < 1} type="submit">
          Register Commands
        </button>
      </form>

      <center>
        <Link
          href={`https://discord.com/api/oauth2/authorize?client_id=${NEXT_PUBLIC_DISCORD_APP_ID}&permissions=2147483648&scope=bot`}
          target="_blank"
          rel="noreferrer noopener"
        >
          Invite Discord Bot
        </Link>
      </center>
    </>
  );
}
