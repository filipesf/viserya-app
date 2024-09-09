import { viseryaApi } from '@viserya/services/viseryaApi';
import { ContentTypes } from '@viserya/types';

export async function fetchContent(endpoint: ContentTypes): Promise<string> {
  try {
    const response = await viseryaApi.post(`actions/random/${endpoint}`, {});
    return response.data.prompt;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch content');
  }
}
