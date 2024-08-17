'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NEXT_PUBLIC_DISCORD_APP_ID } from '@viserya/config/constants';
import { viseryaApi } from '@viserya/services/api';
import { Button } from '@viserya/ui/Button';
import { CardsContainer } from '@viserya/ui/Card';
import { Icon } from '@viserya/ui/Icon/Icon';
import { Notify } from '@viserya/ui/Notify';

export default function Page() {
  const [status, setStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegisterCommand = async () => {
    try {
      setIsLoading(true);
      await viseryaApi.post('/bot/register-commands');
      setStatus('Commands registered!');
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setStatus(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus('');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <CardsContainer>
      {status && <Notify>{status}</Notify>}

      <Button
        $isLoading={isLoading}
        $variant="secondary"
        disabled={isLoading}
        onClick={handleRegisterCommand}
      >
        <Icon name="Keyboard" /> Register Commands
      </Button>

      <Button
        as={Link}
        $variant="outline"
        href={`https://discord.com/api/oauth2/authorize?client_id=${NEXT_PUBLIC_DISCORD_APP_ID}&permissions=2147483648&scope=bot`}
        target="_blank"
        rel="noreferrer noopener"
      >
        <Icon name="SignIn" /> Invite Discord Bot
      </Button>
    </CardsContainer>
  );
}
