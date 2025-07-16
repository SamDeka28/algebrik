// pages/index.js
import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";

const lendingData = {
  "title": "From Suggestions to Action: How Credit Unions Are Putting Agentic Al to Work ",
  "author": "Prateek Samantaray",
  "sections": [
    {
      title: "Is Your Al Still Asking You What to Do? ",
      paragraphs: [
        "Let's be honest-most Al in credit unions today still feels like another dashboard",
        <blockquote className="italic">It highlights the problem... suggests a next step... and waits for someone on your team to act. </blockquote>,
        'But forward-thinking credit unions are beginning to flip that script. ',
        `They're turning to Agentic Al—a new class of Al that doesn't just assist, it acts. It's capable of carrying out lending tasks from end to end: validating documents, routing exceptions, updating loan statuses—without waiting for a human to click "next."         `
        , `And it's not theoretical. Credit unions across the U.S. are already using it to: `,
        <ul className="list-disc ml-4 leading-loose">
          <li>
            Cut origination times by up to 40% </li>
          <li>
            Scale loan volumes without increasing headcount
          </li>
          <li>
            Eliminate repetitive, manual effort from lending flows</li>
        </ul>,
        "This blog explores how real credit unions are using Agentic Al in the field today, what makes it different from generative Al, and how you can start spotting real action-not just marketing fluff. "
      ]
    },
    {
      "title": `Generative vs. Agentic Al: Why It's Time to Move Beyond "Smart Suggestions"`,
      "paragraphs": [
        "You've probably heard it before: ",
        <p>"<i>Our</i> LOS <i>is Al-powered.</i>" </p>,
        "But what does that actually mean? ",
        `For many lenders, Al today is still in its "suggestive" phase-it can summarize documents, flag anomalies, or even draft responses. But it doesn't do the work. It still needs a person to click, review and route. `,
        <p>That's the core difference between <strong>Generative Al</strong> and <strong>Agentic Al</strong>. </p>,
        <p className="text-2xl"><strong>Generative Al: Smart, But Passive </strong></p>,
        "Generative Al is excellent at language tasks: ",
        <ul className="list-disc ml-4 leading-loose">
          <li>Drafting emails</li>
          <li>Summarizing documents </li>
          <li>Writing policies or scripts</li>
        </ul>,
        <p>But it stops short of <strong>execution</strong>. It can tell you what to do, but it won't actually do it. </p>,
        <p>A 2024 Cornerstone Advisors survey found that <strong>63% of banks and credit unions using Al tools</strong> are still relying on staff to finalize actions-even after the Al "assists." It's like having a very smart intern who still asks, "Now what?"</p>,
        <p className="text-2xl"><strong>Agentic Al: Smart and Active </strong></p>,
        "Agentic Al, by contrast, is built to take action-confidently and compliantly. It operates inside your workflows, not outside them. ",
        `According to Decisions.com, Agentic Al systems can:`,
        <ul className="list-disc ml-4 leading-loose">
          <li>Validate borrower documents in real time</li>
          <li>Route exceptions without manual oversight </li>
          <li>Pre-fill application data using multi-source intelligence</li>
          <li>Trigger downstream workflows (e.g., credit pulls, disclosures) autonomously </li>
        </ul>,
        <p>In other words: it's a system of <strong>action</strong>, not just of <strong>record</strong> or <strong>recommendation</strong>.  </p>,
      ]
    },
    {
      "title": "Why Suggestive Al Falls Short ",
      "paragraphs": [
        `In high-volume lending environments, suggestive Al creates friction: `,
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 my-10">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr className="table-row">
              <th scope="col" className="px-6 py-3">Step</th>
              <th scope="col" className="px-6 py-3">With Suggestive AI</th>
              <th scope="col" className="px-6 py-3">With Agentic AI</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b border-gray-200">
              <td className="px-6 py-4">Income Validation</td>
              <td  className="px-6 py-4">Suggest Missing Info</td>
              <td className="px-6 py-4">Completes Validation</td>
            </tr>
            <tr className="bg-white border-b border-gray-200">
              <td className="px-6 py-4">Exception Handling</td>
              <td className="px-6 py-4">Flags for review</td>
              <td className="px-6 py-4">Routes to the next best action</td>
            </tr>
            <tr className="bg-white border-b border-gray-200">
              <td className="px-6 py-4">Document Review</td>
              <td className="px-6 py-4">Summarizes Content</td>
              <td className="px-6 py-4">Verifies and approves or rejects</td>
            </tr>
            <tr className="bg-white border-b border-gray-200">
              <td className="px-6 py-4">Workflow routing</td>
              <td className="px-6 py-4">Creates alerts</td>
              <td className="px-6 py-4">Executes handoff and logs decision</td>
            </tr>
          </tbody>
        </table>,
        "Over time, these micro-inefficiencies compound. ",
        `A study by Whatfix in early 2024 revealed that financial institutions using passive Al saved an average of 7-9 minutes per application.`,
        `Those using agentic frameworks saved over 30 minutes per application—without increasing error rates. `

      ]
    },
    {
      "title": "Why Agentic Al Is Picking Up Steam",
      "paragraphs": [
        `Several factors are accelerating the shift: `,
        <ul className="list-disc ml-4 leading-loose">
          <li><strong>Staffing gaps: </strong>Credit unions are facing talent shortages. Agentic Al steps in to automate repeatable decisions.</li>
          <li><strong>Rising member expectations: </strong>Consumers want fast, mobile-friendly decisions. Waiting on a back-office review? That's not cutting it. </li>
          <li><strong>Margin pressure: </strong>Loan growth is slowing; cost per funded account is rising. Every manual step eats into profitability</li>
        </ul>,
        <p>As Alkami's 2024 Digital Banking Index notes, <strong>"Institutions that automate underwriting and document processing see up to 40% faster originations</strong> and up to 2x improvements in member NPS."</p>,
        <strong>Bottom Line: It's Time to Rethink What Al Does </strong>,
        "Generative Al is helpful.",
        "Agentic Al is transformational. ",
        `In 2025, the competitive edge won't come from how well your system can summarize PDFs or generate insights. `,
        `It'll come from how much real work your system can do—accurately, compliantly, and without intervention. `,
        `Stay tuned for our next section, where we walk through practical signs to tell real Agentic Al from rebranded automation fluff. `,
        `Generative Al is helpful`,
        `Agentic Al is transformational.`,
        `In 2025, the competitive edge won't come from how well your system can summarize PDFs or generate insights.`,
        `It'll come from how much real work your system can do-accurately, compliantly, and without intervention. `,
        `Want to see the difference for yourself? `,
        <p><strong>Join us live</strong> on <strong>August 12</strong> at <strong>2 PM EST</strong> for our webinar: </p>,
        <p><strong>"Generative Al vs. Agentic Al-And Why It Matters for Lending"</strong> </p>,
        "You'll hear from: ",
        <ul className="list-disc ml-4 leading-loose">
          <li>Tech leaders building Al-first workflows inside real credit unions</li>
          <li>Operations heads eliminating exception queues without adding headcount</li>
          <li>Product experts explaining how to spot real Agentic capabilities vs. assistive fluff</li>
        </ul>,
        "Whether you're auditing your stack or planning for 2025, this session will give you the lens—and language to separate hype from help.",
        "[Save Your Spot →] ",
        "Because in lending, it's not about having Al. ",
        "It's about having the right kind. "
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
            text="From Suggestions to Action: How Credit Unions Are Putting Agentic Al to Work "
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
                  <Image
                    src="/section_images/blog/pra.webp"
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
              src="/section_images/blog-agents.png"
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
              src="/section_images/blog-agents.png"
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
