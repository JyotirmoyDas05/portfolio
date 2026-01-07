import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title");

  const robotoCondensedMedium = await readFile(
    join(process.cwd(), "src/assets/fonts/RobotoCondensed-Medium.ttf")
  );

  return new ImageResponse(
    <div tw="w-full h-full flex items-center justify-center text-white bg-black p-16">
      <div tw="absolute flex inset-y-0 w-px border border-zinc-800 left-16" />
      <div tw="absolute flex inset-y-0 w-px border border-zinc-800 right-16" />
      <div tw="absolute flex inset-x-0 h-px border border-zinc-800 top-16" />
      <div tw="absolute flex inset-x-0 h-px border border-zinc-800 bottom-16" />

      <div tw="absolute flex bottom-16 right-16">
        <svg
          width="1408"
          height="479"
          viewBox="0 0 1408 479"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M561.778 0H618.667V64H561.778V0ZM618.667 64V256H504.889V192H561.778V64H618.667ZM903.111 64H789.333V192H903.111V256H732.444V0H903.111V64ZM960 192H903.111V64H960V192Z"
            fill="black"
          />
          <path d="M448 128H504.889V192H448V128Z" fill="black" />
          <path d="M448 192H504.889V256H448V192Z" fill="black" />
          <path
            d="M18.2 442.4V424.4H0V386H20.2V422.4H72.6V334H18.2V313.8H74.6V332H93V424.4H74.6V442.4H18.2Z"
            fill="black"
          />
          <path
            d="M135.387 478.6V460.6H117.188V440.6H137.387V458.6H189.988V424.4H135.387V406.2H117.188V350H137.387V404.2H189.988V350H210.188V460.6H191.988V478.6H135.387Z"
            fill="black"
          />
          <path
            d="M252.575 442.4V424.4H234.375V368.2H252.575V350H308.975V368.2H327.375V424.4H308.975V442.4H252.575ZM254.575 422.4H306.975V370H254.575V422.4Z"
            fill="black"
          />
          <path
            d="M387.763 442.4V424.4H369.763V370H351.562V350H369.763V313.8H389.763V350H444.562V370H389.763V422.4H442.562V404.2H462.763V424.4H444.562V442.4H387.763Z"
            fill="black"
          />
          <path
            d="M486.914 442.4V350H507.114V442.4H486.914ZM486.914 334V313.8H507.114V334H486.914Z"
            fill="black"
          />
          <path
            d="M531.25 442.4V368.2H549.45V350H605.85V368.2H624.25V388H603.85V370H551.45V442.4H531.25Z"
            fill="black"
          />
          <path
            d="M642.383 442.4V350H698.983V368.2H714.983V350H753.583V368.2H771.583V442.4H751.583V370H716.983V442.4H696.983V370H662.583V442.4H642.383Z"
            fill="black"
          />
          <path
            d="M811.95 442.4V424.4H793.75V368.2H811.95V350H868.35V368.2H886.75V424.4H868.35V442.4H811.95ZM813.95 422.4H866.35V370H813.95V422.4Z"
            fill="black"
          />
          <path
            d="M929.138 478.6V460.6H910.938V440.6H931.138V458.6H983.737V424.4H929.138V406.2H910.938V350H931.138V404.2H983.737V350H1003.94V460.6H985.737V478.6H929.138Z"
            fill="black"
          />
          <path
            d="M1068.16 442.4V313.8H1124.76V332H1142.76V350H1161.16V406.2H1142.76V424.4H1124.76V442.4H1068.16ZM1088.36 422.4H1122.76V404.2H1140.76V352H1122.76V334H1088.36V422.4Z"
            fill="black"
          />
          <path
            d="M1203.55 442.4V424.4H1185.35V368.2H1203.55V350H1259.95V368.2H1278.35V422.4H1296.55V442.4H1276.35V424.4H1259.95V442.4H1203.55ZM1205.55 422.4H1257.95V370H1205.55V422.4Z"
            fill="black"
          />
          <path
            d="M1314.65 442.4V422.4H1387.25V406.2H1332.85V388H1314.65V368.2H1332.85V350H1407.65V370H1334.85V386H1389.25V404.2H1407.65V424.4H1389.25V442.4H1314.65Z"
            fill="black"
          />
        </svg>
      </div>

      <h1
        tw="text-center font-medium"
        style={{
          fontFamily: "RobotoCondensed",
          fontSize: 64,
        }}
      >
        {title}
      </h1>
    </div>,
    {
      width: 1200,
      height: 630,
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
