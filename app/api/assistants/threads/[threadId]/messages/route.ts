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
  const requestJson = await request.json();
  let { content } = requestJson;

  if (typeof content === 'string') {
    try {
      content = JSON.parse(content);
    } catch (error) {
      console.error('Error parsing content:', error);
      return new Response(JSON.stringify({ error: 'Invalid JSON content' }), {
        status: 400,
      });
    }
  }

  content = content.map((message: any) => {
    if (message.type === 'history' || message.type === 'decision') {
      message.type = 'text';
    }
    return message;
  });

  console.log('🪲', content);

  await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: content,
  });

  const stream = openai.beta.threads.runs.stream(threadId, {
    assistant_id: assistantIds.dm,
  });

  return new Response(stream.toReadableStream());
}
