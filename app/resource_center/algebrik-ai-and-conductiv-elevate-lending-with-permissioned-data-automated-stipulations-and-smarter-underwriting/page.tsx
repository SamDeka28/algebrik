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
        <span><strong>New York, February 24, 2025:</strong> <a href="/">Algebrik AI Inc.</a>, a Delaware-incorporated company headquartered in New York City, pioneering the world's 1st cloud-native, AI-powered, digital-era Loan Origination Platform (LOS), today announced a strategic partnership with Conductiv, a leader in providing digital stipulations via permissioned data and AI. This collaboration aims to empower credit unions with enhanced data access, enabling more efficient, fair, and inclusive lending practices. </span>
        , "This partnership empowers credit unions to:",
        <ul className="list-disc ml-4">
          <li><strong>Increase Approval Rates:</strong> Access comprehensive, real-time income, cash flow, tax, and other consumer-permissioned data through Conductiv, integrated directly into Algebrik’s LOS for informed lending.</li>
          <li><strong>Reduce Friction and Increase Borrower Confidence:</strong> Provide members with a 100% digital way to share data and full control over how and when their data is shared.
          </li>
          <li><strong>Automate Stipulation Workflows </strong>– Replace manual verification with instant, permissioned data access, streamlining compliance and reducing processing time.</li>
          <li><strong>Strengthen Risk Models with Alternative Data</strong> – Utilize Conductiv’s cash flow insights and tax data to enhance credit scoring and expand lending beyond traditional FICO-based underwriting.</li>
          <li><strong>Accelerate Loan Turnaround Times</strong> – Minimize delays with instant access to member-verified financial data, cutting approval times from days to minutes.</li>
        </ul>
      ]
    },
    {
      "title": "Enhancing Lending with Permissioned Data and AI",
      "paragraphs": [
        <span>
          Through this integration, Algebrik AI will leverage Conductiv’s consumer-permissioned data pipelines to power more precise risk assessments and lending decisions. By tapping into real-time income verification, tax records, and cash flow insights, credit unions can reduce reliance on outdated credit models and expand access to underserved markets. The integration also eliminates manual document collection, ensuring faster loan approvals, reduced drop-offs, and improved member trust. This real-time, structured data ingestion helps credit unions reduce fraud risks, automate stipulations, and optimize underwriting accuracy, ensuring compliant, scalable, and frictionless lending operations.
        </span>

      ]
    },
    {
      "title": "Leadership Perspectives",
      "paragraphs": [
        "The collaboration reflects Algebrik AI’s commitment to staying at the forefront of lending innovation. By using Conductiv’s industry-leading capabilities, credit unions can streamline operations, make smarter decisions, and enhance borrower satisfaction",
        '“Our mission at Algebrik AI is to simplify lending and bring innovation to financial institutions,” said Pankaj Jain, Founder and CEO of Algebrik AI. “By integrating Conductiv’s secure and permissioned data capabilities into our platform, we are equipping lenders to make decisions that are not only faster and more accurate but also inclusive and transparent.”',
        '“Our partnership with Algebrik AI represents a new chapter in leveraging consumer-permissioned data to power smarter lending,” said Gopal Swamy, CEO of Conductiv. “Together, we are enabling credit unions to scale their operations efficiently, reduce fraud, and provide borrowers with seamless, personalized experiences.”']
    },
    {
      "title": "A Shared Vision for Innovation",
      "paragraphs": [
"The integration of Conductiv’s data capabilities into Algebrik’s LOS not only accelerates loan processing but also helps lenders achieve critical business goals:",
          <ul className="list-disc ml-4 mt-4">
            <li><strong>Increase Borrower Retention:</strong> Provide faster approvals and personalized borrower experiences to foster long-term loyalty.
            </li>
            <li><strong>Expand Credit Reach:</strong> Open access to credit for underbanked individuals using alternative data.</li>
            <li><strong>Boost Operational Efficiency:</strong> Minimize errors and reduce costs by automating document workflows and data validation.
            </li>
            <li><strong>Reduce Fraud:</strong> Prevent income and other kinds of fraud through the use of the permissioning process.</li>
          </ul>,
          "Credit Unions using Algebrik AI will now benefit from Conductiv’s enriched data integration, digitizing stipulations and enabling faster, more efficient loan approvals. With real-time insights and alternative data, credit unions can expand credit access, reduce manual workflows, and ensure smooth, compliant member experiences.",
          <span>For more information on how Algebrik AI is transforming lending, visit <a href="https://www.algebrik.ai">https://www.algebrik.ai</a></span>
          ,<span>For latest on cutting edge lending technology & AI, follow Algebrik AI on Linkedin at: <a href="https://www.linkedin.com/company/algebrik-ai">https://www.linkedin.com/company/algebrik-ai</a></span>
      , <span>Or chat with the Algebrik AI team at: <a href="mailto:letschat@algebrik.com">letschat@algebrik.com</a></span>
        ]
    },
    {
      "title": "About Conductiv:",
      "paragraphs": [
        "Conductiv specializes in consumer-permissioned and alternative data, and AI helping lenders streamline operations, improve decision-making, and extend credit access. Their innovative platform integrates alternative data and advanced workflows to enhance lending experiences for financial institutions and borrowers alike."
      ]
    },
    {
      "title": "About Algebrik AI:",
      "paragraphs": [
        <span>Algebrik AI, headquartered in New York City is the world's first cloud-native, AI-powered, digital-era Loan Origination Platform (LOS), designed for the next generation of members. In an industry that hasn’t seen significant innovation in lending technology in over 25 years, it was high time that someone stepped in to help credit unions of all sizes regain their former glory. Algebrik AI’s mission is to empower credit unions to attract, engage, grow, and retain next-gen members while staying competitive in today’s digital era. By transforming loan originations end-to-end, Algebrik AI takes on the heavy lifting, allowing credit unions to focus on helping the members & communities they serve. For more information, visit <a href="www.algebrik.ai">www.algebrik.ai</a></span>
      ]
    },
    {
      "title": "",
      "paragraphs": [
        <span className="mt-8">Contacts</span>,
        <span><strong>Algebrik AI</strong></span>,
        "Pankaj Jain",
        "Founder & CEO",
        <a href="mailto:Pankaj.jain@algebrik.com">Pankaj.jain@algebrik.com</a>
      ]
    },
  ]
}


export default function Blog() {
  return (
    <>
      <div className="container mx-auto px-5 md:px-0 py-36 md:w-[1160px] font-plus-jakarta flex flex-col justify-center items-center">
        <div className="flex flex-col items-start text-left w-full gap-[16px]">
          <CustomHeader
            text="Algebrik AI and Conductiv Elevate Lending with Permissioned Data, Automated Stipulations, and Smarter Underwriting"
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
                    <p>3 min read</p>
                    <p>Feb 24, 2025</p>
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
              src="/section_images/blog/Partnership-Announcements.jpg"
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
          <div className="pt-[35px]">
            <Image
              src="/section_images/blog/Partnership-Announcements.jpg"
              width={1160}
              height={500}
              alt=""
              priority
              quality={100}
            />
          </div>

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
                    <Link href={`/resource_center/${blog.blogSubtitle.toLowerCase().replace(/ /g, "-")}`} className="text-[#1A69DC] font-semibold">
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
