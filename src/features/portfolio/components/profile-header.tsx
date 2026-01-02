import { FlipSentences } from "@/components/flip-sentences";
import { USER } from "@/features/portfolio/data/user";

import { PixelTransitionAvatar } from "./pixel-transition-avatar";
import { PronounceMyName } from "./pronounce-my-name";
import { VerifiedIcon } from "./verified-icon";

export function ProfileHeader() {
  return (
    <div className="screen-line-after flex border-x border-edge">
      <div className="shrink-0 border-r border-edge">
        <div className="mx-0.5 my-0.75">
          {USER.avatarReal ? (
            <PixelTransitionAvatar
              defaultSrc={USER.avatar}
              hoverSrc={USER.avatarReal}
              alt={`${USER.displayName}'s avatar`}
              size={160}
              className="size-32 sm:size-40"
            />
          ) : (
            <img
              className="size-32 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-40"
              alt={`${USER.displayName}'s avatar`}
              src={USER.avatar}
              fetchPriority="high"
            />
          )}
        </div>

        <a
          href="https://www.india.gov.in"
          target="_blank"
          rel="noreferrer"
          className="absolute top-0 -left-px"
        >
          {/* Flag of India */}
          <svg
            className="h-8 sm:h-9"
            viewBox="0 0 45 30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Flag of India</title>
            <rect width="45" height="10" fill="#FF9933" />
            <rect y="10" width="45" height="10" fill="#FFFFFF" />
            <rect y="20" width="45" height="10" fill="#138808" />
            <circle
              cx="22.5"
              cy="15"
              r="4"
              fill="#000080"
              fillOpacity="0"
              stroke="#000080"
              strokeWidth="0.5"
            />
            <circle
              cx="22.5"
              cy="15"
              r="3.5"
              fill="none"
              stroke="#000080"
              strokeWidth="0.3"
            />
            {/* Ashoka Chakra - 24 spokes */}
            <g fill="#000080" transform="translate(22.5, 15)">
              {Array.from({ length: 24 }).map((_, i) => (
                <line
                  key={i}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="-3.2"
                  stroke="#000080"
                  strokeWidth="0.2"
                  transform={`rotate(${i * 15})`}
                />
              ))}
            </g>
          </svg>
        </a>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex grow items-end pb-1 pl-4">
          <div className="line-clamp-1 font-mono text-xs text-zinc-300 select-none max-sm:hidden dark:text-zinc-800">
            {"text-3xl "}
            <span className="inline dark:hidden">text-zinc-950</span>
            <span className="hidden dark:inline">text-zinc-50</span>
            {" font-medium"}
          </div>
        </div>

        <div className="border-t border-edge">
          <div className="flex items-center gap-2 pl-4">
            <h1 className="-translate-y-px text-3xl font-semibold">
              {USER.displayName}
            </h1>

            <VerifiedIcon
              className="size-4.5 text-info select-none"
              aria-label="Verified"
            />

            {USER.namePronunciationUrl && (
              <PronounceMyName
                namePronunciationUrl={USER.namePronunciationUrl}
              />
            )}
          </div>

          <div className="h-12.5 border-t border-edge py-1 pl-4 sm:h-9">
            <FlipSentences
              className="font-mono text-sm text-balance text-muted-foreground"
              variants={{
                initial: { y: -10, opacity: 0 },
                animate: { y: -1, opacity: 1 },
                exit: { y: 10, opacity: 0 },
              }}
            >
              {USER.flipSentences}
            </FlipSentences>
          </div>
        </div>
      </div>
    </div>
  );
}
