"use client";

import { motion, type MotionValue, useTransform } from "motion/react";
import React, { useEffect, useMemo, useState } from "react";

import {
  calculateDisplacementMap,
  calculateDisplacementMap2,
} from "@/lib/displacementMap";
import { calculateRefractionSpecular } from "@/lib/specular";
import { CONCAVE, CONVEX, CONVEX_CIRCLE, LIP } from "@/lib/surfaceEquations";

// Helper to get value from either a primitive or MotionValue
function getValueOrMotion<T>(value: T | MotionValue<T>): T {
  return value && typeof value === "object" && "get" in value
    ? (value as MotionValue<T>).get()
    : (value as T);
}

export interface RefractionFilterProps {
  id: string;
  width: number;
  height: number;
  radius: number;
  bezelWidth: number;
  glassThickness: number;
  bezelType: "convex_circle" | "convex_squircle" | "concave" | "lip";
  refractiveIndex: number;
  withSvgWrapper?: boolean;
  blur?: number | MotionValue<number>;
  scaleRatio?: number | MotionValue<number>;
  specularOpacity?: number | MotionValue<number>;
  specularSaturation?: number | MotionValue<number>;
}

interface GeneratedMaps {
  displacementMapUrl: string;
  specularMapUrl: string;
  maxDisplacement: number;
}

function imageDataToDataUrl(imageData: ImageData): string {
  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Failed to get canvas context");
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL("image/png");
}

export const RefractionFilter: React.FC<RefractionFilterProps> = ({
  id,
  width,
  height,
  radius,
  bezelWidth,
  glassThickness,
  bezelType,
  refractiveIndex,
  withSvgWrapper = true,
  blur = 0.2,
  scaleRatio = 1,
  specularOpacity = 0.4,
  specularSaturation = 4,
}) => {
  const [maps, setMaps] = useState<GeneratedMaps | null>(null);

  // Select surface function based on bezelType
  const surfaceFn = useMemo(() => {
    switch (bezelType) {
      case "convex_circle":
        return CONVEX_CIRCLE.fn;
      case "convex_squircle":
        return CONVEX.fn;
      case "concave":
        return CONCAVE.fn;
      case "lip":
        return LIP.fn;
      default:
        return CONVEX.fn;
    }
  }, [bezelType]);

  // Generate maps on mount (client-side only)
  useEffect(() => {
    // Calculate the precomputed displacement map
    const precomputedMap = calculateDisplacementMap(
      glassThickness,
      bezelWidth,
      surfaceFn,
      refractiveIndex
    );

    const maxDisplacement = Math.max(...precomputedMap.map((x) => Math.abs(x)));

    // Generate displacement map image
    const displacementImageData = calculateDisplacementMap2(
      width,
      height,
      width,
      height,
      radius,
      bezelWidth,
      100,
      precomputedMap,
      2
    );

    // Generate specular map image
    const specularImageData = calculateRefractionSpecular(
      width,
      height,
      radius,
      bezelWidth,
      undefined,
      2
    );

    // Batch all state updates into a single setState call
    // This is intentional - we need to compute canvas-based maps on the client side
    // eslint-disable-next-line
    setMaps({
      displacementMapUrl: imageDataToDataUrl(displacementImageData),
      specularMapUrl: imageDataToDataUrl(specularImageData),
      maxDisplacement,
    });
  }, [
    width,
    height,
    radius,
    bezelWidth,
    glassThickness,
    refractiveIndex,
    surfaceFn,
  ]);

  // Calculate final scale using maxDisplacement and scaleRatio
  const scale = useTransform(() => {
    const ratio =
      typeof scaleRatio === "number" ? scaleRatio : scaleRatio.get();
    return (maps?.maxDisplacement ?? 100) * ratio;
  });

  // Convert specularSaturation to string for feColorMatrix values attribute

  const specularSaturationValue = useTransform(() =>
    getValueOrMotion(specularSaturation).toString()
  ) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  // Don't render until maps are generated
  if (!maps) {
    return null;
  }

  const content = (
    <filter id={id}>
      <motion.feGaussianBlur
        in="SourceGraphic"
        stdDeviation={blur}
        result="blurred_source"
      />
      <feImage
        href={maps.displacementMapUrl}
        x={0}
        y={0}
        width={width}
        height={height}
        result="displacement_map"
      />
      <motion.feDisplacementMap
        in="blurred_source"
        in2="displacement_map"
        scale={scale}
        xChannelSelector="R"
        yChannelSelector="G"
        result="displaced"
      />
      <motion.feColorMatrix
        in="displaced"
        type="saturate"
        values={specularSaturationValue}
        result="displaced_saturated"
      />
      <feImage
        href={maps.specularMapUrl}
        x={0}
        y={0}
        width={width}
        height={height}
        result="specular_layer"
      />
      <feComposite
        in="displaced_saturated"
        in2="specular_layer"
        operator="in"
        result="specular_saturated"
      />
      <feComponentTransfer in="specular_layer" result="specular_faded">
        <motion.feFuncA type="linear" slope={specularOpacity} />
      </feComponentTransfer>
      <feBlend
        in="specular_saturated"
        in2="displaced"
        mode="normal"
        result="withSaturation"
      />
      <feBlend in="specular_faded" in2="withSaturation" mode="normal" />
    </filter>
  );

  return withSvgWrapper ? (
    <svg colorInterpolationFilters="sRGB" style={{ display: "none" }}>
      <defs>{content}</defs>
    </svg>
  ) : (
    content
  );
};

export default RefractionFilter;
