import { unstable_cache } from "next/cache";

import type { Activity } from "@/components/ui-lib/contribution-graph";
import { GITHUB_USERNAME } from "@/config/site";

type GitHubContributionsResponse = {
  contributions: Activity[];
};

export const getGitHubContributions = unstable_cache(
  async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const res = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Failed to fetch contributions: ${res.statusText}`);
      }

      const data = (await res.json()) as GitHubContributionsResponse;
      return data.contributions;
    } catch (error) {
      console.error("Error fetching GitHub contributions:", error);
      return [];
    }
  },
  ["github-contributions"],
  { revalidate: 86400 } // Cache for 1 day (86400 seconds)
);
