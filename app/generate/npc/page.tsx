'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import { fetchContent } from '@viserya/services/fetchContent';
import { viseryaApi } from '@viserya/services/viseryaApi';
import { ContentTypes } from '@viserya/types';
import { NpcData } from '@viserya/types/npc';
import {
  Button,
  ButtonGroup,
  ButtonIcon,
  Notify,
  NPCProfile,
  SectionContainer,
  Textarea,
} from '@viserya/ui';
import { getRandomPlaceholder } from '@viserya/utils/getRandomElement';

export default function Page() {
  const [status, setStatus] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [npcProfile, setNPCProfile] = useState<NpcData>();

  const handleNPC = async () => {
    try {
      setIsLoading(true);

      const response = await viseryaApi.post(`/generate/npc`, { prompt });

      setNPCProfile(response.data as NpcData);

      setStatus('NPC data retrieved!');
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setStatus(error.message);
      setIsLoading(false);
    }
  };

  const saveNPC = async () => {
    try {
      setIsLoading(true);
      setStatus('NPC saved successfully!');
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setStatus(error.message);
      setIsLoading(false);
    }
  };

  const handleNPCPrompt = async (contentType: ContentTypes) => {
    try {
      setIsLoading(true);

      const content = await fetchContent(contentType);

      setPrompt(content);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
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

  const shouldGenenerateNpc = prompt.length > 50;

  return (
    <>
      <SectionContainer>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
          placeholder={getRandomPlaceholder()}
        />
      </SectionContainer>

      <SectionContainer $justify="space-between">
        {status && <Notify>{status}</Notify>}

        <ButtonGroup>
          <ButtonIcon
            $variant="primary"
            $isLoading={isLoading}
            disabled={isLoading}
            onClick={() => handleNPCPrompt('character')}
            icon="PersonSimpleHike"
          />

          <ButtonIcon
            $variant="primary"
            $isLoading={isLoading}
            disabled={isLoading}
            onClick={() => handleNPCPrompt('monster')}
            icon="PawPrint"
          />

          <ButtonIcon
            $variant="primary"
            $isLoading={isLoading}
            disabled={isLoading}
            onClick={() => handleNPCPrompt('item')}
            icon="MagicWand"
          />

          <ButtonIcon
            $variant="primary"
            $isLoading={isLoading}
            disabled={isLoading}
            onClick={() => handleNPCPrompt('organisation')}
            icon="Bank"
          />

          <ButtonIcon
            $variant="primary"
            $isLoading={isLoading}
            disabled={isLoading}
            onClick={() => handleNPCPrompt('location')}
            icon="CastleTurret"
          />

          <ButtonIcon
            $variant="primary"
            $isLoading={isLoading}
            disabled={isLoading}
            onClick={() => handleNPCPrompt('tavern')}
            icon="BeerStein"
          />

          <ButtonIcon
            $variant="primary"
            $isLoading={isLoading}
            disabled={isLoading}
            onClick={() => handleNPCPrompt('adventure')}
            icon="Tent"
          />
        </ButtonGroup>

        <Button
          $variant="info"
          $isLoading={isLoading}
          disabled={isLoading || !shouldGenenerateNpc}
          onClick={handleNPC}
          $icon="PersonArmsSpread"
        >
          Generate NPC
        </Button>
      </SectionContainer>

      <SectionContainer>
        {npcProfile && (
          <>
            <NPCProfile {...npcProfile} />

            {/*
            <ButtonGroup $justify="space-between" $width="100%">
              <Button
                $variant="success"
                $isLoading={isLoading}
                disabled={isLoading}
                onClick={saveNPC}
                $icon="Check"
              >
                Save
              </Button>

              <Button
                $variant="danger"
                $isLoading={isLoading}
                disabled={isLoading}
                onClick={() => setNPCProfile(undefined)}
                $icon="Broom"
              >
                Clear
              </Button>
            </ButtonGroup>
            */}
          </>
        )}
      </SectionContainer>
    </>
  );
}
