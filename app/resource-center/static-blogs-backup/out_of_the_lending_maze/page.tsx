// pages/index.js
"use client"
import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BlogFour() {
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
          text="Out of the Lending Maze: Why Modern Lending Journeys need a GPS upgrade"
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
                                <h3>Prateek Samantaray          </h3>
                              </div>
                <div className="flex flex-col md:flex-row md:gap-4">
                  <h4>
                    Published in <span>The Startup</span>
                  </h4>
                  <p>8 min read</p>
                  <p>Jan 26, 2025</p>
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
            src="/section_images/blog/out.webp"
            width={1160}
            height={500}
            alt=""
            priority
            quality={100}
          />
        </div>

        <div className="flex flex-col pt-[24px] gap-5">
          <ContentSection
            title="The Borrower’s Perspective: Friction and Frustration"
            paragraphs={[
              `Imagine this: a small business owner, Maria, is ready to scale her bakery after years of bootstrapping. She approaches her local credit union, expecting support. Instead, she encounters a cumbersome application process involving endless paperwork, repetitive documentation requests, and a lack of clear timelines. Weeks pass, and Maria’s excitement turns into frustration.
`,
              `Maria’s story is not unique. Borrowers today expect experiences that match the seamless interactions they have with digital-first brands like Amazon or Netflix. Yet, many financial institutions fall short, relying on legacy systems that are not only slow but also fail to provide personalized experiences. According to McKinsey, Gen Z—a key demographic shaping the future of banking—prioritizes convenience and personalization, with 71% willing to switch providers for a better digital experience.
`,
            ]}
          />
          <ContentSection
            title="The Lender’s Dilemma: Balancing Efficiency and Risk
"
            paragraphs={[
              `On the flip side, lenders grapple with their own set of challenges. Credit unions, for example, are often constrained by limited resources and face difficulty competing with larger banks and fintechs. Manual processes dominate underwriting and compliance, leaving little room for agility. Moreover, as the Gartner report highlights, increasing regulatory demands and the rise of non-traditional competitors are placing immense pressure on lenders to adapt.
`,
              `A particularly telling statistic from McKinsey’s research indicates that inefficiencies in loan processing contribute to operational costs that are 20-30% higher than they need to be. These inefficiencies are not just financial burdens but also lead to missed opportunities in acquiring and retaining borrowers.
.`,
            ]}
          />

<ContentSection
            title="The Paradigm Shift: Native and AI-First Solutions
"
            paragraphs={[
              `To address these challenges, the industry needs a paradigm shift. This is where the concept of “Native and AI-First” solutions comes into play. Imagine lending systems that are as intuitive and adaptive as today’s smartest technologies—platforms that can process loan applications in minutes rather than weeks, powered by AI capable of learning from and adapting to real-time borrower behavior.
`,
              `According to Gartner, AI-powered Loan Origination Systems (LOS) can reduce processing times by up to 70%, while also improving decision accuracy and compliance. For smaller institutions like credit unions, adopting cloud-native and AI-driven platforms offers the dual advantage of scalability and affordability. Instead of being reactive, lenders can become proactive, predicting borrower needs and offering tailored solutions that drive engagement and loyalty.`,
            ]}
          />
          <ContentSection
            title="An Analogy: Lending’s “GPS Moment”

"
            paragraphs={[
              `Think of the lending process as a road trip. Legacy systems are like old paper maps—functional but cumbersome, prone to errors, and unable to adapt to changing conditions. Native and AI-First platforms, on the other hand, are like modern GPS systems. They not only chart the fastest route but also account for real-time traffic, roadblocks, and detours, ensuring a smoother journey for both borrowers and lenders.
`,
              `The future of lending lies in creating systems that not only understand the borrower’s journey but also anticipate their needs. It’s about marrying precision with empathy, ensuring that every loan issued is a step towards building trust and financial inclusivity.
`,
            ]}
          />
          <ContentSection
            title="The Next Steps?"
            paragraphs={[
              `What if borrowing didn’t feel like climbing a mountain? What if lenders had tools to pave a clear, smooth path to approval, one that benefits borrowers and institutions alike? This vision isn’t just aspirational—it’s achievable. The key lies in addressing core lending pain points with transformative solutions that prioritize simplicity, speed, and scalability.
`
            ]}
          />
          <ContentSection
            title="1. Borrower-Centric Workflows
"
            paragraphs={[
              `Imagine a lending experience as effortless as ordering coffee through a mobile app. Borrowers—whether they are families seeking a home loan or small businesses looking for capital—want clarity, convenience, and control. Borrower-centric workflows streamline this experience by removing unnecessary hurdles and creating intuitive, guided paths from application to approval.
`,
`Take, for instance, the power of digital identity verification. Instead of lengthy paperwork and manual background checks, AI-driven systems can authenticate borrowers in seconds. According to Gartner, automating this process has helped lenders reduce onboarding times by as much as 80%, enhancing borrower satisfaction and trust.
`
            ]}
          />
           <ContentSection
            title="2. Automation: The Engine of Efficiency
"
            paragraphs={[
              `Lending doesn’t need to be bogged down by manual processes. Automating repetitive and error-prone tasks like document verification or compliance checks not only cuts costs but accelerates decision-making. For example, automation in loan approvals can bring processing times down from weeks to mere hours, as evidenced by institutions that have embraced AI and machine learning.
`
            ]}
          />
            <ContentSection
            title="3. Cloud-Native Flexibility

"
            paragraphs={[
              `Cloud-native platforms are rewriting the rules of scalability and adaptability. Credit unions and smaller lenders can now leverage enterprise-level technologies without the prohibitive costs of legacy infrastructure. Cloud solutions enable lenders to expand into new markets or launch tailored financial products in weeks rather than months. Gartner estimates that cloud-native LOS solutions can boost operational agility by up to 65%, positioning lenders for rapid growth in a dynamic financial landscape.`
            ]}
          />
            <ContentSection
            title="4. Smarter Risk Management


"
            paragraphs={[
              `Predictive analytics offers a game-changing advantage for lenders. Unlike traditional risk assessment methods, AI-powered models analyze trends, behaviors, and market conditions in real-time to forecast potential risks with pinpoint accuracy. McKinsey’s findings reveal that predictive models have reduced non-performing loans by 25% in institutions that have adopted them, safeguarding lender portfolios while enabling confident decision-making.`,
              `At Algebrik AI, we envision a world where lending is no longer a maze of uncertainty but a highway of opportunity. To truly transform lending, we must eliminate its complexities and deliver solutions that empower borrowers and lenders alike. The road forward isn’t just digital—it’s human-centered, adaptive, and built for all. `
            ]}
          />
             <ContentSection
            title="The Vision for the Future of Lending"
            paragraphs={[
              `The future of lending lies at the intersection of technology, inclusivity, and empathy. While current advancements like automation and AI are laying the groundwork, true transformation will only be realized when lending becomes inherently intuitive, predictive, and human-centric. Imagine a world where loans are not just financial transactions but stepping stones to dreams, where every borrower journey is streamlined, and every lender process is efficient yet personal.
`,
            ]}
          />
            <ContentSection
            title="1. Personalized Borrower Journeys: From Data to Empathy
"
            paragraphs={[
              `The lending industry must shift from a transactional mindset to a relationship-driven model. Technology can enable this by leveraging data to craft hyper-personalized experiences. For instance, AI can predict borrower preferences and offer tailored loan options even before they apply. But beyond the algorithms, the vision is one of empathy\u2014creating systems that respond to individual needs, much like a trusted advisor rather than a faceless institution.`,
            ]}
          />
            <ContentSection
            title="2. Continuous Innovation for Financial Institutions of All Sizes"
            paragraphs={[
              `The future isn’t limited to large-scale banks and fintech giants. Credit unions, community banks, and even microfinance institutions can thrive by embracing technology that scales with them. Cloud-native platforms and modular solutions will enable these smaller players to compete on equal footing, democratizing access to advanced tools that were once exclusive to industry leaders`,
              `A McKinsey study shows that institutions adopting scalable, flexible technologies report 45% higher operational efficiency and improved borrower retention. This paints a clear picture: future-ready systems aren’t just about size but adaptability.
`
            ]}
          />
            <ContentSection
            title="3. Expanding the Definition of Financial Inclusion"
            paragraphs={[
              `Inclusion has been a buzzword for years, but it’s time to make it actionable. The unbanked and underbanked populations\u2014comprising over 1.7 billion individuals worldwide\u2014are more than a statistic. They represent untapped potential. By utilizing alternative credit scoring models and offering micro-loans through digital channels, lenders can bring these individuals into the financial fold.`,
              `Consider the analogy of a bridge connecting two previously isolated islands. Financial institutions must build these bridges, ensuring that geography, socioeconomic status, or lack of traditional credit history no longer hinders access to capital.
`
            ]}
          />
              <ContentSection
            title="4. Responsible AI and Data Ethics
"
            paragraphs={[
              `As lending becomes more data-driven, the ethical implications of AI must be at the forefront. Bias in algorithms, data privacy concerns, and transparency in decision-making will shape the future of responsible lending. Institutions will need to adopt frameworks that ensure fairness, accountability, and inclusivity.
`
            ]}
          />
             <ContentSection
            title="5. Enabling Speed Without Sacrificing Accuracy"
            paragraphs={[
              `In a fast-paced digital world, borrowers expect speed, but lenders can’t compromise accuracy. The future of lending will see a symbiotic relationship between automation and human oversight. AI will handle deterministic tasks\u2014like document verification or fraud detection\u2014while leaving probabilistic decisions to loan officers equipped with powerful insights. This balance ensures both efficiency and informed decision-making.
`
            ]}
          />
            <ContentSection
            title="The Algebrik AI Vision: Lending Reimagined
"
            paragraphs={[
              `At Algebrik AI, we see a future where every loan is a catalyst for change. Whether it’s helping a single mother secure her first home or enabling a small business to thrive in a competitive market, our vision is to create systems that make lending simpler, faster, and more meaningful.
`,
`The real revolution in lending isn’t just about technology. It’s about creating connections, building trust, and empowering people. That’s the future we’re building with Algebrik AI.
`
            ]}
          />
             <ContentSection
            title="Algebrik AI - Turning Vision into Reality"
            paragraphs={[
              `In an industry weighed down by complexity, we plan to stand as a beacon of simplicity and innovation. By addressing the fundamental pain points of lending and building solutions grounded in AI, cloud technology, and user-centric design, Algebrik AI is reshaping how lenders operate and borrowers experience the journey to financial empowerment.
`
            ]}
          />
          <ContentSection
            title="1. AI-Powered Transformation
"
            paragraphs={[
              `Algebrik AI’s platform brings the best of artificial intelligence to every stage of the lending lifecycle. From intelligent borrower guidance and lender support to dynamic credit scoring, the platform ensures speed, accuracy, and adaptability. Loan officers can focus on strategic decision-making while AI handles routine tasks, reducing processing times and improving borrower satisfaction.
`
            ]}
          />
          <ContentSection
            title="2. Cloud-Native Architecture

"
            paragraphs={[
              `Built for scalability and resilience, Algebrik AI’s cloud-native infrastructure enables financial institutions to adapt to market needs with agility. Whether it’s launching new products or scaling operations to new geographies, the platform ensures seamless expansion without the constraints of legacy systems. 
`
            ]}
          />
          <ContentSection
            title="3. Guided Borrower Journeys"
            paragraphs={[
              `Borrowers today demand clarity and simplicity. Algebrik AI’s intuitive interface guides users through every step of the lending process, from application to disbursement. The result? Reduced drop-offs, faster approvals, and a borrower experience that fosters trust and loyalty.`
            ]}
          />
          <ContentSection
            title="4. A Commitment to Inclusion"
            paragraphs={[
              `Algebrik AI leverages alternative data sources and advanced analytics to extend credit access to underserved populations. By empowering financial institutions to serve unbanked and underbanked communities, the platform contributes to a more inclusive financial ecosystem.`
            ]}
          />
           <ContentSection
            title="5. Responsible and Ethical AI"
            paragraphs={[
              `Transparency, fairness, and accountability are at the core of Algebrik AI’s approach. The platform’s AI models are rigorously tested to eliminate bias, ensuring that lending decisions are both equitable and ethical. Borrowers and lenders alike can trust that their data is secure and their interests are prioritized.`
            ]}
          />
          <ContentSection
            title="The Future Starts Now!"
            paragraphs={[
              `The challenges of lending are undeniable, but so are the opportunities. With a vision rooted in empathy, inclusivity, and innovation, Algebrik AI is not just transforming lending—it’s redefining what’s possible. As the industry stands at the crossroads of tradition and technology, the choice is clear: embrace the tools and systems that enable growth, or risk being left behind.`,
              `The journey to a simpler, smarter, and more inclusive lending future has begun. With Algebrik AI leading the way, the destination is closer than we think.`
            ]}
          />
        </div>
        <div className="pt-[35px]">
          <Image
            src="/section_images/blog/out.webp"
            width={1160}
            height={500}
            alt=""
            priority
            quality={100}
          />
        </div>

        <div className="mt-16">
        <CustomHeader text="More Blogs" className="text-center"/>
        
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
    <ReadyToGo/>
    </>
  );
}

interface ContentSectionProps {
  title: string;
  paragraphs: string[];
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
