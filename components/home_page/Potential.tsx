"use client";

import Image from "next/image";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import { useEffect, useRef, useState } from "react";

const PercentageCard = ({ title, percentage }: { title: string; percentage: number }) => {
  const [currentPercentage, setCurrentPercentage] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const duration = 1000;
    const step = Math.ceil((percentage / duration) * 16);

    const timer = setInterval(() => {
      start += step;
      if (start >= percentage) {
        setCurrentPercentage(percentage);
        clearInterval(timer);
      } else {
        setCurrentPercentage(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [percentage, hasAnimated]);

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center justify-center bg-white rounded-[10px] max-w-[237px] max-h-[118px] gap-[8px]"
    >
      <p className="text-[44px] font-bold font-plus-jakarta text-[#2A5FAC]">
        {currentPercentage !== null ? `${currentPercentage}%` : "0%"}
      </p>
      <h3 className="text-[20px] font-normal text-center leading-[30px] font-plus-jakarta text-[#606060]">
        {title}
      </h3>
    </div>
  );
};
export default function Potential() {
  const data = {
    cardData: [
      {
        image: "/section_images/faster.png",
        title: "Faster Loan Approvals",
        description:
          "Reduce processing times by automating workflows, enabling approvals in minutes instead of days",
      },
      {
        title: "Smarter Decision-Making",
        description:
          "Leverage AI-powered risk analysis and predictive insights to make precise, data-driven decisions",
        image: "/section_images/smart.png",
      },
      {
        title: "Exceptional Borrower Experiences",
        description:
          "Delight borrowers with seamless onboarding, real-time updates, and simplified agreements.",
        image: "/section_images/exceptional.png",
      },
    ],
    percentageData: [
      { title: "Increase in Application to Funding Conversion", percentage: 300 },
      { title: "Decrease in Approval Time", percentage: 90 },
      { title: "Decrease in Time to Launch New Products", percentage: 90 },
      { title: "Increase in Borrower Application Completion", percentage: 30 },
    ],
  };

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col gap-12">
      <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto px-8 md:px-36">
        <CustomHeader text="Unlock Limitless Potential with Algebrik" />
        <CustomSubtitle text="Deliver faster approvals, smarter decisions, and exceptional borrower experiences with a platform designed to transform lending operations." />
      </div>

      <div className="relative flex flex-wrap justify-center gap-6 p-6 ">
        {/* Background Gradient */}
        <div className="absolute drop-shadow-2xl backdrop-blur-xl w-3/4 h-2/6 blur-3xl inset-40 mx-auto my-auto bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-300 via-[#66B3B0] to-[#BE95FF]"></div>

        {data.cardData.map((card, index) => (
          <div
            key={index}
            className="relative backdrop-brightness-110 bg-white/30 rounded-[32px] shadow-2xl w-[365px] h-[426px] flex flex-col items-center justify-start"
          >
            <div className="mb-4">
              <Image
                src={card.image}
                alt={card.title}
                className="object-contain rounded-md"
                width={433}
                height={355}
                quality={100}
              />
            </div>
            <h3 className="text-[#2A5FAC] text-[24px] font-plus-jakarta text-center font-bold mb-3 px-2">{card.title}</h3>
            <p className="text-[#606060] text-[14px] text-center font-plus-jakarta px-2">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center flex-wrap mt-8 gap-16">
        {data.percentageData.map((item, index) => (
          <PercentageCard key={index} title={item.title} percentage={item.percentage} />
        ))}
      </div>

     
    </div>

    
  );
}