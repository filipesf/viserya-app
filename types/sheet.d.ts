export type CharacterService = {
  id: number;
  success: boolean;
  message: string;
  data: CharacterSheet;
  pagination: any;
};

export type CharacterSheet = {
  id: number;
  userId: number;
  username: string;
  isAssignedToPlayer: boolean;
  readonlyUrl: string;
  decorations: Decorations;
  name: string;
  socialName: any;
  gender: string;
  faith: any;
  age: number;
  hair: string;
  eyes: string;
  skin: string;
  height: string;
  weight: number;
  inspiration: boolean;
  baseHitPoints: number;
  bonusHitPoints: any;
  overrideHitPoints: any;
  removedHitPoints: number;
  temporaryHitPoints: number;
  currentXp: number;
  alignmentId: number;
  lifestyleId: number;
  stats: Stat[];
  bonusStats: BonusStat[];
  overrideStats: OverrideStat[];
  background: Background;
  race: Race;
  raceDefinitionId: any;
  raceDefinitionTypeId: any;
  notes: Notes;
  traits: Traits;
  preferences: Preferences;
  configuration: Configuration;
  lifestyle: any;
  inventory: Inventory[];
  currencies: Currencies;
  classes: Class[];
  feats: any[];
  features: any;
  customDefenseAdjustments: any[];
  customSenses: any[];
  customSpeeds: any[];
  customProficiencies: any[];
  customActions: any[];
  characterValues: any[];
  conditions: any[];
  deathSaves: DeathSaves;
  adjustmentXp: any;
  spellSlots: SpellSlot[];
  pactMagic: PactMagic[];
  activeSourceCategories: number[];
  spells: Spells;
  options: Options;
  choices: Choices;
  actions: Actions;
  modifiers: Modifiers;
  classSpells: ClassSpell[];
  customItems: any[];
  campaign: Campaign;
  creatures: any[];
  optionalOrigins: any[];
  optionalClassFeatures: any[];
  dateModified: string;
  providedFrom: string;
  canEdit: boolean;
  status: number;
  statusSlug: any;
  campaignSetting: any;
};

export type Decorations = {
  avatarUrl: string;
  frameAvatarUrl: any;
  backdropAvatarUrl: string;
  smallBackdropAvatarUrl: string;
  largeBackdropAvatarUrl: string;
  thumbnailBackdropAvatarUrl: string;
  defaultBackdrop: DefaultBackdrop;
  avatarId: number;
  portraitDecorationKey: any;
  frameAvatarDecorationKey: any;
  frameAvatarId: any;
  backdropAvatarDecorationKey: string;
  backdropAvatarId: number;
  smallBackdropAvatarDecorationKey: string;
  smallBackdropAvatarId: number;
  largeBackdropAvatarDecorationKey: string;
  largeBackdropAvatarId: number;
  thumbnailBackdropAvatarDecorationKey: string;
  thumbnailBackdropAvatarId: number;
  themeColor: ThemeColor;
};

export type DefaultBackdrop = {
  backdropAvatarUrl: string;
  smallBackdropAvatarUrl: string;
  largeBackdropAvatarUrl: string;
  thumbnailBackdropAvatarUrl: string;
};

export type ThemeColor = {
  themeColorId: number;
  themeColor: string;
  backgroundColor: string;
  name: string;
  raceId: any;
  subRaceId: any;
  classId: number;
  tags: string[];
  decorationKey: string;
};

export type Stat = {
  id: number;
  name: any;
  value: number;
};

export type BonusStat = {
  id: number;
  name: any;
  value: any;
};

export type OverrideStat = {
  id: number;
  name: any;
  value: any;
};

export type Background = {
  hasCustomBackground: boolean;
  definition: Definition;
  definitionId: any;
  customBackground: CustomBackground;
};

export type Definition = {
  id: number;
  entityTypeId: number;
  definitionKey: string;
  name: string;
  description: string;
  snippet: string;
  shortDescription: string;
  skillProficienciesDescription: string;
  toolProficienciesDescription: string;
  languagesDescription: string;
  equipmentDescription: string;
  featureName: string;
  featureDescription: string;
  avatarUrl: any;
  largeAvatarUrl: any;
  suggestedCharacteristicsDescription: string;
  suggestedProficiencies: any;
  suggestedLanguages: any;
  organization: any;
  contractsDescription: string;
  spellsPreDescription: string;
  spellsPostDescription: string;
  personalityTraits: PersonalityTrait[];
  ideals: Ideal[];
  bonds: Bond[];
  flaws: Flaw[];
  isHomebrew: boolean;
  sources: Source[];
  spellListIds: any[];
  featList: any;
  grantedFeats: any[];
};

export type PersonalityTrait = {
  id: number;
  description: string;
  diceRoll: number;
};

export type Ideal = {
  id: number;
  description: string;
  diceRoll: number;
};

export type Bond = {
  id: number;
  description: string;
  diceRoll: number;
};

export type Flaw = {
  id: number;
  description: string;
  diceRoll: number;
};

export type Source = {
  sourceId: number;
  pageNumber: number;
  sourceType: number;
};

export type CustomBackground = {
  id: number;
  entityTypeId: number;
  name: any;
  description: any;
  featuresBackground: any;
  characteristicsBackground: any;
  featuresBackgroundDefinitionId: any;
  characteristicsBackgroundDefinitionId: any;
  backgroundType: any;
};

export type Race = {
  isSubRace: boolean;
  baseRaceName: string;
  entityRaceId: number;
  entityRaceTypeId: number;
  definitionKey: string;
  fullName: string;
  baseRaceId: number;
  baseRaceTypeId: number;
  description: string;
  avatarUrl: string;
  largeAvatarUrl: string;
  portraitAvatarUrl: string;
  moreDetailsUrl: string;
  isHomebrew: boolean;
  isLegacy: boolean;
  groupIds: number[];
  type: number;
  supportsSubrace: any;
  subRaceShortName: any;
  baseName: string;
  racialTraits: RacialTrait[];
  weightSpeeds: WeightSpeeds;
  featIds: any[];
  size: any;
  sizeId: number;
  sources: Source3[];
};

export type RacialTrait = {
  definition: Definition2;
};

export type Definition2 = {
  id: number;
  definitionKey: string;
  entityTypeId: number;
  displayOrder: number;
  name: string;
  description: string;
  snippet?: string;
  hideInBuilder: boolean;
  hideInSheet: boolean;
  activation: any;
  sourceId: number;
  sourcePageNumber: number;
  creatureRules: any[];
  spellListIds: any[];
  featureType: number;
  sources: Source2[];
  affectedFeatureDefinitionKeys: any[];
  isCalledOut: boolean;
  entityType: string;
  entityID: string;
  entityRaceId: number;
  entityRaceTypeId: number;
  displayConfiguration: DisplayConfiguration;
  requiredLevel: any;
  categories: Category[];
};

export type Source2 = {
  sourceId: number;
  pageNumber: number;
  sourceType: number;
};

export type DisplayConfiguration = {
  RACIALTRAIT: number;
  ABILITYSCORE: number;
  LANGUAGE: number;
  CLASSFEATURE: number;
};

export type Category = {
  id: number;
  entityTypeId: number;
  entityId: number;
  definitionKey: string;
  entityTagId: number;
  tagName: string;
};

export type WeightSpeeds = {
  normal: Normal;
  encumbered: any;
  heavilyEncumbered: any;
  pushDragLift: any;
  override: any;
};

export type Normal = {
  walk: number;
  fly: number;
  burrow: number;
  swim: number;
  climb: number;
};

export type Source3 = {
  sourceId: number;
  pageNumber?: number;
  sourceType: number;
};

export type Notes = {
  allies: any;
  personalPossessions: string;
  otherHoldings: any;
  organizations: string;
  enemies: string;
  backstory: string;
  otherNotes: string;
};

export type Traits = {
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  appearance: string;
};

export type Preferences = {
  useHomebrewContent: boolean;
  progressionType: number;
  encumbranceType: number;
  ignoreCoinWeight: boolean;
  hitPointType: number;
  showUnarmedStrike: boolean;
  showScaledSpells: boolean;
  primarySense: number;
  primaryMovement: number;
  privacyType: number;
  sharingType: number;
  abilityScoreDisplayType: number;
  enforceFeatRules: boolean;
  enforceMulticlassRules: boolean;
  enableOptionalClassFeatures: boolean;
  enableOptionalOrigins: boolean;
  enableDarkMode: boolean;
  enableContainerCurrency: boolean;
};

export type Configuration = {
  startingEquipmentType: number;
  abilityScoreType: number;
  showHelpText: boolean;
};

export type Inventory = {
  id: number;
  entityTypeId: number;
  definition: Definition3;
  definitionId: number;
  definitionTypeId: number;
  displayAsAttack: any;
  quantity: number;
  isAttuned: boolean;
  equipped: boolean;
  equippedEntityTypeId?: number;
  equippedEntityId?: number;
  chargesUsed: number;
  limitedUse: any;
  containerEntityId: number;
  containerEntityTypeId: number;
  containerDefinitionKey: string;
  currency: any;
};

export type Definition3 = {
  id: number;
  baseTypeId: number;
  entityTypeId: number;
  definitionKey: string;
  canEquip: boolean;
  magic: boolean;
  name: string;
  snippet: any;
  weight: number;
  weightMultiplier: number;
  capacity?: string;
  capacityWeight: number;
  type: string;
  description: string;
  canAttune: boolean;
  attunementDescription: any;
  rarity: string;
  isHomebrew: boolean;
  version: any;
  sourceId: any;
  sourcePageNumber: any;
  stackable: boolean;
  bundleSize: number;
  avatarUrl: any;
  largeAvatarUrl: any;
  filterType: string;
  cost: number;
  isPack: boolean;
  tags: string[];
  grantedModifiers: any[];
  subType?: string;
  isConsumable: boolean;
  weaponBehaviors: any[];
  baseItemId?: number;
  baseArmorName?: string;
  strengthRequirement: any;
  armorClass?: number;
  stealthCheck?: number;
  damage?: Damage;
  damageType?: string;
  fixedDamage: any;
  properties?: Property[];
  attackType?: number;
  categoryId?: number;
  range?: number;
  longRange?: number;
  isMonkWeapon: boolean;
  levelInfusionGranted: any;
  sources: Source4[];
  armorTypeId?: number;
  gearTypeId?: number;
  groupedId: any;
  canBeAddedToInventory: boolean;
  isContainer: boolean;
  isCustomItem: boolean;
  isLegacy: boolean;
};

export type Damage = {
  diceCount: number;
  diceValue: number;
  diceMultiplier: any;
  fixedValue: any;
  diceString: string;
};

export type Property = {
  id: number;
  name: string;
  description: string;
  notes?: string;
};

export type Source4 = {
  sourceId: number;
  pageNumber: any;
  sourceType: number;
};

export type Currencies = {
  cp: number;
  sp: number;
  gp: number;
  ep: number;
  pp: number;
};

export type Class = {
  id: number;
  entityTypeId: number;
  level: number;
  isStartingClass: boolean;
  hitDiceUsed: number;
  definitionId: number;
  subclassDefinitionId: any;
  definition: Definition4;
  subclassDefinition: any;
  classFeatures: ClassFeature2[];
};

export type Definition4 = {
  id: number;
  definitionKey: string;
  name: string;
  description: string;
  equipmentDescription: string;
  parentClassId: any;
  avatarUrl: string;
  largeAvatarUrl: string;
  portraitAvatarUrl: string;
  moreDetailsUrl: string;
  spellCastingAbilityId: number;
  sources: Source5[];
  classFeatures: ClassFeature[];
  hitDice: number;
  wealthDice: WealthDice;
  canCastSpells: boolean;
  knowsAllSpells: boolean;
  spellPrepareType: number;
  spellContainerName: any;
  sourcePageNumber: number;
  subclassDefinition: any;
  isHomebrew: boolean;
  primaryAbilities: number[];
  spellRules: SpellRules;
  prerequisites: Prerequisite[];
};

export type Source5 = {
  sourceId: number;
  pageNumber: number;
  sourceType: number;
};

export type ClassFeature = {
  id: number;
  name: string;
  prerequisite: any;
  description: string;
  requiredLevel: number;
  displayOrder: number;
};

export type WealthDice = {
  diceCount: number;
  diceValue: number;
  diceMultiplier: number;
  fixedValue: any;
  diceString: string;
};

export type SpellRules = {
  multiClassSpellSlotDivisor: number;
  isRitualSpellCaster: boolean;
  levelCantripsKnownMaxes: number[];
  levelSpellKnownMaxes: any[];
  levelSpellSlots: number[][];
  multiClassSpellSlotRounding: number;
  levelPreparedSpellMaxes: number | undefined[];
};

export type Prerequisite = {
  description: string;
  prerequisiteMappings: PrerequisiteMapping[];
  hidePrerequisite: boolean;
};

export type PrerequisiteMapping = {
  id: number;
  entityId: number;
  entityTypeId: number;
  type: string;
  subType: string;
  value: number;
  friendlyTypeName: string;
  friendlySubTypeName: string;
};

export type ClassFeature2 = {
  definition: Definition5;
  levelScale: any;
};

export type Definition5 = {
  id: number;
  definitionKey: string;
  entityTypeId: number;
  displayOrder: number;
  name: string;
  description: string;
  snippet: string;
  activation: any;
  multiClassDescription: string;
  requiredLevel: number;
  isSubClassFeature: boolean;
  limitedUse: LimitedUse[];
  hideInBuilder: boolean;
  hideInSheet: boolean;
  sourceId: number;
  sourcePageNumber?: number;
  creatureRules: any[];
  levelScales: LevelScale[];
  infusionRules: InfusionRule[];
  spellListIds: any[];
  classId: number;
  featureType: number;
  sources: Source6[];
  affectedFeatureDefinitionKeys: any[];
  entityType: string;
  entityID: string;
  grantedFeats: any[];
};

export type LimitedUse = {
  level: any;
  uses: number;
};

export type LevelScale = {
  id: number;
  level: number;
  description: string;
  dice: Dice;
  fixedValue: number;
};

export type Dice = {
  diceCount: any;
  diceValue: any;
  diceMultiplier: any;
  fixedValue: any;
  diceString: any;
};

export type InfusionRule = {
  level: number;
  choiceKey: string;
};

export type Source6 = {
  sourceId: number;
  pageNumber?: number;
  sourceType: number;
};

export type DeathSaves = {
  failCount: number;
  successCount: number;
  isStabilized: boolean;
};

export type SpellSlot = {
  level: number;
  used: number;
  available: number;
};

export type PactMagic = {
  level: number;
  used: number;
  available: number;
};

export type Spells = {
  race: any[];
  class: any[];
  background: any;
  item: any[];
  feat: any[];
};

export type Options = {
  race: any[];
  class: any[];
  background: any;
  item: any;
  feat: any[];
};

export type Choices = {
  race: any[];
  class: Class2[];
  background: Background2[];
  item: any;
  feat: any[];
  choiceDefinitions: ChoiceDefinition[];
  definitionKeyNameMap: DefinitionKeyNameMap;
};

export type Class2 = {
  componentId: number;
  componentTypeId: number;
  id: string;
  parentChoiceId: any;
  type: number;
  subType?: number;
  optionValue?: number;
  label?: string;
  isOptional: boolean;
  isInfinite: boolean;
  defaultSubtypes: any[];
  displayOrder: any;
  options: any[];
  optionIds: number[];
  tagConstraints: any[];
};

export type Background2 = {
  componentId: number;
  componentTypeId: number;
  id: string;
  parentChoiceId: any;
  type: number;
  subType: number;
  optionValue: number;
  label: string;
  isOptional: boolean;
  isInfinite: boolean;
  defaultSubtypes: string[];
  displayOrder: any;
  options: any[];
  optionIds: number[];
  tagConstraints: any[];
};

export type ChoiceDefinition = {
  id: string;
  options: Option[];
};

export type Option = {
  id: number;
  label: string;
  description: any;
  sourceId: any;
};

export type DefinitionKeyNameMap = {};

export type Actions = {
  race: Race2[];
  class: Class3[];
  background: any;
  item: any;
  feat: any[];
};

export type Race2 = {
  componentId: number;
  componentTypeId: number;
  id: string;
  entityTypeId: string;
  limitedUse: LimitedUse2;
  name: string;
  description: any;
  snippet: string;
  abilityModifierStatId: any;
  onMissDescription: any;
  saveFailDescription: any;
  saveSuccessDescription: any;
  saveStatId: any;
  fixedSaveDc: any;
  attackTypeRange: any;
  actionType: number;
  attackSubtype: any;
  dice: any;
  value: any;
  damageTypeId: any;
  isMartialArts: boolean;
  isProficient: boolean;
  spellRangeType: any;
  displayAsAttack: any;
  range: Range;
  activation: Activation;
  numberOfTargets: any;
  fixedToHit: any;
  ammunition: any;
};

export type LimitedUse2 = {
  name: any;
  statModifierUsesId: any;
  resetType: number;
  numberUsed: number;
  minNumberConsumed: number;
  maxNumberConsumed: number;
  maxUses: number;
  operator: number;
  useProficiencyBonus: boolean;
  proficiencyBonusOperator: number;
  resetDice: any;
};

export type Range = {
  range: any;
  longRange: any;
  aoeType: any;
  aoeSize: any;
  hasAoeSpecialDescription: boolean;
  minimumRange: any;
};

export type Activation = {
  activationTime: any;
  activationType: number;
};

export type Class3 = {
  componentId: number;
  componentTypeId: number;
  id: string;
  entityTypeId: string;
  limitedUse: LimitedUse3;
  name: string;
  description: string;
  snippet: string;
  abilityModifierStatId: any;
  onMissDescription: string;
  saveFailDescription: string;
  saveSuccessDescription: string;
  saveStatId: any;
  fixedSaveDc: any;
  attackTypeRange: any;
  actionType: number;
  attackSubtype: any;
  dice: any;
  value: any;
  damageTypeId: any;
  isMartialArts: boolean;
  isProficient: boolean;
  spellRangeType: any;
  displayAsAttack: any;
  range: Range2;
  activation: Activation2;
  numberOfTargets: any;
  fixedToHit: any;
  ammunition: any;
};

export type LimitedUse3 = {
  name: any;
  statModifierUsesId: number;
  resetType: number;
  numberUsed: number;
  minNumberConsumed: number;
  maxNumberConsumed: number;
  maxUses: number;
  operator: number;
  useProficiencyBonus: boolean;
  proficiencyBonusOperator: number;
  resetDice: any;
};

export type Range2 = {
  range: any;
  longRange: any;
  aoeType: any;
  aoeSize: any;
  hasAoeSpecialDescription: boolean;
  minimumRange: any;
};

export type Activation2 = {
  activationTime: any;
  activationType: number;
};

export type Modifiers = {
  race: Race3[];
  class: Class4[];
  background: Background3[];
  item: any[];
  feat: any[];
  condition: any[];
};

export type Race3 = {
  fixedValue?: number;
  id: string;
  entityId?: number;
  entityTypeId?: number;
  type: string;
  subType: string;
  dice: any;
  restriction: string;
  statId: any;
  requiresAttunement: boolean;
  duration: any;
  friendlyTypeName: string;
  friendlySubtypeName: string;
  isGranted: boolean;
  bonusTypes: any[];
  value?: number;
  availableToMulticlass: boolean;
  modifierTypeId: number;
  modifierSubTypeId: number;
  componentId: number;
  componentTypeId: number;
  tagConstraints: any[];
};

export type Class4 = {
  fixedValue: any;
  id: string;
  entityId?: number;
  entityTypeId?: number;
  type: string;
  subType: string;
  dice: any;
  restriction: string;
  statId: any;
  requiresAttunement: boolean;
  duration: any;
  friendlyTypeName: string;
  friendlySubtypeName: string;
  isGranted: boolean;
  bonusTypes: any[];
  value: any;
  availableToMulticlass: boolean;
  modifierTypeId: number;
  modifierSubTypeId: number;
  componentId: number;
  componentTypeId: number;
  tagConstraints: any[];
};

export type Background3 = {
  fixedValue: any;
  id: string;
  entityId: number;
  entityTypeId: number;
  type: string;
  subType: string;
  dice: any;
  restriction: string;
  statId: any;
  requiresAttunement: boolean;
  duration: any;
  friendlyTypeName: string;
  friendlySubtypeName: string;
  isGranted: boolean;
  bonusTypes: any[];
  value: any;
  availableToMulticlass: boolean;
  modifierTypeId: number;
  modifierSubTypeId: number;
  componentId: number;
  componentTypeId: number;
  tagConstraints: any[];
};

export type ClassSpell = {
  entityTypeId: number;
  characterClassId: number;
  spells: Spell[];
};

export type Spell = {
  overrideSaveDc: any;
  limitedUse: any;
  id: number;
  entityTypeId: number;
  definition: Definition6;
  definitionId: number;
  prepared: boolean;
  countsAsKnownSpell: boolean;
  usesSpellSlot: boolean;
  castAtLevel: any;
  alwaysPrepared: boolean;
  restriction: any;
  spellCastingAbilityId: any;
  displayAsAttack: any;
  additionalDescription: any;
  castOnlyAsRitual: boolean;
  ritualCastingType: any;
  range: Range4;
  activation: Activation4;
  baseLevelAtWill: boolean;
  atWillLimitedUseLevel: any;
  isSignatureSpell: any;
  componentId: number;
  componentTypeId: number;
  spellListId: any;
};

export type Definition6 = {
  id: number;
  definitionKey: string;
  name: string;
  level: number;
  school: string;
  duration: Duration;
  activation: Activation3;
  range: Range3;
  asPartOfWeaponAttack: boolean;
  description: string;
  snippet: string;
  concentration: boolean;
  ritual: boolean;
  rangeArea: any;
  damageEffect: any;
  components: number[];
  componentsDescription: string;
  saveDcAbilityId: any;
  healing: any;
  healingDice: any[];
  tempHpDice: any[];
  attackType?: number;
  canCastAtHigherLevel: boolean;
  isHomebrew: boolean;
  version: any;
  sourceId: any;
  sourcePageNumber: number;
  requiresSavingThrow: boolean;
  requiresAttackRoll: boolean;
  atHigherLevels: AtHigherLevels;
  modifiers: Modifier[];
  conditions: any[];
  tags: string[];
  castingTimeDescription: string;
  scaleType: string;
  sources: Source7[];
  spellGroups: number[];
  isLegacy: boolean;
};

export type Duration = {
  durationInterval: number;
  durationUnit: any;
  durationType: string;
};

export type Activation3 = {
  activationTime: number;
  activationType: number;
};

export type Range3 = {
  origin: string;
  rangeValue: number;
  aoeType: any;
  aoeValue: any;
};

export type AtHigherLevels = {
  higherLevelDefinitions: any[];
  additionalAttacks: any[];
  additionalTargets: any[];
  areaOfEffect: any[];
  duration: any[];
  creatures: any[];
  special: any[];
  points: any[];
  range: any[];
};

export type Modifier = {
  fixedValue: any;
  id: string;
  entityId: any;
  entityTypeId: any;
  type: string;
  subType: string;
  dice: any;
  restriction: string;
  statId: any;
  requiresAttunement: boolean;
  duration: any;
  friendlyTypeName: string;
  friendlySubtypeName: string;
  isGranted: boolean;
  bonusTypes: any[];
  value: any;
  availableToMulticlass: any;
  modifierTypeId: number;
  modifierSubTypeId: number;
  componentId: number;
  componentTypeId: number;
  die: Die;
  count: number;
  durationUnit: any;
  usePrimaryStat: boolean;
  atHigherLevels: AtHigherLevels2;
};

export type Die = {
  diceCount: number;
  diceValue: number;
  diceMultiplier: any;
  fixedValue: any;
  diceString: string;
};

export type AtHigherLevels2 = {
  higherLevelDefinitions: HigherLevelDefinition[];
  additionalAttacks: any[];
  additionalTargets: any[];
  areaOfEffect: any[];
  duration: any[];
  creatures: any[];
  special: any[];
  points: any[];
  range: any[];
};

export type HigherLevelDefinition = {
  level: number;
  typeId: number;
  dice: Dice2;
  value: any;
  details: string;
};

export type Dice2 = {
  diceCount: number;
  diceValue: number;
  diceMultiplier: any;
  fixedValue: number;
  diceString: string;
};

export type Source7 = {
  sourceId: number;
  pageNumber?: number;
  sourceType: number;
};

export type Range4 = {
  origin: string;
  rangeValue: number;
  aoeType: any;
  aoeValue: any;
};

export type Activation4 = {
  activationTime: number;
  activationType: number;
};

export type Campaign = {
  id: number;
  name: string;
  description: string;
  link: string;
  publicNotes: string;
  dmUserId: number;
  dmUsername: string;
  characters: UserCharacter[];
};

export type UserCharacter = {
  userId: number;
  username: string;
  characterId: number;
  characterName: string;
  characterUrl: string;
  avatarUrl: string;
  privacyType: number;
  campaignId: any;
  isAssigned: boolean;
};

export type CharacterProfile = {
  avatar: string;
  name: string;
  race: string;
  classes: string;
  background: string;
  details: CharDetails;
  traits: CharTraits;
  backstory: string;
  organizations: string;
  allies: any;
  enemies: string;
  notes: CharNotes;
};

export type CharDetails = {
  age: number;
  gender: string;
  hair: string;
  eyes: string;
  skin: string;
  height: string;
  weight: number;
  faith: any;
  appearance: string;
};

export type CharTraits = {
  bonds: string;
  flaws: string;
  ideals: string;
  personality: string;
};

export type CharNotes = {
  possessions: string;
  otherHoldings: any;
  otherNotes: string;
};
