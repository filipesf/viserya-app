'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NEXT_PUBLIC_DISCORD_APP_ID } from '@viserya/config/constants';
import { viseryaApi } from '@viserya/services/viseryaApi';
import { ButtonIcon } from '@viserya/ui/Button';
import { CardsContainer } from '@viserya/ui/Card';
import { Notify } from '@viserya/ui/Notify';

const MOCK_CHANNEL_ID = '0000000000000000000';
const MOCK_USE_ID = '000000000000000000';

export default function Page() {
  const [status, setStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegisterCommand = async () => {
    try {
      setIsLoading(true);

      await viseryaApi.post('/bot/commands/register');

      setStatus('Commands registered!');
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setStatus(error.message);
      setIsLoading(false);
    }
  };

  const handleDatabase = async () => {
    try {
      setIsLoading(true);

      await viseryaApi.get('/db/create');

      setStatus('Databases created successfully');
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setStatus(error.message);
      setIsLoading(false);
    }
  };

  const handleStartSession = async () => {
    try {
      setIsLoading(true);

      const response = await viseryaApi.post(`/sessions/${MOCK_CHANNEL_ID}/start`, {
        userId: MOCK_USE_ID,
      });

      console.log('🟢', response);

      setStatus('Session started successfully');
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setStatus(error.message);
      setIsLoading(false);
    }
  };

  const checkSessions = async () => {
    try {
      setIsLoading(true);

      const responseAll = await viseryaApi.get(`/sessions`);
      const responseChannel = await viseryaApi.get(`/sessions/${MOCK_CHANNEL_ID}`);

      console.log('🔵', responseAll);
      console.log('🔵', responseChannel);

      setStatus('Session checked!');
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setStatus(error.message);
      setIsLoading(false);
    }
  };

  const handleEndSession = async () => {
    try {
      setIsLoading(true);

      const response = await viseryaApi.post(`/sessions/${MOCK_CHANNEL_ID}/end`);

      console.log('🔴', response);

      setStatus('Session ended successfully');
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setStatus(error.message);
      setIsLoading(false);
    }
  };

  const handleClearDB = async () => {
    try {
      setIsLoading(true);

      // await viseryaApi.delete('/sessions');
      await viseryaApi.delete('/sessions/messages');

      setStatus('Databases cleared successfully');
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

      <ButtonIcon
        $variant="secondary"
        $isLoading={isLoading}
        disabled={isLoading}
        onClick={handleRegisterCommand}
        icon="Command"
      />

      <ButtonIcon
        $variant="primary"
        $isLoading={isLoading}
        disabled={isLoading}
        onClick={handleDatabase}
        icon="Database"
      />

      <ButtonIcon
        $variant="info"
        $isLoading={isLoading}
        disabled={isLoading}
        onClick={checkSessions}
        icon="Check"
      />

      <ButtonIcon
        $variant="success"
        $isLoading={isLoading}
        disabled={isLoading}
        onClick={handleStartSession}
        icon="Play"
      />

      <ButtonIcon
        $variant="warning"
        $isLoading={isLoading}
        disabled={isLoading}
        onClick={handleEndSession}
        icon="Stop"
      />

      <ButtonIcon
        $variant="danger"
        $isLoading={isLoading}
        disabled={isLoading}
        onClick={handleClearDB}
        icon="Trash"
      />

      <ButtonIcon
        href={`https://discord.com/api/oauth2/authorize?client_id=${NEXT_PUBLIC_DISCORD_APP_ID}&permissions=2147483648&scope=bot`}
        rel="noreferrer noopener"
        target="_blank"
        icon="SignIn"
        as={Link}
      />
    </CardsContainer>
  );
}
