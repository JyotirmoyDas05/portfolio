import type { Registry } from "shadcn/schema";

import { registryItemUrl } from "../config/registry";

export const components: Registry["items"] = [
  {
    name: "theme-switcher",
    type: "registry:component",
    description:
      "A theme switcher component for Next.js apps with next-themes and Tailwind CSS, supporting system, light, and dark modes.",
    title: "Theme Switcher",
    author: "jyotirmoydas <jyotirmoydas12345@gmail.com>",
    dependencies: ["cn", "next-themes", "lucide-react", "motion"],
    registryDependencies: [
      registryItemUrl("use-sound"),
      registryItemUrl("use-theme-transition"),
    ],
    files: [
      {
        path: "theme-switcher/theme-switcher.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://jyotimoydas.in/components/theme-switcher-component",
  },
  {
    name: "flip-sentences",
    type: "registry:component",
    description:
      "Cycles through a list of sentences with a smooth flip transition built with Motion.",
    title: "Flip Sentences",
    author: "jyotirmoydas <jyotirmoydas12345@gmail.com>",
    dependencies: ["cn", "motion"],
    files: [
      {
        path: "flip-sentences/flip-sentences.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "apple-hello-effect",
    type: "registry:component",
    description:
      "Create a Xin chào and Hello writing effect inspired by Apple using Motion for React.",
    title: "Apple Hello Effect",
    author: "jyotirmoydas <jyotirmoydas12345@gmail.com>",
    dependencies: ["cn", "motion"],
    files: [
      {
        path: "apple-hello-effect/apple-hello-effect.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://jyotimoydas.in/components/apple-hello-effect",
  },

  {
    name: "work-experience",
    type: "registry:component",
    description:
      "Displays a list of work experiences with role details and durations.",
    title: "Work Experience",
    author: "jyotirmoydas <jyotirmoydas12345@gmail.com>",
    dependencies: ["cn", "react-markdown", "lucide-react"],
    devDependencies: ["@tailwindcss/typography", "tw-animate-css"],
    registryDependencies: ["collapsible", "separator"],
    files: [
      {
        path: "work-experience/work-experience.tsx",
        type: "registry:component",
      },
    ],
    cssVars: {
      light: {
        background: "oklch(1 0 0)",
        muted: "oklch(0.967 0.001 286.375)",
        "muted-foreground": "oklch(0.552 0.016 285.938)",
        border: "oklch(0.92 0.004 286.32)",
      },
      dark: {
        background: "oklch(0.141 0.005 285.823)",
        muted: "oklch(0.274 0.006 286.033)",
        "muted-foreground": "oklch(0.705 0.015 286.067)",
        border: "oklch(0.274 0.006 286.033)",
      },
    },
    css: {
      '@import "tw-animate-css"': {},
      "@plugin @tailwindcss/typography": {},
    },
    docs: "https://jyotimoydas.in/components/work-experience-component",
  },
  {
    name: "shimmering-text",
    type: "registry:component",
    description: "Smooth shimmering text animation built with Motion.",
    title: "Shimmering Text",
    author: "jyotirmoydas <jyotirmoydas12345@gmail.com>",
    dependencies: ["cn", "motion"],
    files: [
      {
        path: "shimmering-text/shimmering-text.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "slide-to-unlock",
    type: "registry:component",
    description:
      "An iOS 26-inspired liquid glass slide-to-unlock switch with refraction effects.",
    title: "Slide to Unlock",
    author: "jyotirmoydas <jyotirmoydas12345@gmail.com>",
    dependencies: ["cn", "motion", "sonner"],
    registryDependencies: [
      registryItemUrl("use-sound"),
      registryItemUrl("liquid-glass-lib"),
    ],
    files: [
      {
        path: "slide-to-unlock/slide-to-unlock.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://jyotimoydas.in/components/slide-to-unlock",
  },
  {
    name: "liquid-glass-slider",
    type: "registry:component",
    description:
      "An iOS 26-inspired liquid glass slider with draggable thumb and SVG refraction effects.",
    title: "Liquid Glass Slider",
    author: "jyotirmoydas <jyotirmoydas12345@gmail.com>",
    dependencies: ["cn", "motion"],
    registryDependencies: [registryItemUrl("liquid-glass-lib")],
    files: [
      {
        path: "liquid-glass-slider/liquid-glass-slider.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://jyotimoydas.in/components/liquid-glass-slider",
  },
  {
    name: "liquid-glass-searchbox",
    type: "registry:component",
    description:
      "An iOS 26-inspired liquid glass searchbox with focus animations and SVG refraction effects.",
    title: "Liquid Glass Searchbox",
    author: "jyotirmoydas <jyotirmoydas12345@gmail.com>",
    dependencies: ["cn", "motion", "lucide-react"],
    registryDependencies: [registryItemUrl("liquid-glass-lib")],
    files: [
      {
        path: "liquid-glass-searchbox/liquid-glass-searchbox.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://jyotimoydas.in/components/liquid-glass-searchbox",
  },
  {
    name: "command-box",
    type: "registry:component",
    description:
      "A customizable command palette/search box with keyboard shortcuts and footer logo customization.",
    title: "Command Box",
    author: "jyotirmoydas <jyotirmoydas12345@gmail.com>",
    dependencies: ["cn", "cmdk", "lucide-react", "react-hotkeys-hook"],
    registryDependencies: ["button", "command", "kbd", "separator"],
    files: [
      {
        path: "command-box/command-box.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://jyotimoydas.in/components/command-box",
  },

  {
    name: "github-stars",
    type: "registry:component",
    description:
      "Display GitHub repository star count with formatted numbers and a tooltip showing the full count.",
    title: "GitHub Stars",
    author: "jyotirmoydas <jyotirmoydas12345@gmail.com>",
    registryDependencies: ["button", "tooltip"],
    files: [
      {
        path: "github-stars/github-stars.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "scroll-fade-effect",
    type: "registry:component",
    description:
      "A React component that adds a fade effect to content as you scroll.",
    title: "Scroll Fade Effect",
    author: "jyotirmoydas <jyotirmoydas12345@gmail.com>",
    dependencies: ["cn"],
    files: [
      {
        path: "scroll-fade-effect/scroll-fade-effect.tsx",
        type: "registry:component",
      },
    ],
    css: {
      "@property --top-mask-height": {
        syntax: '"<length>"',
        inherits: "true",
        "initial-value": "0px",
      },
      "@property --bottom-mask-height": {
        syntax: '"<length>"',
        inherits: "true",
        "initial-value": "64px",
      },
      "@property --left-mask-width": {
        syntax: '"<length>"',
        inherits: "true",
        "initial-value": "0px",
      },
      "@property --right-mask-width": {
        syntax: '"<length>"',
        inherits: "true",
        "initial-value": "64px",
      },
      "@layer base": {
        "@keyframes show-top-mask": {
          to: {
            "--top-mask-height": "var(--mask-height)",
          },
        },
        "@keyframes hide-bottom-mask": {
          to: {
            "--bottom-mask-height": "0px",
          },
        },
        "@keyframes show-left-mask": {
          to: {
            "--left-mask-width": "var(--mask-width)",
          },
        },
        "@keyframes hide-right-mask": {
          to: {
            "--right-mask-width": "0px",
          },
        },
      },
      "@utility scroll-fade-effect-y": {
        "--mask-height": "64px",
        "--mask-offset-top": "0px",
        "--mask-offset-bottom": "0px",
        "--scroll-buffer": "2rem",
        "mask-image":
          "linear-gradient(to top, transparent, black 90%), linear-gradient(to bottom, transparent 0%, black 100%), linear-gradient(black, black)",
        "mask-size":
          "100% var(--top-mask-height), 100% var(--bottom-mask-height), 100% 100%",
        "mask-repeat": "no-repeat, no-repeat, no-repeat",
        "mask-position":
          "0 var(--mask-offset-top), 0 calc(100% - var(--mask-offset-bottom)), 0 0",
        "mask-composite": "exclude",
        "animation-name": "show-top-mask, hide-bottom-mask",
        "animation-timeline": "scroll(self), scroll(self)",
        "animation-range":
          "0 var(--scroll-buffer), calc(100% - var(--scroll-buffer)) 100%",
        "animation-fill-mode": "both",
      },
      "@utility scroll-fade-effect-x": {
        "--mask-width": "64px",
        "--mask-offset-left": "0px",
        "--mask-offset-right": "0px",
        "--scroll-buffer": "2rem",
        "mask-image":
          "linear-gradient(to left, transparent, black 90%), linear-gradient(to right, transparent 0%, black 100%), linear-gradient(black, black)",
        "mask-size":
          "var(--left-mask-width) 100%, var(--right-mask-width) 100%, 100% 100%",
        "mask-repeat": "no-repeat, no-repeat, no-repeat",
        "mask-position":
          "var(--mask-offset-left) 0, calc(100% - var(--mask-offset-right)) 0, 0 0",
        "mask-composite": "exclude",
        "animation-name": "show-left-mask, hide-right-mask",
        "animation-timeline": "scroll(self inline), scroll(self inline)",
        "animation-range":
          "0 var(--scroll-buffer), calc(100% - var(--scroll-buffer)) 100%",
        "animation-fill-mode": "both",
      },
    },
  },
  {
    name: "dynamic-scroll-island-toc",
    type: "registry:component",
    description:
      "An iOS Dynamic Island-style scroll progress indicator with expandable TOC navigation.",
    title: "Dynamic Scroll Island TOC",
    author: "jyotirmoydas <jyotirmoydas12345@gmail.com>",
    dependencies: ["cn", "motion", "lucide-react"],
    files: [
      {
        path: "dynamic-scroll-island-toc/dynamic-scroll-island-toc.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://jyotimoydas.in/components/dynamic-scroll-island-toc",
  },
  {
    name: "status-button",
    type: "registry:component",
    description:
      "A stateful button with animated transitions between normal, loading, success, and error states.",
    title: "Status Button",
    author: "jyotirmoydas <jyotirmoydas12345@gmail.com>",
    dependencies: ["cn", "motion", "react-icons", "class-variance-authority"],
    files: [
      {
        path: "status-button/status-button.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://jyotimoydas.in/components/status-button",
  },
  {
    name: "status-indicator",
    type: "registry:component",
    description:
      "A toast notification that displays animated status transitions using Sonner.",
    title: "Status Indicator",
    author: "jyotirmoydas <jyotirmoydas12345@gmail.com>",
    dependencies: ["sonner"],
    registryDependencies: [registryItemUrl("status-button")],
    files: [
      {
        path: "status-indicator/status-indicator.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://jyotimoydas.in/components/status-indicator",
  },
];
