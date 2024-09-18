import { NextRequest } from 'next/server';
import { assistantIds } from '@viserya/config/assistants';
import { openai } from '@viserya/config/openai';
import { MessagesRecord } from '@viserya/types';
import { AssistantMessageParams } from '@viserya/types/openai';
import { isJsonString } from '@viserya/utils/isJsonString';

export const runtime = 'nodejs';
export const maxDuration = 300;

export async function POST(
  request: NextRequest,
  { params: { threadId } }: AssistantMessageParams,
) {
  const requestJson = await request.json();
  let { content } = requestJson;

  console.log('🪲 REQUEST JSON', { content });

  if (typeof content === 'string') {
    if (isJsonString(content)) {
      content = JSON.parse(content);
      console.log('🐛 JSON STRING', { content });
    } else {
      content = content;
      console.log('🐛 NOT JSON STRING', { content });
    }
  } else {
    content = content.map((message: MessagesRecord) => {
      const { text } = message;
      return { text, type: 'text' };
    });

    console.log('🐛 NOT STRING', { content });
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
    assistant_id: assistantIds.dm,
  });

  return new Response(stream.toReadableStream());
}
