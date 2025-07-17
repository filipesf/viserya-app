import { NextRequest, NextResponse } from 'next/server';
import { AssistantCreateParams } from 'openai/resources/beta/assistants';
import { openai } from '@viserya/config/openai';

export const runtime = 'nodejs';
// export const maxDuration = 300;

export async function POST(request: NextRequest) {
  try {
    const assistant = (await request.json()) as AssistantCreateParams;

    await openai.beta.assistants.create(assistant);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
