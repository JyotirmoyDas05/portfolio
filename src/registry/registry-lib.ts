import type { Registry } from "shadcn/schema";

export const lib: Registry["items"] = [
  {
    name: "utils",
    type: "registry:lib",
    title: "Utility Functions",
    author: "jyotirmoydas <dai@jyotimoydas.in>",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "src/lib/utils.ts",
        type: "registry:lib",
      },
    ],
  },
  {
    name: "liquid-glass-lib",
    type: "registry:lib",
    title: "Liquid Glass Utilities",
    description:
      "Shared refraction and displacement utilities for iOS 26-inspired liquid glass effects.",
    author: "jyotirmoydas <jyotirmoydas12345@gmail.com>",
    dependencies: ["motion"],
    files: [
      {
        path: "liquid-glass-lib/refraction-filter.tsx",
        type: "registry:component",
      },
      {
        path: "src/lib/displacementMap.ts",
        type: "registry:lib",
      },
      {
        path: "src/lib/specular.ts",
        type: "registry:lib",
      },
      {
        path: "src/lib/surfaceEquations.ts",
        type: "registry:lib",
      },
    ],
  },
];
