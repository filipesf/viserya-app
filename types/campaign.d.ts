export type CampaignData = {
  title: string;
  overview: string;
  tone: string;
  concept: string;
  location: string;
  mechanics: string;
  expand: string;
  conflict: string;
  charactersIntegration: string;
  characterArcs: string;
  npcs: {
    name: string;
    description: string;
  }[];
  factions: {
    name: string;
    description: string;
  }[];
  hooks: {
    title: string;
    description: string;
  }[];
  encounters: {
    title: string;
    type: string;
    description: string;
  }[];
  cover: string;
  notes: string;
};
