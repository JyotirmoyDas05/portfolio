import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

/**
 * Checks the built registry (public/r) for what `shadcn registry validate`
 * does not: every import in a shipped file must be satisfied by the item, its
 * registryDependencies (followed transitively), or an npm dependency.
 */

const OUT = path.join(process.cwd(), "public/r");
const PROVIDED_BY_PROJECT = new Set(["react", "react-dom", "next"]);

type Item = {
  name: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: { path: string; content?: string }[];
};

const read = (file: string) =>
  JSON.parse(readFileSync(path.join(OUT, file), "utf8"));
const index = read("registry.json") as { name: string; items: Item[] };
const items = new Map<string, Item>(
  readdirSync(OUT)
    .filter((f) => f.endsWith(".json") && f !== "registry.json")
    .map((f) => read(f) as Item)
    .map((item) => [item.name, item])
);

const errors: string[] = [];
const fail = (item: string, message: string) =>
  errors.push(`${item}: ${message}`);

// registryDependencies are shadcn names ("button") or item URLs (".../r/use-sound.json")
const depName = (dep: string) =>
  path.basename(dep.split("?")[0]).replace(/\.json$/, "");

const closure = (name: string, seen = new Set<string>()) => {
  if (seen.has(name)) return seen;
  seen.add(name);
  for (const dep of items.get(name)?.registryDependencies ?? []) {
    closure(depName(dep), seen);
  }
  return seen;
};

const base = (specifier: string) =>
  path.basename(specifier).replace(/\.tsx?$/, "");
const npmName = (s: string) =>
  s.startsWith("@") ? s.split("/").slice(0, 2).join("/") : s.split("/")[0];
const stripComments = (code: string) =>
  code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
const specifiers = (code: string) =>
  [
    ...stripComments(code).matchAll(
      /(?:from|import)\s*\(?\s*["']([^"']+)["']/g
    ),
  ].map((m) => m[1]);

for (const item of items.values()) {
  const group = [...closure(item.name)];
  const shipped = new Set(
    group.flatMap((n) => items.get(n)?.files.map((f) => base(f.path)) ?? [])
  );
  const shadcnBuiltins = new Set(group.filter((n) => !items.has(n)));
  const npm = new Set(
    group
      .flatMap((n) => items.get(n)?.dependencies ?? [])
      .map((d) => d.replace(/(?<=.)@.*$/, ""))
  );

  for (const file of item.files) {
    for (const spec of specifiers(file.content ?? "")) {
      if (spec.startsWith("@/registry/")) {
        const [, , dir, name] = spec.split("/");
        if (!name)
          fail(
            item.name,
            `${file.path} imports "${spec}" (barrel); use "@/registry/${dir}/<file>" so the CLI keeps the file name`
          );
        else if (!shipped.has(name))
          fail(
            item.name,
            `${file.path} imports "${spec}" which no dependency ships`
          );
      } else if (spec.startsWith("@/components/ui/")) {
        if (!shadcnBuiltins.has(base(spec)) && !shipped.has(base(spec)))
          fail(
            item.name,
            `${file.path} imports "${spec}" but "${base(spec)}" is not a registryDependency`
          );
      } else if (spec === "@/lib/utils") {
        // resolved by the CLI to the user's utils alias
      } else if (spec.startsWith("@/lib/") || spec.startsWith("@/hooks/")) {
        if (!shipped.has(base(spec)))
          fail(
            item.name,
            `${file.path} imports "${spec}" which no dependency ships`
          );
      } else if (spec.startsWith("@/") || spec.startsWith(".")) {
        fail(
          item.name,
          `${file.path} imports "${spec}" which will not exist in a user's project`
        );
      } else if (
        !spec.startsWith("node:") &&
        !PROVIDED_BY_PROJECT.has(npmName(spec)) &&
        !npm.has(npmName(spec))
      ) {
        fail(
          item.name,
          `${file.path} imports "${spec}" but "${npmName(spec)}" is not in dependencies`
        );
      }
    }
  }

  for (const dep of item.registryDependencies ?? []) {
    if (dep.startsWith("@"))
      fail(
        item.name,
        `registryDependency "${dep}" needs the namespace configured; use the item URL`
      );
  }
}

if (new Set(index.items.map((i) => i.name)).size !== index.items.length)
  fail("registry.json", "duplicate item names");
if (JSON.stringify(index).includes('"content"'))
  fail("registry.json", 'index must not contain "content"');
for (const entry of index.items) {
  if (!entry.description) fail(entry.name, "missing description");
}

if (errors.length > 0) {
  console.error(
    `Registry verification failed (${errors.length}):\n- ${errors.join("\n- ")}`
  );
  process.exit(1);
}
console.log(`Registry verified: ${items.size} items, all imports satisfied.`);
