// pages/index.js
import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";

const lendingData = {
  "title": "Redefining Borrower Experience in Lending",
  "sections": [
    {
      "title": "The Borrower’s Perspective – Challenges and Frustrations",
      "paragraphs": [
        "\"A great customer experience is the best competitive advantage any business can have,\" said Tony Hsieh, the late founder of Zappos. Yet in the world of lending, borrowers often encounter an experience that is far from great. From convoluted application processes to a lack of transparency and personalization, the borrower’s journey is riddled with challenges that lead to frustration and, frequently, abandonment.",
        "Consider this: According to a PwC survey, 63% of borrowers drop out of the loan application process due to excessive paperwork and unclear communication. In an age where digital-first experiences are the norm, such inefficiencies are no longer acceptable. Borrowers expect more—more speed, more clarity, and more personalization."
      ],
      "subsections": [
        {
          "subtitle": "Key Challenges Faced by Borrowers",
          "paragraphs": [
            "Complex Processes: Lengthy applications, redundant documentation, and manual verifications make the process tedious and time-consuming.",
            "Lack of Transparency: Borrowers often feel left in the dark regarding their application status, leading to anxiety and distrust.",
            "Generic Interactions: One-size-fits-all approaches fail to address unique borrower needs, creating a sense of alienation.",
            "These challenges not only hinder borrower satisfaction but also result in lost opportunities for lenders. In today’s competitive financial landscape, addressing these pain points is no longer optional—it’s essential."
          ]
        }
      ]
    },
    {
      "title": "The Importance of Personalization in Lending",
      "paragraphs": [
        "Personalization is more than just a buzzword; it’s a fundamental shift in how financial institutions engage with borrowers. Studies show that 80% of consumers are more likely to do business with companies that offer personalized experiences (Epsilon Research). In lending, this translates to tailored loan products, proactive communication, and empathetic support."
      ],
      "subsections": [
        {
          "subtitle": "Benefits of Personalization for Borrowers",
          "paragraphs": [
            "Enhanced Clarity: Personalized loan options and clear guidance reduce confusion.",
            "Increased Trust: Borrowers are more likely to trust institutions that demonstrate an understanding of their unique needs.",
            "Higher Satisfaction: A seamless, customized experience fosters loyalty and positive word-of-mouth."
          ]
        }
      ]
    },
    {
      "title": "Enhancing Trust and Satisfaction Through Technology",
      "subsections": [
        {
          "subtitle": "AI-Powered Insights",
          "paragraphs": [
            "Artificial Intelligence (AI) enables lenders to analyze borrower data and offer hyper-personalized recommendations. For instance, AI can predict the most suitable loan products for an individual based on their financial history and goals. According to McKinsey, lenders using AI-driven personalization have seen borrower satisfaction rates increase by 25%."
          ]
        },
        {
          "subtitle": "Real-Time Communication",
          "paragraphs": [
            "AI-powered chatbots and virtual assistants provide instant answers to borrower queries, ensuring transparency and reducing anxiety. Features like real-time application tracking further enhance clarity, keeping borrowers informed at every step."
          ]
        },
        {
          "subtitle": "Simplified Processes",
          "paragraphs": [
            "Automation eliminates redundant steps, such as manual documentation checks, speeding up the application process. Borrowers experience less friction and faster approvals, leading to higher satisfaction."
          ]
        },
        {
          "subtitle": "Post-Loan Engagement",
          "paragraphs": [
            "Technology doesn’t stop at loan disbursement. AI-powered tools can offer financial health tips, payment reminders, and loan restructuring options, ensuring borrowers feel supported throughout their journey."
          ]
        }
      ]
    },
    {
      "title": "Algebrik’s Solution for Borrower-Centric Lending",
      "paragraphs": [
        "At Algebrik, we believe that lending should empower borrowers, not frustrate them. Our borrower-centric approach is designed to address the key challenges outlined above, leveraging technology to create seamless, personalized, and transparent experiences."
      ],
      "subsections": [
        {
          "subtitle": "Guided Borrower Journeys",
          "paragraphs": [
            "Our platform offers step-by-step guidance, ensuring borrowers know exactly what to do and when. From application to approval, we provide real-time updates and proactive support."
          ]
        },
        {
          "subtitle": "Personalization at Scale",
          "paragraphs": [
            "Using AI, Algebrik tailors loan recommendations to each borrower’s unique financial situation, eliminating the guesswork and increasing satisfaction."
          ]
        },
        {
          "subtitle": "Transparency and Trust",
          "paragraphs": [
            "Borrowers can track their application status in real time, receive clear explanations of loan terms, and access instant support through our virtual assistant. These features build trust and confidence."
          ]
        },
        {
          "subtitle": "Beyond Approval",
          "paragraphs": [
            "Our commitment to borrowers doesn’t end with loan approval. Algebrik provides ongoing financial health insights and support, ensuring borrowers feel valued throughout their journey."
          ]
        }
      ]
    },
    {
      "title": "A New Era of Borrower Experience",
      "paragraphs": [
        "The borrower’s journey is at the heart of the lending process, yet it has often been overlooked in favor of operational efficiency. By addressing borrower challenges and prioritizing personalization, transparency, and trust, financial institutions can redefine what it means to borrow in today’s world.",
        "Algebrik is leading this transformation, creating a borrower-centric lending ecosystem that goes beyond transactions to build relationships. The future of lending is not just faster or smarter—it’s empathetic, inclusive, and designed with the borrower in mind. Together, we can create a new standard for borrower experiences, turning lending into a journey of empowerment and trust."
      ]
    }
  ]
}




export default function BlogOne() {
  return (
    <>
    <div className="container mx-auto px-5 md:px-0 py-36 md:w-[1160px] font-plus-jakarta flex flex-col justify-center items-center">
      <div className="flex flex-col items-start text-left w-full gap-[16px]">
        <CustomHeader
          text="Redefining Borrower Experience in Lending
"
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
            src="/section_images/blog/redef.webp"
            width={1160}
            height={500}
            alt=""
            priority
            quality={100}
          />
        </div>

        <div className="flex flex-col pt-[24px] gap-5">
        {lendingData.sections.map((section, index) => (
  <div key={index}>
    <ContentSection
      title={section.title}
      paragraphs={section.paragraphs || []} // Provide fallback
    />
    {section.subsections &&
      section.subsections.map((subsection, subIndex) => (
        <ContentSection
          key={`${index}-${subIndex}`}
          title={subsection.subtitle}
          paragraphs={subsection.paragraphs || []} // Provide fallback
        />
      ))}
  </div>
))}



     </div>
        <div className="pt-[35px]">
          <Image
            src="/section_images/blog/redef.webp"
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
    <div className="flex flex-col gap-[16px] mt-3">
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
