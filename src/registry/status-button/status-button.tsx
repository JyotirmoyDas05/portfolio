"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  MotionConfig,
  type MotionProps,
  type Transition,
} from "motion/react";
import { TbAlertTriangleFilled, TbCircleCheckFilled } from "react-icons/tb";

import { cn } from "@/lib/utils";

// =============================================================================
// Types
// =============================================================================

export type StatusButtonVariant = "loading" | "error" | "success";
export type StatusButtonColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";
export type StatusButtonRadius = "none" | "sm" | "md" | "lg" | "full";

export interface StatusButtonProps extends VariantProps<typeof buttonStyles> {
  /** The current state variant of the button */
  variant?: StatusButtonVariant;
  /** The button content for normal state */
  children: React.ReactNode;
  /** Icon to display in normal state */
  icon?: React.ReactNode;
  /** Custom spring transition settings */
  transition?: Transition;
  /** Additional CSS classes */
  className?: string;
  /** Custom text for each state */
  text?: {
    error?: string;
    loading?: string;
    success?: string;
  };
  /** Custom colors for each state (overrides color preset) */
  colors?: {
    default?: string;
    loading?: string;
    success?: string;
    error?: string;
  };
}

// =============================================================================
// Animation Configs
// =============================================================================

const textAnimation: MotionProps = {
  variants: {
    initial: { opacity: 0, x: 40, filter: "blur(4px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: { opacity: 0, x: -40, filter: "blur(4px)" },
  },
  initial: "initial",
  animate: "animate",
  exit: "exit",
};

const iconAnimation: MotionProps = {
  variants: {
    initial: { opacity: 0, scale: 0, filter: "blur(4px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 0, filter: "blur(4px)" },
  },
  initial: "initial",
  animate: "animate",
  exit: "exit",
};

// =============================================================================
// Styles
// =============================================================================

const buttonStyles = cva(
  "relative flex h-14 cursor-pointer items-center justify-center gap-3 overflow-hidden px-6 text-center text-xl font-bold text-nowrap transition-colors duration-500 select-none",
  {
    variants: {
      color: {
        default: "",
        primary: "",
        secondary: "",
        success: "",
        warning: "",
        danger: "",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-lg",
        md: "rounded-xl",
        lg: "rounded-2xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      color: "default",
      radius: "full",
    },
  }
);

// Color mappings for each state
const colorStyles: Record<
  StatusButtonColor,
  Record<"default" | "loading" | "success" | "error", string>
> = {
  default: {
    default: "bg-gray-100 text-black/80",
    loading: "bg-sky-100 text-sky-500",
    success: "bg-green-100 text-green-500",
    error: "bg-rose-100 text-rose-500",
  },
  primary: {
    default: "bg-blue-100 text-blue-600",
    loading: "bg-blue-100 text-blue-500",
    success: "bg-green-100 text-green-500",
    error: "bg-rose-100 text-rose-500",
  },
  secondary: {
    default: "bg-purple-100 text-purple-600",
    loading: "bg-purple-100 text-purple-500",
    success: "bg-green-100 text-green-500",
    error: "bg-rose-100 text-rose-500",
  },
  success: {
    default: "bg-green-100 text-green-600",
    loading: "bg-green-100 text-green-500",
    success: "bg-green-100 text-green-500",
    error: "bg-rose-100 text-rose-500",
  },
  warning: {
    default: "bg-amber-100 text-amber-600",
    loading: "bg-amber-100 text-amber-500",
    success: "bg-green-100 text-green-500",
    error: "bg-rose-100 text-rose-500",
  },
  danger: {
    default: "bg-rose-100 text-rose-600",
    loading: "bg-rose-100 text-rose-500",
    success: "bg-green-100 text-green-500",
    error: "bg-rose-100 text-rose-500",
  },
};

// Spinner color for each color preset
const spinnerColors: Record<StatusButtonColor, string> = {
  default: "stroke-sky-400",
  primary: "stroke-blue-400",
  secondary: "stroke-purple-400",
  success: "stroke-green-400",
  warning: "stroke-amber-400",
  danger: "stroke-rose-400",
};

// =============================================================================
// Component
// =============================================================================

/**
 * StatusButton - An animated button with state transitions
 *
 * @example
 * ```tsx
 * <StatusButton variant="loading" icon={<Icon />} color="primary" radius="lg">
 *   Submit
 * </StatusButton>
 * ```
 */
function StatusButton({
  variant,
  text: _text,
  children,
  icon,
  className,
  color = "default",
  radius = "full",
  colors,
  transition = { type: "spring", duration: 0.6, bounce: 0.4 },
  style,
  ...rest
}: StatusButtonProps & HTMLMotionProps<"button">) {
  const text = {
    success: "Success",
    loading: "Loading...",
    error: "Error",
    ..._text,
  };

  const currentState = variant ?? "default";
  const colorPreset = color ?? "default";

  // Get color class - use custom colors if provided, otherwise use preset
  const getColorClass = () => {
    if (colors?.[currentState]) {
      return colors[currentState];
    }
    return colorStyles[colorPreset][currentState];
  };

  function renderIcon() {
    if (variant === "loading") {
      return (
        <div>
          <svg
            className="size-6 animate-spin"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              animationDuration: "1s",
              animationTimingFunction: "linear",
            }}
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              className="stroke-black/10"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              className={spinnerColors[colorPreset]}
              strokeWidth="4"
              fill="none"
              strokeDasharray="62.33185307179586"
              strokeDashoffset="43.66456772333291"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );
    } else if (variant === "error") {
      return (
        <motion.div
          animate={{
            x: [0, 6, -6, 0, 6, -6, 0, 6, -6, 0],
            transition: {
              duration: 0.4,
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 1.2,
            },
          }}
        >
          <TbAlertTriangleFilled className="size-6" />
        </motion.div>
      );
    } else if (variant === "success") {
      return <TbCircleCheckFilled size={24} />;
    } else {
      return icon;
    }
  }

  function renderText() {
    if (variant === "loading") return text.loading;
    if (variant === "error") return text.error;
    if (variant === "success") return text.success;
    return children;
  }

  return (
    <MotionConfig transition={transition}>
      <motion.button
        {...rest}
        className={cn(buttonStyles({ radius }), getColorClass(), className)}
        style={style}
        layout
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {(variant || icon) && (
            <motion.div
              key={`${variant}-icon`}
              {...iconAnimation}
              layout="position"
            >
              {renderIcon()}
            </motion.div>
          )}
          <motion.div
            key={`${variant}-text`}
            {...textAnimation}
            layout="position"
          >
            {renderText()}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </MotionConfig>
  );
}

export { StatusButton };
