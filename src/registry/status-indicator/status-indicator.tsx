"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  StatusButton,
  type StatusButtonColor,
  type StatusButtonRadius,
  type StatusButtonVariant,
} from "@/registry/status-button/status-button";

// =============================================================================
// Types
// =============================================================================

export interface StatusIndicatorOptions {
  /** Icon to display in normal state */
  icon: React.ReactNode;
  /** The button content for normal state */
  label: string;
  /** Custom text for each state */
  text: {
    loading: string;
    success: string;
    error: string;
  };
  /** Duration in ms before resolving to success/error. Default: 2000 */
  simulationDuration?: number;
  /** Probability of success (0-1). Default: 0.7 */
  successRate?: number;
  /** Callback when state resolves */
  onComplete?: (success: boolean) => void;
  /** Toast position. Default: "top-center" */
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  /** Auto-dismiss delay after completion in ms. Default: 2000 */
  dismissDelay?: number;
  /** Color preset. Default: "default" */
  color?: StatusButtonColor;
  /** Border radius. Default: "full" */
  radius?: StatusButtonRadius;
  /** Custom colors for each state (overrides color preset) */
  colors?: {
    default?: string;
    loading?: string;
    success?: string;
    error?: string;
  };
  /** Additional CSS classes */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export interface StatusIndicatorProps {
  /** Unique toast ID */
  toastId: string | number;
  /** Icon to display */
  icon: React.ReactNode;
  /** Button label */
  label: string;
  /** Text for each state */
  text: {
    loading: string;
    success: string;
    error: string;
  };
  /** Duration before resolving */
  simulationDuration?: number;
  /** Success probability */
  successRate?: number;
  /** Completion callback */
  onComplete?: (success: boolean) => void;
  /** Dismiss delay after completion */
  dismissDelay?: number;
  /** Color preset */
  color?: StatusButtonColor;
  /** Border radius */
  radius?: StatusButtonRadius;
  /** Custom colors */
  colors?: {
    default?: string;
    loading?: string;
    success?: string;
    error?: string;
  };
  /** Additional CSS classes */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

// =============================================================================
// Component
// =============================================================================

/**
 * StatusIndicator - A toast notification that displays animated status transitions
 *
 * @example
 * ```tsx
 * // Use the showStatusIndicator helper
 * showStatusIndicator({
 *   icon: <TbCreditCard />,
 *   label: "Pay $49.99",
 *   text: {
 *     loading: "Processing Payment",
 *     success: "Payment Complete",
 *     error: "Payment Failed",
 *   },
 *   color: "primary",
 *   radius: "lg",
 * });
 * ```
 */
function StatusIndicator({
  toastId,
  icon,
  label,
  text,
  simulationDuration = 2000,
  successRate = 0.7,
  onComplete,
  dismissDelay = 2000,
  color = "default",
  radius = "full",
  colors,
  className,
  style,
}: StatusIndicatorProps) {
  const [state, setState] = useState<StatusButtonVariant>("loading");

  useEffect(() => {
    const timer = setTimeout(() => {
      const success = Math.random() < successRate;
      setState(success ? "success" : "error");
      onComplete?.(success);

      // Auto-dismiss after showing result
      setTimeout(() => toast.dismiss(toastId), dismissDelay);
    }, simulationDuration);

    return () => clearTimeout(timer);
  }, [simulationDuration, successRate, toastId, onComplete, dismissDelay]);

  return (
    <StatusButton
      icon={icon}
      variant={state}
      text={text}
      color={color}
      radius={radius}
      colors={colors}
      className={`pointer-events-none shadow-lg ${className ?? ""}`}
      style={style}
    >
      {label}
    </StatusButton>
  );
}

// =============================================================================
// Helper Function
// =============================================================================

/**
 * Show a status indicator as a toast notification
 *
 * @example
 * ```tsx
 * import { showStatusIndicator } from "@/registry/status-indicator/status-indicator";
 *
 * // With color preset
 * showStatusIndicator({
 *   icon: <TbCreditCard />,
 *   label: "Pay $49.99",
 *   text: {
 *     loading: "Processing Payment",
 *     success: "Payment Complete",
 *     error: "Payment Failed",
 *   },
 *   color: "primary",
 *   radius: "lg",
 * });
 *
 * // With custom colors (any Tailwind classes)
 * showStatusIndicator({
 *   icon: <TbSend />,
 *   label: "Send Message",
 *   text: { ... },
 *   colors: {
 *     loading: "bg-indigo-100 text-indigo-600",
 *     success: "bg-teal-100 text-teal-600",
 *     error: "bg-red-100 text-red-600",
 *   },
 * });
 * ```
 */
function showStatusIndicator(options: StatusIndicatorOptions): string | number {
  const id = Date.now();

  toast.custom(
    () => (
      <StatusIndicator
        toastId={id}
        icon={options.icon}
        label={options.label}
        text={options.text}
        simulationDuration={options.simulationDuration}
        successRate={options.successRate}
        onComplete={options.onComplete}
        dismissDelay={options.dismissDelay}
        color={options.color}
        radius={options.radius}
        colors={options.colors}
        className={options.className}
        style={options.style}
      />
    ),
    {
      id,
      duration: Infinity,
      unstyled: true,
      className: "flex justify-center w-full",
      position: options.position ?? "top-center",
    }
  );

  return id;
}

/**
 * Dismiss a status indicator toast by ID
 */
function dismissStatusIndicator(id: string | number) {
  toast.dismiss(id);
}

export { dismissStatusIndicator, showStatusIndicator, StatusIndicator };
