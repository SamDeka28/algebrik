"use client";

import React, { useState } from "react";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import Button from "../Buttons";
import Contact from "../contacts";

const ReadyToGo = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  return (
    <section
      className="bg-[#EBEEF5] mx-auto md:flex flex-col justify-center items-center gap-8 md:py-[13px] z-20 relative"
      aria-label="Build the Lending Experience of Tomorrow"
    >
      <div className="container flex flex-col justify-center items-center text-center gap-[24px] mx-auto px-6 py-12 md:px-[150px] md:py-[140px]">
        <CustomHeader
          className="text-[32px] leading-[42px] md:text-[48px] md:leading-[62px] px-4 md:px-[140px] flex flex-col"
          text="Ready to get started?"
        />
        <CustomSubtitle
          className="px-4 text-[16px] leading-[26px] md:px-72 md:text-[24px] font-normal"
          text="Unlock the power of AI and automation to transform your lending operations. Deliver faster approvals, smarter decisions, and seamless borrower experiences—all with Algebrik at your side"
        />
        <div className="flex flex-col gap-4 w-full md:flex-row md:gap-[22px] md:w-[430px] md:mt-[66px]">
          <Button
            text="Get Started"
            isActive={true}
            onClick={() => setShowContactModal(true)}
            customClass="bg-gradient-to-r from-blue-400 to-blue-900 text-white font-bold py-[14px] text-[14px] md:py-[18px] md:text-[16px] font-bold hover:bg-blue-500 flex-1"
            activeStyle="bg-white text-[#292929] font-bold"
          />

          <Button
            text="See Us In Action"
            link="https://app.storylane.io/demo/9gq55pwnefgy?embed=inline"
            customClass="py-[14px] text-[14px] md:py-[18px] md:text-[16px] text-[#1A69DC] font-bold border border-[#1C8DEA] flex-1"
            activeStyle="text-[#1A69DC] font-bold"
          />
        </div>
      </div>
      <Contact open={showContactModal} onClose={() => setShowContactModal(false)} />
    </section>
  );
};

export default ReadyToGo;
