/**
 * Displacement map generation for liquid glass effect.
 * This version uses browser-native ImageData instead of Node's canvas package.
 */

export function calculateDisplacementMap(
  glassThickness: number = 200,
  bezelWidth: number = 50,
  bezelHeightFn: (x: number) => number = (x) => x,
  refractiveIndex: number = 1.5,
  samples: number = 128
): number[] {
  const eta = 1 / refractiveIndex;

  // Simplified refraction, which only handles fully vertical incident ray [0, 1]
  function refract(normalX: number, normalY: number): [number, number] | null {
    const dot = normalY;
    const k = 1 - eta * eta * (1 - dot * dot);
    if (k < 0) {
      // Total internal reflection
      return null;
    }
    const kSqrt = Math.sqrt(k);
    return [
      -(eta * dot + kSqrt) * normalX,
      eta - (eta * dot + kSqrt) * normalY,
    ];
  }

  return Array.from({ length: samples }, (_, i) => {
    const x = i / samples;
    const y = bezelHeightFn(x);

    // Calculate derivative in x
    const dx = x < 1 ? 0.0001 : -0.0001;
    const y2 = bezelHeightFn(x + dx);
    const derivative = (y2 - y) / dx;
    const magnitude = Math.sqrt(derivative * derivative + 1);
    const normal = [-derivative / magnitude, -1 / magnitude];
    const refracted = refract(normal[0], normal[1]);

    if (!refracted) {
      return 0;
    } else {
      const remainingHeightOnBezel = y * bezelWidth;
      const remainingHeight = remainingHeightOnBezel + glassThickness;

      // Return displacement (rest of travel on x-axis)
      return refracted[0] * (remainingHeight / refracted[1]);
    }
  });
}

export function calculateDisplacementMap2(
  canvasWidth: number,
  canvasHeight: number,
  objectWidth: number,
  objectHeight: number,
  radius: number,
  bezelWidth: number,
  maximumDisplacement: number,
  precomputedDisplacementMap: number[] = [],
  dpr: number = typeof window !== "undefined"
    ? (window.devicePixelRatio ?? 1)
    : 1
): ImageData {
  const bufferWidth = canvasWidth * dpr;
  const bufferHeight = canvasHeight * dpr;
  const imageData = new ImageData(bufferWidth, bufferHeight);

  // Fill neutral color using buffer
  const neutral = 0xff008080;
  new Uint32Array(imageData.data.buffer).fill(neutral);

  const radius_ = radius * dpr;
  const bezel = bezelWidth * dpr;

  const radiusSquared = radius_ ** 2;
  const radiusPlusOneSquared = (radius_ + 1) ** 2;
  const radiusMinusBezelSquared = (radius_ - bezel) ** 2;

  const objectWidth_ = objectWidth * dpr;
  const objectHeight_ = objectHeight * dpr;
  const widthBetweenRadiuses = objectWidth_ - radius_ * 2;
  const heightBetweenRadiuses = objectHeight_ - radius_ * 2;

  const objectX = (bufferWidth - objectWidth_) / 2;
  const objectY = (bufferHeight - objectHeight_) / 2;

  for (let y1 = 0; y1 < objectHeight_; y1++) {
    for (let x1 = 0; x1 < objectWidth_; x1++) {
      const idx = ((objectY + y1) * bufferWidth + objectX + x1) * 4;

      const isOnLeftSide = x1 < radius_;
      const isOnRightSide = x1 >= objectWidth_ - radius_;
      const isOnTopSide = y1 < radius_;
      const isOnBottomSide = y1 >= objectHeight_ - radius_;

      const x = isOnLeftSide
        ? x1 - radius_
        : isOnRightSide
          ? x1 - radius_ - widthBetweenRadiuses
          : 0;

      const y = isOnTopSide
        ? y1 - radius_
        : isOnBottomSide
          ? y1 - radius_ - heightBetweenRadiuses
          : 0;

      const distanceToCenterSquared = x * x + y * y;

      const isInBezel =
        distanceToCenterSquared <= radiusPlusOneSquared &&
        distanceToCenterSquared >= radiusMinusBezelSquared;

      // Only write non-neutral displacements (when isInBezel)
      if (isInBezel) {
        const opacity =
          distanceToCenterSquared < radiusSquared
            ? 1
            : 1 -
              (Math.sqrt(distanceToCenterSquared) - Math.sqrt(radiusSquared)) /
                (Math.sqrt(radiusPlusOneSquared) - Math.sqrt(radiusSquared));

        const distanceFromCenter = Math.sqrt(distanceToCenterSquared);
        const distanceFromSide = radius_ - distanceFromCenter;

        // Viewed from top
        const cos = x / distanceFromCenter;
        const sin = y / distanceFromCenter;

        const bezelIndex =
          ((distanceFromSide / bezel) * precomputedDisplacementMap.length) | 0;
        const distance = precomputedDisplacementMap[bezelIndex] ?? 0;

        const dX = (-cos * distance) / maximumDisplacement;
        const dY = (-sin * distance) / maximumDisplacement;

        imageData.data[idx] = 128 + dX * 127 * opacity; // R
        imageData.data[idx + 1] = 128 + dY * 127 * opacity; // G
        imageData.data[idx + 2] = 0; // B
        imageData.data[idx + 3] = 255; // A
      }
    }
  }
  return imageData;
}
