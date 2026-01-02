"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { SmearCursor } from "./SmearCursor";

interface TocItem {
  url: string;
  title: ReactNode;
  depth: number;
}

interface TocTreeItem {
  id: string;
  text: string;
  depth: number;
  children: TocTreeItem[];
}

interface ArticleTocProps {
  /** TOC items from fumadocs-core */
  items: TocItem[];
  /** Additional className for the container */
  className?: string;
  /** Hide threshold for top/bottom (0-0.5, default 0.05) */
  hideThreshold?: number;
}

/**
 * Convert ReactNode to string for display
 */
function nodeToString(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node))
    return node.map((n) => nodeToString(n as ReactNode)).join("");
  if (node && typeof node === "object" && "props" in node) {
    const element = node as { props?: { children?: ReactNode } };
    return nodeToString(element.props?.children);
  }
  return "";
}

/**
 * Convert flat TOC items to tree structure
 */
function buildTree(items: TocItem[]): TocTreeItem[] {
  const tree: TocTreeItem[] = [];
  let currentH2: TocTreeItem | null = null;

  items.forEach((item) => {
    const id = item.url.replace("#", "");
    const treeItem: TocTreeItem = {
      id,
      text: nodeToString(item.title),
      depth: item.depth,
      children: [],
    };

    if (item.depth === 2) {
      tree.push(treeItem);
      currentH2 = treeItem;
    } else if (item.depth === 3 && currentH2) {
      currentH2.children.push(treeItem);
    } else {
      tree.push(treeItem);
    }
  });

  return tree;
}

/**
 * Hook to track active heading based on scroll position
 */
function useActiveHeading(items: TocItem[]) {
  const [activeId, setActiveId] = useState<string | null>(() => {
    const firstItem = items[0];
    return firstItem ? firstItem.url.replace("#", "") : null;
  });

  useEffect(() => {
    if (items.length === 0) return;

    const handleScroll = () => {
      // Find which heading is currently at the top of viewport
      const headingElements = items
        .map((item) => {
          const id = item.url.replace("#", "");
          return { id, element: document.getElementById(id) };
        })
        .filter((h) => h.element !== null);

      if (headingElements.length === 0) return;

      // Calculate the threshold (30% from top of viewport)
      const scrollThreshold = window.innerHeight * 0.3;

      // Find the heading that is closest to and above the threshold
      let activeHeading = headingElements[0];

      for (const heading of headingElements) {
        if (!heading.element) continue;
        const rect = heading.element.getBoundingClientRect();

        // If this heading is above the threshold, it could be the active one
        if (rect.top <= scrollThreshold) {
          activeHeading = heading;
        } else {
          // Since headings are in order, once we find one below threshold, stop
          break;
        }
      }

      if (activeHeading && activeHeading.id) {
        setActiveId(activeHeading.id);
      }
    };

    // Run once on mount
    handleScroll();

    // Listen to scroll events with throttle
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });
    return () => window.removeEventListener("scroll", scrollListener);
  }, [items]);

  return activeId;
}

/**
 * Animated Table of Contents for articles
 */
export function ArticleToc({
  items,
  className,
  hideThreshold = 0.05,
}: ArticleTocProps) {
  const tree = buildTree(items);
  const activeId = useActiveHeading(items);

  const containerRef = useRef<HTMLDivElement>(null);
  const [labelRefs] = useState(() => new Map<string, HTMLSpanElement | null>());

  // Scroll progress based on document
  const { scrollYProgress } = useScroll();

  // Progress bar height
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Visibility based on scroll position
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const visible = value > hideThreshold && value < 1 - hideThreshold;
      setIsVisible(visible);
    });
    return () => unsubscribe();
  }, [scrollYProgress, hideThreshold]);

  // Click to scroll handler
  const handleClick = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Store ref for label
  const setLabelRef = useCallback(
    (id: string, element: HTMLSpanElement | null) => {
      labelRefs.set(id, element);
    },
    [labelRefs]
  );

  if (tree.length === 0) return null;

  return (
    <motion.nav
      ref={containerRef}
      className={cn(
        "hidden xl:block",
        "fixed top-24 right-8",
        "max-h-[calc(100vh-8rem)] w-56",
        className
      )}
      initial={{ opacity: 0, x: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : 20,
        pointerEvents: isVisible ? "auto" : "none",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      aria-label="Table of contents"
    >
      <div className="flex gap-3">
        {/* Progress bar */}
        <div className="relative flex w-1 shrink-0">
          <div className="absolute inset-0 w-full rounded-full bg-border/50" />
          <motion.div
            className="absolute top-0 left-0 w-full rounded-full bg-accent"
            style={{ height: progressHeight }}
          />
        </div>

        {/* TOC list */}
        <div className="relative flex-1 py-1">
          <SmearCursor
            containerRef={containerRef}
            activeId={activeId}
            labelRefsMap={labelRefs}
          />

          <ul className="flex flex-col gap-1">
            {tree.map((item) => (
              <TocItemComponent
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

interface TocItemComponentProps {
  item: TocTreeItem;
  activeId: string | null;
  onClick: (id: string) => void;
  setLabelRef: (id: string, element: HTMLSpanElement | null) => void;
  depth?: number;
}

function TocItemComponent({
  item,
  activeId,
  onClick,
  setLabelRef,
  depth = 0,
}: TocItemComponentProps) {
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
        style={{ marginLeft: depth * 12 }}
      >
        <span ref={(el) => setLabelRef(item.id, el)} className="line-clamp-2">
          {item.text}
        </span>
      </button>

      {hasChildren && (
        <ul className="flex flex-col gap-0.5">
          {item.children.map((child) => (
            <TocItemComponent
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
