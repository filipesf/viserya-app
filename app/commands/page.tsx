'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NEXT_PUBLIC_DISCORD_APP_ID } from '@viserya/config/constants';
import { viseryaApi } from '@viserya/services/viseryaApi';
import { CharacterProfile } from '@viserya/types/sheet';
import { ButtonIcon } from '@viserya/ui/Button';
import { Card, CardHeader, CardsContainer, CardTitle } from '@viserya/ui/Card';
import { Notify } from '@viserya/ui/Notify';

const MOCK_CHANNEL_ID = '0000000000000000000';
const MOCK_USE_ID = '000000000000000000';

const CHARACTER_SHEET_ID = '127555805'; // Kragmir
// const CHARACTER_SHEET_ID = '131689409'; // Drakonis

export default function Page() {
  const [status, setStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [charProfile, setCharProfile] = useState<CharacterProfile | null>(null);

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

      const response = await viseryaApi.post(
        `/sessions/${MOCK_CHANNEL_ID}/start`,
        {
          userId: MOCK_USE_ID,
        },
      );

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
      const responseChannel = await viseryaApi.get(
        `/sessions/${MOCK_CHANNEL_ID}`,
      );

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

      const response = await viseryaApi.post(
        `/sessions/${MOCK_CHANNEL_ID}/end`,
      );

      console.log('🔴', response);

      setStatus('Session ended successfully');
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setStatus(error.message);
      setIsLoading(false);
    }
  };

  const handleCharacter = async () => {
    try {
      setIsLoading(true);

      const response = await viseryaApi.get(`/characters`, {
        params: { characterSheetId: CHARACTER_SHEET_ID },
      });

      setCharProfile(response.data as CharacterProfile);

      setStatus('Character data retrieved!');
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

      await viseryaApi.delete('/sessions');
      await viseryaApi.delete('/sessions/messages');

      setStatus('Databases cleared successfully');
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setStatus(error.message);
      setIsLoading(false);
    }
  };

  const handleTextToSpeech = async () => {
    try {
      setIsLoading(true);

      const response = await viseryaApi.post('assistants/tts', {
        text: 'Greetings, brave adventurers! I am Voryn, the Guardian of the Deep, guiding you through the enchanting mysteries of the Realm of Viserya. Together, we shall weave tales of wonder and heroism!',
      });

      console.log('🟢', response.data);

      setStatus('Text-to-speech created successfully');
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

  const {
    avatar,
    name,
    race,
    classes,
    background,
    details,
    traits,
    backstory,
    organizations,
    allies,
    enemies,
    notes,
  } = charProfile || {};

  const { age, hair, eyes, skin, height, weight, appearance } = details || {};
  const { personality, ideals, bonds, flaws } = traits || {};

  return (
    <>
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
          $variant="danger"
          $isLoading={isLoading}
          disabled={isLoading}
          onClick={handleTextToSpeech}
          icon="CassetteTape"
        />

        <ButtonIcon
          $variant="info"
          $isLoading={isLoading}
          disabled={isLoading}
          onClick={handleCharacter}
          icon="User"
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
          href={`https://discord.com/api/oauth2/authorize?client_id=${NEXT_PUBLIC_DISCORD_APP_ID}&permissions=1755919855124465&scope=bot`}
          rel="noreferrer noopener"
          target="_blank"
          icon="SignIn"
          as={Link}
        />
      </CardsContainer>

      {charProfile && (
        <CardsContainer>
          <Card>
            {avatar && (
              <Image
                src={avatar ?? ''}
                alt={name ?? ''}
                width={100}
                height={100}
                loading="lazy"
              />
            )}

            <CardHeader>
              <CardTitle>
                {name}, {race}, {classes}
              </CardTitle>
            </CardHeader>

            <div>
              <span>Age: {age} / </span>
              <span>Hair: {hair} / </span>
              <span>Eyes: {eyes} / </span>
              <br />
              <span>Skin: {skin} / </span>
              <span>Height: {height} / </span>
              <span>Weight: {weight}lbs.</span>
            </div>

            <>
              <CardTitle>Backstory</CardTitle>
              <p>{backstory}</p>
            </>

            <>
              <CardTitle>Appearance</CardTitle>
              <p>{appearance}</p>
            </>
          </Card>
        </CardsContainer>
      )}
    </>
  );
}
