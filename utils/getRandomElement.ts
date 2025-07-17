import {
  AdventureSessionData,
  CharacterData,
  CharacterSessionData,
  DowntimeSessionData,
  ItemData,
  LocationData,
  MarketplaceSession,
  MonsterData,
  OrganisationData,
  TavernData,
} from '@viserya/types';
import {
  STR_QUESTIONS,
  DEX_QUESTIONS,
  CON_QUESTIONS,
  INT_QUESTIONS,
  WIS_QUESTIONS,
  CHA_QUESTIONS,
  Question,
} from '@viserya/utils/questions';
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
  marketplaceSession: MarketplaceSession;
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
      'marketplaceSession',
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
      marketplaceSession: dataArray[9],
    };

    return combinedData;
  } catch (error) {
    console.error('Error loading data', error);
    return {} as CombinedData;
  }
};

const getRandomElement = <T>(arr: T[]): T => {
  if (arr.length === 0) {
    throw new Error('Array is empty.');
  }
  return arr[Math.floor(Math.random() * arr.length)];
};

export const getQuizQuestions = (): Question[] => {
  return [
    getRandomElement(STR_QUESTIONS),
    getRandomElement(DEX_QUESTIONS),
    getRandomElement(CON_QUESTIONS),
    getRandomElement(INT_QUESTIONS),
    getRandomElement(WIS_QUESTIONS),
    getRandomElement(CHA_QUESTIONS),
  ];
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
  const monsterEnvironment = getRandomElement(MONSTER_DATA.environment);
  const monsterMotivation = getRandomElement(MONSTER_DATA.motivation);

  return `${monsterSize} ${monsterAdjective} ${monsterType}, ${monsterAlignment}, commonly found in ${monsterEnvironment} environments, driven by the desire to ${monsterMotivation}.`;
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

/**
 * Generates a random marketplace session name using predefined data sets.
 *
 * @returns {string} - A randomly generated marketplace session name.
 * @throws {Error} - Throws an error if marketplaceSession data is not loaded.
 */
export const getMarketplaceSessionName = async (): Promise<string> => {
  const data = await loadData();

  const MARKET_SESSION_DATA = data.marketplaceSession;

  if (!MARKET_SESSION_DATA)
    throw new Error('Marketplace Session data not loaded.');

  const market = getRandomElement(MARKET_SESSION_DATA.market);
  const kingdom = getRandomElement(MARKET_SESSION_DATA.kingdom);
  const goods = getRandomElement(MARKET_SESSION_DATA.goods);

  return `${market} ${kingdom} ${goods}`;
};

export const getRandomPlaceholder = (): string => {
  const placeholders = [
    'Uncover the mystery of this NPC, or choose one of the provided prompts...',
    'Learn the story of this NPC, or pick a direction to explore...',
    'Reveal the background of this NPC, or select from the options below...',
    'Unveil the identity of this NPC, or choose a prompt to continue...',
    'Discover the past of this NPC, or select a path from the prompts...',
    'Summon the details of this NPC, or choose one of the available threads...',
    'Expose the hidden truths of this NPC, or pick a prompt to follow...',
    'Let the tale of this NPC unfold, or choose your next prompt...',
    'Learn more about this NPC, or select a new course from the prompts...',
    'Seek the history of this NPC, or choose from the prompts to continue...',
    'Tell the story of this NPC, or select a prompt to dive deeper...',
    'Reveal the secrets of this NPC, or choose a prompt to shape your journey...',
    'Unravel the mysteries of this NPC, or pick a prompt from the list below...',
    'Let the legend of this NPC be known, or select one of the following prompts...',
    'Discover the identity of this NPC, or choose a different direction from the prompts...',
    'Bring forth the tale of this NPC, or choose one of the available prompts...',
    'Reveal what you wish to know about this NPC, or select a new path...',
    'Explore the background of this NPC, or pick a prompt to lead you forward...',
    'Unveil more about this NPC, or choose a prompt to follow their story...',
    'Speak the history of this NPC, or select a path from the prompts below...',
    "Let this NPC's story come to light, or choose your next prompt...",
    'Unravel the enigma of this NPC, or follow one of the provided threads...',
    'Seek the truth of this NPC, or select a prompt to continue your exploration...',
    'Uncover the tale behind this NPC, or choose a prompt to guide your discovery...',
    'Learn what lies beneath the surface of this NPC, or select a new course from the prompts...',
    'Reveal the tale that shapes this NPC, or choose one of the available prompts...',
    'Explore the depths of this NPC, or select a prompt to uncover more...',
    'Unearth the history of this NPC, or follow one of the provided prompts...',
    'Tell the tale of this NPC, or choose a path to further your journey...',
    'Summon the details of this NPC’s life, or choose a prompt to explore...',
  ];

  return placeholders[Math.floor(Math.random() * placeholders.length)];
};
