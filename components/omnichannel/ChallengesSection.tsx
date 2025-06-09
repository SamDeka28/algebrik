"use client";

import Image from "next/image";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";

const ChallengesSection = () => {
  const cardData = [
    {
      title: "Streamlining Loan Processes",
      description:
        "Lengthy approval times and outdated workflows frustrate members and slow growth.",
        hoverDescription: "Automate workflows to approve loans in minutes, not days.",
      image: "/section_images/challenges_one.webp",
    },
    {
      title: "Attracting the Next Generation",
      description:
        "Younger members expect digital-first, intuitive, and seamless experiences. Complex processes drive them away.",
        hoverDescription: "Deliver seamless omnichannel interactions—mobile, web, and in-branch.",
      image: "/section_images/attract.webp",
    },
    {
      title: "Scaling Fast at Lower Costs",
      description:
        "Manual operations and siloed systems increase costs and hinder growth.",
        hoverDescription: "Optimize workflows with a cloud-native platform that scales with your credit union.",
      image: "/section_images/challenges_two.webp",
    },
  ];

  return (
    <div className="flex flex-col gap-8 justify-center items-center my-[48px] md:my-[10px] p-4 md:p-10">
      <div className="flex flex-col justify-center items-center text-center gap-[24px]">
        <CustomHeader
          className="text-2xl md:text-3xl lg:text-4xl font-bold"
          text="We understand your challenges"
        />
        <CustomSubtitle
          className="px-4 sm:px-16 md:px-32 lg:px-48 text-base md:text-lg lg:text-xl mb-10"
          text="Credit unions face unique obstacles in balancing member satisfaction and operational efficiency. Algebrik AI offers intelligent solutions to help you overcome them"
        />
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between items-center gap-6 lg:gap-10 w-full max-w-[1200px]">
        <div className="flex flex-col gap-6 lg:gap-10 w-full lg:w-1/2">
          {cardData.slice(0, 2).map((card, index) => (
            <div
              key={index}
              className={`relative cursor-pointer flex flex-col-reverse md:flex-row justify-between 
                p-6 rounded-[20px] shadow-[0_16px_52px_0px_rgba(10,64,108,0.1)] backdrop-blur-lg bg-white/60 
                border border-[#CAD3E0] w-full max-w-[558px] h-[441px] ${index === 0 ? "md:h-[246px]" : "md:h-[286px]"} group`}
            >
              <div className="absolute w-52 h-52 -top-0 -right-0 bg-gradient-to-tr from-blue-100 to-green-50 -z-10 rounded-[24px] blur-xl"></div>
              
              <div className="flex flex-col items-start md:items-center justify-center z-10">
                <h3 className="text-lg md:text-[24px] font-plus-jakarta text-[#2A5FAC] font-bold leading-6 md:leading-8">
                  {card.title}
                </h3>
                <p className="text-sm md:text-[16px] font-normal font-plus-jakarta text-[#292929] mt-2 leading-5 md:leading-6 relative">
                {card.description}
                <span className="absolute top-0 left-0 w-full h-full text-[#292929] bg-white/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {card.hoverDescription}
                </span>
              </p>
              </div>

              <div className="relative w-full md:w-[880px]  md:h-[234px] left-[22px] overflow-hidden mt-4 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={950}
                  height={515}
                  objectFit="cover"
                  className="rounded-br-lg w-[950px] h-full "
                  style={{
                    filter: "blur(38px) drop-shadow(0px 36px 36px rgba(0, 0, 0, 0.08))",
                    opacity: 0, 
                    transition: "opacity 0.5s ease, filter 0.5s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.filter = "none";
                    e.currentTarget.style.opacity = "1";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.filter =
                      "blur(28px) drop-shadow(0px 36px 36px rgba(0, 0, 0, 0.08))";
                    e.currentTarget.style.opacity = "0.5";
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex md:flex-col items-center w-full lg:w-1/2">
          <div className="relative cursor-pointer flex flex-col-reverse justify-between p-6 rounded-[20px] shadow-[0_16px_52px_0px_rgba(10,64,108,0.1)] backdrop-blur-lg bg-white/60 border border-[#CAD3E0] w-full max-w-[558px] h-[570px] group">
            <div className="absolute w-80 h-96 -top-0 -right-2 bg-gradient-to-tr from-blue-200 to-green-50 -z-10 rounded-[24px] blur-xl"></div>
            <div className="flex flex-col mt-4 z-10">
              <h3 className="text-lg md:text-[24px] font-plus-jakarta text-[#2A5FAC] font-bold leading-6 md:leading-8">
                {cardData[2].title}
              </h3>
              <p className="text-sm md:text-[16px] font-normal font-plus-jakarta text-[#292929] mt-2 leading-5 md:leading-6 relative">
                {cardData[2].description}
                <span className="absolute top-0 left-0 w-full h-full text-[#292929] bg-white/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {cardData[2].hoverDescription}
                </span>
              </p>
            </div>
            <div className="relative w-full h-[200px] md:h-[370px] rounded-[24px] overflow-hidden mt-4 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <Image
                src={cardData[2].image}
                alt={cardData[2].title}
                width={700}
                height={600}
                objectFit="cover"
                className="rounded-[24px] w-full h-full"
                style={{
                  filter: "blur(28px) drop-shadow(0px 36px 36px rgba(0, 0, 0, 0.08))",
                  opacity: 0,
                  transition: "opacity 0.5s ease, filter 0.5s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.filter = "none";
                  e.currentTarget.style.opacity = "1";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.filter =
                    "blur(28px) drop-shadow(0px 36px 36px rgba(0, 0, 0, 0.08))";
                  e.currentTarget.style.opacity = "0.5";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengesSection;
