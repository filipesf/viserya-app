import { viseryaApi } from '@viserya/services/viseryaApi';
import { ContentTypes } from '@viserya/types';
import { capitalizeFirstLetter } from '@viserya/utils/capitalizeFirstLetter';

export async function fetchContent(endpoint: ContentTypes): Promise<string> {
  try {
    const response = await viseryaApi.get(`generate/random/${endpoint}`);
    return capitalizeFirstLetter(response.data.prompt);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch content');
  }
}
