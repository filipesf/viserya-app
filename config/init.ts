import {
  CharacterData,
  ItemData,
  LocationData,
  MonsterData,
  OrganisationData,
} from '@viserya/types';
import { readDataFile } from '@viserya/utils';

/**
 * Global variables to store the loaded configuration data.
 */
export let characterData: CharacterData;
export let itemData: ItemData;
export let locationData: LocationData;
export let monsterData: MonsterData;
export let organisationData: OrganisationData;

/**
 * Initializes the global configuration data by loading it from JSON files.
 *
 * This function reads the configuration data from predefined JSON files and assigns
 * it to the corresponding global variables. If any of the files cannot be read or parsed,
 * an error is thrown.
 *
 * @throws {Error} If any of the JSON files cannot be read or parsed.
 * @returns {Promise<void>} A promise that resolves when the initialization is complete.
 */
export const init = async (): Promise<void> => {
  try {
    console.log('Initialization started...');

    characterData = await readDataFile('characters');
    itemData = await readDataFile('items');
    locationData = await readDataFile('locations');
    monsterData = await readDataFile('monsters');
    organisationData = await readDataFile('organisations');

    console.log('Initialization completed successfully.');
  } catch (error) {
    console.error('Error during initialization:', error);
    throw error;
  }
};
