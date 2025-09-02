// pages/index.js
"use client"
import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";


const lendingData = {
  "title": "The Future of Auto Lending: Not Just Faster- Radically Smarter",
  "author": "Team Algebrik",
  "sections": [
    {
      title: "",
      paragraphs: [
        "The F&I desk should be the moment of triumph in a car purchase. Instead, it is the choke point of the entire process.",
        <ul className="list-disc ml-4 mt-4">
          <li>
            Dealers re-key data across multiple lender portals while fielding phone calls and emails.
          </li>
          <li>
            Lenders receive incomplete or inaccurate applications that must be manually corrected.
          </li>
          <li>
            Borrowers sit in silence, frustrated by the lack of visibility.
          </li>
        </ul>
        , "This is not a minor inconvenience. It is a structural inefficiency that inflates operational costs, slows down approvals, and drives borrowers to competitors. In an era where a car can be bought online and delivered to a driveway, the lending process is still stuck in the past.",
        `These inefficiencies are not just annoying. They cost money, slow turnaround, drive abandonment, and undermine competitiveness.`
      ]
    },
    {
      "title": "The Pain Points of a Disconnected Lending Ecosystem",
      "paragraphs": [
        "The disconnect between the modern car-buying experience and the traditional lending process is a strategic liability. The pain points are felt by everyone:",
        <ul className="list-disc ml-4 mt-4">
          <li>
            <strong>For the Dealer:</strong>
            The F&I office is a high-pressure environment. Having to manually enter data into disparate lender portals, chase down missing information via phone, and wait for a decision is a drain on time and resources. This inefficiency limits the number of deals they can close and can lead to a customer walking away          </li>
          <li>
            <strong>For the Lender:</strong>
            The influx of applications from various sources, often with missing or inaccurate information, is a nightmare. It requires extensive manual re-keying, adds to underwriting time, and increases the risk of human error. It’s an expensive, inefficient way to do business that directly impacts the bottom line.          </li>
          <li>
            <strong>For the Borrower:</strong>
            The customer is left in limbo. The wait time is a source of anxiety, and the lack of transparency can feel disrespectful. A bad lending experience can sour the entire car-buying process, no matter how great the car is.          </li>
        </ul>,
        "This fragmented ecosystem doesn’t just cause a headache—it costs money. It leads to higher operational expenses, increased loan abandonment rates, and a sluggish turnaround time that puts lenders at a competitive disadvantage. It’s a classic example of a legacy process that’s holding back a modern industry."
      ]
    },
    {
      "title": "Why Legacy Auto Lending is a Strategic Liability",
      "paragraphs": [
        `The industry’s dependence on fragmented, manual workflows creates measurable risks:`,
        <ul className="list-disc ml-4 mt-4">
          <li>
            <strong>Dealer Throughput Loss:</strong>
            Each F&I bottleneck limits the number of daily closings, which directly reduces revenue.
          </li>
          <li>
            <strong>Lender Exposure:</strong>
            Re-keying and manual handling increase error rates and inflate the cost per loan.
          </li>
          <li>
            <strong>Borrower Defection:</strong>
            A slow process drives abandonment. A poor lending experience undermines the car-buying journey, no matter how competitive the pricing.
          </li>
        </ul>,
        <p>
          This is not just inefficiency. It is a competitive disadvantage that allows fintech lenders with digital-first workflows to capture market share.
        </p>
      ]
    },
    {
      "title": "Algebrik AI’s Unified Architecture: A Digital Nervous System for Auto Lending",
      "paragraphs": [
        "Algebrik AI functions as a central orchestration layer that consolidates intake, decisioning, compliance, and dealer-lender communication into a single workflow. The system is built as a cloud-native, API-first LOS that integrates directly with external dealer management systems, data providers, and compliance services.",
        "Algebrik AI delivers more than incremental speed gains. It re-engineers auto lending into a single, intelligent workflow that connects dealers, lenders, and borrowers.",
        <p className="font-bold text-xl">Key Features and Their Advantages</p>,
        <ul className="list-disc ml-4 mt-4">
          <li>
            <strong>AI-Powered Decision Engine</strong>
            <ul className="list-disc ml-4 mt-4">
              <li>
                Feature: Evaluates thousands of data points, including bureau data, income verification, fraud detection, and alternative datasets.
              </li>
              <li>
                Benefit: Produces fast, consistent, and explainable credit decisions that reduce variability and expand approvals without compromising risk.
              </li>
            </ul>
          </li>
          <li>
            <strong>Configurable Workflow Automation</strong>
            <ul className="list-disc ml-4 mt-4">
              <li>
                Feature: No-code configuration of risk policies, stipulations, and exception handling through a workflow builder.
              </li>
              <li>
                Benefit: Lenders adapt quickly to changing regulations or risk appetites without IT bottlenecks, ensuring policies stay aligned with compliance.
              </li>
            </ul>
          </li>
          <li>
            <strong>Real-Time Application Tracking</strong>
            <ul className="list-disc ml-4 mt-4">
              <li>
                Feature: Event-based tracking gives dealers and lenders a live view of every step in the loan process.
              </li>
              <li>
                Benefit: Eliminates status-check calls and emails, reduces friction at the F&I desk, and creates transparency that improves dealer trust.
              </li>
            </ul>
          </li>
          <li>
            <strong>Embedded Compliance Layer</strong>
            <ul className="list-disc ml-4 mt-4">
              <li>
                Feature: Pre-built workflows for regulatory requirements (OFAC, ECOA etc), automated disclosures, and audit logging.
              </li>
              <li>
                Benefit: Every decision is fully traceable and regulator-ready, reducing compliance overhead and risk exposure.
              </li>
            </ul>
          </li>
          <li>
            <strong>Secure, Cloud-Native Infrastructure</strong>
            <ul className="list-disc ml-4 mt-4">
              <li>
                Feature: API-first architecture, encryption at rest and in transit, and elastic scalability.
              </li>
              <li>
                Benefit: Integrates seamlessly with existing systems, scales with loan volume growth, and ensures data protection without downtime..
              </li>
            </ul>
          </li>
        </ul>
      ]
    },
    {
      "title": "The Outcome",
      paragraphs: [
        "By combining these capabilities, Algebrik AI transforms auto lending into a unified system that delivers:",

        <ol className="list-decimal ml-4 mt-4">
          <li>
            Higher loan volumes without additional staffing.
          </li>
          <li>
            Lower cost per loan and reduced contract errors.
          </li>
          <li>
            Faster cycle times that strengthen dealer loyalty.
          </li>
          <li>
            A digital-first borrower experience that prevents abandonment.
          </li>
        </ol>,
      ]
    },
    {
      "title": "The Game Changer Nobody Else Solved: Integrations",
      "paragraphs": [
        "Integrating with vendors that are the industry’s submission hub is critical for any Origination player operating in the auto industry. Dealers use these integrations to push applications to lenders. In most LOS platforms, this is where the friction begins. Dealer data must be manually re-entered into the lender system, reintroducing errors and delays."
        , "Algebrik AI eliminates this failure point through a direct, native integration with such players:",
        <ul className="list-disc ml-4 mt-4">
          <li>
            <strong>Zero Re-keying: </strong>Applications move directly into the LOS in structured format.
          </li>
          <li>
            <strong>Instant Intake: </strong>
            Automated triggers launch bureau pulls, KYC checks, and stipulation logic the moment data arrives.
          </li>
          <li>
            <strong>Two-Way Communication: </strong>
            Lenders push updates, stipulations, and decisions back into these players in real time.
          </li>
        </ul>,
        "This is not a feature. It is the critical bridge between dealer and lender workflows, and it removes the single greatest source of inefficiency in indirect auto lending."
      ]
    },
    {
      "title": "The Data Is Clear: The Market Is Moving Faster Than You Think",
      "paragraphs": [
        <ul className="list-disc ml-4 mt-4">
          <li>The global auto finance market stood at 2.5 trillion USD in 2024 and is forecast to reach 4.8 trillion USD by 2030.</li>
          <li>Digital auto loan originations increased 29 percent year-over-year in 2024, representing a 165 percent growth since 2020.</li>
          <li>95 percent of dealership executives say AI is critical to their survival, and 81 percent are raising AI budgets in 2025.</li>
          <li>Fintechs such as Upgrade have already crossed 1 billion USD in originations in less than two years by leveraging digital-first workflows.</li>
        </ul>
        , "The conclusion is unavoidable. Lenders that remain dependent on manual workflows will lose share to fintech competitors and forward-looking credit unions."
      ]
    },
    {
      "title": "What This Means for the C-Suite",
      "paragraphs": [
        <ul className="list-decimal ml-4 mt-4">
          <li>
            <strong>For CEOs: </strong>
            A scalable lending engine without bloated headcount.          </li>
          <li>
            <strong>For CFOs: </strong>
            Lower cost per loan, fewer contract errors, and optimized capital use.          </li>
          <li>
            <strong>For CLOs: </strong>
            Freed teams that can prioritize complex deals and dealer relationships.</li>
          <li>
            <strong>For Risk Leaders: </strong>
            Consistent rule enforcement with fully auditable logs.
          </li>
          <li>
            <strong>For Dealers: </strong>
            A streamlined process that improves throughput and loyalty.
          </li>
        </ul>,
      ]
    },
    {
      "title": "The Future is Integrated or It Fails",
      "paragraphs": [
        "Auto lending is no longer a back-office process. It is a front-line driver of dealer satisfaction, borrower loyalty, and institutional profitability. The legacy approach of paper contracts, manual re-keying, and disconnected portals is not just outdated, it is actively eroding competitiveness.",
        "Algebrik AI positions lenders to lead in this new era by delivering a unified, AI-powered lending stack that:",
        <ul className="list-disc ml-4 mt-4">
          <li>
            <strong>Eliminates Friction: </strong>
            Removes manual touchpoints and redundant data entry, creating a single source of truth across the lending ecosystem.
          </li>
          <li>
            <strong>Accelerates Decisioning: </strong>
            Executes risk analysis, compliance checks, and approvals in near real time, reducing cycle times from days to minutes.
          </li>
          <li>
            <strong>Strengthens Relationships: </strong>
            Provides transparency and speed that make lenders the preferred partner for both dealers and borrowers.
          </li>
          <li>
            <strong>Optimizes Profitability: </strong>
            Cuts operational overhead, lowers error rates, and enables scale without proportional increases in staffing.
          </li>
          <li>
            <strong>Future-Proofs Operations: </strong>
            Adapts quickly to new regulations, new datasets, and evolving borrower expectations through a configurable, cloud-native platform.
          </li>
        </ul>,
        "The future of auto lending belongs to institutions that embrace technology to create a seamless, digital-first journey. The lenders who move now will define the benchmark for speed, precision, and trust. Those who wait will remain constrained by legacy processes while competitors capture their market share."
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
            text="The Future of Auto Lending: Not Just Faster- Radically Smarter"
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
                <div className=" object-cover relative flex justify-center">
                  <Image
                    src="/section_images/blog/favicon.svg"
                    className="rounded-[184.59px] object-cover h-[48px]"
                    objectFit="cover"
                    width={48}
                    height={48}
                    alt=""
                    priority
                    quality={100}
                  />
                </div>
                <div className="flex flex-col">
                  <div>
                    <h3>Aditya Bajaj</h3>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-4">
                    <p>3 min read</p>
                    <p>29 August, 2025</p>
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
            <div className="absolute opacity-[30%] top-0 lg:left-1/3 -z-10">
              <motion.div
                className="absolute top-0 -left-96 md:left-[96px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full md:w-[468.64px] md:h-[542.11px] blur-[100px]"
                initial={{ x: "-50%" }}
                animate={{
                  x: ["-30%", "30%", "-30%", "0%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute top-0 md:left-[20px] -left-96 bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full md:w-[618.35px] md:h-[633.38px] blur-[100px] -z-10"
                initial={{ x: "100%" }}
                animate={{
                  x: ["10%", "-20%", "10%", "0%"],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute top-0 -left-96 md:bottom-[10px] bg-[#BE95FF] rounded-full md:w-[451.48px] md:h-[542.11px] blur-[100px] z-[-1]"
                initial={{ x: "-50%" }}
                animate={{
                  x: ["-30%", "40%", "-40%", "0%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />


            </div>
            <Image
              src="/section_images/future.png"
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
              src="/section_images/future.png"
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
