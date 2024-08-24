import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    console.log('🧑‍💻 CREATING DATABASES');

    await sql`
      CREATE TABLE IF NOT EXISTS sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        channel_id VARCHAR(255) NOT NULL,
        thread_id VARCHAR(255) NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        start_time TIMESTAMP NOT NULL DEFAULT NOW(),
        end_time TIMESTAMP,
        status VARCHAR(50) NOT NULL DEFAULT 'active'
      );
    `;

    console.log('💾 SESSIONS DATABASE CREATED');

    await sql`
      CREATE TABLE IF NOT EXISTS messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        channel_id VARCHAR(255) NOT NULL,
        thread_id VARCHAR(255) NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL DEFAULT 'decision',
        role VARCHAR(50) NOT NULL,
        text TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        edited_at TIMESTAMP
      );
    `;

    console.log('💾 MESSAGES DATABASE CREATED');

    console.log('✅ DATABASES CREATED SUCCESSFULLY');

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error(
      '💀 Error while trying to create databases:',
      NextResponse.json(error),
    );
    return NextResponse.error();
  }
}
