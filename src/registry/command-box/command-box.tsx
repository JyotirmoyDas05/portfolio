"use client";

import { useCommandState } from "cmdk";
import type { LucideProps } from "lucide-react";
import { CornerDownLeftIcon } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useCallback, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type CommandLinkItem = {
  title: string;
  href: string;
  icon?: React.ComponentType<LucideProps>;
  iconImage?: string;
  keywords?: string[];
  openInNewTab?: boolean;
};

export type CommandActionItem = {
  title: string;
  icon?: React.ComponentType<LucideProps>;
  keywords?: string[];
  onSelect: () => void;
};

export type CommandKind = "command" | "page" | "link";

export interface CommandBoxProps {
  /** Whether the command box dialog is open */
  open: boolean;
  /** Callback when the open state changes */
  onOpenChange: (open: boolean) => void;
  /** Enable backdrop blur effect for focused view */
  backdropBlur?: boolean;
  /** Blur intensity (in pixels, default: 8) */
  blurIntensity?: number;
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Text shown when no results are found */
  emptyText?: string;
  /** Custom logo component for the footer (bottom-left) */
  footerLogo?: React.ReactNode;
  /** Image URL for the footer logo (alternative to footerLogo component) */
  footerLogoSrc?: string;
  /** Alt text for footer logo image */
  footerLogoAlt?: string;
  /** Size of the footer logo in pixels */
  footerLogoSize?: number;
  /** Additional class name for the dialog */
  className?: string;
  /** Children components (CommandBoxGroup, CommandBoxItem, etc.) */
  children: React.ReactNode;
}

export interface CommandBoxTriggerProps {
  /** Callback when the trigger is clicked */
  onClick?: () => void;
  /** Additional class name */
  className?: string;
}

export interface CommandBoxGroupProps {
  /** Group heading text */
  heading: string;
  /** Children items */
  children: React.ReactNode;
}

export interface CommandBoxItemProps {
  /** Keywords for search filtering */
  keywords?: string[];
  /** Callback when item is selected */
  onSelect?: () => void;
  /** Render as child element (for links) */
  asChild?: boolean;
  /** Children content */
  children: React.ReactNode;
}

export interface CommandBoxLinkGroupProps {
  /** Group heading text */
  heading: string;
  /** Link items to display */
  links: CommandLinkItem[];
  /** Fallback icon if link has no icon */
  fallbackIcon?: React.ComponentType<LucideProps>;
  /** Callback when a link is selected */
  onLinkSelect: (href: string, openInNewTab?: boolean) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Command Box Trigger Button
// ─────────────────────────────────────────────────────────────────────────────

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Kbd as KbdComponent, KbdGroup } from "@/components/ui/kbd";

/**
 * A search/command trigger button matching the site header style.
 * Shows ⌘K on macOS and Ctrl K on other platforms.
 */
export function CommandBoxTrigger({
  onClick,
  className,
}: CommandBoxTriggerProps) {
  return (
    <Button
      variant="secondary"
      className={cn(
        "h-8 gap-1.5 rounded-full border border-input bg-white px-2.5 text-muted-foreground shadow-xs select-none hover:bg-white dark:bg-input/30 dark:hover:bg-input/30",
        className
      )}
      onClick={onClick}
    >
      <Icons.search aria-hidden />

      <span className="font-sans text-sm/4 font-medium sm:hidden">Search</span>

      <KbdGroup className="hidden sm:in-[.os-macos_&]:flex">
        <KbdComponent className="w-5 min-w-5">⌘</KbdComponent>
        <KbdComponent className="w-5 min-w-5">K</KbdComponent>
      </KbdGroup>

      <KbdGroup className="hidden sm:not-[.os-macos_&]:flex">
        <KbdComponent>Ctrl</KbdComponent>
        <KbdComponent className="w-5 min-w-5">K</KbdComponent>
      </KbdGroup>
    </Button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Command Box Dialog
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A command box dialog with customizable footer logo.
 * Exact replica of the site header command menu.
 *
 * @example
 * ```tsx
 * <CommandBox
 *   open={open}
 *   onOpenChange={setOpen}
 *   footerLogoSrc="/my-logo.svg"
 *   footerLogoAlt="My App"
 * >
 *   <CommandBoxInput />
 *   <CommandBoxList>
 *     <CommandBoxGroup heading="Menu">
 *       <CommandBoxItem>Home</CommandBoxItem>
 *     </CommandBoxGroup>
 *   </CommandBoxList>
 * </CommandBox>
 * ```
 */
export function CommandBox({
  open,
  onOpenChange,
  backdropBlur = false,
  blurIntensity = 8,
  children,
}: CommandBoxProps) {
  return (
    <>
      {/* Backdrop blur overlay */}
      {backdropBlur && open && (
        <div
          className="fixed inset-0 z-50 bg-black/20 transition-opacity duration-200"
          style={{ backdropFilter: `blur(${blurIntensity}px)` }}
          onClick={() => onOpenChange(false)}
          aria-hidden
        />
      )}
      <CommandDialog open={open} onOpenChange={onOpenChange}>
        {children}
      </CommandDialog>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Command Box Sub-components
// ─────────────────────────────────────────────────────────────────────────────

export function CommandBoxInput({
  placeholder = "Type a command or search...",
  value,
  onValueChange,
  ...props
}: React.ComponentProps<typeof CommandInput>) {
  return (
    <CommandInput
      placeholder={placeholder}
      value={value}
      onValueChange={onValueChange}
      {...props}
    />
  );
}

export function CommandBoxList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandList>) {
  return (
    <CommandList
      className={cn(
        "min-h-80 supports-timeline-scroll:scroll-fade-effect-y",
        className
      )}
      {...props}
    >
      {children}
    </CommandList>
  );
}

export function CommandBoxEmpty({
  children = "No results found.",
  ...props
}: React.ComponentProps<typeof CommandEmpty>) {
  return <CommandEmpty {...props}>{children}</CommandEmpty>;
}

export function CommandBoxGroup({
  heading,
  children,
  ...props
}: CommandBoxGroupProps &
  Omit<React.ComponentProps<typeof CommandGroup>, "heading">) {
  return (
    <CommandGroup heading={heading} {...props}>
      {children}
    </CommandGroup>
  );
}

export function CommandBoxItem({
  keywords,
  onSelect,
  asChild,
  children,
  ...props
}: CommandBoxItemProps &
  Omit<React.ComponentProps<typeof CommandItem>, "onSelect">) {
  return (
    <CommandItem
      keywords={keywords}
      onSelect={onSelect}
      asChild={asChild}
      {...props}
    >
      {children}
    </CommandItem>
  );
}

export function CommandBoxSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return <Separator className={className} {...props} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Command Box Link Group (convenience component)
// ─────────────────────────────────────────────────────────────────────────────

export function CommandBoxLinkGroup({
  heading,
  links,
  fallbackIcon,
  onLinkSelect,
}: CommandBoxLinkGroupProps) {
  return (
    <CommandGroup heading={heading}>
      {links.map((link) => {
        const Icon = link?.icon ?? fallbackIcon ?? React.Fragment;
        return (
          <CommandItem
            key={link.href}
            keywords={link.keywords}
            onSelect={() => onLinkSelect(link.href, link.openInNewTab)}
          >
            {link?.iconImage ? (
              <Image
                className="rounded-sm corner-squircle supports-corner-shape:rounded-[50%]"
                src={link.iconImage}
                alt={link.title}
                width={16}
                height={16}
                unoptimized
              />
            ) : (
              <Icon />
            )}
            {link.title}
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Command Box Footer
// ─────────────────────────────────────────────────────────────────────────────

export interface CommandBoxFooterProps {
  /** Custom logo component (bottom-left) */
  logo?: React.ReactNode;
  /** Image URL for the logo (alternative to logo component) */
  logoSrc?: string;
  /** Alt text for logo image */
  logoAlt?: string;
  /** Size of the logo in pixels (for image) */
  logoSize?: number;
  /** Map of command titles to their kind (for dynamic action labels) */
  commandMetaMap?: Map<string, { commandKind: CommandKind }>;
  /** Custom action labels */
  actionLabels?: Record<CommandKind, string>;
}

const DEFAULT_ACTION_LABELS: Record<CommandKind, string> = {
  command: "Run Command",
  page: "Go to Page",
  link: "Open Link",
};

export function CommandBoxFooter({
  logo,
  logoSrc,
  logoAlt = "Logo",
  logoSize = 24,
  commandMetaMap = new Map(),
  actionLabels = DEFAULT_ACTION_LABELS,
}: CommandBoxFooterProps) {
  const selectedCommandKind = useCommandState(
    (state) => commandMetaMap.get(state.value)?.commandKind ?? "page"
  );

  const renderLogo = () => {
    if (logo) return logo;
    if (logoSrc) {
      return (
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={logoSize}
          height={logoSize}
          className="text-muted-foreground"
          unoptimized
        />
      );
    }
    return null;
  };

  return (
    <>
      <div className="flex h-10" />
      <div className="absolute inset-x-0 bottom-0 flex h-10 items-center justify-between gap-2 border-t bg-zinc-100/30 px-4 text-xs font-medium dark:bg-zinc-800/30">
        <div className="size-6">{renderLogo()}</div>
        <div className="flex shrink-0 items-center gap-2">
          <span>{actionLabels[selectedCommandKind]}</span>
          <Kbd>
            <CornerDownLeftIcon />
          </Kbd>
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-4"
          />
          <span className="text-muted-foreground">Exit</span>
          <Kbd>Esc</Kbd>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook: useCommandBox
// ─────────────────────────────────────────────────────────────────────────────

export interface UseCommandBoxOptions {
  /** Initial open state */
  defaultOpen?: boolean;
  /** Keyboard shortcut keys (default: "mod+k, slash") */
  hotkeys?: string;
  /** Callback when opened via keyboard */
  onKeyboardOpen?: (key: string) => void;
}

/**
 * Hook to manage command box state with keyboard shortcuts.
 *
 * @example
 * ```tsx
 * const { open, setOpen, toggle } = useCommandBox();
 * ```
 */
export function useCommandBox({
  defaultOpen = false,
  hotkeys = "mod+k, slash",
  onKeyboardOpen,
}: UseCommandBoxOptions = {}) {
  const [open, setOpen] = useState(defaultOpen);

  useHotkeys(hotkeys, (e: KeyboardEvent) => {
    e.preventDefault();
    setOpen((prev) => {
      if (!prev && onKeyboardOpen) {
        const key = e.key === "/" ? "/" : e.metaKey ? "cmd+k" : "ctrl+k";
        onKeyboardOpen(key);
      }
      return !prev;
    });
  });

  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  return { open, setOpen, toggle };
}
