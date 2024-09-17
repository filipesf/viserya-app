import { openai } from '@viserya/config/openai';

export const runtime = 'nodejs';
export const maxDuration = 12000;

// Create a new thread
export async function POST() {
  const thread = await openai.beta.threads.create();
  return Response.json({ threadId: thread.id });
}
