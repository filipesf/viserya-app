import { NextRequest, NextResponse } from 'next/server';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import {
  city,
  cities,
  kingdoms,
  scenario,
  settlements,
} from '@viserya/config/instructions';
import { openai } from '@viserya/config/openai';
import { CityData } from '@viserya/types';

export const runtime = 'nodejs';
export const maxDuration = 300;

const CitySchema = z.object({
  name: z.string(),
  origins: z.object({
    foundingStory: z.string(),
    economicFoundation: z.string(),
    historicalInfluences: z.string(),
    growthPatterns: z.string(),
  }),
  architecturalLayout: z.object({
    oldVsNewDistricts: z.string(),
    landmarksAndInfluences: z.string(),
    expansionsAndModernization: z.string(),
  }),
  geographyAndEnvironment: z.object({
    geographicalLocation: z.string(),
    buildingMaterials: z.string(),
    environmentalIntegration: z.string(),
  }),
  populationAndCulture: z.object({
    demographics: z.string(),
    prominentNPCs: z.array(
      z.object({
        name: z.string(),
        role: z.string(),
        description: z.string(),
      }),
    ),
    culturalDynamics: z.string(),
    realWorldParallels: z.string(),
  }),
  factionsAndGuilds: z.array(
    z.object({
      name: z.string(),
      powerGroupType: z.enum(['Faction', 'Guild']),
      goals: z.string(),
      conflictPoints: z.string(),
      historicalPrecedents: z.string(),
      playerInteraction: z.string(),
    }),
  ),
  internalConflicts: z.object({
    currentIssues: z.string(),
    hiddenThreats: z.string(),
    historicalExamples: z.string(),
  }),
  iconicSkyline: z.object({
    definingFeatures: z.string(),
    visualCues: z.string(),
    directionalLandmarks: z.string(),
    moodAndTone: z.string(),
  }),
  memorableFeatures: z.object({
    uniqueLandmark: z.string(),
    narrativeHooks: z.string(),
  }),
  campaignIntegration: z.object({
    storytellingPotential: z.string(),
    playerChoices: z.string(),
    adaptationForPlayers: z.string(),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    console.log(
      [city, scenario, kingdoms, cities, settlements, prompt].join('\n\n'),
    );

    const completion = await openai.beta.chat.completions.parse({
      model: 'gpt-4o-mini',
      temperature: 1,
      messages: [
        { role: 'system', content: city },
        { role: 'system', content: scenario },
        { role: 'system', content: kingdoms },
        { role: 'system', content: cities },
        { role: 'system', content: settlements },
        { role: 'user', content: prompt },
      ],
      response_format: zodResponseFormat(CitySchema, 'city_data'),
    });

    const data = completion.choices[0].message.parsed as CityData;

    console.log(data);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
