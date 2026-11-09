import type { Registry } from "shadcn/schema";

import { registryItemUrl } from "../config/registry";

function block(
  name: string,
  title: string,
  description: string,
  demo: string,
  registryDependencies: string[],
  docs?: string
): Registry["items"][number] {
  return {
    name,
    type: "registry:block",
    title,
    description,
    registryDependencies,
    docs,
    files: [{ path: `examples/${demo}.tsx`, type: "registry:component" }],
  };
}

export const blocks: Registry["items"] = [
  block(
    "work-experience-block-01",
    "Work Experience Block",
    "A work experience list with expandable roles, using sample data.",
    "work-experience-demo",
    [registryItemUrl("work-experience")],
    "This demo loads images from assets.jyotimoydas.in. Add it to images.remotePatterns in next.config.ts, or replace the image URLs."
  ),
  block(
    "shimmering-text-block-01",
    "Shimmering Text Block 01",
    "Shimmering text at a larger size.",
    "shimmering-text-demo-01",
    [registryItemUrl("shimmering-text")]
  ),
  block(
    "shimmering-text-block-02",
    "Shimmering Text Block 02",
    "Shimmering text with custom colors for a loading message.",
    "shimmering-text-demo-02",
    [registryItemUrl("shimmering-text")]
  ),
  block(
    "slide-to-unlock-block-01",
    "Slide to Unlock Block 01",
    "The default slide-to-unlock switch.",
    "slide-to-unlock-demo-01",
    [registryItemUrl("slide-to-unlock"), registryItemUrl("use-sound")]
  ),
  block(
    "slide-to-unlock-block-02",
    "Slide to Unlock Block 02",
    "A slide-to-unlock switch with custom thumb, track and toast colors.",
    "slide-to-unlock-demo-02",
    [registryItemUrl("slide-to-unlock")]
  ),
  block(
    "slide-to-unlock-block-03",
    "Slide to Unlock Block 03",
    "A slide-to-unlock switch with tuned glass refraction settings.",
    "slide-to-unlock-demo-03",
    [registryItemUrl("slide-to-unlock")]
  ),
  block(
    "slide-to-unlock-block-04",
    "Slide to Unlock Block 04",
    "A disabled slide-to-unlock switch.",
    "slide-to-unlock-demo-04",
    [registryItemUrl("slide-to-unlock")]
  ),
  block(
    "liquid-glass-slider-block-01",
    "Liquid Glass Slider Block 01",
    "A liquid glass slider with a default value and a change handler.",
    "liquid-glass-slider-demo-01",
    [registryItemUrl("liquid-glass-slider")]
  ),
  block(
    "liquid-glass-slider-block-02",
    "Liquid Glass Slider Block 02",
    "A liquid glass slider with custom fill, track and thumb colors.",
    "liquid-glass-slider-demo-02",
    [registryItemUrl("liquid-glass-slider")]
  ),
  block(
    "liquid-glass-slider-block-03",
    "Liquid Glass Slider Block 03",
    "A liquid glass slider with tuned glass refraction settings.",
    "liquid-glass-slider-demo-03",
    [registryItemUrl("liquid-glass-slider")]
  ),
  block(
    "liquid-glass-searchbox-block-01",
    "Liquid Glass Searchbox Block 01",
    "A liquid glass searchbox with a controlled value and a clear button.",
    "liquid-glass-searchbox-demo-01",
    [registryItemUrl("liquid-glass-searchbox")]
  ),
  block(
    "liquid-glass-searchbox-block-02",
    "Liquid Glass Searchbox Block 02",
    "A liquid glass searchbox with a custom width and placeholder.",
    "liquid-glass-searchbox-demo-02",
    [registryItemUrl("liquid-glass-searchbox")]
  ),
  block(
    "scroll-fade-effect-block-01",
    "Scroll Fade Effect Block 01",
    "A vertical scroll fade over a long list of tags.",
    "scroll-fade-effect-demo-01",
    [registryItemUrl("scroll-fade-effect"), "separator"]
  ),
  block(
    "scroll-fade-effect-block-02",
    "Scroll Fade Effect Block 02",
    "A horizontal scroll fade over a row of artwork.",
    "scroll-fade-effect-demo-02",
    [registryItemUrl("scroll-fade-effect")],
    "This demo loads images from images.unsplash.com. Add it to images.remotePatterns in next.config.ts, or replace the image URLs."
  ),
  block(
    "scroll-fade-effect-block-03",
    "Scroll Fade Effect Block 03",
    "A vertical scroll fade applied to the shadcn scroll area.",
    "scroll-fade-effect-demo-03",
    [registryItemUrl("scroll-fade-effect"), "scroll-area", "separator"]
  ),
  block(
    "scroll-fade-effect-block-04",
    "Scroll Fade Effect Block 04",
    "A horizontal scroll fade applied to the shadcn scroll area.",
    "scroll-fade-effect-demo-04",
    [registryItemUrl("scroll-fade-effect"), "scroll-area"],
    "This demo loads images from images.unsplash.com. Add it to images.remotePatterns in next.config.ts, or replace the image URLs."
  ),
];
