// pages/index.js
import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";

const lendingData = {
  "title": "Algebrik AI and Conductiv Elevate Lending with Permissioned Data, Automated Stipulations, and Smarter Underwriting",
  "author": "Prateek Samantaray",
  "sections": [
    {
      title: "",
      paragraphs: [
        `
          Algebrik AI, the world’s first cloud-native, AI-powered Loan Origination Platform (LOS), has
          announced a bureau integration partnership with Equifax®, a global data, analytics, and
          technology company. Through this partnership, financial institutions using Algebrik can now
          access a broad spectrum of Equifax data—credit and trended data—natively within their lending
          workflows.
        `
        , `The integration supports credit unions, community banks, and fintech lenders in building more
            accurate, inclusive, and efficient lending experiences, without requiring additional
            implementation cycles.`,
        <span className="font-bold">
          What It Means for Lenders
        </span>,
        "The Equifax–Algebrik partnership brings together structured credit data and real-time lending workflows to help solve persistent pain points in underwriting:",
        <ul className="list-disc ml-4">
          <li><p className="font-bold">Faster Policy Deployment, Backed by Bureau Data</p> With Equifax attributes accessible natively inside Algebrik’s no-code decisioning engine,
            credit and risk teams can deploy new strategies faster—without IT intervention. From
            adjusting score thresholds to introducing new borrower segments, lenders can
            operationalize policy updates with speed and control.</li>
          <li><p className="font-bold">More Inclusive Risk Models</p> Equifax bureau data, including trended credit history and other credit attributes, is now
            surfaced within Algebrik’s decisioning engine—allowing lenders to evaluate applicants
            beyond traditional scores and improve underwriting accuracy.</li>
          <li><p className="font-bold">Prebuilt Compliance Logic</p>Equifax data is utilized within Algebrik’s configurable, audit-ready lending workflows to
            support adherence to Fair Lending, ECOA, and other regulatory mandates—reducing
            manual overhead and compliance risk.</li>
        </ul>
      ]
    },
    {
      "title": "What This Integration Unlocks for Lenders",
      "paragraphs": [
        <ul className="list-disc ml-4">
          <li>
            <p className="font-bold">Designed for Real-Time Risk Logic</p>
            Algebrik’s platform is designed to reduce the operational complexity of lending. By surfacing
            Equifax bureau data natively within our decisioning engine, lenders can avoid switching
            between systems and instead design contextual, data-driven credit policies from a single
            interface. The integration enables no-code configuration of rules using credit file insights—such
            as trended data—allowing credit and risk teams to respond to borrower signals with greater
            speed and precision.
          </li>
          <li>
            <p className="font-bold">Enabling Scalable, Inclusive Lending Growth</p>
            As institutions aim to serve broader borrower segments while maintaining compliance, the
            integration of Equifax bureau data supports more informed, consistent decisioning. By
            incorporating insights from credit files—including trended history and alternative data—lenders
            can more confidently assess thin-file, underserved, and next-gen applicants. The result:
            inclusive credit products launched with accuracy, transparency, and full auditability baked into
            the workflow.
          </li>
        </ul>

      ]
    },
    {
      "title": "About Algebrik AI",
      "paragraphs": [
        `Algebrik AI, headquartered in New York City, is the world’s first cloud-native, AI-powered,
        digital-era Loan Origination System (LOS), designed for the next generation of members. In an
        industry that hasn’t seen significant innovation in lending technology in over 25 years, it was
        high time that someone stepped in to help credit unions of all sizes regain their former glory.
        Algebrik AI’s mission is to empower credit unions to attract, engage, grow, and retain next-gen
        members while staying competitive in today’s digital era. By transforming loan originations end-
        to-end, Algebrik AI takes on the heavy lifting, allowing credit unions to focus on helping the
        members &amp; communities they serve.`
      ]
    },
    {
      "title": "About Equifax",
      "paragraphs": [
        <p>Equifax® is a global data, analytics, and technology company that helps individuals live their
          financial best and helps organizations access the insights they need to make smarter decisions.
          Equifax is committed to expanding access to credit and powering modern lending experiences.
          Learn more at <a href="https://www.equifax.com">https://www.equifax.com</a>
        </p>
      ]
    }
  ]
}


export default function Blog() {
  return (
    <>
      <div className="container mx-auto px-5 md:px-0 py-36 md:w-[1160px] font-plus-jakarta flex flex-col justify-center items-center">
        <div className="flex flex-col items-start text-left w-full gap-[16px]">
          <CustomHeader
            text="Algebrik AI Partners with Equifax® to Power Smarter, Fairer, and Faster Loan Decisions"
            className="w-full"
          />
          {/* Uncomment if needed */}
          {/* <CustomSubtitle
          text="The success of any financial system lies in its ability to adapt and serve its people"
          className="w-full"
        /> */}
        </div>

        <div className="flex flex-col text-black pt-[35px]">
          <div className="flex">
            <div className="flex justify-between items-center w-full border-t border-[#D3D3D3] border-b border-[#D3D3D3] py-5">
              <div className="flex gap-[16px] items-center">
                <div className=" object-cover">
                  <span
                    className="flex justify-center items-center text-xl font-bold rounded-[184.59px] object-cover min-h-[48px] min-w-[48px] text-white bg-[#2a5fac]"
                  >a</span>
                </div>
                <div className="flex flex-col">
                  <div>
                    <h3>Team Algebrik</h3>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-4">
                    <p>Announcement</p>
                    <p>June 16, 2025</p>
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

          <div className="pt-[35px]">
            <Image
              src="/section_images/blog/equifax-partnership.webp"
              width={1160}
              height={500}
              alt=""
              priority
              quality={100}
            />
          </div>

          <div className="flex flex-col pt-[24px] gap-5">
            {lendingData.sections.map((section, index) => (
              <ContentSection
                key={index}
                title={section.title}
                paragraphs={section.paragraphs}
              />
            ))}
          </div>
          {/* <div className="pt-[35px]">
            <Image
              src="/section_images/blog/Partnership-Announcements.webp"
              width={1160}
              height={500}
              alt=""
              priority
              quality={100}
            />
          </div> */}

          <div className="mt-16">
            <CustomHeader text="More Blogs" className="text-center" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {blogContent.slice(0, 3).map((blog, index) => (
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
                    <p className="font-bold mt-4 text-[20px]">{blog.blogTitle}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 flex justify-center w-full cursor-pointer bg-white text-center h-[54px] rounded-b-[20px]">
                    <Link href={`/resource-center/${blog.blogSubtitle.toLowerCase().replace(/ /g, "-")}`} className="text-[#1A69DC] font-semibold">
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
      <h3 className="text-[#292929] text-[20px] leading-[28.13px] font-bold font-plus-jakarta">
        {title}
      </h3>
      <div className="flex flex-col gap-4 text-[16px]">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="flex flex-col gap-4">
            {paragraph}
          </p>
        ))}
      </div>


    </div>
  );
}
