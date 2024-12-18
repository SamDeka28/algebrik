"use client";

import Image from "next/image";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";


const PercentageCard = ({ title, percentage }: { title: string, percentage: number }) => (
  <div className="flex flex-col items-center bg-white px-16 mx-auto w-64">
    <p className="text-xl font-bold font-plus-jakarta text-[#44a043]">{percentage}%</p>
    <h3 className="text-lg font-semibold font-plus-jakarta text-[#2A5FAC]">{title}</h3>
  </div>
);

export default function Potential() {
  const data = {
    cardData: [
      {
        image: '/section_images/faster.png',
        title: 'Faster Loan Approvals',
        description: 'Reduce processing times by automating workflows, enabling approvals in minutes instead of days',
      },
      {
        title: 'Smarter Decision-Making',
        description: 'Leverage AI-powered risk analysis and predictive insights to make precise, data-driven decisions',
        image: '/section_images/smart.png',
      },
      {
        title: 'Exceptional Borrower Experiences',
        description: 'Delight borrowers with seamless onboarding, real-time updates, and simplified agreements.',
        image: '/section_images/exceptional.png',
      }
    ],
    percentageData: [
      { title: 'Increase in Application to Funding Conversion', percentage: 300 },
      { title: 'Decrease in Approval Time', percentage: 90 },
      { title: 'Decrease in time to launch new products', percentage: 90 },
      { title: 'Increase in borrower application completion', percentage: 30 },
    ],
  };

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col gap-8">
      <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto px-36">
        <CustomHeader text="Unlock Limitless Potential with Algebrik" />
        <CustomSubtitle text="Deliver faster approvals, smarter decisions, and exceptional borrower experiences with a platform designed to transform lending operations." />
      </div>

      <div
        className="relative w-full flex justify-center gap-5 overflow-x-auto bg-gradient-to-br from-[#FFFFFF] via-[#E0F2F1] to-[#F3E5F5] p-6"
      >
        {data.cardData.map((card, index) => (
          <div
            key={index}
            className="bg-backdrop-blur-sm p-1 rounded-[10px] shadow-lg w-[365px] h-[426px] flex flex-col items-center justify-between"
      
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

            <h3 className="text-[#2A5FAC] text-lg font-plus-jakarta font-bold">{card.title}</h3>
            <p className="text-[#292929] text-sm text-center mt-2 font-plus-jakarta">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 flex-wrap mt-8">
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
