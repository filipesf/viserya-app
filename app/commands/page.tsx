'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NEXT_PUBLIC_DISCORD_APP_ID } from '@viserya/config/constants';
import { viseryaApi } from '@viserya/services/viseryaApi';
import { ButtonIcon } from '@viserya/ui/Button';
import { CardsContainer } from '@viserya/ui/Card';
import { Notify } from '@viserya/ui/Notify';

const channelId = 'ch_07091988';
const userId = 'id_07091988';

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

  const handleDatabase = async () => {
    try {
      setIsLoading(true);

      await viseryaApi.get('/sessions/create-sessions-table');

      setStatus('Database created successfully');
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setStatus(error.message);
      setIsLoading(false);
    }
  };

  const handleNewSession = async () => {
    try {
      setIsLoading(true);

      await viseryaApi.post('/sessions/start-new-session', {
        threadId: 'threadId_003',
        channelId: 'channelId_003',
        userId: 'userId_003',
      });

      setStatus('Session created successfully');
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

      const response = await viseryaApi.post(
        `/sessions/${channelId}/start`,
        null,
        {
          params: { userId: userId },
        },
      );

      console.log(response.data);

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

      const response = await viseryaApi.get(`/sessions/${channelId}`);

      console.log(response.data);

      setStatus('Session checked!');
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
      await viseryaApi.delete('/sessions/clear');
      setStatus('Database cleared successfully');
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
        $variant="primary"
        $isLoading={isLoading}
        disabled={isLoading}
        onClick={handleRegisterCommand}
        icon="Command"
      />

      <ButtonIcon
        $variant="secondary"
        $isLoading={isLoading}
        disabled={isLoading}
        onClick={handleDatabase}
        icon="Database"
      />

      <ButtonIcon
        $variant="info"
        $isLoading={isLoading}
        disabled={isLoading}
        onClick={handleNewSession}
        icon="Plus"
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
        onClick={checkSessions}
        icon="Check"
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
