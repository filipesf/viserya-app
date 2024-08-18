import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(_request: Request) {
  try {
    const result = await sql`
    CREATE TABLE IF NOT EXISTS sessions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      thread_id VARCHAR(255) NOT NULL,
      channel_id VARCHAR(255) NOT NULL,
      user_id VARCHAR(255) NOT NULL,
      start_time TIMESTAMP NOT NULL DEFAULT NOW(),
      end_time TIMESTAMP,
      status VARCHAR(50) NOT NULL DEFAULT 'active'
    );
  `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
