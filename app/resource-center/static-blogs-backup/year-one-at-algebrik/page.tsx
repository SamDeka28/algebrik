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
  "title": "From Pixels to People: Rethinking Lending",
  "author": "Pankaj Jain",
  "sections": [
    {
      title: "",
      paragraphs: [
        "In 2010, Apple introduced the Retina Display. No fireworks, no “one more thing” drama. Just a screen so sharp that, for the first time, your eyes could not tell the pixels apart. Text looked like print. Photos looked alive. And just like that, every screen you had ever loved suddenly looked blurry.",
        "What I loved about that moment was not the tech specs. It was the mindset. Apple was not chasing “the first” high-resolution screen. Others had beaten them to it. They were quietly raising the baseline of expectation, making everything that came before feel obsolete. That is the kind of innovation that does not shout. It winks, and the world changes anyway.",
        "I have carried that lesson through my career. From boardrooms where risk was measured in billions, to startups where success was measured in cups of coffee consumed per release, I have seen both sides of financial technology. And the pattern is clear. Technology only wins when it makes people rethink what normal should feel like.",
        "Which brings me back to a credit union workshop years ago. A loan officer had five screens open just to approve a small personal loan. The member was still waiting. Someone in the room whispered, “By the time we finish this paperwork, the member will have refinanced somewhere else.” Everyone laughed, but not for long. Because the truth is, they were not wrong."
      ]
    },
    {
      "title": "The Industry Reality",
      "paragraphs": [
        "Credit unions today are living that same tension. On one hand, they are trusted, community-rooted institutions. On the other, members are comparing their lending experience not with the branch down the road, but with the last app they downloaded.",
        <ul className="list-disc ml-4 mt-4">
          <li>
            <strong>37 percent </strong>

            of credit unions plan to adopt or replace consumer digital account opening in 2025, the highest ever.
          </li>
          <li>
            <strong>83 percent </strong>
            of CU leaders are optimistic about the year ahead, yet inefficiencies still cost the average CU 1.3 million dollars annually.
          </li>
          <li>
            Callahan’s Trendwatch shows mortgages growing 25 percent year over year, while average share balances climbed 435 dollars.
            <p className="mt-4">
              <img src="/section_images/blogimage1.png"/>
            </p>
          </li>
          <li>
          Membership growth is below 3% in most states and there are states with negative or near zero growth like Alabama, Iowa, Louisiana, and North Dakota.
          </li>
        </ul>,
        "The Credit Union movement needs to be completely reimagined, with disruptive lending technology suites being the need of the hour to regain their former glory.",
        "The demand for credit is rising. The demand for speed and simplicity is rising even faster. The math is not complicated. Members are ready, but the systems are not."
      ]
    },
    {
      "title": "Algebrik at Year One",
      "paragraphs": [
        `That is the world we stepped into. Our ambition was not to release another LOS. It was to build Algebrik One, a lending platform designed to quietly reset the baseline for what credit unions and lenders expect from technology.`,
        `In just twelve months, here is what that looked like in practice`,
        <ul className="list-disc ml-4 mt-4">
          <li>
            <strong>Platform launch with breadth and depth: </strong>
            Algebrik One went live as a full end-to-end suite across Digital Account Opening, LOS, POS, AI Decision Engine, and Portfolio Analytics. It was not a minimum viable product. It was a minimum category shift.
          </li>
          <li>
            <strong>Intelligence that acts, not just predicts: </strong>
            We introduced Agentic AI into the platform. Beyond models that score risk or optimize workflows, Agentic AI gives lenders digital teammates that can carry out tasks, learn from outcomes, and keep journeys moving. It is not about adding “smarter tools.” It is about making intelligence actionable in real time.
          </li>
          <li>
            <strong>Early adopters and live implementations: </strong>
            We signed multiple credit unions and community lenders, not only bringing them onboard but getting them live. For me, nothing proves innovation like a loan officer actually using it to serve a member.
          </li>
          <li>
            <strong>Leadership circle: </strong>
            We welcomed nine C-suite advisory board members, seasoned leaders across lending, credit unions, and technology, who challenge us to stay practical while we push the boundaries.
          </li>
          <li>
            <strong>Integrations that matter: </strong>
            More than 44 ecosystem integrations completed in year one, covering bureaus, cores, fintech partners, and compliance platforms. The goal was simple. Lenders should never feel like they need duct tape to innovate.
          </li>
          <li>
            <strong>Community growth: </strong>
            Our LinkedIn following grew to more than 2,300 professionals. Not just a vanity metric, but a signal that people across the industry are paying attention to this shift.
          </li>
          <li>
            <strong>Momentum ahead of plan: </strong>
            We are on track to reach three to four times our projected client count by March. For a first-year company in a space that has not seen real change in decades, that pace is both humbling and energizing.
          </li>
        </ul>,
        <p>
          This is not just inefficiency. It is a competitive disadvantage that allows fintech lenders with digital-first workflows to capture market share.
        </p>,
        "Year one was about proving that it could be done. That the systems can work together. That lending can move faster. That technology can feel invisible when it is doing its job.",
        "Our strong belief is in modularity: We have built our platform as Lego pieces so it can be deployed end to end or in parts as per the requirements of the clients via configuration files. ",
        "At Algebrik, we believe credit unions shouldn’t have to choose between innovation and efficiency. With Algebrik One, we give you both: a fully integrated lending platform that removes the friction of juggling multiple vendors while unlocking the power of an agentic AI layer. Whether you embrace the entire platform or start with the modules that matter most, the result is the same- lower costs, faster time to market, deeper automation, and member experiences that feel effortless across every channel. From the branch to the browser, from mobile to the loan officer’s desk, we help credit unions launch tomorrow’s journeys today, without the complexity of yesterday’s stack.",
        "What this means for credit unions:",
        <ul className="list-decimal ml-4 mt-4">
          <li>
            <strong>90% reduction in abandonment rates,</strong>
            thereby reducing the loan or member acquisition cost from average $600-$700 currently to $100-$200
          </li>
          <li>
            <strong>40% reduction in time </strong>
            it takes for underwriters or lenders to process an application, saving 2 days per week worth of freed up time for the lending teams to focus on members’ financial well-being or corner cases which need extra time.
          </li>
          <li>
            <strong>30% - 40% Increase in LtB </strong>
            (Look to Book),  increasing loan to share ratios / NIM
          </li>
          <li>
            <strong>300% improvement in member experience  </strong>
            - Less than 5 minutes from application to approvals / decision for all types of loans & same day funding for unsecured personal loans. 
           </li>
        </ul>,
        "The Algebrik team was built with the commitment to help the credit union movement by bringing innovative tech to community financial institutions which is affordable and painless to deploy, so that credit unions can focus on helping their members and communities they serve."
      ]
    },
    {
      "title": "Where We Go From Here",
      "paragraphs": [
        "If the Retina Display taught us anything, it is that true innovation does not just look new. It makes the old unacceptable.",
        "Algebrik One is not the first lending system. It is not meant to be. It is designed to reset expectations, to make legacy workflows feel as outdated as squinting at pixels once did.",
        "My vision for Algebrik is simple. To give credit unions and lenders a platform that makes lending so intuitive and so seamless that members forget about the system entirely and remember only the experience.",
        "Year one proved it works. Year two will prove it scales.",
        <p className="font-bold text-xl">— Pankaj Jain, CEO, Algebrik</p>,
      ]
    }
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
            text="From Pixels to People: Rethinking Lending"
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
                    src="/team_images/pankaj.webp"
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
                    <h3>By Pankaj Jain, CEO, Algebrik</h3>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-4">
                    <p>3 min read</p>
                    <p>1 September, 2025</p>
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
              src="/section_images/pankajblog.webp"
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
              src="/section_images/pankajblog.webp"
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
