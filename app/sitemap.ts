import type { MetadataRoute } from "next";
import { getResourceCenterBlogSlugs } from "@/lib/resource-center-blog-slugs";
import { discoverStaticAppPathnames } from "@/lib/sitemap/discover-static-paths";

/** Required for `output: "export"` so `/sitemap.xml` is generated at build time. */
export const dynamic = "force-static";

/** Canonical origin for absolute URLs (set in CI/prod to your deployed host). */
const DEFAULT_SITE_URL = "https://algebrik.ai";

function siteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  return raw.replace(/\/+$/, "");
}

/** Matches `trailingSlash: true` in next.config. */
function absoluteUrl(origin: string, pathname: string): string {
  const path =
    pathname === "/" ? "" : pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  return path ? `${origin}/${path}/` : `${origin}/`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = siteOrigin();
  const now = new Date();

  const staticPathnames = discoverStaticAppPathnames();
  const blogSlugs = await getResourceCenterBlogSlugs();

  const entries: MetadataRoute.Sitemap = [];

  for (const pathname of staticPathnames) {
    const changeFrequency =
      pathname === "/" || pathname.startsWith("/resource-center")
        ? "weekly"
        : pathname.startsWith("/webinars")
          ? "monthly"
          : ("monthly" as const);
    const priority =
      pathname === "/"
        ? 1
        : pathname.startsWith("/solutions")
          ? 0.9
          : pathname.startsWith("/resource-center")
            ? 0.85
            : 0.8;

    entries.push({
      url: absoluteUrl(origin, pathname),
      lastModified: now,
      changeFrequency,
      priority,
    });
  }

  for (const slug of blogSlugs) {
    entries.push({
      url: absoluteUrl(origin, `/resource-center/${slug}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    });
  }

  const seen = new Set<string>();
  return entries.filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });
}
