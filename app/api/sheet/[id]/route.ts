import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { CHARSHEET_API } from '@viserya/config/constants';

type CharacterSheetPararams = {
  params: {
    id: string;
  };
};

export async function GET(
  _request: NextRequest,
  { params: { id } }: CharacterSheetPararams,
) {
  try {
    const response = await axios.get(CHARSHEET_API + id);
    return NextResponse.json(response.data.data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
