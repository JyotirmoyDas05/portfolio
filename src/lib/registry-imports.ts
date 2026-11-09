/**
 * Mirrors how the shadcn CLI rewrites registry imports on install:
 * `@/registry/<dir>/<file>` becomes `<components alias>/<file>`.
 * Used so the code shown in the docs matches what users actually get.
 */
export function toInstalledImports(source: string) {
  return source.replace(/@\/registry\/[\w-]+\/([\w-]+)/g, "@/components/$1");
}
