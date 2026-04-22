import { StrapiAPI } from "@/lib/strapi";

/** Slugs linked from the site (Navbar, articles, legacy underscores) so `output: "export"` always has a matching `[slug]` page. */
export const KNOWN_RESOURCE_CENTER_BLOG_SLUGS: string[] = [
  "when-the-game-changes",
  "when-the-game-changes-1",
  "from-piggy-banks-to-product-hooks-why-credit-unions-need-a-feature-strategy",
  "year-one-at-algebrik",
  "credit-union-lessons-from-trendwatch-q2",
  "mastering-digital-onboarding",
  "cable-tv-lending-is-dead",
  "the-future-of-auto-lending",
  "automating-lending-decisions-with-unprecedented-precision",
  "building-digital-first-loyalty-for-credit-unions",
  "how-credit-unions-are-putting-agentic-ai-to-work",
  "the-silent-sabotage",
  "is-your-member-experience-broken",
  "a-product-peek-into-what-is-new-at-algebrik-this-month",
  "what-driving-the-shift-to-intelligent-lending",
  "innovations-reshaping-lending-workflows",
  "what-you-will-learn-in-our-intelligent-lending-roundtable",
  "credit-union-mergers-are-at-an-all-time-high",
  "how-digital-first-credit-unions-are-winning-member-loyalty",
  "beyond-decisioning",
  "beyond_decisioning",
  "redefining_borrower",
  "from-fragmentation-to-seamlessness",
  "out-of-the-lending-maze",
  "algebrik-ai-and-conductiv-elevate-lending-with-permissioned-data-automated-stipulations-and-smarter-underwriting",
  "algebrik-ai-partners-with-equifax-to-power-smarter-fairer-and-faster-loan-decisions",
  "ai-is-the-engine-people-are-the-trust",
  "new-in-algebrik-capture-the-heloc-market-onboard-members-in-minutes-and-outsmart-identity-fraud",
  "why-legacy-loan-systems-are-guaranteeing-failure-and-the-new-30-opportunity",
  "is-your-technology-handing-the-next-generation-to-the-competition",
];

export async function fetchAllBlogSlugsFromStrapi(): Promise<string[]> {
  const slugs: string[] = [];
  let page = 1;
  const pageSize = 100;
  try {
    while (true) {
      const blogs = await StrapiAPI.find("blogs", {
        fields: ["slug"],
        pagination: { page, pageSize },
      });
      if (!blogs?.length) break;
      const rows = blogs as unknown as Array<{
        slug?: string;
        attributes?: { slug?: string };
      }>;
      for (const blog of rows) {
        const s =
          typeof blog?.slug === "string"
            ? blog.slug
            : typeof blog?.attributes?.slug === "string"
              ? blog.attributes.slug
              : "";
        if (s.trim()) slugs.push(s.trim());
      }
      if (blogs.length < pageSize) break;
      page += 1;
    }
  } catch (error) {
    console.error("Blog slug fetch (Strapi) failed:", error);
  }
  return slugs;
}

export function uniqueSlugParams(slugs: string[]): { slug: string }[] {
  const seen = new Set<string>();
  const out: { slug: string }[] = [];
  for (const raw of slugs) {
    const slug = typeof raw === "string" ? raw.trim() : "";
    if (!slug || slug.includes("/")) continue;
    if (seen.has(slug)) continue;
    seen.add(slug);
    out.push({ slug });
  }
  return out;
}

/** Unique blog slugs for `[slug]` routes (known + CMS). */
export async function getResourceCenterBlogSlugs(): Promise<string[]> {
  const fromCms = await fetchAllBlogSlugsFromStrapi();
  return uniqueSlugParams([
    ...KNOWN_RESOURCE_CENTER_BLOG_SLUGS,
    ...fromCms,
  ]).map((p) => p.slug);
}
