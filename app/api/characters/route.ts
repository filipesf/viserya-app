import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { CHARSHEET_API } from '@viserya/config/constants';
import { CharacterSheet } from '@viserya/types/sheet';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const characterSheetId = searchParams.get('characterSheetId');

  try {
    const response = await axios.get(CHARSHEET_API + characterSheetId);

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
    } = response.data.data as CharacterSheet;

    return NextResponse.json(
      {
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
