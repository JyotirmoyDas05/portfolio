"use client";

import type { MotionValue } from "motion/react";
import { motion, useTransform } from "motion/react";
import React from "react";

import { imageDataToUrl } from "../lib/canvasUtils";
import {
  calculateDisplacementMap,
  calculateDisplacementMap2,
} from "../lib/displacementMap";
import { calculateMagnifyingDisplacementMap } from "../lib/magnifyingDisplacement";
import { calculateRefractionSpecular } from "../lib/specular";
import { CONVEX } from "../lib/surfaceEquations";
import { getValueOrMotion } from "../lib/useValueOrMotion";

type FilterProps = {
  id: string;
  withSvgWrapper?: boolean;
  scaleRatio?: MotionValue<number>;
  canvasWidth?: number;
  canvasHeight?: number;
  blur: number | MotionValue<number>;
  width: number | MotionValue<number>;
  height: number | MotionValue<number>;
  radius: number | MotionValue<number>;
  glassThickness: number | MotionValue<number>;
  bezelWidth: number | MotionValue<number>;
  refractiveIndex: number | MotionValue<number>;
  specularOpacity: number | MotionValue<number>;
  specularSaturation?: number | MotionValue<number>;
  magnifyingScale?: number | MotionValue<number>;
  colorScheme?: MotionValue<"light" | "dark">;
  dpr?: number;
  bezelHeightFn?: (x: number) => number;
};

export const Filter: React.FC<FilterProps> = ({
  id,
  withSvgWrapper = true,
  canvasWidth,
  canvasHeight,
  width,
  height,
  radius,
  blur,
  glassThickness,
  bezelWidth,
  refractiveIndex,
  scaleRatio,
  specularOpacity,
  specularSaturation = 4,
  magnifyingScale,
  colorScheme,
  bezelHeightFn = CONVEX.fn,
  dpr,
}) => {
  const map = useTransform(() => {
    return calculateDisplacementMap(
      getValueOrMotion(glassThickness),
      getValueOrMotion(bezelWidth),
      bezelHeightFn,
      getValueOrMotion(refractiveIndex)
    );
  });

  const maximumDisplacement = useTransform(() =>
    Math.max(...map.get().map((v) => Math.abs(v)))
  );

  const displacementMap = useTransform(() => {
    return calculateDisplacementMap2(
      getValueOrMotion(canvasWidth ?? width),
      getValueOrMotion(canvasHeight ?? height),
      getValueOrMotion(width),
      getValueOrMotion(height),
      getValueOrMotion(radius),
      getValueOrMotion(bezelWidth),
      getValueOrMotion(maximumDisplacement),
      getValueOrMotion(map),
      dpr
    );
  });

  const specularLayer = useTransform(() => {
    return calculateRefractionSpecular(
      getValueOrMotion(width),
      getValueOrMotion(height),
      getValueOrMotion(radius),
      50,
      undefined,
      dpr
    );
  });

  const magnifyingDisplacementMap = useTransform(() => {
    return magnifyingScale !== undefined
      ? calculateMagnifyingDisplacementMap(
          getValueOrMotion(canvasWidth ?? width),
          getValueOrMotion(canvasHeight ?? height)
        )
      : undefined;
  });

  const magnifyingDisplacementMapDataUrl = useTransform(() => {
    if (magnifyingScale) {
      const mapData = magnifyingDisplacementMap.get();
      return mapData ? imageDataToUrl(mapData) : "";
    }
    return "";
  });

  const displacementMapDataUrl = useTransform(() => {
    return imageDataToUrl(displacementMap.get());
  });

  const specularLayerDataUrl = useTransform(() => {
    return imageDataToUrl(specularLayer.get());
  });

  const scale = useTransform(
    () => maximumDisplacement.get() * (scaleRatio?.get() ?? 1)
  );

  // Pre-compute these transforms outside of conditional JSX
  const colorMatrixValues = useTransform(() =>
    colorScheme && getValueOrMotion(colorScheme) === "dark"
      ? "0.9 0 0 0 -0.3 0 0.9 0 0 -0.3 0 0 0.9 0 -0.3 0 0 0 1 0"
      : "1.03 0 0 0 0.2 0 1.03 0 0 0.2 0 0 1.03 0 0.2 0 0 0 1 0"
  );

  const saturateValues = useTransform(() =>
    getValueOrMotion(specularSaturation).toString()
  );

  const specularOpacityValue = useTransform(() =>
    getValueOrMotion(specularOpacity)
  );

  const content = (
    <filter id={id}>
      {magnifyingScale && (
        <>
          <motion.feImage
            href={magnifyingDisplacementMapDataUrl}
            x={0}
            y={0}
            width={canvasWidth ?? width}
            height={canvasHeight ?? height}
            result="magnifying_displacement_map"
          />

          <motion.feDisplacementMap
            in="SourceGraphic"
            in2="magnifying_displacement_map"
            scale={magnifyingScale}
            xChannelSelector="R"
            yChannelSelector="G"
            result="magnified_source"
          />
        </>
      )}

      {/* Augment brightness and saturation */}
      {colorScheme && (
        <motion.feColorMatrix
          in={
            magnifyingDisplacementMapDataUrl
              ? "magnified_source"
              : "SourceGraphic"
          }
          type="matrix"
          // @ts-expect-error - Framer Motion's SVG filter types don't correctly support MotionValue<string>
          values={colorMatrixValues}
          result="brightened_source"
        />
      )}

      <motion.feGaussianBlur
        in={
          colorScheme
            ? "brightened_source"
            : magnifyingDisplacementMapDataUrl
              ? "magnified_source"
              : "SourceGraphic"
        }
        stdDeviation={blur}
        result="blurred_source"
      />

      <motion.feImage
        href={displacementMapDataUrl}
        x={0}
        y={0}
        width={canvasWidth ?? width}
        height={canvasHeight ?? height}
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
        // @ts-expect-error - Framer Motion's SVG filter types don't correctly support MotionValue<string>
        values={saturateValues}
        result="displaced_saturated"
      />

      <motion.feImage
        href={specularLayerDataUrl}
        x={0}
        y={0}
        width={canvasWidth ?? width}
        height={canvasHeight ?? height}
        result="specular_layer"
      />

      <feComposite
        in="displaced_saturated"
        in2="specular_layer"
        operator="in"
        result="specular_saturated"
      />

      <feComponentTransfer in="specular_layer" result="specular_faded">
        <motion.feFuncA type="linear" slope={specularOpacityValue} />
      </feComponentTransfer>

      <motion.feBlend
        in="specular_saturated"
        in2="displaced"
        mode="normal"
        result="withSaturation"
      />
      <motion.feBlend in="specular_faded" in2="withSaturation" mode="normal" />
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
