"use client";

import {
  mix,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import React, { useCallback, useEffect } from "react";
import { toast } from "sonner";

import { useSound } from "@/hooks/use-sound";
import { cn } from "@/lib/utils";

import { RefractionFilter } from "./refraction-filter";

/**
 * Props for the SlideToUnlock component.
 */
export interface SlideToUnlockProps {
  // ─────────────────────────────────────────────────────────────────────────
  // Callbacks
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Callback triggered when the slider reaches the ON position.
   */
  onUnlock?: () => void;

  /**
   * Callback triggered when the slider reaches the OFF position.
   */
  onLock?: () => void;

  // ─────────────────────────────────────────────────────────────────────────
  // Behavior
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Initial state of the switch.
   * @default false (OFF position)
   */
  defaultChecked?: boolean;

  /**
   * Whether to play the unlock sound effect.
   * @default true
   */
  soundEnabled?: boolean;

  /**
   * Whether to show a toast notification on unlock.
   * @default true
   */
  toastEnabled?: boolean;

  /**
   * Custom message to display in the unlock toast.
   * @default "Unlocked"
   */
  toastMessage?: string;

  /**
   * Whether the switch is disabled.
   * @default false
   */
  disabled?: boolean;

  // ─────────────────────────────────────────────────────────────────────────
  // Appearance
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Additional CSS classes to apply to the switch.
   */
  className?: string;

  /**
   * Color of the thumb/handle when not pressed.
   * @default "rgba(255, 255, 255, 1)"
   */
  thumbColor?: string;

  /**
   * Background color of the track when OFF.
   * @default "#94949F77"
   */
  trackColorOff?: string;

  /**
   * Background color of the track when ON.
   * @default "#3BBF4EEE"
   */
  trackColorOn?: string;

  // ─────────────────────────────────────────────────────────────────────────
  // Optical Parameters (Advanced)
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Blur level for the glass refraction effect.
   * @default 0.2
   */
  blur?: number;

  /**
   * Opacity of the specular highlight.
   * @default 0.5
   */
  specularOpacity?: number;

  /**
   * Saturation multiplier for the specular highlight.
   * @default 6
   */
  specularSaturation?: number;

  /**
   * Base refraction level (controls magnification intensity).
   * @default 1
   */
  refractionLevel?: number;
}

/**
 * A sleek, iOS 26-inspired liquid glass slide-to-unlock switch with
 * real-time SVG refraction effects.
 *
 * @example
 * ```tsx
 * <SlideToUnlock
 *   onUnlock={() => console.log("Unlocked!")}
 *   toastMessage="Access granted"
 * />
 * ```
 *
 * @example Custom colors
 * ```tsx
 * <SlideToUnlock
 *   thumbColor="rgba(59, 130, 246, 0.9)"
 *   trackColorOff="#1e293b"
 *   trackColorOn="#3b82f6"
 * />
 * ```
 *
 * @example Custom optical parameters
 * ```tsx
 * <SlideToUnlock
 *   blur={0.3}
 *   specularOpacity={0.7}
 *   specularSaturation={8}
 *   refractionLevel={1.2}
 * />
 * ```
 */
export const SlideToUnlock: React.FC<SlideToUnlockProps> = ({
  // Callbacks
  onUnlock,
  onLock,
  // Behavior
  defaultChecked = false,
  soundEnabled = true,
  toastEnabled = true,
  toastMessage = "Unlocked",
  disabled = false,
  // Appearance
  className,
  thumbColor = "rgba(255, 255, 255, 1)",
  trackColorOff = "#94949F77",
  trackColorOn = "#3BBF4EEE",
  // Optical Parameters
  blur = 0.2,
  specularOpacity = 0.5,
  specularSaturation = 6,
  refractionLevel = 1,
}) => {
  // CONSTANTS (layout)
  const sliderHeight = 67;
  const sliderWidth = 160;
  const thumbWidth = 146;
  const thumbHeight = 92;
  const thumbRadius = thumbHeight / 2;
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const xDragRatio = useMotionValue(0);
  const playUnlockSound = useSound("/audio/ui-sounds/unlock.wav");

  const THUMB_REST_SCALE = 0.65;
  const THUMB_ACTIVE_SCALE = 0.9;

  const THUMB_REST_OFFSET = ((1 - THUMB_REST_SCALE) * thumbWidth) / 2;

  const TRAVEL =
    sliderWidth - sliderHeight - (thumbWidth - thumbHeight) * THUMB_REST_SCALE;

  // MOTION SOURCES
  const checked = useMotionValue(defaultChecked ? 1 : 0);
  const pointerDown = useMotionValue(0);
  const initialPointerX = useMotionValue(0);
  const active = useTransform(() => (pointerDown.get() > 0.5 ? 1 : 0));

  // Helper to handle state change with callbacks
  const handleStateChange = useCallback(
    (newChecked: boolean, wasChecked: boolean) => {
      if (newChecked && !wasChecked) {
        // Transitioning to ON
        if (soundEnabled) {
          playUnlockSound();
        }
        if (toastEnabled) {
          toast.success(toastMessage);
        }
        onUnlock?.();
      } else if (!newChecked && wasChecked) {
        // Transitioning to OFF
        onLock?.();
      }
    },
    [
      soundEnabled,
      toastEnabled,
      toastMessage,
      onUnlock,
      onLock,
      playUnlockSound,
    ]
  );

  // GLOBAL POINTER-UP LISTENER
  useEffect(() => {
    const onPointerUp = (e: MouseEvent | TouchEvent) => {
      if (disabled) return;
      pointerDown.set(0);

      const x =
        e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX;

      const distance = x - initialPointerX.get();
      if (Math.abs(distance) > 4) {
        const dragX = xDragRatio.get();
        const shouldBeChecked = dragX > 0.5;
        const wasChecked = checked.get() > 0.5;
        checked.set(shouldBeChecked ? 1 : 0);
        handleStateChange(shouldBeChecked, wasChecked);
      }
    };

    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("touchend", onPointerUp);
    return () => {
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, [
    disabled,
    xDragRatio,
    checked,
    pointerDown,
    initialPointerX,
    handleStateChange,
  ]);

  // SPRINGS
  const xRatio = useSpring(
    useTransform(() => {
      const c = checked.get();
      const dragRatio = xDragRatio.get();

      if (pointerDown.get() > 0.5) {
        return dragRatio;
      } else {
        return c ? 1 : 0;
      }
    }),
    { damping: 80, stiffness: 1000 }
  );
  const backgroundOpacity = useSpring(
    useTransform(active, (v) => 1 - 0.9 * v),
    { damping: 80, stiffness: 2000 }
  );
  const thumbScale = useSpring(
    useTransform(
      active,
      (v) => THUMB_REST_SCALE + (THUMB_ACTIVE_SCALE - THUMB_REST_SCALE) * v
    ),
    { damping: 80, stiffness: 2000 }
  );
  const scaleRatio = useSpring(
    useTransform(() => (0.4 + 0.5 * active.get()) * refractionLevel)
  );
  const considerChecked = useTransform(() => {
    const x = xDragRatio.get();
    const c = checked.get();
    return pointerDown.get() ? (x > 0.5 ? 1 : 0) : c > 0.5 ? 1 : (0 as number);
  });

  const backgroundColor = useTransform(
    useSpring(considerChecked, { damping: 80, stiffness: 1000 }),
    mix(trackColorOff, trackColorOn)
  );

  // Parse thumb color to extract RGB for opacity animation
  const thumbBaseColor = thumbColor;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || !sliderRef.current) return;
    e.stopPropagation();
    const baseRatio = checked.get();
    const clientX = e.clientX;
    const displacementX = clientX - initialPointerX.get();
    const ratio = baseRatio + displacementX / TRAVEL;
    const overflow = ratio < 0 ? -ratio : ratio > 1 ? ratio - 1 : 0;
    const overflowSign = ratio < 0 ? -1 : 1;
    const dampedOverflow = (overflowSign * overflow) / 22;
    xDragRatio.set(Math.min(1, Math.max(0, ratio)) + dampedOverflow);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (disabled || !sliderRef.current) return;
    e.stopPropagation();
    const baseRatio = checked.get();
    const clientX = e.touches[0].clientX;
    const displacementX = clientX - initialPointerX.get();
    const ratio = baseRatio + displacementX / TRAVEL;
    const overflow = ratio < 0 ? -ratio : ratio > 1 ? ratio - 1 : 0;
    const overflowSign = ratio < 0 ? -1 : 1;
    const dampedOverflow = (overflowSign * overflow) / 22;
    xDragRatio.set(Math.min(1, Math.max(0, ratio)) + dampedOverflow);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    const x = e.clientX;
    const initialX = initialPointerX.get();
    const distance = x - initialX;
    if (Math.abs(distance) < 4) {
      const wasChecked = checked.get() > 0.5;
      const shouldBeChecked = !wasChecked;
      checked.set(shouldBeChecked ? 1 : 0);
      handleStateChange(shouldBeChecked, wasChecked);
    }
  };

  return (
    <motion.div
      ref={sliderRef}
      className={cn(
        "touch-pan-y touch-none select-none",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      style={{
        display: "inline-block",
        width: sliderWidth,
        height: sliderHeight,
        backgroundColor: backgroundColor,
        borderRadius: sliderHeight / 2,
        position: "relative",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={handleClick}
    >
      <RefractionFilter
        id="thumb-filter"
        width={146}
        height={92}
        radius={46}
        bezelWidth={19}
        glassThickness={47}
        bezelType="lip"
        refractiveIndex={1.5}
        blur={blur}
        scaleRatio={scaleRatio}
        specularOpacity={specularOpacity}
        specularSaturation={specularSaturation}
      />
      <motion.div
        className="absolute"
        onTouchStart={(e) => {
          if (disabled) return;
          e.stopPropagation();
          const pointerX = e.touches[0].clientX;
          pointerDown.set(1);
          initialPointerX.set(pointerX);
        }}
        onMouseDown={(e) => {
          if (disabled) return;
          e.stopPropagation();
          pointerDown.set(1);
          initialPointerX.set(e.clientX);
        }}
        style={{
          height: thumbHeight,
          width: thumbWidth,
          marginLeft:
            -THUMB_REST_OFFSET +
            (sliderHeight - thumbHeight * THUMB_REST_SCALE) / 2,
          x: useTransform(() => xRatio.get() * TRAVEL),
          y: "-50%",
          borderRadius: thumbRadius,
          top: sliderHeight / 2,
          backdropFilter: `url(#thumb-filter)`,
          scale: thumbScale,
          backgroundColor: useTransform(backgroundOpacity, (op) => {
            // Apply opacity to thumb color
            if (thumbBaseColor.startsWith("rgba")) {
              // Replace the alpha value
              return thumbBaseColor.replace(/[\d.]+\)$/, `${op})`);
            } else if (thumbBaseColor.startsWith("rgb")) {
              // Convert rgb to rgba
              return thumbBaseColor
                .replace("rgb", "rgba")
                .replace(")", `, ${op})`);
            } else {
              // For hex or named colors, just use white with opacity
              return `rgba(255, 255, 255, ${op})`;
            }
          }),
          boxShadow: useTransform(() => {
            const isPressed = pointerDown.get() > 0.5;
            return (
              "0 4px 22px rgba(0,0,0,0.1)" +
              (isPressed
                ? ", inset 2px 7px 24px rgba(0,0,0,0.09), inset -2px -7px 24px rgba(255,255,255,0.09)"
                : "")
            );
          }),
        }}
      />
    </motion.div>
  );
};
