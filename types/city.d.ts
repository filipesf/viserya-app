export type CityData = {
  name: string;
  origins: Origins;
  architecturalLayout: ArchitecturalLayout;
  geographyAndEnvironment: GeographyAndEnvironment;
  populationAndCulture: PopulationAndCulture;
  factionsAndGuilds: FactionsAndGuild[];
  internalConflicts: InternalConflicts;
  iconicSkyline: IconicSkyline;
  memorableFeatures: MemorableFeatures;
  campaignIntegration: CampaignIntegration;
};

type ArchitecturalLayout = {
  oldVsNewDistricts: string;
  landmarksAndInfluences: string;
  expansionsAndModernization: string;
};

type CampaignIntegration = {
  storytellingPotential: string;
  playerChoices: string;
  adaptationForPlayers: string;
};

type FactionsAndGuild = {
  name: string;
  powerGroupType: string;
  goals: string;
  conflictPoints: string;
  historicalPrecedents: string;
  playerInteraction: string;
};

type GeographyAndEnvironment = {
  geographicalLocation: string;
  buildingMaterials: string;
  environmentalIntegration: string;
};

type IconicSkyline = {
  definingFeatures: string;
  visualCues: string;
  directionalLandmarks: string;
  moodAndTone: string;
};

type InternalConflicts = {
  currentIssues: string;
  hiddenThreats: string;
  historicalExamples: string;
};

type MemorableFeatures = {
  uniqueLandmark: string;
  narrativeHooks: string;
};

type Origins = {
  foundingStory: string;
  economicFoundation: string;
  historicalInfluences: string;
  growthPatterns: string;
};

type PopulationAndCulture = {
  demographics: string;
  prominentNPCs: ProminentNPC[];
  culturalDynamics: string;
  realWorldParallels: string;
};

type ProminentNPC = {
  name: string;
  role: string;
  description: string;
};
