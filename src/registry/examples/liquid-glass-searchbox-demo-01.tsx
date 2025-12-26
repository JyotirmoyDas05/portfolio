"use client";

import { useState } from "react";

import { LiquidGlassSearchbox } from "@/registry/liquid-glass-searchbox";

export default function LiquidGlassSearchboxDemo() {
  const [query, setQuery] = useState("");

  return (
    <LiquidGlassSearchbox
      value={query}
      onChange={setQuery}
      onClear={() => setQuery("")}
      placeholder="Search..."
    />
  );
}
