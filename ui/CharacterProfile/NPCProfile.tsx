import React from 'react';
import { NpcData } from '@viserya/types/npc';
import { AbilityScores } from '@viserya/ui/AbilityScores';
import { calcAbilityModifier } from '@viserya/utils/calcAbilityModifier';
import { CharacterProfileCard } from './CharacterProfileCard';
import { CharacterProfileContent } from './CharacterProfileContent';
import { CharacterProfileHeader } from './CharacterProfileHeader';
import { CharacterProfileName } from './CharacterProfileName';

export const NPCProfile = ({
  name,
  race,
  size,
  alignment,
  ac,
  ac_type,
  hp,
  hitdice,
  speed,
  str,
  dex,
  con,
  int,
  wis,
  cha,
  skills,
  senses,
  languages,
  cr,
  xp,
  actions,
  backstory,
  personality,
  inventory,
  appearance,
}: NpcData) => {
  const charAttrs = {
    str: calcAbilityModifier(str),
    dex: calcAbilityModifier(dex),
    con: calcAbilityModifier(con),
    int: calcAbilityModifier(int),
    wis: calcAbilityModifier(wis),
    cha: calcAbilityModifier(cha),
  };

  return (
    <CharacterProfileCard>
      <CharacterProfileHeader>
        <CharacterProfileContent>
          <CharacterProfileName>
            <strong>{name}</strong>
            <small>
              {size} {race}, {alignment}
            </small>
          </CharacterProfileName>

          <hr />

          {ac && (
            <p>
              <strong>Armor Class.</strong> {ac} ({ac_type})
            </p>
          )}

          {hp && (
            <p>
              <strong>Hit Points.</strong> {hp} ({hitdice})
            </p>
          )}

          {speed && (
            <p>
              <strong>Speed.</strong> {speed}
            </p>
          )}

          <hr />

          <AbilityScores scores={charAttrs} $columns={6} />

          <hr />
        </CharacterProfileContent>
      </CharacterProfileHeader>

      <CharacterProfileContent>
        {skills && (
          <p>
            <strong>Skills.</strong> {skills}
          </p>
        )}

        {senses && (
          <p>
            <strong>Senses.</strong> {senses}
          </p>
        )}

        {languages && (
          <p>
            <strong>Languages.</strong> {languages}
          </p>
        )}

        {cr && (
          <p>
            <strong>Challenge.</strong> {cr} ({xp} XP)
          </p>
        )}

        {inventory && (
          <p>
            <strong>Inventory.</strong> {inventory}
          </p>
        )}
      </CharacterProfileContent>

      {actions && actions.length > 0 && (
        <>
          <hr />
          <h3>Actions</h3>
          {actions.map(({ name, description }, index) => {
            return (
              <p key={index}>
                <strong>{name}.</strong> {description}
              </p>
            );
          })}
        </>
      )}

      {backstory && (
        <>
          <hr />
          <h3>Backstory</h3>
          <p>{backstory}</p>
        </>
      )}

      {personality && (
        <>
          <hr />
          <h3>Personality</h3>
          <p>{personality}</p>
        </>
      )}

      {appearance && (
        <>
          <hr />
          <h3>Appearance</h3>
          <p>{appearance}</p>
        </>
      )}
    </CharacterProfileCard>
  );
};
