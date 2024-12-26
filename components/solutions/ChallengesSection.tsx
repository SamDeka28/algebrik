import Card from "../card/Card";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";

const ChallengesSection = () => {
  const cardData = [
    {
      title: "Streamlining Loan Processes",
      description:
        "Lengthy approval times and outdated workflows frustrate members and slow growth.",
      image: "/section_images/challenges_1.png",
      customStyles: {
        container: "relative flex flex-col md:flex-row justify-between",
        imageContainer:
          "relative inset-x-[24px] inset-y-[52px] -z-10 w-[200px] h-[150px] rounded-[24px] transition-all ease-in-out duration-300",
        title: "w-[246px] h-[68px]",
        description: "w-[246px] h-[90px] text-[16px]",
        width: "558px",
        height: "246px",
      },
    },
    {
      title: "Attracting the Next Generation",
      description:
        "Younger members expect digital-first, intuitive, and seamless experiences. Complex processes drive them away.",
      image: "/section_images/challenges_1.png",
      customStyles: {
        container:
          "flex flex-col-reverse md:flex-col-reverse justify-end items-center p-6 gap-4",
        imageContainer:
          "relative w-[200px] h-[150px] rounded-[24px] transition-all ease-in-out duration-300",
        width: "558.16px",
        height: "325.69px",
      },
    },
    {
      title: "Scaling Fast at Lower Costs",
      description:
        "Manual operations and siloed systems increase costs and hinder growth.",
      image: "/section_images/challenges_1.png",
      customStyles: {
        container:
          "flex flex-col-reverse md:flex-col-reverse justify-between items-end p-6 gap-4",
        imageContainer:
          "relative w-[200px] h-[150px] rounded-[24px] transition-all ease-in-out duration-300",
        width: "558.16px",
        height: "693px",
      },
      isLarge: true,
    },
  ];

  return (
    <div className="container flex flex-col gap-8 justify-center items-center p-10">
      <div className="container flex flex-col justify-center items-center text-center">
        <CustomHeader
          className="text-[48px]"
          text="We understand your challenges"
        />
        <CustomSubtitle
          className="px-48 text-[20px] mb-[70px]"
          text="Credit unions face unique obstacles in balancing member satisfaction and operational efficiency. Algebrik AI offers intelligent solutions to help you overcome them"
        />
      </div>

      <div className="flex flex-wrap justify-center items-start gap-[44px]">
        <div className="flex flex-col gap-[32px]">
          <Card
            title={cardData[0].title}
            description={cardData[0].description}
            imageSrc={cardData[0].image}
            customStyles={cardData[0].customStyles}
          />

          <Card
            title={cardData[1].title}
            description={cardData[1].description}
            imageSrc={cardData[1].image}
            customStyles={cardData[1].customStyles}
          />
        </div>

        <Card
          title={cardData[2].title}
          description={cardData[2].description}
          imageSrc={cardData[2].image}
          isLarge={cardData[2].isLarge}
          customStyles={cardData[2].customStyles}
        />
      </div>
    </div>
  );
};

export default ChallengesSection;