"use client";

import { useEffect, useState } from "react";

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface TocTreeItem {
  id: string;
  text: string;
  level: 2 | 3;
  children: TocTreeItem[];
}

/**
 * Hook to extract headings from article DOM and build a hierarchical tree
 */
export function useTocHeadings(
  articleRef: React.RefObject<HTMLElement | null>
) {
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [tree, setTree] = useState<TocTreeItem[]>([]);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    // Small delay to ensure content is rendered
    const timer = setTimeout(() => {
      const elements = article.querySelectorAll("h2, h3");
      const flatHeadings: TocHeading[] = [];

      elements.forEach((el) => {
        // Ensure element has an id
        if (!el.id) {
          const slug =
            el.textContent
              ?.toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "") || `heading-${flatHeadings.length}`;
          el.id = slug;
        }

        const level = el.tagName === "H2" ? 2 : 3;
        flatHeadings.push({
          id: el.id,
          text: el.textContent || "",
          level: level as 2 | 3,
        });
      });

      setHeadings(flatHeadings);

      // Build tree structure
      const treeStructure: TocTreeItem[] = [];
      let currentH2: TocTreeItem | null = null;

      flatHeadings.forEach((heading) => {
        const item: TocTreeItem = {
          id: heading.id,
          text: heading.text,
          level: heading.level,
          children: [],
        };

        if (heading.level === 2) {
          treeStructure.push(item);
          currentH2 = item;
        } else if (heading.level === 3 && currentH2) {
          currentH2.children.push(item);
        } else {
          // H3 without parent H2, add to root
          treeStructure.push(item);
        }
      });

      setTree(treeStructure);
    }, 100);

    return () => clearTimeout(timer);
  }, [articleRef]);

  return { headings, tree };
}
