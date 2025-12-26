"use client";

import { ChevronUpIcon, XIcon } from "lucide-react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type MotionValue,
  type Transition,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { type RefObject, useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

// =============================================================================
// Types
// =============================================================================

export interface TOCItem {
  /** Display name of the item */
  name: string;
  /** Optional value for filtering. If undefined, this is an "All" option */
  value?: string;
}

export interface DynamicScrollIslandTOCProps {
  /** Array of TOC items */
  data: TOCItem[];
  /** Currently selected item */
  value?: TOCItem;
  /** Callback when selection changes */
  setValue?: (v: TOCItem) => void;
  /** Ref to the scrollable container to track progress */
  containerRef?: RefObject<HTMLElement | null>;
  /** Custom transition settings */
  transition?: Transition;
  /** Additional CSS classes */
  className?: string;
  /** Layout ID prefix for nested instances */
  layoutPrefix?: string;
}

// =============================================================================
// Constants
// =============================================================================

const CONTAINER_LAYOUT_ID = "toc-wrapper";
const ITEMS_LAYOUT_ID = "toc-items";

// =============================================================================
// Sub-components
// =============================================================================

function ProgressIndicator({
  value,
  setValue,
  scrollProgress,
  layoutPrefix,
}: {
  value?: TOCItem;
  setValue?: (v: TOCItem) => void;
  scrollProgress: MotionValue<number>;
  layoutPrefix?: string;
}) {
  const [progress, setProgress] = useState(() =>
    Math.round(scrollProgress.get() * 100)
  );

  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (v) =>
      setProgress(Math.round(v * 100))
    );
    return () => unsubscribe();
  }, [scrollProgress]);

  const handleReset = (e: React.MouseEvent) => {
    if (value?.value == null) return;
    e.stopPropagation();
    setValue?.({ name: "All" });
  };

  return (
    <motion.button
      layoutId={`${layoutPrefix}-toc-progress-x`}
      onClick={handleReset}
      className={cn(
        "relative flex h-8 w-14 items-center justify-center overflow-hidden rounded-full text-sm font-bold",
        "bg-white/10 transition-colors hover:bg-white/15"
      )}
    >
      {value?.value ? <XIcon className="size-4" /> : `${progress}%`}
    </motion.button>
  );
}

function ItemsList({
  data,
  setValue,
}: {
  data: TOCItem[];
  setValue?: (v: TOCItem) => void;
}) {
  return (
    <div className="group grid transition-opacity">
      {data.map((item) => (
        <button
          key={item.name}
          onClick={() => setValue?.(item)}
          aria-label={item.name}
          className="cursor-pointer text-left font-semibold text-white/80 transition-all group-hover:opacity-40 hover:opacity-100!"
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

function ProgressText({
  open,
  value,
  scrollProgress,
  layoutPrefix,
}: {
  open: boolean;
  value?: TOCItem;
  scrollProgress: MotionValue<number>;
  layoutPrefix?: string;
}) {
  const circumference = 2 * Math.PI * 10 - 0.5;
  const offset = useTransform(scrollProgress, [0, 1], [circumference, 0]);
  const springOffset = useSpring(offset, { visualDuration: 0.1, bounce: 0 });

  return (
    <div className="flex items-center gap-3">
      <motion.div layoutId={`${layoutPrefix}-toc-svg-progress`}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            className="stroke-white/20"
            strokeWidth="4"
            fill="none"
          />
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            className="stroke-white/80"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={springOffset}
            strokeLinecap="round"
            transform="rotate(-90 12 12)"
          />
        </svg>
      </motion.div>
      <div className="flex items-center gap-2">
        <motion.p
          layout="position"
          layoutId={`${layoutPrefix}-toc-text`}
          className="font-bold"
        >
          {value?.name}
        </motion.p>
        <motion.div className="mt-0.5 text-white/80">
          <motion.div
            layout="position"
            layoutId={`${layoutPrefix}-toc-chevron`}
            animate={{ rotate: open ? 0 : 180 }}
          >
            <ChevronUpIcon className="size-4" strokeWidth={3} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// =============================================================================
// Main Component
// =============================================================================

function DynamicScrollIslandTOC({
  data,
  value: externalValue,
  setValue: externalSetValue,
  containerRef,
  className,
  layoutPrefix = "",
  transition = { type: "spring", duration: 0.5, bounce: 0.1 },
}: DynamicScrollIslandTOCProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(externalValue ?? data[0]);
  const scrollProgress = useMotionValue(0);

  const value = externalValue ?? internalValue;

  // Track scroll progress
  useEffect(() => {
    const container = containerRef?.current || window;

    const updateScrollProgress = () => {
      const scrollTop =
        container === window
          ? window.scrollY
          : (container as HTMLElement).scrollTop;
      const scrollHeight =
        container === window
          ? document.body.scrollHeight
          : (container as HTMLElement).scrollHeight;
      const clientHeight =
        container === window
          ? window.innerHeight
          : (container as HTMLElement).clientHeight;

      const progress = scrollTop / (scrollHeight - clientHeight) || 0;

      if (scrollHeight === clientHeight) scrollProgress.set(1);
      else scrollProgress.set(progress);
    };

    container.addEventListener("scroll", updateScrollProgress);

    const resizeObserver = new ResizeObserver(updateScrollProgress);
    resizeObserver.observe(
      container === window
        ? document.body
        : ((container as HTMLElement).firstChild as HTMLElement)
    );

    return () => {
      container.removeEventListener("scroll", updateScrollProgress);
      resizeObserver.disconnect();
    };
  }, [containerRef, scrollProgress]);

  // Helper function to reset scroll position
  const resetScrollPosition = useCallback(() => {
    const containerElement = containerRef?.current;
    if (containerElement) {
      containerElement.scrollTop = 0; // eslint-disable-line
      containerElement.dispatchEvent(new Event("scroll"));
    } else {
      window.scrollTo(0, 0);
      window.dispatchEvent(new Event("scroll"));
    }
  }, [containerRef]);

  // Handle closing the menu (with optional scroll reset)
  const handleClose = useCallback(
    (resetScroll = false) => {
      if (resetScroll) {
        resetScrollPosition();
      }
      setOpen(false);
    },
    [resetScrollPosition]
  );

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  function handleSelect(item: TOCItem) {
    setInternalValue(item);
    externalSetValue?.(item);
    resetScrollPosition();
    setOpen(false);
  }

  const sharedProps = {
    data,
    open,
    value,
    setValue: handleSelect,
    scrollProgress,
    layoutPrefix,
  };

  return (
    <MotionConfig transition={transition}>
      {/* Backdrop */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            role="button"
            aria-label="Close"
            onClick={() => handleClose()}
            className="fixed inset-0 z-10 bg-background/10 backdrop-blur-xs"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          />
        )}
      </AnimatePresence>

      <div
        className={cn(
          "relative z-20 cursor-pointer select-none",
          "[--height-opened:150px] [--width-opened:350px] [--width:220px]",
          "text-white/80",
          className
        )}
      >
        {/* Collapsed State */}
        <motion.div
          role="button"
          aria-label="Open"
          tabIndex={0}
          onClick={() => setOpen((prev) => !prev)}
          layoutId={`${layoutPrefix}-${CONTAINER_LAYOUT_ID}`}
          style={{ borderRadius: 24 }}
          className={cn(
            "relative flex h-10 cursor-pointer items-center overflow-hidden px-1 outline-hidden!",
            "min-w-(--width) bg-zinc-900"
          )}
        >
          <div className="absolute top-0 left-1/2 h-full w-[calc(var(--width-opened)-50px)] -translate-x-1/2">
            <motion.div
              layoutId={`${layoutPrefix}-${ITEMS_LAYOUT_ID}`}
              layout="position"
              className="h-full w-full"
            />
          </div>

          <div className="w-full">
            <ProgressText {...sharedProps} />
          </div>
          <div className="absolute top-0 right-0 bottom-0 flex items-center pr-1">
            <ProgressIndicator {...sharedProps} />
          </div>
        </motion.div>

        {/* Expanded State */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2">
          <AnimatePresence mode="popLayout" initial={false}>
            {open && (
              <motion.div
                role="button"
                aria-label="Close"
                tabIndex={0}
                onClick={() => handleClose()}
                layoutId={`${layoutPrefix}-${CONTAINER_LAYOUT_ID}`}
                className={cn(
                  "cursor-pointer justify-center overflow-hidden p-5 pt-14",
                  "min-h-(--height-opened) w-(--width-opened) bg-zinc-900"
                )}
                style={{ borderRadius: 24 }}
              >
                <motion.div
                  layoutId={`${layoutPrefix}-${ITEMS_LAYOUT_ID}`}
                  layout="position"
                >
                  <ItemsList data={data} setValue={handleSelect} />
                </motion.div>
                <div className="absolute top-3 right-3 left-3">
                  <ProgressText {...sharedProps} />
                </div>
                <div className="absolute top-3 right-3">
                  <ProgressIndicator {...sharedProps} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}

export { DynamicScrollIslandTOC };
