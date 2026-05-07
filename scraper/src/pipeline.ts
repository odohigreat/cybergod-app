import { Redis } from 'ioredis';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { phonesTable, PhoneSpec } from './schema';
import * as dotenv from 'dotenv';
import { cleanPhoneData } from './cleaner';

dotenv.config();

// Environment variables or defaults
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/gsm_scraper';

// Initialize connections
export const redis = new Redis(REDIS_URL);
const queryClient = postgres(DATABASE_URL);
export const db = drizzle(queryClient);

// Redis Queue Keys
export const QUEUE_KEY = 'scraper:queue:pending';
export const PROCESSING_KEY = 'scraper:queue:processing';

/**
 * Pushes a URL to the queue if it hasn't been processed recently.
 */
export async function enqueueUrl(url: string) {
  const added = await redis.sadd('scraper:queue:seen', url);
  if (added) {
    await redis.lpush(QUEUE_KEY, url);
    console.log(`[Queue] Enqueued new URL: ${url}`);
  }
}

/**
 * Pops a URL from the queue for processing.
 */
export async function dequeueUrl(): Promise<string | null> {
  return await redis.rpoplpush(QUEUE_KEY, PROCESSING_KEY);
}

/**
 * Acknowledges that a URL has been fully processed.
 */
export async function ackUrl(url: string) {
  await redis.lrem(PROCESSING_KEY, 1, url);
}

function generateSlug(brand: string, name: string): string {
  const combined = `${brand} ${name}`.toLowerCase();
  return combined.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

/**
 * Inserts the extracted data into PostgreSQL.
 * Populates Math-ready columns via the cleaner utility.
 */
export async function savePhoneData(data: PhoneSpec) {
  const { url, name, brand, imageUrl, ...rawSpecs } = data;

  const slug = generateSlug(brand, name);
  
  // Attempt to extract a basic 4-digit year from the launch string
  const releaseYearMatch = rawSpecs.launchAnnouncedRaw?.match(/\b(20\d{2})\b/);
  const releaseYear = releaseYearMatch ? parseInt(releaseYearMatch[1], 10) : null;

  const cleaned = cleanPhoneData(rawSpecs);

  await db.insert(phonesTable)
    .values({
      slug,
      brand,
      model: name,
      releaseYear,
      rawSpecs,
      batteryMah: cleaned.batteryMah,
      screenSizeInches: cleaned.screenSizeInches?.toString() ?? null,
      weightG: cleaned.weightG,
      ramGbMax: cleaned.ramGbMax,
      storageGbMax: cleaned.storageGbMax,
      imageUrl,
    })
    .onConflictDoUpdate({
      target: phonesTable.slug,
      set: {
        brand,
        model: name,
        releaseYear,
        rawSpecs,
        batteryMah: cleaned.batteryMah,
        screenSizeInches: cleaned.screenSizeInches?.toString() ?? null,
        weightG: cleaned.weightG,
        ramGbMax: cleaned.ramGbMax,
        storageGbMax: cleaned.storageGbMax,
        imageUrl,
        updatedAt: new Date(),
      }
    });

  console.log(`[DB] Saved phone data: ${slug}`);

  // Trigger sync to search engine
  await syncToSearchEngine(data);
}

/**
 * Hook to trigger Meilisearch/Typesense update.
 */
export async function syncToSearchEngine(data: PhoneSpec) {
  try {
    // Placeholder for actual SDK implementation
    // console.log(`[Search Sync] Triggered index update for ${data.brand} ${data.name}`);
  } catch (err) {
    console.error(`[Search Sync] Failed to sync ${data.name}:`, err);
  }
}
