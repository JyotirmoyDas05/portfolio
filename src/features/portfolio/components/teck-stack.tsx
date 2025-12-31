"use client";

import Image from "next/image";
import { useMemo } from "react";

import {
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/base/ui/tooltip";
import { cn } from "@/lib/utils";

import { TECH_STACK } from "../data/tech-stack";
import type { TechStack } from "../types/tech-stack";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

// Define category order for consistent display
const CATEGORY_ORDER = [
  "Language",
  "Runtime Environment",
  "Framework",
  "Library",
  "State Management",
  "Database",
  "Version Control",
  "Containerization",
  "Tools",
];

type GroupedTech = {
  category: string;
  items: TechStack[];
};

function groupByCategory(techStack: TechStack[]): GroupedTech[] {
  const categoryMap = new Map<string, TechStack[]>();

  // Group by primary category (first category in array)
  for (const tech of techStack) {
    const primaryCategory = tech.categories[0] || "Other";
    if (!categoryMap.has(primaryCategory)) {
      categoryMap.set(primaryCategory, []);
    }
    categoryMap.get(primaryCategory)!.push(tech);
  }

  // Sort categories by predefined order, unknown categories at end
  return Array.from(categoryMap.entries())
    .sort(([a], [b]) => {
      const indexA = CATEGORY_ORDER.indexOf(a);
      const indexB = CATEGORY_ORDER.indexOf(b);
      if (indexA === -1 && indexB === -1) return a.localeCompare(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    })
    .map(([category, items]) => ({ category, items }));
}

export function TeckStack() {
  const groupedTech = useMemo(() => groupByCategory(TECH_STACK), []);

  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>Stack</PanelTitle>
      </PanelHeader>

      <PanelContent
        className={cn(
          "[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5",
          "bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center",
          "bg-zinc-950/0.75 dark:bg-white/0.75"
        )}
      >
        <TooltipProvider>
          <div className="columns-1 gap-6 space-y-3 sm:columns-2">
            {groupedTech.map(({ category, items }) => (
              <div key={category} className="break-inside-avoid">
                {/* Category Label */}
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="text-xs font-medium tracking-wider whitespace-nowrap text-muted-foreground/70 uppercase">
                    {category}
                  </span>
                  <div className="h-px flex-1 bg-edge/50" />
                </div>

                {/* Tech Items */}
                <ul className="flex flex-wrap gap-3 select-none">
                  {items.map((tech) => (
                    <li key={tech.key} className="flex">
                      <TooltipRoot>
                        <TooltipTrigger
                          render={
                            <a
                              href={tech.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={tech.title}
                            />
                          }
                        >
                          {tech.theme ? (
                            <>
                              <Image
                                src={`https://assets.jyotimoydas.in/images/tech-stack-icons/${tech.key}-light.svg`}
                                alt={`${tech.title} light icon`}
                                width={32}
                                height={32}
                                className="hidden [html.light_&]:block"
                                unoptimized
                              />
                              <Image
                                src={`https://assets.jyotimoydas.in/images/tech-stack-icons/${tech.key}-dark.svg`}
                                alt={`${tech.title} dark icon`}
                                width={32}
                                height={32}
                                className="hidden [html.dark_&]:block"
                                unoptimized
                              />
                            </>
                          ) : (
                            <Image
                              src={`https://assets.jyotimoydas.in/images/tech-stack-icons/${tech.key}.svg`}
                              alt={`${tech.title} icon`}
                              width={32}
                              height={32}
                              unoptimized
                            />
                          )}
                        </TooltipTrigger>

                        <TooltipContent>
                          <p>{tech.title}</p>
                        </TooltipContent>
                      </TooltipRoot>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </TooltipProvider>
      </PanelContent>
    </Panel>
  );
}
