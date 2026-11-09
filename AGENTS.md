# AI Agent Guidelines for jyotimoydas.in

This guide provides essential information for AI agents working with the jyotimoydas.in codebase - a Next.js dev portfolio, blog, and component registry website.

## Project Overview

**jyotimoydas.in** is a minimal, pixel-perfect dev portfolio, component registry, and blog built with modern web technologies. It serves as:

- Personal portfolio for Jyotirmoy Das (@jyotimoydas)
- Component registry using shadcn/ui system
- Blog with MDX content
- Showcase for custom React components

### Key Features

- **Clean & modern design** - Minimalist interface with attention to detail
- **Light/Dark themes** - Seamless theme switching with system preference support
- **vCard integration** - Downloadable contact card
- **SEO optimized** - JSON-LD schema, sitemap, robots.txt
- **AI-ready** - Supports /llms.txt for AI agent accessibility
- **Spam-protected email** - Encoded contact information
- **PWA support** - Installable as Progressive Web App
- **Blog system** - MDX/Markdown support with syntax highlighting, dynamic OG images, RSS feed
- **Component registry** - Reusable components distributed via shadcn CLI

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + custom components
- **Package Manager**: bun
- **Language**: TypeScript
- **Content**: MDX for blog posts
- **Deployment**: Vercel

## Project Structure

### Key Directories

```
src/
├── app/                    # Next.js App Router pages
│   ├── (app)/             # Main app routes
│   ├── (llms)/            # LLM-related routes
│   ├── og/                # Open Graph image generation
│   └── rss/               # RSS feed generation
├── components/            # Shared UI components
├── registry/              # Component registry source
├── __registry__/          # Auto-generated registry files (DO NOT EDIT)
├── features/              # Feature-based modules
│   ├── blog/              # Blog functionality
│   └── portfolio/         # User portfolio data
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
└── styles/                # Global styles
packages/
└── ncdai/                 # Publishable component package
```

### Important Files

- `src/config/site.ts` - Site configuration and navigation
- `src/config/registry.ts` - Registry configuration
- `src/features/portfolio/data/user.ts` - User portfolio data
- `src/registry/index.ts` - Registry entry point
- `components.json` - shadcn/ui configuration

## Component Registry System

The project features a custom component registry built on top of shadcn/ui:

### Registry Structure

- **Components** (`src/registry/registry-components.ts`) - UI components
- **Hooks** (`src/registry/registry-hook.ts`) - Custom React hooks
- **Blocks** (`src/registry/registry-blocks.ts`) - Pre-built blocks and sections
- **Examples** (`src/registry/registry-examples.ts`) - Component demos
- **Lib** (`src/registry/registry-lib.ts`) - Utility functions

### Registry Types

- `registry:component` - Reusable UI components
- `registry:hook` - Custom React hooks
- `registry:block` - Pre-built blocks and sections
- `registry:example` - Component examples/demos
- `registry:lib` - Utility libraries

### Available Items

Components: theme-switcher, flip-sentences, apple-hello-effect, work-experience, shimmering-text, slide-to-unlock, liquid-glass-slider, liquid-glass-searchbox, command-box, github-stars, scroll-fade-effect, dynamic-scroll-island-toc, status-button, status-indicator.

Hooks: use-controllable-state, use-sound, use-theme-transition. Lib: liquid-glass-lib.

Blocks (`*-block-NN`) are installable demos of the components above.

### Registry Authoring Rules

Files shipped by an item land in the user’s project, so they must work there. `bun run registry:build` runs `registry:verify`, which fails the build on the mistakes below.

- Import `cn` from `"cn"` and list `"cn"` in `dependencies`. Never add a `utils` registry item or depend on one (it overwrites the user’s `utils.ts`).
- Import other registry files as `@/registry/<dir>/<file>` (e.g. `@/registry/status-button/status-button`). The CLI turns this into `@/components/<file>`. Never import through a barrel (`@/registry/<dir>`): the CLI would rewrite it to `@/components` and drop the file name. Do not use relative imports between items.
- Use `registryItemUrl("name")` from `src/config/registry.ts` for dependencies on this registry, so plain URL installs resolve without the `@jyotirmoydas` namespace configured. Use bare names (`"button"`, `"command"`) for shadcn items.
- Every shadcn component a file imports (`@/components/ui/*`) must be in `registryDependencies`. Every hook, lib or component a file imports must be shipped by the item or one of its dependencies. Never import portfolio-only files (`@/components/icons`, `@/lib/events`, ...).
- Every item needs `title` and `description`. Keep the registry flat and never put `content` in `registry.json`.
- `registry:build` empties `public/r` first, so removing an item from the registry stops it being served.

> **Note**: All components are compatible with [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4) and [React 19](https://react.dev/blog/2024/12/05/react-19).

### Registry Build Process

```bash
# Build registry internally
bun run registry:internal:build

# Build shadcn registry (also runs registry:verify)
bun run registry:build
```

Auto-generated files (DO NOT EDIT):

- `src/__registry__/index.tsx`
- `src/__registry__/registry.autogenerated.json`
- `public/r/*.json`

## Development Guidelines

### Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun dev  # Runs on port 1408

# Build for production
bun run build
```

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js configuration
- **Prettier**: Code formatting
- **File naming**: kebab-case for files, PascalCase for components

### Coding Guidelines

When writing code for this project, follow these principles:

**TypeScript & Documentation**

- Write type-safe TypeScript code with explicit types when necessary
- Add comments only when they clarify complex logic, function purpose, or non-obvious behavior
- Avoid obvious comments that merely restate the code
- Use descriptive variable and function names that make the code self-documenting
- Keep comments concise and focused on the "why" rather than the "what"

**Code Style**

- No emojis in code, comments, or commit messages
- Write clean, readable code that minimizes the need for extensive documentation
- Prefer self-explanatory code over commented code
- Use JSDoc for public APIs and exported functions when the signature alone isn't clear

**Best Practices**

- Follow SOLID principles and clean code practices
- Keep functions small and focused on a single responsibility
- Use meaningful names that reveal intent
- Write code that is easy to understand at first glance
- Avoid over-commenting; let the code speak for itself

### Component Development

1. Create component in `src/registry/[component-name]/`
2. Add to appropriate registry file (`registry-components.ts`, etc.)
3. Create examples in `src/registry/examples/`
4. Run registry build commands
5. Update documentation

## Working with Content

### Blog Posts

- Location: `src/features/blog/content/`
- Format: MDX files
- Supports: Custom components, code blocks, metadata

### User Portfolio

**Portfolio Data Files** (`src/features/portfolio/data/`):

- `user.ts` - Core personal information, bio, contact details, job history
- `experiences.ts` - Detailed work experience, education, company information
- `projects.ts` - Portfolio projects with descriptions, links, skills, logos
- `tech-stack.ts` - Technology stack, programming languages, tools, frameworks
- `awards.ts` - Competition awards, prizes, academic achievements, certificates
- `certifications.ts` - Professional certifications, course completions, credentials
- `social-links.ts` - Social media profiles, professional networks, contact links
- `testimonials.ts` - Professional recommendations, endorsements from colleagues and clients

## Environment & Configuration

### Environment Variables

See `.env.example` for required variables:

**Core Application**:

- `APP_URL` - Application base URL (e.g., `https://acme.com`)

**Registry Configuration**:

- `REGISTRY_NAMESPACE` - Namespace identifier for shadcn CLI (e.g., `@acme`)
- `REGISTRY_NAMESPACE_URL` - URL pattern for component resolution (e.g., `https://acme.com/r/{name}.json`)

**External Services**:

- `GITHUB_API_TOKEN` - GitHub Personal Access Token for API calls ([Get token](https://github.com/settings/tokens))
- `NEXT_PUBLIC_DMCA_URL` - DMCA Protection badge URL ([DMCA ProtectionPro](https://www.dmca.com/ProtectionPro.aspx))

**Analytics & Tracking**:

- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog project API key for analytics ([Get key](https://posthog.com))
- `NEXT_PUBLIC_POSTHOG_HOST` - PostHog API host URL (e.g., `https://ph.acme.com`)
- `NEXT_PUBLIC_POSTHOG_UI_HOST` - PostHog UI host URL (e.g., `https://us.i.posthog.com`)

### Analytics Events

The project uses PostHog for analytics tracking. Events are defined in `src/lib/events.ts` and tracked via `trackEvent()` function.

**Tracked Events**:

- `copy_npm_command` - User copies npm/pnpm/yarn/bun install command
  - Properties: `code` (command text)
- `copy_code_block` - User copies code block from blog/docs
  - Properties: `code` (code content)
- `play_name_pronunciation` - User plays name pronunciation audio
- `open_command_menu` - User opens command menu
  - Properties: `method` ("click" | "keyboard"), `key` (keyboard shortcut used)
- `command_menu_search` - User searches in command menu (debounced 500ms)
  - Properties: `query` (search text), `query_length` (query length)
- `command_menu_action` - User performs action in command menu
  - Navigation: Properties `action: "navigate"`, `href`, `open_in_new_tab`
  - Copy: Properties `action: "copy"`, `text` (copied content)
  - Theme: Properties `action: "change_theme"`, `theme` ("light" | "dark" | "system")
- `blog_search` - User searches blog posts (debounced 500ms)
  - Properties: `query` (search text), `query_length` (query length)

**Implementation Details**:

- Events use Zod schema validation for type safety
- PostHog initialized in `src/instrumentation-client.ts` (production only)
- Consent management via `@c15t/nextjs` package
- Cookieless mode enabled until user consent

### Site Configuration

- Navigation: `MAIN_NAV` in `src/config/site.ts`
- Theme colors: `META_THEME_COLORS`
- GitHub repo: `SOURCE_CODE_GITHUB_REPO`

## Common Tasks

### Adding a New Component

1. Create component directory: `src/registry/[name]/`
2. Implement component with proper TypeScript types
3. Add to `src/registry/registry-components.ts`
4. Create example in `src/registry/examples/`
5. Build registry: `bun run registry:build`

### Updating User Information

Edit `src/features/portfolio/data/user.ts` with new:

- Personal information
- Job details
- Project descriptions
- Contact information

### Adding Blog Posts

1. Create MDX file in `src/features/blog/content/`
2. Include frontmatter metadata
3. Use custom components for enhanced content

### Styling Guidelines

- Use Tailwind CSS v4 syntax
- Follow existing color scheme (zinc-based)
- Support dark/light modes
- Use CSS variables for theme colors

## Important Notes

### Registry Dependencies

- Components may depend on external packages

### Package Version Pinning

- **Consent Manager**: `@c15t/nextjs` is pinned exactly to `"1.8.3"`. Do NOT upgrade this package. Version 2.x enforces default stylesheet files that conflict with custom theme slots, button encasings, and dialog backdrop stacking. Pinning to version `1.8.3` keeps it headless-friendly and fully compatible with the custom slots defined in `src/components/consent-manager.tsx`.


### Auto-generated Files

**NEVER EDIT** these files directly:

- `src/__registry__/index.tsx`
- `src/__registry__/registry.autogenerated.json`
- Files in `public/r/`

### Performance Considerations

- Components use React.lazy() for code splitting
- Images optimized with Next.js Image component
- MDX content is statically generated

### Personal Information

When adapting this codebase, ensure ALL personal information is replaced:

**Key Areas to Update**:

- All files in `src/features/portfolio/data/` (see User Portfolio section above)
- `src/config/site.ts` - Site name, navigation, GitHub repo, UTM params
- Blog posts in `src/features/blog/content/`
- Asset URLs (images, logos, audio files) throughout the codebase

**Important**: Portfolio data contains encoded contact information (base64) and specific asset URLs that must be updated for your own use.

## Deployment

### Vercel Deployment

- Automatic deployment from GitHub
- Environment variables configured in Vercel dashboard
- Build command: `bun run build`
- Output directory: `.next`

### Build Commands

```bash
bun run build          # Production build
bun start              # Start production server
bun run preview        # Build and preview locally
```

## Contributing

### Code Quality

- Run `bun run lint` before committing
- Use `bun run format:write` for code formatting
- Check types with `bun run check-types`

### Testing Registry Components

- Test components in isolation
- Verify registry build process
- Test installation via shadcn CLI

---

**Note**: This is a personal portfolio project. When using as a template, ensure all personal information is removed and replaced with your own content.
