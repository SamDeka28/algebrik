"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const newsArticles = [
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
      description:"Algebrik AI, the world's first cloud-native, AI-powered Loan Origination Platform (LOS), has announced a bureau integration partnership with Equifax®, a global data, analytics, and technology company ",
      link: "/resource-center/algebrik-ai-partners-with-equifax-to-power-smarter-fairer-and-faster-loan-decisions/",
      image: "/section_images/blog/teamalgebrik.webp",
    },
    {
      title:
        "Algebrik AI Joins the Jack Henry™ Vendor Integration Program",
        description:"NEW YORK--(BUSINESS WIRE)--Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City, pioneering the world's first cloud-native, AI-powered, digital era Loan Origination System (LOS), today announced that it has joined the Jack Henry™ Vendor Integration Program (VIP).",
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
        "Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City, pioneering the world's first cloud-native and AI-powered digital era Loan Origination Platform, today announced that it has...",
      source: "Fintech Futures",
      image: "/section_images/blog/ff.webp",
      link: "https://www.fintechfutures.com/2024/09/scienaptic-ai-co-founder-steps-down-to-launch-new-venture-algebrik-ai/"
    },
    {
      title:
        "Algebrik AI Secures $4M in Series A to Disrupt the Global Loan Origination Software Market",
      description:
        "Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City, pioneering the world's first cloud-native and AI-powered digital era Loan Origination Platform, today announced that it has...",
      source: "BusinessWire",
      image: "/section_images/blog/b.webp",
      link: "https://www.businesswire.com/news/home/20241104357477/en/Algebrik-AI-Secures-4M-in-Series-A-to-Disrupt-the-Global-Loan-Origination-Software-Market"
    },
    {
      title:
      "Algebrik AI Expands Founding Leadership Team with the Appointment of Jesse Frugé as VP of Product Management",
      description:
        "Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City, pioneering the world's first cloud-native and AI-powered digital era Loan Origination Platform, today announced that it has...",
      source: "Yahoo Finance",
      image: "/section_images/blog/ya.webp",
      link: "https://finance.yahoo.com/news/algebrik-ai-expands-founding-leadership-120000953.html"
    },
    {
      title:
      "Algebrik AI Strengthens Founding Leadership with Appointment of Andrea Silvers as VP of Business Development & Partnerships",
      description:
        "Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City, pioneering the world's first cloud-native and AI-powered digital era Loan Origination Platform, today announced that it has...",
      source: "BusinessWire",
      image: "/section_images/blog/b.webp",
      link: "https://www.businesswire.com/news/home/20241005942200/en/Algebrik-AI-Strengthens-Founding-Leadership-with-Appointment-of-Andrea-Silvers-as-VP-of-Business-Development-Partnerships"
    },
    {
      title:
      "Algebrik AI: $4 Million (Series A) Raised To Advance Cloud-Native Loan Origination Platform",
      description:
        "Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City, pioneering the world's first cloud-native and AI-powered digital era Loan Origination Platform, today announced that it has...",
      source: "Pulse 2.0",
      image: "/section_images/blog/p.webp",
      link: "https://pulse2.com/algebrik-ai-4-million-series-a-raised-to-advance-cloud-native-loan-origination-platform/amp/"
    },
    {
      title:
      "Algebrik AI Announces Visionary Advisory Board to Transform the Future of Lending",
      description:
        "Pioneering the Future of Lending - This is a monumental step forward for Algebrik AI and the financial institutions we serve, said Pankaj Jain, Founder and CEO...",
      source: "BusinessWire",
      image: "/section_images/blog/b.webp",
      link: "https://www.businesswire.com/news/home/20250114864538/en/Algebrik-AI-Announces-Visionary-Advisory-Board-to-Transform-the-Future-of-Lending"
    },
  
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsArticles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsArticles.length) % newsArticles.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentSlide]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div className="relative w-full font-plus-jakarta max-w-[1160px] mx-auto bg-[#043071] rounded-none md:rounded-[24px] mt-[60px] md:mt-0 md:my-[88px] py-[40px] px-6 lg:px-[40px]">
      <div className="relative z-10">
        <h2 className="text-white text-[32px] font-bold mb-2">In the News</h2>
        <p className="text-white text-[16px]">
          Follow our trail as we make waves in the lending space!
        </p>
      </div>

      {/* Carousel Container */}
      <div 
        className="relative z-10 mt-6 overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Arrow Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-0 lg:left-2 top-1/2 transform -translate-y-1/2 z-30 bg-white hover:bg-gray-100 text-[#043071] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border-2 border-white"
          aria-label="Previous slide"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 lg:right-2 top-1/2 transform -translate-y-1/2 z-30 bg-white hover:bg-gray-100 text-[#043071] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border-2 border-white"
          aria-label="Next slide"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Slides Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex gap-4"
            >
              {/* Main Card */}
              <div className="w-full flex-shrink-0">
                <div className="w-full h-auto md:h-[428px] bg-white rounded-[20px] shadow-md flex flex-col">
                  <div className="flex flex-col md:flex-row flex-1 justify-center items-start p-6">
                    <div className="md:w-[273px] h-[153px] md:h-[380px] mb-5 md:mb-0 bg-white rounded-lg overflow-hidden flex items-center justify-center">
                      <Image
                        src={newsArticles[currentSlide].image}
                        alt={`News ${currentSlide}`}
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
                      <Link href={newsArticles[currentSlide].link} passHref target="_blank">
                        <p className="text-black text-[20px] font-bold leading-[30px] mb-4 hover:text-[#043071] transition-colors">
                          {newsArticles[currentSlide].title}
                        </p>
                      </Link>
                      <p className="text-gray-600 text-[16px] leading-[30px] mb-4">
                        {newsArticles[currentSlide].description}
                      </p>
                      <p className="text-black text-[30px] font-bold">
                        {newsArticles[currentSlide].source}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Card Preview */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="w-[250px] md:w-[350px] flex-shrink-0 h-auto md:h-[428px] bg-white/90 backdrop-blur-sm rounded-[20px] shadow-md flex flex-col transform scale-90"
              >
                <div className="flex flex-col md:flex-row flex-1 justify-center items-start p-3 md:p-4">
                  <div className="md:w-[150px] h-[100px] md:h-[200px] mb-3 md:mb-0 bg-white rounded-lg overflow-hidden flex items-center justify-center">
                    <Image
                      src={newsArticles[(currentSlide + 1) % newsArticles.length].image}
                      alt={`Next News ${(currentSlide + 1) % newsArticles.length}`}
                      className="object-contain w-full h-full"
                      width={150}
                      height={200}
                      quality={100}
                    />
                  </div>
                  <div className="md:ml-3 md:w-[200px] flex flex-col justify-between gap-[8px]">
                    <h6 className="text-gray-500 text-[10px] font-bold tracking-[2px] uppercase mb-1">
                      News
                    </h6>
                    <Link href={newsArticles[(currentSlide + 1) % newsArticles.length].link} passHref target="_blank">
                      <p className="text-black text-[14px] font-bold leading-[18px] mb-2 hover:text-[#043071] transition-colors line-clamp-2">
                        {newsArticles[(currentSlide + 1) % newsArticles.length].title}
                      </p>
                    </Link>
                    <p className="text-gray-600 text-[12px] leading-[16px] mb-2 line-clamp-2">
                      {newsArticles[(currentSlide + 1) % newsArticles.length].description}
                    </p>
                    <p className="text-black text-[18px] font-bold">
                      {newsArticles[(currentSlide + 1) % newsArticles.length].source}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        {/* <div className="flex justify-center mt-6 space-x-2">
          {newsArticles.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}
