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
  battle: string;
  character: string;
  city: string;
  general: string;
  item: string;
  monster: string;
  social: string;
};

export async function POST(request: NextRequest) {
  try {
    const { description, angle, size } = await request.json();
    const { image } = (await readDataFile('prompts')) as Prompts;

    const aspectRatios: ImageSize = {
      square: '1024x1024',
      wide: '1792x1024',
    };

    const response = await openai.images.generate({
      prompt: `${image.style} ${description} ${image.angle[angle as keyof ImageAngle]}`,
      size: aspectRatios[size as keyof ImageSize],
      model: 'dall-e-3',
      style: 'vivid',
      n: 1,
    });

    return NextResponse.json(response.data[0]);
  } catch (error) {
    console.error('💀 Error while trying to generate image:', error);
    return NextResponse.error();
  }
}
