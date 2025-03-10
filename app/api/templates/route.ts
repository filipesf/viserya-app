import { NextRequest, NextResponse } from 'next/server';
import { handleMiddleware } from '@viserya/services/handleMiddleware';
import { getTemplateById } from '@viserya/utils/getTemplateById';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const authResponse = await handleMiddleware(request);
  if (authResponse) {
    return authResponse;
  }

  // Get the query parameter 'id' from the URL
  const { searchParams } = new URL(request.url);
  const templateId = searchParams.get('id');

  if (templateId) {
    // Retrieve specific template by ID
    try {
      const prompt = await getTemplateById(templateId);
      return new NextResponse(prompt, {
        headers: { 'Content-Type': 'text/markdown' },
      });
    } catch (error) {
      console.error('Error retrieving template:', error);
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 },
      );
    }
  } else {
    return NextResponse.json(
      { error: 'Template ID is required' },
      { status: 400 },
    );
  }
}
