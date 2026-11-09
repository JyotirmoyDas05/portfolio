"use client";

import { TbSend } from "react-icons/tb";

import { cn } from "@/lib/utils";
import type { StatusButtonRadius } from "@/registry/status-button/status-button";
import { showStatusIndicator } from "@/registry/status-indicator/status-indicator";

const radiusOptions: { value: StatusButtonRadius; label: string }[] = [
  { value: "none", label: "None" },
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "full", label: "Full" },
];

/**
 * Radius Variants Demo
 * Shows all 5 border radius options
 */
export default function StatusIndicatorDemo03() {
  const triggerWithRadius = (radius: StatusButtonRadius) => {
    showStatusIndicator({
      icon: <TbSend strokeWidth={2.5} className="size-5" />,
      label: `Radius: ${radius}`,
      text: {
        loading: "Loading...",
        success: "Done!",
        error: "Error!",
      },
      radius,
      simulationDuration: 1500,
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <p className="text-sm text-muted-foreground">
        Click to see each border radius
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {radiusOptions.map((item) => (
          <button
            key={item.value}
            onClick={() => triggerWithRadius(item.value)}
            className={cn(
              "border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent active:scale-95",
              item.value === "none" && "rounded-none",
              item.value === "sm" && "rounded-lg",
              item.value === "md" && "rounded-xl",
              item.value === "lg" && "rounded-2xl",
              item.value === "full" && "rounded-full"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
