/**
 * Function to calculate the ability modifier based on an ability score
 * @param abilityScore - the ability score (e.g., Strength, Dexterity, etc.)
 * @returns the modifier for the given ability score
 */
export function calcAbilityModifier(abilityScore: number): string {
  if (abilityScore < 1 || abilityScore > 30) {
    throw new Error('Ability score must be between 1 and 30.');
  }

  const modifier = Math.floor((abilityScore - 10) / 2);

  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
}
