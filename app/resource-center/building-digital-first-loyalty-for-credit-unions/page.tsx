// pages/index.js
"use client"
import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";


const lendingData = {
  "title": "Beyond the Branch: Building Digital-First Loyalty for Credit Unions",
  "author": "Team Algebrik",
  "sections": [
    {
      title: "",
      paragraphs: [
        <span>Remember flipping through thick catalogs or waiting 15 minutes on hold for a simple answer? Today, those experiences feel ancient. Members now expect instant service, tailored to their needs, across every device
        </span>
        , "For credit unions, the challenge is clear: loyalty is no longer won just in-branch. It must be earned daily, across digital touchpoints that feel as personal as a handshake.",
        "This shift in consumer expectation holds a powerful lesson for credit unions. Your members have always valued the personal touch and community feel of your branches. But in a digital-first world, that loyalty is being challenged by a new set of expectations. Your members now demand the same frictionless, personalized service from their financial institution as they get from any modern business. The question is, how do you translate that human connection into a digital experience that builds long-lasting loyalty?",
        `The answer isn't about replacing the branch; it's about extending your unique brand of personal service into every digital interaction. Algebrik AI's loan origination platform is built for this exact purpose, helping you create a unified, personalized experience that members will love.`
      ]
    },
    {
      "title": "Reality check: your members are already digital-first",
      "paragraphs": [
        <ul className="list-disc ml-4 mt-4">
          <li>
            Mobile is now the #1 way Americans manage their bank accounts (55%), far ahead of branches (8%). (Source: <a href="https://bankingjournal.aba.com/2024/11/aba-survey-mobile-apps-most-popular-tool-to-manage-bank-accounts/?utm_source=chatgpt.com">ABA Banking Journal</a>)
          </li>
          <li>
            92% of U.S. consumers made some form of digital payment in the past year- digital is default behavior. (Source: <a href="https://www.mckinsey.com/industries/financial-services/our-insights/banking-matters/state-of-consumer-digital-payments-in-2024?utm_source=chatgpt.com">McKinsey & Company</a>),
          </li>
          <li>
            Credit unions still lead on member love: overall satisfaction scores outpace banks by 74 points in J.D. Power’s 2025 study. The catch? Younger members report lower satisfaction when digital falls short. (Source- <a href="https://www.americascreditunions.org/news-media/news/credit-unions-lead-banks-all-seven-dimensions-consumer-satisfaction-survey?utm_source=chatgpt.com">America's Credit UnionsMD|DC Credit Union Association</a>)
          </li>
        </ul>,
        <p><strong>The takeaway?</strong> Your branch experience builds trust. Your digital journey determines if that trust lasts</p>,
      ]
    },
    {
      "title": "From Disconnected Journeys to Omnichannel Harmony",
      "paragraphs": [
        `The biggest digital loyalty killer is friction. A member who starts an auto loan application on their phone, only to have to re-enter all their information when they call a loan officer, will quickly become a former member. This kind of disjointed experience erodes trust and makes your institution feel outdated.`,
        <p>
          This is why Algebrik AI champions a true <strong>Omnichannel Point-of-Sale (POS)</strong>. We provide a single, unified view of the member journey, so a member can move effortlessly between channels—mobile, desktop, or in-person—and their application moves with them. Your loan officers have real-time visibility into every interaction, allowing them to provide a seamless, informed experience every time. It’s the digital equivalent of greeting a member by name as they walk through your door; it shows you know them and you're ready to help.
        </p>
      ]
    },
    {
      "title": "The loyalty killer: friction",
      "paragraphs": [
        "Two out of three people abandon digital applications mid-stream. The top reasons? “It takes too long” and “you asked for too much.” That’s lost revenue and trust. "
      ]
    },
    {
      "title": "Three Digital-First Loyalty Builders",
      paragraphs: [
        <ol className="list-decimal ml-4 mt-4">
          <li>
            <p className="font-bold">Omnichannel That Actually Works</p>
            <p>Members should be able to start an application on mobile, pick it up on desktop, and finish it in-branch- without rekeying a single field. Loan officers need real-time visibility into the journey, so the handoff feels seamless.
            <p className="italic text-sm text-center">Think of it as the digital version of greeting a member by name at the door.</p>
            </p>
          </li>
          <li>
            <p className="font-bold">Personalization With a Human Touch</p>
            <p>73% of consumers now feel brands treat them as unique individuals (up from 39% in 2023), but fewer than half feel their data is used to benefit them . Credit unions can change that with AI-driven insights that recommend fair, relevant products- not generic offers.            </p>
          </li>
          <li>
            <p className="font-bold">Human-in-the-Loop AI</p>
            <p>AI isn’t here to replace your people- it’s here to free them. Automate verification, pre-fills, and document collection so loan officers can spend more time building relationships. Transparency matters: 72% of consumers want to know when they’re talking to AI, and 71% want a human to validate outputs .</p></li>
        </ol>,
      ]
    },
    {
      "title": "Future-Proofing the Credit Union Experience",
      "paragraphs": [
        "The pace of change is accelerating: 29% of credit unions plan first-time generative AI rollouts in 2025, yet fewer than half are satisfied with their core providers . The institutions that thrive will adopt cloud-native platforms that scale, integrate, and adapt quickly."      
      ]
    },
    {
      "title": "FMaking Every Experience Personal, Not Automated",
      "paragraphs": [
        <p>
          The fear of "AI-generated" services is that they lack a soul. But AI, when used correctly, can actually enhance the human touch, not replace it. It allows you to deliver truly <strong>Personalized Experiences</strong> that make your members feel understood.
        </p> ,
        "Algebrik's AI-driven platform goes beyond generic recommendations. It analyzes a member's financial profile to offer loan products and terms that are genuinely suited to their needs, not just a default option. This level of personalization shows that you’re not just a lender; you're a financial partner dedicated to their success. It builds a deeper, more meaningful connection that forms the bedrock of long-term loyalty." 
      ]
    },
    {
      "title": "Crafting a Future of Loyalty, One Member at a Time",
      "paragraphs": [
        "Winning loyalty in the digital age isn't a one-time fix; it’s an ongoing strategy. Here are three ways credit unions are building a loyal digital-first membership:",
        <ul className="list-decimal ml-4 mt-4">
          <li>
            <strong>Free Your People, Empower Your Connections:</strong>
            Use AI to handle the mundane tasks—like document collection and verification—that bog down your team. This frees up your loan officers to do what they do best: engage with members, offer advice, and build relationships. The technology works in the background so the people can shine in the foreground.
          </li>
          <li>
            <strong>Anticipate, Don't Just React:</strong>
            The AI on the Algebrik platform helps you move from being a reactive institution to a proactive partner. By analyzing data, it can identify members who may be ready for a new loan or financial product, allowing you to reach out with a personalized offer before they even start looking elsewhere. This is how you stay one step ahead and remain a central part of their financial life.
            </li>
          <li>
            <strong>Future-Proof Your Foundation:</strong>
            The pace of change will only accelerate. By adopting a modern, cloud-native LOS, you are choosing a flexible platform that can grow and adapt with you. This ensures you'll always be able to meet the needs of the next generation of members, avoiding the fate of those who were too slow to embrace change.          </li>
        </ul>,
        "Branches built the relationship. Your digital journey protects it. When every interaction travels with the member, every offer feels like it was meant for them, and AI works as the quiet co-pilot, not the pilot, you turn convenience into commitment and clicks into long-term loyalty. And that’s how credit unions win beyond the branch."
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
            text="Beyond the Branch: Building Digital-First Loyalty for Credit Unions"
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
              src="/section_images/beyond-cloud.webp"
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
              src="/section_images/beyond-cloud.webp"
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
