/**
 * Browser-compatible ImageData creation helper.
 * Replaces the Node.js `canvas` package's createImageData.
 */
export function createImageData(width: number, height: number): ImageData {
  // Ensure dimensions are integers
  const w = Math.floor(width);
  const h = Math.floor(height);

  if (typeof window !== "undefined" && typeof ImageData !== "undefined") {
    return new ImageData(w, h);
  }
  // Fallback for SSR - return a mock that won't be used
  return {
    data: new Uint8ClampedArray(w * h * 4),
    width: w,
    height: h,
    colorSpace: "srgb" as PredefinedColorSpace,
  };
}

/**
 * Convert ImageData to a data URL for use in SVG filters.
 * Uses PNG format for better color precision in displacement maps.
 */
export function imageDataToUrl(imageData: ImageData): string {
  if (typeof document === "undefined") {
    return "";
  }
  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL("image/png");
}
