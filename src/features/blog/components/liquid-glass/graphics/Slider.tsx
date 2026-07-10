"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type React from "react";
import { useEffect, useRef } from "react";

import { Filter } from "../components/Filter";
import { CONVEX } from "../lib/surfaceEquations";

export const Slider: React.FC = () => {
  const min = 0;
  const max = 100;
  const value = useMotionValue(10);

  const sliderHeight = 14;
  const sliderWidth = 330;

  // Use numeric MotionValue (0/1) instead of boolean for compatibility with transforms
  const pointerDown = useMotionValue(0);
  const forceActive = useMotionValue(false);

  const isUp = useTransform((): number =>
    forceActive.get() || pointerDown.get() > 0.5 ? 1 : 0
  );

  const thumbWidth = 90;
  const thumbHeight = 60;
  const thumbRadius = 30;
  // MotionValue-based controls
  const blur = useMotionValue(0); // 0..40
  const specularOpacity = useMotionValue(0.4); // 0..1
  const specularSaturation = useMotionValue(7); // 0..50
  const refractionBase = useMotionValue(1); // 0..1
  const pressMultiplier = useTransform(isUp, [0, 1], [0.4, 0.9]);
  const scaleRatio = useSpring(
    useTransform(
      [pressMultiplier, refractionBase],
      ([m, base]) => (Number(m) || 0) * (Number(base) || 0)
    )
  );

  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const SCALE_REST = 0.6;
  const SCALE_DRAG = 1;
  const thumbWidthRest = thumbWidth * SCALE_REST;

  const scaleSpring = useSpring(
    useTransform(isUp, [0, 1], [SCALE_REST, SCALE_DRAG]),
    {
      damping: 80,
      stiffness: 2000,
    }
  );

  const backgroundOpacity = useSpring(useTransform(isUp, [0, 1], [1, 0.1]), {
    damping: 80,
    stiffness: 2000,
  });

  // End drag when releasing outside the element
  useEffect(() => {
    function onPointerUp() {
      pointerDown.set(0);
    }
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("touchend", onPointerUp);
    return () => {
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, [pointerDown]);

  // Readouts for controls UI
  const specularOpacityText = useTransform(specularOpacity, (v) =>
    v.toFixed(2)
  );
  const specularSaturationText = useTransform(specularSaturation, (v) =>
    Math.round(v).toString()
  );
  const refractionLevelText = useTransform(refractionBase, (v) => v.toFixed(2));
  const blurText = useTransform(blur, (v) => v.toFixed(1));

  return (
    <>
      <div
        className="relative -ml-3.75 flex h-96 w-[calc(100%+30px)] items-center justify-center rounded-xl border border-black/10 text-black/5 contain-layout contain-paint contain-style select-none [--bg1:#f8fafc] [--bg2:#e7eeef] [content-visibility:auto] dark:border-white/10 dark:text-white/5 dark:[--bg1:#1b1b22] dark:[--bg2:#0f0f14]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px)," +
            "linear-gradient(to bottom, currentColor 1px, transparent 1px)," +
            "radial-gradient(120% 100% at 10% 0%, var(--bg1), var(--bg2))",
          backgroundSize: "24px 24px, 24px 24px, 100% 100%",
          // Offset the grid so it doesn't align with the top/left border
          backgroundPosition: "12px 12px, 12px 12px, 0 0",
        }}
      >
        <motion.div
          style={{
            position: "relative",
            width: sliderWidth,
            height: thumbHeight,
          }}
        >
          <motion.div
            ref={trackRef}
            style={{
              display: "inline-block",
              width: sliderWidth,
              height: sliderHeight,
              left: 0,
              top: (thumbHeight - sliderHeight) / 2,
              backgroundColor: "#89898F66",
              borderRadius: sliderHeight / 2,
              position: "absolute",
              cursor: "pointer",
            }}
            onMouseDown={() => {
              pointerDown.set(1);
            }}
            onMouseUp={() => {
              pointerDown.set(0);
            }}
          >
            <div className="h-full w-full overflow-hidden rounded-full">
              <motion.div
                style={{
                  top: 0,
                  left: 0,
                  height: sliderHeight,
                  width: useTransform(value, (v) => `${v}%`),
                  borderRadius: 6,
                  backgroundColor: "#0377F7",
                }}
              />
            </div>
          </motion.div>

          <Filter
            id="thumb-filter-slider"
            width={thumbWidth}
            height={thumbHeight}
            radius={thumbRadius}
            bezelWidth={16}
            glassThickness={80}
            refractiveIndex={1.45}
            bezelHeightFn={CONVEX.fn}
            blur={blur}
            scaleRatio={scaleRatio}
            specularOpacity={specularOpacity}
            specularSaturation={specularSaturation}
          />

          <motion.div
            ref={thumbRef}
            drag="x"
            dragConstraints={{
              left: -thumbWidthRest / 3,
              right: sliderWidth - thumbWidth + thumbWidthRest / 3,
            }}
            dragElastic={0.02}
            onMouseDown={() => {
              pointerDown.set(1);
            }}
            onMouseUp={() => {
              pointerDown.set(0);
            }}
            onDragStart={() => {
              pointerDown.set(1);
            }}
            onDrag={() => {
              const track = trackRef.current!.getBoundingClientRect();
              const thumb = thumbRef.current!.getBoundingClientRect();

              const x0 = track.left + thumbWidthRest / 2;
              const x100 = track.right - thumbWidthRest / 2;

              const trackInsideWidth = x100 - x0;

              const thumbCenterX = thumb.left + thumb.width / 2;

              const x = Math.max(x0, Math.min(x100, thumbCenterX));
              const ratio = (x - x0) / trackInsideWidth;

              value.set(
                Math.max(min, Math.min(max, ratio * (max - min) + min))
              );
            }}
            onDragEnd={() => {
              pointerDown.set(0);
            }}
            dragMomentum={false}
            className="absolute"
            style={{
              height: thumbHeight,
              width: thumbWidth,
              top: 0,
              borderRadius: thumbRadius,
              backdropFilter: `url(#thumb-filter-slider)`,
              scale: scaleSpring,
              cursor: "pointer",

              backgroundColor: useTransform(
                backgroundOpacity,
                (op) => `rgba(255, 255, 255, ${op})`
              ),
              boxShadow: "0 3px 14px rgba(0,0,0,0.1)",
            }}
          />
        </motion.div>

        {/* Toggle control */}
        <label className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-md bg-white/10 px-2 py-1 text-xs text-black/80 backdrop-blur dark:bg-black/10 dark:text-white/80">
          <input
            type="checkbox"
            defaultChecked={forceActive.get()}
            onChange={(e) => forceActive.set(e.currentTarget.checked)}
            className="accent-blue-600"
          />
          Force active
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
            defaultValue={refractionBase.get()}
            onInput={(e) =>
              refractionBase.set(parseFloat(e.currentTarget.value))
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
