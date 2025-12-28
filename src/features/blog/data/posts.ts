import fs from "fs";
import matter from "gray-matter";
import path from "path";

import type { Post, PostMetadata } from "@/features/blog/types/post";
import { getFileBadgeStatusCached } from "@/lib/git-utils";

// Load blur placeholder cache for LQIP
type BlurCache = Record<string, string>;
let blurCache: BlurCache = {};
try {
  const cachePath = path.join(
    process.cwd(),
    "src/features/blog/data/blur-cache.json"
  );
  if (fs.existsSync(cachePath)) {
    blurCache = JSON.parse(fs.readFileSync(cachePath, "utf-8")) as BlurCache;
  }
} catch {
  // Ignore cache errors
}

function parseFrontmatter(fileContent: string) {
  const file = matter(fileContent);

  return {
    metadata: file.data as PostMetadata,
    content: file.content,
  };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);

  return mdxFiles.map<Post>((file) => {
    const filePath = path.join(dir, file);
    const { metadata, content } = readMDXFile(filePath);

    // Auto-detect badge status from cached git history (generated at startup)
    const badgeStatus = getFileBadgeStatusCached(filePath);

    const slug = path.basename(file, path.extname(file));

    return {
      metadata: {
        ...metadata,
        // Git-based auto-detection (can be overridden by manual `new: true`)
        isRecentlyCreated: badgeStatus.isRecentlyCreated,
        isRecentlyUpdated: badgeStatus.isRecentlyUpdated,
        // LQIP blur placeholder from cache
        blurDataURL: metadata.image ? blurCache[metadata.image] : undefined,
      },
      slug,
      content,
    };
  });
}

export function getAllPosts() {
  return getMDXData(path.join(process.cwd(), "src/features/blog/content")).sort(
    (a, b) => {
      if (a.metadata.pinned && !b.metadata.pinned) return -1;
      if (!a.metadata.pinned && b.metadata.pinned) return 1;

      return (
        new Date(b.metadata.createdAt).getTime() -
        new Date(a.metadata.createdAt).getTime()
      );
    }
  );
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostsByCategory(category: string) {
  return getAllPosts().filter((post) => post.metadata?.category === category);
}

export function findNeighbour(posts: Post[], slug: string) {
  const len = posts.length;

  for (let i = 0; i < len; ++i) {
    if (posts[i].slug === slug) {
      return {
        previous: i > 0 ? posts[i - 1] : null,
        next: i < len - 1 ? posts[i + 1] : null,
      };
    }
  }

  return { previous: null, next: null };
}
