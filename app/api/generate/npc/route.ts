import { NextRequest, NextResponse } from 'next/server';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import {
  npc,
  cities,
  kingdoms,
  scenario,
  settlements,
} from '@viserya/config/instructions';
import { openai } from '@viserya/config/openai';
import { NpcData } from '@viserya/types';

export const runtime = 'nodejs';


const NpcSchema = z.object({
  name: z.string(),
  size: z.enum(['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan']),
  race: z.enum([
    'Aasimar',
    'Black Dragonborn',
    'Blue Dragonborn',
    'Brass Dragonborn',
    'Bronze Dragonborn',
    'Copper Dragonborn',
    'Gold Dragonborn',
    'Green Dragonborn',
    'Red Dragonborn',
    'Silver Dragonborn',
    'White Dragonborn',
    'Dwarf',
    'High Elf',
    'Wood Elf',
    'Dark Elf',
    'Firbolg',
    'Forest Gnome',
    'Rock Gnome',
    'Cloud Goliath',
    'Fire Goliath',
    'Frost Goliath',
    'Frost Goliath',
    'Hill Goliath',
    'Stone Goliath',
    'Storm Goliath',
    'Halfling',
    'Human',
    'Kobold',
    'Lizardfolk',
    'Orc',
    'Abyssal Tiefling',
    'Chthonic Tiefling',
    'Infernal Tiefling',
  ]),
  alignment: z.enum([
    'Lawful Good',
    'Lawful Neutral',
    'Lawful Evil',
    'Neutral Good',
    'Neutral',
    'Neutral Evil',
    'Chaotic Good',
    'Chaotic Neutral',
    'Chaotic Evil',
  ]),
  ac: z.number().int(),
  ac_type: z.string(),
  hp: z.number().int(),
  hitdice: z.string(),
  speed: z.string(),
  str: z.number().int(),
  dex: z.number().int(),
  con: z.number().int(),
  int: z.number().int(),
  wis: z.number().int(),
  cha: z.number().int(),
  proficiency: z.number().int(),
  skills: z.string(),
  senses: z.string(),
  languages: z.string(),
  cr: z.string(),
  xp: z.string(),
  actions: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
    }),
  ),
  backstory: z.string(),
  personality: z.string().optional(),
  inventory: z.string().optional(),
  appearance: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    console.log(
      [npc, scenario, kingdoms, cities, settlements, prompt].join('\n\n'),
    );

    const completion = await openai.beta.chat.completions.parse({
      model: 'gpt-4o-mini',
      temperature: 1,
      messages: [
        { role: 'system', content: npc },
        { role: 'system', content: scenario },
        { role: 'system', content: kingdoms },
        { role: 'system', content: cities },
        { role: 'system', content: settlements },
        { role: 'user', content: prompt },
      ],
      response_format: zodResponseFormat(NpcSchema, 'npc_data'),
    });

    const data = completion.choices[0].message.parsed as NpcData;

    console.log(data);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
