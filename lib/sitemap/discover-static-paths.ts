import fs from "node:fs";
import path from "node:path";

const SKIP_DIR_NAMES = new Set(["static-blogs-backup", "api"]);

/** Path segments we do not want in the public sitemap. */
const SKIP_PATH_PREFIXES = [
  "/404",
  "/login",
  "/vault/internal-only",
];

function shouldSkipPathname(pathname: string): boolean {
  const p = pathname === "/" ? "/" : pathname.replace(/\/$/, "") || "/";
  return SKIP_PATH_PREFIXES.some(
    (prefix) => p === prefix || p.startsWith(`${prefix}/`)
  );
}

/**
 * Map an `app/` directory path (relative to `app`, no `page.tsx`) to a URL pathname, or `null` if dynamic / skipped.
 */
export function appRelDirToPathname(relDir: string): string | null {
  if (relDir === "") return "/";
  const segments = relDir.split("/").filter(Boolean);
  const urlSegs: string[] = [];
  for (const seg of segments) {
    if (seg.startsWith("(") && seg.endsWith(")")) continue;
    if (seg.startsWith("[")) return null;
    if (SKIP_DIR_NAMES.has(seg)) return null;
    urlSegs.push(seg);
  }
  if (urlSegs.length === 0) return "/";
  return "/" + urlSegs.join("/");
}

function collectDirsWithPage(appDir: string): string[] {
  const results: string[] = [];

  function rec(absDir: string, relFromApp: string) {
    const entries = fs.readdirSync(absDir, { withFileTypes: true });
    for (const ent of entries) {
      if (!ent.isDirectory()) continue;
      if (SKIP_DIR_NAMES.has(ent.name)) continue;
      const nextAbs = path.join(absDir, ent.name);
      const nextRel = relFromApp ? `${relFromApp}/${ent.name}` : ent.name;
      rec(nextAbs, nextRel);
    }
    if (fs.existsSync(path.join(absDir, "page.tsx"))) {
      results.push(relFromApp);
    }
  }

  rec(appDir, "");
  return results;
}

/**
 * Discover static App Router pathnames at build time (excludes dynamic `[param]` routes and backup blog trees).
 */
export function discoverStaticAppPathnames(): string[] {
  const appDir = path.join(process.cwd(), "app");
  if (!fs.existsSync(appDir)) return [];

  const relDirs = collectDirsWithPage(appDir);
  const pathnames = new Set<string>();

  for (const rel of relDirs) {
    const pathname = appRelDirToPathname(rel);
    if (!pathname) continue;
    if (shouldSkipPathname(pathname)) continue;
    pathnames.add(pathname === "/" ? "/" : pathname.replace(/\/+$/, "") || "/");
  }

  return [...pathnames].sort((a, b) => a.localeCompare(b));
}
