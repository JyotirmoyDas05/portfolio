"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  IoEllipsisHorizontal,
  IoListOutline,
  IoPause,
  IoPlay,
  IoPlayBack,
  IoPlayForward,
  IoRadioOutline,
  IoRepeatOutline,
  IoSearch,
  IoShuffleOutline,
  IoVolumeHighOutline,
} from "react-icons/io5";

import { Filter } from "../components/Filter";
import { CONVEX } from "../lib/surfaceEquations";

type Album = {
  collectionId: number;
  collectionName: string;
  artworkUrl100: string;
  artistName: string;
};

function upscaleArtwork(url: string, size = 600) {
  return url.replace(/\/[0-9]+x[0-9]+bb\.(jpg|png)$/i, `/${size}x${size}bb.$1`);
}

function useIsMobileView() {
  const [isMobile, setIsMobile] = useState(false);
  useLayoutEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 700);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export const MixedUI: React.FC = () => {
  const [query, setQuery] = useState("Arijit Singh");
  const [isPlaying, setIsPlaying] = useState(true);
  const isMobile = useIsMobileView();

  // Interactive controls (MotionValues only)
  const specularSaturation = useMotionValue(6);
  const specularOpacity = useMotionValue(0.4);
  const refractionLevel = useMotionValue(1);
  const blur = useMotionValue(1);
  const progressiveBlurStrength = useMotionValue(1);
  const glassBackgroundOpacity = useMotionValue(0.6);
  const colorScheme = useMotionValue<"light" | "dark">("light");

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useScroll({
    container: scrollContainerRef,
  });

  const scrollDistanceToBottom = useTransform(() => {
    const y = scrollY.get();
    const progress = scrollYProgress.get();
    return (1 - progress) * (y / progress);
  });

  const bottomGradientOpacity = useTransform(() => {
    const distanceToBottom = scrollDistanceToBottom.get();
    if (distanceToBottom < 200) {
      return distanceToBottom / 200;
    }
    return 1;
  });

  const topGradientOpacity = useTransform(() => {
    return Math.min(1, scrollY.get() / 100);
  });

  const searchboxShadowOpacity = useTransform(
    scrollY,
    (scrollYValue: number) => {
      return Math.min(1, 0.2 + (scrollYValue / 200) * 0.8);
    }
  );

  const playerShadowOpacity = useTransform(
    scrollDistanceToBottom,
    (distanceToBottom) => {
      return Math.min(1, 0.2 + (distanceToBottom / 300) * 0.8);
    }
  );

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => colorScheme.set(mq.matches ? "dark" : "light");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [colorScheme]);

  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch albums when query changes
  useEffect(() => {
    const controller = new AbortController();

    const fetchAlbums = async () => {
      if (!query.trim()) {
        setAlbums([]);
        return;
      }

      setLoading(true);
      const url = new URL("https://itunes.apple.com/search");
      url.searchParams.set("term", query);
      url.searchParams.set("entity", "album");
      url.searchParams.set("limit", "100");

      try {
        const res = await fetch(url.toString(), { signal: controller.signal });
        const data = (await res.json()) as { results?: Album[] };
        setAlbums(data?.results ?? []);
      } catch {
        if (!controller.signal.aborted) {
          setAlbums([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchAlbums();
    return () => controller.abort();
  }, [query]);

  // Searchbox glass params
  const sbHeight = 42;
  const sbWidth = 320;
  const sbRadius = sbHeight / 2;

  // Player dimensions
  const playerWidthDesktop = 640;
  const playerHeightDesktop = 63;
  const playerWidthMobile = 320;
  const playerHeightMobile = 54;
  const playerWidth = isMobile ? playerWidthMobile : playerWidthDesktop;
  const playerHeight = isMobile ? playerHeightMobile : playerHeightDesktop;
  const playerBottomOffset = 24;
  const playerExtraBreathingRoom = 24;
  const listBottomPadding =
    playerHeightDesktop + playerBottomOffset + playerExtraBreathingRoom;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const pointerDown = useMotionValue(0);
  const focused = useMotionValue(0);

  const uiScale = useSpring(useTransform(focused, [0, 1], [0.9, 1]), {
    damping: 34,
    stiffness: 800,
  });

  return (
    <div className="not-prose">
      <motion.div
        className="relative -ml-4.75 h-160 max-h-[70vh] w-[calc(100%+38px)] overflow-hidden rounded-xl border border-black/15 bg-white text-black/5 contain-layout contain-paint contain-style select-none [--glass-rgb:#FFFFFF] [contain-intrinsic-size:640px] [content-visibility:auto] dark:border-white/15 dark:bg-black dark:text-white/5 dark:[--glass-rgb:#222222]"
        style={
          {
            "--glass-bg-alpha": useTransform(
              glassBackgroundOpacity,
              (x) => `${Math.round(x * 100)}%`
            ),
          } as React.CSSProperties
        }
      >
        {/* Albums grid layer */}
        <div
          ref={scrollContainerRef}
          className="absolute inset-0 z-0 overflow-y-auto px-6"
          style={{
            paddingTop: sbHeight + 42,
            paddingBottom: listBottomPadding,
          }}
        >
          {albums.length ? (
            <h3 className="mb-5 text-xl text-black select-none dark:text-white">
              Top Results
            </h3>
          ) : (
            <div className="mb-5 flex h-[90%] items-center justify-center text-black/40 dark:text-white/40">
              {loading ? "Loading..." : "No results"}
            </div>
          )}
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-4">
            {albums.map((item) => (
              <div
                key={item.collectionId}
                className="group flex cursor-pointer flex-col"
                role="button"
                tabIndex={0}
                onClick={() => setCurrentAlbum(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setCurrentAlbum(item);
                  }
                }}
                aria-label={`Play ${item.collectionName}`}
              >
                <div className="relative aspect-square overflow-hidden rounded-lg bg-black/5 transition-transform duration-200 ease-out group-hover:scale-[1.03] group-active:scale-97 dark:bg-white/5">
                  <img
                    src={upscaleArtwork(item.artworkUrl100)}
                    alt={item.collectionName}
                    className="absolute inset-0 h-full w-full object-cover"
                    draggable={false}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <IoPlay
                      size={46}
                      className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] transition-transform group-active:scale-80"
                    />
                  </div>
                </div>
                <div className="mt-2 line-clamp-2 text-[11px] leading-snug tracking-[0.06em] text-black/70 uppercase dark:text-white/70">
                  {item.collectionName}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top searchbox overlay */}
        <motion.div
          className="absolute top-6 left-1/2 z-10 -translate-x-1/2"
          style={{
            width: sbWidth,
            height: sbHeight,
            scale: uiScale,
          }}
          onMouseDown={() => {
            pointerDown.set(1);
            inputRef.current?.focus();
          }}
          onMouseUp={() => pointerDown.set(0)}
        >
          <Filter
            id="mixed-ui-search-filter"
            width={sbWidth}
            height={sbHeight}
            radius={sbRadius}
            bezelWidth={18}
            glassThickness={100}
            refractiveIndex={1.3}
            bezelHeightFn={CONVEX.fn}
            blur={blur}
            scaleRatio={refractionLevel}
            specularOpacity={specularOpacity}
            specularSaturation={specularSaturation}
          />

          <motion.div
            className="absolute inset-0 bg-(--glass-rgb)/(--glass-bg-alpha)"
            style={{
              borderRadius: sbRadius,
              backdropFilter: `url(#mixed-ui-search-filter)`,
              boxShadow: useTransform(
                () =>
                  `0 4px 20px rgba(0, 0, 0, ${
                    0.4 * searchboxShadowOpacity.get()
                  })`
              ),
            }}
          />

          <div
            className="absolute inset-0 flex items-center gap-3 px-3.5"
            style={{ borderRadius: sbRadius, zIndex: 1 }}
          >
            <IoSearch
              className="shrink-0 text-black/60 dark:text-white/50"
              size={22}
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              type="search"
              placeholder="Search albums"
              aria-label="Search albums"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => focused.set(1)}
              onBlur={() => focused.set(0)}
              className="min-w-0 flex-1 border-0 bg-transparent text-[16px] leading-none text-black/80 placeholder-black/40 outline-none select-text selection:bg-blue-500/30 selection:text-inherit dark:text-white/80 dark:placeholder-white/40"
              style={{ padding: 0 }}
            />
          </div>
        </motion.div>

        {/* Top gradient overlay */}
        <motion.div className="pointer-events-none absolute top-0 left-0 h-32 w-full overflow-hidden">
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 h-full bg-linear-to-b from-(--glass-rgb)/40 to-transparent dark:from-(--glass-rgb)/60"
            style={{
              opacity: topGradientOpacity,
            }}
          />
        </motion.div>

        {/* Bottom player overlay */}
        <div
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
          style={{ width: playerWidth, height: playerHeight }}
        >
          <Filter
            id="mixed-ui-player-filter"
            width={playerWidth}
            height={playerHeight}
            radius={playerHeight / 2}
            bezelWidth={29}
            glassThickness={90}
            refractiveIndex={1.3}
            bezelHeightFn={CONVEX.fn}
            blur={blur}
            scaleRatio={refractionLevel}
            specularOpacity={specularOpacity}
            specularSaturation={specularSaturation}
          />

          <motion.div
            className="absolute inset-0 bg-(--glass-rgb)/(--glass-bg-alpha)"
            style={{
              borderRadius: 34,
              backdropFilter: `url(#mixed-ui-player-filter)`,
              boxShadow: useTransform(
                () =>
                  `0 4px 19px rgba(0, 0, 0, ${0.4 * playerShadowOpacity.get()})`
              ),
            }}
          />

          {/* Player content */}
          <div
            className="pointer-events-auto absolute inset-0 flex items-center gap-4 px-6"
            style={{ borderRadius: 34 }}
          >
            {/* Left controls */}
            <div className="flex items-center gap-3 text-black/80 dark:text-white/80">
              {!isMobile && (
                <>
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center justify-center rounded-full p-1 transition-transform duration-150 ease-out hover:scale-110 focus:outline-none active:scale-90"
                    aria-label="Shuffle"
                  >
                    <IoShuffleOutline size={18} className="opacity-70" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center justify-center rounded-full p-1 transition-transform duration-150 ease-out hover:scale-110 focus:outline-none active:scale-90"
                    aria-label="Previous"
                  >
                    <IoPlayBack size={20} />
                  </button>
                </>
              )}
              {(!!currentAlbum || !isMobile) && (
                <>
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 transition-transform duration-150 ease-out hover:scale-110 focus:outline-none active:scale-90"
                    onClick={() => setIsPlaying((v) => !v)}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <IoPause size={29} /> : <IoPlay size={29} />}
                  </button>
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center justify-center rounded-full p-1 transition-transform duration-150 ease-out hover:scale-110 focus:outline-none active:scale-90"
                    aria-label="Next"
                  >
                    <IoPlayForward size={20} />
                  </button>
                </>
              )}
              {!isMobile && (
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center justify-center rounded-full p-1 transition-transform duration-150 ease-out hover:scale-110 focus:outline-none active:scale-90"
                  aria-label="Repeat"
                >
                  <IoRepeatOutline size={18} className="opacity-70" />
                </button>
              )}
            </div>

            {/* Now playing */}
            {!currentAlbum ? (
              <div className="flex min-w-0 flex-1 items-center justify-center">
                <div className="text-sm text-black/40 dark:text-white/40">
                  Select an album
                </div>
              </div>
            ) : (
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded bg-black/10 dark:bg-white/10">
                  <img
                    src={upscaleArtwork(currentAlbum.artworkUrl100, 200)}
                    alt={currentAlbum.collectionName}
                    className="h-full w-full object-cover"
                    draggable={false}
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-[14px] leading-[1.3] font-semibold text-black/90 dark:text-white/90">
                    {currentAlbum?.collectionName ?? "\u00A0"}
                  </div>
                  <div className="truncate text-[11px] leading-[1.3] text-black/60 dark:text-white/60">
                    {currentAlbum?.artistName ?? "\u00A0"}
                  </div>
                  <div className="mt-1 h-0.75 w-115 max-w-full rounded bg-black/10 dark:bg-white/10">
                    <div className="h-full w-1/3 rounded bg-black/40 dark:bg-white/40" />
                  </div>
                </div>
              </div>
            )}

            {/* Right actions */}
            {!isMobile && (
              <div className="flex items-center gap-4 text-black/80 dark:text-white/80">
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center justify-center rounded-full p-1 transition-transform duration-150 ease-out hover:scale-110 focus:outline-none active:scale-90"
                  aria-label="More Options"
                >
                  <IoEllipsisHorizontal size={20} className="opacity-80" />
                </button>
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center justify-center rounded-full p-1 transition-transform duration-150 ease-out hover:scale-110 focus:outline-none active:scale-90"
                  aria-label="List"
                >
                  <IoListOutline size={18} className="opacity-70" />
                </button>
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center justify-center rounded-full p-1 transition-transform duration-150 ease-out hover:scale-110 focus:outline-none active:scale-90"
                  aria-label="Radio"
                >
                  <IoRadioOutline size={18} />
                </button>
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center justify-center rounded-full p-1 transition-transform duration-150 ease-out hover:scale-110 focus:outline-none active:scale-90"
                  aria-label="Volume"
                >
                  <IoVolumeHighOutline size={22} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom gradient overlay */}
        <motion.div
          className="pointer-events-none absolute bottom-0 left-0 h-32 w-full overflow-hidden"
          style={{
            opacity: bottomGradientOpacity,
          }}
        >
          <motion.div className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-linear-to-t from-black/10 to-transparent dark:from-black/60" />
        </motion.div>
      </motion.div>

      {/* Parameters controls */}
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
            {useTransform(specularOpacity, (v) => v.toFixed(2))}
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
            {useTransform(specularSaturation, (v) => Math.round(v).toString())}
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
            {useTransform(refractionLevel, (v) => v.toFixed(2))}
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
            {useTransform(blur, (v) => v.toFixed(1))}
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

        {/* Progressive Blur Strength */}
        <div className="flex items-center gap-4">
          <label className="w-56 text-[11px] leading-[1.2] tracking-[0.08em] uppercase opacity-80 select-none">
            Progressive Blur Strength
          </label>
          <motion.span className="w-14 text-right font-mono text-[11px] text-black/60 tabular-nums dark:text-white/60">
            {useTransform(progressiveBlurStrength, (v) => v.toFixed(2))}
          </motion.span>
          <input
            type="range"
            min={0}
            max={10}
            step={0.01}
            defaultValue={progressiveBlurStrength.get()}
            onInput={(e) =>
              progressiveBlurStrength.set(parseFloat(e.currentTarget.value))
            }
            className="h-0.5 flex-1 appearance-none rounded bg-black/20 outline-none dark:bg-white/20"
            aria-label="Progressive Blur Strength"
          />
        </div>

        {/* Glass Background Opacity */}
        <div className="flex items-center gap-4">
          <label className="w-56 text-[11px] leading-[1.2] tracking-[0.08em] uppercase opacity-80 select-none">
            Glass Background Opacity
          </label>
          <motion.span className="w-14 text-right font-mono text-[11px] text-black/60 tabular-nums dark:text-white/60">
            {useTransform(glassBackgroundOpacity, (v) => v.toFixed(2))}
          </motion.span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            defaultValue={glassBackgroundOpacity.get()}
            onInput={(e) =>
              glassBackgroundOpacity.set(parseFloat(e.currentTarget.value))
            }
            className="h-0.5 flex-1 appearance-none rounded bg-black/20 outline-none dark:bg-white/20"
            aria-label="Glass Background Opacity"
          />
        </div>
      </div>
    </div>
  );
};
