export type PostMetadata = {
  title: string;
  description: string;
  /**
   * Social/OG image URL for the post.
   * Use an absolute URL or a path under /public. Recommended size: 1200x630.
   */
  image?: string;
  /**
   * Base64 blur placeholder for the image (auto-generated at build time).
   */
  blurDataURL?: string;
  /**
   * Category identifier/slug used for filtering (see getPostsByCategory).
   */
  category?: string;
  /**
   * Custom icon name or a Lucide icon name.
   * Used to visually represent the post in lists or navigation.
   */
  icon?: string;
  /**
   * Manual flag to show a "New" badge/highlight in the UI.
   * If set to true, overrides automatic detection.
   */
  new?: boolean;
  /**
   * Auto-detected: true if the file was created within the threshold (e.g., 14 days).
   * Set automatically based on git history.
   */
  isRecentlyCreated?: boolean;
  /**
   * Auto-detected: true if the file was modified within the threshold (e.g., 7 days).
   * Only true if the file is not also "recently created".
   */
  isRecentlyUpdated?: boolean;
  /**
   * Flag to pin the post to the top of the list.
   */
  pinned?: boolean;
  /**
   * Post creation date as an ISO date string (e.g. YYYY-MM-DD). Used for sorting.
   */
  createdAt: string;
  /**
   * Last updated date as an ISO date string (e.g. YYYY-MM-DD).
   */
  updatedAt: string;
};

export type Post = {
  /** Parsed frontmatter metadata from the MDX file. */
  metadata: PostMetadata;
  /** Slug derived from the MDX filename (without extension). */
  slug: string;
  /** MDX content body without frontmatter. */
  content: string;
};
