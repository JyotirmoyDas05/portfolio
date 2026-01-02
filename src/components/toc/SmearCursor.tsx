"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Smear Cursor - Multi-segment trail matching smear-cursor.nvim behavior
 * Uses trailing_exponent shaping and stepped color fade
 */

interface SmearCursorProps {
  containerRef: React.RefObject<HTMLElement | null>;
  activeId: string | null;
  labelRefsMap: Map<string, HTMLSpanElement | null>;
  className?: string;
}

interface Position {
  x: number;
  y: number;
}

// Head/tail animation config
const CONFIG = {
  headLerp: 0.25,
  tailLerp: 0.08,
};

// Trail rendering config (smear-cursor.nvim style)
const TRAIL = {
  segments: 6,
  trailingExponent: 1,
  colorLevels: 3,
  maxLengthPx: 60,
  minVisibleDist: 2,
};

/**
 * Get the position at the end of the last character
 */
function getTextEndPosition(
  element: HTMLElement,
  container: HTMLElement
): Position | null {
  const textNode = getLastTextNode(element);
  if (!textNode || !textNode.textContent) return null;

  try {
    const range = document.createRange();
    const textLength = textNode.textContent.length;
    range.setStart(textNode, textLength);
    range.setEnd(textNode, textLength);

    const rects = range.getClientRects();
    if (rects.length === 0) {
      const rect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      return {
        x: rect.right - containerRect.left,
        y: rect.top - containerRect.top + rect.height / 2,
      };
    }

    const lastRect = rects[rects.length - 1];
    const containerRect = container.getBoundingClientRect();

    return {
      x: lastRect.right - containerRect.left + 2,
      y: lastRect.top - containerRect.top + lastRect.height / 2,
    };
  } catch {
    const rect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    return {
      x: rect.right - containerRect.left,
      y: rect.top - containerRect.top + rect.height / 2,
    };
  }
}

function getLastTextNode(element: Node): Text | null {
  if (element.nodeType === Node.TEXT_NODE) {
    return element as Text;
  }
  const children = element.childNodes;
  for (let i = children.length - 1; i >= 0; i--) {
    const textNode = getLastTextNode(children[i]);
    if (textNode) return textNode;
  }
  return null;
}

export function SmearCursor({
  containerRef,
  activeId,
  labelRefsMap,
  className,
}: SmearCursorProps) {
  const [target, setTarget] = useState<Position>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const headPosRef = useRef<Position>({ x: 0, y: 0 });
  const tailPosRef = useRef<Position>({ x: 0, y: 0 });
  const initializedRef = useRef(false);
  const animationRef = useRef<number | null>(null);

  const cursorHeadRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateTarget = useCallback(() => {
    if (!activeId || !containerRef.current) {
      setIsVisible(false);
      return;
    }

    const labelSpan = labelRefsMap.get(activeId);
    if (!labelSpan) {
      setIsVisible(false);
      return;
    }

    const newTarget = getTextEndPosition(labelSpan, containerRef.current);
    if (!newTarget) {
      setIsVisible(false);
      return;
    }

    setTarget(newTarget);
    setIsVisible(true);

    if (!initializedRef.current) {
      headPosRef.current = { ...newTarget };
      tailPosRef.current = { ...newTarget };
      initializedRef.current = true;
      if (cursorHeadRef.current) {
        cursorHeadRef.current.style.transform = `translate(${newTarget.x}px, ${newTarget.y}px) translate(-50%, -50%)`;
      }
    }
  }, [activeId, containerRef, labelRefsMap]);

  // Animation loop
  useEffect(() => {
    if (!isVisible) return;

    const animate = () => {
      headPosRef.current.x +=
        (target.x - headPosRef.current.x) * CONFIG.headLerp;
      headPosRef.current.y +=
        (target.y - headPosRef.current.y) * CONFIG.headLerp;

      tailPosRef.current.x +=
        (target.x - tailPosRef.current.x) * CONFIG.tailLerp;
      tailPosRef.current.y +=
        (target.y - tailPosRef.current.y) * CONFIG.tailLerp;

      if (cursorHeadRef.current) {
        cursorHeadRef.current.style.transform = `translate(${headPosRef.current.x}px, ${headPosRef.current.y}px) translate(-50%, -50%)`;
      }

      // --- TRAIL RENDERING (segment-based like smear-cursor.nvim) ---
      const dx = headPosRef.current.x - tailPosRef.current.x;
      const dy = headPosRef.current.y - tailPosRef.current.y;
      let dist = Math.hypot(dx, dy);

      if (dist > TRAIL.maxLengthPx && dist > 0.0001) {
        const k = TRAIL.maxLengthPx / dist;
        tailPosRef.current.x = headPosRef.current.x - dx * k;
        tailPosRef.current.y = headPosRef.current.y - dy * k;
        dist = TRAIL.maxLengthPx;
      }

      if (dist < TRAIL.minVisibleDist) {
        // Hide segments when settled
        for (let i = 0; i < TRAIL.segments; i++) {
          const el = trailRefs.current[i];
          if (el) el.style.opacity = "0";
        }
      } else {
        for (let i = 0; i < TRAIL.segments; i++) {
          const el = trailRefs.current[i];
          if (!el) continue;

          const raw = (i + 1) / (TRAIL.segments + 1);

          const t = Math.pow(raw, TRAIL.trailingExponent);

          const x = tailPosRef.current.x + dx * t;
          const y = tailPosRef.current.y + dy * t;

          el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;

          // Base opacity proportional to distance, then fade by raw
          let alpha = Math.min(dist / 40, 1) * raw * 0.65;

          const step = 1 / TRAIL.colorLevels;
          alpha = Math.round(alpha / step) * step;

          el.style.opacity = String(alpha);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target, isVisible]);

  useEffect(() => {
    updateTarget();
    window.addEventListener("resize", updateTarget);
    return () => window.removeEventListener("resize", updateTarget);
  }, [activeId, updateTarget]);

  if (!isVisible) return null;

  return (
    <>
      {/* Smear trail segments */}
      {Array.from({ length: TRAIL.segments }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            trailRefs.current[i] = el;
          }}
          className={cn(
            "pointer-events-none absolute top-0 left-0",
            "h-4 w-1.5 bg-primary",
            className
          )}
          style={{ opacity: 0 }}
          aria-hidden
        />
      ))}

      {/* Cursor head */}
      <div
        ref={cursorHeadRef}
        className={cn(
          "pointer-events-none absolute top-0 left-0",
          "h-4 w-1.5",
          "animate-pulse bg-primary",
          className
        )}
        style={{ animationDuration: "1s" }}
        aria-hidden
      />
    </>
  );
}
