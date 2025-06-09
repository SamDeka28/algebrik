// pages/index.js
import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";

const lendingData = {
  "title": "What’s Driving the Shift to Intelligent Lending?",
  "author": "Prateek Samantaray",
  "sections": [
    {
      title: "",
      paragraphs: [
        <span>Let’s face it — the traditional lending model is long overdue for a rethink. Clunky scorecards, endless paperwork, and decision timelines that stretch into days (sometimes weeks) just don’t cut it anymore. Borrowers today want answers in minutes, not callbacks in 48 hours.</span>,
        <span>And it’s not just about impatience — it’s about expectation evolution. As Deloitte’s 2024 Gen Z and Millennial Survey points out, 75% of younger borrowers choose organizations whose values align with theirs. That means frictionless, mobile-first, purpose-driven loan journeys aren’t a nice-to-have anymore — they’re the entry ticket.</span>,
        <span>Meanwhile, financial institutions are feeling the squeeze from both ends:</span>,
        <ul className="list-disc ml-4">
          <li>On one side, they’re being challenged to expand access to underserved populations — something that traditional credit models weren’t built for. No surprise then that 62% of lenders now use alternative data (Experian, 2023) to go beyond the FICO score.</li>
          <li>On the other side, manual processes are eating up time and margin. AI-driven lending systems are proving they can cut documentation time by 70% and credit decisioning timelines from days to minutes (Stratmor Group, OpenText).          </li>
        </ul>,
        <span>As Brett King, author of Bank 4.0 and one of the loudest voices in fintech, puts it:</span>,
        <div><blockquote>“Banking is no longer somewhere you go, but something you do.”</blockquote>
          <p>That shift in mindset is exactly what’s pushing lenders to rethink everything — from origination to servicing.</p></div>,
        <p>Bottom line: This isn’t about digitizing old processes. It’s about reimagining lending for a world that runs on speed, personalization, and trust. And the race is already on.
        </p>

      ]
    },
    {
      "title": "The Rise of AI — From Hype to Hands-On Impact",
      "paragraphs": [
        <p>AI in lending isn’t a buzzword anymore — it’s quietly becoming the engine room of smarter, faster, and fairer loan decisions.</p>,
        <p>What started as predictive models for credit risk has quickly expanded into real-time document processing, intelligent underwriting, fraud detection, and even borrower engagement. It’s not just about replacing spreadsheets — it’s about replacing uncertainty.</p>,
        <p>Take this stat: <strong>AI can now improve credit scoring accuracy from 77% to 92%, while reducing prediction time by 4x (TurinTech, 2023).</strong> That means lenders can say “yes” or “no” with far more confidence — and far less paperwork.
        </p>,
        <p>But AI’s impact isn’t just internal. It’s being felt at the borrower level too:</p>,
        <ul className="list-disc ml-4">
          <li><strong>Personalization is finally real</strong>. AI can recommend loan products based on real-time financial behavior — not just past credit history.</li>
          <li><strong>Onboarding is frictionless.</strong> What used to take days — ID checks, document uploads, eligibility checks — now takes minutes, thanks to intelligent automation.</li>
          <li><strong>Decisions are explainable.</strong> With the rise of “white box” AI models, lenders can now show borrowers why a decision was made, improving transparency and trust.</li>
        </ul>,
        <p>And the shift is happening fast. In a 2024 McKinsey report, 70% of lending executives said <strong>AI will be a key differentiator</strong> in how lenders acquire and retain customers over the next two years.</p>,
        <p>As one lending CTO put it at a recent Finovate panel:</p>,
        <div><blockquote>“AI isn’t just helping us work faster — it’s helping us work smarter, fairer, and more human.</blockquote></div>,
        <p>That’s the real unlock: AI isn’t replacing the lender — it’s amplifying them.
        </p>]
    },
    {
      "title": "Why Lending Needs to Get More Human",
      "paragraphs": [
        "Here’s the irony: the more lending goes digital, the more borrowers crave a human touch",
        <p>Today’s borrowers aren’t just looking for low interest rates — they’re looking for empathy, clarity, and control. According to Deloitte, 89% of millennials and <strong>86% of Gen Zs say “a sense of purpose” is crucial to job satisfaction,</strong> and they carry that same expectation to the brands they borrow from. They want financial partners — not just loan providers.</p>,
        <p>This is where intelligent lending flips the script.</p>,
        <ul className="list-disc ml-4">
          <li><strong>AI-powered systems can adapt to individual contexts</strong>, making decisions that aren’t just data-driven, but situation-aware.</li>
          <li><strong>Conversational interfaces and chatbots </strong> (built on LLMs) let borrowers ask questions in plain language — and get intelligent, helpful answers instantly.</li>
          <li><strong>Guided borrower flows,</strong> backed by behavioral science, simplify complex journeys — whether it’s applying for a first auto loan or refinancing student debt.</li>
        </ul>,
        <p>In the words of Simon Taylor, fintech investor and co-founder of 11:FS:</p>,
        <div>
          <blockquote>“The best fintech doesn’t feel like fintech — it feels like someone understands me.”</blockquote>
        </div>,
        <p>This is the opportunity: AI isn’t just about faster lending. It’s about <strong>more human lending</strong> — where borrowers feel heard, guided, and respected throughout the process.
        </p>,
        <p>Intelligent lending isn’t replacing the personal touch. It’s making it scalable.</p>
      ]
    },
    {
      "title": "Expanding Access — Intelligent Lending as an Inclusion Engine",
      "paragraphs": [
        "One of the most powerful promises of intelligent lending isn’t just speed — it’s reach.",
        "For decades, traditional credit models have sidelined millions of would-be borrowers: thin-file applicants, gig workers, immigrants, and others with non-traditional financial footprints. Intelligent lending is starting to fix that — not with gut feel, but with data and design.",
        <ul className="list-disc ml-4 mt-4">
          <li><strong>Alternative data is changing the game.</strong> Utility bills, rent payments, mobile top-ups, and even online behavior are being used to build richer borrower profiles. Experian reports that <strong>62% of lenders now use alternative credit data</strong>, unlocking access to entire new segments.
          </li>
          <li><strong>AI can make sense of complex borrower journeys.</strong> Intelligent engines don’t just flag risk — they find patterns in unpredictability. This means more nuanced approvals for non-linear income earners like freelancers, seasonal workers, or creators.
          </li>
          <li><strong>Language and UX barriers are being broken.</strong> AI-powered borrower flows can adapt content to different languages, literacy levels, and device formats — making onboarding truly inclusive, not just mobile-friendly.
          </li>
          <li><strong>Reduce Fraud:</strong> Prevent income and other kinds of fraud through the use of the permissioning process.</li>
        </ul>,
        "The result? Financial inclusion at scale. Not as a CSR initiative, but as a core business strategy",
        <p>As digital identity infrastructure improves and credit systems modernize globally, intelligent lending could bring <strong>8.4 million previously “unscorable” borrowers</strong> (CRS, 2023) into the formal credit economy in the U.S. alone.
        </p>, "And globally, the number is in the hundreds of millions.",
      ]
    },
    {
      "title": "Section 5: Redefining Risk and Compliance in Real Time",
      "paragraphs": [
        "Risk and compliance used to be the anchors that slowed down lending innovation. Today, they’re becoming the accelerants — thanks to AI and real-time data intelligence.",
        <p>Traditionally, risk assessment was backward-looking. Lenders evaluated borrowers based on historical credit scores, income proofs, and asset declarations. But in a world where financial situations shift fast, <strong>real-time decisioning is now a must.</strong></p>
        , "Here’s how intelligent lending is reshaping risk:",
        <ul className="list-disc ml-4 mt-4">
          <li><strong>Dynamic Risk Models: </strong> Instead of static rulebooks, AI models update in real time based on macroeconomic changes, behavioral patterns, or even localized risk factors. This helps lenders stay ahead of delinquency risks — not react to them.</li>
          <li><strong>Real-Time Fraud Detection:</strong> According to McKinsey, AI-driven fraud systems can reduce false positives by up to 80%, helping lenders flag threats without disrupting genuine users. With faster payments and digital disbursements on the rise, this is mission-critical.
          </li>
          <li><strong>Embedded Compliance: </strong> AI is also simplifying regulatory reporting. Smart systems can flag anomalies, generate audit trails, and ensure real-time KYC/AML checks — all without adding friction to the borrower journey.
          </li>
        </ul>,
        "It’s not just about managing risk anymore — it’s about mastering it, at scale and at speed."
      ]
    },
    {
      "title": "The Shift Is On — Are You Ready?",
      "paragraphs": [
        "The shift to intelligent lending isn’t just a tech trend — it’s a strategic imperative. From faster decisions and broader access to more human borrower experiences and real-time compliance, the building blocks of modern lending are being rewritten.",
        "Lenders that embrace this shift won’t just operate more efficiently — they’ll serve more people, with more empathy, and more precision than ever before.",
        "If you're curious about what this looks like in action — not just in theory — you won’t want to miss our upcoming session,",
        <p>
          <blockquote className="inline"> “Intelligent Lending for the Next Generation”</blockquote>
          <span> moderated by our very own <strong>Jesse Fruge (VP of Product)</strong> and <strong>Andrea Silvers (VP of Business Development)</strong>, and hosting some of the leading voices in the Credit Union industry on <strong>April 24th.</strong></span>
        </p>,
        <p>We’ll dive into real use cases, lessons learned, and what’s coming next.</p>,
        <p>Because intelligent lending isn’t just about better loans — it’s about building a better future for borrowers and lenders alike.</p>
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
            text="From Traditional to Intelligent — Why Lending Needs a Makeover"
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
              src="/section_images/Blog 1.jpg"
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
              src="/section_images/Blog 1.jpg"
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
