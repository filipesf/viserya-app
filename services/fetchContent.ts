import axios from 'axios';
import { AUTHORIZATION_KEY } from '@viserya/config/constants';
import { ContentTypes } from '@viserya/types';

export async function fetchContent(endpoint: ContentTypes): Promise<string> {
  try {
    const response = await axios.post(
      `/api/actions/random/${endpoint}`,
      {},
      {
        headers: {
          AUTHORIZATION_KEY: AUTHORIZATION_KEY,
        },
      },
    );
    return response.data.prompt;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch content');
  }
}
