"use client";

import {
  AnimatePresence,
  motion,
  MotionConfig,
  type MotionProps,
} from "motion/react";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";
import {
  DynamicScrollIslandTOC,
  type TOCItem,
} from "@/registry/dynamic-scroll-island-toc/dynamic-scroll-island-toc";

// =============================================================================
// Demo Data
// =============================================================================

const TOC_DATA: TOCItem[] = [
  { name: "All" },
  { name: "Grass", value: "grass" },
  { name: "Llama", value: "llama" },
  { name: "Cat", value: "cat" },
  { name: "Dog", value: "dog" },
  { name: "Bird", value: "bird" },
  { name: "Mountain", value: "mountain" },
  { name: "Ocean", value: "ocean" },
  { name: "Flower", value: "flower" },
];

const IMAGES: Record<string, string[]> = {
  grass: [
    "https://images.unsplash.com/photo-1589496933738-f5c27bc146e3?q=70&w=500",
    "https://images.unsplash.com/photo-1526392587392-d1627b6c134a?q=70&w=500",
    "https://images.unsplash.com/photo-1609311630949-72f6a4c2acbb?q=70&w=500",
    "https://images.unsplash.com/photo-1528145913842-29edebe7bdb9?q=70&w=500",
    "https://images.unsplash.com/photo-1601788505117-18947ac4f2e6?q=70&w=500",
  ],
  llama: [
    "https://images.unsplash.com/photo-1587618420325-97ac1ea3cd80?q=70&w=500",
    "https://images.unsplash.com/photo-1568805778598-fcb2852dbac1?q=70&w=500",
    "https://images.unsplash.com/photo-1589182337358-2cb63099350c?q=70&w=500",
    "https://images.unsplash.com/photo-1601924690478-c507163b3ba9?q=70&w=500",
    "https://images.unsplash.com/photo-1617096000801-bd71df8d6d8f?q=70&w=500",
    "https://images.unsplash.com/photo-1542856204-00101eb6def4?q=70&w=500",
  ],
  cat: [
    "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?q=70&w=500",
    "https://images.unsplash.com/photo-1611267254323-4db7b39c732c?q=70&w=500",
    "https://images.unsplash.com/photo-1594473198611-9ef233fc7850?q=70&w=500",
    "https://images.unsplash.com/photo-1604430352727-c0555f882e01?q=70&w=500",
    "https://images.unsplash.com/photo-1559059699-085698eba48c?q=70&w=500",
  ],
  dog: [
    "https://images.unsplash.com/photo-1548658166-136d9f6a7e76?q=70&w=500",
    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=70&w=500",
    "https://images.unsplash.com/photo-1514984879728-be0aff75a6e8?q=70&w=500",
    "https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?q=70&w=500",
    "https://images.unsplash.com/photo-1592769606534-fe78d27bf450?q=70&w=500",
  ],
  bird: [
    "https://images.unsplash.com/photo-1444464666168-49d633b86797?q=70&w=500",
    "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?q=70&w=500",
    "https://images.unsplash.com/photo-1555169062-013468b47731?q=70&w=500",
    "https://images.unsplash.com/photo-1480044965905-02098d419e96?q=70&w=500",
    "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?q=70&w=500",
  ],
  mountain: [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=70&w=500",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=70&w=500",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=70&w=500",
    "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=70&w=500",
    "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=70&w=500",
  ],
  ocean: [
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=70&w=500",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=70&w=500",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=70&w=500",
    "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?q=70&w=500",
    "https://images.unsplash.com/photo-1439405326854-014607f694d7?q=70&w=500",
  ],
  flower: [
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=70&w=500",
    "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=70&w=500",
    "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?q=70&w=500",
    "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?q=70&w=500",
    "https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=70&w=500",
  ],
};

// Pre-computed flat array of all images (deterministic order)
const ALL_IMAGES = Object.values(IMAGES).flat();

const animation: MotionProps = {
  variants: {
    hidden: { maskPosition: "0% 150%", filter: "blur(10px)", opacity: 0.5 },
    show: { maskPosition: "0% 0%", filter: "blur(0px)", opacity: 1 },
  },
  initial: "hidden",
  animate: "show",
  exit: "hidden",
};

// =============================================================================
// Demo Component
// =============================================================================

export default function DynamicScrollIslandTocDemo() {
  const [active, _setActive] = useState(TOC_DATA[0]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  function setActive(val: TOCItem) {
    // Reset scroll position to top when changing filters
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    if (!val.value) _setActive(val);
    setTimeout(() => _setActive(val), 400);
  }

  const filteredImages = active.value ? IMAGES[active.value] : ALL_IMAGES;

  return (
    <div className="relative w-full p-8">
      {/* Dot background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      <MotionConfig transition={{ duration: 0.8 }}>
        <div className="relative flex justify-center">
          <DynamicScrollIslandTOC
            data={TOC_DATA}
            value={active}
            setValue={setActive}
            containerRef={scrollContainerRef}
          />
        </div>

        <div
          className="mt-8 h-96 overflow-scroll rounded-xl"
          ref={scrollContainerRef}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={active.value}
              className={cn(
                "grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4",
                "mask-[linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)] mask-size-[100%_300%] mask-no-repeat"
              )}
              {...animation}
            >
              {filteredImages.map((url, idx) => (
                <div
                  key={`${active.value}-${idx}`}
                  className="relative aspect-square overflow-hidden rounded-xl"
                >
                  <img
                    src={url}
                    className="absolute inset-0 h-full w-full object-cover"
                    alt={`${active.name} image ${idx + 1}`}
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </MotionConfig>
    </div>
  );
}
