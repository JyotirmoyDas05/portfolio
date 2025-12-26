"use client";

import { SlideToUnlock } from "@/registry/slide-to-unlock";

export default function SlideToUnlockDemo4() {
  return (
    <SlideToUnlock
      disabled
      defaultChecked={false}
      soundEnabled={false}
      toastEnabled={false}
    />
  );
}
