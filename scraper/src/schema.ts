import { z } from 'zod';
import { pgTable, text, integer, numeric, timestamp, jsonb, serial } from 'drizzle-orm/pg-core';

// Zod Schema for validation
export const PhoneSpecSchema = z.object({
  url: z.string().url(),
  name: z.string().min(1),
  brand: z.string().min(1),
  imageUrl: z.string().url().optional(),
  
  // Raw fields extracted directly from the page
  networkRaw: z.string().optional(),
  launchAnnouncedRaw: z.string().optional(),
  bodyDimensionsRaw: z.string().optional(),
  bodyWeightRaw: z.string().optional(),
  displayTypeRaw: z.string().optional(),
  displaySizeRaw: z.string().optional(),
  displayResolutionRaw: z.string().optional(),
  platformOSRaw: z.string().optional(),
  platformChipsetRaw: z.string().optional(),
  platformCPURaw: z.string().optional(),
  memoryInternalRaw: z.string().optional(),
  mainCameraRaw: z.string().optional(),
  selfieCameraRaw: z.string().optional(),
  batteryRaw: z.string().optional(),
  featuresSensorsRaw: z.string().optional(),
  priceRaw: z.string().optional(),
});

export type PhoneSpec = z.infer<typeof PhoneSpecSchema>;

// Drizzle DB Schema
export const phonesTable = pgTable('phones', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  brand: text('brand').notNull(),
  model: text('model').notNull(),
  releaseYear: integer('release_year'),
  
  // Math-ready columns
  batteryMah: integer('battery_mah'),
  screenSizeInches: numeric('screen_size_inches', { precision: 4, scale: 2 }),
  ramGbMax: integer('ram_gb_max'),
  storageGbMax: integer('storage_gb_max'),
  weightG: integer('weight_g'),
  
  rawSpecs: jsonb('raw_specs'),
  imageUrl: text('image_url'),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
