import { NextRequest, NextResponse } from 'next/server';
import { ASSISTANT_ID } from '@viserya/config/constants';
import { openai } from '@viserya/config/openai';
import { AssistantMessageParams } from '@viserya/types/openai';
import { formatThreadMessage } from '@viserya/utils/formatThreadMessage';
import { isJsonString } from '@viserya/utils/isJsonString';

export const runtime = 'nodejs';
export const maxDuration = 300;

export async function POST(
  request: NextRequest,
  { params: { threadId } }: AssistantMessageParams,
) {
  try {
    const requestJson = await request.json();
    let { content } = requestJson;

    console.log('🪲 REQUEST JSON', { content });

    if (typeof content === 'string') {
      if (isJsonString(content)) {
        content = formatThreadMessage(JSON.parse(content));
      }
    } else {
      content = formatThreadMessage(JSON.parse(content));
    }

    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: content,
    });

    // TODO: Refactor the bot to handle messages without streaming, implementing the code below
    // let run = await openai.beta.threads.runs.createAndPoll(threadId, {
    //   assistant_id: assistantIds.dm,
    // });
    //
    // if (run.status === 'completed') {
    //   const messages = await openai.beta.threads.messages.list(run.thread_id);
    //   for (const message of messages.data.reverse()) {
    //     console.log('🪲', run.status, message.content);
    //   }
    // } else {
    //   console.log('🐞', run.status);
    // }

    const stream = openai.beta.threads.runs.stream(threadId, {
      assistant_id: ASSISTANT_ID,
    });

    return new Response(stream.toReadableStream());
  } catch (error: any) {
    console.error('💀 ERROR HANDLING MESSAGE:', error);

    return new Response(
      JSON.stringify({
        error: 'An error occurred while processing your request.',
        details: error.message || 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
