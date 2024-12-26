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
        backgroundPosition: "center 150px",
      }}
    >
      <div className="container flex flex-col justify-center items-center text-center gap-5">
        <CustomHeader className="text-[48px]" text="Built for the Modern Lender" />
        <CustomSubtitle
          className="px-6 md:px-64 text-[20px]"
          text="The platform that empowers lenders of every type with unmatched speed, precision, and scalability."
        />
      </div>

      <div className="container relative md:w-full flex gap-[24.42px] justify-center mt-[42px]">
        {/* Background gradient ellipses */}
        <div className="relative opacity-[30%] z-[-1]">
          <div className="absolute top-24 md:left-[246px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full md:w-[668.64px] md:h-[542.11px] blur-3xl animate-fadeIn" />
          <div className="absolute top-36 md:left-[20px] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full md:w-[618.35px] md:h-[633.38px] blur-[228px] -z-10 animate-fadeIn delay-200" />
          <div className="absolute top-48 md:bottom-[10px] bg-[#BE95FF] rounded-full md:w-[951.48px] md:h-[542.11px] blur-[228px] z-[-1] animate-fadeIn delay-400" />
        </div>

        <div className="grid grid-rows-2 md:grid-rows-1 gap-[24px]">
          {cardData.slice(0, 2).map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              customStyles={{
                container: "flex flex-col item-end justify-end bg-white",
                title: "flex items-start justify-start text-[#2A5FAC] text-[24px] font-bold",
                description: "text-[#292929] text-[16px] font-normal",
              }}
              responsive={{
                container: "w-[178.6px] md:w-[444.58px]",
                height: "w-[327.46px] md:h-[327.46px]",
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
                container: "flex flex-col item-end justify-end bg-white",
                title: "flex items-start justify-start text-[#2A5FAC] text-[24px] font-bold",
                description: "text-[#292929] text-[16px] font-normal",
              }}
              responsive={{
                container: "w-[178.6px] md:w-[444.58px]",
                height: "w-[327.46px] md:h-[327.46px]",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernLender;