"use client";

import type { Transition } from "motion/react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useId, useRef } from "react";

import { useSound } from "@/hooks/use-sound";

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 18,
  stiffness: 200,
};

export function TactileLogo() {
  const id = useId();
  const ids = {
    facePattern: `jd-face-pattern-${id}`,
    faceFill: `jd-face-fill-${id}`,
    stroke: `jd-stroke-${id}`,
    backStroke: `jd-back-stroke-${id}`,
    radialGradient: `jd-radial-gradient-${id}`,
  };

  const ref = useRef<SVGSVGElement>(null);
  const playClick = useSound("/audio/ui-sounds/click.wav");

  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { margin: "80px" });

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // cx/cy range matches the 556×354 viewBox (centered at x=43)
  const cx = useSpring(useTransform(mouseX, [0, 1], [43, 599]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  });

  const cy = useSpring(useTransform(mouseY, [0, 1], [0, 354]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  });

  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion, isInView, mouseX, mouseY]);

  return (
    <motion.svg
      ref={ref}
      className="h-auto w-full touch-manipulation overflow-visible [--pattern:color-mix(in_oklab,var(--foreground)_12%,var(--background))] [--stroke:color-mix(in_oklab,var(--foreground)_16%,var(--background))]"
      viewBox="43 0 556 354"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      initial="normal"
      whileTap="pressed"
      onTap={() => playClick(0.5)}
    >
      <defs>
        <pattern
          id={ids.facePattern}
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2"
            stroke="var(--pattern)"
            strokeWidth="1"
          />
        </pattern>

        <motion.g
          id={ids.faceFill}
          variants={{
            normal: { transform: "translate(0px, 0px)" },
            pressed: { transform: "translate(0px, 16px)" },
          }}
          transition={transition}
        >
          {/* J unified face */}
          <path
            d="M364.50 238.44L198.21 334.44L87.35 270.44L142.78 238.44L198.21 270.44L253.64 238.44L87.35 142.44L142.78 110.44Z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
          {/* D faces (unchanged) */}
          <path d="M388.48 32.58L277.63 96.58L388.48 160.58L499.33 96.58L554.76 128.58L388.48 224.58L166.78 96.58L333.05 0.58L388.48 32.58Z" />
          <path d="M554.76 64.58L499.33 96.58L388.48 32.58L443.90 0.58L554.76 64.58Z" />
        </motion.g>

        <motion.path
          id={ids.backStroke}
          variants={{
            normal: {
              d: [
                // J — bottom wall edges
                "M87.35 174.44 L309.07 302.44",
                "M309.07 302.44 L364.50 270.44",
                "M87.35 302.44 L198.21 366.44",
                "M198.21 366.44 L309.07 302.44",
                // J — vertical depth lines
                "M309.07 270.44 V302.44",
                "M142.78 302.44 V334.44",
                "M253.64 238.44 V270.44",
                "M198.21 270.44 V334.44",
              ].join(" "),
            },
            pressed: {
              d: [
                // J — bottom wall edges (pressed)
                "M87.35 174.44 L309.07 302.44",
                "M309.07 302.44 L364.50 270.44",
                "M87.35 302.44 L198.21 366.44",
                "M198.21 366.44 L309.07 302.44",
                // J — vertical depth lines (pressed)
                "M309.07 286.44 V302.44",
                "M142.78 318.44 V334.44",
                "M253.64 254.44 V270.44",
                "M198.21 286.44 V350.44",
              ].join(" "),
            },
          }}
          transition={transition}
        />

        <motion.path
          id={ids.stroke}
          variants={{
            normal: {
              d: [
                // J — top face outline (single closed loop)
                "M364.50 238.44 L198.21 334.44 L87.35 270.44 L142.78 238.44 L198.21 270.44 L253.64 238.44 L87.35 142.44 L142.78 110.44 Z",
                // J — vertical depth lines
                "M87.35 142.44 V174.44",
                "M364.50 238.44 V270.44",
                "M87.35 270.44 V302.44",
                "M198.21 334.44 V366.44",
                // D outline (normal, unchanged)
                "M499.33 96.58 L554.76 128.58 V160.58 L388.48 256.58 L166.78 128.58 V96.58 L333.05 0.58 L499.33 96.58",
                "M166.78 96.58 L388.48 224.58 L554.76 128.58",
                "M527.04 112.58 L554.76 96.58 V64.58 L443.90 0.58 L277.63 96.58 L388.48 160.58 L554.76 64.58",
                "M305.34 112.58 L388.48 64.58 L471.62 112.58",
                "M388.48 224.58 V256.58",
                "M388.48 32.58 V64.58",
              ].join(" "),
            },
            pressed: {
              d: [
                // J — top face outline (pressed)
                "M364.50 254.44 L198.21 350.44 L87.35 286.44 L142.78 254.44 L198.21 286.44 L253.64 254.44 L87.35 158.44 L142.78 126.44 Z",
                // J — vertical depth lines (pressed)
                "M87.35 158.44 V174.44",
                "M364.50 254.44 V270.44",
                "M87.35 286.44 V302.44",
                "M198.21 350.44 V366.44",
                // D outline (pressed, unchanged)
                "M499.33 112.58 L554.76 144.58 V160.58 L388.48 256.58 L166.78 128.58 V112.58 L333.05 16.58 L499.33 112.58",
                "M166.78 112.58 L388.48 240.58 L554.76 144.58",
                "M513.19 120.58 L554.76 96.58 V80.58 L443.90 16.58 L277.63 112.58 L388.48 176.58 L554.76 80.58",
                "M291.48 120.58 L388.48 64.58 L485.47 120.58",
                "M388.48 240.58 V256.58",
                "M388.48 48.58 V64.58",
              ].join(" "),
            },
          }}
          transition={transition}
        />

        <motion.radialGradient
          id={ids.radialGradient}
          cx={cx}
          cy={cy}
          r="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            className="dark:[stop-color:#fff]"
            stopColor="var(--color-zinc-700)"
          />
          <stop
            className="dark:[stop-color:var(--color-zinc-600)]"
            offset="1"
            stopColor="var(--color-zinc-400)"
            stopOpacity="0"
          />
        </motion.radialGradient>
      </defs>

      <g
        stroke="var(--stroke)"
        strokeWidth="1"
        strokeDasharray="4 2"
        opacity="0.4"
      >
        <path d="M916.01 -48L136.58 402" />
        <path d="M-519.63 -48L259.79 402" />
        <path d="M-139.08 -48L640.33 402" />
      </g>

      <use
        href={`#${ids.backStroke}`}
        stroke="var(--stroke)"
        strokeWidth="1"
        fill="none"
      />
      <use
        href={`#${ids.backStroke}`}
        stroke={`url(#${ids.radialGradient})`}
        strokeWidth="1"
        fill="none"
      />

      <g className="fill-background" fillRule="evenodd" clipRule="evenodd">
        {/* J stem wall */}
        <motion.path
          variants={{
            normal: { d: "M87.35 174.44L309.07 302.44V270.44L87.35 142.44Z" },
            pressed: { d: "M87.35 174.44L309.07 302.44V286.44L87.35 158.44Z" },
          }}
          transition={transition}
        />
        {/* J hook wall */}
        <motion.path
          variants={{
            normal: { d: "M87.35 302.44L198.21 366.44V334.44L87.35 270.44Z" },
            pressed: { d: "M87.35 302.44L198.21 366.44V350.44L87.35 286.44Z" },
          }}
          transition={transition}
        />
        {/* D walls (unchanged) */}
        <motion.path
          variants={{
            normal: {
              d: "M388.48 224.58L166.78 96.58V128.58L388.48 256.58L554.76 160.58V128.58L388.48 224.58Z",
            },
            pressed: {
              d: "M388.48 240.58L166.78 112.58V128.58L388.48 256.58L554.76 160.58V144.58L388.48 240.58Z",
            },
          }}
          transition={transition}
        />
        <motion.path
          variants={{
            normal: {
              d: "M388.48 32.58L277.63 96.58V128.58L388.48 64.58L499.33 128.58L554.75 96.58V64.58L499.33 96.58L388.48 32.58Z",
            },
            pressed: {
              d: "M388.48 48.58L277.63 112.58V128.58L388.48 64.58L499.33 128.58L554.75 96.58V80.58L499.33 112.58L388.48 48.58Z",
            },
          }}
          transition={transition}
        />
      </g>

      <use href={`#${ids.faceFill}`} className="fill-background" />
      <use href={`#${ids.faceFill}`} fill={`url(#${ids.facePattern})`} />

      <use
        href={`#${ids.stroke}`}
        stroke="var(--stroke)"
        strokeWidth="1"
        fill="none"
      />
      <use
        href={`#${ids.stroke}`}
        stroke={`url(#${ids.radialGradient})`}
        strokeWidth="1"
        fill="none"
      />
    </motion.svg>
  );
}
