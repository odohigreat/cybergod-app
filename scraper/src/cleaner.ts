import { PhoneSpec } from './schema';

export interface CleanedSpecs {
  batteryMah: number | null;
  screenSizeInches: number | null;
  weightG: number | null;
  ramGbMax: number | null;
  storageGbMax: number | null;
}

/**
 * Extracts math-ready values from raw GSMArena strings.
 * This replaces the need for a separate Python recommendation/cleaning engine.
 */
export function cleanPhoneData(raw: Partial<PhoneSpec>): CleanedSpecs {
  return {
    batteryMah: parseBattery(raw.batteryRaw),
    screenSizeInches: parseScreenSize(raw.displaySizeRaw),
    weightG: parseWeight(raw.bodyWeightRaw),
    ramGbMax: parseMaxRam(raw.memoryInternalRaw),
    storageGbMax: parseMaxStorage(raw.memoryInternalRaw),
  };
}

function parseBattery(raw?: string): number | null {
  if (!raw) return null;
  const match = raw.match(/(\d+)\s*mAh/i);
  return match ? parseInt(match[1], 10) : null;
}

function parseScreenSize(raw?: string): number | null {
  if (!raw) return null;
  // e.g. "6.1 inches, 90.1 cm2"
  const match = raw.match(/([\d.]+)\s*inches/i);
  return match ? parseFloat(match[1]) : null;
}

function parseWeight(raw?: string): number | null {
  if (!raw) return null;
  // e.g. "168 g (5.93 oz)"
  const match = raw.match(/(\d+)\s*g/i);
  return match ? parseInt(match[1], 10) : null;
}

function parseMaxRam(raw?: string): number | null {
  if (!raw) return null;
  // e.g. "128GB 4GB RAM, 256GB 6GB RAM"
  const matches = [...raw.matchAll(/(\d+)\s*GB\s*RAM/ig)];
  if (matches.length === 0) {
      return null;
  }
  const rams = matches.map(m => parseInt(m[1], 10));
  return Math.max(...rams);
}

function parseMaxStorage(raw?: string): number | null {
  if (!raw) return null;
  // Storage is typically expressed in GB or TB.
  // Because storage is always >= RAM on a device, taking the absolute max GB/TB
  // found in the string is a reliable heuristic to find max storage.
  const matches = [...raw.matchAll(/(\d+)\s*(GB|TB)/ig)];
  if (matches.length === 0) return null;
  
  let maxStorage = 0;
  for (const m of matches) {
      const val = parseInt(m[1], 10);
      const unit = m[2].toUpperCase();
      const storageInGb = unit === 'TB' ? val * 1024 : val;
      
      if (storageInGb > maxStorage) {
          maxStorage = storageInGb;
      }
  }
  
  return maxStorage > 0 ? maxStorage : null;
}
