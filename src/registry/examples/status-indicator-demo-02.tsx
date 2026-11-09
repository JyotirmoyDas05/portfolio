"use client";

import { TbCreditCard } from "react-icons/tb";

import { cn } from "@/lib/utils";
import type { StatusButtonColor } from "@/registry/status-button/status-button";
import { showStatusIndicator } from "@/registry/status-indicator/status-indicator";

const colors: { value: StatusButtonColor; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
  { value: "success", label: "Success" },
  { value: "warning", label: "Warning" },
  { value: "danger", label: "Danger" },
];

const colorClasses: Record<StatusButtonColor, string> = {
  default: "border-gray-300 bg-gray-100 text-gray-700",
  primary: "border-blue-300 bg-blue-100 text-blue-700",
  secondary: "border-purple-300 bg-purple-100 text-purple-700",
  success: "border-green-300 bg-green-100 text-green-700",
  warning: "border-amber-300 bg-amber-100 text-amber-700",
  danger: "border-rose-300 bg-rose-100 text-rose-700",
};

/**
 * Color Variants Demo
 * Shows all 6 color presets
 */
export default function StatusIndicatorDemo02() {
  const triggerWithColor = (color: StatusButtonColor) => {
    showStatusIndicator({
      icon: <TbCreditCard strokeWidth={2.5} className="size-5" />,
      label: `${color.charAt(0).toUpperCase() + color.slice(1)} Color`,
      text: {
        loading: "Processing...",
        success: "Success!",
        error: "Failed!",
      },
      color,
      simulationDuration: 1500,
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <p className="text-sm text-muted-foreground">Click to see each color</p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {colors.map((item) => (
          <button
            key={item.value}
            onClick={() => triggerWithColor(item.value)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors active:scale-95",
              colorClasses[item.value]
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
