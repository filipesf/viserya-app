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
  style: ImageStyle;
  size: ImageSize;
  angle: ImageAngle;
};

export type ImageSize = {
  square: '1024x1024' | null;
  wide: '1792x1024' | null;
};

export type ImageStyle = {
  comicbook: string;
  watercolor: string;
  shadowdark: string;
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
  const { description, angle, size, style } = await request.json();
  const { image } = (await readDataFile('prompts')) as Prompts;

  const aspectRatios: ImageSize = {
    square: '1024x1024',
    wide: '1792x1024',
  };

  if (description === null || description === undefined) {
    return NextResponse.json(
      { error: '💀 Description is null or undefined.' },
      { status: 400 },
    );
  }

  const prompt =
    `${image.style[style as keyof ImageStyle]}\n\n${description}\n\n${image.angle[angle as keyof ImageAngle]}`.trim();

  console.log('📑 IMAGE PROMPT:', prompt);
  console.log('👨‍🎨 PAINTING THE REQUESTED IMAGE');

  try {
    const response = await openai.images.generate({
      size: aspectRatios[size as keyof ImageSize],
      response_format: 'b64_json',
      model: 'dall-e-3',
      style: 'vivid',
      prompt,
      n: 1,
    });

    console.log('🖼️ IMAGE GENERATED');

    return NextResponse.json(response.data[0].b64_json);
  } catch (error) {
    console.error('💀 Error while trying to generate image:', error);
    return NextResponse.error();
  }
}
