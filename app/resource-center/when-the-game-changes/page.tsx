// pages/index.js
"use client"
import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const blogData = {
  "title": "When the Game Changes",
  "author": "Aditya Bajaj",
  "sections": [
    {
      "title": "When the Game Changes……",
      "paragraphs": [
        "Every great story hits that moment when everything shifts.",
        "The plays that used to work stop landing. The rhythm feels off.",
        "And suddenly, it's not about doing more, it's about doing it **differently**.",
        "That's exactly where **Community Lending Institutes** across the country find themselves right now."
      ]
    },
    {
      "title": "The Quiet Slide",
      "paragraphs": [
        "For decades, these institutions have been the **heartbeat of their neighborhoods** - familiar faces, fair rates, real conversations.",
        "But lately, something's changed.",
        "Membership growth has slowed. In some states, it's even started to dip.",
        "Not because people stopped believing in community finance, they just stopped finding the time to join.",
        "When the rest of the world can open an account in 90 seconds on their phone, even a ten-minute process feels like **forever**."
      ]
    },
    {
      "title": "Reinvention, Not Reinvention of Values",
      "paragraphs": [
        "I keep thinking about **Serena Williams**.",
        "When she hit her late 30s, the world was ready to write her off.",
        "But she didn't fight the clock, she **rewrote her game**.",
        "She changed her serve, her training, her rhythm. She stayed **herself**, just faster, sharper, smarter.",
        "That's what today's **Community Lending Institutes** need to do not abandon who they are, but **upgrade how they welcome people in**."
      ]
    },
    {
      "title": "The Turning Point: Digital Account Opening That Actually Feels Human",
      "paragraphs": [
        "That's what makes **Algebrik AI's Digital Account Opening (DAO)** so powerful.",
        "It's not just a form on a screen. It's a whole new way to say **welcome**.",
        "DAO takes what used to be a tangle of paperwork and waiting, and turns it into a guided, friendly journey - online, on mobile, or even in-branch with a little digital help.",
        "One credit union leader told me recently,",
        "\"Our biggest enemy isn't the bank across the street. It's the browser tab people close halfway through joining.\"",
        "That stuck with me.",
        "Because that's what DAO fixes, it keeps the conversation going."
      ]
    },
    {
      "title": "Why This Matters",
      "paragraphs": [
        "Every new member is a story waiting to start - a student getting their first card, a family opening a savings account, a retiree joining a community again.",
        "When joining becomes easy, growth follows.",
        "When the process feels modern, belonging feels natural again.",
        "When onboarding takes minutes instead of days, people actually finish it.",
        "DAO doesn't just open accounts.",
        "It opens doors - to more members, more relationships, more impact."
      ]
    },
    {
      "title": "The Next Play",
      "paragraphs": [
        "The future isn't waiting.",
        "It's already here, and it's moving fast.",
        "Community Lending Institutes have what no fintech can fake - trust, history, empathy.",
        "All they need now is a digital rhythm to match it.",
        "That's what Algebrik AI's DAO offers: a faster, smarter way to invite people in, without losing the warmth that built this movement in the first place.",
        "The game has changed.",
        "But maybe… just maybe… This is how we start winning again."
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
            text="When the Game Changes"
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
                    <h3>By Aditya Bajaj</h3>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-4">
                    <p>3 min read</p>
                    <p>October 15, 2025</p>
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
              src="/section_images/oct15-1.webp"
              width={1160}
              height={500}
              alt="When the Game Changes blog image"
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
}

function ContentSection({ title, paragraphs }: ContentSectionProps) {
  const renderTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <strong key={index}>{boldText}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <h3 className="text-[#292929] text-[28px] leading-[36px] font-bold font-plus-jakarta">
        {title}
      </h3>
      <div className="flex flex-col gap-4 text-[16px]">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>
            {typeof paragraph === 'string' ? renderTextWithBold(paragraph) : paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
