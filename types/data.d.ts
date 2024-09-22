export interface CharacterData {
  adjective: string[];
  race: string[];
  class: string[];
  backstory: string[];
}

export interface LocationData {
  adjective: string[];
  base: string[];
  reference: string[];
  climate: string[];
  features: string[];
  inhabitants: string[];
  history: string[];
  events: string[];
}

export interface MonsterData {
  size: string[];
  adjective: string[];
  type: string[];
  alignment: string[];
  cr: string[];
  environment: string[];
  motivation: string[];
}

export interface ItemData {
  rarity: string[];
  adjective: string[];
  type: string[];
  effect: string[];
  material: string[];
  condition: string[];
  origin: string[];
}

export interface OrganisationData {
  adjective: string[];
  category: string[];
  activities: string[];
  objective: string[];
}

export interface TavernData {
  adjective: string[];
  article: string[];
  noun: string[];
  place: string[];
  about: string[];
  location: string[];
  rumor: string[];
}

export interface AdventureSessionData {
  theme: string[];
  symbol: string[];
  myth: string[];
}

export interface CharacterSessionData {
  discovery: string[];
  theme: string[];
  element: string[];
}

export interface DowntimeSessionData {
  activity: string[];
  place: string[];
  theme: string[];
}
