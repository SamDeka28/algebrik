"use client";

import { useState } from "react";
import Image from "next/image";
import lendingWithAlgebrik from "@/public/background_images/lendingWithAlgebrik.png";
import lendingWithoutAlgebrik from "@/public/background_images/lendingWithoutAlgebrik.png";
import Button from "../Buttons";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";

export default function LendingJourneyDesign() {
    const [isWithAlgebrik, setIsWithAlgebrik] = useState(true);
  
    return (
      <div className="container mx-auto p-4 md:p-8 flex flex-col gap-8">
        <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto px-36">
          <CustomHeader
            text={
              isWithAlgebrik
                ? "The Difference Algebrik Makes"
                : "Making Lending Journeys Faster, Smarter, and Simpler"
            }
          />
          {!isWithAlgebrik && (
            <CustomSubtitle
              text="Lending journeys are plagued by inefficiencies—disconnected systems, manual workflows, and borrower frustration. Algebrik transforms them with automation, AI, and seamless experiences."
            />
          )}
        </div>
  
        <div className="relative mx-auto flex w-[416px] h-[52px] bg-[#E1ECFD] border-[#CEE2FF] rounded-[48px] justify-around items-center gap-4 p-[2px]">
          <Button
            text="With Algebrik"
            isActive={isWithAlgebrik}
            onClick={() => setIsWithAlgebrik(true)}
        
          />
          <Button
            text="Without Algebrik"
            isActive={!isWithAlgebrik}
            onClick={() => setIsWithAlgebrik(false)}
          />
        </div>
  
        <div className="flex justify-center transition-opacity duration-500 ease-in-out">
          <Image
            src={isWithAlgebrik ? lendingWithAlgebrik : lendingWithoutAlgebrik}
            alt="Lending Flowchart"
            className="w-full max-w-[1282px] h-[687px] object-contain"
          />
        </div>
      </div>
    );
  }