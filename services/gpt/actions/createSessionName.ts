import { SessionNameResponse, SessionType } from '@viserya/types';
import {
  getAdventureSessionName,
  getCharacterSessionName,
  getDowntimeSessionName,
  getRandomTavernName,
  getRandomTavern,
} from '@viserya/utils/getRandomElement';

export const createAdventureSessionName =
  async (): Promise<SessionNameResponse> => {
    const adventureSessionName = await getAdventureSessionName();
    console.log(`Adventure Session created: ${adventureSessionName}`);
    return { name: adventureSessionName };
  };

export const createCharacterSessionName =
  async (): Promise<SessionNameResponse> => {
    const characterSessionName = await getCharacterSessionName();
    console.log(`Character Session created: ${characterSessionName}`);
    return { name: characterSessionName };
  };

export const createDowntimeSessionName =
  async (): Promise<SessionNameResponse> => {
    const downtimeSessionName = await getDowntimeSessionName();
    console.log(`Downtime Session created: ${downtimeSessionName}`);
    return { name: downtimeSessionName };
  };

export const createTavernSessionName =
  async (): Promise<SessionNameResponse> => {
    const tavernName = await getRandomTavernName();
    const tavernDescription = await getRandomTavern();
    console.log(`Tavern Session created: ${tavernName}. ${tavernDescription}`);
    return { name: tavernName, description: tavernDescription };
  };

export const createRandomSessionName = async (
  sessionType: SessionType,
): Promise<SessionNameResponse> => {
  switch (sessionType) {
    case 'adventure':
      return await createAdventureSessionName();
    case 'character':
      return await createCharacterSessionName();
    case 'downtime':
      return await createDowntimeSessionName();
    case 'tavern':
      return await createTavernSessionName();
  }
};
