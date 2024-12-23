import Card from "../card/Card";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";

const cardData = [
  {
    title: "AI-Driven automation",
    description: "Automate repetitive tasks, reduce errors, and accelerate loan approvals with advanced AI capabilities",
  },
  {
    title: "Smarter Decisioning",
    description: "Leverage real-time insights and confidence scoring to make faster, more informed lending decisions",
  },
  {
    title: "Omnichannel Experience",
    description: "Offer borrowers a seamless, unified experience across mobile, web, and in-branch",
  },
  {
    title: "Scalable & Secure",
    description: "Built on a robust cloud-native architecture to grow with your business and ensure data integrity",
  },
];

const ModernLender = () => {
  return (
    <div
      className="relative mx-auto p-4 md:p-8 flex flex-col justify-center items-center gap-8 mb-28 mt-16"
      style={{
        backgroundImage: "url('/background_images/modern_lender.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundPositionY: "150px",
      }}
    >
      <div className="container flex flex-col justify-center items-center text-center gap-5">
        <CustomHeader className="text-[48px]" text="Built for the Modern Lender" />
        <CustomSubtitle
          className="px-64 text-[20px]"
          text="The platform that empowers lenders of every type with unmatched speed, precision, and scalability."
        />
      </div>

      <div className="flex gap-[24.42px] w-full justify-center relative mt-[42px]">
        <div className="grid grid-rows-2 md:grid-rows-1 gap-[24px]">
          {cardData.slice(0, 2).map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              customStyles={{
                width: "444.58px",
                height: "327.46px",
                container: "flex flex-col item-end justify-end bg-white",
                title: "flex items-start justify-start text-[#2A5FAC] text-[24px] font-bold !important",
                description: "text-[#292929] text-[16px] font-normal !important",
              }}
            />
          ))}
        </div>

        <div className="grid grid-rows-2 md:grid-rows-1 gap-[24px] transform translate-y-[13%]">
          {cardData.slice(2, 4).map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              customStyles={{
                width: "444.58px",
                height: "327.46px",
                container: "flex flex-col item-end justify-end bg-white",
                title: "flex items-start justify-start text-[#2A5FAC] text-[24px] font-bold !important",
                description: "text-[#292929] text-[16px] font-normal !important",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernLender;
