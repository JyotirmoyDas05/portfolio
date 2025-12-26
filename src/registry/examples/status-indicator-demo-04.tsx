"use client";

import { TbDownload, TbHeart,TbShoppingCart } from "react-icons/tb";

import { showStatusIndicator } from "@/registry/status-indicator";

/**
 * Custom Colors Demo
 * Shows how to use any custom Tailwind classes
 */
export default function StatusIndicatorDemo04() {
  const handleAddToCart = () => {
    showStatusIndicator({
      icon: <TbShoppingCart strokeWidth={2.5} className="size-5" />,
      label: "Add to Cart",
      text: {
        loading: "Adding to Cart",
        success: "Added to Cart",
        error: "Failed to Add",
      },
      colors: {
        loading: "bg-indigo-100 text-indigo-600",
        success: "bg-teal-100 text-teal-600",
        error: "bg-orange-100 text-orange-600",
      },
    });
  };

  const handleDownload = () => {
    showStatusIndicator({
      icon: <TbDownload strokeWidth={2.5} className="size-5" />,
      label: "Download",
      text: {
        loading: "Downloading...",
        success: "Downloaded!",
        error: "Download Failed",
      },
      colors: {
        loading: "bg-cyan-100 text-cyan-600",
        success: "bg-emerald-100 text-emerald-600",
        error: "bg-red-100 text-red-600",
      },
    });
  };

  const handleLike = () => {
    showStatusIndicator({
      icon: <TbHeart strokeWidth={2.5} className="size-5" />,
      label: "Like",
      text: {
        loading: "Liking...",
        success: "Liked!",
        error: "Failed",
      },
      colors: {
        loading: "bg-pink-100 text-pink-500",
        success: "bg-pink-100 text-pink-600",
        error: "bg-gray-100 text-gray-500",
      },
      successRate: 1, // Always succeeds
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <p className="text-sm text-muted-foreground">
        Custom Tailwind classes for any color
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleAddToCart}
          className="flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-5 py-2.5 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-100 active:scale-95"
        >
          <TbShoppingCart className="size-4" />
          Indigo Theme
        </button>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-5 py-2.5 text-sm font-medium text-cyan-600 transition-colors hover:bg-cyan-100 active:scale-95"
        >
          <TbDownload className="size-4" />
          Cyan Theme
        </button>

        <button
          onClick={handleLike}
          className="flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-5 py-2.5 text-sm font-medium text-pink-600 transition-colors hover:bg-pink-100 active:scale-95"
        >
          <TbHeart className="size-4" />
          Pink Theme
        </button>
      </div>

      <p className="max-w-sm text-center text-xs text-muted-foreground">
        Use the <code className="text-foreground">colors</code> prop with any
        Tailwind classes
      </p>
    </div>
  );
}
