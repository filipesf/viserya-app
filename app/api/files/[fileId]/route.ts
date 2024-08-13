import { NextRequest } from 'next/server';
import { openai } from '@viserya/config/openai';
import { AssistantFileParams } from '@viserya/types/openai';

// download file by file ID
export async function GET(
  _request: NextRequest,
  { params: { fileId } }: AssistantFileParams,
) {
  const [file, fileContent] = await Promise.all([
    openai.files.retrieve(fileId),
    openai.files.content(fileId),
  ]);
  return new Response(fileContent.body, {
    headers: {
      'Content-Disposition': `attachment; filename="${file.filename}"`,
    },
  });
}
