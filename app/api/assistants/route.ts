import { openai } from '@viserya/config/openai';

export const runtime = 'nodejs';
export const maxDuration = 300;

// Create a new assistant
export async function POST() {
  const assistant = await openai.beta.assistants.create({
    name: 'Assistant Name',
    model: 'gpt-4o',
    instructions: `Assistant Instructions`,
    tools: [],
  });

  return Response.json({ assistantId: assistant.id });
}
