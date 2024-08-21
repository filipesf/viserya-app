import { CharacterAttributes } from '@viserya/types';

function rollDice(): number[] {
  const rolls = [];
  for (let i = 0; i < 4; i++) {
    rolls.push(Math.floor(Math.random() * 6) + 1);
  }
  return rolls;
}

function dropLowest(rolls: number[]): number[] {
  const sortedRolls = rolls.sort((a, b) => a - b);
  return sortedRolls.slice(1); // Drop the lowest roll
}

function sumRolls(rolls: number[]): number {
  return rolls.reduce((sum, roll) => sum + roll, 0);
}

export function generateAttribute(): number {
  const rolls = rollDice();
  const bestRolls = dropLowest(rolls);
  return sumRolls(bestRolls);
}

export function getCharacterAttributes(): CharacterAttributes {
  const attributes = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
  const characterAttributes: CharacterAttributes = {};

  attributes.forEach((attribute) => {
    characterAttributes[attribute] = generateAttribute();
  });

  return characterAttributes;
}
