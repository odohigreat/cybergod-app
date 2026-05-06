# GSMArena Hybrid Scraper

A high-performance, distributed scraper built with Playwright, TypeScript, Node.js, Redis, and PostgreSQL (via Drizzle ORM).

## Architecture
The system employs a "Hybrid" strategy with two tiers:
1. **Level 1 (The Watcher)**: A lightweight scanner that checks `gsmarena.com` (e.g. `brand.php3`, last 20 releases) to discover new or updated phone URLs and pushes them into a Redis queue.
2. **Level 2 (The Detailer)**: A concurrent, Playwright-driven worker pool that pops URLs from Redis, navigates to the specification pages, bypasses anti-bot measures using `puppeteer-extra-plugin-stealth`, and extracts data using robust sibling-based text selectors. 

Extracted data is validated using Zod schemas and inserted into PostgreSQL, updating a `search_vector` column to instantly allow search engines to index the data.

## Setup Instructions

### 1. Requirements
- Node.js (v18+)
- Redis instance (for queueing)
- PostgreSQL instance (for storage)

### 2. Installation
Navigate into the `scraper` directory and install dependencies:
```bash
cd scraper
npm install
npx playwright install chromium
```

### 3. Environment Variables
Create a `.env` file in the `scraper` folder (or set these in your environment):
```env
REDIS_URL=redis://localhost:6379
DATABASE_URL=postgres://user:password@localhost:5432/yourdb
```

### 4. Database Initialization
To generate and run Drizzle migrations, you can add Drizzle scripts to `package.json`. However, for immediate setup you can rely on the ORM's sync features or run Drizzle-Kit commands:
```bash
npx drizzle-kit generate:pg
npx drizzle-kit push:pg
```

## Running the Scraper

### Watcher (Level 1)
Run the watcher to populate the Redis queue:
```bash
npx ts-node src/scraper.ts watcher
```

### Detailer (Level 2)
Run the detailer worker to process the queue:
```bash
npx ts-node src/scraper.ts detailer
```

## Configuring Proxy Rotation
Currently, the `runDetailer` function in `src/scraper.ts` accepts a placeholder for proxies. To enable proxy rotation (e.g., using a service like BrightData, Smartproxy, or Oxylabs):

1. Gather your proxy endpoints.
2. Update the `browser = await chromium.launch(...)` call in `src/scraper.ts` to include the proxy:
```typescript
const browser = await chromium.launch({
  headless: true,
  proxy: {
    server: 'http://username:password@pr.oxylabs.io:7777', // Rotating proxy endpoint
  }
});
```
*Note: Using a rotating proxy provider is highly recommended to naturally distribute requests across different IPs without needing to maintain your own proxy list pool.*

## Cron Job Configuration
To run this in production, you should set up `cron` jobs to automate the watcher and ensure the detailer runs as a background daemon.

### Watcher Cron (Runs every hour)
Edit your crontab using `crontab -e`:
```bash
0 * * * * cd /path/to/scraper && /usr/bin/npx ts-node src/scraper.ts watcher >> /var/log/gsm_watcher.log 2>&1
```

### Detailer Daemon
The Detailer is designed as a continuous worker (`while (true)` loop). Instead of a cron job, it's recommended to run it using a process manager like `pm2`:
```bash
npm install -g pm2
pm2 start "npx ts-node src/scraper.ts detailer" --name "gsm-detailer"
```

## Data Schema
Data is validated using Zod. Raw strings (e.g. "5000 mAh") are saved alongside a `processedData` JSON placeholder which a subsequent Python service can update. 
A PostgreSQL trigger or the application logic handles compiling the `name` and `brand` into the `search_vector` for immediate indexing.
