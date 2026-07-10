"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type React from "react";
import { forwardRef, useEffect, useId, useRef } from "react";

import { cn } from "@/lib/utils";

import { RefractionFilter } from "./refraction-filter";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface LiquidGlassSearchboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  // ─────────────────────────────────────────────────────────────────────────
  // Input Control
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Controlled value of the searchbox.
   */
  value?: string;

  /**
   * Callback triggered when the input value changes.
   */
  onChange?: (value: string) => void;

  /**
   * Callback triggered when the clear button is clicked.
   */
  onClear?: () => void;

  /**
   * Whether to show the clear button when there's text.
   * @default true
   */
  showClearButton?: boolean;

  // ─────────────────────────────────────────────────────────────────────────
  // Appearance
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Additional CSS classes.
   */
  className?: string;

  /**
   * Width of the searchbox in pixels.
   * @default 420
   */
  width?: number;

  /**
   * Height of the searchbox in pixels.
   * @default 56
   */
  height?: number;

  /**
   * Background color opacity when idle.
   * @default 0.05
   */
  idleOpacity?: number;

  /**
   * Background color opacity when focused.
   * @default 0.2
   */
  focusOpacity?: number;

  // ─────────────────────────────────────────────────────────────────────────
  // Optical Parameters (Advanced)
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Blur level for the glass refraction effect.
   * @default 1
   */
  blur?: number;

  /**
   * Opacity of the specular highlight.
   * @default 0.2
   */
  specularOpacity?: number;

  /**
   * Saturation multiplier for the specular highlight.
   * @default 4
   */
  specularSaturation?: number;

  /**
   * Base refraction level (controls magnification intensity).
   * @default 0.7
   */
  refractionLevel?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A sleek liquid glass searchbox with iOS 26-inspired refraction effects.
 *
 * @example
 * ```tsx
 * <LiquidGlassSearchbox
 *   placeholder="Search..."
 *   onChange={(value) => console.log("Search:", value)}
 * />
 * ```
 *
 * @example With controlled value
 * ```tsx
 * const [query, setQuery] = useState("");
 * <LiquidGlassSearchbox
 *   value={query}
 *   onChange={setQuery}
 *   onClear={() => setQuery("")}
 * />
 * ```
 */
export const LiquidGlassSearchbox = forwardRef<
  HTMLInputElement,
  LiquidGlassSearchboxProps
>(
  (
    {
      // Input Control
      value,
      onChange,
      onClear,
      showClearButton = true,
      placeholder = "Search",
      disabled = false,
      // Appearance
      className,
      width = 420,
      height = 56,
      idleOpacity = 0.05,
      focusOpacity = 0.2,
      // Optical Parameters
      blur = 1,
      specularOpacity = 0.2,
      specularSaturation = 4,
      refractionLevel = 0.7,
      // Rest of input props
      ...inputProps
    },
    ref
  ) => {
    const filterId = useId();
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;
    const radius = height / 2;

    // ─────────────────────────────────────────────────────────────────────────
    // Motion Values
    // ─────────────────────────────────────────────────────────────────────────
    const focused = useMotionValue(0);
    const pointerDown = useMotionValue(0);

    // Background opacity based on focus and press
    const backgroundFromPointer = useTransform(
      pointerDown,
      [0, 1],
      [idleOpacity, 0.3]
    );
    const backgroundFromFocus = useTransform(
      focused,
      [0, 1],
      [idleOpacity, focusOpacity]
    );
    const backgroundOpacity = useSpring(
      useTransform([backgroundFromPointer, backgroundFromFocus], (vals) =>
        Math.max(vals[0] as number, vals[1] as number)
      ),
      { damping: 80, stiffness: 2000 }
    );

    // Scale animation on focus/press
    const scale = useSpring(
      useTransform(() => {
        const pd = pointerDown.get();
        const f = focused.get();
        return (f ? 1 : 0.98) * (pd ? 0.99 : 1);
      }),
      { damping: 40, stiffness: 800 }
    );

    // Refraction scale ratio
    const scaleRatio = useMotionValue(refractionLevel);

    // ─────────────────────────────────────────────────────────────────────────
    // Pointer Release Handler
    // ─────────────────────────────────────────────────────────────────────────
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

    // ─────────────────────────────────────────────────────────────────────────
    // Handlers
    // ─────────────────────────────────────────────────────────────────────────
    const handleFocus = () => focused.set(1);
    const handleBlur = () => focused.set(0);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };
    const handleClear = () => {
      onClear?.();
      inputRef.current?.focus();
    };
    const handleContainerClick = () => {
      inputRef.current?.focus();
    };

    const hasValue = value && value.length > 0;

    // ─────────────────────────────────────────────────────────────────────────
    // Render
    // ─────────────────────────────────────────────────────────────────────────
    return (
      <motion.div
        className={cn(
          "relative select-none",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        style={{ width, height, borderRadius: radius, scale }}
        onMouseDown={() => !disabled && pointerDown.set(1)}
        onMouseUp={() => pointerDown.set(0)}
        onClick={handleContainerClick}
      >
        {/* Refraction Filter */}
        <RefractionFilter
          id={filterId}
          width={width}
          height={height}
          radius={radius}
          bezelWidth={27}
          glassThickness={70}
          bezelType="convex_squircle"
          refractiveIndex={1.5}
          blur={blur}
          scaleRatio={scaleRatio}
          specularOpacity={specularOpacity}
          specularSaturation={specularSaturation}
        />

        {/* Glass Layer */}
        <motion.div
          className="absolute inset-0"
          style={{
            borderRadius: radius,
            backdropFilter: `url(#${filterId})`,
            backgroundColor: useTransform(
              backgroundOpacity,
              (op) => `rgba(255, 255, 255, ${op})`
            ),
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.16)",
            transform: "translateZ(0)",
          }}
        />

        {/* Content */}
        <div
          className="absolute inset-0 flex items-center gap-3 px-5 text-foreground/90"
          style={{ borderRadius: radius, zIndex: 1 }}
        >
          <SearchIcon
            className="shrink-0 opacity-70"
            size={20}
            aria-hidden="true"
          />

          <input
            ref={inputRef}
            type="search"
            placeholder={placeholder}
            aria-label={placeholder}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            className={cn(
              "min-w-0 flex-1 border-0 bg-transparent outline-none",
              "text-[15px] leading-none text-foreground/70",
              "placeholder:text-foreground/50",
              "select-text selection:bg-blue-500/30 selection:text-inherit"
            )}
            style={{ padding: 0 }}
            {...inputProps}
          />

          {/* Clear Button */}
          {showClearButton && hasValue && (
            <button
              type="button"
              onClick={handleClear}
              className="shrink-0 rounded-full p-1 opacity-50 transition-opacity hover:opacity-100"
              aria-label="Clear search"
            >
              <XIcon size={16} />
            </button>
          )}
        </div>
      </motion.div>
    );
  }
);

LiquidGlassSearchbox.displayName = "LiquidGlassSearchbox";

export default LiquidGlassSearchbox;
