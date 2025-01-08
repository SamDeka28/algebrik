"use client";

import Image from "next/image";
import { CustomHeader } from "../CustomHeader";

export default function SmbRevolutionize() {
  const data = {
    cardData: [
      {
        image: "/section_images/smb_lenders/loan.png",
        title: "Loans Without Limits",
        description:
          "Scale lending operations effortlessly with cloud-based tools built for growth.",
      },
      {
        title: "Talk More with your Borrowers",
        description:
          "Centralize borrower communication for faster updates and improved engagement.",
        image: "/section_images/smb_lenders/talk.png",
      },
      {
        title: "Setup Loan Products in Minutes",
        description:
          "Configure, customize, and launch loan offerings instantly without technical complexity.",
        image: "/section_images/auto_lenders/faster.png",
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 md:pt-20 flex flex-col gap-12 font-plus-jakarta">
      <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto md:px-44">
        <CustomHeader
          className="flex flex-col"
          text={
            <>
              <span>Revolutionize Auto Lending with </span>
              <span>Algebrik&lsquo;s Smart Features</span>
            </>
          }
        />
       
      </div>

      <div className="relative flex flex-wrap justify-center gap-6 p-6">
        {data.cardData.map((card, index) => (
          <div
            key={index}
            className="group relative w-[383px] h-[450px] flex flex-col items-center justify-start rounded-[24px]  hover:scale-105 transition-transform duration-300"
          >
            <div
              className="mb-4 rounded-[24px] shadow-[0px_-4px_6px_-1px_rgba(0,0,0,0.1),0px_-2px_4px_-2px_rgba(0,0,0,0.1)]"
              style={{
                filter:
                  "drop-shadow(0px 0px 18px rgba(0, 0, 0, 0.1)), drop-shadow(0px 0px 18px rgba(0, 0, 0, 0.1)), drop-shadow(0px 3.65px 40px rgba(0, 0, 0, 0.08))",
              }}
            >
              <Image
                src={card.image}
                alt={card.title}
                className="object-cover  rounded-[24px] w-full h-[259px]"
                width={315}
                height={259}
                quality={100}
              />
            </div>
            <h3 className="text-[#2A5FAC] text-[24px] font-plus-jakarta text-center font-bold py-3 line-clamp-1">
              {card.title}
            </h3>
            <p className="text-[#606060] text-[14px] text-center font-plus-jakarta px-3">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
