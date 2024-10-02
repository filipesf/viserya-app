import Image from 'next/image';
import React from 'react';
import { CharacterProfile as CharacterProfileProps } from '@viserya/types/sheet';
import { CharacterProfileAvatar } from './CharacterProfileAvatar';
import { CharacterProfileCard } from './CharacterProfileCard';
import { CharacterProfileContent } from './CharacterProfileContent';
import { CharacterProfileHeader } from './CharacterProfileHeader';
import { CharacterProfileName } from './CharacterProfileName';

type Props = {
  char: CharacterProfileProps;
};

export const CharacterProfile = ({ char }: Props) => {
  const {
    avatar,
    name,
    race,
    classes,
    background,
    details,
    traits,
    backstory,
    organizations,
    allies,
    enemies,
    notes,
  } = char || {};

  const { age, hair, eyes, skin, height, weight, faith, appearance } =
    details || {};
  const { personality, ideals, bonds, flaws } = traits || {};
  const { possessions, otherHoldings, otherNotes } = notes || {};

  const hasTraits = personality || ideals || bonds || flaws;
  const hasNotes = possessions || otherHoldings || otherNotes;

  return (
    <CharacterProfileCard>
      <CharacterProfileHeader>
        {avatar && (
          <CharacterProfileAvatar>
            <Image
              src={avatar ?? ''}
              alt={name ?? ''}
              width={240}
              height={240}
              loading="lazy"
            />
          </CharacterProfileAvatar>
        )}

        <CharacterProfileContent>
          <CharacterProfileName>
            <strong>{name}</strong>
            <small>
              {race}, {classes}, {background}
            </small>
          </CharacterProfileName>

          <p>
            {age && (
              <>
                <strong>Age:</strong> {age}
                <br />
              </>
            )}

            {hair && (
              <>
                <strong>Hair:</strong> {hair}
                <br />
              </>
            )}
            {eyes && (
              <>
                <strong>Eyes:</strong> {eyes}
                <br />
              </>
            )}
            {skin && (
              <>
                <strong>Skin:</strong> {skin}
                <br />
              </>
            )}

            {height && (
              <>
                <strong>Height:</strong> {height}
                <br />
              </>
            )}
            {weight && (
              <>
                <strong>Weight:</strong> {weight}lbs
                <br />
              </>
            )}

            {faith && (
              <>
                <strong>Faith:</strong> {faith}
              </>
            )}
          </p>
        </CharacterProfileContent>
      </CharacterProfileHeader>

      {hasTraits && (
        <>
          <hr />

          <h3>Traits</h3>

          {personality && (
            <p>
              <strong>Personality.</strong> {personality}
            </p>
          )}

          {ideals && (
            <p>
              <strong>Ideals.</strong> {ideals}
            </p>
          )}

          {bonds && (
            <p>
              <strong>Bonds.</strong> {bonds}
            </p>
          )}

          {flaws && (
            <p>
              <strong>Flaws.</strong> {flaws}
            </p>
          )}
        </>
      )}

      {appearance && (
        <>
          <hr />
          <h3>Appearance</h3>
          <p>{appearance}</p>
        </>
      )}

      {backstory && (
        <>
          <hr />
          <h3>Backstory</h3>
          <p>{backstory}</p>
        </>
      )}

      {organizations && (
        <>
          <h4>Organizations</h4>
          <p>{organizations}</p>
        </>
      )}

      {allies && (
        <>
          <h4>Allies</h4>
          <p>{allies}</p>
        </>
      )}

      {enemies && (
        <>
          <h4>Enemies</h4>
          <p>{enemies}</p>
        </>
      )}

      {hasNotes && (
        <>
          <hr />
          <h3>Notes</h3>

          {otherNotes && <p>{otherNotes}</p>}

          {possessions && (
            <p>
              <strong>Possessions.</strong> {possessions}
            </p>
          )}

          {otherHoldings && (
            <p>
              <strong>Holdings.</strong> {otherHoldings}
            </p>
          )}
        </>
      )}
    </CharacterProfileCard>
  );
};
