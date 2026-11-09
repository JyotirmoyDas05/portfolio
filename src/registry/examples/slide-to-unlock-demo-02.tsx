"use client";

import { SlideToUnlock } from "@/registry/slide-to-unlock/slide-to-unlock";

export default function SlideToUnlockDemo2() {
  return (
    <SlideToUnlock
      thumbColor="rgba(59, 130, 246, 0.95)"
      trackColorOff="#e7e5e4"
      trackColorOn="#173462"
      toastMessage="Color Changed"
    />
  );
}
