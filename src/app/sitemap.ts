import type { MetadataRoute } from "next";

import { SITE_INFO } from "@/config/site";
import { getAllPosts, getPostsByCategory } from "@/features/blog/data/posts";

const latest = (posts: ReturnType<typeof getAllPosts>) =>
  new Date(
    Math.max(...posts.map((p) => new Date(p.metadata.updatedAt).getTime()))
  ).toISOString();

export default function sitemap(): MetadataRoute.Sitemap {
  const allPosts = getAllPosts();
  const componentPosts = getPostsByCategory("components");

  // Component posts are canonical under /components, so list them there only.
  const blogPosts = allPosts.filter(
    (post) => post.metadata.category !== "components"
  );

  const toEntry = (base: string) => (post: (typeof allPosts)[number]) => ({
    url: `${SITE_INFO.url}${base}/${post.slug}`,
    lastModified: new Date(post.metadata.updatedAt).toISOString(),
  });

  const routes = [
    { url: SITE_INFO.url, lastModified: latest(allPosts) },
    { url: `${SITE_INFO.url}/blog`, lastModified: latest(blogPosts) },
    {
      url: `${SITE_INFO.url}/components`,
      lastModified: latest(componentPosts),
    },
  ];

  return [
    ...routes,
    ...blogPosts.map(toEntry("/blog")),
    ...componentPosts.map(toEntry("/components")),
  ];
}
