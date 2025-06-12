// pages/index.js
import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";

const lendingData = {
  "title": "Beyond AI: Innovations Reshaping Lending Workflows.",
  "author": "Prateek Samantaray",
  "sections": [
    {
      title: "The Chaos Beneath the Surface",
      paragraphs: [
        <p>If you’ve ever peeked behind the curtain of a loan process — especially in mid-sized or traditional financial institutions — you’ll know it’s not just about underwriting. It’s a patchwork of disconnected tools, manual steps, redundant checks, and compliance landmines. It’s no wonder that for many lenders, each loan feels like a project.</p>,
        <p>From loan origination to disbursement, here’s what’s typically at play:</p>,
        <ul className="list-disc ml-4">
          <li>Multiple handoffs across teams (sales, credit, operations, compliance) </li>
          <li className="mt-4">Dozens of documents emailed, uploaded, or misplaced</li>,
          <li>Legacy core systems that don’t talk to each other</li>,
          <li>Human bottlenecks causing SLA breaches or borrower drop-offs</li>
        </ul>,
        <p>According to McKinsey, the average loan still involves over 20 manual touchpoints, with error rates north of 15% in some institutions.</p>,
        <p>And yet, borrowers expect real-time approvals, mobile-first interactions, and same-day disbursement.</p>,
        <p>That disconnect? It’s not just frustrating — it’s costly.</p>,
        <p>That’s where AI enters — not as a silver bullet, but as a workflow unifier. One that removes the busywork, connects the dots, and helps lenders do more with less.</p>

      ]
    },
    {
      "title": "Mapping the AI Touchpoints — Where Intelligence Replaces Friction",
      "paragraphs": [
        <p>AI doesn’t simplify lending by waving a wand — it works by embedding intelligence into every step of the journey. Think of it as the connective tissue between systems, teams, and decisions.</p>,
        <p>Here’s a look at how AI unclogs the critical points of the lending workflow:</p>,
        <p><strong>1. Pre-Screening & Lead Qualification</strong></p>,
        <p>AI can instantly evaluate incoming applications for basic eligibility, risk flags, and intent. That means fewer unqualified leads passed on to underwriting — and fewer wasted hours on dead ends.</p>,
        <p className="mb-2"><strong>2. Document Recognition & Data Extraction</strong></p>,
        <p>Gone are the days of someone manually sifting through PDFs. AI-powered OCR and NLP can extract income data, KYC info, and even flag mismatches — all in real time, with accuracy north of 95%.</p>,
        <p className="mb-2"><strong>3. Underwriting & Decisioning</strong></p>,
        <p>AI models assess creditworthiness using both traditional and alternative data. But beyond that, they learn over time, adapting to new borrower patterns, reducing bias, and speeding up decision cycles.</p>,
        <p className="mb-2"><strong>4. Compliance & Risk Checks</strong></p>,
        <p>AI can monitor applications for red flags — like data anomalies, fraud signals, or regulatory gaps — and auto-trigger secondary reviews. No more scrambling at the eleventh hour to meet audit requirements.</p>,
        <p className="mb-2"><strong>5. Workflow Orchestration</strong></p>,
        <p>Modern AI tools don’t just analyze — they orchestrate. They can auto-assign cases to credit analysts, notify sales teams on approved deals, and even nudge borrowers who pause mid-application.</p>,
        <p>The result? A smoother, faster, and more error-resistant lending journey — not just for borrowers, but for every stakeholder involved.</p>
      ]
    },
    {
      "title": "From Days to Minutes — The Time (and Cost) Impact of AI",
      "paragraphs": [
        "One of the most tangible benefits of AI-driven lending? Time — and lots of it.",
        "What used to take days, now takes minutes. And that’s not marketing speak — it’s backed by hard numbers:",
        <p>This is where intelligent lending flips the script.</p>,
        <ul className="list-disc ml-4">
          <li>AI-enabled document processing can reduce manual review time by up to 80%</li>
          <li>Credit decisioning time drops from 2-3 days to under 10 minutes in high-automation environments</li>
          <li>Workflow bottlenecks like follow-ups, task assignments, and internal escalations? Largely automated          </li>
        </ul>,
        <p>That’s not just a better experience for borrowers — it’s a serious operational win. Fewer delays mean lower drop-off rates, faster disbursements, and happier teams.</p>,
        <p>And let’s talk cost. According to recent benchmarks, AI implementation in lending can cut operational costs by 20–30% within the first year — just by removing redundant manual work and reducing rework.</p>,
        <p>Speed isn’t just a nice-to-have. It’s your margin.</p>,
      ]
    },
    {
      "title": "AI Doesn’t Replace Humans — It Elevates Them",
      "paragraphs": [
        "Here’s the truth: AI doesn’t take people out of the lending equation — it takes the pain out.",
"By offloading repetitive, low-value tasks, AI frees up credit teams, underwriters, and loan officers to focus on what really matters: nuanced judgment, relationship-building, and high-impact decision-making." ,
       <ul className="list-disc ml-4 mt-4">
          <li>
          Analysts can focus on edge cases instead of hunting for missing documents.
          </li>
          <li>
          Loan officers can spend more time advising — not just processing.
          </li>
          <li>
          Compliance teams get alerts, not spreadsheets.
          </li>
        </ul>,
       "It’s not about replacing roles — it’s about redefining them.",
       "As Satya Nadella, CEO of Microsoft, aptly said:",
        <blockquote>“AI doesn’t replace jobs. It replaces tasks, and gives people the freedom to do more meaningful work.”</blockquote>,
        "In lending, that shift can be transformative — not just for how loans get done, but for the teams who power them.",
        "If you're exploring how to bring AI into your lending workflows, we’ll be diving deeper into this exact topic in our upcoming expert roundtable,",
        <blockquote> <strong>“Lending 2030: Beyond AI—Shaping the Future of Lending”</strong> led by Jesse Fruge and Andrea Silvers on <strong>April 24th.</strong></blockquote>,
        "Consider this your front-row seat."
      ]
    },
    {
      "title": "",
      "paragraphs": [
        <span className="mt-8 font-bold">Event Details:</span>,
        <span><strong>Lending 2030: Beyond AI—Shaping the Future of Lending</strong></span>,
        <p><strong>Date: </strong>April 24, 2025</p>,
        <p><strong>Time: </strong>11:00 AM EST</p>,
        <p>
          <strong>Register here: </strong>
          <a href="/algebrik-webinar1">Click here</a>
        </p>
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
            text="Beyond AI: Innovations Reshaping Lending Workflows."
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
              src="/section_images/Blog 2.jpg"
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
              src="/section_images/Blog 2.jpg"
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
