"use client";

import { LiquidGlassSlider } from "@/registry/liquid-glass-slider";

export default function LiquidGlassSliderOpticalDemo() {
  return (
    <LiquidGlassSlider
      defaultValue={60}
      blur={0.3}
      specularOpacity={0.7}
      specularSaturation={10}
      refractionLevel={1.2}
    />
  );
}
