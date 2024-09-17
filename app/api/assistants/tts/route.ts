import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { openai } from '@viserya/config/openai';
import { getUUID } from '@viserya/utils/getUUID';

export const runtime = 'nodejs';
export const maxDuration = 12000;

const speechFile = path.resolve(
  process.cwd(),
  `public/speech/voryn_${getUUID()}.mp3`,
);

export async function POST(request: NextRequest) {
  const { text } = await request.json();

  if (text === null || text === undefined) {
    return NextResponse.json(
      { error: 'Text is null or undefined' },
      { status: 400 },
    );
  }

  console.log('📑 RECEIVED TEXT:', text);
  console.log('☎️ CALLING OPENAI API TO GENERATE SPEECH');

  try {
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'onyx',
      input: text,
    });

    // console.log('💿 OPENAI API RETURNED:', mp3);

    if (mp3 === null || mp3 === undefined) {
      return NextResponse.json(
        { error: 'OpenAI API returned null or undefined' },
        { status: 500 },
      );
    }

    const buffer = Buffer.from(await mp3.arrayBuffer());

    console.log('🛟 SPEECH FILE SAVED');

    return NextResponse.json(buffer, { status: 200 });
  } catch (error) {
    console.error('Error generating speech:', error);
    return NextResponse.json(
      { error: 'Error generating speech' },
      { status: 500 },
    );
  }
}
