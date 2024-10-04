import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { CHARSHEET_API } from '@viserya/config/constants';
import { CharacterSheet } from '@viserya/types/sheet';

type CharacterSheetPararams = {
  params: {
    userId: string;
    characterId: string;
  };
};

export async function GET(
  _request: NextRequest,
  { params: { userId, characterId } }: CharacterSheetPararams,
) {
  try {
    const result = await sql`
      SELECT * FROM characters
      WHERE user_id=${userId} AND id=${characterId};
    `;

    if (result.rowCount !== 1) return NextResponse.json({ status: 404 });

    const response = await axios.get(CHARSHEET_API + characterId);

    const {
      age,
      background,
      classes,
      eyes,
      faith,
      gender,
      hair,
      height,
      name,
      notes,
      race,
      skin,
      traits,
      weight,
      decorations,
    } = response.data.data as CharacterSheet;

    return NextResponse.json(
      {
        avatar: decorations.avatarUrl,
        name: name,

        race: race.fullName,
        classes: classes
          .map((c: any) => `${c.definition.name} ${c.level}`)
          .join(' / '),
        background: background.definition.name,

        details: {
          age: age,
          gender: gender,
          hair: hair,
          eyes: eyes,
          skin: skin,
          height: height,
          weight: weight,
          faith: faith,
          appearance: traits.appearance,
        },

        traits: {
          bonds: traits.bonds,
          flaws: traits.flaws,
          ideals: traits.ideals,
          personality: traits.personalityTraits,
        },

        backstory: notes.backstory,
        organizations: notes.organizations,
        allies: notes.allies,
        enemies: notes.enemies,

        notes: {
          possessions: notes.personalPossessions,
          otherHoldings: notes.otherHoldings,
          otherNotes: notes.otherNotes,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}

export async function POST(
  _request: NextRequest,
  { params: { userId, characterId } }: CharacterSheetPararams,
) {
  try {
    const result = await sql`
      SELECT * FROM characters
      WHERE user_id=${userId} AND id=${characterId};
    `;

    const characterIsStored = result.rowCount == 1;

    if (characterIsStored) {
      return NextResponse.json('Character already stored.', { status: 200 });
    }

    const beyond = await axios.get(CHARSHEET_API + characterId);
    const { background, classes, name, race } = beyond.data
      .data as CharacterSheet;

    const char = {
      race: race.fullName,
      classes: classes.map((c: any) => c.definition.name).join('/'),
      background: background.definition.name,
    };

    const info = `${char.race}, ${char.classes}, ${char.background}`;

    console.log('🦸 STORING CHARACTER');

    await sql`
      INSERT INTO characters (id, user_id, name, info)
      VALUES (${characterId}, ${userId}, ${name}, ${info});
    `;

    console.log('🕋 CHARACTER STORED');

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('💀 Error while trying to store character:', error);
    return NextResponse.error();
  }
}

export async function PUT(
  _request: NextRequest,
  { params: { userId, characterId } }: CharacterSheetPararams,
) {
  const beyond = await axios.get(CHARSHEET_API + characterId);

  const { background, classes, name, race } = beyond.data
    .data as CharacterSheet;

  const char = {
    race: race.fullName,
    classes: classes.map((c: any) => c.definition.name).join('/'),
    background: background.definition.name,
  };

  const info = `${char.race}, ${char.classes}, ${char.background}`;

  try {
    console.log('🦸 UPDATING CHARACTER');

    await sql`BEGIN`;

    const result = await sql`
      UPDATE characters
      SET name=${name}, info=${info}, updated_at=NOW()
      WHERE id=${characterId} AND channel_id=${userId};
    `;

    if (result.rowCount === 0) {
      throw new Error('No character found to update');
    }

    await sql`COMMIT`;

    console.log('🕋 CHARACTER UPDATED');

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('💀 Error while trying to update the session:', error);
    return NextResponse.json({ error });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params: { userId, characterId } }: CharacterSheetPararams,
) {
  try {
    console.log('🤞 ATTEMPTING TO REMOVE CHARACTER');

    await sql`
      DELETE FROM characters
      WHERE id=${characterId} AND user_id=${userId};
    `;

    console.log('🗑️ CHARACTER REMOVED');

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(
      '💀 Error while trying to delete character:',
      NextResponse.json(error),
    );
    return NextResponse.error();
  }
}
