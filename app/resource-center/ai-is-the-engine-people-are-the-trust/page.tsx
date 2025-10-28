// pages/index.js
"use client"
import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const blogData = {
  "title": "AI Is the Engine. People Are the Trust.",
  "author": "Andrea Silvers",
  "sections": [
    {
      "title": "",
      "paragraphs": [
        "There’s a lot of noise about AI “replacing” people in lending. In consumer loan origination, the reality is simpler:",
        <><strong>AI is the engine</strong> that moves data, decisions, and workflows faster.<strong> People are the trust</strong> that turns approvals into loyal relationships.</>,
      ]
    },
    {
      "title": "What AI actually does (and does well)",
      "paragraphs": [
        <ul className="list-disc ml-4">
          <li>Pulls data, verifies identity, flags fraud</li>
          <li>Calculates income, checks rules, prices risk</li>
          <li>Routes files, triggers next steps, keeps things moving</li>
        </ul>,
        <>All of that matters because members want speed and clarity. But none of it replaces the moment a human listens, reframes the problem, and offers a better path.</>,
      ]
    },
    {
      "title": "What AI can’t do",
      "paragraphs": [
        "AI can’t earn a sigh of relief. It can’t notice the pause in someone’s voice or the worry behind a request. It can’t say, “I hear you- let’s figure out what really helps.”",
        "That’s where great loan officers and member service teams shine."
      ]
    },
    {
      "title": 'Scenario 1: “I need a personal loan for car repairs.”',
      "paragraphs": [
        <><strong>The AI engine:</strong></>,
        "In seconds, AI validates the application, confirms identity, estimates affordability, and returns a preliminary decision for a $3,000–$4,000 personal loan. It may even suggest term and payment options.",
        <><strong>The human trust:</strong></>,
        "A loan officer listens: the car has 180,000 miles; repairs keep piling up; missing work is a real risk. Instead of rubber-stamping the personal loan, the officer reframes the problem:"
        ,'“I’m sorry you’re dealing with this. Let’s consider an auto loan instead. You could finance a safer, more reliable vehicle at a lower rate and similar monthly payment. We can also add mechanical breakdown protection, so a future repair doesn’t derail your budget again.”'
        ,"Same borrower. Same data. Better outcome, because someone cared enough to connect the dots."
    ]
    },
    {
      "title": 'Scenario 2: “I want a personal loan for vacation.”',
      "paragraphs": [
        <><strong>The AI engine:</strong></>,
        "AI sees a prime borrower, green flags across identity/income, and qualifies the personal loan. It’s fast and clean.",
        <><strong>The human trust:</strong></>,
        "A lender simply asks, “How are you planning to pay while you travel?” When the member says “mostly cash,” the officer offers a smarter bundle:",
        '“Let’s keep the personal loan small or optional, and add a low-rate credit card with travel protections. You’ll carry less cash, get fraud protection if a card is lost, and earn rewards. We’ll set sensible limits and text alerts so you stay in control.”',
        "No algorithm knows this member is uneasy about carrying cash through airports. A person does."
      ]
    },
    {
      "title": "The winning model: AI + Humans, on purpose",
      "paragraphs": [
        "Think of it as a relay race:",
        <ol className="list-decimal ml-4">
          <li><strong>AI accelerates the start.</strong>
          <br/>
          It gathers documents, verifies, scores, and routes. Decisions are ready in minutes, not days.
          </li>
          <li><strong>Humans finish strong.</strong>
          <br/>
          They listen, probe, and tailor the offer to the real life behind the application- trade-offs, protections, timing, and peace of mind.
          </li>
          <li><strong>The institution earns trust.</strong>
          <br/>
          Members remember the conversation, not the algorithm. They come back, and they refer friends.
          </li>
        </ol>,
      ]
    },
    {
      "title": "A practical playbook for credit unions and community lenders",
      "paragraphs": [
        <ul className="list-disc ml-4">
          <li><strong>Use AI to free up time.</strong> Let automation handle data pulls, verifications, and standard approvals so staff can spend more time in high-empathy conversations.</li>
          <li><strong>Train for reframing.</strong> Teach lenders to ask 'what's the job to be done?' (reliable transportation, safe travel, cash-flow stability) and match products accordingly.</li>
          <li><strong>Bundle for resilience.</strong> Encourage 'better-fit' options: auto vs. personal, secured vs. unsecured, add-ons like MBI or GAP when they truly help.</li>
          <li><strong>Keep humans in the loop for edge cases.</strong> Exceptions, thin files, and stressful life events deserve a person's judgment- not just a score.</li>
          <li><strong>Measure what matters.</strong> Don't just track approvals. Track member satisfaction, repeat usage, early delinquency, and referrals. Trust shows up in those numbers.</li>
        </ul>,
      ]
    },
    {
      "title": "The bottom line",
      "paragraphs": [
        <>AI makes lending <strong>faster, safer,</strong> and more <strong>consistent.</strong> But <strong>trust-</strong> the reason members choose you, stay with you, and recommend you- comes from people who listen and guide.</>,
        <>In consumer loan origination, AI should handle the <em>how fast.</em></>,
        <>Your people should own the <em>why this way.</em></>,
        <>That's not replacement. That's <strong>partnership-</strong> and it's how modern lenders win.</>
      ],
      "hasSeparator": true
    }
  ]
}

export default function Blog() {
  return (
    <>
      <div className="container mx-auto px-5 md:px-0 py-36 md:w-[1160px] font-plus-jakarta flex flex-col justify-center items-center">
        <div className="flex flex-col items-start text-left w-full gap-[16px]">
          <CustomHeader
            text="AI Is the Engine. People Are the Trust."
            className="w-full"
          />
        </div>

        <div className="flex flex-col text-black pt-[35px]">
          <div className="flex">
            <div className="flex justify-between items-center w-full border-t border-b border-[#D3D3D3] py-5">
              <div className="flex gap-[16px] items-center">
                <div className=" object-cover relative flex justify-center">
                  <div className="w-[48px] h-[48px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div>
                    <h3>By Andrea Silvers</h3>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-4">
                    <p>5 min read</p>
                    <p>December 20, 2024</p>
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
              src="/section_images/isai.webp"
              width={1160}
              height={500}
              alt="AI Is the Engine. People Are the Trust blog image"
              priority
              quality={100}
            />
          </div>

          <div className="flex flex-col pt-[24px] gap-12">
            {blogData.sections.map((section, index) => (
              <ContentSection
                key={index}
                title={section.title}
                paragraphs={section.paragraphs}
                hasSeparator={section.hasSeparator}
              />
            ))}
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
  hasSeparator?: boolean;
}

function ContentSection({ title, paragraphs, hasSeparator }: ContentSectionProps) {
  return (
    <div className="flex flex-col gap-[16px]">
      {hasSeparator && (
        <hr className="border-t border-gray-300 my-4" />
      )}
      {title && (
        <h3 className="text-[#292929] text-[28px] leading-[36px] font-bold font-plus-jakarta">
          {title}
        </h3>
      )}
      <div className="flex flex-col gap-4 text-[16px]">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
