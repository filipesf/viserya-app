import {
  AdventureSessionData,
  CharacterData,
  CharacterSessionData,
  DowntimeSessionData,
  ItemData,
  LocationData,
  MonsterData,
  OrganisationData,
  TavernData,
} from '@viserya/types';
import { readDataFile } from './readFiles';
import { toTitleCase } from './toTitleCase';

type CombinedData = {
  character: CharacterData;
  item: ItemData;
  location: LocationData;
  monster: MonsterData;
  organisation: OrganisationData;
  tavern: TavernData;
  adventureSession: AdventureSessionData;
  characterSession: CharacterSessionData;
  downtimeSession: DowntimeSessionData;
};

const loadData = async (): Promise<CombinedData> => {
  try {
    const fileNames = [
      'characters',
      'items',
      'locations',
      'monsters',
      'organisations',
      'taverns',
      'adventureSession',
      'characterSession',
      'downtimeSession',
    ];

    const dataArray = await Promise.all(
      fileNames.map((file) => readDataFile(file)),
    );

    const combinedData: CombinedData = {
      character: dataArray[0],
      item: dataArray[1],
      location: dataArray[2],
      monster: dataArray[3],
      organisation: dataArray[4],
      tavern: dataArray[5],
      adventureSession: dataArray[6],
      characterSession: dataArray[7],
      downtimeSession: dataArray[8],
    };

    return combinedData;
  } catch (error) {
    console.error('Error loading data', error);
    return {} as CombinedData;
  }
};

const getRandomElement = (arr: string[]): string => {
  if (arr.length === 0) {
    throw new Error('Array is empty.');
  }
  return arr[Math.floor(Math.random() * arr.length)];
};

export const getRandomCharacter = async (): Promise<string> => {
  const data = await loadData();

  const CHARACTER_DATA = data.character;
  const LOCATION_DATA = data.location;
  const ORGANISATION_DATA = data.organisation;

  if (!CHARACTER_DATA) throw new Error('Character data not loaded.');

  if (!LOCATION_DATA) throw new Error('Location data not loaded.');

  if (!ORGANISATION_DATA) throw new Error('Organisation data not loaded.');

  const characterAdjective = getRandomElement(CHARACTER_DATA.adjective);
  const characterRace = getRandomElement(CHARACTER_DATA.race);
  const characterClass = getRandomElement(CHARACTER_DATA.class);
  const characterBackstory = getRandomElement(CHARACTER_DATA.backstory);
  const locationAdjective = getRandomElement(LOCATION_DATA.adjective);
  const locationBase = getRandomElement(LOCATION_DATA.base);
  const organisationAdjective = getRandomElement(ORGANISATION_DATA.adjective);
  const organisationCategory = getRandomElement(ORGANISATION_DATA.category);

  return `${characterAdjective} ${characterRace} ${characterClass}, from ${locationAdjective} ${locationBase}, who used to work for ${organisationAdjective} ${organisationCategory}, and ${characterBackstory}.`;
};

export const getRandomLocation = async (): Promise<string> => {
  const data = await loadData();

  const LOCATION_DATA = data.location;

  if (!LOCATION_DATA) throw new Error('Location data not loaded.');

  const locationAdjective = getRandomElement(LOCATION_DATA.adjective);
  const locationBase = getRandomElement(LOCATION_DATA.base);
  const locationReference = getRandomElement(LOCATION_DATA.reference);
  const locationClimate = getRandomElement(LOCATION_DATA.climate);
  const locationFeatures = getRandomElement(LOCATION_DATA.features);
  const locationInhabitants = getRandomElement(LOCATION_DATA.inhabitants);
  const locationHistory = getRandomElement(LOCATION_DATA.history);
  const locationEvents = getRandomElement(LOCATION_DATA.events);

  return `${locationAdjective} ${locationBase}, near ${locationReference}, with a ${locationClimate} climate. It features ${locationFeatures} and is inhabited by ${locationInhabitants}. It is ${locationHistory}, and currently it is ${locationEvents}.`;
};

/**
 * Generates and returns a random monster description using predefined data sets.
 *
 * @returns {string} - A randomly generated monster description.
 * @throws {Error} - Throws an error if monsterData is not loaded.
 */
export const getRandomMonster = async (): Promise<string> => {
  const data = await loadData();

  const MONSTER_DATA = data.monster;

  if (!MONSTER_DATA) throw new Error('Monster data not loaded.');

  const monsterSize = getRandomElement(MONSTER_DATA.size);
  const monsterAdjective = getRandomElement(MONSTER_DATA.adjective);
  const monsterType = getRandomElement(MONSTER_DATA.type);
  const monsterAlignment = getRandomElement(MONSTER_DATA.alignment);
  const monsterCr = getRandomElement(MONSTER_DATA.cr);
  const monsterEnvironment = getRandomElement(MONSTER_DATA.environment);
  const monsterMotivation = getRandomElement(MONSTER_DATA.motivation);

  return `${monsterSize} ${monsterAdjective} ${monsterType} (CR ${monsterCr}), ${monsterAlignment}, commonly found in ${monsterEnvironment} environments, driven by the desire to ${monsterMotivation}.`;
};

/**
 * Generates and returns a random organisation description using predefined data sets.
 *
 * @returns {string} - A randomly generated organisation description.
 * @throws {Error} - Throws an error if organisationData is not loaded.
 */
export const getRandomOrganisation = async (): Promise<string> => {
  const data = await loadData();

  const ORGANISATION_DATA = data.organisation;
  const LOCATION_DATA = data.location;

  if (!ORGANISATION_DATA) throw new Error('Organisation data not loaded.');
  if (!LOCATION_DATA) throw new Error('Location data not loaded.');

  const organisationAdjective = getRandomElement(ORGANISATION_DATA.adjective);
  const organisationCategory = getRandomElement(ORGANISATION_DATA.category);
  const organisationActivities = getRandomElement(ORGANISATION_DATA.activities);
  const organisationObjectives = getRandomElement(ORGANISATION_DATA.objective);
  const locationBase = getRandomElement(LOCATION_DATA.base);

  return `${organisationAdjective} ${organisationCategory}, located at ${locationBase}, is involved in ${organisationActivities}, aiming to ${organisationObjectives}.`;
};

/**
 * Generates and returns a random item description using predefined data sets.
 *
 * @returns {string} - A randomly generated item description.
 * @throws {Error} - Throws an error if itemData is not loaded.
 */
export const getRandomItem = async (): Promise<string> => {
  const data = await loadData();

  const ITEM_DATA = data.item;
  const CHARACTER_DATA = data.character;

  if (!ITEM_DATA) throw new Error('Item data not loaded.');

  if (!CHARACTER_DATA) throw new Error('Character data not loaded.');

  const itemAdjective = getRandomElement(ITEM_DATA.adjective);
  const itemType = getRandomElement(ITEM_DATA.type);
  const itemEffect = getRandomElement(ITEM_DATA.effect);
  const itemMaterial = getRandomElement(ITEM_DATA.material);
  const itemOrigin = getRandomElement(ITEM_DATA.origin);
  const itemRarity = getRandomElement(ITEM_DATA.rarity);
  const itemCondition = getRandomElement(ITEM_DATA.condition);
  const itemUserAdjective = getRandomElement(CHARACTER_DATA.adjective);
  const itemUserRace = getRandomElement(CHARACTER_DATA.race);
  const itemUserClass = getRandomElement(CHARACTER_DATA.class);
  const itemUser = `${itemUserAdjective} ${itemUserRace} ${itemUserClass}`;

  return `${itemAdjective} ${itemType} of ${itemEffect}, ${itemCondition} and made of ${itemMaterial}, from ${itemOrigin} origin, is ${itemRarity} and was used by ${itemUser}.`;
};

export const getRandomAdventure = async (): Promise<string> => {
  const location = await getRandomLocation();
  const monster = await getRandomMonster();
  const organisation = await getRandomOrganisation();

  return `This adventure is set in ${location} The players will encounter ${monster} The main plot centres around the activities of ${organisation}`;
};

export const getRandomTavernName = async (): Promise<string> => {
  const data = await loadData();

  const TAVERN_DATA = data.tavern;

  if (!TAVERN_DATA) throw new Error('Tavern data not loaded.');

  const { adjective, noun, place } = TAVERN_DATA;

  const nameOptions = [
    `${getRandomElement(adjective)} ${getRandomElement(noun)}`,
    `${getRandomElement(adjective)} ${getRandomElement(noun)} ${getRandomElement(place)}`,
    `${getRandomElement(adjective)} ${getRandomElement(noun)} ${getRandomElement(adjective)} ${getRandomElement(place)}`,
  ];

  return toTitleCase(getRandomElement(nameOptions));
};

export const getRandomTavern = async (): Promise<string> => {
  const data = await loadData();

  const TAVERN_DATA = data.tavern;
  const LOCATION_DATA = data.location;

  if (!TAVERN_DATA) throw new Error('Tavern data not loaded.');
  if (!LOCATION_DATA) throw new Error('Location data not loaded.');

  const tavernAbout = getRandomElement(TAVERN_DATA.about);
  const tavernLocation = getRandomElement(TAVERN_DATA.location);
  const tavernRumor = getRandomElement(TAVERN_DATA.rumor);
  const locationReference = getRandomElement(LOCATION_DATA.reference);

  return `${tavernAbout} ${tavernLocation} Located near ${locationReference}. ${tavernRumor}`;
};

/**
 * Generates a random adventure session name using predefined data sets.
 *
 * @returns {string} - A randomly generated adventure session name.
 * @throws {Error} - Throws an error if adventureSession data is not loaded.
 */
export const getAdventureSessionName = async (): Promise<string> => {
  const data = await loadData();

  const ADV_SESSION_DATA = data.adventureSession;

  if (!ADV_SESSION_DATA) throw new Error('Adventure Session data not loaded.');

  const theme = getRandomElement(ADV_SESSION_DATA.theme);
  const symbol = getRandomElement(ADV_SESSION_DATA.symbol);
  const myth = getRandomElement(ADV_SESSION_DATA.myth);

  return `${theme} ${symbol} ${myth}`;
};

/**
 * Generates a random character session name using predefined data sets.
 *
 * @returns {string} - A randomly generated character session name.
 * @throws {Error} - Throws an error if characterSession data is not loaded.
 */
export const getCharacterSessionName = async (): Promise<string> => {
  const data = await loadData();

  const CHAR_SESSION_DATA = data.characterSession;

  if (!CHAR_SESSION_DATA) throw new Error('Character Session data not loaded.');

  const discovery = getRandomElement(CHAR_SESSION_DATA.discovery);
  const theme = getRandomElement(CHAR_SESSION_DATA.theme);
  const element = getRandomElement(CHAR_SESSION_DATA.element);

  return `${discovery} ${theme} ${element}`;
};

/**
 * Generates a random downtime session name using predefined data sets.
 *
 * @returns {string} - A randomly generated downtime session name.
 * @throws {Error} - Throws an error if downtimeSession data is not loaded.
 */
export const getDowntimeSessionName = async (): Promise<string> => {
  const data = await loadData();

  const DTIME_SESSION_DATA = data.downtimeSession;

  if (!DTIME_SESSION_DATA) throw new Error('Downtime Session data not loaded.');

  const activity = getRandomElement(DTIME_SESSION_DATA.activity);
  const place = getRandomElement(DTIME_SESSION_DATA.place);
  const theme = getRandomElement(DTIME_SESSION_DATA.theme);

  return `${activity} ${place} ${theme}`;
};
