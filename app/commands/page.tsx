'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import React from 'react';
import { NEXT_PUBLIC_DISCORD_APP_ID } from '@viserya/config/constants';
import { viseryaApi } from '@viserya/services/viseryaApi';
import { CharacterProfile as CharacterProfileProps } from '@viserya/types/sheet';
import { Button, CharacterProfile, SectionContainer } from '@viserya/ui';
import { Notify } from '@viserya/ui/Notify';

const CHARACTER_SHEET_ID = '133561915'; // Vaelorn
// const CHARACTER_SHEET_ID = '127555805'; // Kragmir
// const CHARACTER_SHEET_ID = '131689409'; // Drakonis

export default function Page() {
  const [status, setStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [charProfile, setCharProfile] = useState<CharacterProfileProps | null>(
    null,
  );

  const handleDatabase = async () => {
    try {
      setIsLoading(true);

      // const deletions = [
      //   {
      //     id: '641f206e-40f7-4547-8d87-1c3d004fe77f',
      //     channelId: '1289238599086379109',
      //   },
      // ];

      const response = await Promise.all([
        // viseryaApi.get('/db/create'),
        // viseryaApi.delete('/sessions'),
        // viseryaApi.delete('/sessions/messages'),
        // viseryaApi.delete('/sessions/messages/1286816543216500768'),
        // deletions.map((deletion) =>
        //   viseryaApi.delete(`/sessions/${deletion.channelId}`, {
        //     params: { id: deletion.id },
        //   }),
        // ),
      ]);

      console.log(response);

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

      const response = await viseryaApi.get(`/sheet/${CHARACTER_SHEET_ID}`);

      setCharProfile(response.data as CharacterProfileProps);

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

  return (
    <>
      <SectionContainer>
        {status && <Notify>{status}</Notify>}

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
          $variant="secondary"
          $isLoading={isLoading}
          disabled={isLoading}
          onClick={handleDatabase}
          $icon="Database"
        >
          Handle Database
        </Button>

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
        <>
          <hr />
          <SectionContainer>
            <CharacterProfile char={charProfile} />
          </SectionContainer>
        </>
      )}
    </>
  );
}
