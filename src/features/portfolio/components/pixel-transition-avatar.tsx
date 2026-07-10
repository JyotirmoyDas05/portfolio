"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface PixelTransitionAvatarProps {
  /** Default image (shown when not hovering) */
  defaultSrc: string;
  /** Hover image (shown when hovering, after pixel transition) */
  hoverSrc: string;
  /** Alt text for the avatar */
  alt: string;
  /** Size of the avatar in pixels */
  size?: number;
  /** Additional className */
  className?: string;
}

export function PixelTransitionAvatar({
  defaultSrc,
  hoverSrc,
  alt,
  size = 160,
  className,
}: PixelTransitionAvatarProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full",
        "cursor-pointer ring-offset-2 ring-offset-background select-none",
        "transition-all duration-300",
        isHovered ? "ring-2 ring-info/50" : "ring-1 ring-border",
        className
      )}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="img"
      aria-label={alt}
    >
      {/* Default image (Ghibli style) */}
      <Image
        src={defaultSrc}
        alt={alt}
        width={size}
        height={size}
        className={cn(
          "absolute inset-0 size-full object-cover",
          "transition-all duration-400 ease-out",
          isHovered ? "scale-110 blur-sm" : "blur-0 scale-100 opacity-100"
        )}
        priority
        unoptimized
      />

      {/* Real image (LinkedIn photo) */}
      <Image
        src={hoverSrc}
        alt={`${alt} - real photo`}
        width={size}
        height={size}
        className={cn(
          "absolute inset-0 size-full object-cover",
          "transition-all duration-400 ease-out",
          isHovered
            ? "blur-0 scale-100 opacity-100"
            : "scale-90 opacity-0 blur-sm"
        )}
        priority
        unoptimized
      />

      {/* Pixelation overlay effect during transition */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          "bg-size-[8px_8px] bg-repeat",
          "transition-opacity duration-200",
          // Show pixelated grid briefly during transition
          "bg-[linear-gradient(to_right,transparent_50%,rgba(0,0,0,0.03)_50%),linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.03)_50%)]",
          isHovered ? "opacity-0" : "opacity-0"
        )}
      />
    </div>
  );
}
