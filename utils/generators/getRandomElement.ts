// import {
//   characterData,
//   locationData,
//   organisationData,
//   monsterData,
//   itemData,
// } from '@viserya/config';
import { loadData } from '../handlers/handleDataFiles';

const { characterData, itemData, locationData, monsterData, organisationData } =
  await loadData();

/**
 * Selects and returns a random element from an array.
 *
 * @param {string[]} arr - The array from which to select a random element.
 * @returns {string} - A randomly selected element from the array.
 * @throws {Error} - Throws an error if the array is empty.
 */
export const getRandomElement = (arr: string[]): string => {
  if (arr.length === 0) {
    throw new Error('Array is empty.');
  }
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * Generates and returns a random character description using predefined data sets.
 *
 * @returns {string} - A randomly generated character description.
 * @throws {Error} - Throws an error if characterData is not loaded.
 */
export const getRandomCharacter = (): string => {
  if (!characterData) {
    throw new Error('Character data not loaded.');
  }

  const characterAdjective = getRandomElement(characterData.adjective);
  const characterRace = getRandomElement(characterData.race);
  const characterClass = getRandomElement(characterData.class);
  const characterBackstory = getRandomElement(characterData.backstory);
  const locationAdjective = getRandomElement(locationData.adjective);
  const locationBase = getRandomElement(locationData.base);
  const organisationAdjective = getRandomElement(organisationData.adjective);
  const organisationCategory = getRandomElement(organisationData.category);

  return `${characterAdjective} ${characterRace} ${characterClass}, from ${locationAdjective} ${locationBase}, who used to work for ${organisationAdjective} ${organisationCategory}, and ${characterBackstory}.`;
};

/**
 * Generates and returns a random location description using predefined data sets.
 *
 * @returns {string} - A randomly generated location description.
 * @throws {Error} - Throws an error if locationData is not loaded.
 */
export const getRandomLocation = (): string => {
  if (!locationData) {
    throw new Error('Location data not loaded.');
  }

  const locationAdjective = getRandomElement(locationData.adjective);
  const locationBase = getRandomElement(locationData.base);
  const locationReference = getRandomElement(locationData.reference);
  const locationClimate = getRandomElement(locationData.climate);
  const locationFeatures = getRandomElement(locationData.features);
  const locationInhabitants = getRandomElement(locationData.inhabitants);
  const locationHistory = getRandomElement(locationData.history);
  const locationEvents = getRandomElement(locationData.events);

  return `${locationAdjective} ${locationBase}, near ${locationReference}, with a ${locationClimate} climate. It features ${locationFeatures} and is inhabited by ${locationInhabitants}. It is ${locationHistory}, and currently it is ${locationEvents}.`;
};

/**
 * Generates and returns a random monster description using predefined data sets.
 *
 * @returns {string} - A randomly generated monster description.
 * @throws {Error} - Throws an error if monsterData is not loaded.
 */
export const getRandomMonster = (): string => {
  if (!monsterData) {
    throw new Error('Monster data not loaded.');
  }

  const monsterSize = getRandomElement(monsterData.size);
  const monsterAdjective = getRandomElement(monsterData.adjective);
  const monsterType = getRandomElement(monsterData.type);
  const monsterAlignment = getRandomElement(monsterData.alignment);
  const monsterCr = getRandomElement(monsterData.cr);
  const monsterEnvironment = getRandomElement(monsterData.environment);
  const monsterMotivation = getRandomElement(monsterData.motivation);

  return `${monsterSize} ${monsterAdjective} ${monsterType} (CR ${monsterCr}), ${monsterAlignment}, commonly found in ${monsterEnvironment} environments, driven by the desire to ${monsterMotivation}.`;
};

/**
 * Generates and returns a random organisation description using predefined data sets.
 *
 * @returns {string} - A randomly generated organisation description.
 * @throws {Error} - Throws an error if organisationData is not loaded.
 */
export const getRandomOrganisation = (): string => {
  if (!organisationData) {
    throw new Error('Organisation data not loaded.');
  }

  const organisationAdjective = getRandomElement(organisationData.adjective);
  const organisationCategory = getRandomElement(organisationData.category);
  const organisationActivities = getRandomElement(organisationData.activities);
  const organisationObjectives = getRandomElement(organisationData.objective);
  const locationBase = getRandomElement(locationData.base);

  return `${organisationAdjective} ${organisationCategory}, located at ${locationBase}, is involved in ${organisationActivities}, aiming to ${organisationObjectives}.`;
};

/**
 * Generates and returns a random item description using predefined data sets.
 *
 * @returns {string} - A randomly generated item description.
 * @throws {Error} - Throws an error if itemData is not loaded.
 */
export const getRandomItem = (): string => {
  if (!itemData) {
    throw new Error('Item data not loaded.');
  }

  const itemAdjective = getRandomElement(itemData.adjective);
  const itemType = getRandomElement(itemData.type);
  const itemEffect = getRandomElement(itemData.effect);
  const itemMaterial = getRandomElement(itemData.material);
  const itemOrigin = getRandomElement(itemData.origin);
  const itemRarity = getRandomElement(itemData.rarity);
  const itemCondition = getRandomElement(itemData.condition);
  const itemUserAdjective = getRandomElement(characterData.adjective);
  const itemUserRace = getRandomElement(characterData.race);
  const itemUserClass = getRandomElement(characterData.class);
  const itemUser = `${itemUserAdjective} ${itemUserRace} ${itemUserClass}`;

  return `${itemAdjective} ${itemType} of ${itemEffect}, ${itemCondition} and made of ${itemMaterial}, from ${itemOrigin} origin, is ${itemRarity} and was used by ${itemUser}.`;
};

/**
 * Generates and returns a comprehensive adventure description by combining location, monster, and organisation details.
 *
 * @returns {string} - A randomly generated adventure description.
 * @throws {Error} - Throws an error if any of the data sets (location, monster, organisation) are not loaded.
 */
export const getRandomAdventure = (): string => {
  if (!locationData) {
    throw new Error('Location data not loaded.');
  }
  if (!monsterData) {
    throw new Error('Monster data not loaded.');
  }
  if (!organisationData) {
    throw new Error('Organisation data not loaded.');
  }

  const location = getRandomLocation();
  const monster = getRandomMonster();
  const organisation = getRandomOrganisation();

  return `This adventure is set in ${location} The players will encounter ${monster} The main plot centres around the activities of ${organisation}`;
};
