/**
 * Script to generate LQIP (Low Quality Image Placeholder) blur data URLs
 * for all blog images and cache them for build-time use.
 *
 * Run with: bun run scripts/generate-blur-placeholders.ts
 */

import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { getPlaiceholder } from "plaiceholder";

const CONTENT_DIR = path.join(process.cwd(), "src/features/blog/content");
const CACHE_FILE = path.join(
  process.cwd(),
  "src/features/blog/data/blur-cache.json"
);

type BlurCache = Record<string, string>;

async function getBlurDataURL(imageUrl: string): Promise<string | undefined> {
  try {
    console.log(`  Fetching: ${imageUrl}`);
    const res = await fetch(imageUrl);
    if (!res.ok) {
      console.log(`  ❌ Failed to fetch: ${res.status}`);
      return undefined;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    const { base64 } = await getPlaiceholder(buffer, { size: 10 });
    console.log(`  ✅ Generated blur placeholder`);
    return base64;
  } catch (error) {
    console.log(`  ❌ Error: ${error}`);
    return undefined;
  }
}

async function main() {
  console.log("🎨 Generating blur placeholders for blog images...\n");

  const mdxFiles = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"));
  const cache: BlurCache = {};

  // Load existing cache if available
  if (fs.existsSync(CACHE_FILE)) {
    const existing = JSON.parse(
      fs.readFileSync(CACHE_FILE, "utf-8")
    ) as BlurCache;
    Object.assign(cache, existing);
    console.log(`📦 Loaded ${Object.keys(existing).length} cached entries\n`);
  }

  for (const file of mdxFiles) {
    const filePath = path.join(CONTENT_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(content);

    if (data.image && !cache[data.image]) {
      console.log(`📷 Processing: ${file}`);
      const blur = await getBlurDataURL(data.image);
      if (blur) {
        cache[data.image] = blur;
      }
    } else if (data.image && cache[data.image]) {
      console.log(`⏭️  Skipped (cached): ${file}`);
    }
  }

  // Save cache
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  console.log(
    `\n✨ Done! Cached ${Object.keys(cache).length} blur placeholders.`
  );
}

main().catch(console.error);
