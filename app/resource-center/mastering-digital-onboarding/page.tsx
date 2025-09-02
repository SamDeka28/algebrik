// pages/index.js
"use client"
import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";


const lendingData = {
  "title": "Mastering Digital Onboarding: How AI-Powered Lending Becomes Gen Z’s Instant Favorite",
  "author": "Team Algebrik",
  "sections": [
    {
      title: "Lending Onboarding Is Failing Gen Z And Everyone Knows It",
      paragraphs: [
        "Imagine a Gen Z applicant, fresh out of college, mindlessly scrolling their phone thinking about a car loan. They find your credit union, tap Apply, and are hit with a blast from the past: endless clunky forms, redundant questions, and a prompt to scan paperwork they do not even own. They close the tab faster than they can say “fax is dead.”",
        `That is not digital transformation. It is digital medieval torture. And the controversial truth is this generation that grew up with one-click ordering, personalized social media experiences, and real-time everything sees that as a red flag. If your onboarding looks dated they bounce. Trust evaporates in milliseconds.`,
             ]
    },
    {
      "title": "The Harsh Reality: Onboarding Is Where You Lose Gen Z",
      "paragraphs": [
        "Application abandonment is the silent killer of growth. Studies show that 65–85 percent of applicants drop off during digital onboarding in financial services. The reasons are not mysterious: too many fields, poor mobile optimization, repetitive document requests, and a total lack of transparency.",
        "For Gen Z, this is unacceptable. They expect onboarding to feel like an Amazon checkout, not a DMV line. A clunky experience is not just inconvenient, it is a signal that the institution is out of touch. That perception drives switching, and fintechs are already capitalizing on it."
      ]
    },
    {
      "title": "The Features That Actually Matter",
      "paragraphs": [
        <ul className="list-decimal ml-4 mt-4">
          <li>
            <p><strong>Real-Time Identity Verification</strong></p>
            <ul className="list-disc ml-4 mt-2 mb-4 leading-loose">
              <li><strong>What it is: </strong>AI-powered ID scanning, biometric validation, and API-driven KYC checks.</li>
              <li><strong>Why it matters: </strong>Cuts manual verification from days to seconds. Reduces fraud risk while improving experience.</li>
              <li><strong>Proof point: </strong>Institutions that deploy real-time KYC see up to 80 percent lower fraud attempts and drastically shorter cycle times.</li>
            </ul>
           </li>
          <li>
            <p><strong>Smart Data Pre-Fill and Enrichment</strong></p>
            <ul className="list-disc mt-2 mb-2 leading-loose ml-4">
              <li><strong>What it is: </strong>Automatic population of application fields using bureau data, open banking APIs, and existing member records.</li>
              <li><strong>Why it matters: </strong>Eliminates redundant data entry, reduces drop-offs, and ensures higher application completion rates.</li>
              <li><strong>Proof point: </strong>Every extra field increases abandonment risk by 1.5 percent. Cutting fields with pre-fill can increase conversion by 20–30 percent.</li>
            </ul>
          </li>
          <li> 
            <p><strong>Adaptive Workflows</strong></p>
            <ul className="list-disc mt-2 mb-2 leading-loose ml-4">
              <li><strong>What it is: </strong>Dynamic forms that change in real time based on applicant responses (e.g. detecting self-employed income, adding co-signer fields only if necessary).</li>
              <li><strong>Why it matters: </strong>Avoids the “one-size-fits-all” experience. Creates personalized paths that reduce friction for edge cases.</li>
              <li><strong>Proof point: </strong>Adaptive flows have been shown to reduce application abandonment by up to 50 percent compared to static journeys</li>
            </ul>
          </li>
          <li>
            <p><strong>Mobile-First Document Capture</strong></p>
            <ul className="list-disc mt-2 mb-2 leading-loose ml-4">
              <li><strong>What it is: </strong>Snap-and-upload via phone camera with AI document recognition, auto-cropping, and validation.</li>
              <li><strong>Why it matters: </strong>Gen Z expects onboarding to happen entirely on their phone. Requiring PDFs or scanners is a guaranteed deal-breaker.</li>
              <li><strong>Proof point: </strong>92 percent of Gen Z prefer mobile banking apps over branch visits. Mobile-first is not optional.</li>
            </ul>
          </li>
          <li>
            <p><strong>Real-Time Status Tracking</strong></p>
            <ul className="list-disc mt-2 mb-2 leading-loose ml-4">
              <li><strong>What it is: </strong>Application dashboards with progress bars, next-step guidance, and instant notifications.</li>
              <li><strong>Why it matters: </strong>Transparency builds trust. Borrowers want to know exactly where they stand, not wait in silence.</li>
              <li><strong>Proof point: </strong>Institutions that provide real-time updates see 40 percent higher completion rates and fewer inbound status calls.</li>
            </ul>
          </li>
          <li>
            <p><strong>Behavioral Nudging and Rescue Mechanisms</strong></p>
            <ul className="list-disc mt-2 mb-2 leading-loose ml-4">
              <li><strong>What it is: </strong>AI detects stall points and nudges applicants through SMS, email, or in-app prompts.</li>
              <li><strong>Why it matters: </strong>Saves partially completed applications and converts indecisive applicants.</li>
              <li><strong>Proof point: </strong>Personalized nudging increases completion rates by 10–15 percent and reduces abandonment by up to 25 percent.</li>
            </ul>
          </li>
          <li>
            <p><strong>Embedded Compliance and Disclosures</strong></p>
            <ul className="list-disc mt-2 mb-2 leading-loose ml-4">
              <li><strong>What it is: </strong>Automated Reg B, ECOA, OFAC, and UDAAP compliance baked into onboarding flows, with real-time disclosure generation.</li>
              <li><strong>Why it matters: </strong>Reduces regulatory risk while keeping the journey seamless. Compliance cannot be bolted on after the fact.</li>
              <li><strong>Proof point: </strong>Automated disclosures cut legal review time by 60 percent and lower the cost of compliance per loan.</li>
            </ul>
          </li>
          <li>
            <p><strong>Agentic AI Orchestration</strong></p> 
            <ul className="list-disc mt-2 mb-2 leading-loose ml-4">
              <li><strong>What it is: </strong>An AI layer that sequences verification, credit pulls, stipulations, and approvals without requiring human initiation.</li>
              <li><strong>Why it matters: </strong>Transforms onboarding from a manual checklist into an autonomous flow. Staff intervene only when exceptions occur.</li>
              <li><strong>Proof point: </strong>Institutions using orchestration see time-to-decision reduced from days to minutes, with cost-per-loan dropping by 30–40 percent.</li>
            </ul>
          </li>
        </ul>,
      ]
    },
    {
      "title": "Why This Wins Gen Z",
      paragraphs: [
        <ol className="list-disc ml-4 mt-4">
          <li>
             <strong>Speed is survival:</strong> Gen Z expects instant decisions. A one-day wait feels prehistoric.
          </li>
          <li>
            <strong>Transparency is trust:</strong>Status tracking and guided flows keep them engaged.
          </li>
          <li>
            <strong>Personalization is the new loyalty: </strong>Adaptive workflows and smart product matching show borrowers they are understood.
          </li>
          <li>
            <strong>Mobile is default: </strong>If it doesn’t fit in their pocket, it doesn’t exist.
            </li>
        </ol>,
      ]
    },
    {
      "title": "Gen Z Demands Digital That Makes Sense. So Why Make It Hard?",
      "paragraphs": [
        <ul className="list-disc ml-4 mt-4">
          <li>
            <strong>Mobile is everything: </strong>
            92 percent of Gen Z prefer mobile banking apps over branch visits. (<a href="https://coinlaw.io/millennial-vs-gen-z-banking-preferences-statistics/?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer">coinlaw.io</a>)
             </li>
          <li>
            <strong>Education gap is real: </strong>
            Only 46 percent of Gen Z feel confident in their financial knowledge. They need onboarding that educates, guides, and empowers. (<a href="https://www.finextra.com/blogposting/27216/banks-vs-gen-z-expectations-in-2025-a-roadmap-for-bold-leadership?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer">finextra.com</a>)
            </li>
          <li>
            <strong>They abandon first for fun:</strong>
            Digital account openings via fintech platforms grew nearly 30 percent year over year while community banks and credit unions captured only 5 percent of new checking accounts compared to 44 percent for neobanks. (<a href="https://www.digitalonboarding.com/our-platform/blog-post/cornerstone-2025-digital-banking-takeaways?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer">digitalonboarding.com</a>)
          </li>
        </ul>,
        "If you are still asking borrowers to fill out a PDF and fax it, the only shock is that they are still even trying." 
      ]
    },
    {
      "title": "Why This Matters For Your Institution",
      "paragraphs": [
        <p><strong>Feature: </strong>AI powered onboarding that is fast, far less manual, and dynamically adaptive. </p>,
        <p><strong>Benefit: </strong>Dramatically reduced abandonment. A smoother journey drives faster funded loans, zero friction, and a lot more members. </p>,
        <p className="mt-6"><strong>Feature: </strong>Real-time journey optimization and nudging powered by behavioral analytics.</p>,
        <p><strong>Benefit: </strong>Keeps Gen Z engaged in the digital world they live in. Real-time nudges translate into higher completion rates and lower early churn.</p>,
        <p className="mt-6"><strong>Feature: </strong>Built-in guidance and transparency: “Here is what you need to finish. We are here to help.”</p>,
        <p><strong>Benefit: </strong>Builds trust and positions your credit union as the partner Gen Z wants, not the generic institution they ghost.</p>,
        ]
    },
    {
      "title":"Final Word: Fix Your Onboarding; or Be Forgotten",
      "paragraphs":[
        <p>
          Gen Z is not just the next generation of borrowers. They are your now generation of members with growing spending power and an inclination to switch faster than any other cohort. Nearly two fifths of Gen Z members are considering switching institutions, often not to another credit union but to sleek, fast fintechs. They want digital onboarding 78% more than the general population. (<a href="https://www.pymnts.com/credit-unions/2025/gen-z-is-ready-to-stay-if-credit-unions-step-up-digital-innovation/?utm_source=chatgpt.com">pymnts.com</a>)
        </p>,
        "This is not just a “nice to have”. Mastering digital onboarding is non-negotiable. Because if Gen Z sees your onboarding and does not feel seen, heard, or respected, their next tap is on a competitor.",
        "Are you ready to stop disappointing digital natives? Because Gen Z is already deciding whether you are worth it in the first 60 seconds."
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
            text="Mastering Digital Onboarding: How AI-Powered Lending Becomes Gen Z’s Instant Favorite"
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
              src="/section_images/genz.png"
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
              src="/section_images/genz.png"
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
