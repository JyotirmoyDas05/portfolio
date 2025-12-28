import { getPlaiceholder } from "plaiceholder";

/**
 * Generates a low-quality image placeholder (LQIP) blur data URL.
 * Fetches the image and creates a tiny base64-encoded blur version.
 *
 * @param imageUrl - Full URL to the image
 * @returns Base64 data URL for blur placeholder, or undefined if failed
 */
export async function getBlurDataURL(
  imageUrl: string
): Promise<string | undefined> {
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) return undefined;

    const buffer = Buffer.from(await res.arrayBuffer());
    const { base64 } = await getPlaiceholder(buffer, { size: 10 });
    return base64;
  } catch {
    return undefined;
  }
}
