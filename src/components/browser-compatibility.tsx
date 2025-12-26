"use client";

import {
  AlertCircleIcon,
  CheckIcon,
  GlobeIcon,
  InfoIcon,
  XIcon,
} from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { getMdnCompatData } from "./browser-compatibility-actions";

interface BrowserSupport {
  name: string;
  id: string;
  status: "supported" | "partial" | "not-supported";
  version?: string;
  notes?: string;
}

const INITIAL_BROWSERS: BrowserSupport[] = [
  { name: "Chrome", id: "chrome", status: "supported", version: "76+" },
  { name: "Edge", id: "edge", status: "supported", version: "79+" },
  { name: "Safari", id: "safari", status: "supported", version: "9+" },
  {
    name: "Firefox",
    id: "firefox",
    status: "partial",
    version: "103+",
    notes: "Does not support SVG filter references (url()) in backdrop-filter.",
  },
  { name: "Opera", id: "opera", status: "supported", version: "63+" },
];

interface BrowserCompatibilityProps {
  className?: string;
  feature?: string;
  mdnUrl?: string; // e.g. "https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter"
}

export function BrowserCompatibility({
  className,
  feature = "Liquid Glass Refraction",
  mdnUrl = "https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter",
}: BrowserCompatibilityProps) {
  const [browsers, setBrowsers] =
    React.useState<BrowserSupport[]>(INITIAL_BROWSERS);
  const [isLoading, setIsLoading] = React.useState(!!mdnUrl);
  const [currentBrowserId, setCurrentBrowserId] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    // Basic browser detection
    const ua = navigator.userAgent;
    let detectedId: string | null = null;

    if (ua.includes("Edg/")) detectedId = "edge";
    else if (ua.includes("OPR/") || ua.includes("Opera/")) detectedId = "opera";
    else if (ua.includes("Chrome/")) detectedId = "chrome";
    else if (ua.includes("Firefox/")) detectedId = "firefox";
    else if (ua.includes("Safari/") && !ua.includes("Chrome/"))
      detectedId = "safari";

    setCurrentBrowserId(detectedId);

    if (!mdnUrl) return;

    const fetchLiveStats = async () => {
      setIsLoading(true);
      const liveData = await getMdnCompatData(mdnUrl);

      if (liveData) {
        setBrowsers((prev) =>
          prev.map((browser) => {
            const browserData = liveData[browser.id];
            let status = browserData?.status ?? browser.status;

            // Manual override: Firefox doesn't support SVG filter references
            // in backdrop-filter, which breaks liquid glass refraction effects
            const featureLower = feature.toLowerCase();
            if (
              browser.id === "firefox" &&
              (featureLower.includes("liquid") ||
                featureLower.includes("glass") ||
                featureLower.includes("refraction"))
            ) {
              status = "partial";
            }

            if (browserData) {
              return {
                ...browser,
                version:
                  browserData.version !== "N/A"
                    ? `${browserData.version}+`
                    : browser.version,
                status,
              };
            }
            return { ...browser, status };
          })
        );
      }
      setIsLoading(false);
    };

    fetchLiveStats();
  }, [mdnUrl, feature]);

  const currentUserBrowser = browsers.find((b) => b.id === currentBrowserId);
  const isExperienceDegraded =
    currentUserBrowser &&
    (currentUserBrowser.status === "partial" ||
      currentUserBrowser.status === "not-supported");

  return (
    <div
      className={cn(
        "my-8 overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <GlobeIcon className="relative top-1 size-4.5 shrink-0 text-muted-foreground" />
          <h3 className="font-mono text-[12px] leading-none font-semibold tracking-[0.07em] text-muted-foreground uppercase">
            Browser Compatibility
          </h3>
        </div>
        {mdnUrl && (
          <a
            href={mdnUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] leading-none font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            MDN Source
          </a>
        )}
      </div>

      {isExperienceDegraded && (
        <div className="flex items-center gap-2.5 border-b bg-amber-500/10 px-4 py-2.5 text-amber-600 dark:text-amber-400">
          <AlertCircleIcon className="top-0.1 relative size-3.5 shrink-0" />
          <p className="flex-1 text-[11px] leading-none font-medium">
            Degraded Experience: {currentUserBrowser.name} has limited support
            for {feature.toLowerCase()}. Switch to Chrome or Safari for the best
            visuals.
          </p>
        </div>
      )}

      <div className="p-0">
        <div className="grid grid-cols-1 divide-y sm:grid-cols-5 sm:divide-x sm:divide-y-0">
          {browsers.map((browser) => (
            <div
              key={browser.name}
              className={cn(
                "group relative flex flex-col items-center justify-center p-6 text-center transition-colors hover:bg-muted/30",
                isLoading && "animate-pulse"
              )}
            >
              <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-background ring-1 ring-border group-hover:ring-muted-foreground/20">
                {browser.name === "Chrome" && <ChromeIcon className="size-6" />}
                {browser.name === "Firefox" && (
                  <FirefoxIcon className="size-6" />
                )}
                {browser.name === "Safari" && <SafariIcon className="size-6" />}
                {browser.name === "Edge" && <EdgeIcon className="size-6" />}
                {browser.name === "Opera" && <OperaIcon className="size-6" />}
              </div>

              <span className="text-sm font-medium">{browser.name}</span>
              <span className="mt-1 min-h-4 text-xs text-muted-foreground">
                {isLoading ? "..." : browser.version}
              </span>

              <div className="mt-4">
                {browser.status === "supported" && (
                  <div className="flex items-center gap-1.5 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success uppercase ring-1 ring-success/20">
                    <CheckIcon className="size-3" />
                    Full
                  </div>
                )}
                {browser.status === "partial" && (
                  <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-500 uppercase ring-1 ring-amber-500/20">
                    <AlertCircleIcon className="size-3" />
                    Partial
                  </div>
                )}
                {browser.status === "not-supported" && (
                  <div className="flex items-center gap-1.5 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-bold text-destructive uppercase ring-1 ring-destructive/20">
                    <XIcon className="size-3" />
                    None
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t bg-muted/20 px-4 py-3.5">
        <div className="flex flex-col">
          <div className="flex items-center gap-2.5">
            <div className="flex h-4 shrink-0 items-center">
              <InfoIcon className="size-3.5 text-info" />
            </div>
            <p className="text-[15px] leading-4 font-semibold text-foreground/90">
              Compatibility Note for {feature}:
            </p>
          </div>
          <p className="mt-0.5 pl-6 text-xs leading-relaxed text-muted-foreground">
            Firefox supports{" "}
            <code className="text-[10px] font-bold">backdrop-filter</code> but
            currently lacks support for referring to SVG filters via{" "}
            <code className="text-[10px] font-bold">url(#filterId)</code>. This
            results in the surface appearing as a simple semi-transparent blur
            without the refractive liquid effect.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Browser Icons (Simplified SVG Paths)
// ─────────────────────────────────────────────────────────────────────────────

function ChromeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32px"
      height="32px"
      viewBox="0 0 32 32"
      {...props}
    >
      <g fill="#f7f8f8">
        <path d="M9.138,14.616c.645-3.199,3.476-5.616,6.862-5.616h12.106c-2.425-4.177-6.937-7-12.106-7-4.478,0-8.461,2.121-11.026,5.403l4.164,7.213Z"></path>
        <circle cx="16" cy="16" r="5.25"></circle>
        <path d="M18.236,22.627c-.703,.238-1.453,.373-2.236,.373-2.586,0-4.843-1.413-6.055-3.504l-.008,.004L3.885,9.017c-1.192,2.058-1.885,4.439-1.885,6.983,0,7.061,5.261,12.903,12.065,13.85l4.17-7.223Z"></path>
        <path d="M20.615,10.75c1.459,1.284,2.385,3.159,2.385,5.25,0,1.274-.347,2.466-.945,3.496l.008,.004-6.063,10.5c7.719,0,14-6.281,14-14,0-1.857-.371-3.627-1.031-5.25h-8.355Z"></path>
      </g>
    </svg>
  );
}

function FirefoxIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32px"
      height="32px"
      viewBox="0 0 32 32"
      {...props}
    >
      <g fill="#f7f8f8">
        <path d="M28.997,10.732c-.577-1.575-1.79-3.182-1.817-3.217-.405-.532-.847-1.033-1.32-1.498-.331-.341-.683-.659-1.052-.952-.225-.194-.459-.378-.701-.551-.431-.321-.902-.61-1.413-.862-.126-.066-.253-.13-.38-.191-1.002-.485-2.048-.868-3.129-1.106-.144-.032-.288-.061-.433-.088-.721-.137-1.455-.216-2.196-.231-.114-.002-.226-.003-.337-.003-.969-.001-1.925,.097-2.831,.287-1.989,.419-3.738,1.277-4.844,2.351,.002,0,.003-.002,.005-.003-.002,.002-.003,.003-.005,.005,.002-.002,.005-.004,.008-.007,.002-.001,.005-.003,.007-.004-.002,.001-.004,.003-.005,.004,.004-.003,.009-.006,.015-.01,.828-.496,1.97-.898,2.786-1.103,4.157-1.016,8.225,.258,10.911,2.828,.577,.552,1.095,1.171,1.515,1.852,1.713,2.779,1.551,6.273,.215,8.333-.992,1.531-3.118,2.967-5.1,2.951,.04,.002,.08,.004,.12,.005-.065-.001-.13-.004-.196-.008-.002,0-.004,0-.006,0-.945-.057-1.762-.277-2.452-.614-3.148-1.536-3.635-5.496-1.394-7.401,0,0,0,0,0,0h0c-.737-.158-2.123,.152-3.087,1.59-.865,1.291-.817,3.285-.283,4.699-.325-.681-.563-1.374-.687-2.211-.676-4.552,2.301-8.45,5.121-9.547,.068-.026,.135-.051,.203-.074h0s0,0,0,0c-.606-.528-1.57-.836-2.691-.889-2.542-.092-7.377,1.072-9.177,6.848,.023-.969,.682-3.287,1.448-4.716,.002-.005,.005-.009,.007-.014,0,0,0,0,0,0,0,0,0,0,0,0-.323,.167-.675,.454-1.024,.816-.698,.726-1.382,1.755-1.788,2.732-.675,1.624-1.014,3.492-1.008,5.362,.002,.563,.034,1.126,.099,1.683,.003,.028,.007,.057,.01,.085,.016,.142,.032,.284,.05,.425,.001,.01,.003,.021,.004,.031,1.127,6.613,6.884,11.647,13.818,11.647,7.742,0,14.019-6.277,14.019-14.019,0-1.843-.356-3.604-1.003-5.216Z"></path>
      </g>
    </svg>
  );
}

function SafariIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32px"
      height="32px"
      viewBox="0 0 32 32"
      {...props}
    >
      <g fill="#f7f8f8">
        <path d="M16,2C8.268,2,2,8.268,2,16s6.268,14,14,14c7.732,0,14-6.268,14-14h0c0-7.732-6.268-14-14-14Zm0,26.903c-7.126,0-12.903-5.777-12.903-12.903S8.874,3.097,16,3.097s12.903,5.777,12.903,12.903-5.777,12.903-12.903,12.903Z"></path>
        <path d="M16,3.77c-.104,0-.188,.084-.188,.188v2.17c0,.104,.084,.188,.188,.188s.188-.084,.188-.188V3.958c0-.104-.084-.188-.188-.188Z"></path>
        <path d="M13.505,4.031c-.013,0-.025,.001-.038,.004-.102,.022-.167,.121-.145,.223l.449,2.123c.022,.102,.121,.167,.223,.145,.102-.022,.167-.121,.145-.223l-.449-2.123c-.019-.089-.097-.15-.185-.149h0Z"></path>
        <path d="M18.503,4.033c-.088,0-.166,.06-.185,.149l-.451,2.123c-.022,.102,.043,.201,.145,.223,.102,.022,.201-.043,.223-.145l.451-2.123c.022-.102-.043-.201-.145-.223-.013-.003-.025-.004-.038-.004h0Z"></path>
        <path d="M11.106,4.808c-.024,0-.049,.006-.073,.016-.095,.042-.138,.153-.095,.248l.881,1.983c.042,.095,.153,.138,.248,.095,.095-.042,.138-.153,.096-.248l-.881-1.983c-.032-.071-.102-.113-.175-.112h0Z"></path>
        <path d="M20.91,4.814c-.073-.001-.144,.04-.175,.112l-.884,1.982c-.042,.095,0,.206,.095,.248,.095,.042,.206,0,.248-.095l.884-1.982c.042-.095,0-.206-.095-.248-.024-.011-.049-.016-.073-.016h0Z"></path>
        <path d="M8.923,6.064c-.036,.001-.072,.013-.104,.036-.084,.061-.103,.178-.042,.263l1.274,1.756c.061,.084,.178,.103,.263,.042,.084-.061,.103-.178,.042-.263l-1.274-1.756c-.038-.053-.098-.08-.159-.078h0Z"></path>
        <path d="M23.091,6.074c-.06-.002-.12,.025-.159,.077l-1.277,1.755c-.061,.084-.043,.202,.041,.263,.084,.061,.202,.043,.263-.041l1.276-1.755c.061-.084,.043-.202-.041-.263-.032-.023-.068-.035-.104-.036h0Z"></path>
        <path d="M7.04,7.756c-.048,.003-.095,.023-.13,.062-.07,.077-.063,.196,.014,.266l1.613,1.452c.077,.07,.196,.063,.266-.014,.07-.077,.064-.196-.014-.266l-1.613-1.452c-.039-.035-.088-.051-.136-.048h0Z"></path>
        <path d="M5.558,9.791c-.06,.004-.117,.037-.15,.094-.052,.09-.021,.205,.069,.257l1.879,1.085c.09,.052,.205,.021,.257-.069s.021-.205-.069-.257l-1.879-1.085c-.034-.02-.071-.027-.107-.025h0Z"></path>
        <path d="M26.442,9.791c-.036-.003-.073,.005-.107,.025l-1.879,1.085c-.09,.052-.121,.167-.069,.257s.167,.121,.257,.069l1.879-1.085c.09-.052,.121-.167,.069-.257-.033-.056-.09-.09-.15-.094h0Z"></path>
        <path d="M4.534,12.082c-.073,.006-.139,.055-.163,.129-.032,.099,.021,.205,.121,.237l2.063,.672c.099,.032,.205-.021,.237-.121,.032-.099-.021-.205-.121-.237l-2.063-.672c-.025-.008-.05-.011-.074-.009h0Z"></path>
        <path d="M27.468,12.09c-.024-.002-.05,0-.074,.009l-2.064,.671c-.099,.032-.153,.138-.121,.237,.032,.099,.138,.153,.237,.121l2.064-.671c.099-.032,.153-.138,.121-.237-.024-.074-.09-.123-.163-.129h0Z"></path>
        <path d="M4.006,14.547c-.087,.008-.159,.077-.169,.167-.011,.104,.064,.196,.167,.207l2.158,.228c.104,.011,.196-.064,.207-.167,.011-.104-.064-.196-.167-.207l-2.158-.228c-.013-.001-.026-.001-.038,0h0Z"></path>
        <path d="M27.996,14.563c-.012-.001-.025-.001-.038,0l-2.158,.225c-.104,.011-.178,.103-.168,.207,.011,.104,.103,.178,.207,.168l2.158-.225c.104-.011,.178-.103,.168-.207-.009-.091-.081-.159-.168-.168h0Z"></path>
        <path d="M6.2,16.838c-.012-.001-.025-.001-.038,0l-2.158,.225c-.104,.011-.178,.103-.168,.207,.011,.104,.103,.178,.207,.168l2.158-.225c.104-.011,.178-.103,.168-.207-.009-.091-.081-.159-.168-.168h0Z"></path>
        <path d="M25.799,16.851c-.087,.008-.159,.077-.169,.167-.011,.104,.064,.196,.167,.207l2.158,.228c.104,.011,.196-.064,.207-.167,.011-.104-.064-.196-.167-.207l-2.158-.228c-.013-.001-.026-.001-.038,0h0Z"></path>
        <path d="M6.628,18.865c-.024-.002-.05,0-.074,.009l-2.064,.671c-.099,.032-.153,.138-.121,.237,.032,.099,.138,.153,.237,.121l2.064-.671c.099-.032,.153-.138,.121-.237-.024-.074-.09-.123-.163-.129h0Z"></path>
        <path d="M25.37,18.871c-.073,.006-.139,.055-.163,.129-.032,.099,.021,.205,.121,.237l2.063,.672c.099,.032,.205-.021,.237-.121,.032-.099-.021-.205-.121-.237l-2.063-.672c-.025-.008-.05-.011-.074-.009h0Z"></path>
        <path d="M7.464,20.749c-.036-.003-.073,.005-.107,.025l-1.879,1.085c-.09,.052-.121,.167-.069,.257s.167,.121,.257,.069l1.879-1.085c.09-.052,.121-.167,.069-.257-.033-.056-.09-.09-.15-.094h0Z"></path>
        <path d="M24.536,20.749c-.06,.004-.117,.037-.15,.094-.052,.09-.021,.205,.069,.257l1.879,1.085c.09,.052,.205,.021,.257-.069s.021-.205-.069-.257l-1.879-1.085c-.034-.02-.071-.027-.107-.025h0Z"></path>
        <path d="M23.327,22.417c-.048,.003-.095,.023-.13,.062-.07,.077-.063,.196,.014,.266l1.613,1.452c.077,.07,.196,.063,.266-.014,.07-.077,.063-.196-.014-.266l-1.613-1.452c-.039-.035-.088-.051-.136-.048h0Z"></path>
        <path d="M10.199,23.795c-.06-.002-.12,.025-.159,.077l-1.276,1.755c-.061,.084-.043,.202,.041,.263,.084,.061,.202,.043,.263-.041l1.276-1.755c.061-.084,.043-.202-.041-.263-.032-.023-.068-.035-.104-.036Z"></path>
        <path d="M21.79,23.803c-.036,.001-.072,.013-.104,.036-.084,.061-.103,.178-.042,.263l1.274,1.756c.061,.084,.178,.103,.263,.042,.084-.061,.103-.178,.042-.263l-1.274-1.756c-.038-.053-.098-.08-.159-.078h0Z"></path>
        <path d="M11.982,24.828c-.073-.002-.144,.04-.175,.112l-.884,1.982c-.042,.095,0,.206,.095,.248,.095,.042,.206,0,.248-.095l.884-1.982c.042-.095,0-.206-.095-.248-.024-.011-.049-.016-.073-.016h0Z"></path>
        <path d="M20.006,24.833c-.024,0-.049,.006-.073,.016-.095,.042-.138,.153-.095,.248l.881,1.983c.042,.095,.153,.138,.248,.095,.095-.042,.138-.153,.095-.248l-.881-1.983c-.032-.071-.102-.113-.175-.112h0Z"></path>
        <path d="M13.95,25.469c-.088,0-.166,.06-.185,.149l-.451,2.123c-.022,.102,.043,.201,.145,.223,.102,.022,.201-.043,.223-.145l.451-2.123c.022-.102-.043-.201-.145-.223-.013-.003-.025-.004-.038-.004h0Z"></path>
        <path d="M18.044,25.47c-.013,0-.025,.001-.038,.004-.102,.022-.167,.121-.145,.223l.449,2.123c.022,.102,.121,.167,.223,.145,.102-.022,.167-.121,.145-.223l-.449-2.123c-.019-.089-.097-.15-.185-.149h0Z"></path>
        <path d="M16,25.684c-.104,0-.188,.084-.188,.188v2.17c0,.104,.084,.188,.188,.188s.188-.084,.188-.188v-2.17c0-.104-.084-.188-.188-.188Z"></path>
        <path d="M17.475,17.545l-2.95-3.089,10.465-7.04-7.515,10.129Z"></path>
        <path
          d="M17.475,17.545l-2.95-3.089-7.515,10.129,10.465-7.04Z"
          opacity=".5"
        ></path>
        <path
          d="M7.01,24.585l10.465-7.04,7.515-10.129L7.01,24.585Z"
          style={{ isolation: "isolate" }}
          opacity=".243"
        ></path>
      </g>
    </svg>
  );
}

function EdgeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32px"
      height="32px"
      viewBox="0 0 32 32"
      {...props}
    >
      <g fill="#f7f8f8">
        <path
          d="M13.563,28.373c-.975-.603-1.821-1.398-2.488-2.335-1.039-1.449-1.654-3.245-1.654-5.182,0-2.86,1.334-5.387,3.373-6.991,.462-.359,1.064-.731,1.5-.936,.346-.167,.923-.449,1.693-.436,1.282,.013,2.257,.667,2.808,1.411,.423,.577,.68,1.27,.692,2.039,0-.026,2.667-8.697-8.745-8.697C5.972,7.246,2.022,11.8,2.022,15.802c0,2.527,.59,4.554,1.321,6.119,1.641,3.489,4.681,6.196,8.399,7.388,1.346,.436,2.783,.667,4.27,.667,1.539,0,3.026-.257,4.424-.718-.782,.244-1.616,.385-2.488,.385-1.616-.013-3.103-.475-4.386-1.27Z"
          opacity=".4"
        ></path>
        <path d="M27.259,22.818c-.372,.192-.757,.359-1.154,.513-1.205,.449-2.526,.706-3.924,.706-5.168,0-9.669-3.553-9.669-8.12,0-1.283,.744-2.399,1.795-2.976-.017,0-.031,.004-.048,.005-.433,.208-1.015,.568-1.466,.918-2.039,1.603-3.373,4.13-3.373,6.991,0,1.937,.616,3.733,1.654,5.182,.667,.936,1.513,1.732,2.488,2.335,1.282,.795,2.77,1.257,4.386,1.27,.419,0,.827-.036,1.226-.097,.098-.019,.193-.039,.288-.06,.175-.033,.345-.077,.515-.121,.154-.04,.315-.08,.445-.12,.051-.013,.09-.026,.141-.051,3.026-1.052,5.591-3.104,7.271-5.772,.244-.372-.18-.821-.577-.603Z"></path>
        <path d="M18.654,18.265c-.09,.115-.359,.269-.359,.616,0,.282,.18,.564,.513,.795,1.577,1.09,4.527,.949,4.539,.949,1.218,0,2.321-.346,3.308-.911,.449-.257,.859-.577,1.231-.924,1.282-1.219,2.065-2.937,2.09-4.849,.026-2.45-.872-4.079-1.244-4.797-2.308-4.541-7.296-7.145-12.733-7.145C8.344,2,2.125,8.157,2.022,15.789c.051-3.989,4.014-7.222,8.733-7.222,.385,0,2.565,.039,4.591,1.103,1.782,.936,2.719,2.065,3.373,3.194,.68,1.167,.795,2.642,.795,3.22s-.308,1.462-.859,2.181Z"></path>
      </g>
    </svg>
  );
}

function OperaIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32px"
      height="32px"
      viewBox="0 0 32 32"
      {...props}
    >
      <g fill="#f7f8f8">
        <path d="M30,16h0c0,4.147-1.803,7.872-4.669,10.436-3.591,1.75-6.938,.525-8.046-.239,3.527-.774,6.192-5.039,6.192-10.197s-2.665-9.423-6.192-10.197c1.108-.764,4.455-1.989,8.046-.239,2.865,2.564,4.669,6.289,4.669,10.436h0Z"></path>
        <path d="M11.392,8.111c-1.548,1.827-2.551,4.528-2.619,7.56v.66c.068,3.031,1.071,5.733,2.619,7.56,2.008,2.608,4.994,4.262,8.328,4.262,2.051,0,3.969-.626,5.611-1.714-2.478,2.214-5.747,3.561-9.331,3.561-.223,0-.445-.006-.667-.016-7.423-.348-13.333-6.476-13.333-13.984,0-7.732,6.269-14,14-14,.018,0,.035,0,.052,0,3.564,.013,6.814,1.358,9.278,3.563-1.641-1.088-3.56-1.715-5.611-1.715-3.333,0-6.318,1.654-8.326,4.262Z"></path>
      </g>
    </svg>
  );
}
