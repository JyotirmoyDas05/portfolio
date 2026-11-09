"use client";

import { useState } from "react";

import { LiquidGlassSearchbox } from "@/registry/liquid-glass-searchbox/liquid-glass-searchbox";

export default function LiquidGlassSearchboxCustomDemo() {
  const [query, setQuery] = useState("");

  return (
    <LiquidGlassSearchbox
      value={query}
      onChange={setQuery}
      onClear={() => setQuery("")}
      placeholder="Find components..."
      width={350}
      height={48}
      blur={0.5}
      specularOpacity={0.3}
      refractionLevel={0.9}
    />
  );
}
