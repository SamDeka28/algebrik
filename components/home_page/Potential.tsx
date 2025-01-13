"use client";

import Image from "next/image";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const PercentageCard = ({
  title,
  percentage,
}: {
  title: string;
  percentage: number;
}) => {
  const [currentPercentage, setCurrentPercentage] = useState<number | null>(
    null
  );
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
      className="flex flex-col items-center justify-end rounded-[10px] pt-3 max-w-[237px] max-h-[118px] gap-[8px]"
    >
      <p className="text-[44px] font-bold font-plus-jakarta text-white">
        {currentPercentage !== null ? `${currentPercentage}%` : "0%"}
      </p>
      <h3 className="text-[18px] font-normal text-center leading-[30px] font-plus-jakarta text-white">
        {title}
      </h3>
    </div>
  );
};

export default function Potential() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  // const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  // const isDesktop = useMediaQuery({ minWidth: 1025 });

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
        title: "Exceptional Experiences",
        description:
          "Delight borrowers with seamless onboarding, real-time updates, and simplified agreements.",
        image: "/section_images/exceptional.png",
      },
    ],
    percentageData: [
      {
        title: "Increase in Application to Funding Conversion",
        percentage: 300,
      },
      { title: "Decrease in Approval Time", percentage: 90 },
      { title: "Decrease in Time to Launch New Products", percentage: 90 },
      { title: "Increase in Borrower Application Completion", percentage: 30 },
    ],
  };

  return (
    <div className="container mx-0 md:mx-auto  md:p-8 mt-5 flex flex-col gap-12">
      <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto px-8 md:px-36">
        <CustomHeader text="Unlock Limitless Potential with Algebrik" />
        <CustomSubtitle text="Deliver faster approvals, smarter decisions, and exceptional borrower experiences with a platform designed to transform lending operations." />
      </div>

      <div className="relative flex flex-row md:flex-wrap justify-center gap-6 p-0 md:p-6">
        <div className="md:container md:relative opacity-[30%] z-[-1]">
          <motion.div
            className="absolute top-20 md:left-[296px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full md:w-[861.73px] md:h-[239.68px] blur-[100px]"
            animate={{
              y: [0, -50, 50, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-20 md:left-[20px] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full md:w-[796.91px] md:h-[280.03px] blur-[100px] -z-10"
            animate={{
              y: [0, -60, 60, 0],
              rotate: [0, -15, 15, 0],
              scale: [1, 1.07, 1],
            }}
            transition={{
              duration: 4,
              delay: 0.3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-56 bg-[#BE95FF] rounded-full md:w-[1226.24px] md:h-[239.68px] blur-[100px] z-[-1]"
            animate={{
              y: [0, -70, 70, 0],
              rotate: [0, 20, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              delay: 0.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="hidden md:flex flex-row md:flex-wrap justify-center gap-6 overflow-x-auto md:overflow-visible">
  {data.cardData.map((card, index) => (
    <div
      key={index}
      className="relative backdrop-brightness-110 bg-white/30 rounded-[32px] shadow-2xl w-[338px] md:w-[365px] h-[426px] md:h-[426px] flex flex-col items-center justify-start transform transition-transform duration-300 hover:scale-105"
    >
      <div className="mb-4">
        <Image
          src={card.image}
          alt={card.title}
          className={`object-contain rounded-md ${
            isMobile ? "w-[306px] h-[300px]" : "w-[433px] h-[236px]"
          }`}
          width={isMobile ? 306 : 433}
          height={isMobile ? 300 : 236}
          quality={100}
        />
      </div>
      <h3 className="text-[#2A5FAC] text-[20px] md:text-[24px] font-plus-jakarta text-center font-bold mb-3 px-2">
        {card.title}
      </h3>
      <p className="text-[#606060] text-[14px] text-center font-plus-jakarta px-2">
        {card.description}
      </p>
    </div>
  ))}
</div>

<div className="flex md:hidden  overflow-x-auto pb-4">
  <div className="flex flex-nowrap gap-[16px] md:gap-[30px]">
    {data.cardData.map((card, index) => (
      <div
        key={index}
        className="relative p-4 backdrop-brightness-110 bg-white/30 rounded-[32px] shadow-md w-[300px] h-auto flex flex-col items-center justify-start transform transition-transform duration-300 hover:scale-105"
      >
        <div className="mb-4">
          <Image
            src={card.image}
            alt={card.title}
            className="object-contain rounded-md w-full h-[200px]"
            width={300}
            height={250}
            quality={100}
          />
        </div>
        <h3 className="text-[#2A5FAC] text-[18px] font-plus-jakarta text-center font-bold mb-3 px-2">
          {card.title}
        </h3>
        <p className="text-[#606060] text-[12px] text-center font-plus-jakarta px-2">
          {card.description}
        </p>
      </div>
    ))}
  </div>
</div>



      </div>

      <div
        className={`container hidden md:flex ${
          isMobile
            ? "flex-col items-center text-center gap-8"
            : "items-baseline justify-center flex-wrap gap-16"
        } mt-[47px] text-white`}
        style={{
          backgroundImage: "url('/section_images/percent.png')",
          backgroundSize: isMobile ? "contain" : "cover",
          backgroundPosition: "center",
          borderRadius: "32px",
          width: isMobile ? "90%" : "1160px",
          height: isMobile ? "500px" : "162px",
          alignSelf: "center",
          padding: isMobile ? "16px" : "0",
        }}
      >
        {data.percentageData.map((item, index) => (
          <PercentageCard
            key={index}
            title={item.title}
            percentage={item.percentage}
          />
        ))}
      </div>
    </div>
  );
}
