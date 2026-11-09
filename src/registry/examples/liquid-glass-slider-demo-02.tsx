"use client";

import { LiquidGlassSlider } from "@/registry/liquid-glass-slider/liquid-glass-slider";

export default function LiquidGlassSliderCustomColorsDemo() {
  return (
    <LiquidGlassSlider
      defaultValue={50}
      fillColor="#22c55e"
      trackColor="#14532d44"
      thumbColor="rgba(34, 197, 94, 0.9)"
    />
  );
}
