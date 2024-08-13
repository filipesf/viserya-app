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

export const loadData = async (): Promise<DataItems> => {
  const [characterData, itemData, locationData, monsterData, organisationData] =
    await Promise.all([
      readDataFile('characters'),
      readDataFile('items'),
      readDataFile('locations'),
      readDataFile('monsters'),
      readDataFile('organisations'),
    ]);

  // Returning the parsed JSON data
  return {
    characterData,
    itemData,
    locationData,
    monsterData,
    organisationData,
  };
};
