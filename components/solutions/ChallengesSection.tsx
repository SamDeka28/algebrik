"use client";
import Image from "next/image";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";

const ChallengesSection = () => {
  const cardData = [
    {
      title: "Streamlining Loan Processes",
      description:
        "Lengthy approval times and outdated workflows frustrate members and slow growth.",
      image: "/section_images/challenges_one.png",
    },
    {
      title: "Attracting the Next Generation",
      description:
        "Younger members expect digital-first, intuitive, and seamless experiences. Complex processes drive them away.",
      image: "/section_images/challenges_one.png",
    },
    {
      title: "Scaling Fast at Lower Costs",
      description:
        "Manual operations and siloed systems increase costs and hinder growth.",
      image: "/section_images/challenges_two.png",
    },
  ];

  return (
    <div className="flex flex-col gap-8 justify-center items-center p-6 md:p-10">
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
        {/* Left Column */}
        <div className="flex flex-col gap-6 lg:gap-10 w-full lg:w-1/2">
          {cardData.slice(0, 2).map((card, index) => (
            <div
              key={index}
              className={`relative flex justify-between p-6 rounded-[20px] shadow-[0_16px_52px_0px_rgba(10,64,108,0.1)] backdrop-blur-lg bg-white/60 border border-[#CAD3E0] w-full max-w-[558px] ${
                index === 0 ? "h-[246px]" : "h-[286px]"
              }`}
            >
              {/* Gradient applied to the entire card */}
              <div className="absolute w-52 h-52 -top-0 -right-0 bg-gradient-to-tr from-blue-100 to-green-50 -z-10 rounded-[24px] blur-xl" />
              <div className="flex flex-col items-center justify-center z-10">
                <h3 className="text-lg md:text-[24px] font-plus-jakarta text-[#2A5FAC] font-bold leading-6 md:leading-8">
                  {card.title}
                </h3>
                <p className="text-sm md:text-[16px] font-normal font-plus-jakarta text-[#292929] mt-2 leading-5 md:leading-6">
                  {card.description}
                </p>
              </div>
              <div className="relative w-full h-[230px] rounded-[24px] overflow-hidden mt-4">
                {/* Image inside the card */}
                <Image
                  src={card.image}
                  alt={card.title}
                  width={940}
                  height={515}
                  objectFit="cover"
                  className="rounded-[24px] w-[900px] h-full"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-center w-full lg:w-1/2">
          <div className="relative flex flex-col-reverse justify-between p-6 rounded-[20px] shadow-[0_16px_52px_0px_rgba(10,64,108,0.1)] backdrop-blur-lg bg-white/60 border border-[#CAD3E0] w-full max-w-[558px] h-[570px]">
            {/* Gradient applied to the entire card */}
            <div className="absolute w-80 h-96 -top-0 -right-0 bg-gradient-to-tr from-blue-100 to-green-50 -z-10 rounded-[24px] blur-xl" />
            <div className="flex flex-col mt-4 z-10">
              <h3 className="text-lg md:text-[24px] font-plus-jakarta text-[#2A5FAC] font-bold leading-6 md:leading-8">
                {cardData[2].title}
              </h3>
              <p className="text-sm md:text-[16px] font-normal font-plus-jakarta text-[#292929] mt-2 leading-5 md:leading-6">
                {cardData[2].description}
              </p>
            </div>
            <div className="relative w-full h-[200px] md:h-[370px] rounded-[24px] overflow-hidden mt-4">
              {/* Image inside the card */}
              <Image
                src={cardData[2].image}
                alt={cardData[2].title}
                width={700}
                height={600}
                objectFit="cover"
                className="rounded-[24px] w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengesSection;
