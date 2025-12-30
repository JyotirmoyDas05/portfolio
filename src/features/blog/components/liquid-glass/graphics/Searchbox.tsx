"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";

import { cn } from "@/lib/utils";

import { Filter } from "../components/Filter";
import { CONVEX } from "../lib/surfaceEquations";

export const Searchbox: React.FC = () => {
  // Dimensions ratio for a search field
  const height = 56;
  const width = 420;
  const radius = height / 2;

  // Glass parameters as MotionValues (no React state)
  const specularOpacity = useMotionValue(0.2); // 0..1
  const specularSaturation = useMotionValue(4); // 0..50
  const refractionLevel = useMotionValue(0.7); // 0..1
  const blur = useMotionValue(1); // 0..40
  // Focus state
  const focused = useMotionValue(0);

  // Simple press interaction for a subtle breathing effect
  const pointerDown = useMotionValue(0);
  const backgroundFromPointer = useTransform(pointerDown, [0, 1], [0.05, 0.3]);
  const backgroundFromFocus = useTransform(focused, [0, 1], [0.05, 0.2]);
  const backgroundOpacity = useSpring(
    useTransform([backgroundFromPointer, backgroundFromFocus], (vals) =>
      Math.max(vals[0] as number, vals[1] as number)
    ),
    {
      damping: 80,
      stiffness: 2000,
    }
  );
  const scale = useSpring(
    useTransform(() => {
      const pd = pointerDown.get();
      const f = focused.get();
      return (f ? 1 : 0.8) * (pd ? 0.99 : 1);
    }),
    {
      damping: 40,
      stiffness: 800,
    }
  );
  // Readouts
  const specularOpacityText = useTransform(specularOpacity, (v) =>
    v.toFixed(2)
  );
  const specularSaturationText = useTransform(specularSaturation, (v) =>
    Math.round(v).toString()
  );
  const refractionLevelText = useTransform(refractionLevel, (v) =>
    v.toFixed(2)
  );
  const blurText = useTransform(blur, (v) => v.toFixed(1));

  useEffect(() => {
    const onPointerUp = () => pointerDown.set(0);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("touchend", onPointerUp);
    return () => {
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, [pointerDown]);

  // Background toggle (same visual frame as other demos)
  const [useImageBg, setUseImageBg] = useState(false);
  const containerStyle: React.CSSProperties = useImageBg
    ? {
        backgroundImage:
          'url("https://images.unsplash.com/photo-1497250681960-ef046c08a56e?q=80&w=1600&auto=format&fit=crop")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        backgroundImage:
          "linear-gradient(to right, currentColor 1px, transparent 1px)," +
          "linear-gradient(to bottom, currentColor 1px, transparent 1px)," +
          "radial-gradient(120% 100% at 10% 0%, var(--bg1), var(--bg2))",
        backgroundSize: "24px 24px, 24px 24px, 100% 100%",
        backgroundPosition: "12px 12px, 12px 12px, 0 0",
      };

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <div
        className={cn(
          "relative -ml-3.75 flex h-96 w-[calc(100%+30px)] items-center justify-center rounded-xl select-none",
          "text-black/5 [--bg1:#f8fafc] [--bg2:#e7eeef] dark:text-white/5",
          "border border-black/10 dark:border-white/10 dark:[--bg1:#1b1b22] dark:[--bg2:#0f0f14]",
          "contain-layout contain-paint contain-style [content-visibility:auto]"
        )}
        style={containerStyle}
      >
        {useImageBg && (
          <a
            href="https://unsplash.com/fr/photos/photo-de-plante-de-fougere-verte-OOE4xAnBhKo"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "absolute top-3 left-3 inline-block leading-[1.1]",
              "text-[9px] tracking-widest uppercase"
            )}
            style={{ color: "rgba(255, 255, 255, 0.4)" }}
          >
            Photo by Teemu Paananen
            <br />
            on Unsplash
          </a>
        )}
        {/* Track */}
        <motion.div
          className="relative"
          style={{ width, height, borderRadius: radius, scale }}
          onMouseDown={() => pointerDown.set(1)}
          onMouseUp={() => pointerDown.set(0)}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Filter definition */}
          <Filter
            id="searchbox-filter"
            width={width}
            height={height}
            radius={radius}
            bezelWidth={27}
            glassThickness={70}
            refractiveIndex={1.5}
            bezelHeightFn={CONVEX.fn}
            blur={blur}
            scaleRatio={refractionLevel}
            specularOpacity={specularOpacity}
            specularSaturation={specularSaturation}
          />

          {/* Glass layer */}
          <motion.div
            className="absolute inset-0"
            style={{
              borderRadius: radius,
              backdropFilter: `url(#searchbox-filter)`,
              backgroundColor: useTransform(
                () => `rgba(255, 255, 255, ${backgroundOpacity.get()})`
              ),
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.16)",
              transform: "translateZ(0)", // Create a new layer to improve performance
            }}
          />

          {/* Content overlay */}
          <div
            className={cn(
              "absolute inset-0 flex items-center gap-3 px-5",
              useImageBg ? "text-white/90" : "text-black/90 dark:text-white/90"
            )}
            style={{ borderRadius: radius, zIndex: 1 }}
          >
            <IoSearch
              className="shrink-0 opacity-70"
              size={20}
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              type="search"
              placeholder="Search"
              aria-label="Search"
              className={cn(
                "min-w-0 flex-1 border-0 bg-transparent text-[15px] leading-none outline-none select-text selection:bg-blue-500/30 selection:text-inherit",
                useImageBg
                  ? "text-white/70"
                  : "text-black/70 dark:text-white/70"
              )}
              style={{ padding: 0 }}
              onFocus={() => focused.set(1)}
              onBlur={() => focused.set(0)}
              onMouseDown={(e) => {
                if (focused.get() === 0) e.preventDefault();
              }}
            />
          </div>
        </motion.div>

        {/* Toggle control */}
        <label
          className={cn(
            "absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-md px-2 py-1 text-xs backdrop-blur dark:text-white/80",
            useImageBg
              ? "bg-black/10 text-white/90"
              : "bg-white/10 text-black/90 dark:bg-black/10 dark:text-white/90"
          )}
        >
          <input
            type="checkbox"
            checked={useImageBg}
            onChange={(e) => setUseImageBg(e.target.checked)}
            className="accent-blue-600"
          />
          Use image background
        </label>
      </div>

      {/* Parameters controls (MotionValue-driven; no React state) */}
      <div className="mt-8 space-y-3 text-black/80 dark:text-white/80">
        <div className="flex items-center gap-4">
          <div className="text-[10px] tracking-[0.14em] uppercase opacity-70 select-none">
            Parameters
          </div>
          <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
        </div>

        {/* Specular Opacity */}
        <div className="flex items-center gap-4">
          <label className="w-56 text-[11px] leading-[1.2] tracking-[0.08em] uppercase opacity-80 select-none">
            Specular Opacity
          </label>
          <motion.span className="w-14 text-right font-mono text-[11px] text-black/60 tabular-nums dark:text-white/60">
            {specularOpacityText}
          </motion.span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            defaultValue={specularOpacity.get()}
            onInput={(e) =>
              specularOpacity.set(parseFloat(e.currentTarget.value))
            }
            className="h-0.5 flex-1 appearance-none rounded bg-black/20 outline-none dark:bg-white/20"
            aria-label="Specular Opacity"
          />
        </div>

        {/* Specular Saturation */}
        <div className="flex items-center gap-4">
          <label className="w-56 text-[11px] leading-[1.2] tracking-[0.08em] uppercase opacity-80 select-none">
            Specular Saturation
          </label>
          <motion.span className="w-14 text-right font-mono text-[11px] text-black/60 tabular-nums dark:text-white/60">
            {specularSaturationText}
          </motion.span>
          <input
            type="range"
            min={0}
            max={50}
            step={1}
            defaultValue={specularSaturation.get()}
            onInput={(e) =>
              specularSaturation.set(parseFloat(e.currentTarget.value))
            }
            className="h-0.5 flex-1 appearance-none rounded bg-black/20 outline-none dark:bg-white/20"
            aria-label="Specular Saturation"
          />
        </div>

        {/* Refraction Level */}
        <div className="flex items-center gap-4">
          <label className="w-56 text-[11px] leading-[1.2] tracking-[0.08em] uppercase opacity-80 select-none">
            Refraction Level
          </label>
          <motion.span className="w-14 text-right font-mono text-[11px] text-black/60 tabular-nums dark:text-white/60">
            {refractionLevelText}
          </motion.span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            defaultValue={refractionLevel.get()}
            onInput={(e) =>
              refractionLevel.set(parseFloat(e.currentTarget.value))
            }
            className="h-0.5 flex-1 appearance-none rounded bg-black/20 outline-none dark:bg-white/20"
            aria-label="Refraction Level"
          />
        </div>

        {/* Blur Level */}
        <div className="flex items-center gap-4">
          <label className="w-56 text-[11px] leading-[1.2] tracking-[0.08em] uppercase opacity-80 select-none">
            Blur Level
          </label>
          <motion.span className="w-14 text-right font-mono text-[11px] text-black/60 tabular-nums dark:text-white/60">
            {blurText}
          </motion.span>
          <input
            type="range"
            min={0}
            max={40}
            step={0.1}
            defaultValue={blur.get()}
            onInput={(e) => blur.set(parseFloat(e.currentTarget.value))}
            className="h-0.5 flex-1 appearance-none rounded bg-black/20 outline-none dark:bg-white/20"
            aria-label="Blur Level"
          />
        </div>
      </div>
    </>
  );
};
