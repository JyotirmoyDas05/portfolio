export type SocialLink = {
  /** Icon image URL (absolute or path under /public) shown beside the title. */
  icon: string;
  /** Optional CSS classes applied to the icon image. */
  iconClassName?: string;
  title: string;
  /** Optional handle/username or subtitle displayed under the title. */
  description?: string;
  /** External profile URL opened when the item is clicked. */
  href: string;
};
