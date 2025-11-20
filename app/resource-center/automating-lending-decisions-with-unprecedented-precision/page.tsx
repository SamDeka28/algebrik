// pages/index.js
"use client"
import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";


const lendingData = {
  "title": "The Agentic AI Advantage: Automating Lending Decisions with Unprecedented Precision",
  "author": "Team Algebrik",
  "sections": [
    {
      title: "",
      paragraphs: [
        "Picture the early days of auto manufacturing: endless rows of workers on assembly lines, each repeating a narrow task, shuffling parts from one station to the next. The process was slow, error-prone, and nearly impossible to scale. Every handoff added friction, every manual check added cost. To any CEO or CFO, that factory looked less like a growth engine and more like a bottleneck.",
        `Now contrast that with today’s top factories- autonomous, AI-driven operations where machines work in perfect sync. They don’t just assemble parts; they coordinate, inspect, decide, and execute at superhuman speed. Humans no longer sweat the repetitive work- they guide strategy, drive innovation, and perfect outcomes. The leap from hand-built to precision-engineered is the difference between surviving and leading.`,
        `That same leap is now unfolding in lending. Loan origination has long resembled the outdated factory floor: manual handoffs, redundant data entry, and sluggish human-led decisions. The result? Higher costs, slower growth, and inconsistency that weakens trust. For the modern C-suite, that’s not just inefficient; it’s a strategic liability.`,
        <p>The answer isn’t more automation. It’s a shift to intelligent, autonomous decisioning. The answer is <strong>Agentic AI</strong>- a new paradigm that turns lending into a high-velocity, precision-driven system where growth has no ceiling.</p>
      ]
    },
    {
      "title": "The Lending Bottleneck: Antiquated and Inefficient",
      "paragraphs": [
        <ul className="list-disc ml-4 mt-4">
          <li>
            <strong>Manual handoffs slow everything down:</strong>
            In most credit unions, loan files move through 5–7 different teams before funding. Each step adds days of lag and increases the risk of error.
          </li>
          <li>
            <strong>Data re-entry is rampant:</strong>
            68% of borrowers abandon digital loan applications due to friction- mainly too many fields, redundant inputs, or long processing times (Cornerstone Advisors, 2025).          </li>
          <li>
            <strong>Members lose patience quickly:</strong>
            Credit unions still lead on member love: overall satisfaction scores outpace banks by 74 points in J.D. Power’s 2025 study. The catch? Younger members report lower satisfaction when digital falls short. (Source- <a href="https://www.americascreditunions.org/news-media/news/credit-unions-lead-banks-all-seven-dimensions-consumer-satisfaction-survey?utm_source=chatgpt.com">America's Credit UnionsMD|DC Credit Union Association</a>)
          </li>
          <li>
            <strong>The financial cost is real:</strong>
            Every additional day in the loan cycle can raise operational costs by 15–20% per application, while competitors like fintechs deliver approvals in under 5 minutes
          </li>
          <li>
            <strong>Trust is eroding:</strong>
            Younger members, Gen Z and Millennials, report 25–30% lower satisfaction with CU digital lending journeys compared to in-branch experiences (J.D. Power, 2025).
          </li>
        </ul>,
      ]
    },
    {
      "title": "Why Agentic AI Beats Passive Automation",
      "paragraphs": [
        `For years, “AI in lending” has meant digitizing paperwork, pre-filling forms, or automating document verification. Useful, yes, but ultimately passive automation. The process still depends on humans to push every next step.`,
        `Agentic AI is different. It doesn’t just assist; it acts. It takes a single high-level directive (“process this loan application”) and autonomously executes the full workflow end-to-end.`,
        <ul className="list-disc ml-4 mt-4">
          <li>
            Beyond task automation: Instead of waiting for humans to move files forward, Agentic AI orchestrates identity checks, credit pulls, risk analysis, and decisions in one seamless flow.
          </li>
          <li>
            Speed is exponential: Fintech leaders already process digital loans in under 6 minutes, while traditional FIs average 2–7 days (PwC, 2024). Agentic AI compresses CU timelines to match, or beat,those fintech benchmarks.
          </li>
          <li>
            Consistency improves: Manual underwriting often results in 10–15% variance in decisioning outcomes across officers. Agentic AI applies rules with 100% consistency, reducing bias and errors.
          </li>
          <li>
            Member trust grows: 72% of borrowers say “fast, transparent approval” is their #1 factor in choosing a lender (Cornerstone Advisors, 2025). Speed is no longer a perk; it’s table stakes.
          </li>
        </ul>,
        "Narrative takeaway: Think of the difference this way: automation is like giving a worker a power tool- faster, but still manual. Agentic AI is like handing the job to an autonomous assembly line: coordinated, precise, and outcome-driven. For credit unions, it’s the leap from incremental improvement to transformative velocity."
      ]
    },
    {
      "title": "Autonomous Workflow Execution: The Self-Driving Loan Cycle",
      "paragraphs": [
        "The core of the Agentic AI advantage is Autonomous Workflow Execution. In a traditional lending cycle, every step is a potential bottleneck. The loan officer completes their part and then sends the file to underwriting, where it sits in a queue. From there, it moves to another department, and so on. These manual handoffs are where most of the time is lost and where the highest risk of error resides.",
        "With Algebrik AI’s platform, the entire workflow becomes a seamless, self-driving journey. The system acts as a single, intelligent entity that manages the entire loan cycle from application to funding."
        , "Here’s how it works in practice:",
        <ul className="list-decimal ml-4 mt-4">
          <li>
            <strong>Intelligent Intake:</strong>
            The borrower submits an application through a guided, digital interface. The Agentic AI immediately begins processing the data, pre-filling information and verifying identity in real time.        </li>
          <li>
            <strong>Autonomous Underwriting:</strong>
            Based on pre-configured rules and advanced analytics, the AI engine autonomously performs a comprehensive risk assessment. It analyzes credit data, financial history, and a wide array of data points with a speed and precision that is impossible for a human team to replicate.
          </li>
          <li>
            <strong>Smart Document & Stipulation Management:</strong>
            The AI identifies any missing or required documents and proactively requests them from the borrower. It can even scrape data from uploaded documents, reducing manual data entry to zero and ensuring consistency.
          </li>
          <li>
            <strong>Decision & Execution:</strong>
            The system, having processed all the necessary information, can make an approval or denial decision in seconds. It can then autonomously execute the next steps, from generating the loan offer to initiating funding, all while documenting every action for a perfect audit trail.        </li>
        </ul>,
        <p>
          <strong>This Autonomous Workflow Execution</strong> eliminates the manual handoffs, the queues, and the waiting. It turns a process that once took days or even weeks into a matter of minutes.
        </p>
      ]
    },
    {
      "title": "The Tangible Outcome: Agentic AI in Action",
      paragraphs: [
        "Approvals are just the tip of the iceberg. The true power of Agentic AI lies in how it transforms every stage of the lending lifecycle- not just speed, but scale, precision, and member trust.",
        <ol className="list-decimal ml-4 mt-4">
          <li>
            <p className="font-bold">Smarter Member Onboarding</p>
            <p>
              Guided digital intake eliminates friction. Agentic AI pre-fills applications, verifies identities in real time, and reduces drop-offs. Credit unions lose up to 68% of applicants mid-process due to form fatigue and re-entry requirements (Cornerstone Advisors, 2025).
            </p>
          </li>
          <li>
            <p className="font-bold">Autonomous Underwriting</p>
            <p>
              Instead of loan files waiting in a queue, AI agents run risk models instantly- pulling bureaus, analyzing 4,000+ data points, and generating consistent, bias-free recommendations. Institutions that deploy AI-driven credit models have seen 22% higher approvals for underserved borrowers while reducing defaults by 18% (Coinlaw, 2024).
            </p>
          </li>
          <li>
            <p className="font-bold">Intelligent Document & Stipulation Management</p>
            <p>
              Manual stipulations are one of the biggest bottlenecks. Agentic AI automatically identifies missing docs, requests them from borrowers, and scrapes data from uploads- reducing turnaround time by days. McKinsey estimates 60% of lending staff time still goes to repetitive document tasks ripe for automation (2024).              </p>
          </li>
          <li>
            <p className="font-bold">Real-Time Compliance & Audit Trails</p>
            <p>
              Every decision and data pull is logged, traceable, and compliant- critical as regulators tighten AI scrutiny. 71% of executives rank compliance assurance as a top barrier to AI adoption (PwC, 2025). Agentic systems solve this by design.            </p>
          </li>
          <li>
            <p className="font-bold">Proactive Cross-Sell & Member Retention</p>
            <p>
              Beyond decisioning, Agentic AI anticipates member needs. By analyzing transaction patterns and credit behavior, it can proactively suggest pre-approved loans or personalized refinancing- keeping members engaged before they shop elsewhere. According to J.D. Power (2025), members who receive proactive, relevant offers are 40% more likely to deepen relationships.            </p>
          </li>
          <li>
            <p className="font-bold">Portfolio Optimization at Scale</p>
            <p>
              CFOs and CROs can leverage autonomous simulations to stress-test portfolios against economic scenarios- something that traditionally takes weeks. Agentic systems run these analyses in real time, improving risk agility and capital efficiency.
            </p>
          </li>
        </ol>,
      ]
    },
    {
      "title": "The Strategic Value for the C-Suite",
      "paragraphs": [
        "For the executive team, the benefits extend well beyond fast approvals:",
        <ul className="list-decimal ml-4 mt-4">
          <li>
            <strong>CEO:</strong>
            Scales lending operations without ballooning headcount. Positions the credit union as an innovator.          </li>
          <li>
            <strong>CLO:</strong>
            Reduces staff workload on low-value tasks, refocuses talent on member relationships and complex cases          </li>
          <li>
            <strong>CFO:</strong>
            Cuts cost-per-loan dramatically, while enabling smarter capital allocation.
          </li>
          <li>
            <strong>Risk & Compliance Leaders:</strong>
            Gains consistent, explainable, regulator-friendly decisioning.
          </li>
          <li>
            <strong>Board & Members:</strong>
            Sees a future-proof institution that matches fintech agility while preserving community trust.
          </li>
        </ul>,
        <p><strong>Bottom line:</strong>Agentic AI isn’t about doing one thing faster—it’s about re-wiring the entire lending engine for speed, precision, compliance, and growth.</p>,
        "In a competitive market, relying on an outdated lending system is like trying to compete with a manual assembly line against a fully automated factory. It’s a losing proposition. The future of lending is autonomous, precise, and fast. By embracing the Agentic AI advantage from Algebrik AI, you're not just improving your lending process; you're building a modern, high-performance financial institution ready to lead in the digital era."
      ]
    },
  ]
}


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
          <CustomHeader
            text="The Agentic AI Advantage: Automating Lending Decisions with Unprecedented Precision"
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
              src="/section_images/agentic-advantage.webp"
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
              src="/section_images/agentic-advantage.webp"
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
