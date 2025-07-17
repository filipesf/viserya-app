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
        server_id VARCHAR(255) NOT NULL,
        channel_id VARCHAR(255) NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        previously_id UUID,
        start_time TIMESTAMP NOT NULL DEFAULT NOW(),
        end_time TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS messages (
        id VARCHAR(255) PRIMARY KEY,
        thread_id VARCHAR(255) NOT NULL,
        server_id VARCHAR(255) NOT NULL,
        channel_id VARCHAR(255) NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        text TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        edited_at TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS characters (
        id VARCHAR(255) NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        info VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS npc (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        race VARCHAR(50) NOT NULL,
        class VARCHAR(50) NOT NULL,
        background VARCHAR(100),
        alignment VARCHAR(50),
        hp INT,
        hitdice VARCHAR(50),
        ac INT,
        armor_type VARCHAR(50),
        speed INT,
        str INT,
        dex INT,
        con INT,
        int INT,
        wis INT,
        cha INT,
        skills TEXT,
        senses TEXT,
        passive_perception INT,
        languages TEXT,
        actions TEXT,
        personality TEXT,
        motivations TEXT,
        backstory TEXT,
        appearance TEXT,
        equipment TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;

    console.log('✅ DATABASES CREATED SUCCESSFULLY');

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('💀 Error while trying to create databases:', error);
    return NextResponse.error();
  }
}
