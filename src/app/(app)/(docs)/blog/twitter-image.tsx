import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt = "Blog – Jyotirmoy Das";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const robotoCondensedMedium = await readFile(
    join(process.cwd(), "src/assets/fonts/RobotoCondensed-Medium.ttf")
  );

  return new ImageResponse(
    <div
      tw="w-full h-full flex flex-col items-center justify-center text-white bg-black p-16"
      style={{ fontFamily: "RobotoCondensed" }}
    >
      <div tw="absolute flex inset-y-0 w-px border border-zinc-800 left-16" />
      <div tw="absolute flex inset-y-0 w-px border border-zinc-800 right-16" />
      <div tw="absolute flex inset-x-0 h-px border border-zinc-800 top-16" />
      <div tw="absolute flex inset-x-0 h-px border border-zinc-800 bottom-16" />

      <h1 tw="text-7xl font-medium">Blog</h1>
      <p tw="text-2xl text-zinc-400 mt-4">
        Articles on development, design, and ideas
      </p>
      <p tw="text-xl text-zinc-500 mt-8">jyotimoydas.in/blog</p>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "RobotoCondensed",
          data: robotoCondensedMedium,
          weight: 500,
        },
      ],
    }
  );
}
