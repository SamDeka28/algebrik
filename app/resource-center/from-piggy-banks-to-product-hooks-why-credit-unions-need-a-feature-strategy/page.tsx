// pages/index.js
"use client"
import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const blogData = {
  "title": "From Piggy Banks to Product Hooks: Why Credit Unions Need a Feature Strategy",
  "author": "Jennifer Hernandez",
  "sections": [
    {
      title: "",
      paragraphs: [
        "Member loyalty used to be earned through relationships and small tokens. Today, it's built through product experiences that feel personal, modern, and habit-forming."
      ]
    },
    {
      "title": "A Trip Down Memory Lane",
      "paragraphs": [
        "When I worked at a credit union, no one ever handed out toasters. What we did have were **piggy banks for kids**, **branded pens**, **water bottles**, **cup coasters**, and even **sun shades for cars**. I still remember my kids proudly using those little piggy banks. My colleagues' kids had them too.",
        "It was simple, tangible, and in many ways, effective. These small gestures anchored us in the community. They made members feel part of something familiar.",
        "But those tactics worked in a world where **branches were the primary touchpoint**, and member relationships were built face-to-face. In 2025, that world looks very different.",
        "The battlefield has shifted. Welcome to the Feature Wars."
      ]
    },
    {
      "title": "Everyone's Competing on the Same Boring Stuff",
      "paragraphs": [
        "Let's be honest. The credit union value proposition has started to sound like a high school group project where everyone picked \"climate change\" because no one wanted to think harder.",
        <ul className="list-disc ml-4 mt-4">
          <li>"We have great rates."</li>
          <li>"We care about members."</li>
          <li>“We are not for profit but for for service"</li>
        </ul>,
        "All true. All identical. It's like a row of identical houses in a planned suburb, with different colored mailboxes and the same lawn gnome out front.",
        "Meanwhile, fintechs are out there turning **features into growth machines**. Chime grew past 12 million users by marketing \"get paid two days early\" as if they'd discovered fire. Startups like Self and Grow Credit have built entire businesses around rent reporting and credit score lifts. These aren't utilities. They're conversion engines."
      ]
    },
    {
      "title": "Feature-Led Growth Is Real",
      "paragraphs": [
        "Credit-building tools are quietly becoming the loyalty engine of the next era. CU Times recently highlighted how credit-building features, once the niche of scrappy fintechs, are making their way into credit union product roadmaps. And with good reason.",
        "Nearly **one in three U.S. adults has a subprime or thin credit file**, according to Experian. That's not a niche. That's a market. Credit-building products address that reality head-on.",
        "They drive:",
        <ul className="list-disc ml-4 mt-4">
          <li><strong>Deposit growth,</strong> because sticky members park more money.</li>
          <li><strong>Interchange revenue,</strong> because members use the card that builds their credit.</li>
          <li><strong>Lifetime relationships,</strong> because no one forgets the lender that helped them move from 580 to 720.</li>
        </ul>,
        "Think of it this way. Netflix didn't beat Blockbuster because it had more movies. Blockbuster had movies. Netflix wrapped them in algorithms, interfaces, and experiences that made you feel like the content was made for you. Credit-building features are your equivalent of \"Because you watched Suits,\" except the recommendation is \"Because you missed two payments, here's how to climb back.\""
      ]
    },
    {
      "title": "Stop Selling Checking Accounts Like It's 2008",
      "paragraphs": [
        "Here's the uncomfortable part. Many credit unions are still trying to differentiate on checking accounts, debit cards, and \"community feel.\" That's like trying to win the streaming wars with a DVD rental plan that boasts \"fewer late fees.\"",
        "The winners in this next era will treat feature development as a growth strategy, not a footnote in the roadmap. Rent reporting, secured credit lines, real-time credit coaching, and gamified credit score trackers are not nice-to-haves. They're emotional hooks. They say, \"We're invested in your financial story.\""
      ]
    },
    {
      "title": "What Fintechs Like Upgrade Got Right",
      "paragraphs": [
        "Before Algebrik, I spent time at **Upgrade Inc.**, a fintech that scaled at breakneck speed. Upgrade has delivered over **$40 billion in credit** to more than **7 million customers**. Its card was named one of the fastest-growing in the U.S. by the Nilson Report.",
        "That growth didn't come from community branches. It came from a **relentless focus on product mechanics**. Upgrade turned responsible credit-building into a growth hook. Features like installment-style repayment structures and transparent paydown experiences weren't 'add-ons.' They were the core value proposition.",
        "The lesson is simple. Where credit unions used swag and community presence to build trust, fintechs like Upgrade built **digital trust loops** inside their products. They made the feature the message."
      ]
    },
    {
      "title": "Credit-Building Is Becoming the New Loyalty Anchor",
      "paragraphs": [
        "Credit-building tools are moving from niche to mainstream. One in three American adults has a subprime or thin credit file. For that population, credit-building isn't 'nice to have.' It's the pathway to financial agency.",
        "Credit unions that adopt tools like **rent reporting**, **secured lines**, **real-time credit coaching**, or **gamified score journeys** aren't just modernizing. They're creating **new engagement flywheels**. Early pilots show that members using these tools **log in more frequently**, **use more products**, and are **less likely to churn**.",
        "This is exactly how fintechs grew without branches. And credit unions can do it too, but with the trust advantage already in hand."
      ]
    },
    {
      "title": "From Relationship-First to Relationship-Plus-Feature",
      "paragraphs": [
        "This isn't about abandoning the community. It's about **evolving how you deliver it**.",
        <ul className="list-disc ml-4 mt-4">
          <li>The piggy bank represented trust built through shared space.</li>
          <li>The feature represents trust built through <strong>daily utility</strong>.</li>
        </ul>,
        "The future loyalty model for credit unions is **relationship plus product hook**. Member service will always matter. But in a digital-first world, it's the feature that pulls members in, keeps them active, and builds new kinds of stickiness."
      ]
    },
    {
      "title": "Build Your Signature Feature",
      "paragraphs": [
        "Every successful fintech has a **signature feature**. For Upgrade, it was turning credit into a predictable, empowering experience. For Chime, it was an early direct deposit. For credit unions, it doesn't have to be flashy, but it does have to be **real**.",
        "So the next time growth discussions come up, ask this:",
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-lg">
          "What's our version of that piggy bank for 2025? What's the single feature that makes members stay, talk, and come back?"
        </blockquote>,
        "Because the real differentiator isn't swag. It's the product experience that earns the member's trust every single day."
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
            text="From Piggy Banks to Product Hooks: Why Credit Unions Need a Feature Strategy"
            className="w-full"
          />
        </div>

        <div className="flex flex-col text-black pt-[35px]">
          <div className="flex">
            <div className="flex justify-between items-center w-full border-t border-b border-[#D3D3D3] py-5">
              <div className="flex gap-[16px] items-center">
                <div className=" object-cover relative flex justify-center">
                  <div className="w-[48px] h-[48px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">J</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div>
                    <h3>By Jennifer Hernandez</h3>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-4">
                    <p>6 min read</p>
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
              src="/section_images/oct15-2.webp"
              width={1160}
              height={500}
              alt="From Piggy Banks to Product Hooks blog image"
              priority
              quality={100}
            />
          </div>

          <div className="flex flex-col pt-[24px] gap-5">
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
      <h3 className="text-[#292929] text-[20px] leading-[28.13px] font-bold font-plus-jakarta">
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
