"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { blogContent } from "../constant/blogs";
import Link from "next/link";

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
    title:
      "Beyond Decisioning: AI's Comprehensive Role in Lending",
    description:
      "\"The success of any financial system lies in its ability to adapt and serve its people,\" once said Mervyn King, former....",
    source: "Prateek Samantaray   ",
    image: "/section_images/blog/beyond.png",
    url: "/resource_center/beyond_decisioning",
    target: "_self",
  },
  {
    header: "Case Studies",
    cardTitle: "CASE STUDY",
    title: "Revolutionizing Lending with AI: Case Studies of Success",
    description:
      "Learn how companies are leveraging Algebrik AI's platform to streamline loan origination processes, increase efficiency, and drive results in the financial sector.",
    source: "BusinessWire",
    image: "/section_images/place.png",
    url: "",
    target: "_self",
  },
  {
    header: "News Center",
    cardTitle: "NEWS CENTER",
    title: "Algebrik AI and Plaid Join Forces to Simplify Loan Approvals with Smarter, Faster Data Connectivity ",
    description:
      "Explore the latest updates and news stories about Algebrik AI and its impact on the global financial technology industry.",
    source: "BusinessWire",
    image: "/section_images/blog/bw.png",
    url: "https://www.businesswire.com/news/home/20250203122111/en/Algebrik-AI-and-Plaid-Join-Forces-to-Simplify-Loan-Approvals-with-Smarter-Faster-Data-Connectivity",
    target: "_blank",
  },
  {
    header: "One Pagers",
    cardTitle: "ONE PAGER",
    title: "Key Insights on Algebrik AI: A Quick Overview",
    description:
      "A concise summary of Algebrik AI's innovative platform, highlighting its features, benefits, and market potential.",
    source: "BusinessWire",
    image: "/section_images/place.png",
    url: "",
    target: "_self",
  },
];

const newsArticles = [
  {
    title:
      "Algebrik AI and Conductiv Elevate Lending with Permissioned Data, Automated Stipulations, and Smarter Underwriting",
    author: "Team Algebrik",
    role: "Marketing",
    link: "/resource_center/algebrik-ai-and-conductiv-elevate-lending-with-permissioned-data-automated-stipulations-and-smarter-underwriting",
    image: "/section_images/blog/teamalgebrik.png",
  },
  {
    title:
      "Algebrik AI Partners with Carleton to Elevate Lending Accuracy and Compliance",
    author: "BusinessWire",
    role: "Marketing",
    link: "https://www.businesswire.com/news/home/20250210537797/en/Algebrik-AI-Partners-with-Carleton-to-Elevate-Lending-Accuracy-and-Compliance",
    image: "/section_images/blog/b.png",
  },
  {
    title:
      "Algebrik AI and Corelation Announce Integration Agreement to Enhance Personalization, Drive Financial Inclusion & Improve Member Experience ",
    author: "BusinessWire",
    role: "Marketing",
    link: "https://www.businesswire.com/news/home/20250218309763/en/Algebrik-AI-and-Corelation-Announce-Integration-Agreement-to-Enhance-Personalization-Drive-Financial-Inclusion-Improve-Member-Experience",
    image: "/section_images/blog/b.png",
  },
  {
    title:
      "Algebrik AI and Plaid Join Forces to Simplify Loan Approvals with Smarter, Faster Data Connectivity ",
    author: "BusinessWire",
    role: "Marketing",
    link: "https://www.businesswire.com/news/home/20250203122111/en/Algebrik-AI-and-Plaid-Join-Forces-to-Simplify-Loan-Approvals-with-Smarter-Faster-Data-Connectivity",
    image: "/section_images/blog/b.png",
  },
  {
    title:
      "Scienaptic AI co-founder steps down to launch new venture, Algebrik AI",
    author: "Fintech Futures",
    role: "Marketing",
    link: "https://www.fintechfutures.com/2024/09/scienaptic-ai-co-founder-steps-down-to-launch-new-venture-algebrik-ai/",
    image: "/section_images/blog/ff.jpg",
  },
  {
    title:
      "Algebrik AI Secures $4M in Series A to Disrupt the Global Loan Origination Software Market",
    author: "BusinessWire",
    role: "Marketing",
    link: "https://www.businesswire.com/news/home/20241104357477/en/Algebrik-AI-Secures-4M-in-Series-A-to-Disrupt-the-Global-Loan-Origination-Software-Market",
    image: "/section_images/blog/b.png",
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
    image: "/section_images/blog/b.png",
  },
  {
    title:
      "Algebrik AI: $4 Million (Series A) Raised To Advance Cloud-Native Loan Origination Platform",
    author: "Pulse 2.0",
    role: "Marketing",
    link: "https://pulse2.com/algebrik-ai-4-million-series-a-raised-to-advance-cloud-native-loan-origination-platform/amp/",
    image: "/section_images/blog/p.jpg",
  },


  {
    title:
      "Algebrik AI Announces Visionary Advisory Board to Transform the Future of Lending",
    author: "BusinessWire",
    role: "Marketing",
    image: "/section_images/blog/b.png",
    link: "https://www.businesswire.com/news/home/20250114864538/en/Algebrik-AI-Announces-Visionary-Advisory-Board-to-Transform-the-Future-of-Lending"
  },
  {
    title:
      "Algebrik AI Partners with Auto Exam to Seamlessly Deliver Auto Loan Protection Solutions",
    author: "BusinessWire",
    role: "Marketing",
    image: "/section_images/blog/b.png",
    link: "https://www.businesswire.com/news/home/20250127285961/en/Algebrik-AI-Partners-with-Auto-Exam-to-Seamlessly-Deliver-Auto-Loan-Protection-Solutions"
  },
  {
    title:
      "OTTOMOTO® Partners with Algebrik AI to Enhance Embedded Lending with AI-Driven Insights",
    author: "BusinessWire",
    role: "Marketing",
    image: "/section_images/blog/b.png",
    link: "https://www.businesswire.com/news/home/20250121584404/en/OTTOMOTO"
  }
];

export default function BlogCarousel() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleHeaderClick = (index: number) => {
    setCurrentIndex(index);
  };

  const currentSlide = carouselData[currentIndex];

  return (
    <div className="container mx-auto p-8 flex flex-col gap-[56px] font-plus-jakarta justify-center items-center">
      <div className="container px-[25px] py-[4px] bg-[#EAEDF3] flex justify-between items-center rounded-[36px] drop-shadow-[0_0_60px_0_rgba(0, 0, 0, 0.08)]  md:w-[700px] md:h-[56px]">
        {carouselData.map((item, index: number) => (
          <button
            key={index}
            onClick={() => handleHeaderClick(index)}
            className={`rounded-md font-plus-jakarta font-medium ${currentIndex === index
                ? "!rounded-3xl text-[12px] md:text-[16px] bg-gradient-to-r from-[#1C8DEA] to-[#195BD7] drop-shadow-[0_4px_44px_0_rgba(0, 0, 0, 0.08)] p-1 w-[80px] h-[40px] md:w-[168px] md:h-[40px]  text-white"
                : "text-black text-[12px] md:text-[16px]"
              }`}
          >
            {item.header}
          </button>
        ))}
      </div>
      {[0, 2].includes(currentIndex) &&
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
      <section className="container mx-auto max-w-[1160px] py-[10px] rounded-[36px] ">


        {/* News */}
        <div className="flex flex-col items-center justify-center font-plus-jakarta">
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
                      href={`/resource_center/${blog.blogSubtitle
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


          {[1, 3].includes(currentIndex) &&

            <h2 className="text-black text-[56px] text-center font-plus-jakarta mb-24 font-bold">Just around the corner</h2>


          }
        </div>
      </section>
    </div>
  );
}
