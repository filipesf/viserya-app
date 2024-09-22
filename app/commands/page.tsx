'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { mithrazgar, voryn } from '@viserya/config/assistants';
import { NEXT_PUBLIC_DISCORD_APP_ID } from '@viserya/config/constants';
import { viseryaApi } from '@viserya/services/viseryaApi';
import { CharacterProfile } from '@viserya/types/sheet';
import { Button, SectionContainer } from '@viserya/ui';
import { Card, CardTitle } from '@viserya/ui/Card';
import { Notify } from '@viserya/ui/Notify';

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
      // await viseryaApi.post('/assistants', mithrazgar);

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

      // await Promise.all([
      //   viseryaApi.get('/db/create'),
      //   viseryaApi.delete('/sessions'),
      //   viseryaApi.delete('/sessions/messages'),
      //   viseryaApi.delete('/sessions/messages/1286412614020370484'),
      //   viseryaApi.delete('/sessions/messages/1286432911666446552'),
      //   viseryaApi.delete('/sessions/messages/1286579465207414816'),
      //   viseryaApi.delete('/sessions/messages/1285978202485030953'),
      //   viseryaApi.delete('/sessions/messages/1286005104771596409'),
      // ]);

      setStatus('Databases cleared successfully');
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

  const handleSessionName = async () => {
    try {
      setIsLoading(true);

      const { data: adventure } = await viseryaApi.post(
        `/actions/random/session/name`,
        {
          type: 'adventure',
        },
      );

      const { data: character } = await viseryaApi.post(
        `/actions/random/session/name`,
        {
          type: 'character',
        },
      );

      const { data: downtime } = await viseryaApi.post(
        `/actions/random/session/name`,
        {
          type: 'downtime',
        },
      );

      const { data: tavern } = await viseryaApi.post(
        `/actions/random/session/name`,
        {
          type: 'tavern',
        },
      );

      console.log('🛡️', {
        adventure: `${adventure.name}`,
        character: `${character.name}`,
        downtime: `${downtime.name}`,
        tavern: `${tavern.name}. ${tavern.description}`,
      });

      setStatus('Character data retrieved!');
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
      <SectionContainer>
        {status && <Notify>{status}</Notify>}

        <Button
          $variant="secondary"
          $isLoading={isLoading}
          disabled={isLoading}
          onClick={handleRegisterCommand}
          $icon="Command"
        >
          Register Commands
        </Button>

        <Button
          $variant="primary"
          $isLoading={isLoading}
          disabled={isLoading}
          onClick={handleCharacter}
          $icon="User"
        >
          Get Character
        </Button>

        <Button
          $variant="primary"
          $isLoading={isLoading}
          disabled={isLoading}
          onClick={handleSessionName}
          $icon="Sword"
        >
          Get Session Name
        </Button>

        <Button
          $variant="secondary"
          $isLoading={isLoading}
          disabled={isLoading}
          onClick={handleDatabase}
          $icon="Database"
        >
          Handle Database
        </Button>
      </SectionContainer>

      <SectionContainer>
        <Button
          href={`https://discord.com/api/oauth2/authorize?client_id=${NEXT_PUBLIC_DISCORD_APP_ID}&permissions=1759218604441591&scope=bot`}
          rel="noreferrer noopener"
          target="_blank"
          $icon="SignIn"
          as={Link}
        >
          Invite Bot
        </Button>
      </SectionContainer>

      {charProfile && (
        <SectionContainer>
          <Card>
            <hr />

            {avatar && (
              <Image
                src={avatar ?? ''}
                alt={name ?? ''}
                width={100}
                height={100}
                loading="lazy"
              />
            )}

            <div>
              <CardTitle>
                {name}, {race}, {classes}
              </CardTitle>
            </div>

            <div>
              <span>Age: {age} / </span>
              <span>Hair: {hair} / </span>
              <span>Eyes: {eyes} / </span>
              <br />
              <span>Skin: {skin} / </span>
              <span>Height: {height} / </span>
              <span>Weight: {weight}lbs.</span>
            </div>

            <hr />

            <p>{appearance}</p>

            <hr />
          </Card>
        </SectionContainer>
      )}
    </>
  );
}
