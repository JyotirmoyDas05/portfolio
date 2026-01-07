import { GitHubStars } from "@/components/github-stars";
import { GITHUB_USERNAME } from "@/config/site";

type GitHubRepo = {
  stargazers_count: number;
};

async function getTotalStargazerCount() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    // Fetch all public repos (max 100 per page, sorted by stars)
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=stars`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
        signal: controller.signal,
        next: { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      return 0;
    }

    const repos = (await response.json()) as GitHubRepo[];
    const totalStars = repos.reduce(
      (sum, repo) => sum + (repo.stargazers_count || 0),
      0
    );

    return totalStars;
  } catch {
    return 0;
  }
}

export async function NavItemGitHub() {
  const totalStars = await getTotalStargazerCount();

  return <GitHubStars repo={GITHUB_USERNAME} stargazersCount={totalStars} />;
}
