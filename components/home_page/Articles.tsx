// import Image from "next/image";
// import evan from "@/public/icons/evan-gerdisch.webp";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Articles() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (container) {
      container.dataset.isDragging = "true";
      container.dataset.startX = event.pageX.toString();
      container.dataset.scrollLeft = container.scrollLeft.toString();
      container.style.cursor = "grabbing";
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (container && container.dataset.isDragging === "true") {
      const dx = event.pageX - parseFloat(container.dataset.startX!);
      container.scrollLeft = parseFloat(container.dataset.scrollLeft!) - dx;
    }
  };

  const handleMouseUp = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.dataset.isDragging = "false";
      container.style.cursor = "grab";
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollSpeed = 1;
    const scrollInterval = setInterval(() => {
      if (container.dataset.isDragging === "true") return;
      container.scrollLeft += scrollSpeed;
      if (
        container.scrollLeft + container.offsetWidth >= container.scrollWidth
      ) {
        container.scrollLeft = 0;
      }
    }, 20);

    return () => clearInterval(scrollInterval);
  }, []);

  const newsArticles = [
    {
      title:"Algebrik AI Partners with Scienaptic AI to Power Inclusive Decisioning in Loan Origination",
      author: "PR Newswire",
      source:"PR Newswire",
      role:"Marketing",
      description:"Algebrik AI today announced a strategic partnership with Scienaptic AI, a leading provider of AI-powered lending solutions for credit unions.",
      link:"https://finance.yahoo.com/news/algebrik-ai-partners-scienaptic-ai-132700269.html",
      image:"/section_images/blog/ya.webp"
    },
    {
      title:"Algebrik AI and Housetable Announce Strategic Partnership and Advisory Engagement",
      author: "The Credit Union Connection",
      source:"The Credit Union Connection",
      role:"Marketing",
      description:"Algebrik AI today announced a strategic partnership with Housetable, a fast-growing platform dedicated to digital renovation lending.",
      link:"https://thecreditunionconnection.com/algebrik-ai-and-housetable-announce-strategic-partnership-and-advisory-engagement/",
      image:"https://thecreditunionconnection.com/wp-content/uploads/2024/10/37B7B312-4939-45D4-9CE0-B07F18E21853-2.jpeg"
    },
    {
      title:"Algebrik AI Partners with Spinwheel to Streamline Debt Data & Payments in Loan Origination",
      author: "PR Newswire",
      source:"PR Newswire",
      role:"Marketing",
      description:"Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City and pioneering the world's first cloud-native, AI-powered, digital-era Loan Origination Platform (LOS), today announces a strategic partnership with Spinwheel, a leading...",
      link:"https://www.prnewswire.com/news-releases/algebrik-ai-partners-with-spinwheel-to-streamline-debt-data--payments-in-loan-origination-302509571.html",
      image:"/section_images/blog/prnewswire.jpg"
    },
    {
      title:"Family Financial Credit Union Chooses Algebrik AI's End-to-End Digital Lending Suite: Algebrik ONE; to Enter into the New Era of Agentic AI-Powered Lending",
      author: "PR Newswire",
      source:"PR Newswire",
      role:"Marketing",
      description:"Algebrik AI, a Delaware-incorporated company headquartered in New York City, pioneering the world's first cloud-native, AI-powered, digital-era Loan Origination System (LOS) built for credit unions, today announced that Family Financial Credit Union...",
      link:"https://www.prnewswire.com/news-releases/family-financial-credit-union-chooses-algebrik-ais-end-to-end-digital-lending-suite-algebrik-one-to-enter-into-the-new-era-of-agentic-ai-powered-lending-302520713.html",
      image:"/section_images/blog/prnewswire.jpg"
    },
    {
      title:"Algebrik AI and Open Lending Partner to Expand Intelligent Auto Loan Decisioning for Credit Unions",
      author: "PR Newswire",
      source:"PR Newswire",
      role:"Marketing",
      description:"Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City and pioneering the world's first cloud-native, AI-powered, digital-era Loan Origination Platform (LOS), today announced an integration with Open Lending Corporation...",
      link:"https://www.prnewswire.com/news-releases/algebrik-ai-and-open-lending-partner-to-expand-intelligent-auto-loan-decisioning-for-credit-unions-302526459.html",
      image:"/section_images/blog/prnewswire.jpg"
    },
    {
      title:
        "United Financial Credit Union Selects AlgebrikAI's Comprehensive Consumer Lending Suite, Algebrik One",
      author: "PR Newswire",
      source: "PR Newswire",
      role: "Marketing",
      description: "Algebrik AI, a Delaware-incorporated company headquartered in New York City, pioneering the world's first cloud-native, AI-powered, digital era Loan Origination System (LOS) built for credit unions, today announced that United Financial Credit Union...",
      link: "https://www.prnewswire.com/news-releases/united-financial-credit-union-selects-algebrikais-comprehensive-consumer-lending-suite-algebrik-one-302504296.html?tc=eml_cleartime",
      image: "/section_images/blog/prnewswire.jpg",
    },
    {
      title:
        "Algebrik AI and Kinective Partner to Streamline Lending from Application to Signature",
      author: "PR Newswire",
      source: "Yahoo Finance",
      role: "Marketing",
      description: "Algebrik AI Inc. today announced a strategic partnership with Kinective, a leading provider of digital connectivity, document workflow, and core integration solutions for the banking sector.",
      link: "https://finance.yahoo.com/news/algebrik-ai-kinective-partner-streamline-120300510.html?guccounter=1",
      image: "/section_images/blog/ya.webp",
    },
    {
      title:
        "Algebrik AI Partners with TruStage™ to Offer Embedded Lending Protection Products Through the Loan Origination Journey",
      author: "PR Newswire",
      source: "Yahoo Finance",
      role: "Marketing",
      description: "AAlgebrik AI, a Delaware-incorporated company headquartered in New York City, pioneering the world's first cloud-native, AI-powered, digital era Loan Origination System (LOS), today announced a partnership with TruStage™, a financially strong insurance and financial services provider.",
      link: "https://www.prnewswire.com/news-releases/united-financial-credit-union-selects-algebrikais-comprehensive-consumer-lending-suite-algebrik-one-302504296.html?tc=eml_cleartime",
      image: "/section_images/blog/ya.webp",
    },
    {
      title:
        "Algebrik AI Partners with Equifax® to Power Smarter, Fairer, and Faster Loan Decisions",
      author: "Team Algebrik",
      source: "Team Algebrik",
      role: "Marketing",
      description: "Algebrik AI, the world’s first cloud-native, AI-powered Loan Origination Platform (LOS), has announced a bureau integration partnership with Equifax®, a global data, analytics, and technology company ",
      link: "/resource-center/algebrik-ai-partners-with-equifax-to-power-smarter-fairer-and-faster-loan-decisions/",
      image: "/section_images/blog/teamalgebrik.webp",
    },
    {
      title:
        "Algebrik AI Joins the Jack Henry™ Vendor Integration Program",
      author: "BusinessWire",
      source: "BusinessWire",
      role: "Marketing",
      link: "https://www.businesswire.com/news/home/20250310636612/en/Algebrik-AI-Joins-the-Jack-Henry-Vendor-Integration-Program",
      image: "/section_images/blog/b.webp",
    },
    {
      title:
        "Algebrik AI and Conductiv Elevate Lending with Permissioned Data, Automated Stipulations, and Smarter Underwriting",
      author: "Team Algebrik",
      role: "Marketing",
      link: "/resource-center/algebrik-ai-and-conductiv-elevate-lending-with-permissioned-data-automated-stipulations-and-smarter-underwriting",
      image: "/section_images/blog/teamalgebrik.webp",
    },
    {
      title:
        "Algebrik AI Partners with Carleton to Elevate Lending Accuracy and Compliance",
      author: "BusinessWire",
      role: "Marketing",
      link: "https://www.businesswire.com/news/home/20250210537797/en/Algebrik-AI-Partners-with-Carleton-to-Elevate-Lending-Accuracy-and-Compliance",
      image: "/section_images/blog/b.webp",
    },
    {
      title:
        "Algebrik AI and Corelation Announce Integration Agreement to Enhance Personalization, Drive Financial Inclusion & Improve Member Experience ",
      author: "BusinessWire",
      role: "Marketing",
      link: "https://www.businesswire.com/news/home/20250218309763/en/Algebrik-AI-and-Corelation-Announce-Integration-Agreement-to-Enhance-Personalization-Drive-Financial-Inclusion-Improve-Member-Experience",
      image: "/section_images/blog/b.webp",
    },
    {
      title:
        "Algebrik AI and Plaid Join Forces to Simplify Loan Approvals with Smarter, Faster Data Connectivity ",
      author: "BusinessWire",
      role: "Marketing",
      link: "https://www.businesswire.com/news/home/20250203122111/en/Algebrik-AI-and-Plaid-Join-Forces-to-Simplify-Loan-Approvals-with-Smarter-Faster-Data-Connectivity",
      image: "/section_images/blog/b.webp",
    },
    {
      title:
        "Scienaptic AI co-founder steps down to launch new venture, Algebrik AI",
      author: "Fintech Futures",
      role: "Marketing",
      link: "https://www.fintechfutures.com/2024/09/scienaptic-ai-co-founder-steps-down-to-launch-new-venture-algebrik-ai/",
      image: "/section_images/blog/ff.webp",
    },
    {
      title:
        "Algebrik AI Secures $4M in Series A to Disrupt the Global Loan Origination Software Market",
      author: "BusinessWire",
      role: "Marketing",
      link: "https://www.businesswire.com/news/home/20241104357477/en/Algebrik-AI-Secures-4M-in-Series-A-to-Disrupt-the-Global-Loan-Origination-Software-Market",
      image: "/section_images/blog/b.webp",
    },
    {
      title:
        "Algebrik AI Expands Founding Leadership Team with the Appointment of Jesse Frugé as VP of Product Management",
      author: "Yahoo Finance",
      role: "Marketing",
      link: "https://finance.yahoo.com/news/algebrik-ai-expands-founding-leadership-120000953.html",
      image: "/section_images/blog/t.webp",
    },
    {
      title:
        "Algebrik AI Strengthens Founding Leadership with Appointment of Andrea Silvers as VP of Business Development & Partnerships",
      author: "BusinessWire",
      role: "Marketing",
      link: "https://www.businesswire.com/news/home/20241005942200/en/Algebrik-AI-Strengthens-Founding-Leadership-with-Appointment-of-Andrea-Silvers-as-VP-of-Business-Development-Partnerships",
      image: "/section_images/blog/b.webp",
    },
    {
      title:
        "Algebrik AI: $4 Million (Series A) Raised To Advance Cloud-Native Loan Origination Platform",
      author: "Pulse 2.0",
      role: "Marketing",
      link: "https://pulse2.com/algebrik-ai-4-million-series-a-raised-to-advance-cloud-native-loan-origination-platform/amp/",
      image: "/section_images/blog/p.webp",
    },
  
  
    {
      title:
        "Algebrik AI Announces Visionary Advisory Board to Transform the Future of Lending",
      author: "BusinessWire",
      role: "Marketing",
      image: "/section_images/blog/b.webp",
      link: "https://www.businesswire.com/news/home/20250114864538/en/Algebrik-AI-Announces-Visionary-Advisory-Board-to-Transform-the-Future-of-Lending"
    },
    {
      title:
        "Algebrik AI Partners with Auto Exam to Seamlessly Deliver Auto Loan Protection Solutions",
      author: "BusinessWire",
      role: "Marketing",
      image: "/section_images/blog/b.webp",
      link: "https://www.businesswire.com/news/home/20250127285961/en/Algebrik-AI-Partners-with-Auto-Exam-to-Seamlessly-Deliver-Auto-Loan-Protection-Solutions"
    },
    {
      title:
        "OTTOMOTO® Partners with Algebrik AI to Enhance Embedded Lending with AI-Driven Insights",
      author: "BusinessWire",
      role: "Marketing",
      image: "/section_images/blog/b.webp",
      link: "https://www.businesswire.com/news/home/20250121584404/en/OTTOMOTO"
    }
  ];

  return (
    <div
      className="container mx-auto max-w-[1160px] md:h-[717px] py-[40px] px-6 rounded-none md:rounded-[36px] mt-10"
      style={{
        background:
          "radial-gradient(ellipse at right, var(--tw-gradient-stops))",
        backgroundColor: "#7EB2FF",
        backgroundImage: "radial-gradient(ellipse at right, #7EB2FF, #043071)",
      }}
    >
      <h2 className="text-center text-[28px] md:text-[32px] font-plus-jakarta font-bold mt-[10px] mb-[40px] text-white">
        Check out the latest from the Originations Hub
      </h2>
      <div
        ref={scrollContainerRef}
        className="flex gap-[20px] md:gap-[32px] py-4 pl-[0px] md:pl-[40px] overflow-x-scroll"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        style={{
          cursor: "grab",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style jsx global>{`
          ::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {newsArticles.map((article, index) => (
          <div
            key={index}
            className="min-w-[360px] bg-slate-100 max-w-[360px] h-full md:h-[428px] text-gray-900 rounded-[20px] shadow p-6 relative flex flex-col"
          >
            <div className="flex flex-col flex-grow">
              <div className="h-[269px]">
                <h6 className="text-start text-gray-400 tracking-widest text-[14px] font-bold font-plus-jakarta uppercase">
                  news
                </h6>
                <p className="font-bold mb-4 text-[20px] font-plus-jakarta">
                  {article.title}
                </p>
              </div>
              <div className="flex">
                {/* <Image
                  src={evan}
                  alt={`News ${index}`}
                  className="object-cover w-[60px] h-[60px]"
                  quality={100}
                />
                <div className="flex flex-col justify-center p-2">
                  <p className="text-[#333333] font-plus-jakarta text-[14px] font-extrabold leading-[20px]">
                    {article.author}
                  </p>
                  <p className="text-gray-600 text-[12px] font-plus-jakarta font-normal leading-[20px]">
                    {article.role}
                  </p> 
                </div> */}
                <p className="text-[30px] font-bold font-plus-jakarta text-black leading-[30px]">
                  {article.source}
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 flex justify-center w-full bg-white text-center py-3 h-[54px] rounded-b-[20px]">
              <Link
                href={article.link}
                className="text-[#1A69DC] font-plus-jakarta font-semibold"
                target="_blank"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center my-[40px]">
        <Link href="/resource-center" target="_blank">
          <button className="bg-white rounded-[32px] text-[#1A69DC] px-16 font-plus-jakarta border-[#195BD7] py-3 font-bold">
            View More
          </button>
        </Link>
      </div>
    </div>
  );
}
