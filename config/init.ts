import {
  CharacterData,
  ItemData,
  LocationData,
  MonsterData,
  OrganisationData,
} from '@viserya/types';
import { loadData } from '@viserya/utils/handleDataFiles';

export let CHARACTER_DATA: CharacterData;
export let ITEM_DATA: ItemData;
export let LOCATION_DATA: LocationData;
export let MONSTER_DATA: MonsterData;
export let ORGANISATION_DATA: OrganisationData;

export const init = async (): Promise<void> => {
  try {
    console.log('Initialization started...');

    const loadedData = await loadData();

    CHARACTER_DATA = loadedData.characterData;
    ITEM_DATA = loadedData.itemData;
    LOCATION_DATA = loadedData.locationData;
    MONSTER_DATA = loadedData.monsterData;
    ORGANISATION_DATA = loadedData.organisationData;

    console.log('Initialization completed successfully.');
  } catch (error) {
    console.error('Error during initialization:', error);
    throw error;
  }
};
