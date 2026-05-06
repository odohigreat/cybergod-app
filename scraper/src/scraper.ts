import * as scrapingbee from 'scrapingbee';
import * as cheerio from 'cheerio';
import pLimit from 'p-limit';
import * as dotenv from 'dotenv';
import { enqueueUrl, dequeueUrl, ackUrl, savePhoneData, redis } from './pipeline';
import { PhoneSpecSchema, PhoneSpec } from './schema';

dotenv.config(); // loads .env from the current directory

const SCRAPINGBEE_API_KEY = process.env.SCRAPINGBEE_API_KEY || '';
const MAX_CONCURRENT_PAGES = parseInt(process.env.MAX_CONCURRENT_PAGES || '3', 10);
const DELAY_BETWEEN_REQUESTS_MS = parseInt(process.env.DELAY_BETWEEN_REQUESTS_MS || '2000', 10);
const YEAR_MIN = parseInt(process.env.YEAR_MIN || '2021', 10);

const BASE_URL = 'https://www.gsmarena.com';

/**
 * Utility: Randomized Wait (Jitter)
 */
async function waitWithJitter(baseDelay = DELAY_BETWEEN_REQUESTS_MS) {
  const ms = Math.floor(baseDelay + Math.random() * 500);
  await new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetches HTML using ScrapingBee API
 */
async function fetchHtmlWithScrapingBee(url: string): Promise<string> {
  if (!SCRAPINGBEE_API_KEY) {
    throw new Error('SCRAPINGBEE_API_KEY is not set in environment variables');
  }

  const client = new scrapingbee.ScrapingBeeClient(SCRAPINGBEE_API_KEY);
  let response = await client.get({
    url: url,
    params: {
      render_js: false, // Keep false for speed, only true if content is missing
      premium_proxy: true, // Use this for GSMArena search pages
    },
  });

  // Depending on the SDK version, response.data can be a Buffer/ArrayBuffer or a string
  if (typeof response.data === 'string') {
    return response.data;
  }
  return new TextDecoder().decode(response.data as ArrayBuffer);
}

/**
 * LEVEL 1: THE WATCHER
 * Scans search results from YEAR_MIN to 2026 for phone URLs.
 */
export async function runWatcher() {
  console.log(`[Watcher] Starting scan for devices from ${YEAR_MIN} to 2026...`);
  
  // Basic pagination logic over the GSMArena search results
  let pageNumber = 1;
  let hasMorePages = true;

  try {
    while (hasMorePages) {
      const searchUrl = `${BASE_URL}/results.php3?nYearMin=${YEAR_MIN}&nYearMax=2026&sPage=${pageNumber}`;
      console.log(`[Watcher] Scanning page ${pageNumber}: ${searchUrl}`);
      
      const html = await fetchHtmlWithScrapingBee(searchUrl);
      const $ = cheerio.load(html);
      
      const phoneLinks: string[] = [];
      
      $('.makers ul li a').each((_, el) => {
        const href = $(el).attr('href');
        if (href && href.includes('.php')) {
          phoneLinks.push(`${BASE_URL}/${href}`);
        }
      });

      console.log(`[Watcher] Found ${phoneLinks.length} phones on page ${pageNumber}.`);

      if (phoneLinks.length === 0) {
        hasMorePages = false;
        break;
      }

      for (const link of phoneLinks) {
        await enqueueUrl(link);
      }

      // Check if there is a 'Next' button
      const nextBtn = $('a.pages-next').attr('href');
      if (!nextBtn || nextBtn === '#') {
        hasMorePages = false;
      } else {
        pageNumber++;
        await waitWithJitter();
      }
    }
    
    console.log('[Watcher] Scan completed successfully.');

  } catch (err) {
    console.error('[Watcher] Error during execution:', err);
  }
}

/**
 * Extraction Logic Using Robust Text-based Sibling Selectors with Cheerio
 */
async function extractPhoneSpecs(html: string, url: string): Promise<PhoneSpec> {
  const $ = cheerio.load(html);
  
  // Grab name and brand
  const titleText = $('.specs-phone-name-title').text().trim() || '';
  const brand = titleText.split(' ')[0] || 'Unknown';
  const imageUrl = $('.specs-photo-main img').attr('src') || $('.specs-photo img').attr('src') || undefined;
  
  // Helper to extract text from a specific specification row using sibling selector
  const extractSpec = (label: string): string | undefined => {
    // Find td with class 'ttl' that contains the exact label text
    const $labelTd = $(`td.ttl:contains("${label}")`).first();
    if ($labelTd.length > 0) {
      // The sibling td with class 'nfo' holds the value
      const val = $labelTd.next('td.nfo').text().trim();
      return val || undefined;
    }
    return undefined;
  };

  const rawData = {
    url,
    name: titleText,
    brand,
    imageUrl,
    networkRaw: extractSpec('Technology'),
    launchAnnouncedRaw: extractSpec('Announced'),
    bodyDimensionsRaw: extractSpec('Dimensions'),
    bodyWeightRaw: extractSpec('Weight'),
    displayTypeRaw: extractSpec('Type'),
    displaySizeRaw: extractSpec('Size'),
    displayResolutionRaw: extractSpec('Resolution'),
    platformOSRaw: extractSpec('OS'),
    platformChipsetRaw: extractSpec('Chipset'),
    platformCPURaw: extractSpec('CPU'),
    memoryInternalRaw: extractSpec('Internal'),
    mainCameraRaw: extractSpec('Single') || extractSpec('Dual') || extractSpec('Triple') || extractSpec('Quad'),
    selfieCameraRaw: extractSpec('Single') || extractSpec('Dual'),
    batteryRaw: extractSpec('Type'), 
    featuresSensorsRaw: extractSpec('Sensors'),
    priceRaw: extractSpec('Price'),
  };

  // Validate output using Zod
  const parsed = PhoneSpecSchema.parse(rawData);
  return parsed;
}

/**
 * LEVEL 2: THE DETAILER
 * Pops URLs from Redis and fully scrapes them concurrently using ScrapingBee.
 */
export async function runDetailer() {
  console.log(`[Detailer] Starting worker pool with concurrency: ${MAX_CONCURRENT_PAGES}`);
  
  const limit = pLimit(MAX_CONCURRENT_PAGES);
  const activeTasks: Promise<void>[] = [];

  // Continuous pulling loop
  while (true) {
    // Throttle popping from Redis if we already have enough tasks queued
    if (limit.activeCount + limit.pendingCount >= MAX_CONCURRENT_PAGES * 2) {
      await new Promise(r => setTimeout(r, 1000));
      continue;
    }

    const url = await dequeueUrl();
    if (!url) {
      // If queue is empty, wait briefly before checking again
      await new Promise(r => setTimeout(r, 5000));
      continue;
    }

    limit(async () => {
      try {
        console.log(`[Detailer] Processing: ${url}`);
        
        const html = await fetchHtmlWithScrapingBee(url);
        const specs = await extractPhoneSpecs(html, url);
        await savePhoneData(specs);
        await ackUrl(url);

      } catch (err: any) {
        console.error(`[Detailer] Failed to process ${url}:`, err.message);
        // Put back into queue or move to Dead Letter Queue
        // await enqueueUrl(url);
      } finally {
        await waitWithJitter();
      }
    });
  }
}

// Entrypoint logic
if (require.main === module) {
  const mode = process.argv[2];
  if (mode === 'watcher') {
    runWatcher().then(() => process.exit(0));
  } else if (mode === 'detailer') {
    runDetailer();
  } else {
    console.log('Usage: npx ts-node src/scraper.ts [watcher|detailer]');
  }
}
