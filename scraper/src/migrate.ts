import postgres from 'postgres';
import * as dotenv from 'dotenv';
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/gsm_scraper';
const sql = postgres(DATABASE_URL);

async function runMigration() {
  console.log('Running migration...');
  
  try {
    await sql`DROP TABLE IF EXISTS phones CASCADE;`;
    console.log('Dropped existing phones table.');

    await sql`
      CREATE TABLE phones (
          id SERIAL PRIMARY KEY,
          slug TEXT UNIQUE NOT NULL, -- e.g., 'samsung-galaxy-s26-ultra'
          brand TEXT NOT NULL,
          model TEXT NOT NULL,
          release_year INTEGER,
          
          -- Math-ready columns for your Python Recommendation Engine
          battery_mah INTEGER,
          screen_size_inches NUMERIC(4,2),
          ram_gb_max INTEGER,
          storage_gb_max INTEGER,
          weight_g INTEGER,
          
          -- Data for the Search Engine
          raw_specs JSONB, -- Stores the full GSMArena table for reference
          image_url TEXT,
          
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Created phones table.');

    await sql`CREATE INDEX idx_phones_year ON phones(release_year);`;
    await sql`CREATE INDEX idx_phones_brand ON phones(brand);`;
    console.log('Created indexes.');

  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await sql.end();
  }
}

runMigration();
