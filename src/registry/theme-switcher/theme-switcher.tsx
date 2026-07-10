"use client";

import { MonitorIcon, MoonIcon, MoonStarIcon, SunIcon } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import type { JSX } from "react";
import { useCallback, useRef, useSyncExternalStore } from "react";

import { useSound } from "@/hooks/use-sound";
import { useThemeTransition } from "@/hooks/use-theme-transition";
import { cn } from "@/lib/utils";

// =============================================================================
// Types
// =============================================================================

interface ThemeSwitcherProps {
  /**
   * The style variant of the switcher.
   * - `"tri-toggle"`: 3 options (System, Light, Dark) - default
   * - `"toggle"`: 2 options (Light/Dark toggle)
   */
  variant?: "toggle" | "tri-toggle";
  /**
   * Enable click sound on theme change for added immersion.
   */
  sound?: boolean;
}

// =============================================================================
// Sub-components
// =============================================================================

function ThemeOptionButton({
  icon,
  value,
  isActive,
  onClick,
}: {
  icon: JSX.Element;
  value: string;
  isActive?: boolean;
  onClick: (value: string, button: HTMLButtonElement) => void;
}) {
  return (
    <button
      className={cn(
        "relative flex size-8 cursor-default items-center justify-center rounded-full transition-[color] [&_svg]:size-4",
        isActive
          ? "text-zinc-950 dark:text-zinc-50"
          : "text-zinc-400 hover:text-zinc-950 dark:text-zinc-500 dark:hover:text-zinc-50"
      )}
      role="radio"
      aria-checked={isActive}
      aria-label={`Switch to ${value} theme`}
      onClick={(e) => onClick(value, e.currentTarget)}
    >
      {icon}
      {isActive && (
        <motion.div
          layoutId="theme-option"
          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
          className="absolute inset-0 rounded-full border border-zinc-200 dark:border-zinc-700"
        />
      )}
    </button>
  );
}

// =============================================================================
// Constants
// =============================================================================

const TRI_TOGGLE_OPTIONS = [
  { icon: <MonitorIcon />, value: "system" },
  { icon: <SunIcon />, value: "light" },
  { icon: <MoonStarIcon />, value: "dark" },
];

// =============================================================================
// Main Component
// =============================================================================

function ThemeSwitcher({
  variant = "tri-toggle",
  sound = false,
}: ThemeSwitcherProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const triggerTransition = useThemeTransition(buttonRef);
  const playClick = useSound("/audio/ui-sounds/click.wav");

  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const handleThemeChange = useCallback(
    (value: string, button: HTMLButtonElement) => {
      (buttonRef as React.MutableRefObject<HTMLButtonElement | null>).current =
        button;

      if (sound) playClick(0.5);

      triggerTransition(() => {
        setTheme(value);
      });
    },
    [sound, playClick, triggerTransition, setTheme]
  );

  const handleToggle = useCallback(
    (button: HTMLButtonElement) => {
      (buttonRef as React.MutableRefObject<HTMLButtonElement | null>).current =
        button;

      if (sound) playClick(0.5);

      triggerTransition(() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      });
    },
    [sound, playClick, triggerTransition, setTheme, resolvedTheme]
  );

  if (!isMounted) {
    return (
      <div
        className={cn("flex h-8", variant === "tri-toggle" ? "w-24" : "w-8")}
      />
    );
  }

  // Toggle variant (simple light/dark)
  if (variant === "toggle") {
    const isDark = resolvedTheme === "dark";
    return (
      <motion.button
        ref={buttonRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="inline-flex size-8 cursor-default items-center justify-center rounded-full bg-white text-zinc-950 ring-1 ring-zinc-200 transition-colors ring-inset dark:bg-zinc-950 dark:text-zinc-50 dark:ring-zinc-700 [&_svg]:size-4"
        onClick={(e) => handleToggle(e.currentTarget)}
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </motion.button>
    );
  }

  // Tri-toggle variant (system/light/dark)
  return (
    <motion.div
      key={String(isMounted)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="inline-flex items-center overflow-hidden rounded-full bg-white ring-1 ring-zinc-200 ring-inset dark:bg-zinc-950 dark:ring-zinc-700"
      role="radiogroup"
    >
      {TRI_TOGGLE_OPTIONS.map((option) => (
        <ThemeOptionButton
          key={option.value}
          icon={option.icon}
          value={option.value}
          isActive={theme === option.value}
          onClick={handleThemeChange}
        />
      ))}
    </motion.div>
  );
}

export type { ThemeSwitcherProps };
export { ThemeSwitcher };
