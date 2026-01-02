"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { SmearCursor } from "./SmearCursor";
import { useActiveHeading } from "./useActiveHeading";
import { type TocTreeItem, useTocHeadings } from "./useTocHeadings";

interface TableOfContentsProps {
  /** Reference to the article element containing headings */
  articleRef: React.RefObject<HTMLElement | null>;
  /** Additional className for the container */
  className?: string;
  /** Hide threshold for top/bottom (0-0.5, default 0.05) */
  hideThreshold?: number;
}

export function TableOfContents({
  articleRef,
  className,
  hideThreshold = 0.05,
}: TableOfContentsProps) {
  const { headings, tree } = useTocHeadings(articleRef);
  const activeId = useActiveHeading(headings);

  const containerRef = useRef<HTMLDivElement>(null);
  const [labelRefs] = useState(() => new Map<string, HTMLSpanElement | null>());

  // Scroll progress
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"],
  });

  // Progress bar height
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Visibility based on scroll position
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      // Hide near top and bottom
      const visible = value > hideThreshold && value < 1 - hideThreshold;
      setIsVisible(visible);
    });

    return () => unsubscribe();
  }, [scrollYProgress, hideThreshold]);

  // Click to scroll handler
  const handleClick = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  // Store ref for label
  const setLabelRef = useCallback(
    (id: string, element: HTMLSpanElement | null) => {
      labelRefs.set(id, element);
    },
    [labelRefs]
  );

  // Don't render if no headings
  if (tree.length === 0) {
    return null;
  }

  return (
    <motion.nav
      ref={containerRef}
      className={cn(
        "relative hidden xl:block",
        "sticky top-24 self-start",
        "max-h-[calc(100vh-8rem)] overflow-y-auto",
        "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border",
        className
      )}
      initial={{ opacity: 0, x: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : 20,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      aria-label="Table of contents"
    >
      <div className="flex gap-3">
        {/* Progress bar */}
        <div className="relative flex w-1 shrink-0">
          {/* Track */}
          <div className="absolute inset-0 w-full rounded-full bg-border/50" />
          {/* Fill */}
          <motion.div
            className="absolute top-0 left-0 w-full rounded-full bg-accent"
            style={{ height: progressHeight }}
          />
        </div>

        {/* TOC list */}
        <div className="relative flex-1 py-1">
          {/* Smear cursor */}
          <SmearCursor
            containerRef={containerRef}
            activeId={activeId}
            labelRefsMap={labelRefs}
          />

          <ul className="flex flex-col gap-1">
            {tree.map((item) => (
              <TocItem
                key={item.id}
                item={item}
                activeId={activeId}
                onClick={handleClick}
                setLabelRef={setLabelRef}
              />
            ))}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}

interface TocItemProps {
  item: TocTreeItem;
  activeId: string | null;
  onClick: (id: string) => void;
  setLabelRef: (id: string, element: HTMLSpanElement | null) => void;
  depth?: number;
}

function TocItem({
  item,
  activeId,
  onClick,
  setLabelRef,
  depth = 0,
}: TocItemProps) {
  const isActive = activeId === item.id;
  const hasChildren = item.children.length > 0;

  return (
    <li className="flex flex-col">
      <button
        type="button"
        onClick={() => onClick(item.id)}
        className={cn(
          "group relative flex items-center text-left text-sm",
          "py-1 pr-4 transition-colors duration-200",
          "hover:text-foreground",
          isActive ? "font-medium text-foreground" : "text-muted-foreground",
          depth > 0 && "pl-3"
        )}
        style={{
          marginLeft: depth * 12,
        }}
      >
        {/* Active indicator dot */}
        {isActive && (
          <motion.span
            layoutId="active-indicator"
            className="absolute -left-2 size-1.5 rounded-full bg-accent"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}

        {/* Label text */}
        <span ref={(el) => setLabelRef(item.id, el)} className="line-clamp-2">
          {item.text}
        </span>
      </button>

      {/* Children (H3s under H2) */}
      {hasChildren && (
        <ul className="flex flex-col gap-0.5">
          {item.children.map((child) => (
            <TocItem
              key={child.id}
              item={child}
              activeId={activeId}
              onClick={onClick}
              setLabelRef={setLabelRef}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
