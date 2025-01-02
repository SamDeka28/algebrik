"use client";

import React from "react";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import Button from "../Buttons";

const ReadyToGo = () => {
  return (
    <section
      className="bg-[#EBEEF5] mx-auto flex flex-col justify-center items-center gap-8 md:py-[73px]"
      aria-label="Build the Lending Experience of Tomorrow"
    >
      <div className="container flex flex-col justify-center items-center text-center gap-[24px] mx-auto p-[150px, 140px]">
        <CustomHeader
          className="text-[48px] leading-[62px] px-[140px] flex flex-col"
          text="Ready to get started?"
        />
        <CustomSubtitle
          className="px-72 text-[24px] font-normal"
          text="Unlock the power of AI and automation to transform your lending operations. Deliver faster approvals, smarter decisions, and seamless borrower experiences—all with Algebrik at your side"
        />
        <div className="flex gap-[22px] w-[430px] md:mt-[66px]">
          <Button
            text="Get Started"
            isActive={true}
            onClick={() => alert("Please provide the redirection page")}
            customClass="bg-gradient-to-r from-blue-400 to-blue-900 text-white font-bold py-[18px] text-[16px] font-bold hover:bg-blue-500 flex-1"
            activeStyle="bg-white text-[#292929] font-bold"
          />

          <Button
            text="Talk to Sales"
            onClick={() => alert("Please provide the redirection page")}
            customClass="py-[18px] text-[16px] text-[#1A69DC] font-bold border border-[#1C8DEA]"
            activeStyle="text-[#1A69DC] font-bold"
          />
        </div>
      </div>
    </section>
  );
};

export default ReadyToGo;
