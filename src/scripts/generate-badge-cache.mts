/**
 * Generate badge cache for all MDX files
 *
 * This script runs git commands once at build/dev startup,
 * caching the results so pages load instantly instead of
 * running 54+ git commands on every render.
 */

import fs from "fs";
import path from "path";

import { type BadgeStatus, getFileBadgeStatus } from "../lib/git-utils";

const CONTENT_DIR = path.join(process.cwd(), "src/features/blog/content");
// Store cache in committed location (like blur-cache.json) so it persists in production
const CACHE_PATH = path.join(
  process.cwd(),
  "src/features/blog/data/badge-cache.json"
);

interface CacheData {
  generatedAt: string;
  entries: Record<string, BadgeStatus>;
}

function generateCache() {
  console.log("🔄 Generating badge cache...");

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  const entries: Record<string, BadgeStatus> = {};

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const key = path.relative(process.cwd(), filePath).replace(/\\/g, "/");
    entries[key] = getFileBadgeStatus(filePath);
  }

  const cacheData: CacheData = {
    generatedAt: new Date().toISOString(),
    entries,
  };

  fs.writeFileSync(CACHE_PATH, JSON.stringify(cacheData, null, 2));
  console.log(`✅ Generated badge cache for ${files.length} files`);
}

generateCache();
