"use client";

import {
  ConsentBanner,
  ConsentDialog,
  ConsentManagerProvider,
} from "@c15t/nextjs";
import { posthog } from "posthog-js";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ConsentManager({ children }: { children: React.ReactNode }) {
  return (
    <ConsentManagerProvider
      options={{
        mode: "offline",
        consentCategories: ["necessary", "measurement"],
        colorScheme: "system",
        callbacks: {
          onConsentSet({ preferences }) {
            if (preferences.measurement) {
              posthog.opt_in_capturing();
            } else {
              posthog.opt_out_capturing();
            }
          },
        },
        theme: {
          slots: {
            consentBannerCard: cn(
              "relative w-full max-w-(--banner-max-width) divide-y overflow-hidden rounded-2xl",
              "bg-popover text-popover-foreground shadow-popover ring ring-popover-border"
            ),
            consentBannerTitle: "text-lg font-semibold text-foreground",
            consentBannerDescription: "text-sm text-muted-foreground",
            consentBannerFooter:
              "[--c15t-banner-footer-background-color:transparent]",
            consentDialogCard: cn(
              "rounded-2xl border-none bg-background shadow-popover ring ring-popover-border"
            ),
            consentDialogTitle:
              "text-lg leading-none font-semibold text-foreground",
            consentDialogDescription: "text-sm text-muted-foreground",
            consentDialogOverlay: "[--c15t-overlay:hsl(0_0%_0%_/_0.5)]",
            consentDialogFooter: "[--c15t-stroke-color:var(--border)]",
            consentDialogTag:
              "[--c15t-branding-icon-height:1.125rem] [--c15t-branding-font-size:0.875rem]",
            consentWidgetAccordion: "rounded-lg border",
            toggle: cn(
              "inline-flex h-4.5 w-8 shrink-0 items-center rounded-full transition-all",
              "border border-transparent shadow-xs",
              "outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
              "disabled:cursor-not-allowed disabled:opacity-50"
            ),
            buttonPrimary: buttonVariants({ variant: "default" }),
            buttonSecondary: buttonVariants({ variant: "secondary" }),
          },
        },
      }}
    >
      <ConsentBanner
        layout={[["reject", "accept"], "customize"]}
        primaryButton="customize"
      />

      <ConsentDialog />

      {children}
    </ConsentManagerProvider>
  );
}
