"use client";

import Image from "next/image";
import Link from "next/link";
// import Link from "next/link";

export default function NewsSection() {
  const newsArticles = [
    {
      title:
        "Algebrik AI Partners with Equifax® to Power Smarter, Fairer, and Faster Loan Decisions",
      author: "Team Algebrik",
      source: "Team Algebrik",
      role: "Marketing",
      description:"Algebrik AI, the world’s first cloud-native, AI-powered Loan Origination Platform (LOS), has announced a bureau integration partnership with Equifax®, a global data, analytics, and technology company ",
      link: "/resource-center/algebrik-ai-partners-with-equifax-to-power-smarter-fairer-and-faster-loan-decisions/",
      image: "/section_images/blog/teamalgebrik.webp",
    },
    {
      title:
        "Algebrik AI Joins the Jack Henry™ Vendor Integration Program",
        description:"NEW YORK--(BUSINESS WIRE)--Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City, pioneering the world’s first cloud-native, AI-powered, digital era Loan Origination System (LOS), today announced that it has joined the Jack Henry™ Vendor Integration Program (VIP).",
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
      description:"Algebrik AI Inc., today announced a strategic partnership with Conductiv, a leader in providing digital stipulations via permissioned data and AI. ",
      link: "/resource-center/algebrik-ai-and-conductiv-elevate-lending-with-permissioned-data-automated-stipulations-and-smarter-underwriting",
      image: "/section_images/blog/teamalgebrik.webp",
    },
    {
      title:
        "Algebrik AI Partners with Carleton to Elevate Lending Accuracy and Compliance",
        source: "BusinessWire",
      role: "Marketing",
      description:"NEW YORK--(BUSINESS WIRE)--Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City, pioneering the world's 1st cloud-native, AI-powered, digital-era Loan Origination Platform (LOS), today announced a strategic partnership with Carleton, Inc.",
      link: "https://www.businesswire.com/news/home/20250210537797/en/Algebrik-AI-Partners-with-Carleton-to-Elevate-Lending-Accuracy-and-Compliance",
      image: "/section_images/blog/b.webp",
    },
    {
      title:
        "Algebrik AI and Corelation Announce Integration Agreement to Enhance Personalization, Drive Financial Inclusion & Improve Member Experience ",
      source: "BusinessWire",
      role: "Marketing",
      description:"Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City, pioneering the world's 1st cloud-native, AI-powered, digital-era Loan Origination Platform (LOS), today announced an integration agreement with Corelation",
      link: "https://www.businesswire.com/news/home/20250218309763/en/Algebrik-AI-and-Corelation-Announce-Integration-Agreement-to-Enhance-Personalization-Drive-Financial-Inclusion-Improve-Member-Experience",
      image: "/section_images/blog/b.webp",
    },
    {
      title:
        "Algebrik AI and Plaid Join Forces to Simplify Loan Approvals with Smarter, Faster Data Connectivity ",
      source: "BusinessWire",
      description:"NEW YORK--(BUSINESS WIRE)--Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City, pioneering the world's 1st cloud-native...",
            link: "https://www.businesswire.com/news/home/20250203122111/en/Algebrik-AI-and-Plaid-Join-Forces-to-Simplify-Loan-Approvals-with-Smarter-Faster-Data-Connectivity",
      image: "/section_images/blog/b.webp",
    },
    {
      title:
      "Algebrik AI Partners with Auto Exam to Seamlessly Deliver Auto Loan Protection Solutions",
      description:
        "Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City, pioneering the world's first cloud-native, AI-powered, digital-era Loan...",
      source: "BusinessWire",
      image: "/section_images/blog/b.webp",
      link: "https://www.businesswire.com/news/home/20250127285961/en/Algebrik-AI-Partners-with-Auto-Exam-to-Seamlessly-Deliver-Auto-Loan-Protection-Solutions"
    },
    {
      title:
      "OTTOMOTO® Partners with Algebrik AI to Enhance Embedded Lending with AI-Driven Insights",
      description:
        "OTTOMOTO®, the leading embedded lending platform revolutionizing how dealers and lenders collaborate across auto, RV, powersports, marine, and aircraft industries, is proud to announce...",
      source: "BusinessWire",
      image: "/section_images/blog/b.webp",
      link: "https://www.businesswire.com/news/home/20250121584404/en/OTTOMOTO"
    },
    {
      title:
      "Scienaptic AI co-founder steps down to launch new venture, Algebrik AI",
      description:
        "Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City, pioneering the world’s first cloud-native and AI-powered digital era Loan Origination Platform, today announced that it has...",
      source: "Fintech Futures",
      image: "/section_images/blog/ff.webp",
      link: "https://www.fintechfutures.com/2024/09/scienaptic-ai-co-founder-steps-down-to-launch-new-venture-algebrik-ai/"
    },
    {
      title:
        "Algebrik AI Secures $4M in Series A to Disrupt the Global Loan Origination Software Market",
      description:
        "Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City, pioneering the world’s first cloud-native and AI-powered digital era Loan Origination Platform, today announced that it has...",
      source: "BusinessWire",
      image: "/section_images/blog/b.webp",
      link: "https://www.businesswire.com/news/home/20241104357477/en/Algebrik-AI-Secures-4M-in-Series-A-to-Disrupt-the-Global-Loan-Origination-Software-Market"
    },
    {
      title:
      "Algebrik AI Expands Founding Leadership Team with the Appointment of Jesse Frugé as VP of Product Management",
      description:
        "Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City, pioneering the world’s first cloud-native and AI-powered digital era Loan Origination Platform, today announced that it has...",
      source: "Yahoo Finance",
      image: "/section_images/blog/ya.webp",
      link: "https://finance.yahoo.com/news/algebrik-ai-expands-founding-leadership-120000953.html"
    },
    {
      title:
      "Algebrik AI Strengthens Founding Leadership with Appointment of Andrea Silvers as VP of Business Development & Partnerships",
      description:
        "Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City, pioneering the world’s first cloud-native and AI-powered digital era Loan Origination Platform, today announced that it has...",
      source: "BusinessWire",
      image: "/section_images/blog/b.webp",
      link: "https://www.businesswire.com/news/home/20241005942200/en/Algebrik-AI-Strengthens-Founding-Leadership-with-Appointment-of-Andrea-Silvers-as-VP-of-Business-Development-Partnerships"
    },
    {
      title:
      "Algebrik AI: $4 Million (Series A) Raised To Advance Cloud-Native Loan Origination Platform",
      description:
        "Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City, pioneering the world’s first cloud-native and AI-powered digital era Loan Origination Platform, today announced that it has...",
      source: "Pulse 2.0",
      image: "/section_images/blog/p.webp",
      link: "https://pulse2.com/algebrik-ai-4-million-series-a-raised-to-advance-cloud-native-loan-origination-platform/amp/"
    },
    {
      title:
      "Algebrik AI Announces Visionary Advisory Board to Transform the Future of Lending",
      description:
        "Pioneering the Future of Lending - This is a monumental step forward for Algebrik AI and the financial institutions we serve,” said Pankaj Jain, Founder and CEO...",
      source: "BusinessWire",
      image: "/section_images/blog/b.webp",
      link: "https://www.businesswire.com/news/home/20250114864538/en/Algebrik-AI-Announces-Visionary-Advisory-Board-to-Transform-the-Future-of-Lending"
    },
  
  ];

  return (
    <div className="relative w-full font-plus-jakarta max-w-[1160px] mx-auto bg-[#043071] rounded-none md:rounded-[24px] mt-[60px] md:mt-0 md:my-[88px] py-[40px] px-[40px]">


      <div className="relative z-10">
        <h2 className="text-white text-[32px] font-bold mb-2">In the News</h2>
        <p className="text-white text-[16px]">
          Follow our trail as we make waves in the lending space!
        </p>
      </div>


      <div className="relative z-10 mt-6 flex gap-4 overflow-scroll overflow-x-auto custom-scrollbar">
        {newsArticles.map((article, index) => (
          <div
            key={index}
            className="w-[100%] flex-shrink-0  h-auto md:w-[852px] md:h-[428px] bg-white rounded-[20px] shadow-md flex flex-col"
          >

            <div className=" flex flex-col md:flex-row flex-1 justify-center items-start p-6">
              <div className=" md:w-[273px] h-[153px] md:h-[380px] mb-5 md:mb-0 bg-white rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src={article.image}
                  alt={`News ${index}`}
                  className="object-contain w-full h-full"
                  width={273}
                  height={280}
                  quality={100}
                />
              </div>
              <div className="md:ml-6 md:w-[507px] flex flex-col justify-between gap-[16px]">
                <h6 className="text-gray-500 text-[14px] font-bold tracking-[4px] uppercase mb-2">
                  News
                </h6>
                <Link href={article.link} passHref target="_blank">
                <p className="text-black text-[20px] font-bold leading-[30px] mb-4">
                  {article.title}
                </p>
                </Link>
                <p className="text-gray-600 text-[16px] leading-[30px] mb-4">
                  {article.description}
                </p>
                
                <p className="text-black text-[30px] font-bold">
                  {article.source}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
