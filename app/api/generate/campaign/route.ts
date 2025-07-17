import { NextRequest, NextResponse } from 'next/server';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import {
  campaign,
  cities,
  kingdoms,
  scenario,
  settlements,
} from '@viserya/config/instructions';
import { openai } from '@viserya/config/openai';
import { CampaignData } from '@viserya/types';

export const runtime = 'nodejs';
export const maxDuration = 300;

const CampaignSchema = z.object({
  title: z.string(),
  overview: z.string(),
  tone: z.string(),
  concept: z.string(),
  location: z.string(),
  mechanics: z.string(),
  expand: z.string(),
  conflict: z.string(),
  charactersIntegration: z.string(),
  characterArcs: z.string(),
  npcs: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
    }),
  ),
  factions: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
    }),
  ),
  scenarios: z.string(),
  encounters: z.array(
    z.object({
      title: z.string(),
      type: z.enum(['Combat', 'Exploration', 'Social']),
      description: z.string(),
    }),
  ),
  hooks: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    }),
  ),
  cover: z.string(),
  notes: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    console.log(
      [campaign, scenario, kingdoms, cities, settlements, prompt].join('\n\n'),
    );

    const completion = await openai.beta.chat.completions.parse({
      model: 'gpt-4o-mini',
      temperature: 1,
      messages: [
        { role: 'system', content: campaign },
        { role: 'system', content: scenario },
        { role: 'system', content: kingdoms },
        { role: 'system', content: cities },
        { role: 'system', content: settlements },
        { role: 'user', content: prompt },
      ],
      response_format: zodResponseFormat(CampaignSchema, 'campaign_data'),
    });

    const data = completion.choices[0].message.parsed as CampaignData;

    console.log(data);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
