import { viseryaApi } from '@viserya/services/api';
import { ContentTypes } from '@viserya/types';

export async function fetchContent(endpoint: ContentTypes): Promise<string> {
  try {
    const response = await viseryaApi.post(`actions/random/${endpoint}`, {});
    return response.data.prompt;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch content');
  }
}
