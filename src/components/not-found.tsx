import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NotFound({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-[calc(100svh-5.5rem)] flex-col items-center justify-center",
        className
      )}
    >
      <svg
        className="h-28 w-full text-border"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 256"
        fill="none"
      >
        <path
          d="M113.778 0.5H170.167V63.5H114.278V0.5M170.167 64.5V255.5H57.3889V192.5H113.278V64.5H170.167M0.5 128.5H56.3889V191.5H0.5V128.5M0.5 192.5H56.3889V255.5H0.5V192.5M454.611 64.5H341.833V191.5H454.611V255.5H284.944V0.5H454.611V64.5M511.5 192.5H455.611V64.5H511.5V192.5"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <h1 className="mt-8 mb-6 font-mono text-8xl font-medium">404</h1>

      <Button variant="default" asChild>
        <Link href="/">
          Go to Home
          <ArrowRightIcon />
        </Link>
      </Button>
    </div>
  );
}
