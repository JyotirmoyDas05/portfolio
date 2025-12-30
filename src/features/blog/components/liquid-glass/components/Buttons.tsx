"use client";

import { RotateCcwIcon } from "lucide-react";
import type { AnimationSequence } from "motion";
import { animate } from "motion";
import type { AnimationPlaybackControlsWithThen } from "motion/react";
import {
  motion,
  type MotionValue,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useState } from "react";
import { IoSquare } from "react-icons/io5";

import {
  ConcavePath24,
  ConvexCirclePath24,
  ConvexPath24,
  LipPath24,
} from "./Functions";

type ButtonProps = {
  onClick?: () => void;
  title?: string;
  active?: boolean | MotionValue<boolean>;
  className?: string;
  ringOpacity?: MotionValue<number>;
};

const baseBtn =
  "group relative inline-flex items-center justify-center bg-muted text-muted-foreground p-3 rounded-full hover:bg-muted/80 active:bg-muted/70 transition-colors";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const ReplayButton: React.FC<
  ButtonProps & {
    animation: MotionValue<AnimationPlaybackControlsWithThen | null>;
    sequence: AnimationSequence;
  }
> = ({ className, animation, sequence }) => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return animation.on("change", async (anim) => {
      if (!anim) {
        setPlaying(false);
        return;
      }
      setPlaying(anim.state === "running");
      await anim.finished;
      setPlaying(false);
    });
  }, [animation]);

  const label = playing ? "Pause" : "Replay";

  return (
    <motion.button
      type="button"
      onClick={() => {
        if (playing) {
          animation.get()?.complete();
          setPlaying(false);
        } else {
          animation.set(animate(sequence));
          animation.get()?.play();
          setPlaying(true);
        }
      }}
      aria-label={label}
      title={label}
      className={cx(baseBtn, className)}
    >
      {playing ? (
        <IoSquare
          size={20}
          className="transition-transform group-hover:scale-110 group-active:scale-90"
        />
      ) : (
        <RotateCcwIcon
          size={20}
          className="transition-transform group-hover:scale-110 group-active:scale-90"
        />
      )}
    </motion.button>
  );
};

function SurfaceIcon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform group-hover:scale-110 group-active:scale-90"
    >
      <path d={d} />
    </svg>
  );
}

function SurfaceButtonBase({
  onClick,
  title,
  active,
  className,
  d,
  ringOpacity,
}: ButtonProps & { d: string }) {
  const activeBool = typeof active === "boolean" ? active : false;
  const isMotionValue = typeof active === "object" && active && "get" in active;

  // Always create a static MotionValue for the fallback case
  const staticFalse = useMotionValue(false);
  const activeValue = isMotionValue
    ? (active as MotionValue<boolean>)
    : staticFalse;

  // Always call useTransform - hooks must be unconditional
  const activeOpacity = useTransform(activeValue, (v: boolean) => (v ? 1 : 0));

  // Determine which opacity to use
  const displayRingOpacity =
    ringOpacity ?? (isMotionValue ? activeOpacity : undefined);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={title}
      title={title}
      className={cx(
        baseBtn,
        activeBool && "ring-2 ring-blue-400/70",
        className
      )}
    >
      {displayRingOpacity && (
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-blue-400/70"
          style={{ opacity: displayRingOpacity }}
        />
      )}
      <SurfaceIcon d={d} />
    </button>
  );
}

export const ConvexCircleButton: React.FC<ButtonProps> = (props) => (
  <SurfaceButtonBase
    {...props}
    title={props.title ?? "Convex Circle"}
    d={ConvexCirclePath24}
  />
);

export const ConvexSquircleButton: React.FC<ButtonProps> = (props) => (
  <SurfaceButtonBase
    {...props}
    title={props.title ?? "Convex Squircle"}
    d={ConvexPath24}
  />
);

export const ConcaveButton: React.FC<ButtonProps> = (props) => (
  <SurfaceButtonBase
    {...props}
    title={props.title ?? "Concave"}
    d={ConcavePath24}
  />
);

export const LipButton: React.FC<ButtonProps> = (props) => (
  <SurfaceButtonBase {...props} title={props.title ?? "Lip"} d={LipPath24} />
);
