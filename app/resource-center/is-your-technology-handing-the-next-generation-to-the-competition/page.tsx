"use client";

import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const blogData = {
  title: "Is Your Technology Handing the Next Generation to the Competition?",
  author: "Team Algebrik",
  readTime: "4 min read",
  publishedDate: "November 10, 2025",
  heroImage:
    "/section_images/blog/Is Your Technology Handing the Next Generation to the Competition.png",
  sections: [
    {
      title: "Let’s cut through the noise.",
      paragraphs: [
        "Your institution stands for trust, community, and service. You invest heavily to tell the world you’re different.",
        "But for the next generation, that message collapses the instant they hit “Apply Now.” What was supposed to feel personal suddenly feels mechanical. What should build connection ends up creating frustration.",
        "The system built to welcome new members often becomes the reason they walk away—not because they don’t believe in your mission, but because your technology makes them feel every inch of its fragmentation.",
        "Think about the members you’re trying to reach: they expect approval speed measured in minutes, not days. If your account opening journey still relies on manual reviews, static forms, or back-and-forth emails, you’re not just slowing them down—you’re sending them straight to the digital banks that won’t.",
      ],
    },
    {
      title: "The Silent Crisis: When Friction Kills Growth and Generates Risk",
      paragraphs: [
        "The problem isn't just about an outdated form; it’s a direct threat to your strategic future. If this sounds familiar, your institution is suffering from the \"Friction Tax.\" Imagine a high-value applicant, a young professional seeking an auto loan and a new checking account, who starts your online application on her phone:",
        <ol className="list-decimal ml-6 space-y-2">
          <li>
            <strong>She hits a static form</strong> that is poorly optimized for mobile.
          </li>
          <li>
            <strong>She gets stuck</strong> when the system asks for her income details via manual document upload.
          </li>
          <li>
            <strong>She drops off</strong> after ten minutes because she was asked to enter her address a third time.
          </li>
        </ol>,
      ],
    },
    {
      title: "The True Cost of Abandonment",
      paragraphs: [
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Growth Leakage:</strong> Industry analysis often pegs high-friction application abandonment rates near 70%. Losing seven out of every ten applicants means your marketing spend is actively generating leads for competitors.
          </li>
          <li>
            <strong>Operational Drag:</strong> Applications that do make it through still require underwriters to spend hours validating PDFs, cross-checking data against core systems, and manually clearing stipulations—costly, non-scalable labor.
          </li>
          <li>
            <strong>Reputational Damage:</strong> Frustrated applicants tell their networks your process is “like something from the 90s.” Your brand promise of superior service is undermined during the first digital handshake.
          </li>
        </ul>,
      ],
    },
    {
      title: "Algebrik AI: The End of Friction, The Start of Speed",
      paragraphs: [
        "Algebrik AI’s DAO module, part of the cloud-native Algebrik ONE suite, isn't just a digitized form; it’s an Agentic AI-orchestrated workflow delivering the instant, seamless experience modern members demand. We eliminate the friction points currently driving applicants away.",
      ],
    },
    {
      title: "Here’s how we transform your onboarding process:",
      paragraphs: [
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-[#1A3A5C]">
              1. Instant Identity and Data Verification
            </h4>
            <p>
              We replace insecure, manual PII checks with multi-layered, instantaneous validation.
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Smart Pre-Filling & Data Enrichment:</strong> Secure, live integrations pull identity, credit, and existing account data instantly. No redundant questions. Applicants feel guided, not interrogated.
              </li>
              <li>
                <strong>AI-Powered Fraud Prevention:</strong> Real-time biometrics, liveness checks, and synthetic identity detection keep compliance tight while preserving a frictionless experience.
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#1A3A5C]">
              2. True Omnichannel Continuity
            </h4>
            <p>
              We preserve your institution’s personal service by ensuring digital and physical channels operate as one.
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Seamless Handoff:</strong> Applicants can switch from mobile to branch without losing progress—representatives pick up the exact screen and guide them to completion.
              </li>
              <li>
                <strong>The Lender’s Cockpit:</strong> Loan officers gain a unified dashboard with a 360° view of every applicant journey, enabling faster, more consistent service.
              </li>
            </ul>
          </div>
        </div>,
      ],
    },
    {
      title: "The Final Question: Are You Ready to Compete?",
      paragraphs: [
        "Your mission is to serve your community. Your technology should be your greatest ally—not your biggest obstacle.",
        "If your account opening process is slow, fragmented, and frustrating, it’s costing you lost revenue and heightened operational risk. It’s time to demand a solution that matches your institutional promise with digital performance.",
        "Algebrik AI equips you to onboard members with the speed of a FinTech while retaining the trust and integrity of your credit union.",
        "Ready to stop losing the next generation to the friction of the past?",
        "Let’s schedule a brief, no-pressure conversation to explore how Algebrik can transform your high drop-off rate into a competitive advantage.",
      ],
    },
  ],
};

export default function Blog() {
  const pathname = usePathname();
  // Extract the slug from pathname like /resource-center/slug-name
  const pathSegments = pathname.split('/').filter(Boolean);
  const currentBlogSlug = pathSegments[pathSegments.length - 1] || '';
  
  // Filter out the current blog article
  const otherBlogs = blogContent.filter(
    (blog) => blog.blogSubtitle !== currentBlogSlug
  );

  return (
    <>
      <div className="container mx-auto px-5 md:px-0 py-36 md:w-[1160px] font-plus-jakarta flex flex-col justify-center items-center">
        <div className="flex flex-col items-start text-left w-full gap-[16px]">
          <CustomHeader text={blogData.title} className="w-full" />
        </div>

        <div className="flex flex-col text-black pt-[35px] w-full">
          <div className="flex">
            <div className="flex justify-between items-center w-full border-y border-[#D3D3D3] py-5">
              <div className="flex gap-[16px] items-center">
                <div className="relative h-[48px] w-[48px] rounded-full overflow-hidden border border-[#D3D3D3]">
                  <Image
                    src="/section_images/blog/favicon.svg"
                    alt="Algebrik favicon"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div>
                    <h3>{blogData.author}</h3>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-4 text-sm text-[#5F5F5F]">
                    <p>{blogData.readTime}</p>
                    <p>{blogData.publishedDate}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-[8px]">
                <Image
                  src="/section_images/blog/play.webp"
                  width={24}
                  height={24}
                  alt=""
                />
                <Image
                  src="/section_images/blog/share.webp"
                  width={24}
                  height={24}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="pt-[35px] relative flex justify-center">
            <Image
              src={blogData.heroImage}
              width={1160}
              height={500}
              alt={blogData.title}
              priority
              quality={100}
              className="rounded-[24px] object-cover"
            />
          </div>

          <div className="flex flex-col pt-[24px] gap-6">
            {blogData.sections.map((section, index) => (
              <ContentSection
                key={index}
                title={section.title}
                paragraphs={section.paragraphs}
              />
            ))}
          </div>

          <div className="mt-16">
            <CustomHeader text="More Blogs" className="text-center" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {otherBlogs.slice(0, 3).map((blog, index) => (
                <div
                  key={index}
                  className="bg-white max-w-[360px] h-[528px] text-gray-900 rounded-[20px] shadow p-6 relative flex flex-col"
                >
                  <div className="h-[269px]">
                    <Image
                      src={blog.blogImage}
                      alt={`Image for ${blog.blogTitle}`}
                      width={360}
                      height={209}
                      className="rounded-md object-cover"
                      quality={100}
                    />
                    <h6 className="text-gray-400 tracking-widest text-[14px] font-bold uppercase md:mt-4 mb-2">
                      Blog
                    </h6>
                    <p className="font-bold mt-4 text-[20px]">
                      {blog.blogTitle}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 flex justify-center w-full cursor-pointer bg-white text-center h-[54px] rounded-b-[20px]">
                    <Link
                      href={`/resource-center/${blog.blogSubtitle
                        .toLowerCase()
                        .replace(/ /g, "-")}`}
                      className="text-[#1A69DC] font-semibold"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ReadyToGo />
    </>
  );
}

interface ContentSectionProps {
  title: string;
  paragraphs: any[];
}

function ContentSection({ title, paragraphs }: ContentSectionProps) {
  return (
    <div className="flex flex-col gap-[16px]">
      {title && (
        <h3 className="text-[#292929] text-[20px] leading-[28.13px] font-bold font-plus-jakarta">
          {title}
        </h3>
      )}
      <div className="flex flex-col gap-4 text-[16px] leading-[26px] text-[#292929]">
        {paragraphs.map((paragraph, index) => (
          <div key={index} className="flex flex-col gap-3">
            {paragraph}
          </div>
        ))}
      </div>
    </div>
  );
}

