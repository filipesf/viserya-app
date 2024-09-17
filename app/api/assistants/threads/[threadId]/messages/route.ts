import { NextRequest } from 'next/server';
import { assistantIds } from '@viserya/config/assistants';
import { openai } from '@viserya/config/openai';
import { AssistantMessageParams } from '@viserya/types/openai';

export const runtime = 'nodejs';
export const maxDuration = 300;

// Send a new message to a thread
export async function POST(
  request: NextRequest,
  { params: { threadId } }: AssistantMessageParams,
) {
  const { content } = await request.json();

  await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: content,
  });

  const stream = openai.beta.threads.runs.stream(threadId, {
    assistant_id: assistantIds.dm,
  });

  return new Response(stream.toReadableStream());
}
