import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@viserya/config/openai';
import { getUUID } from '@viserya/utils/getUUID';
import { readDataFile } from '@viserya/utils/readFiles';

export const dynamic = 'force-dynamic';

export type Prompts = {
  description: DescriptionPrompt;
  image: ImagePrompt;
};

export type DescriptionPrompt = {
  character: string;
  object: string;
  scene: string;
};

export type ImagePrompt = {
  style: string;
  size: ImageSize;
  angle: ImageAngle;
};

export type ImageSize = {
  square: '1024x1024' | null;
  wide: '1792x1024' | null;
};

export type ImageAngle = {
  generalView: string;
  battleEncounter: string;
  characterPortrait: string;
  monsterPortrait: string;
  charactersAreIndoors: string;
  cityOverview: string;
  overviewFromWithinTheCity: string;
  socialEncounter: string;
  withMultipleCharacters: string;
};

export async function POST(request: NextRequest) {
  const { description, angle, size } = await request.json();
  const { image } = (await readDataFile('prompts')) as Prompts;

  const aspectRatios: ImageSize = {
    square: '1024x1024',
    wide: '1792x1024',
  };

  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: `${image.style} ${description} ${image.angle[angle as keyof ImageAngle]}`,
    n: 1,
    size: aspectRatios[size as keyof ImageSize],
    style: 'vivid',
    user: getUUID(),
  });

  return NextResponse.json(response.data[0]);
}
