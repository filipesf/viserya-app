import { NextRequest, NextResponse } from 'next/server';
import { handleMiddleware } from '@viserya/services/handleMiddleware';

let recentContext: string[] = [];

export const dynamic = 'force-dynamic';

/**
 * Updates the recent context array with the current prompt.
 * Maintains the last 10 entries in the context.
 * @param prompt - The prompt associated with the action.
 */
function updateContext(prompt: string): void {
  recentContext.push(`${prompt || ''}`);
  if (recentContext.length > 10) recentContext.shift(); // Keep last 10 entries
}

/**
 * Handles incoming requests, ensuring authorization, context management,
 * and execution of the provided create function.
 * @param request - The incoming request object.
 * @param createFunction - The function to execute for creating an entity.
 * @returns A response object with the result of the create function or an error message.
 */
export async function handleAction(
  request: NextRequest,
  createFunction: Function,
) {
  const authResponse = await handleMiddleware(request);
  if (authResponse) {
    return authResponse;
  }

  const body = await request.json();

  // Update context for context-based interpretation
  updateContext(body.prompt);

  try {
    // Execute the provided createFunction with the request body and recent context
    const result = await createFunction(
      body.prompt || recentContext,
      body.subType,
    );
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error creating entity:', error);
    return NextResponse.json(
      { error: 'Failed to create entity' },
      { status: 500 },
    );
  }
}
