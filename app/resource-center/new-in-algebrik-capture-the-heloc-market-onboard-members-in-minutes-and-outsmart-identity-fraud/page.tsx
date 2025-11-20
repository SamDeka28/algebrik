"use client";

import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const blogData = {
  title:
    "New in Algebrik: Capture the HELOC Market, Onboard Members in Minutes, and Outsmart Identity Fraud",
  author: "Team Algebrik",
  readTime: "4 min read",
  publishedDate: "November 10, 2025",
  heroImage: "/section_images/blog/nia.png",
  sections: [
    {
      title: "",
      paragraphs: [
        "Your Loan Origination System (LOS) must evolve beyond a processing tool—it needs to be your strategic engine for member growth and efficiency. In today's digital landscape, that means two things: delivering a frictionless member experience and protecting your portfolio from sophisticated fraud.",
        "This month, we've delivered key features that address both. We've embedded new high-demand loan products and deep third-party risk intelligence directly into the LOS, ensuring your institution has the competitive advantage and clarity required for modern lending.",
        "Let's dive into the strategic impact of this release:",
      ],
    },
    {
      title:
        "Strategic Imperative 1: Accelerate Growth with Embedded Digital Account Opening (DAO)",
      paragraphs: [
        "Digital friction is the silent killer of growth. The next generation of members expects a seamless, branch-free onboarding experience. Our new Digital Account Opening (DAO) platform is designed to convert digital-native prospects into loyal members in minutes.",
        <>
          <h4 className="font-semibold text-[#1A3A5C]">
            The Strategic Advantage:
          </h4>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Frictionless Onboarding:</strong> We securely pre-fill
              personal information, drastically reducing abandonment rates and
              improving the new member experience.
            </li>
            <li>
              <strong>Automated Eligibility:</strong> Instantly verify
              membership eligibility based on your specific charter criteria,
              ensuring compliance and efficiency.
            </li>
            <li>
              <strong>Immediate Deepening of Relationships:</strong> Upon
              account opening, our integrated decisioning engine analyzes the
              member’s credit profile and automatically presents pre-approved,
              high-value refinance and cross-sell offers—highlighting potential
              monthly savings on existing debts and locking in loyalty from Day
              One.
            </li>
          </ul>
        </>,
        "Impact: By automating the acquisition and cross-sell process, your staff shifts focus from low-value paperwork to high-value relationship management, driving measurable growth and loyalty.",
      ],
    },
    {
      title: "Strategic Imperative 2: Capture the High-Value HELOC Market Efficiently",
      paragraphs: [
        "The traditional Home Equity Line of Credit (HELOC) process is notorious for its complexity, manual overhead, and lengthy closing times. Our new, fully integrated HELOC product is engineered to transform this process from a 45-day liability into a streamlined asset.",
        <>
          <h4 className="font-semibold text-[#1A3A5C]">
            Operational Efficiency & Risk Mitigation:
          </h4>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Digital-First Workflow:</strong> Provides a modern, guided
              application experience for a secured revolving line of credit.
            </li>
            <li>
              <strong>Automated Valuation & Logic:</strong> The LOS automates
              key underwriting steps, integrating property and valuation tools
              (including AVMs) to instantly apply complex logic using parameters
              like LTV and CLTV—ensuring the right credit line and program every
              time.
            </li>
          </ul>
        </>,
        "Impact: We replace manual, error-prone tasks with an automated workflow that enhances data accuracy, reduces processing time, and positions your credit union to effectively capture the high-value home equity market.",
      ],
    },
    {
      title:
        "Strategic Imperative 3: Risk Intelligence 2.0 for Uncompromised Decisioning",
      paragraphs: [
        "In an era of rising identity and synthetic fraud, speed cannot come at the expense of security. Risk Tab 2.0 is a comprehensive revamp designed to provide instant, consolidated risk data for protected decision-making.",
        <>
          <h4 className="font-semibold text-[#1A3A5C]">
            The Power of Consolidated Intelligence:
          </h4>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Single-View Due Diligence:</strong> Unify internal,
              external, fraud, and watchlist data into a single, intuitive
              screen—eliminating system hopping for validation.
            </li>
            <li>
              <strong>Instant Identity Verification:</strong> Deep integrations
              with LexisNexis InstantID and TransUnion TruValidate instantly
              score applicant identity validity, acting as a digital control
              point for every application.
            </li>
            <li>
              <strong>Enabling Straight-Through Processing (STP):</strong> High-confidence identity checks allow verified members to bypass manual documentation, dramatically accelerating approvals.
            </li>
            <li>
              <strong>Actionable Intelligence:</strong> When risk is detected,
              the system provides specific, human-readable reason codes (e.g.,
              “SSN Mismatch,” “Suspicious Address Activity”) so teams can
              resolve exceptions fast.
            </li>
          </ul>
        </>,
        "Impact: Every fast decision is now a protected decision, safeguarding your institution while dramatically accelerating approvals for low-risk members.",
      ],
    },
    {
      title: "Invest in the Future of Lending",
      paragraphs: [
        "This release is about more than feature updates—it’s about providing the infrastructure needed to compete and thrive. Faster journeys, smarter decisions, and hyper-personalized experiences are now the foundation of member loyalty.",
        <>
          Ready to see how Algebrik provides a measurable competitive edge?
          Request a strategic demo with our Executive Team today.
        </>,
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
              alt="Algebrik product release hero"
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

