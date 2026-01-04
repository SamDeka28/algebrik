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
  "title": "Cable TV Lending is Dead. Why Are You Still Selling Channels?",
  "author": "Team Algebrik",
  "sections": [
    {
      title: "",
      paragraphs: [
        <span>Remember cable? Hundreds of channels, nothing to watch. That’s what most lending still feels like: long applications, rigid underwriting, and off-the-shelf loan products. Borrowers do all the work, only to be told “approved” or “denied” like it’s a game show from the 90s.
        </span>,
        `Here’s the controversy: in 2025, treating borrowers like identical credit scores is as outdated as Blockbuster’s late fees. Netflix figured it out. Spotify figured it out. Even Domino’s figured it out (they’ll predict your pizza order before you hit checkout). And yet, in lending, many institutions still hand borrowers the same generic menu.`
      ]
    },
    {
      "title": "Guided Borrower Journeys: Stop Making People Channel Surf",
      "paragraphs": [
        "The biggest reason borrowers abandon applications isn’t “poor credit.” It’s boredom and frustration. In fact, up to 68% of borrowers quit mid-process because forms are too long or confusing. That’s not risk management. That’s bad UX.",
        "Now imagine Netflix making you re-enter your email every time you click a new episode. You’d cancel tomorrow. But that’s exactly how lending still works. Guided borrower journeys flip this dynamic:",
        <ul className="list-disc ml-4 mt-4">
          <li>
            <strong>Dynamic intake:</strong>
            Only ask what’s necessary, when it’s necessary.
          </li>
          <li>
            <strong>Mobile-first everything: </strong>
            Upload a paystub while waiting for your latte.
          </li>
          <li>
            <strong>Adaptive flows: </strong>
            Need a co-signer? Complex income stream? The workflow adapts in real time.
          </li>
        </ul>,
        "The benefit? No more channel surfing. No more “form fatigue.” Just a smooth experience that feels less like bureaucracy and more like being guided by a concierge."
      ],
    },
    {
      "title": "Hyper-Personalized Recommendations: Give Me The Loan, Not A Loan",
      "paragraphs": [
        `Fintechs are eating the industry’s lunch because they figured out personalization is not optional. Klarna, Affirm, and Upgrade all built multi-billion-dollar valuations by giving borrowers the sense that the loan “found them.”`,
        <p>
          Here’s the uncomfortable truth: <strong>a pre-approved generic loan offer is the financial equivalent of Netflix recommending “The Office” for the 100th time</strong>. Safe, predictable, boring, and not what younger borrowers stick around for.
        </p>,
        "Hyper-personalized lending means:",
        <ul className="list-disc ml-4 mt-4">
          <li>
          A debt consolidator is nudged toward a term that fits their repayment behavior.
          </li>
          <li>
          A HELOC is suggested instead of a personal loan if it genuinely benefits the borrower.
          </li>
          <li>
          Loan terms flex based on spending habits and institutional history.
          </li>
        </ul>,
        "And when the offer feels like it was designed just for them, borrowers stop shopping around. They stop leaving for fintech apps with better marketing. They stick."
      ]
    },
    {
      "title": "2025 Reality Check: AI Is Everywhere. Except… in Lending?",
      "paragraphs": [
        "Let’s talk about the elephant in the room. In 2025, AI is writing ad copy, producing music, and even calling your utility company for you. Meanwhile, a shocking number of lenders are still printing out PDFs and asking borrowers to “fax” documents. (Yes, fax machines are still alive in financial services. Nobody tell Gen Z.)",
        "Even regulators are ahead of some institutions. The CFPB recently issued guidelines on AI explainability, while many lenders are still debating whether “digital-first” means emailing a PDF instead of mailing one.",
        "Borrowers notice. They don’t compare your credit union to the bank down the street. They compare you to Apple Pay, TikTok, and Netflix. If you can’t deliver the same level of frictionless, personalized experience, you’re not just behind, you’re irrelevant."
      ]
    },
    {
      "title": "Loyalty and Trust: Earned in Seconds, Lost in Milliseconds",
      paragraphs: [
        "Here’s the punchline: personalization isn’t a “nice to have.” It’s survival.",
        <ol className="list-disc ml-4 mt-4">
          <li>
          <strong>72% of borrowers</strong> say personalization influences their loyalty to a financial institution.
          </li>
          <li>
          <strong>40% are more likely</strong> to take another product if their first one felt tailored to them.
           </li>
          <li>
          But fewer than <strong>30% of banks and credit unions</strong> have scaled personalization beyond pilots.
          </li>
        </ol>,
        "Translation? If you’re not personalizing at scale, you’re leaving revenue, trust, and future members on the table."
      ]
    },
    {
      "title": "Final Word: Lending Needs Its Netflix Moment",
      "paragraphs": [
        "Cable didn’t die because people stopped watching TV. It died because people found a better, more personal way to watch. Lending is no different.",
        "Algebrik AI is building the Netflix of lending experiences: guided journeys, hyper-personalized offers, and an ecosystem where AI handles the grunt work so humans can focus on relationships.",
        "If your institution is still forcing borrowers to flip through channels, the only question is how long before they unsubscribe from you entirely."
      ]
    },
    {
      "title": "FMaking Every Experience Personal, Not Automated",
      "paragraphs": [
        <p>
          The fear of "AI-generated" services is that they lack a soul. But AI, when used correctly, can actually enhance the human touch, not replace it. It allows you to deliver truly <strong>Personalized Experiences</strong> that make your members feel understood.
        </p>,
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
            text="Cable TV Lending is Dead. Why Are You Still Selling Channels?"
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
              src="/section_images/cable.webp"
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
              src="/section_images/cable.webp"
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
