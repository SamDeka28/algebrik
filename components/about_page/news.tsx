"use client";

import Image from "next/image";
// import Link from "next/link";

export default function NewsSection() {
  const newsArticles = [
    {
      title:
        "Algebrik AI Secures $4M in Series A to Disrupt the Global Loan Origination Software Market",
      description:
        "Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City, pioneering the world’s first cloud-native and AI-powered digital era Loan Origination Platform, today announced that it has...",
      source: "BusinessWire",
      image: "/place.png",
    },
    {
      title:
        "Algebrik AI Secures $4M in Series A to Disrupt the Global Loan Origination Software Market",
      description:
        "Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City, pioneering the world’s first cloud-native and AI-powered digital era Loan Origination Platform, today announced that it has...",
      source: "BusinessWire",
      image: "/place.png",
    },
    {
      title:
        "Algebrik AI Secures $4M in Series A to Disrupt the Global Loan Origination Software Market",
      description:
        "Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City, pioneering the world’s first cloud-native and AI-powered digital era Loan Origination Platform, today announced that it has...",
      source: "BusinessWire",
      image: "/place.png",
    },
    {
      title:
        "Algebrik AI Secures $4M in Series A to Disrupt the Global Loan Origination Software Market",
      description:
        "Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City, pioneering the world’s first cloud-native and AI-powered digital era Loan Origination Platform, today announced that it has...",
      source: "BusinessWire",
      image: "/place.png",
    },
  ];

  return (
    <div className="relative w-full font-plus-jakarta max-w-[1160px] mx-auto bg-[#043071] rounded-[24px] my-[88px] py-[40px] px-[40px]">


      <div className="relative z-10">
        <h2 className="text-white text-[32px] font-bold mb-2">In the News</h2>
        <p className="text-white text-[16px]">
          Follow our trail as we make waves in the lending space!
        </p>
      </div>


      <div className="relative z-10 mt-6 flex gap-4 overflow-x-auto custom-scrollbar">
        {newsArticles.map((article, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[852px] h-[428px] bg-white rounded-[20px] shadow-md flex flex-col"
          >

            <div className="flex flex-1 justify-center items-start p-6">
              <div className="w-[273px] h-[380px] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src={article.image}
                  alt={`News ${index}`}
                  className="object-cover w-full h-full"
                  width={273}
                  height={280}
                  quality={100}
                />
              </div>
              <div className="ml-6 md:w-[507px] flex flex-col justify-between gap-[16px]">
                <h6 className="text-gray-500 text-[14px] font-bold tracking-[4px] uppercase mb-2">
                  News
                </h6>
                <p className="text-gray-900 font-bold text-[20px] mb-4">
                  {article.title}
                </p>
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
