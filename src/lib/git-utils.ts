import { execSync } from "child_process";
import fs from "fs";
import path from "path";

/**
 * Configuration for the "new/updated" badge feature
 */
export const BADGE_CONFIG = {
  /** Days since creation to show "New" badge */
  newThresholdDays: 14,
  /** Days since update to show "Updated" glow */
  updatedThresholdDays: 7,
} as const;

/**
 * Badge status for a file
 */
export interface BadgeStatus {
  isRecentlyCreated: boolean;
  isRecentlyUpdated: boolean;
  createdDate: Date | null;
  modifiedDate: Date | null;
}

/**
 * Cache structure stored in .next/cache/git-badge-cache.json
 */
interface CacheData {
  generatedAt: string;
  entries: Record<
    string,
    {
      isRecentlyCreated: boolean;
      isRecentlyUpdated: boolean;
      createdDate: string | null;
      modifiedDate: string | null;
    }
  >;
}

const CACHE_PATH = path.join(process.cwd(), ".next/cache/git-badge-cache.json");
let badgeCache: CacheData | null = null;

/**
 * Load the badge cache from disk (cached in memory after first load)
 */
function loadBadgeCache(): CacheData | null {
  if (badgeCache !== null) return badgeCache;

  try {
    const raw = fs.readFileSync(CACHE_PATH, "utf-8");
    badgeCache = JSON.parse(raw) as CacheData;
    return badgeCache;
  } catch {
    // Cache doesn't exist yet - will be generated on next dev/build
    return null;
  }
}

/**
 * Get badge status from cache (instant) - falls back to live git if cache unavailable
 */
export function getFileBadgeStatusCached(filePath: string): BadgeStatus {
  const cache = loadBadgeCache();
  const key = path.relative(process.cwd(), filePath).replace(/\\/g, "/");

  if (cache?.entries[key]) {
    const entry = cache.entries[key];
    return {
      isRecentlyCreated: entry.isRecentlyCreated,
      isRecentlyUpdated: entry.isRecentlyUpdated,
      createdDate: entry.createdDate ? new Date(entry.createdDate) : null,
      modifiedDate: entry.modifiedDate ? new Date(entry.modifiedDate) : null,
    };
  }

  // Fallback to live git (slow but ensures correctness for uncached files)
  return getFileBadgeStatus(filePath);
}

/**
 * Get the first commit date for a file (when it was created)
 */
export function getFileCreatedDate(filePath: string): Date | null {
  try {
    const absolutePath = path.resolve(filePath);
    // Get the first commit date (oldest) for this file
    const result = execSync(
      `git log --follow --format=%aI --diff-filter=A -- "${absolutePath}"`,
      { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }
    ).trim();

    if (result) {
      // Take the last line (oldest commit)
      const lines = result.split("\n").filter(Boolean);
      const oldestDate = lines[lines.length - 1];
      return new Date(oldestDate);
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Get the last modified date for a file from git history
 */
export function getFileLastModifiedDate(filePath: string): Date | null {
  try {
    const absolutePath = path.resolve(filePath);
    // Get the most recent commit date for this file
    const result = execSync(`git log -1 --format=%aI -- "${absolutePath}"`, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();

    if (result) {
      return new Date(result);
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Check if a date is within N days from now
 */
export function isWithinDays(date: Date | null, days: number): boolean {
  if (!date) return false;
  const now = new Date();
  const threshold = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  return date > threshold;
}

/**
 * Determine the badge status for a file based on git history
 */
export function getFileBadgeStatus(filePath: string): {
  isRecentlyCreated: boolean;
  isRecentlyUpdated: boolean;
  createdDate: Date | null;
  modifiedDate: Date | null;
} {
  const createdDate = getFileCreatedDate(filePath);
  const modifiedDate = getFileLastModifiedDate(filePath);

  const isRecentlyCreated = isWithinDays(
    createdDate,
    BADGE_CONFIG.newThresholdDays
  );

  // Only show "updated" if it's not also "new" (to avoid double badge)
  // and if the file was modified after creation
  const isRecentlyUpdated =
    !isRecentlyCreated &&
    isWithinDays(modifiedDate, BADGE_CONFIG.updatedThresholdDays) &&
    createdDate !== null &&
    modifiedDate !== null &&
    modifiedDate.getTime() > createdDate.getTime();

  return {
    isRecentlyCreated,
    isRecentlyUpdated,
    createdDate,
    modifiedDate,
  };
}
