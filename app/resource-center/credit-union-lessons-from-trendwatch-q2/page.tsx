// pages/index.js
"use client"
import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";


const lendingData = {
  "title": "Members Want Yield, Loans, and Love: Credit Union Lessons from Trendwatch Q2",
  "author": "Prateek Samantaray",
  "sections": [
    {
      title: "Introduction",
      paragraphs: [
        "Every quarter, Callahan drops its Trendwatch Report, and the CU world collectively scrambles to see if the sky is falling or if members are just asking for higher CD rates again. The Q2 2025 edition brings a mix of optimism (loan growth is back!), concern (membership growth is crawling), and déjà vu (inflation still not fixed, tariffs still looming).",
        "The good news? Credit unions are resilient. The challenge? Growth is harder to come by, and members are demanding more value. Let’s unpack the numbers, add some wit, and show how we at Algebrik AI are adjusting our product roadmap to keep CUs future-ready."
      ]
    },
    {
      "title": "Membership Growth: The Party’s Slowing Down",
      "paragraphs": [
        "Callahan shows CU membership growth is at its slowest pace in 14 years, just 2%. That is fewer new members than the line at Starbucks at 2 PM.",
        <p className="mt-4">
          <img src="/section_images/membershipslow.png"/>
        </p>,
        ]
    },
    {
      title:"The CU Takeaway",
      paragraphs: [
        "New member acquisition cannot be the only growth lever. With slowing inflow, deepening relationships with existing members is mission-critical.",
        <p className="text-lg font-bold">How we are responding</p>,
        "We are doubling down on guided borrower flows, cross-sell intelligence, and digital account opening. Think of it as your loan origination system whispering, “This auto loan member might also be perfect for a HELOC,” while your DAO makes onboarding feel instant and effortless. Together, they turn every new account into the beginning of a deeper relationship. More engagement, less chasing."
      ]
    },
    {
      "title": "Loan and Share Growth: Members Want to Borrow Again",
      "paragraphs": [
        "Loan growth rebounded to nearly 4% YoY, while shares popped 5% YoY. Translation: members are finally back in the borrowing mood after sitting on their wallets in 2024.",
        <p className="mt-4">
          <img src="/section_images/loanshare.png"/>
        </p>,
        ]
    },
    {
      title:"The CU Takeaway",
      paragraphs: [
        "CUs should absolutely lean into the rebound in loan demand, but they cannot treat it as a blank check. Growth for growth’s sake is dangerous - chasing volume without managing credit quality is like drag racing without brakes. It might feel like a win in the short term, but the aftermath can undo years of careful balance sheet building. The smarter path is to ride the wave while keeping underwriting sharp, pricing aligned to risk, and capital strong enough to absorb bumps along the way.",
        <p className="text-lg font-bold">Algebrik Roadmap Response</p>,
        "We have enhanced our Decisioning Engine with Champion-Challenger testing and risk-based pricing modules, giving lenders the agility to adapt policies in real time. But our focus is not only on the decision itself, it is on reimagining the entire origination process. From Digital Account Opening that removes friction at the very first touchpoint, to guided borrower flows that keep applicants engaged, to omnichannel POS experiences that ensure continuity across branch, web, and mobile, we are building an origination journey that balances speed with discipline. The result: faster approvals when the data supports it, smarter declines when risk runs hot, and a process that deepens trust rather than testing it."
      ]
    },
    {
      "title": "Average Member Relationship: Bigger Than Ever",
      "paragraphs": [
        "The average member relationship hit $24,348, the highest level ever. Members are entrusting CUs with more of their financial lives, if CUs can keep them happy.",
        <p className="mt-4">
          <img src="/section_images/avgmember.png"/>
        </p>,
        ]
    },
    {
      title:"The CU Takeaway",
      paragraphs: [
        "A record-high average member relationship means members are entrusting CUs with larger portions of their financial lives. This reflects deeper product penetration and stronger wallet share. The opportunity is clear: with more products under one roof, members are more connected and more valuable. The challenge is that expectations rise alongside balances. Members now demand seamless journeys across channels, consistent service quality, and personalized experiences that match the level of trust they are placing in their CU.",
        <p className="text-lg font-bold">How we are Responding</p>,
        "At Algebrik, we see rising average member relationships as both validation and responsibility. Members are giving CUs a larger share of their financial lives, and that means origination and servicing experiences cannot afford to feel fragmented. Our Digital Account Opening ensures that new deposits or credit lines are opened in minutes, not days. Guided borrower flows help members navigate lending products with clarity, reducing abandonment. Cross-sell intelligence surfaces the right next product at the right time, whether it is a HELOC or an auto loan bundled with insurance. Our omnichannel POS makes it all feel like one continuous journey, whether the member starts online, in-branch, or through a partner. Finally, our Portfolio Analytics highlight members with strong balances but underutilized credit relationships, giving lenders actionable insights to expand engagement. The outcome is not only stronger wallet share but also a member experience that justifies it."
      ]
    },
    {
      "title": "Asset Quality: A Sneaky Red Flag",
      "paragraphs": [
        "Delinquencies are edging higher, even if charge-offs have flattened. Rising consumer stress could be a storm cloud.",
        <p className="mt-4">
          <img src="/section_images/chargeoff.png"/>
        </p>,
        ]
    },
    {
      title:"The CU Takeaway",
      paragraphs: [
        "Now is the time for proactive monitoring. Waiting until delinquency hits the balance sheet is like ignoring the check-engine light.",
        <p className="text-lg font-bold">Algebrik Roadmap Response</p>,
        "We have integrated real-time portfolio analytics that trigger alerts when borrower behavior changes. Lenders see risks early and can act before loans sour. These insights are not limited to delinquency signals, they also flag shifts in utilization, deposit flows, or credit appetite that might indicate stress. By combining early warning indicators with automated next-best actions, CUs can move from reactive collections to proactive member support, protecting both financial performance and member relationships."
      ]
    },
    {
      "title": "Deposit Trends: Members Chasing Yield",
      "paragraphs": [
        "Certificates and money market accounts are driving share growth, with CDs surging over 30% YoY. Members want yield, plain and simple.",
        <p className="mt-4">
          <img src="/section_images/cert.png"/>
        </p>,
        ]
    },
    {
      title:"The CU Takeaway",
      paragraphs: [
        "Members will move their money for yield, so retention strategies must go beyond rate wars. Think digital engagement, financial wellness, and frictionless access.",
        <p className="text-lg font-bold">Algebrik Roadmap Response</p>,
        "We have embedded personalized savings nudges directly into borrower and depositor journeys. If a member is about to churn to chase a higher CD rate, your LOS will already know and suggest alternatives that align with the member’s goals. These nudges can include recommending competitive internal products, highlighting bundled value propositions, or guiding members toward longer-term relationships instead of rate-chasing behavior. By turning data into timely, relevant suggestions, CUs can protect balances, strengthen loyalty, and reinforce their position as the trusted primary financial partner."
      ]
    },
    {
      "title": "Earnings and Capital: Strong, But Provisioning Up",
      "paragraphs": [
        "Certificates and money market accounts are driving share growth, with CDs surging over 30% YoY. Members want yield, plain and simple.",
        <p className="mt-4">
          <img src="/section_images/margin.png"/>
        </p>,
        ]
    },
    {
      title:"The CU Takeaway",
      paragraphs: [
        "Margins are saving the day, but the cushion can shrink quickly if delinquency spikes. Strong capital today should fund transformation, not just sit idle.",
        <p className="text-lg font-bold">Algebrik Roadmap Response</p>,
        "We are prioritizing AI-assisted underwriting automation, helping CUs cut costs while still growing responsibly. Every saved basis point matters, especially when margins are under pressure. Our platform reduces manual review by classifying routine applications for instant decisions while routing complex cases to loan officers with AI-generated summaries. By integrating third-party data sources in real time and applying consistent credit policies, CUs can shorten cycle times, reduce operational expense, and scale lending without proportionally increasing staff. The result is not only lower cost per loan but also a stronger, more resilient origination engine."
      ]
    },
    {
      "title": "Closing Thoughts: From Trendwatch to Action",
      "paragraphs": [
        `Callahan’s Q2 2025 Trendwatch makes one thing clear: growth will no longer be about simply adding members. It is about doing more with the members you already have, managing risk smartly, and creating experiences so seamless that your members never look at the competition’s app again.`,
        `At Algebrik, our roadmap is aligned:`,
        <ul className="list-disc ml-4 mt-4">
          <li>
          Smarter decisioning to handle risk in volatile times
          </li>
          <li>
          Guided borrower flows to boost product adoption
          </li>
          <li>
          Omnichannel journeys to deepen relationships
          </li>
          <li>
          Real-time analytics to flag risks before they escalate
          </li>
        </ul>,
        "The CU industry is shifting from growth by numbers to growth by depth. And we are here to make sure you do not just survive the shift, you lead it."
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
            text="Members Want Yield, Loans, and Love: Credit Union Lessons from Trendwatch Q2"
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
                    src="/team_images/prateek.webp"
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
                    <h3>Prateek Samantaray</h3>
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
              src="/section_images/callahan.webp"
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
              src="/section_images/callahan.webp"
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
