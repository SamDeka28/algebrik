// pages/index.js
import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";

const lendingData = {
  "title": "What You’ll Learn in Our Intelligent Lending Roundtable",
  "author": "Prateek Samantaray",
  "sections": [
    {
      title: "What You’ll Learn in Our Intelligent Lending Roundtable",
      paragraphs: [
        <p className="font-bold">Unlocking the Future of Lending—One Insight at a Time</p>,
        <p>The lending landscape isn’t just evolving—it’s entering a phase of accelerated transformation. From rising borrower expectations to growing operational strain, credit unions are facing a fundamental question: How do we move faster, stay compliant, and still deliver a human experience?</p>,
        <p>From loan origination to disbursement, here’s what’s typically at play:</p>,
       <p>That’s the core theme we’ll explore in our upcoming roundtable:</p>,
       <p className="font-bold">“Lending 2030: Beyond AI—Shaping the Future of Lending.”</p>,
        <p>Featuring insights from credit union leaders and lending innovators, this session isn’t about theory—it’s about action. Here’s what you can expect:</p>
      ]
    },
    {
      "title": "1. Why Borrower Expectations Are Already Outpacing Workflows",
      "paragraphs": [
        <p>Today's borrowers, especially Gen Z and Gen Alpha, expect lending experiences to be intuitive, mobile-first, and nearly instant. However, many credit unions are still operating with workflows built for a different generation.</p>,
        <p>You’ll learn:</p>,
        <ul className="list-disc ml-4  leading-loose">
        <li>How next-generation borrowers make decisions—and why speed, transparency, and ease matter more than ever        </li>
        <li>Where most credit unions lose them during the onboarding process</li>
        <li>How to modernize experiences without a complete system overhaul</li>
      </ul>,
      <p className="font-bold">In context:</p>,
      <p>65% of borrowers say they would switch lenders for a faster approval process
      (Source: PwC Digital Banking Consumer Survey, 2023)
     </p>
      ]
    },
    {
      "title": "2. How to Remove Bottlenecks Without Rebuilding Everything",
      "paragraphs": [
        <p>Internal delays—whether due to siloed data, legacy systems, or manual reviews—can strangle operational efficiency. In this session, we’ll break down real-life examples of how credit unions are streamlining without tearing everything down.</p>,
        <p>You’ll discover:</p>,
        <ul className="list-disc ml-4  leading-loose">
        <li>How one institution significantly reduced approval times through targeted workflow redesign</li>
        <li>The systems and checkpoints that are slowing down most loan decisions today</li>
        <li>What “smarter lending” really means from a day-to-day operations standpoint</li>
      </ul>,
      <p className="font-bold">In context:</p>,
      <p>According to the 4Q24 Trendwatch, loan growth slowed to just 2.8%, the weakest pace since 2020. Disconnected workflows and intake inefficiencies are key contributors to this stagnation.
     </p>
      ]
    },
    {
      "title": "3. Speed Versus Risk: Why You Shouldn't Have to Choose",
      "paragraphs": [
        <p>Lending leaders often feel stuck between the need to move faster and the imperative to stay compliant. But the best institutions are finding ways to do both—by leveraging AI and intelligent decisioning frameworks.</p>,
        <p>What you’ll learn:</p>,
        <ul className="list-disc ml-4  leading-loose">
        <li>Where automation works best—and where it doesn’t</li>
        <li>How to surface risk signals earlier in the borrower journey</li>
        <li>Why faster doesn’t mean less safe, if done right</li>
      </ul>,
      <p className="font-bold">In context:</p>,
      <p> 70% of financial institutions report a critical need for AI-driven tools to streamline underwriting and compliance workflows
     </p>,
     "(Source: Cornerstone Advisors, What’s Going On in Banking 2024)"
      ]
    },
    {
      "title": "4. From Siloes to Systems: Building Cross-Team Feedback Loops",
      "paragraphs": [
        <p>One of the most overlooked aspects of lending transformation is internal collaboration. Even the best tools fall flat when lending, product, and compliance teams don’t share a common feedback loop.</p>,
        <p>We’ll explore:</p>,
        <ul className="list-disc ml-4">
        <li>How to establish micro-feedback cycles across departments</li>
        <li>What shared visibility between frontline teams and product leaders looks like in practice</li>
        <li>How better internal alignment leads to faster issue resolution and better borrower outcomes</li>
      </ul>,
      <p className="font-bold">In context:</p>,
      <p>With credit union counts declining but member bases growing, institutions must do more with less—and that starts with better internal agility.
     </p>
      ]
    },
    {
      "title": "5. What a Modern Lending Blueprint Actually Looks Like",
      "paragraphs": [
        <p>You’ll walk away with more than just insights. Our roundtable will equip you with:</p>,
        <ul className="list-disc ml-4 leading-loose">
        <li>A checklist to evaluate the health of your current lending process</li>
        <li>A framework to prioritize changes that have the biggest operational and borrower impact</li>
        <li>Access to our ROI calculator so you can model potential savings before making changes</li>
      </ul>,
     <p>All attendees will also receive an exclusive post-event resource: The Lending 2030 Toolkit.</p>
      ]
    },
    {
      "title": "Why This Roundtable Matters",
      "paragraphs": [
        <p>The data is clear.</p>,
        <ul className="list-disc ml-4  leading-loose">
        <li>Credit card delinquencies reached 2.15%, up from 1.40% year over year        </li>
        <li>Auto loan delinquencies rose to 0.83%, the highest in nearly a decade</li>
        <li>Consumer lending reached its lowest level since 2017
        (Source: Callahan 4Q24 Trendwatch)</li>
      </ul>,
     <p>These signals aren't just economic—they’re operational. If lending teams don’t adapt, they risk not only falling behind—but losing members altogether.</p>,
     <p>This roundtable is designed to help you rethink the way lending works—from the inside out.</p>
      ]
    },
    {
      "title": "",
      "paragraphs": [
        <span className="mt-8 font-bold">Event Details:</span>,
        <span><strong>Lending 2030: Beyond AI—Shaping the Future of Lending</strong></span>,
        <p><strong>Date: </strong>April 24, 2025</p>,
        <p><strong>Time: </strong>11:00 AM EST</p>,
        <p>
          <strong>Register here: </strong>
          <a href="/algebrik-webinar1">Click here</a>
        </p>
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
            text="What You’ll Learn in Our Intelligent Lending Roundtable"
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
                    <h3>Team Algebrik</h3>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-4">
                    <p>3 min read</p>
                    <p>Feb 24, 2025</p>
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
              src="/section_images/Blog 3.jpg"
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
              src="/section_images/Blog 3.jpg"
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
                    <Link href={`/resource_center/${blog.blogSubtitle.toLowerCase().replace(/ /g, "-")}`} className="text-[#1A69DC] font-semibold">
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
