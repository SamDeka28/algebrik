// pages/index.js
"use client"
import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";


const lendingData = {
  "title": "A Product Peek into What’s New at Algebrik this Month",
  "author": "Team Algebrik",
  "sections": [
    {
      title: "A Product Peek into What’s New at Algebrik this Month",
      paragraphs: [
        <span>At Algebrik, every product update is a chance to simplify complexity—and July is no different. Whether you're navigating indirect channels or financing a family’s first road trip RV, this month’s releases are designed to take the load off your lending teams.
        </span>
        , "Let’s dive in:"
      ]
    },
    {
      "title": "Indirect Lending, Built the Algebrik Way",
      "paragraphs": [
        <strong>What’s New:</strong>,
        <span>
          Our Indirect Lending module is now fully live—bringing structured, intelligent, and compliance-ready workflows to a historically clunky process. This isn’t a bolt-on fix. It’s a native, deeply integrated extension of your lending ecosystem.
        </span>,
        <strong>What It Enables:</strong>,
        <ul className="list-disc ml-4 mt-4">
          <li><strong>Dealer-Driven App Flow:</strong> Receive, track, and triage applications from your dealer partners, with built-in logic to avoid duplication or rekeying.
          </li>
          <li><strong>Pre-Qual to Contract in One Flow:</strong> Start with soft pull or hard pull, validate key details, run pre-configured policies, and send decisions—without jumping across tools</li>
          <li><strong>Dealer Portal Integration:</strong> Currently optimized for RouteOne, AppOne, DealerTrack, OttoMoto support. Lenders can now configure rules on which dealers can route apps, volume limits, and auto-decisioning preferences.
          </li>
          <li><strong>Stipulation Mapping for Third Parties:</strong> Stips like proof of insurance, invoice from dealer, or lien details can now be routed to the responsible party—dealer or borrower.</li>
          <li><strong>Real-Time Audit Trails:</strong> Every update, approval, counter-offer, and communication is logged and reportable—reducing risk and saving ops hours.</li>
        </ul>,
        <strong>Why It Matters:</strong>,
        " Indirect lending has long been a growth lever—but also a patchwork of portals, spreadsheets, and delays. Algebrik brings it into the modern era: fast, clean, and deeply embedded into your lending core. Whether you’re scaling dealer relationships or tightening controls, it’s all one cohesive experience."
      ]
    },
    {
      "title": "Recreational Lending for the Long Haul: RVs Now Supported",
      "paragraphs": [
        <strong>What’s New:</strong>,
        "Our support for RV lending is now officially complete, making it easy to handle one of the most unique asset classes in consumer lending. This isn’t just auto lending with a new label—it’s built ground-up for the nuances of RV finance",
        <strong>What’s Included:</strong>,
        <ul className="list-disc ml-4 mt-4">
          <li><strong>RV-Specific Fields:</strong> Capture critical details like RV type (Class A/B/C, towable, etc.), length, number of slide-outs, and year of manufacture.
          </li>
          <li><strong>Custom Stipulation Library:</strong> RV loans often require different documentations—insurance binders, and lien documentation for titled trailers. Our stipulation module now includes these pre-baked templates.</li>
          <li><strong>Asset Valuation Integration:</strong> JD Power integration allows instant asset lookup and value anchoring—so your LTV ratios stay accurate.
          </li>
          <li><strong>Branch, Mobile, and Dealer Ready:</strong> Whether it’s an online application, a branch visit, or indirect channel—RV loans can now be sourced, underwritten, and closed across all origination surfaces.</li>
        </ul>,
        <strong>Why It Matters:</strong>,
        "RV loans are rising fast—not just in volume, but in borrower expectations. As consumers seek lifestyle-based financing, offering RV loans with the same speed, clarity, and confidence as a personal or auto loan can set your institution apart. With Algebrik, you can launch, scale, and refine RV lending without retooling your stack.",
      ]
    },
    {
      "title": "Coming Next...",
      "paragraphs": [
        "Here’s what we’re rolling out soon:",
        <ul className="list-disc ml-4 mt-4">
          <li><strong>New partner integrations</strong> for identity, fraud, and compliance checks (Wait for the next edition for the reveal!)
          </li>
          <li><strong>Embedded Account Opening</strong> workflows to grow member relationships earlier in the funnel.</li>
        </ul>,
        "As always, let us know what you’re excited to see next—or where we can reduce friction for your teams and borrowers.",
        "Lending is evolving—faster journeys, smarter decisions, and more personalized experiences aren’t just nice to have; they’re expected. At Algebrik, every release is a step toward that future.",
        "Whether you're expanding your indirect footprint or rolling out new loan types, we’re building the infrastructure to support you—with intelligence, flexibility, and ease at the core.",
        <strong>Thanks for being on this ride with us.</strong>,
        <strong>Until next month—keep lending smarter.</strong>,
        "—The Algebrik Product Team"
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
            text="Now Live: Lanes, Loans & Long Hauls!"
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
                    <h3>Team Algebrik</h3>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-4">
                    <p>3 min read</p>
                    <p>July 9, 2025</p>
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
              src="/section_images/blog-9july.webp"
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
              src="/section_images/blog-9july.webp"
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
