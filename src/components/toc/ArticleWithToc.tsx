"use client";

import { useRef } from "react";

import { TableOfContents } from "@/components/toc";
import { cn } from "@/lib/utils";

interface ArticleWithTocProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper component that provides article content with a sticky TOC on the right
 */
export function ArticleWithToc({ children, className }: ArticleWithTocProps) {
  const articleRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative flex gap-8">
      {/* Main article content */}
      <article ref={articleRef} className={cn("min-w-0 flex-1", className)}>
        {children}
      </article>

      {/* Sticky TOC sidebar - only visible on xl screens */}
      <aside className="hidden w-56 shrink-0 xl:block">
        <TableOfContents articleRef={articleRef} />
      </aside>
    </div>
  );
}
