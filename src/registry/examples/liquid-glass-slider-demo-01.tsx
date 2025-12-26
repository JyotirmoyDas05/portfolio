"use client";

import { LiquidGlassSlider } from "@/registry/liquid-glass-slider";

export default function LiquidGlassSliderDemo() {
  return (
    <LiquidGlassSlider
      defaultValue={30}
      onChange={(value) => console.log("Value:", value)}
    />
  );
}
