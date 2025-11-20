// pages/index.js
"use client"
import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const lendingData = {
  "title": "From Fragmentation to Seamlessness: Streamlining Lending Journeys",
  "author": "Prateek Samantaray",
  "sections": [
    {
      "title": "Inefficiencies in Traditional Lending",
      "paragraphs": [
        "When I reflect on my early years working closely with credit unions (CUs), I’m reminded of countless conversations with loan officers and borrowers alike. One story that stays with me is that of a loan officer named Claire, a diligent professional at a small CU in the Midwest. Claire’s passion for serving her community was palpable, but the tools at her disposal made her job a daily struggle. She often joked about needing a magician’s wand to manage the endless paperwork and outdated systems while keeping up with regulatory requirements. Claire’s frustration mirrored that of her borrowers—small business owners and first-time homebuyers who were eager to move forward but found themselves caught in a web of inefficiencies.",
        "These inefficiencies are not unique to Claire’s CU. They’re emblematic of the challenges faced by traditional lending institutions worldwide. Despite their deep commitment to serving their communities, these institutions often find themselves held back by fragmented processes, legacy systems, and a lack of integration. The result? A cumbersome and frustrating experience for borrowers and lenders alike.",
        "The lending industry, once considered the backbone of economic growth, has become a fragmented and inefficient process for many institutions and borrowers. Traditional lending systems often resemble an intricate puzzle, where disconnected pieces—manual workflows, legacy systems, and siloed data—make the process cumbersome, slow, and error-prone."
      ]
    },
    {
      "title": "Borrower’s Frustration: Waiting in the Age of Instant Gratification",
      "paragraphs": [
        "In an era where consumers expect instant solutions, the average loan approval process can still take weeks. Borrowers often face redundant documentation requests, unclear timelines, and a lack of transparency, leaving them feeling like they’re navigating a maze without a map. According to a study by PwC, 63% of borrowers cite “excessive waiting times” as their primary frustration during the loan process.",
        "Imagine a small business owner, Raj, applying for a loan to expand his shop. Overwhelmed by paperwork and endless follow-ups, he misses out on an opportunity to secure a prime location. Raj’s story is a stark reminder of how traditional lending fails to keep pace with the needs of modern borrowers."
      ]
    },
    {
      "title": "Lender’s Burden: Operational Bottlenecks and Costs",
      "paragraphs": [
        "On the lender’s side, the inefficiencies are equally glaring. Manual underwriting processes, reliance on legacy systems, and regulatory pressures create significant operational bottlenecks. A McKinsey report highlights that inefficiencies in loan processing inflate operational costs by up to 30%, resulting in billions of dollars lost annually.",
        "Moreover, fragmented systems make it nearly impossible for lenders to gain a unified view of borrower data. This lack of integration not only slows down decision-making but also increases the risk of errors, compliance issues, and lost business opportunities."
      ]
    },
    {
      "title": "Benefits of End-to-End Lending Solutions",
      "paragraphs": [
        "To address these inefficiencies, financial institutions must embrace end-to-end lending solutions that unify workflows, eliminate silos, and enhance both borrower and lender experiences. These systems act as a single source of truth, streamlining every step of the lending journey from application to disbursement.",
        "1. Speed and Efficiency: End-to-end solutions automate repetitive tasks, such as document verification and compliance checks, drastically reducing processing times. According to a Gartner study, institutions using comprehensive lending platforms have reduced loan processing times by 60% on average, enabling faster approvals and higher borrower satisfaction.",
        "2. Enhanced Borrower Experience: Unified platforms provide borrowers with a seamless, transparent journey. Features like real-time status updates, digital onboarding, and AI-powered chat support ensure clarity and convenience. In a recent JD Power survey, lenders offering intuitive digital experiences reported a 20% higher Net Promoter Score (NPS).",
        "3. Operational Excellence for Lenders: For lenders, end-to-end systems eliminate the need for multiple tools and manual interventions. By integrating data across departments, these platforms enable faster, more accurate decision-making while reducing operational costs. A study by Deloitte found that institutions adopting these solutions saw a 45% improvement in underwriting efficiency.",
        "4. Scalability and Adaptability: End-to-end solutions are often built on cloud-native architectures, making them scalable and adaptable to evolving market needs. Whether it’s launching new loan products or expanding into new geographies, these platforms provide the agility needed to stay competitive."
      ]
    },
    {
      "title": "How AI Transforms Workflows",
      "paragraphs": [
        "Artificial Intelligence (AI) has emerged as a game-changer in modern lending, enabling institutions to reimagine workflows, enhance accuracy, and deliver personalized experiences. Here’s how AI is transforming the lending landscape:",
        "1. Intelligent Underwriting: AI-powered underwriting systems analyze vast amounts of data in real time, providing insights that go beyond traditional credit scores. For instance, machine learning algorithms can evaluate alternative data sources—such as utility payments or social behavior—to assess borrower creditworthiness. According to Experian, lenders using AI in underwriting have seen a 25% reduction in default rates.",
        "2. Predictive Analytics for Risk Management: AI enables lenders to predict and mitigate risks more effectively. By analyzing patterns and trends, predictive models can identify potential delinquencies and recommend proactive measures. McKinsey reports that AI-driven risk models have reduced non-performing loan ratios by 20% for early adopters.",
        "3. Automation of Routine Tasks: From document processing to compliance checks, AI automates time-consuming tasks, freeing up human resources for strategic decision-making. A PwC survey found that 72% of financial institutions using AI reported a significant reduction in manual workloads.",
        "4. Personalized Borrower Journeys: AI enhances the borrower experience by offering personalized recommendations, tailored loan options, and real-time support. Chatbots and virtual assistants, for example, guide borrowers through the application process, addressing queries instantly and improving engagement."
      ]
    },
    {
      "title": "The Operational Benefits of Streamlined Processes",
      "paragraphs": [
        "Streamlined processes don’t just benefit borrowers; they also revolutionize operations for lenders, driving efficiency, profitability, and customer loyalty.",
        "1. Cost Savings: By automating workflows and reducing redundancies, streamlined processes can cut operational costs by up to 40%, as reported by Gartner. These savings enable institutions to invest in innovation and borrower-centric initiatives.",
        "2. Faster Time-to-Market: With integrated platforms and AI-driven workflows, lenders can launch new products in weeks rather than months, capturing market opportunities faster. This agility is particularly critical in today’s competitive financial landscape.",
        "3. Improved Accuracy and Compliance: Streamlined processes ensure that compliance checks and risk assessments are thorough and error-free. AI-powered systems monitor regulatory changes in real time, ensuring institutions remain compliant without manual intervention.",
        "4. Increased Borrower Retention: A seamless lending journey fosters trust and loyalty among borrowers. Institutions that deliver exceptional experiences are more likely to retain customers and benefit from positive word-of-mouth referrals. According to JD Power, a 1% increase in borrower satisfaction can lead to a 3% increase in retention rates."
      ]
    },
    {
      "title": "Conclusion: From Fragmentation to Seamlessness",
      "paragraphs": [
        "The traditional lending journey, riddled with inefficiencies and frustrations, is no longer sustainable in today’s fast-paced world. By embracing end-to-end solutions and leveraging the transformative power of AI, financial institutions can create seamless experiences that benefit both borrowers and lenders.",
        "This isn’t just about technology; it’s about a shift in perspective. Lending must evolve from being a transactional process to becoming a transformative journey—one that empowers borrowers, supports lenders, and fosters trust at every step. With tools that unify, streamline, and adapt, we have the opportunity to reshape the future of finance, making it more inclusive, efficient, and impactful.",
        "The shift from fragmentation to seamlessness is not just an operational necessity—it’s a strategic imperative. As the industry moves forward, those who prioritize streamlined processes and borrower-centric solutions will lead the way in shaping the future of lending."
      ]
    }
  ]
}


export default function BlogOne() {
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
          text="From Fragmentation to Seamlessness: Streamlining Lending Journeys"
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
            src="/section_images/blog/frag.webp"
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
            src="/section_images/blog/frag.webp"
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
