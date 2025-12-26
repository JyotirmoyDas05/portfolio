"use client";

import { type RefObject, useCallback } from "react";
import { flushSync } from "react-dom";

interface UseThemeTransitionOptions {
  duration?: number;
}

/**
 * Hook that provides a smooth circular view transition for theme switching.
 * The animation expands from the button position with a circular clip-path.
 *
 * @param buttonRef - Ref to the button element from which the animation originates
 * @param options - Configuration options (duration defaults to 400ms)
 * @returns A function that wraps theme changes with the circular transition
 */
export function useThemeTransition(
  buttonRef: RefObject<HTMLElement | null>,
  options: UseThemeTransitionOptions = {}
) {
  const { duration = 400 } = options;

  return useCallback(
    async (applyTheme: () => void) => {
      // Fallback for browsers without View Transitions API support
      if (
        !document.startViewTransition ||
        !buttonRef.current ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        applyTheme();
        return;
      }

      // Pause all running animations to prevent jank during transition
      // This is especially important for pages with continuous animations (marquees, etc.)
      const animatingElements = document.querySelectorAll("*");
      const pausedElements: { element: Element; originalState: string }[] = [];

      animatingElements.forEach((el) => {
        const style = getComputedStyle(el);
        if (
          style.animationName !== "none" &&
          style.animationPlayState === "running"
        ) {
          pausedElements.push({
            element: el,
            originalState: (el as HTMLElement).style.animationPlayState,
          });
          (el as HTMLElement).style.animationPlayState = "paused";
        }
      });

      // Start the view transition
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          applyTheme();
        });
      });

      // Wait for the transition to be ready
      await transition.ready;

      // Calculate the circle origin from the button's center
      const { top, left, width, height } =
        buttonRef.current.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;

      // Calculate the maximum radius needed to cover the entire viewport
      const maxRadius = Math.hypot(
        Math.max(left, window.innerWidth - left),
        Math.max(top, window.innerHeight - top)
      );

      // Animate the new view with a circular reveal
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );

      // Wait for the transition to finish, then resume animations
      await transition.finished;

      pausedElements.forEach(({ element, originalState }) => {
        (element as HTMLElement).style.animationPlayState = originalState || "";
      });
    },
    [buttonRef, duration]
  );
}
