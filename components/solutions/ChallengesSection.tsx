import Image from "next/image";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";

const ChallengesSection = () => {
  const cardData = [
    {
      title: "Streamlining Loan Processes",
      description:
        "Lengthy approval times and outdated workflows frustrate members and slow growth.",
      image: "/section_images/challenges_1.png",
    },
    {
      title: "Attracting the Next Generation",
      description:
        "Younger members expect digital-first, intuitive, and seamless experiences. Complex processes drive them away.",
      image: "/section_images/challenges_1.png",
    },
    {
      title: "Scaling Fast at Lower Costs",
      description:
        "Manual operations and siloed systems increase costs and hinder growth.",
      image: "/section_images/challenges_1.png",
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

      <div className="flex flex-wrap justify-center items-start gap-6 lg:gap-10">
        <div className="flex flex-col gap-6">
          {/* First Card */}
          <div className="relative flex flex-col backdrop-blur-[5px] md:flex-row justify-between p-6 bg-white shadow-lg rounded-[20px] max-w-[558px] h-[246px] w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-[#66B3B0] to-[#149994] rounded-[20px] z-[-1] hidden"/>
            <div className="flex flex-col pr-10 justify-center">
              <h3 className="text-lg md:text-[24px] font-plus-jakarta text-[#2A5FAC] font-bold leading-6 md:leading-8">
                {cardData[0].title}
              </h3>
              <p className="text-sm md:text-[16px] pr-9 font-normal font-plus-jakarta text-[#292929] mt-2 leading-5 md:leading-6">
                {cardData[0].description}
              </p>
            </div>
            <div className="relative w-40 h-32 md:w-[328px] md:h-[242px] rounded-[24px] mt-4 md:mt-0 transition-opacity duration-300 opacity-50 hover:opacity-0">
              <Image
                src={cardData[0].image}
                alt={cardData[0].title}
                layout="fill"
                objectFit="cover"
                className="rounded-[24px]"
              />
            </div>
          </div>

          {/* Second Card */}
          <div className="relative flex flex-col md:flex-col justify-end items-end p-6 bg-white shadow-lg rounded-[20px] max-w-[558px] md:[325.69px] w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-[#66B3B0] to-[#149994] rounded-[20px] z-[-1]" />
            <div className="relative w-40 h-32 md:w-52 md:h-40 rounded-[20px] mt-4 md:mt-0 transition-opacity duration-300 opacity-50 hover:opacity-0">
              <Image
                src={cardData[1].image}
                alt={cardData[1].title}
                layout="fill"
                objectFit="cover"
                className="rounded-[24px]"
              />
            </div>
            <div className="text-left mt-4 md:mt-0">
              <h3 className="text-lg md:text-[24px] font-plus-jakarta text-[#2A5FAC] font-bold leading-6 md:leading-8">
                {cardData[1].title}
              </h3>
              <p className="text-sm md:text-[16px] font-normal font-plus-jakarta text-[#292929] mt-2 leading-5 md:leading-6">
                {cardData[1].description}
              </p>
            </div>
          </div>
        </div>

        {/* Third Card */}
        <div className="relative flex flex-col justify-between items-end p-6 bg-white shadow-lg rounded-[20px] max-w-[558px] h-[693px] w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-[#66B3B0] to-[#149994] rounded-[20px] z-[-1]" />
          <div className="relative w-40 h-32 md:w-52 md:h-40 rounded-[20px] transition-opacity duration-300 opacity-50 hover:opacity-0">
            <Image
              src={cardData[2].image}
              alt={cardData[2].title}
              layout="fill"
              objectFit="cover"
              className="rounded-[24px]"
            />
          </div>
          <div className="text-left mt-4 md:mt-0">
            <h3 className="text-lg md:text-[24px] font-plus-jakarta text-[#2A5FAC] font-bold leading-6 md:leading-8">
              {cardData[2].title}
            </h3>
            <p className="text-sm md:text-[16px] font-normal font-plus-jakarta text-[#292929] mt-2 leading-5 md:leading-6">
              {cardData[2].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengesSection;