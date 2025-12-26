import { USER } from "@/features/portfolio/data/user";
import type { NavItem } from "@/types/nav";

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.APP_URL || "https://jyotimoydas.in",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const MAIN_NAV: NavItem[] = [
  {
    title: "Portfolio",
    href: "/",
  },
  {
    title: "Components",
    href: "/components",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  // {
  //   title: "Sponsors",
  //   href: "/sponsors",
  // },
];

export const GITHUB_USERNAME = "JyotirmoyDas05";
export const SOURCE_CODE_GITHUB_REPO = "JyotirmoyDas05/portfolio";
export const SOURCE_CODE_GITHUB_URL =
  "https://github.com/JyotirmoyDas05/portfolio";

export const SPONSORSHIP_URL = "https://github.com/sponsors/JyotirmoyDas05";

export const UTM_PARAMS = {
  utm_source: "jyotimoydas.in",
  utm_medium: "referral",
  utm_campaign: "portfolio",
};
