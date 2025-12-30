"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ViewTransition } from "react";

import { Filter } from "../components/Filter";
import { CONVEX } from "../lib/surfaceEquations";

const imageUrl =
  "https://images.unsplash.com/photo-1688494930098-e88c53c26e3a?auto=format&q=80&fit=crop&w=1400&h=1600&crop=focalpoint&fp-x=0.3&fp-y=0.5&fp-z=1";
const imageUrlMiddle =
  "https://images.unsplash.com/photo-1688494930098-e88c53c26e3a?auto=format&q=80&fit=crop&w=400&h=700&crop=focalpoint&fp-x=0.3&fp-y=0.6&fp-z=1.9";

export const ParallaxImageHero: React.FC = () => {
  const filterId = "parallax-image-hero-filter";

  // Parallax
  const parallaxSpeed = -0.25;
  const { scrollY } = useScroll();
  const backgroundParallaxOffset = useTransform(
    scrollY,
    (v) => Math.min(800, v) * parallaxSpeed
  );

  // Glass preset
  const specularOpacity = 0.2;
  const specularSaturation = 6;

  // Filter dimensions
  const width = 150;
  const height = 150;
  const radius = 75;

  return (
    <ViewTransition name="post-image-liquid-glass-article">
      <div className="not-prose">
        <motion.div
          className="relative flex h-100 w-full items-center justify-center overflow-hidden rounded-xl bg-slate-600/20 contain-layout contain-paint contain-style [contain-intrinsic-size:400px] [content-visibility:auto]"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundPositionY: useTransform(
              () => -60 + backgroundParallaxOffset.get()
            ),
          }}
        >
          {/* Firefox-compatible: apply filter to an SVG <image> overlay instead of CSS filter */}
          <svg
            className="absolute top-1/2 left-1/2 h-50 w-50 -translate-x-1/2 -translate-y-1/2 transform overflow-hidden"
            viewBox="0 0 150 150"
            preserveAspectRatio="xMidYMid slice"
            colorInterpolationFilters="sRGB"
            style={{
              pointerEvents: "none",
              borderRadius: "100px",
              boxShadow: "0 16px 31px rgba(0,0,0,0.4)",
            }}
          >
            <Filter
              id={filterId}
              width={width}
              height={height}
              radius={radius}
              bezelWidth={40}
              glassThickness={120}
              refractiveIndex={1.5}
              bezelHeightFn={CONVEX.fn}
              blur={0}
              specularOpacity={specularOpacity}
              specularSaturation={specularSaturation}
              withSvgWrapper={false}
            />
            <g filter={`url(#${filterId})`}>
              <motion.image
                href={imageUrlMiddle}
                width="200px"
                style={{
                  x: -29,
                  y: useTransform(
                    () => 13 + backgroundParallaxOffset.get() * 0.75
                  ),
                }}
              />
            </g>
          </svg>
        </motion.div>
        {/* Credit: Unsplash (conventional wording) */}
        <div className="mt-0.5 mr-1.5 text-right">
          <a
            href="https://unsplash.com/photos/a-black-and-pink-abstract-background-with-curves-wRuhOOaG-Z4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[10px] tracking-[0.2em] text-slate-500 uppercase hover:text-slate-700 md:text-xs"
          >
            Photo by Martin Martz on Unsplash
          </a>
        </div>
      </div>
    </ViewTransition>
  );
};
