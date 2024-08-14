import {
  CharacterData,
  ItemData,
  LocationData,
  MonsterData,
  OrganisationData,
} from '@viserya/types';
import { readDataFile } from './readJsonFile';

type DataItems = {
  characterData: CharacterData;
  itemData: ItemData;
  locationData: LocationData;
  monsterData: MonsterData;
  organisationData: OrganisationData;
};

// Define variables to store the data once loaded
let dataCache: DataItems | null = null;

export const loadData = async (): Promise<DataItems> => {
  // Check if data has already been loaded
  if (dataCache) {
    return dataCache;
  }

  // Load the data and store it in the cache
  const [characterData, itemData, locationData, monsterData, organisationData] =
    await Promise.all([
      readDataFile('characters'),
      readDataFile('items'),
      readDataFile('locations'),
      readDataFile('monsters'),
      readDataFile('organisations'),
    ]);

  dataCache = {
    characterData,
    itemData,
    locationData,
    monsterData,
    organisationData,
  };

  return dataCache;
};
