"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { blogContent } from "../constant/blogs";
import Link from "next/link";
import { WEBINARS } from "../constant/webinars";

type CarouselItem = {
  header: string;
  cardTitle: string;
  title: string;
  description: string;
  source: string;
  image: string;
  url: string;
  target: string;
};

const carouselData: CarouselItem[] = [
  {
    header: "Blogs",
    cardTitle: "BLOG",
    title: "From Suggestions to Action: How Credit Unions Are Putting Agentic Al to Work",
    description: "This blog explores how real credit unions are using Agentic Al in the field today, what makes it different from generative Al, and how you can start spotting real action-not just marketing fluff. ",
    image: "/section_images/blog-agents.png",
    source: "Prateek Samantaray",
    url: "/resource-center/how-credit-unions-are-putting-agentic-ai-to-work",
    target: "_self"
  },
  {
    header: "Webinar",
    cardTitle: "WEBINAR",
    title: "Revolutionizing Lending with AI: Case Studies of Success",
    description:
      "Learn how companies are leveraging Algebrik AI's platform to streamline loan origination processes, increase efficiency, and drive results in the financial sector.",
    source: "BusinessWire",
    image: "/section_images/place.webp",
    url: "",
    target: "_self",
  },
  {
    header: "News Center",
    cardTitle: "NEWS CENTER",
    title: "United Financial Credit Union Selects AlgebrikAI's Comprehensive Consumer Lending Suite, Algebrik One ",
    description:
      "Explore the latest updates and news stories about Algebrik AI and its impact on the global financial technology industry.",
    source: "PR Newswire",
    image: "/section_images/blog/ya.webp",
    url: "https://www.prnewswire.com/news-releases/united-financial-credit-union-selects-algebrikais-comprehensive-consumer-lending-suite-algebrik-one-302504296.html?tc=eml_cleartime",
    target: "_blank",
  },
  {
    header: "Insights",
    cardTitle: "ONE PAGER",
    title: "Key Insights on Algebrik AI: A Quick Overview",
    description:
      "A concise summary of Algebrik AI's innovative platform, highlighting its features, benefits, and market potential.",
    source: "BusinessWire",
    image: "/section_images/place.webp",
    url: "",
    target: "_self",
  },
  {
    header: "Tools",
    cardTitle: "TOOLS",
    title: "Algebrik AI's Loan Origination Platform: A Comprehensive Guide",
    description:
      "A detailed overview of Algebrik AI's loan origination platform, including its features, benefits, and how it can help financial institutions streamline their loan processes.",
    source: "BusinessWire",
    image: "/section_images/place.webp",
    url: "",
    target: "_self",
  },
];

const newsArticles = [
  {
    title:
      "United Financial Credit Union Selects AlgebrikAI's Comprehensive Consumer Lending Suite, Algebrik One",
    author: "PR Newswire",
    source: "PR Newswire",
    role: "Marketing",
    description: "Algebrik AI, a Delaware-incorporated company headquartered in New York City, pioneering the world's first cloud-native, AI-powered, digital era Loan Origination System (LOS) built for credit unions, today announced that United Financial Credit Union...",
    link: "https://finance.yahoo.com/news/algebrik-ai-partners-trustage-offer-130200023.html",
    image: "/section_images/blog/ya.webp",
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

// Tools data for the Tools tab
const toolsData = [
  {
    image: '/icons/roi.webp',
    title: "Discover Your ROI Gain",
    description: 'Switch to Algebrik AI to boost returns, reduce risk, and transform lending.',
    buttonText: 'Check your ROI',
    buttonLink: '/roi-calculator',
  },
  {
    image: '/icons/healthcheck.webp',
    title: 'Is your Lending Stack a burden?',
    description: 'Don’t Build on a Broken Stack, take a moment to assess the health of your lending stack.',
    buttonText: 'Assess Now',
    buttonLink: '/lending-health-check',
  },
];

function isFuture(dateStr: string) {
  // Accepts '7 Aug, 2025' or '7 Feb,2025' (with or without space)
  const d = new Date(Date.parse(dateStr.replace(/(\d{1,2}) ([A-Za-z]+),? ?(\d{4})/, '$1 $2 $3')));
  return d.getTime() > Date.now();
}

function isPast(dateStr: string) {
  const d = new Date(Date.parse(dateStr.replace(/(\d{1,2}) ([A-Za-z]+),? ?(\d{4})/, '$1 $2 $3')));
  return d.getTime() <= Date.now();
}

export default function BlogCarousel() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [videoModal, setVideoModal] = useState<{ open: boolean, url?: string }>({ open: false });

  const handleHeaderClick = (index: number) => {
    setCurrentIndex(index);
  };

  let currentSlide = carouselData[currentIndex];


  return (
    <div className="container mx-auto p-3 flex flex-col gap-[56px] font-plus-jakarta justify-center items-center relative pb-24">
      <img src="/background_images/ml-single.svg" className="absolute left-0 -translate-x-1/2 translate-y-1/2 bottom-0 z-0" />

      <div className="container px-2 py-[4px] bg-[#EAEDF3] flex justify-between items-center rounded-[36px] drop-shadow-[0_0_60px_0_rgba(0, 0, 0, 0.08)]  md:w-[700px] md:h-[56px]">
        {carouselData.map((item, index: number) => (
          <button
            key={index}
            onClick={() => handleHeaderClick(index)}
            className={`rounded-md font-plus-jakarta font-medium w-[160px] h-[40px] md:w-[168px] md:h-[40px] ${currentIndex === index
              ? "!rounded-3xl text-[12px] md:text-[16px] bg-gradient-to-r from-[#1C8DEA] to-[#195BD7] drop-shadow-[0_4px_44px_0_rgba(0, 0, 0, 0.08)] p-1   text-white"
              : "text-black text-[12px] md:text-[16px]"
              }`}
          >
            {item.header}
          </button>
        ))}
      </div>

      {/* Webinar Tab */}
      {currentIndex === 1 && (
        <div className="w-full flex flex-col items-center gap-12">
          {/* Upcoming Webinar Banner */}
          {(() => {
            const upcoming = WEBINARS.filter(w => isFuture(w.eventDate));
            const past = WEBINARS.filter(w => isPast(w.eventDate));
            const next = upcoming.length > 0 ? upcoming[0] : null;
            return (
              <>
                {next && (
                  <div
                    className="w-full max-w-[1160px] rounded-[32px] gap-6 flex flex-col md:flex-row items-center shadow-lg overflow-hidden relative bg-[#FFFFFFE5] border-[#CFE3FF] border-[2px]"
                    style={{ 
                      // background: 'radial-gradient(104.17% 277.39% at 50% -153.34%, #7EB2FF 0%, #043071 85%)'
                    }}
                  >
                    <img src="/background_images/ml-single.svg" className="absolute right-0 z-0 rotate-180" />
                    <div className="flex-1 flex items-end mt-[110px] justify-center">
                      <img src={next.image} alt={next.title} className="rounded-2xl object-cover w-full scale-110" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2 text-white p-5 md:p-10">
                      <div className="uppercase tracking-[30%] text-xs font-semibold opacity-80 mb-1 text-[#005FB5]">Upcoming Webinar</div>
                      <div className="text-2xl md:text-3xl font-bold leading-tight mb-2 text-[#292929]">{next.title}</div>
                      {/* <div className="text-base font-medium mb-2">{next.eventDate}</div> */}
                      <Link href={next.link} target="_blank">
                        <button className="bg-white text-[#fff] bg-gradient-to-r from-[#1C8DEA] to-[#195BD7] font-semibold rounded-full px-6 py-2 mt-2 shadow hover:bg-[#195BD7] hover:text-white border border-white transition-all">Register Now</button>
                      </Link>
                    </div>
                  </div>
                )}
                {/* Previously Section */}
                <div className="w-full max-w-[1160px] mt-12">
                  <div className="bg-[#DDE6F8] rounded-xl px-6 py-3 text-xl font-bold text-[#000000] mb-6 text-center">Previously</div>
                  <div className="flex flex-col gap-8 border border-[#D5D5D5] rounded-2xl p-6 bg-white">
                    {past.length === 0 && <div className="col-span-2 text-center text-[#606060]">No past webinars yet.</div>}
                    {past.map((w, idx) => {
                      // YouTube thumbnail logic
                      let thumb = w.youtube
                        ? `https://img.youtube.com/vi/${w.youtube.split("/").pop()?.split("?")[0]}/maxresdefault.jpg`
                        : w.image;

                      return (
                        <div key={w.title + idx} className="flex flex-col md:flex-row gap-6 items-start">
                          <div className="flex-1 bg-[#F2F2F2] rounded-lg flex items-center justify-center border border-dashed border-[#B0B8C1] cursor-pointer group relative"
                            onClick={() => w.youtube && setVideoModal({ open: true, url: w.youtube })}
                          >
                            {w.youtube ? (
                              <>
                                <img src={thumb} alt={w.title} className="object-cover rounded-lg w-full h-full max-h-[220px]" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
                                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="32" cy="32" r="32" fill="#fff" fillOpacity="0.8" />
                                    <polygon points="26,20 48,32 26,44" fill="#195BD7" />
                                  </svg>
                                </div>
                              </>
                            ) : (
                              <img src={w.image} alt={w.title} className="object-contain rounded-lg w-full h-full max-h-[220px]" />
                            )}
                          </div>
                          <div className="flex-1 flex flex-col justify-start gap-1">
                            <div className="font-bold text-3xl text-[#222] leading-tight">{w.title}</div>
                            <div className="text-[#606060] text-sm mb-1">{w.eventDate}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Video Modal */}
                  {videoModal.open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                      <div className="bg-white rounded-lg shadow-lg p-4 relative max-w-2xl w-full">
                        <button className="absolute top-2 right-2 text-2xl font-bold text-gray-700 hover:text-red-500" onClick={() => setVideoModal({ open: false })}>&times;</button>
                        <div className="aspect-w-16 aspect-h-9 w-full">
                          <iframe
                            src={videoModal.url}
                            title="Webinar Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-[360px] rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </div>
      )}
      {/** main blog */}

      {currentIndex == 0 &&
        <div>
          <motion.div
            className="bg-white p-[24px] border border-[#D5D5D5] md:w-[1160px] md:h-[428px] rounded-[20px] flex flex-col md:flex-row items-start justify-between gap-[24px] backdrop-blur-[28.68px] shadow-[0px_20px_36px_0_rgba(10, 64, 108, 0.1)]"
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div>
              <Image
                src={currentSlide.image}
                alt={`Image for ${currentSlide.header}`}
                width={551}
                height={380}
                className="md:w-[551px] md:h-[380px] rounded-lg object-cover"
              />
            </div>
            <div className="md:w-[507px] pt-2 flex flex-col gap-[16px] justify-center">
              <h3 className=" text-[14px] text-black/35 font-plus-jakarta tracking-widest font-bold">
                {currentSlide.cardTitle}
              </h3>
              <Link
                href={currentSlide.url} target={currentSlide.target}>
                <h3 className="cursor-pointer text-[20px] text-[#606060] font-bold font-plus-jakarta leading-[28.13px]">
                  {currentSlide.title}
                </h3>
              </Link>

              <p className="text-[16px] font-normal font-plus-jakarta text-[#606060] leading-[30px]">
                {currentSlide.description}
              </p>
              <p className="text-[30px] font-bold font-plus-jakarta text-black leading-[30px]">
                {currentSlide.source}
              </p>
            </div>
          </motion.div>
        </div>
      }
      {/**News main blog */}
      {currentIndex == 2 &&
        <div>
          <motion.div
            className="bg-white p-[24px] border border-[#D5D5D5] md:w-[1160px] md:h-[428px] rounded-[20px] flex flex-col md:flex-row items-start justify-between gap-[24px] backdrop-blur-[28.68px] shadow-[0px_20px_36px_0_rgba(10, 64, 108, 0.1)]"
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div>
              <Image
                src={newsArticles[0].image}
                alt={`Image for ${newsArticles[0].title}`}
                width={551}
                height={380}
                className="md:w-[551px] md:h-[380px] rounded-lg object-contain"
              />
            </div>
            <div className="md:w-[507px] pt-2 flex flex-col gap-[16px] justify-center">
              <h3 className=" text-[14px] text-black/35 font-plus-jakarta tracking-widest font-bold">
                NEWS
              </h3>
              <Link
                href={newsArticles[0].link} target={"_blank"}>
                <h3 className="cursor-pointer text-[20px] text-[#606060] font-bold font-plus-jakarta leading-[28.13px]">
                  {newsArticles[0].title}
                </h3>
              </Link>

              <p className="text-[16px] font-normal font-plus-jakarta text-[#606060] leading-[30px]">
                {newsArticles[0].description}
              </p>
              <p className="text-[30px] font-bold font-plus-jakarta text-black leading-[30px]">
                {newsArticles[0].source}
              </p>
            </div>
          </motion.div>
        </div>
      }

      <section className="container mx-auto max-w-[1160px] py-[10px] rounded-[36px] ">


        {/* News */}
        <div className="flex flex-col items-center justify-center font-plus-jakarta relative">
          {currentIndex == 2 &&
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 content-between gap-9">
              {newsArticles.map((article, index) => (
                <div
                  key={index}
                  className="bg-white border  max-w-[360px] h-[428px] text-gray-900 rounded-[20px] shadow p-6 relative flex flex-col"
                >
                  <div className="flex flex-col flex-grow">
                    <div className="h-[269px]">
                      <h6 className="text-gray-400 tracking-widest text-[14px] font-bold uppercase mb-2">
                        News
                      </h6>
                      <p className="font-bold mb-4 text-[20px]">
                        {article.title}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Image
                        src={article.image}
                        alt={`Image of ${article.author}`}
                        width={60}
                        height={60}
                        className="object-cover rounded-full"
                        quality={100}
                      />
                      <div className="flex flex-col justify-center pl-3">
                        <p className="text-[#333333] text-[18px] font-extrabold">
                          {article.author}
                        </p>
                        {/* <p className="text-gray-600 text-[12px]">{article.role}</p> */}
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 flex justify-center w-full bg-white text-center py-3 h-[54px] rounded-b-[20px]">
                    <Link
                      href={article.link}
                      className="text-[#1A69DC] font-semibold" target="_blank"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}

            </div>
          }


          {/* Blog */}
          {currentIndex == 0 &&
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 content-between gap-9 ">
              {blogContent.map((blog, index) => (
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
                    <Link
                      href={`/resource-center/${blog.blogSubtitle
                        .toLowerCase()
                        .replace(/ /g, "-")}`}
                      className="text-[#1A69DC] font-semibold" target="_blank"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          }

          {/* Tools */}
          {currentIndex == 4 &&
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 content-between gap-9  mb-24">
              {toolsData.map((tool, index) => (
                <div
                  key={index}
                  className="bg-white max-w-[520px] text-gray-900 rounded-[20px] shadow p-4 flex flex-row gap-6"
                >
                  <Image
                    src={tool.image}
                    alt={""}
                    width={120}
                    height={120}
                    className="object-cover  bg-gray-100 rounded-lg"
                  />
                  <div className="flex flex-col flex-1 gap-2 h-full">
                    <h3 className="text-[22px] font-bold text-[#2A5FAC]">{tool.title}</h3>
                    <p className="text-[15px] text-[#606060]">{tool.description}</p>
                    <Link href={tool.buttonLink} target="_blank">
                      <button className="border border-[#2A5FAC] text-[#2A5FAC] rounded-full px-6 py-2 font-medium hover:bg-[#2A5FAC] hover:text-white transition-all">
                        {tool.buttonText}
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          }


          {[ 3].includes(currentIndex) &&

            <h2 className="text-black text-[56px] text-center font-plus-jakarta mb-24 font-bold">Just around the corner</h2>


          }
        </div>
      </section>
    </div>
  );
}
