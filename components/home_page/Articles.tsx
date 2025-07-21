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
      description:"Algebrik AI Inc. today announced a strategic partnership with Kinective, a leading provider of digital connectivity, document workflow, and core integration solutions for the banking sector.",
      link: "https://finance.yahoo.com/news/algebrik-ai-kinective-partner-streamline-120300510.html?guccounter=1",
      image: "/section_images/blog/ya.webp",
    },
    {
      title:
        "Algebrik AI Partners with TruStage™ to Offer Embedded Lending Protection Products Through the Loan Origination Journey",
      author: "PR Newswire",
      source: "Yahoo Finance",
      role: "Marketing",
      description:"AAlgebrik AI, a Delaware-incorporated company headquartered in New York City, pioneering the world's first cloud-native, AI-powered, digital era Loan Origination System (LOS), today announced a partnership with TruStage™, a financially strong insurance and financial services provider.",
      link: "https://finance.yahoo.com/news/algebrik-ai-partners-trustage-offer-130200023.html",
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
      source: "Team Algebrik",
      role: "Marketing",
      link: "/resource-center/algebrik-ai-and-conductiv-elevate-lending-with-permissioned-data-automated-stipulations-and-smarter-underwriting",
      image: "/section_images/blog/teamalgebrik.webp",
    },
    {
      title:
        "Algebrik AI Partners with Carleton to Elevate Lending Accuracy and Compliance",
      author: "BusinessWire",
      source: "BusinessWire",
      role: "Marketing",
      link: "https://www.businesswire.com/news/home/20250210537797/en/Algebrik-AI-Partners-with-Carleton-to-Elevate-Lending-Accuracy-and-Compliance",
      image: "/section_images/blog/b.webp",
    },
    {
      title:
        "Algebrik AI and Corelation Announce Integration Agreement to Enhance Personalization, Drive Financial Inclusion & Improve Member Experience ",
      author: "BusinessWire",
      source: "BusinessWire",
      role: "Marketing",
      link: "https://www.businesswire.com/news/home/20250218309763/en/Algebrik-AI-and-Corelation-Announce-Integration-Agreement-to-Enhance-Personalization-Drive-Financial-Inclusion-Improve-Member-Experience",
      image: "/section_images/blog/b.webp",
    },
    {
      title:
        "Algebrik AI and Plaid Join Forces to Simplify Loan Approvals with Smarter, Faster Data Connectivity ",
      author: "BusinessWire",
      source: "BusinessWire",
      role: "Marketing",
      link: "https://www.businesswire.com/news/home/20250203122111/en/Algebrik-AI-and-Plaid-Join-Forces-to-Simplify-Loan-Approvals-with-Smarter-Faster-Data-Connectivity",
      // image: "/section_images/blog/b.webp",
    },
    {
      title:
        "Algebrik AI Partners with Auto Exam to Seamlessly Deliver Auto Loan Protection Solutions",
      author: "Prateek Samantaray",
      role: "Marketing",
      source: "BusinessWire",
      link: "https://www.businesswire.com/news/home/20250127285961/en/Algebrik-AI-Partners-with-Auto-Exam-to-Seamlessly-Deliver-Auto-Loan-Protection-Solutions"
    },
    {
      title:
        "OTTOMOTO® Partners with Algebrik AI to Enhance Embedded Lending with AI-Driven Insights",
      author: "Prateek Samantaray",
      role: "Marketing",
      source: "BusinessWire",
      link: "https://www.businesswire.com/news/home/20250121584404/en/OTTOMOTO"
    },
    {
      title:
        "Scienaptic AI co-founder steps down to launch new venture, Algebrik AI",
      author: "Prateek Samantaray",
      role: "Marketing",
      source: "Fintech Futures",
      link: "https://www.fintechfutures.com/2024/09/scienaptic-ai-co-founder-steps-down-to-launch-new-venture-algebrik-ai/",
    },
    {
      title: "Algebrik AI Secures $4M in Series A to Disrupt the Global Loan Origination Software Market",
      author: "Prateek Samantaray",
      role: "Marketing",
      source: "BusinessWire",
      link: "https://www.businesswire.com/news/home/20241104357477/en/Algebrik-AI-Secures-4M-in-Series-A-to-Disrupt-the-Global-Loan-Origination-Software-Market",
    },
    {
      title: "Algebrik AI Expands Founding Leadership Team with the Appointment of Jesse Frugé as VP of Product Management",
      author: "Prateek Samantaray",
      role: "Marketing",
      source: "BusinessWire",
      link: "https://finance.yahoo.com/news/algebrik-ai-expands-founding-leadership-120000953.html",
    },
    {
      title: "Algebrik AI: $4 Million (Series A) Raised To Advance Cloud-Native Loan Origination Platform",
      author: "Prateek Samantaray",
      role: "Marketing",
      source: "Pulse 2.0",
      link: "https://pulse2.com/algebrik-ai-4-million-series-a-raised-to-advance-cloud-native-loan-origination-platform/amp/",
    },
    {
      title: "Algebrik AI Strengthens Founding Leadership with Appointment of Andrea Silvers as VP of Business Development & Partnerships",
      author: "Prateek Samantaray",
      role: "Marketing",
      source: "BusinessWire",
      link: "https://www.businesswire.com/news/home/20241005942200/en/Algebrik-AI-Strengthens-Founding-Leadership-with-Appointment-of-Andrea-Silvers-as-VP-of-Business-Development-Partnerships",
    },
    {
      title:
        "Algebrik AI Announces Visionary Advisory Board to Transform the Future of Lending",
      author: "Prateek Samantaray",
      role: "Marketing",
      source: "BusinessWire",
      link: "https://www.businesswire.com/news/home/20250114864538/en/Algebrik-AI-Announces-Visionary-Advisory-Board-to-Transform-the-Future-of-Lending"
    },

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
