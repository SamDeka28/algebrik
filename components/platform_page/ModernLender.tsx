import Image from "next/image";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";

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
        <div className="relative opacity-[30%] z-[-1]">
          <div className="absolute top-24 md:left-[296px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full md:w-[668.64px] md:h-[542.11px] blur-[100px] animate-fadeIn" />
          <div className="absolute top-36 md:left-[20px] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full md:w-[618.35px] md:h-[633.38px] blur-[100px] -z-10 animate-fadeIn delay-200" />
          <div className="absolute top-48 md:bottom-[10px] bg-[#BE95FF] rounded-full md:w-[951.48px] md:h-[542.11px] blur-[100px] z-[-1] animate-fadeIn delay-400" />
        </div>

        <div className="flex flex-col gap-[30px]">
          <div className="relative flex gap-[20px]">
            <div className="bg-white px-[24px] py-[32px] md:w-[482px] md:h-[428px] rounded-[20px] flex flex-col gap-[8px] shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">
            <CustomHeader text="AI-Driven automation" className="sm:text-[18px] lg:text-[24px]" />

              <CustomSubtitle
                text="Automate repetitive tasks, reduce errors, and accelerate loan approvals with advanced AI capabilities"
                className="md:text-[16px] md:leading-[30px]"
              />
              <Image src="/section_images/ai_driven.png" width={482} height={428} alt="AI-Driven automation" />
            </div>
            <div className="relative top-24 bg-white px-[24px] py-[32px] md:w-[409px] md:h-[370px] rounded-[20px] flex flex-col-reverse gap-[8px] shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">
              <CustomSubtitle
                text="Leverage real-time insights and confidence scoring to make faster, more informed lending decisions"
                className="md:text-[16px] md:leading-[30px]"
              />
              <CustomHeader text="Smarter Decisioning" className="md:text-md lg:text-[24px]" />
              <Image src="/section_images/smarter.png" width={482} height={428} alt="Smarter Decisioning" />
            </div>
          </div>
          <div className="flex gap-[22.42px]">
            <div className="bg-white px-[24px] py-[32px] md:w-[444.58px] md:h-[327.46px] rounded-[20px] flex flex-col gap-[8px] shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">
              <CustomHeader text="Omnichannel Experience" className="sm:text-[18px] lg:text-[24px]" />
              <CustomSubtitle
                text="Offer borrowers a seamless, unified experience across mobile, web, and in-branch"
                className="md:text-[16px] md:leading-[30px]"
              />
              <Image src="/section_images/omnichannel_experience.png" width={482} height={428} alt="Omnichannel Experience" />
            </div>
            <div className="relative top-8 bg-white px-[24px] py-[32px] md:w-[445px] md:h-[351px] rounded-[20px] flex flex-col gap-[8px] shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">
              <CustomHeader text="Scalable & Secure" className="sm:text-[18px] lg:text-[24px]" />
              <CustomSubtitle
                text="Built on a robust cloud-native architecture to grow with your business and ensure data integrity"
                className="md:text-[16px] md:leading-[30px]"
              />
              <Image src="/section_images/scalable.png" width={482} height={328} alt="Scalable & Secure" className="relative bottom-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernLender;
