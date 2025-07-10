// pages/index.js
"use client"
import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";


const lendingData = {
  "title": "Is Your Member Experience Broken? You're Already Losing.",
  "author": "Prateek Samantaray",
  "sections": [
    {
      title: "",
      paragraphs: [
        <strong>The Duct Tape Dilemma: Why Credit Unions Can't Afford to Wait</strong>,
        <span>We all know the story of the Apollo 13 crew, stranded miles from Earth. Their lives depended on ingenious, on-the-fly problem-solving – famously, using duct tape to fix a critical carbon dioxide filter. It’s a testament to human ingenuity and the power of a quick fix in an emergency.</span>,
        <span>But here’s the blunt truth for credit unions today: <strong>If your member experience is broken, you're irrelevant</strong>. And for too long, many of you have been operating like that heroic crew, patching critical systems together with digital "duct tape." Custom-built integrations that fray with every core system update, manual workarounds to bridge disparate platforms, and layers of human intervention to compensate for technological gaps. This patchwork, while perhaps functional in calmer waters, is now failing under the immense pressure of a rapidly evolving financial landscape.</span>,
        <span>Operational efficiencies aren't optional anymore; they are a prerequisite for survival and growth. The financial ground is shifting beneath our feet. While everyone is talking about Artificial Intelligence, precious few are genuinely leveraging it as a strategic multiplier. The most underestimated trend right now isn't just the rise of fintechs, but the sheer volume of fintech lending happening outside traditional institutions—and what it means for your continued relevance. This isn't just about losing market share; it's about losing the next generation of members, losing mindshare, and ultimately, losing your unique position in the financial ecosystem.</span>
      ]
    },
    {
      "title": "The Ache of Inefficiency: Where Credit Unions Are Bleeding",
      "paragraphs": [
        <span>
          Let's be candid about where the friction lies for many credit unions, the deep-seated pains that duct tape simply cannot fix:
        </span>,
        <ul className="list-disc ml-4 mt-4">
          <li><strong>The Agony of the Slow Loan:</strong> Imagine a member, eager to consolidate debt or buy a new car. They visit your branch, navigate your online portal, only to be met with a multi-day, even multi-week, journey of forms, signatures, and waiting. In an era of instant gratification, where a loan decision can be made in minutes by an agile fintech, this protracted experience is more than an inconvenience; it's a profound betrayal of expectation. It's the moment they sigh, "There has to be a better way," and sadly, often find it elsewhere.
          </li>
          <li><strong>The Cost of "Good Enough": </strong> Your teams are brilliant, dedicated individuals, but they are drowning in manual tasks. Re-keying data, cross-referencing spreadsheets, chasing down missing documents – these aren't value-added activities. They're soul-crushing repetitions that lead to burnout, errors, and an inability to focus on truly serving the member. This isn't just about losing efficiency; it's about losing your most valuable asset: your people.</li>
          <li><strong>A Fragmented Member Journey:</strong> A member starts an application online, calls with a question, then walks into a branch. Do their interactions feel seamless? Or do they have to re-explain their situation, feeling like an anonymous number rather than a valued individual? This inconsistency breeds frustration and signals that you don't truly know them, chipping away at the trust you've painstakingly built.</li>
          <li><strong>The Innovation Deficit:</strong> The duct-taped infrastructure you're managing consumes an inordinate amount of your IT budget and staff time. This leaves little capacity for true innovation. While fintechs are rapidly deploying cutting-edge features, you're stuck in maintenance mode, perpetually playing catch-up. This isn't just a competitive disadvantage; it's a threat to your future.</li>
          <li><strong>The Generational Gap:</strong> Younger members, raised on intuitive apps and personalized digital experiences, aren't interested in processes designed for a bygone era. They expect speed, transparency, and a frictionless journey. If you can't deliver, they simply won't engage. It's a silent exodus, happening now, undermining your long-term viability.</li>
        </ul>,
      ]
    },
    {
      "title": "Algebrik AI: Beyond the Duct Tape",
      "paragraphs": [
        "This is where Algebrik AI steps in. We don't just offer another piece of software; we offer a fundamental shift in how credit unions operate and engage with their members. Our platform is built from the ground up to address these critical pain points head-on, transforming your loan origination process into a competitive advantage. We empower you to move beyond the fragile patches and build a robust, future-proof foundation.",
        <span>Our technical offering is a <strong>cloud-native, AI-powered Lending Stack: Algebrik One</strong>, purpose-built for the digital era. Here’s how it serves as your strategic multiplier:</span>,
        <ol className="list-decimal  ml-4 mt-4">
          <li className="mb-6"><strong>AI-Driven Loan Origination Automation: The End of Manual Labor.</strong>
            This is not simply workflow automation. Our proprietary AI algorithms intelligently automate every stage of the loan lifecycle, from application intake and document processing to identity verification, credit scoring, and agreement generation.
            <ul className="list-disc ml-10 mt-2">
              <li>
                <strong>Seamless Onboarding and Guided Borrower Flow:  The Frictionless Path.</strong> We eliminate friction at the very first touchpoint. Our platform offers intuitive, guided borrower flows with smart pre-filling capabilities, allowing members to apply from any device, anywhere, anytime.
              </li>
              <li>
                <strong>Technical Deep Dive: Our API-first, event-driven architecture</strong> ensures seamless, real-time integration with your existing core systems (e.g., through partnerships with Corelation, Equifax, Jack Henry), as well as essential third-party data providers like Plaid for instant, consumer-permissioned financial data access. This unified data layer feeds our AI, creating a truly personalized and efficient onboarding experience, drastically reducing manual data entry and human-induced errors.
              </li>
            </ul>
          </li>
          <li className="mb-6">
            <strong>Intelligent Decisioning Engine: Smarter, Faster, Fairer Decisions.</strong> Our AI-powered decisioning engine goes beyond simple rule-based systems. It learns and adapts, providing predictive insights that enable smarter, more consistent lending decisions, all while adhering to regulatory requirements.
            <ul className="list-disc ml-10 mt-2">
              <li>
                <strong>Technical Deep Dive:</strong> Utilizing AI principles, our decisioning engine provides transparency into why a particular decision was made, crucial for compliance and building member trust. Our continuous learning models are constantly refined with new data, improving accuracy, identifying subtle patterns, and mitigating bias, leading to a significant reduction in operational costs (up to 30%) and a fairer outcome for your diverse member base.
              </li>
            </ul>

          </li>
          <li className="mb-6">
            <strong>Real-time Fraud Detection & Compliance Automation:</strong> We embed sophisticated fraud detection and compliance checks directly into the workflow, protecting both your institution and your members without creating bottlenecks.
            <ul className="list-disc ml-10 mt-2">
              <li>
                <strong>Technical Deep Dive:</strong> In partnership with leaders in fraud prevention, our system integrates advanced real-time fraud scoring models that identify synthetic identities, identity theft, and other fraudulent activities using machine learning to detect anomalous patterns and suspicious behaviors before they become costly problems. Automated compliance checks, driven by configurable rules engines, ensure adherence to evolving regulations, drastically reducing manual review time.
              </li>
            </ul>
          </li>
          <li className="mb-6">
            <strong>Composable Loan Products: Agility at Your Fingertips.</strong> Launch new loan products and offers in minutes, not months. Our platform's inherent flexibility allows you to rapidly adapt to market demands and unique member needs.
            <ul className="list-disc ml-10 mt-2">
              <li>
                <strong>Technical Deep Dive:</strong> Our microservices-based architecture and intuitive low-code/no-code configuration capabilities empower your business teams to design, test, and deploy new loan programs without extensive IT involvement. This composable approach ensures unparalleled agility and truly future-proofs your lending operations against unforeseen market shifts, driving an 80% faster time to market for new offerings.
              </li>
            </ul>
          </li>
          <li className="mb-6">
            <strong>Empowering Financial Intelligence: Beyond Just Lending.</strong> Beyond streamlining loans, Algebrik enables credit unions to become true financial intelligence partners for their members.
            <ul className="list-disc ml-10 mt-2">
              <li>
                <strong>Technical Deep Dive:</strong> Our platform facilitates data centralization and advanced analytics, providing a 360-degree view of your members' financial lives. By analyzing transactional histories, spending habits, and behavioral patterns, our AI can help identify opportunities for proactive financial guidance, personalized product recommendations, and targeted outreach. This isn't just about selling more loans; it's about understanding and anticipating member needs, fostering deeper relationships, and positioning you as their indispensable, trusted financial advisor.
              </li>
            </ul>
          </li>
        </ol>,
      ]
    },
    {
      "title": "The Call to Lead: Evolve Before Irrelevance Sets In",
      "paragraphs": [
        "The choice before credit unions is clear. You can continue to rely on the digital 'duct tape,' hoping it holds under increasing pressure, and watch as fintechs capture the digital-first generation. Or, you can embrace the power of AI to reclaim your competitive edge and forge a future where your credit union is not just relevant, but indispensable.",
        "This isn't a 'wait and see' moment. The most successful credit unions of tomorrow will be those that lead with strategy, recognize their inherent role in the financial intelligence business, and deliver experiences members can't help but talk about.",
        "Algebrik AI provides the technology to empower this transformation. We take on the heavy lifting of modernizing your loan origination and member engagement, allowing your dedicated teams to focus on what truly matters: building meaningful relationships and serving your communities. The future of credit unions isn't just about being trustworthy; it's about being brilliantly efficient, deeply personalized, and undeniably relevant.",
        <strong>Don't let a broken member experience, or the limitations of digital duct tape, be your undoing. Embrace AI, embrace true efficiency, and lead the charge towards a future where your credit union isn't just surviving, but thriving</strong>,
        <strong>Check if your lending stack might break under the pressure that you need to be ready for: Take the Lending Stack Health Check Now!!</strong>
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
            text="Is Your Member Experience Broken? You're Already Losing."
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
                    <p>3 min read</p>
                    <p>July 10, 2025</p>
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
            {/* <div className="absolute opacity-[30%] top-0 lg:left-1/3 -z-10">
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


            </div> */}
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
