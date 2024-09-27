import { SessionNameResponse, SessionType } from '@viserya/types';
import {
  getAdventureSessionName,
  getCharacterSessionName,
  getDowntimeSessionName,
  getRandomTavernName,
  getRandomTavern,
  getMarketplaceSessionName,
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

export const createMarketplaceSessionName =
  async (): Promise<SessionNameResponse> => {
    const marketplaceSessionName = await getMarketplaceSessionName();
    console.log(`Marketplace Session created: ${marketplaceSessionName}`);
    return { name: marketplaceSessionName };
  };

export const createRandomSessionName = async (
  sessionType: SessionType,
): Promise<SessionNameResponse> => {
  switch (sessionType) {
    case 'adventure':
    case 'training':
      return await createAdventureSessionName();
    case 'character':
      return await createCharacterSessionName();
    case 'downtime':
      return await createDowntimeSessionName();
    case 'marketplace':
      return await createMarketplaceSessionName();
    case 'tavern':
    default:
      return await createTavernSessionName();
  }
};
