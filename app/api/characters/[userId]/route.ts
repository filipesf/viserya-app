import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

type CharacterSheetPararams = {
  params: {
    userId: string;
  };
};

export async function GET(
  _request: NextRequest,
  { params: { userId } }: CharacterSheetPararams,
) {
  try {
    const result = await sql`
      SELECT * FROM characters
      WHERE user_id=${userId};
    `;

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500 });
  }
}
