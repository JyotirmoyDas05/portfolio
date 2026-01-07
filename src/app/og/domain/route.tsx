import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const domain = searchParams.get("domain");
  const isForSale = searchParams.get("sale") === "true";

  const magistralMedium = await readFile(
    join(process.cwd(), "src/assets/fonts/Magistral-Medium.ttf")
  );

  const robotoMedium = await readFile(
    join(process.cwd(), "src/assets/fonts/Roboto-Medium.ttf")
  );

  return new ImageResponse(
    <div tw="flex text-black bg-white w-full h-full p-16">
      <div tw="flex-1 flex flex-col justify-center border-l border-r border-zinc-200">
        <div tw="flex justify-center border-t border-b border-zinc-200">
          <h1
            tw="mt-8 mb-4 ml-8 mr-8 font-medium"
            style={{
              fontFamily: "Magistral",
              fontSize: 88,
            }}
          >
            {domain}
          </h1>
        </div>

        <div tw="flex justify-center border-b border-zinc-200">
          <p
            tw="mt-0 mb-0 pt-4 pb-4 pl-8 pr-8 font-medium"
            style={{
              fontFamily: "Roboto",
              fontSize: 32,
              color: isForSale ? "#22c55e" : "#71717a",
            }}
          >
            {isForSale
              ? "The domain name is for sale"
              : "The website will be launched soon"}
          </p>
        </div>
      </div>

      <div tw="absolute flex inset-y-0 w-px bg-zinc-200 left-16" />
      <div tw="absolute flex inset-y-0 w-px bg-zinc-200 right-16" />
      <div tw="absolute flex inset-x-0 h-px bg-zinc-200 top-16" />
      <div tw="absolute flex inset-x-0 h-px bg-zinc-200 bottom-16" />

      <div tw="absolute flex bottom-16 right-16">
        <svg
          width="345"
          height="150"
          viewBox="0 0 345 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M122.906 135H70.2321V75H87.7898V105H105.348V15H122.906V135Z"
            fill="black"
          />
          <path
            d="M309.883 150H292.326V120H309.883V150ZM327.442 120H309.884V90H327.442V120ZM344.999 90H327.442V60H344.999V90ZM327.442 60H309.884V30H327.442V60ZM309.883 30H292.326V0H309.883V30Z"
            fill="black"
          />
          <path
            d="M35.1165 150H52.6741V120H35.1165V150ZM17.5579 120H35.1165V90H17.5579V120ZM0.000244141 90H17.5579V60H0.000244141V90ZM17.5579 60H35.1165V30H17.5579V60ZM35.1165 30H52.6741V0H35.1165V30Z"
            fill="black"
          />
          <path
            d="M232.874 135H222.402V111.562H232.874V135ZM243.348 111.562H232.874V88.125H243.348V111.562ZM253.822 88.125H243.348V64.6875H253.822V88.125ZM264.294 64.6875H253.822V41.25H264.294V64.6875ZM274.768 41.25H264.294V17.8125H274.768V41.25Z"
            fill="#969696"
          />
          <path
            d="M200.531 45H166.031V105H200.531V135H148.165V15H200.531V45ZM218.089 105H200.531V45H218.089V105Z"
            fill="black"
          />
        </svg>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Magistral",
          data: magistralMedium,
          weight: 500,
        },
        {
          name: "Roboto",
          data: robotoMedium,
          weight: 500,
        },
      ],
    }
  );
}
