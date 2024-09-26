import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    console.log('🧑‍💻 CREATING DATABASES');

    await sql`
      CREATE TABLE IF NOT EXISTS sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        status VARCHAR(50) NOT NULL DEFAULT 'active',
        type VARCHAR(50),
        language VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        summary TEXT,
        thread_id VARCHAR(255) NOT NULL,
        channel_id VARCHAR(255) NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        previously_id UUID,
        start_time TIMESTAMP NOT NULL DEFAULT NOW(),
        end_time TIMESTAMP
      );
    `;

    console.log('💾 SESSIONS DATABASE CREATED');

    await sql`
      CREATE TABLE IF NOT EXISTS messages (
        id VARCHAR(255) PRIMARY KEY,
        thread_id VARCHAR(255) NOT NULL,
        channel_id VARCHAR(255) NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL DEFAULT 'decision',
        text TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        edited_at TIMESTAMP
      );
    `;

    console.log('💾 MESSAGES DATABASE CREATED');

    console.log('✅ DATABASES CREATED SUCCESSFULLY');

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('💀 Error while trying to create databases:', error);
    return NextResponse.error();
  }
}
