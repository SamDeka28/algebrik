"use client";

import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const blogData = {
  title:
    "Why Legacy Loan Systems Are Guaranteeing Failure (And the New 30% Opportunity)",
  author: "Aditya Bajaj",
  readTime: "5 min read",
  publishedDate: "November 10, 2025",
  heroImage: "/section_images/blog/Why Legacy Loan Systems Are Guaranteeing Failure.png",
  sections: [
    {
      title: "The Executive Alert: 70% of New Members Are a Cost, Not an Asset",
      paragraphs: [
        "Credit union leaders are confronting a seismic shift in the economics of growth. For years, the strategy was clear: fuel Loan Acquisition, especially through Indirect Lending. But that engine is stalling—thin margins, shallow engagement, and a mounting cost of churn are eroding returns.",
        "The cold, hard stat: recent industry data shows that 70% of newly acquired accounts go inactive within the first 90 days. That means for every ten “bites” your marketing hooks, seven swim away—leaving you with sunk acquisition costs and lost lifetime value. The painful truth: most “new members” are not assets; they’re expenses waiting to be written off.",
        "The era of incremental improvement is over. It’s time for a strategic reset—one that moves beyond acquisition to anchoring.",
      ],
    },
    {
      title: "PFI is Dead: The Digital Experience is the New Brand Loyalty",
      paragraphs: [
        "The idea of the Primary Financial Institution (PFI) is no longer relevant to the digital consumer. Today's member is transactional, empowered by technology, and demands instant results. The friction that defined the legacy credit union experience—driving to a branch, filling out paper, waiting days for approval—is no longer a minor annoyance; it's the primary cause of abandonment.",
      ],
    },
    {
      title: 'The "Must-Have" Digital Gatekeeper: Instant DAO',
      paragraphs: [
        "To compete with digital banks and FinTechs, Digital Account Opening (DAO) is no longer a \"nice-to-have\" feature; it is the gatekeeper of your future membership base.",
        "The conversation is simple: if it takes more than five minutes to open a checking account, you have already lost the member. Your biggest competitor isn't the bank down the street; it's the browser tab a potential member closes halfway through a clunky application.",
        "To solve the 70% churn problem, the lending journey must be a single, frictionless, and intelligent experience—starting with a deposit account that serves as the anchor.",
      ],
    },
    {
      title: "The Strategic Shift: From Lender to Lifecycle Manager",
      paragraphs: [
        "The true value lies in the 30% opportunity—the members who do not churn. The goal is to maximize the profitability and lifetime value of this segment by moving them from a single product (like an auto loan) to a multi-product core relationship.",
        "This requires technology that integrates the entire member journey, turning the moment of acquisition into a strategic cross-sell moment.",
      ],
    },
    {
      title: "The Algebrik Solution: Unifying Intelligence and Experience",
      paragraphs: [
        "Algebrik AI addresses this mandate by fusing the two critical components of membership growth—DAO and LOS—into one powerful, cloud-native suite, Algebrik One.",
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse border border-[#D3D3D3] text-left text-[16px] leading-[26px]">
            <thead className="bg-[#F5F7FB] text-[#1A3A5C] font-semibold">
              <tr>
                <th className="border border-[#D3D3D3] px-4 py-3 w-1/4">
                  Strategic Priority
                </th>
                <th className="border border-[#D3D3D3] px-4 py-3 w-2/4">
                  Algebrik AI's Solution (Algebrik One)
                </th>
                <th className="border border-[#D3D3D3] px-4 py-3 w-1/4">
                  Business Impact
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="border border-[#D3D3D3] px-4 py-4 font-semibold text-[#1A3A5C]">
                  Solve Friction/Abandonment
                </td>
                <td className="border border-[#D3D3D3] px-4 py-4">
                  Unified DAO & LOS: Seamless, mobile-first experience that eliminates application forms and paper, powered by real-time ID verification.
                </td>
                <td className="border border-[#D3D3D3] px-4 py-4">
                  Increased Completion Rates: Reduces abandonment by addressing the "browser tab closed" failure point.
                </td>
              </tr>
              <tr className="bg-[#FAFBFF]">
                <td className="border border-[#D3D3D3] px-4 py-4 font-semibold text-[#1A3A5C]">
                  Anchor the Member
                </td>
                <td className="border border-[#D3D3D3] px-4 py-4">
                  Integrated Digital Account Opening (DAO): Provides an instant checking/savings account within or immediately after the initial loan application.
                </td>
                <td className="border border-[#D3D3D3] px-4 py-4">
                  De-risks Acquisition: Establishes the core relationship needed to retain the member beyond the loan.
                </td>
              </tr>
              <tr className="bg-white">
                <td className="border border-[#D3D3D3] px-4 py-4 font-semibold text-[#1A3A5C]">
                  Drive Profitable Cross-Sell
                </td>
                <td className="border border-[#D3D3D3] px-4 py-4">
                  In-System AI Decisioning & Data Visibility: Leverages AI (via partnerships like Scienaptic) to surface next-best-action offers directly to the lender or embedded in the member portal.
                </td>
                <td className="border border-[#D3D3D3] px-4 py-4">
                  Maximizes ROI: Ensures that follow-up outreach (sent by the CU) is intelligent, timely, and hyper-personalized based on member data and risk profile.
                </td>
              </tr>
              <tr className="bg-[#FAFBFF]">
                <td className="border border-[#D3D3D3] px-4 py-4 font-semibold text-[#1A3A5C]">
                  Future-Proof Operations
                </td>
                <td className="border border-[#D3D3D3] px-4 py-4">
                  Cloud-Native, Modular Architecture: Allows for rapid deployment and continuous updates without the "legacy baggage" of traditional core systems.
                </td>
                <td className="border border-[#D3D3D3] px-4 py-4">
                  Competitive Agility: Positions the Credit Union to launch new products faster and scale without heavy IT lift.
                </td>
              </tr>
            </tbody>
          </table>
        </div>,
      ],
    },
    {
      title: "Your Call to Action: Measure Success Beyond Origination",
      paragraphs: [
        "To thrive in the digital era, credit unions must stop accepting the 70% churn rate as the cost of doing business. You must treat every new member interaction as a high-stakes, personalized digital experience.",
        "The Algebrik One suite is not just a technology upgrade; it is a strategic foundation built for the next generation of credit union members. It transforms your lending operation from a transactional cost center into a Member Lifecycle Management engine.",
        "The only way to win the loyalty war is to equip your teams with the intelligence and speed to compete.",
      ],
    },
    {
      title: "Schedule a 30 Minute Strategy Review: Optimize Your 30% Opportunity",
      paragraphs: [
        "Stop financing wasted acquisition costs. Start investing in a system that anchors members from day one.",
        "Request a 30 minute, executive-level demo to review Algebrik AI's integrated DAO and LOS—and see the quantifiable ROI of making your new members stick.",
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
                 <div className="flex justify-center items-center text-xl font-bold rounded-[184.59px] object-cover min-h-[48px] min-w-[48px] text-white bg-[#2a5fac]">AB</div>
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

