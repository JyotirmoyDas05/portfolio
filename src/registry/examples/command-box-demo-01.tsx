"use client";

import {
  BookmarkIcon,
  BriefcaseBusinessIcon,
  HeartIcon,
  LayersIcon,
  MoonStarIcon,
  QuoteIcon,
  RssIcon,
  ShieldCheckIcon,
  SunMediumIcon,
  TextInitialIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { toast } from "sonner";

import { Icons } from "@/components/icons";
import { JyotirmoyMark } from "@/components/jyotirmoy-mark";
import { trackEvent } from "@/lib/events";
import {
  CommandBox,
  CommandBoxEmpty,
  CommandBoxFooter,
  CommandBoxGroup,
  CommandBoxInput,
  CommandBoxItem,
  CommandBoxLinkGroup,
  CommandBoxList,
  CommandBoxTrigger,
  type CommandKind,
  type CommandLinkItem,
  useCommandBox,
} from "@/registry/command-box/command-box";

// Demo menu links
const MENU_LINKS: CommandLinkItem[] = [
  { title: "Portfolio", href: "/", icon: JyotirmoyMark },
  { title: "Components", href: "/components", icon: Icons.react },
  { title: "Blog", href: "/blog", icon: RssIcon },
];

const PORTFOLIO_LINKS: CommandLinkItem[] = [
  { title: "About", href: "/#about", icon: TextInitialIcon },
  { title: "Testimonials", href: "/#testimonials", icon: QuoteIcon },
  { title: "Tech Stack", href: "/#stack", icon: LayersIcon },
  { title: "Experience", href: "/#experience", icon: BriefcaseBusinessIcon },
  { title: "Projects", href: "/#projects", icon: BookmarkIcon },
  { title: "Certificates", href: "/#certificates", icon: ShieldCheckIcon },
];

const OTHER_LINKS: CommandLinkItem[] = [
  { title: "Sponsors", href: "/sponsors", icon: HeartIcon },
  { title: "RSS Feed", href: "/rss", icon: RssIcon, openInNewTab: true },
];

// Command meta map for footer action labels
const COMMAND_META_MAP = new Map<string, { commandKind: CommandKind }>([
  ["Light", { commandKind: "command" }],
  ["Dark", { commandKind: "command" }],
  ["Auto", { commandKind: "command" }],
]);

export default function CommandBoxDemo() {
  const router = useRouter();
  const { setTheme } = useTheme();

  // Use the hook for keyboard shortcuts
  const { open, setOpen } = useCommandBox({
    onKeyboardOpen: (key) => {
      trackEvent({
        name: "open_command_menu",
        properties: { method: "keyboard", key },
      });
    },
  });

  const handleOpenLink = useCallback(
    (href: string, openInNewTab = false) => {
      setOpen(false);
      if (openInNewTab) {
        window.open(href, "_blank", "noopener");
      } else {
        router.push(href);
      }
    },
    [router, setOpen]
  );

  const handleThemeChange = useCallback(
    (theme: "light" | "dark" | "system") => {
      setOpen(false);
      setTheme(theme);
      toast.success(`Theme changed to ${theme}`);
    },
    [setOpen, setTheme]
  );

  return (
    <>
      {/* Trigger button - matches site header */}
      <CommandBoxTrigger onClick={() => setOpen(true)} />

      {/* Command Box Dialog */}
      <CommandBox open={open} onOpenChange={setOpen}>
        <CommandBoxInput placeholder="Type a command or search..." />

        <CommandBoxList>
          <CommandBoxEmpty>No results found.</CommandBoxEmpty>

          <CommandBoxLinkGroup
            heading="Menu"
            links={MENU_LINKS}
            onLinkSelect={handleOpenLink}
          />

          <CommandBoxLinkGroup
            heading="Portfolio"
            links={PORTFOLIO_LINKS}
            onLinkSelect={handleOpenLink}
          />

          <CommandBoxGroup heading="Theme">
            <CommandBoxItem
              keywords={["theme"]}
              onSelect={() => handleThemeChange("light")}
            >
              <SunMediumIcon />
              Light
            </CommandBoxItem>
            <CommandBoxItem
              keywords={["theme"]}
              onSelect={() => handleThemeChange("dark")}
            >
              <MoonStarIcon />
              Dark
            </CommandBoxItem>
            <CommandBoxItem
              keywords={["theme"]}
              onSelect={() => handleThemeChange("system")}
            >
              <Icons.contrast />
              Auto
            </CommandBoxItem>
          </CommandBoxGroup>

          <CommandBoxLinkGroup
            heading="Other"
            links={OTHER_LINKS}
            onLinkSelect={handleOpenLink}
          />
        </CommandBoxList>

        {/* Footer with custom logo */}
        <CommandBoxFooter
          logo={<JyotirmoyMark className="size-6 text-muted-foreground" />}
          commandMetaMap={COMMAND_META_MAP}
        />
      </CommandBox>
    </>
  );
}
