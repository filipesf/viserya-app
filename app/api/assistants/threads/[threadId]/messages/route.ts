import { NextRequest } from 'next/server';
import { assistantIds } from '@viserya/config/assistants';
import { openai } from '@viserya/config/openai';
import { MessagesRecord } from '@viserya/types';
import { AssistantMessageParams } from '@viserya/types/openai';

export const runtime = 'nodejs';
export const maxDuration = 300;

export async function POST(
  request: NextRequest,
  { params: { threadId } }: AssistantMessageParams,
) {
  const requestJson = await request.json();
  let { content } = requestJson;

  if (typeof content === 'string') {
    try {
      content = JSON.parse(content);
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Invalid JSON content' }), {
        status: 400,
      });
    }
  }

  content = content.map((message: MessagesRecord) => {
    const { text } = message;
    return { text, type: 'text' };
  });

  console.log('🪲 Filtered content:', content);

  await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: content,
  });

  const stream = openai.beta.threads.runs.stream(threadId, {
    assistant_id: assistantIds.dm,
  });

  return new Response(stream.toReadableStream());
}
