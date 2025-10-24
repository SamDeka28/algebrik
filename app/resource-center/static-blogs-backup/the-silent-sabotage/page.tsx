// pages/index.js
import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";

const lendingData = {
  "title": "The Silent Sabotage: Why Paperwork Is Killing Your Credit Union's Future",
  "author": "Prateek Samantaray",
  "sections": [
    {
      title: "",
      paragraphs: [
        <strong>To the CEOs, CFOs, CCOs, and CLOs of Credit Unions:</strong>,
        `
          Let's abandon the pleasantries. Your credit union, built on a foundation of trust and community, is being systematically undermined. Not by external threats, but by an internal enemy you've allowed to fester: the crushing weight of paperwork, antiquated processes, and the soul-sapping friction that chokes every single operation.
        `
        , `This isn't a minor inconvenience. It's a parasite, draining the vitality from your organization, suffocating growth, and leaving you desperately vulnerable in a market that demands instantaneity and seamless experience.`,
        `The cost of this inertia isn't just abstract frustration; it's a quantifiable haemorrhage of your capital, your capacity, and your very relevance.`
      ]
    },
    {
      "title": "The Unforgiving Reality: Your Credit Union Is Paying the Price",
      "paragraphs": [
        "Consider the unvarnished truth of your current operations:",
        <ul className="list-disc ml-4">
          <li>
            <p className="font-bold">To the CEO: </p>
            Your bold vision for a thriving, future-proof credit union? It's being actively undermined, not by market forces, but by the chains of your own operational legacy. Every delayed loan, every clunky member interaction, isn't just a lost opportunity – it’s a strategic surrender to the digital disruptors. Are you leading your institution forward, or are you passively presiding over its incremental decline?
          </li>,
          <li>
            <p className="font-bold">To the CFO:</p>
            Open your ledger. The drag of your legacy loan origination system isn't merely an "operational cost." It's a catastrophic erosion of your net interest margin, a black hole for strategic capital, and a direct assault on your profitability. Are you truly accounting for the immense, hidden cost of manual errors, re-works, and the sheer volume of untapped revenue because your processes are stuck in the last century? This isn't about efficiency; it's about the financial viability of your institution.
          </li>,
          <li>
            <p className="font-bold">To the CCO:</p>
            Manual processes aren't just slow; they are a regulatory minefield, actively increasing your exposure to crippling fines and catastrophic reputational damage. Each manual hand-off, each piece of re-keyed data, multiplies the human error factor, transforming routine compliance into an audit nightmare in waiting. Can you truly guarantee integrity and adherence when your system itself is built on a house of cards?
          </li>,
          <li>
            <p className="font-bold">To the CLO:</p>
            Your most valuable assets – your loan officers – are operating at a fraction of their potential. They're spending more time battling archaic systems and administrative burdens than building relationships and driving revenue. This isn't just a productivity dip; it's a direct cap on your lending volume and pipeline velocity. Imagine the loans you could be closing, the members you could be serving, if their expertise wasn't being squandered on a futile war against paperwork.            </li>
        </ul>

      ]
    },
    {
      "title": "The Reckoning: There Is a Path Forward",
      "paragraphs": [
        `The era of "that's just how we've always done it" isn't merely ending; it's dead. The friction in your processes is costing you more than you know – in lost revenue, diminished performance, and ultimately, a compromised ability to fulfill your core mission.`,
        `We are Algebrik AI, and we exist to confront this crisis head-on. We have built the world's first cloud-native, AI-powered, digital-era Lending Stack, AlgebrikOne because we understand that the future of lending demands more than incremental improvement. It demands a fundamental transformation.`,
        `This isn't about simply automating tasks; it's about reclaiming your institution's core purpose. It's about:`,
        <ul className="list-disc ml-4">
          <li>
            <p className="font-bold">Unleashing Unprecedented Velocity: </p>
            Transform loan processing from days to minutes, directly translating into exponential growth of your loan book and accelerated revenue recognition.        </li>
          ,<li>
            <p className="font-bold">Empowering Your Workforce:</p>
            Liberate your people from drudgery. Let them become strategic advisors and genuine relationship builders, multiplying their individual and collective impact on your bottom line.
          </li>,
          <li>
            <p className="font-bold">Converting Risk into Strategic Certainty:</p>
            Leverage intelligent automation for predictive risk assessment, robust fraud detection, and seamless compliance, turning potential liabilities into fortified opportunities.
          </li>,
          <li>
            <p className="font-bold">Securing Your Future:</p>
            Attract and retain the next generation of members with a truly digital, personalized lending experience, positioning your credit union as the undeniable leader in a rapidly evolving financial landscape.
          </li>
        </ul>

      ]
    },
    {
      "title": "The Choice Is Yours: Inaction or Transformation",
      "paragraphs": [
        `The time for incremental fixes is over. The cost of inertia is no longer merely inconvenient; it's existential. Your credit union's future, its profitability, and its capacity to truly serve its community hinges on a pivotal, immediate shift.`,
        `The tools exist. The technology is here. Algebrik AI stands ready to partner with you to forge this new, vital path. This isn't a product pitch; it's a strategic imperative.`,
        <strong>Your credit union cannot afford to wait. The future demands action. Are you ready to lead it?</strong>
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
            text="The Silent Sabotage: Why Paperwork Is Killing Your Credit Union's Future"
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
                    <h3>Aditya Bajaj</h3>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-4">
                    {/* <p>Announcement</p> */}
                    <p>July 16, 2025</p>
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
              src="/section_images/Blog_Sabotage.webp"
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
              src="/section_images/Blog_Sabotage.webp"
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
