"use client";

import { useEffect, useState } from "react";

import type { TocHeading } from "./useTocHeadings";

/**
 * Hook to track which heading is currently active based on scroll position
 */
export function useActiveHeading(headings: TocHeading[]) {
  // Initialize with first heading if available
  const [activeId, setActiveId] = useState<string | null>(() => {
    return headings[0]?.id ?? null;
  });

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry
        const intersecting = entries.filter((entry) => entry.isIntersecting);

        if (intersecting.length > 0) {
          // Sort by position in document and take the topmost
          const sorted = intersecting.sort((a, b) => {
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });

          const topEntry = sorted[0];
          if (topEntry) {
            setActiveId(topEntry.target.id);
          }
        }
      },
      {
        // Observe when heading enters top 30% of viewport
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    );

    // Observe all headings
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings, activeId]);

  return activeId;
}
