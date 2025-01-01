"use client";

import Image from "next/image";
import Link from "next/link";

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
    <div className="relative w-full max-w-[1160px] mx-auto bg-[#043071] rounded-[24px] py-8 px-6">

      <div className="absolute inset-0 text-white opacity-10 text-[200px] font-extrabold leading-none z-0">
        algebrik
      </div>

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

            <div className="flex flex-1 justify-center items-center p-6">
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
              <div className="ml-6 md:w-[507px] flex flex-col justify-between">
                <h6 className="text-gray-500 text-sm font-bold uppercase mb-2">
                  News
                </h6>
                <p className="text-gray-900 font-bold text-[20px] mb-4">
                  {article.title}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {article.description}
                </p>
                <p className="text-gray-400 text-sm font-bold">
                  {article.source}
                </p>
              </div>
            </div>

            <div className="bg-white h-[54px] rounded-b-[20px] flex items-center justify-center">
              <Link
                href="#"
                className="text-[#1A69DC] font-semibold text-sm"
              >
                Read More →
              </Link>
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
