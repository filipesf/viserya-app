'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import { fetchContent } from '@viserya/services/fetchContent';
import { viseryaApi } from '@viserya/services/viseryaApi';
import { CityData } from '@viserya/types';
import {
  Button,
  SectionContainer,
  Textarea,
  Notify,
  CharacterProfileCard,
  CharacterProfileContent,
  CharacterProfileName,
} from '@viserya/ui';
import { markdownToHtml } from '@viserya/utils/cleanMarkdown';

export default function Page() {
  const [status, setStatus] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [city, setCity] = useState<CityData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCityData = async () => {
    try {
      setIsLoading(true);
      const response = await viseryaApi.post(`/generate/world/city`, {
        prompt,
      });
      setCity(response.data as CityData);
      setStatus('City data retrieved!');
    } catch (error: any) {
      console.error(error);
      setStatus(error.message);
    } finally {
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
    name,
    origins,
    architecturalLayout,
    geographyAndEnvironment,
    populationAndCulture,
    factionsAndGuilds,
    internalConflicts,
    iconicSkyline,
    memorableFeatures,
    campaignIntegration,
  } = city || {};

  return (
    <>
      <SectionContainer>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Generate City Details"
          disabled={isLoading}
        />
      </SectionContainer>

      <SectionContainer $justify="space-between">
        {status && <Notify>{status}</Notify>}
        <Button
          $variant="info"
          $isLoading={isLoading}
          disabled={isLoading}
          onClick={handleCityData}
          $icon="City"
        >
          Generate City
        </Button>
      </SectionContainer>

      {city && (
        <CharacterProfileCard>
          {name && <h1 dangerouslySetInnerHTML={markdownToHtml(name)} />}

          <h2>Origins</h2>
          {origins?.foundingStory && (
            <>
              <h3>Founding Story.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(origins.foundingStory)}
              />
            </>
          )}
          {origins?.economicFoundation && (
            <>
              <h3>Economic Foundation.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  origins.economicFoundation,
                )}
              />
            </>
          )}
          {origins?.historicalInfluences && (
            <>
              <h3>Historical Influences.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  origins.historicalInfluences,
                )}
              />
            </>
          )}
          {origins?.growthPatterns && (
            <>
              <h3>Growth Patterns.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(origins.growthPatterns)}
              />
            </>
          )}

          <h2>Architectural Layout</h2>
          {architecturalLayout?.oldVsNewDistricts && (
            <>
              <h3>Old vs New Districts.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  architecturalLayout.oldVsNewDistricts,
                )}
              />
            </>
          )}
          {architecturalLayout?.landmarksAndInfluences && (
            <>
              <h3>Landmarks and Influences.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  architecturalLayout.landmarksAndInfluences,
                )}
              />
            </>
          )}
          {architecturalLayout?.expansionsAndModernization && (
            <>
              <h3>Expansions and Modernisation.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  architecturalLayout.expansionsAndModernization,
                )}
              />
            </>
          )}

          <h2>Geography and Environment</h2>
          {geographyAndEnvironment?.geographicalLocation && (
            <>
              <h3>Geographical Location.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  geographyAndEnvironment.geographicalLocation,
                )}
              />
            </>
          )}
          {geographyAndEnvironment?.buildingMaterials && (
            <>
              <h3>Building Materials.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  geographyAndEnvironment.buildingMaterials,
                )}
              />
            </>
          )}
          {geographyAndEnvironment?.environmentalIntegration && (
            <>
              <h3>Environmental Integration.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  geographyAndEnvironment.environmentalIntegration,
                )}
              />
            </>
          )}

          <h2>Population and Culture</h2>
          {populationAndCulture?.demographics && (
            <>
              <h3>Demographics.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  populationAndCulture.demographics,
                )}
              />
            </>
          )}
          <h3>Prominent NPCs</h3>
          {populationAndCulture?.prominentNPCs?.map((npc, idx) => (
            <div key={idx}>
              <p>
                <strong>
                  {npc.name} - {npc.role}
                </strong>
              </p>
              <p dangerouslySetInnerHTML={markdownToHtml(npc.description)} />
            </div>
          ))}
          {populationAndCulture?.culturalDynamics && (
            <>
              <h3>Cultural Dynamics.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  populationAndCulture.culturalDynamics,
                )}
              />
            </>
          )}
          {populationAndCulture?.realWorldParallels && (
            <>
              <h3>Real-World Parallels.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  populationAndCulture.realWorldParallels,
                )}
              />
            </>
          )}

          <h2>Factions and Guilds</h2>

          {factionsAndGuilds?.map((faction, idx) => (
            <>

                <h3>
                  {faction.name} ({faction.powerGroupType})
                </h3>
                <h4>Goals</h4>
                <div dangerouslySetInnerHTML={markdownToHtml(faction.goals)} />
                <h4>Conflict Points</h4>
                <div
                  dangerouslySetInnerHTML={markdownToHtml(
                    faction.conflictPoints,
                  )}
                />
                <h4>Historical Precedents</h4>
                <div
                  dangerouslySetInnerHTML={markdownToHtml(
                    faction.historicalPrecedents,
                  )}
                />
                <h4>Player Interaction</h4>
                <div
                  dangerouslySetInnerHTML={markdownToHtml(
                    faction.playerInteraction,
                  )}
                />

              <hr />
            </>
          ))}

          <h2>Internal Conflicts</h2>
          {internalConflicts?.currentIssues && (
            <>
              <h3>Current Issues.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  internalConflicts.currentIssues,
                )}
              />
            </>
          )}
          {internalConflicts?.hiddenThreats && (
            <>
              <h3>Hidden Threats.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  internalConflicts.hiddenThreats,
                )}
              />
            </>
          )}
          {internalConflicts?.historicalExamples && (
            <>
              <h3>Historical Examples.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  internalConflicts.historicalExamples,
                )}
              />
            </>
          )}

          <h2>Iconic Skyline</h2>
          {iconicSkyline?.definingFeatures && (
            <>
              <h3>Defining Features.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  iconicSkyline.definingFeatures,
                )}
              />
            </>
          )}
          {iconicSkyline?.visualCues && (
            <>
              <h3>Visual Cues.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  iconicSkyline.visualCues,
                )}
              />
            </>
          )}
          {iconicSkyline?.directionalLandmarks && (
            <>
              <h3>Directional Landmarks.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  iconicSkyline.directionalLandmarks,
                )}
              />
            </>
          )}
          {iconicSkyline?.moodAndTone && (
            <>
              <h3>Mood and Tone.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  iconicSkyline.moodAndTone,
                )}
              />
            </>
          )}

          <h2>Memorable Features</h2>
          {memorableFeatures?.uniqueLandmark && (
            <>
              <h3>Unique Landmark.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  memorableFeatures.uniqueLandmark,
                )}
              />
            </>
          )}
          {memorableFeatures?.narrativeHooks && (
            <>
              <h3>Narrative Hooks.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  memorableFeatures.narrativeHooks,
                )}
              />
            </>
          )}

          <h2>Campaign Integration</h2>
          {campaignIntegration?.storytellingPotential && (
            <>
              <h3>Storytelling Potential.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  campaignIntegration.storytellingPotential,
                )}
              />
            </>
          )}
          {campaignIntegration?.playerChoices && (
            <>
              <h3>Player Choices.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  campaignIntegration.playerChoices,
                )}
              />
            </>
          )}
          {campaignIntegration?.adaptationForPlayers && (
            <>
              <h3>Adaptation for Players.</h3>{' '}
              <p
                dangerouslySetInnerHTML={markdownToHtml(
                  campaignIntegration.adaptationForPlayers,
                )}
              />
            </>
          )}
        </CharacterProfileCard>
      )}
    </>
  );
}
