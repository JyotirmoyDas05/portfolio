import type { Registry } from "shadcn/schema";

export const hook: Registry["items"] = [
  {
    name: "use-controllable-state",
    type: "registry:hook",
    title: "Controllable State Hook",
    description:
      "Hook for components that can be either controlled or uncontrolled.",
    files: [
      {
        path: "src/hooks/use-layout-effect.tsx",
        type: "registry:hook",
      },
      {
        path: "src/hooks/use-controllable-state.ts",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "use-sound",
    type: "registry:hook",
    title: "Sound Hook",
    description:
      "Custom React hook to load and play a sound from a given URL using the Web Audio API.",
    files: [{ path: "src/hooks/use-sound.ts", type: "registry:hook" }],
  },
  {
    name: "use-theme-transition",
    type: "registry:hook",
    title: "Theme Transition Hook",
    description:
      "Animates theme changes with the View Transitions API, expanding from the clicked element.",
    files: [
      { path: "src/hooks/use-theme-transition.ts", type: "registry:hook" },
    ],
  },
];
