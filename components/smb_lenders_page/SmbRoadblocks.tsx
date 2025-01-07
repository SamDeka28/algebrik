"use client";

import Image from "next/image";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";

const SmbRoadBlocks = () => {
  const cardData = [
    
    {
      title: "Risk Assessment Accuracy",
      description:
        "Inconsistent evaluations increase the risk of defaults and poor lending decisions.",
      hoverDescription:
        "AI-driven risk models ensure accurate credit assessments and smarter decision-making.",
      image: "/section_images/smb_lenders/risk.png",
    },
    {
      title: "Compliance Complexity",
      description:
        "Evolving regulations create inefficiencies and increase the risk of non-compliance.",
      hoverDescription:
        "Built-in KYC and AML checks simplify compliance, ensuring adherence without delays.",
        image: "/section_images/auto_lenders/evolving.png",
    },
    {
        title: "Loan Processing Bottlenecks",
        description:
          "Lengthy approval cycles hinder growth and frustrate borrowers.",
        hoverDescription:
          "Algebrik streamlines processing with automation, enabling faster approvals and better scalability.",
          image: "/section_images/auto_lenders/operational.png",
      },
  ];

  return (
     <div className="flex flex-col gap-8 justify-center items-center p-6 md:p-10">
       <div className="flex flex-col justify-center items-center text-center gap-[24px]">
         <CustomHeader
           className="text-2xl md:text-3xl lg:text-4xl font-bold"
           text="Overcoming Roadblocks in Auto Lending"
         />
         <CustomSubtitle
           className="px-4 sm:px-16 md:px-32 lg:px-48 text-base md:text-lg lg:text-xl mb-10"
           text="Tackle the most pressing roadblocks in auto financing with innovative, integrated solutions"
         />
       </div>
 
       <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between items-center gap-[32px] lg:gap-10 w-full max-w-[1200px]">
         <div className="flex flex-col items-center w-full lg:w-1/2">
           <div className="relative flex flex-col-reverse justify-between p-6 rounded-[20px] shadow-[0_16px_52px_0px_rgba(10,64,108,0.1)] backdrop-blur-lg bg-white/60 border border-[#CAD3E0] w-full max-w-[518px] h-[580px] group">
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
                   filter:
                     "blur(28px) drop-shadow(0px 36px 36px rgba(0, 0, 0, 0.08))",
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
         <div className="flex flex-col gap-6 lg:gap-10 w-full lg:w-1/2">
   {cardData.slice(0, 2).map((card, index) => (
     <div
       key={index}
       className={`relative p-6 rounded-[20px] shadow-[0_16px_52px_0px_rgba(10,64,108,0.1)] backdrop-blur-lg bg-white/60 border border-[#CAD3E0] w-full max-w-[610px] ${
         index === 0 ? "flex flex-row-reverse h-[222px]" : "flex flex-col h-[326px]"
       } gap-4 group`}
     >
       {/* Gradient Background */}
       <div className="absolute w-52 h-52 -top-0 -right-0 bg-gradient-to-tr from-blue-100 to-green-50 -z-10 rounded-[24px] blur-xl"></div>
 
       {/* Image Section */}
       <div
         className={`relative ${
           index === 0
             ? "w-1/2 h-full right-0"
             : "w-full h-[150px] md:h-[200px] overflow-hidden"
         }`}
       >
         <Image
           src={card.image}
           alt={card.title}
           width={950}
           height={515}
           objectFit="cover"
           className={`rounded-[24px] ${
             index === 0 ? "w-full h-full" : "w-full h-full object-cover"
           }`}
           style={{
             filter:
               "blur(28px) drop-shadow(0px 36px 36px rgba(0, 0, 0, 0.08))",
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
 
       {/* Text Section */}
       <div
         className={`flex flex-col justify-center ${
           index === 0 ? "w-1/2" : "w-full"
         } z-10`}
       >
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
     </div>
   ))}
 </div>
 
       </div>
     </div>
  );
};

export default SmbRoadBlocks;
