# [jyotimoydas.in](https://jyotimoydas.in) &middot; [![GitHub License](https://img.shields.io/github/license/JyotirmoyDas05/portfolio?label=License)](https://github.com/JyotirmoyDas05/portfolio/blob/main/LICENSE) ![GitHub Repo Views](https://gitviews.com/repo/JyotirmoyDas05/portfolio.svg?style=flat&label-color=%23555&color=%23f59e0b)

A minimal, pixel-perfect dev portfolio, component registry, and blog to showcase my work as a Design Engineer.

Check out the live site: [jyotimoydas.in](https://jyotimoydas.in)

[![screenshot-dark](https://assets.jyotimoydas.in/images/screenshot-desktop-dark.png#gh-dark-mode-only)](https://github.com/JyotirmoyDas05/portfolio#gh-dark-mode-only)
[![screenshot-light](https://assets.jyotimoydas.in/images/screenshot-desktop-light.png#gh-light-mode-only)](https://github.com/JyotirmoyDas05/portfolio#gh-light-mode-only)

## Overview

### Stack

- Next.js 16
- Tailwind CSS v4
- shadcn/ui

### Featured

- Clean & modern design
- Light/Dark themes
- vCard integration
- SEO optimized ([JSON-LD schema](https://json-ld.org), sitemap, robots)
- AI-ready with [/llms.txt](https://llmstxt.org)
- Spam-protected email
- Installable as PWA
- Analytics with [PostHog](https://posthog.com) & consent management via [c15t](https://c15t.com)

### Blog

- Supports MDX & Markdown
- Raw `.mdx` endpoints for AI readability
- Syntax highlighting for clear code presentation
- Dynamic OG images for rich link previews
- RSS feed for easy content distribution

### Registry

Easily build and distribute reusable components, hooks, and pages using a custom registry powered by the [shadcn CLI](https://ui.shadcn.com/docs/cli).

Each entry is well-documented and includes:

- Live preview & code snippets
- Beautiful, readable code blocks
- One-click command blocks (pnpm, npm, yarn, bun)

#### Installing Components

**Option 1: Using the CLI wrapper (recommended)**

```bash
npm i jyotirmoy
npx jyotirmoy add liquid-glass-slider status-button
```

**Option 2: Using shadcn CLI directly**

First, add the registry to your project's `components.json`:

```json
{
  "registries": {
    "@jyotirmoydas": "https://jyotimoydas.in/r/{name}.json"
  }
}
```

Then install any component:

```bash
npx shadcn@latest add @jyotirmoydas/liquid-glass-searchbox
```

### Analytics

User behavior tracking with [PostHog](https://posthog.com) to understand how visitors interact with the site:

- **Copy events** - Track code & command copies
- **Engagement** - Monitor name pronunciation plays, command menu usage
- **Search behavior** - Analyze search queries (debounced)
- **User actions** - Navigation, theme changes, content interactions

Built with privacy in mind:

- Consent management via [c15t](https://c15t.com)
- Cookieless mode until consent
- Production-only tracking
- Type-safe event schema with Zod

## Development

Please refer to the [Development Guide](./DEVELOPMENT.md) for more details.

## License

Licensed under the [MIT license](./LICENSE).

You're free to use my code! Just make sure to <ins>remove all my personal information</ins> before publishing your website. It's awesome to see my code being useful to someone!

## Stats

![Stats](https://repobeats.axiom.co/api/embed/6614ed471ccc18220000e7dabdd56d7ada3ab098.svg "Repobeats analytics image")

## Star History

[![Star History](https://starchart.cc/JyotirmoyDas05/portfolio.svg?variant=adaptive&line)](https://starchart.cc/JyotirmoyDas05/portfolio)

## Acknowledgments

- [React](https://react.dev)
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [Base UI](https://base-ui.com)
- [Motion](https://motion.dev)
- [shadcn/ui](https://ui.shadcn.com)
- [Aceternity UI](https://ui.aceternity.com)
- [Kibo UI](https://www.kibo-ui.com)
- [Lucide](https://lucide.dev)
- [Fumadocs](https://fumadocs.dev)
- [PostHog](https://posthog.com)
- [c15t](https://c15t.com)
- And many other open-source libraries used in `package.json`
