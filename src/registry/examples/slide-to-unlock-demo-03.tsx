"use client";

import { SlideToUnlock } from "@/registry/slide-to-unlock";

export default function SlideToUnlockDemo3() {
  // Customize the optical parameters to fine-tune the glass effect
  // Try adjusting these values to see how they affect the refraction!
  return (
    <SlideToUnlock
      blur={0.3}
      specularOpacity={0.7}
      specularSaturation={8}
      refractionLevel={1.2}
      toastEnabled={false}
      soundEnabled={false}
    />
  );
}
