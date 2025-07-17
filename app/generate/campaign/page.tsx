'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import { fetchContent } from '@viserya/services/fetchContent';
import { viseryaApi } from '@viserya/services/viseryaApi';
import { ContentTypes } from '@viserya/types';
import { CampaignData } from '@viserya/types';
import {
  Button,
  ButtonGroup,
  ButtonIcon,
  CharacterProfileCard,
  CharacterProfileContent,
  CharacterProfileName,
  Notify,
  SectionContainer,
  Textarea,
} from '@viserya/ui';
import { markdownToHtml } from '@viserya/utils/cleanMarkdown';

export default function Page() {
  const [status, setStatus] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [campaign, setCampaign] = useState<CampaignData>();

  const handleCampaign = async () => {
    try {
      setIsLoading(true);

      const response = await viseryaApi.post(`/generate/campaign`, { prompt });

      setCampaign(response.data as CampaignData);

      setStatus('Campaign data retrieved!');
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setStatus(error.message);
      setIsLoading(false);
    }
  };

  const handlePrompt = async (contentType: ContentTypes) => {
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

  const shouldGenenerate = prompt.length > 50;

  const {
    title,
    overview,
    concept,
    location,
    mechanics,
    expand,
    conflict,
    charactersIntegration,
    characterArcs,
    npcs,
    factions,
    encounters,
    hooks,
    cover,
    notes,
  } = campaign || {};

  console.log(campaign);

  return (
    <>
      <SectionContainer>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
      </SectionContainer>

      <SectionContainer $justify="space-between">
        {status && <Notify>{status}</Notify>}

        <ButtonGroup>
          <ButtonIcon
            $variant="primary"
            $isLoading={isLoading}
            disabled={isLoading}
            onClick={() => handlePrompt('character')}
            icon="PersonSimpleHike"
          />

          <ButtonIcon
            $variant="primary"
            $isLoading={isLoading}
            disabled={isLoading}
            onClick={() => handlePrompt('monster')}
            icon="PawPrint"
          />

          <ButtonIcon
            $variant="primary"
            $isLoading={isLoading}
            disabled={isLoading}
            onClick={() => handlePrompt('item')}
            icon="MagicWand"
          />

          <ButtonIcon
            $variant="primary"
            $isLoading={isLoading}
            disabled={isLoading}
            onClick={() => handlePrompt('organisation')}
            icon="Bank"
          />

          <ButtonIcon
            $variant="primary"
            $isLoading={isLoading}
            disabled={isLoading}
            onClick={() => handlePrompt('location')}
            icon="CastleTurret"
          />

          <ButtonIcon
            $variant="primary"
            $isLoading={isLoading}
            disabled={isLoading}
            onClick={() => handlePrompt('tavern')}
            icon="BeerStein"
          />

          <ButtonIcon
            $variant="primary"
            $isLoading={isLoading}
            disabled={isLoading}
            onClick={() => handlePrompt('adventure')}
            icon="Tent"
          />
        </ButtonGroup>

        <Button
          $variant="info"
          $isLoading={isLoading}
          disabled={isLoading || !shouldGenenerate}
          onClick={handleCampaign}
          $icon="FlagBannerFold"
        >
          Generate Campaign
        </Button>
      </SectionContainer>

      <SectionContainer>
        {campaign && (
          <CharacterProfileCard>
            <CharacterProfileContent>
              <CharacterProfileName>
                {title && (
                  <strong dangerouslySetInnerHTML={markdownToHtml(title)} />
                )}
              </CharacterProfileName>
            </CharacterProfileContent>

            {concept && <p dangerouslySetInnerHTML={markdownToHtml(concept)} />}

            {overview && (
              <>
                <hr />
                <h3>Setting of the Campaign</h3>
                <p dangerouslySetInnerHTML={markdownToHtml(overview)} />
              </>
            )}

            {location && (
              <p>
                <strong>Initial Location</strong>
                <span dangerouslySetInnerHTML={markdownToHtml(location)} />
              </p>
            )}

            {mechanics && (
              <p>
                <strong>World Mechanics</strong>
                <span dangerouslySetInnerHTML={markdownToHtml(mechanics)} />
              </p>
            )}

            {expand && (
              <p>
                <strong>Expandable Details</strong>
                <span dangerouslySetInnerHTML={markdownToHtml(expand)} />
              </p>
            )}

            {conflict && (
              <>
                <hr />
                <h3>Initial Conflict</h3>
                <p dangerouslySetInnerHTML={markdownToHtml(conflict)} />
              </>
            )}

            {hooks && (
              <>
                <hr />
                <h3>Story Arcs</h3>

                {hooks.map((hook) => (
                  <div key={hook.title}>
                    <strong>{hook.title}</strong>
                    <p
                      dangerouslySetInnerHTML={markdownToHtml(hook.description)}
                    />
                  </div>
                ))}
              </>
            )}

            {(charactersIntegration || characterArcs) && (
              <>
                <hr />
                <h3>Player Involvement</h3>

                {charactersIntegration && (
                  <p
                    dangerouslySetInnerHTML={markdownToHtml(
                      charactersIntegration,
                    )}
                  />
                )}

                {characterArcs && (
                  <p dangerouslySetInnerHTML={markdownToHtml(characterArcs)} />
                )}
              </>
            )}

            {npcs && (
              <>
                <hr />
                <h3>Relevant NPCs</h3>

                {npcs.map((npc) => (
                  <div key={npc.name}>
                    <strong>{npc.name}</strong>
                    <p
                      dangerouslySetInnerHTML={markdownToHtml(npc.description)}
                    />
                  </div>
                ))}
              </>
            )}

            {factions && (
              <>
                <hr />
                <h3>Factions</h3>

                {factions.map((faction) => (
                  <p key={faction.name}>
                    <strong>{faction.name}</strong>
                    <span
                      dangerouslySetInnerHTML={markdownToHtml(
                        faction.description,
                      )}
                    />
                  </p>
                ))}
              </>
            )}

            {encounters && (
              <>
                <hr />
                <h3>Encounters</h3>

                <ol>
                  {encounters.map((encounter) => (
                    <li key={encounter.title}>
                      <strong>
                        {encounter.title} ({encounter.type})
                      </strong>

                      <span
                        dangerouslySetInnerHTML={markdownToHtml(
                          encounter.description,
                        )}
                      />
                    </li>
                  ))}
                </ol>
              </>
            )}

            {cover && (
              <>
                <hr />
                <h3>Cover Image</h3>
                <p dangerouslySetInnerHTML={markdownToHtml(cover)} />
              </>
            )}

            {notes && (
              <>
                <hr />
                <h3>Closing Note to the DM</h3>
                <p dangerouslySetInnerHTML={markdownToHtml(notes)} />
              </>
            )}
          </CharacterProfileCard>
        )}
      </SectionContainer>
    </>
  );
}
