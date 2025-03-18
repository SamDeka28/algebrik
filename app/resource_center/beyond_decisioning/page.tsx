// pages/index.js
import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";

const lendingData = {
  "title": "Beyond Decisioning: AI's Comprehensive Role in Lending",
  "author": "Prateek Samantaray",
  "sections": [
    {
      "title": "The Expanding Horizons of AI in Lending",
      "paragraphs": [
        "\"The success of any financial system lies in its ability to adapt and serve its people,\" once said Mervyn King, former Governor of the Bank of England. Yet, despite its centrality to global economies, the lending industry has been notorious for inefficiencies, delays, and fragmented systems.",
        "Consider this: According to Gartner, over 60% of borrowers abandon their loan applications due to complex processes and poor communication. In an age where personalization and speed are king, these inefficiencies are no longer acceptable. Artificial Intelligence (AI) has stepped in not as a mere tool but as a transformative force, addressing these systemic flaws and reimagining lending journeys end-to-end.",
        "During my years working with financial institutions, I’ve seen firsthand how lending challenges can feel insurmountable. I remember one particular conversation with a credit union loan officer struggling with outdated systems. “It’s like trying to build a bridge with stones instead of steel,” she said, describing the inefficiency of her tools. Her borrowers—aspiring homeowners, small business owners—were often left frustrated by delays and bureaucracy, a sentiment echoed across the lending landscape.",
        "Artificial Intelligence (AI) has emerged as the steel in this analogy, providing strength and adaptability to transform the entire lending process. Today, AI doesn’t just determine whether a borrower is eligible for a loan; it actively reshapes the borrower journey, lender workflows, and overall financial ecosystems. This blog explores how AI’s expanding role is paving the way for a seamless, efficient, and inclusive lending industry."
      ]
    },
    {
      "title": "AI’s Role in the Lending Journey",
      "subsections": [
        {
          "subtitle": "Application Support",
          "paragraphs": [
            "The loan application process has long been a pain point for borrowers. Lengthy forms, redundant documentation requests, and unclear instructions often lead to frustration and drop-offs. AI-driven chatbots and virtual assistants have stepped in to provide real-time support, guiding borrowers through the application process with ease.",
            "For example, AI can help identify missing documentation, recommend the best loan products, and provide instant answers to frequently asked questions. According to a PwC study, institutions deploying AI in their application processes have seen a 30% reduction in application abandonment rates."
          ]
        },
        {
          "subtitle": "Automation Across Workflows",
          "paragraphs": [
            "Automation powered by AI has transformed routine tasks such as document verification, fraud detection, and compliance checks. These systems not only reduce processing times but also minimize human error, creating a more reliable workflow.",
            "Take document verification as an example. AI tools can scan, analyze, and validate documents within seconds, ensuring compliance with regulatory standards. Gartner reports that automated document verification can reduce loan processing times by up to 70%."
          ]
        },
        {
          "subtitle": "Enhancing Borrower Journeys",
          "paragraphs": [
            "AI personalizes the borrower journey by analyzing data and tailoring interactions. From recommending loan products based on borrower profiles to providing real-time updates on application statuses, AI creates a borrower-centric experience.",
            "Consider AI-powered platforms that integrate with borrower accounts to track financial health and suggest loan restructuring options proactively. Such systems foster trust and loyalty by demonstrating a deep understanding of borrower needs."
          ]
        },
        {
          "subtitle": "Intelligent Underwriting and Decisioning",
          "paragraphs": [
            "The underwriting process, traditionally reliant on rigid credit scores and manual evaluations, has been revolutionized by AI. Machine learning algorithms assess a borrower’s creditworthiness by analyzing alternative data such as utility payments, rental histories, and spending patterns. This approach provides a more holistic view of the borrower’s financial health.",
            "McKinsey highlights that lenders using AI-driven underwriting have improved approval rates by 20% while maintaining or even reducing default rates. This intelligent decisioning empowers institutions to expand their borrower base without compromising risk."
          ]
        },
        {
          "subtitle": "Predictive Analytics for Risk Management",
          "paragraphs": [
            "AI’s predictive capabilities allow lenders to foresee risks before they materialize. By analyzing borrower behavior and market trends, predictive models identify potential defaults and recommend proactive measures to mitigate risks.",
            "For instance, AI can flag accounts with declining financial activity and recommend adjustments to repayment terms. Such proactive risk management has reduced non-performing loans by 25% for early adopters, according to Experian."
          ]
        },
        {
          "subtitle": "Servicing and Beyond",
          "paragraphs": [
            "Post-loan servicing is another area where AI shines. From automating payment reminders to offering personalized financial advice, AI ensures borrowers remain engaged throughout the loan lifecycle. AI-powered chatbots handle routine queries, freeing up human resources for more complex tasks.",
            "Moreover, generative AI tools can explain complex loan agreements in simple terms, ensuring borrowers fully understand their obligations. This transparency fosters stronger borrower relationships and reduces disputes."
          ]
        }
      ]
    },
    {
      "title": "Operational Benefits for Lenders",
      "paragraphs": [
        "The integration of AI into lending processes isn’t just about enhancing borrower experiences; it’s also a game-changer for lenders. Here’s how AI drives operational excellence:"
      ],
      "subsections": [
        {
          "subtitle": "Cost Efficiency",
          "paragraphs": [
            "By automating repetitive tasks, AI reduces the need for extensive human intervention, cutting operational costs by up to 40%, as reported by Deloitte. These savings can be reinvested into innovation and growth."
          ]
        },
        {
          "subtitle": "Faster Turnaround Times",
          "paragraphs": [
            "AI accelerates loan processing from weeks to hours. This speed not only enhances borrower satisfaction but also allows lenders to process higher volumes of applications."
          ]
        },
        {
          "subtitle": "Improved Accuracy and Compliance",
          "paragraphs": [
            "AI systems are designed to adhere to evolving regulatory requirements. By continuously monitoring compliance rules and updating workflows, AI minimizes the risk of non-compliance and associated penalties."
          ]
        },
        {
          "subtitle": "Scalability and Flexibility",
          "paragraphs": [
            "AI-powered platforms scale effortlessly, enabling institutions to expand into new markets or launch new products without significant infrastructural changes."
          ]
        }
      ]
    },
    {
      "title": "The Future of AI in Lending",
      "paragraphs": [
        "As AI continues to evolve, its role in lending will only grow more comprehensive. Future advancements include:",
        "Hyper-Personalized Lending: AI will use deep learning to predict borrower needs with unprecedented accuracy, offering highly tailored loan products and terms.",
        "Real-Time Risk Monitoring: Continuous analysis of borrower behavior and external factors will enable real-time risk assessments, ensuring institutions stay ahead of potential issues.",
        "Seamless Integration with Ecosystems: AI platforms will integrate with broader financial ecosystems, creating unified experiences for borrowers and lenders alike."
      ]
    },
    {
      "title": "Conclusion: Beyond Decisioning",
      "paragraphs": [
        "The traditional view of AI in lending as merely a decisioning tool underestimates its transformative potential. AI is reshaping the industry, not just by improving workflows but by fundamentally redefining what’s possible in borrower engagement, risk management, and operational efficiency.",
        "This isn’t just about faster processes or smarter decisions; it’s about creating a lending ecosystem that’s inclusive, empathetic, and adaptive. Institutions that embrace AI’s comprehensive capabilities will not only meet but exceed borrower expectations, setting new standards for trust and innovation in the financial world.",
        "The question isn’t if AI will transform lending but how far institutions are willing to go to harness its full potential. With AI as a partner, the journey from complexity to simplicity, from fragmentation to seamlessness, is well within reach."
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
          text="Beyond Decisioning: AI's Comprehensive Role in Lending
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
            <div className="flex  md:flex-row gap-[16px] items-center">
              <div className=" object-cover">
                              <Image
                                src="/section_images/blog/pra.jpg"
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
                  <p>Apr 26, 2025</p>
                </div>
              </div>
            </div>
            <div className="flex gap-[8px]">
              <Image
                src="/section_images/blog/play.svg"
                width={24}
                height={24}
                alt=""
              />
              <Image
                src="/section_images/blog/share.svg"
                width={24}
                height={24}
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="pt-[35px]">
          <Image
            src="/section_images/blog/beyond.png"
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
            src="/section_images/blog/beyond.png"
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
