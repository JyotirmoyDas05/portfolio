"use client";

import { motion } from "motion/react";
import { useCallback,useEffect, useState } from "react";
import { TbPlus } from "react-icons/tb";

import { cn } from "@/lib/utils";
import {
  StatusButton,
  type StatusButtonVariant,
} from "@/registry/status-button";

// =============================================================================
// Demo Data
// =============================================================================

interface TabItem {
  name: string;
  value: StatusButtonVariant | undefined;
}

const TABS: TabItem[] = [
  { name: "Normal", value: undefined },
  { name: "Loading", value: "loading" },
  { name: "Success", value: "success" },
  { name: "Error", value: "error" },
];

// =============================================================================
// Demo Component
// =============================================================================

export default function StatusButtonDemo() {
  const [tab, setTab] = useState(TABS[0]);

  const handleNext = useCallback(() => {
    setTab((prev) => {
      const currentIndex = TABS.findIndex((t) => t.value === prev.value);
      const nextIndex = (currentIndex + 1) % TABS.length;
      return TABS[nextIndex];
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <StatusButton
        icon={<TbPlus strokeWidth={3.2} className="size-5" />}
        variant={tab.value}
        onClick={handleNext}
        text={{
          loading: "Processing...",
          success: "Complete",
          error: "Failed",
        }}
      >
        Submit
      </StatusButton>

      <div className="flex items-center justify-center gap-3 text-black/60">
        {TABS.map((i) => (
          <button
            onClick={() => setTab(i)}
            className={cn(
              "relative flex flex-1 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold transition-colors",
              tab.value === i.value && "bg-gray-200"
            )}
            key={i.name}
          >
            {tab.value === i.value && (
              <motion.div
                className="absolute inset-0 bg-white/15 mix-blend-difference"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 5 }}
              />
            )}
            <span>{i.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
