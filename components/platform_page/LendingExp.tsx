"use client";

import React from "react";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import Button from "../Buttons";
import Contact from "../contacts";
import { useState } from "react";
import {motion, useReducedMotion} from "framer-motion"

const LendingExperience = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.section
      initial={prefersReducedMotion ? {opacity:1} : {y:30, opacity:0}}
      whileInView={prefersReducedMotion ? {opacity:1} : {y:0, opacity:1}}
      transition={{duration:0.6, ease:"easeOut"}}
      viewport={{once:true, amount:0.2}}
      style={{ willChange: "transform, opacity" }}
      className="mx-auto p-4 md:p-8 flex flex-col justify-center items-center gap-8 mb-[61px] md:mb-[119px]"
      aria-label="Build the Lending Experience of Tomorrow"
    >
      <div className="container flex flex-col justify-center items-center text-center gap-[24px] mx-auto p-4 md:p-[150px, 140px]">
        <CustomHeader
          className="text-[32px] md:text-[48px] leading-[42px] md:leading-[62px] px-4 md:px-[140px] flex flex-col"
          text={
            <>
              <span>Build the Lending</span>
              <span>Experience of Tomorrow</span>
            </>
          }
        />
        <CustomSubtitle
          className="px-6 md:px-80 text-[16px] md:text-[24px] font-normal"
          text="Unlock the power of AI and automation to transform your lending operations. Deliver faster approvals, smarter decisions, and seamless borrower experiences—all with Algebrik at your side"
        />
        <div className="flex flex-row gap-[22px] w-full md:w-[430px] md:mt-[66px]">
          <Button
            text="Get Started"
            isActive={true}
            // onClick={() => alert("Please provide the redirection page")}
            onClick={() => setShowContactModal(true)}
            customClass="bg-gradient-to-r from-blue-400 to-blue-900 text-white font-bold py-[10px] text-[14px] md:text-[16px] font-bold hover:bg-blue-500 w-full md:w-auto"
            activeStyle="bg-white text-[#292929] font-bold"
          />

          <Button
            text="See Us In Action"
            // onClick={() => alert("Please provide the redirection page")}
            link="https://app.storylane.io/demo/9gq55pwnefgy?embed=inline"
            customClass="py-[10px] text-[14px] md:text-[16px] text-[#1A69DC] font-bold border border-[#1C8DEA] w-full md:w-auto"
            activeStyle="text-[#1A69DC] font-bold"
          />
        </div>
      </div>
      <Contact open={showContactModal} onClose={() => setShowContactModal(false)} />
    </motion.section>
  );
};

export default LendingExperience;
