"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  AppleHelloArabicEffect,
  AppleHelloBulgarianEffect,
  AppleHelloCatalanEffect,
  AppleHelloChineseHKEffect,
  AppleHelloChineseSimplifiedEffect,
  AppleHelloChineseTraditionalEffect,
  AppleHelloCroatianEffect,
  AppleHelloCzechEffect,
  AppleHelloDanishEffect,
  AppleHelloDutchEffect,
  AppleHelloEnglishEffect,
  AppleHelloFinnishEffect,
  AppleHelloFrenchEffect,
  AppleHelloGermanEffect,
  AppleHelloGreekEffect,
  AppleHelloHebrewEffect,
  AppleHelloHindiEffect,
  AppleHelloHungarianEffect,
  AppleHelloIndonesianEffect,
} from "@/registry/apple-hello-effect";

const LANGUAGES = [
  {
    id: "hindi",
    label: "Hindi",
    nativeLabel: "नमस्ते",
    Component: AppleHelloHindiEffect,
  },
  {
    id: "english",
    label: "English",
    nativeLabel: "Hello",
    Component: AppleHelloEnglishEffect,
  },
  {
    id: "arabic",
    label: "Arabic",
    nativeLabel: "مرحبا",
    Component: AppleHelloArabicEffect,
  },
  {
    id: "bulgarian",
    label: "Bulgarian",
    nativeLabel: "Здравейте",
    Component: AppleHelloBulgarianEffect,
  },
  {
    id: "catalan",
    label: "Catalan",
    nativeLabel: "Hola",
    Component: AppleHelloCatalanEffect,
  },
  {
    id: "chinese-hk",
    label: "Chinese (HK)",
    nativeLabel: "你好",
    Component: AppleHelloChineseHKEffect,
  },
  {
    id: "chinese-simplified",
    label: "Chinese Simplified",
    nativeLabel: "你好",
    Component: AppleHelloChineseSimplifiedEffect,
  },
  {
    id: "chinese-traditional",
    label: "Chinese Traditional",
    nativeLabel: "你好",
    Component: AppleHelloChineseTraditionalEffect,
  },
  {
    id: "croatian",
    label: "Croatian",
    nativeLabel: "Bok",
    Component: AppleHelloCroatianEffect,
  },
  {
    id: "czech",
    label: "Czech",
    nativeLabel: "Ahoj",
    Component: AppleHelloCzechEffect,
  },
  {
    id: "danish",
    label: "Danish",
    nativeLabel: "Hej",
    Component: AppleHelloDanishEffect,
  },
  {
    id: "dutch",
    label: "Dutch",
    nativeLabel: "Hallo",
    Component: AppleHelloDutchEffect,
  },
  {
    id: "finnish",
    label: "Finnish",
    nativeLabel: "Hei",
    Component: AppleHelloFinnishEffect,
  },
  {
    id: "french",
    label: "French",
    nativeLabel: "Bonjour",
    Component: AppleHelloFrenchEffect,
  },
  {
    id: "german",
    label: "German",
    nativeLabel: "Hallo",
    Component: AppleHelloGermanEffect,
  },
  {
    id: "greek",
    label: "Greek",
    nativeLabel: "Γεια σας",
    Component: AppleHelloGreekEffect,
  },
  {
    id: "hebrew",
    label: "Hebrew",
    nativeLabel: "שלום",
    Component: AppleHelloHebrewEffect,
  },
  {
    id: "hungarian",
    label: "Hungarian",
    nativeLabel: "Helló",
    Component: AppleHelloHungarianEffect,
  },
  {
    id: "indonesian",
    label: "Indonesian",
    nativeLabel: "Halo",
    Component: AppleHelloIndonesianEffect,
  },
] as const;

type LanguageId = (typeof LANGUAGES)[number]["id"];

export default function MultiLanguageDemo() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageId>("hindi");
  const [key, setKey] = useState(0);

  const selectedLang = LANGUAGES.find((l) => l.id === selectedLanguage)!;
  const SelectedComponent = selectedLang.Component;

  const handleLanguageChange = (langId: LanguageId) => {
    setSelectedLanguage(langId);
    setKey((k) => k + 1);
  };

  return (
    <>
      {/* Language selector - uses fixed positioning relative to nearest positioned ancestor (preview box)
          Preview structure: [data-slot="preview"] > [data-slot="buttons"] + [data-slot="component-preview"]
          Position: fixed relative to viewport, but portal to buttons row via CSS targeting */}
      <style>{`
        [data-slot="component-preview"]:has(.apple-hello-lang-trigger) {
          position: relative;
          overflow: visible !important;
        }
        [data-slot="preview"]:has(.apple-hello-lang-trigger) {
          overflow: visible !important;
        }
        .apple-hello-lang-wrapper {
          position: absolute;
          top: -2.25rem;
          right: 8.85rem;
          z-index: 50;
        }
      `}</style>
      <div className="apple-hello-lang-wrapper">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "apple-hello-lang-trigger",
                buttonVariants({
                  size: "sm",
                  variant: "secondary",
                  className: "h-7 gap-1.5 px-2.5 font-sans",
                })
              )}
            >
              {selectedLang.label}
              <ChevronDownIcon className="size-4" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            {LANGUAGES.map((lang) => (
              <DropdownMenuItem
                key={lang.id}
                onClick={() => handleLanguageChange(lang.id)}
                className={cn(
                  "gap-2",
                  selectedLanguage === lang.id && "bg-accent"
                )}
              >
                <span>{lang.label}</span>
                <span className="text-muted-foreground">
                  ({lang.nativeLabel})
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Animation */}
      <SelectedComponent key={key} />
    </>
  );
}
