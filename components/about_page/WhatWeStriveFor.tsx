"use client";

import React from "react";
import { CustomHeader } from "../CustomHeader";
import { motion } from "framer-motion";

export default function WhatWeStriveFor() {
  return (
    <div
      className="container mx-auto md:p-8 flex font-plus-jakarta justify-center items-center"
      style={{
        backgroundImage: "url('/background_images/modern_lender.png')",
        backgroundSize: "cover",
      }}
    >
      <div className="hidden  md:flex flex-col md:flex-row items-center gap-12">
        <div className="flex md:flex-row font-plus-jakarta gap-[34.91px]">
          <div className="flex md:flex-col gap-6 relative md:top-28">
            <div className="bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] backdrop-blur-[7.34px] border-2 p-[0.5px] rounded-[34px] shadow-[0_22.22px_60.64px_0_rgba(16, 30, 54, 0.08)]">
              <div
                className="bg-white flex flex-col px-[18px] py-[20px] rounded-[32px]"
                style={{
                  width: "364.69px",
                  height: "226px",
                }}
              >
                <h2 className="text-[48px] text-transparent bg-clip-text bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] font pb-[17px] font-extrabold">
                  01
                </h2>
                <h3 className="text-[32px] text-[#292D34] pb-[8px] font-bold">
                  Simplify Complexity
                </h3>
                <p className="text-[14px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] tracking-[2px] flex flex-col uppercase">
                  Lending is simple. We strive to make it so.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] border-2 p-[0.5px] backdrop-blur-[7.34px] rounded-[34px] shadow-[0_22.22px_60.64px_0_rgba(16, 30, 54, 0.08)]">
              <div
                className="bg-white flex flex-col px-[18px] py-[20px] rounded-[32px]"
                style={{
                  width: "364.69px",
                  height: "270px",
                }}
              >
                <h2 className="text-[48px] text-transparent bg-clip-text bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] font pb-[17px] font-extrabold">
                  02
                </h2>
                <h3 className="text-[32px] text-[#292D34] pb-[8px] font-bold flex flex-col">
                  <span>Design for </span>
                  <span>Inclusivity</span>
                </h3>
                <p className="text-[14px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] tracking-[2px] flex flex-col uppercase">
                  Financial services should work for all.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] backdrop-blur-[7.34px] border-2 p-[0.5px] rounded-[34px] shadow-[0_22.22px_60.64px_0_rgba(16, 30, 54, 0.08)]">
              <div
                className="bg-white flex flex-col px-[18px] py-[20px] rounded-[32px]"
                style={{
                  width: "364.69px",
                  height: "274px",
                }}
              >
                <h2 className="text-[48px] text-transparent bg-clip-text bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] font pb-[17px] font-extrabold">
                  03
                </h2>
                <h3 className="text-[32px] text-[#292D34] pb-[8px] font-bold">
                  Build with Purpose
                </h3>
                <p className="text-[14px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] tracking-[2px] flex flex-col uppercase ">
                  Inspired by precision and depth, like the mathematics in our
                  name, we craft FUTURE READY TOOLS
                </p>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex md:flex-col gap-6 relative md:top-16">
            <div className="bg-gradient-to-b from-[#149994] to-[#149994] backdrop-blur-[7.34px] shadow-[0_22.22px_60.64px_0_rgba(16, 30, 54, 0.08)] border-2 p-[0.5px] rounded-[34px]">
              <div
                className="bg-white flex flex-col px-[18px] py-[20px] rounded-[32px]"
                style={{
                  width: "362.75px",
                  height: "294px",
                }}
              >
                <h2 className="text-[48px] text-transparent bg-clip-text bg-gradient-to-b from-[#149994] to-[#149994] font pb-[17px] font-extrabold">
                  04
                </h2>
                <h3 className="text-[32px] text-[#292D34] pb-[8px] font-bold flex flex-col">
                  <span>Obsess Over </span>
                  <span>Impact</span>
                </h3>
                <p className="text-[14px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#149994] to-[#149994] tracking-[2px] flex flex-col uppercase">
                  Every decisioN is guided by how it helps lenders and borrowers
                  achieve
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-b from-[#149994] to-[#149994] border-2 p-[0.5px] rounded-[34px] backdrop-blur-[7.34px] shadow-[0_22.22px_60.64px_0_rgba(16, 30, 54, 0.08)]">
              <div
                className="bg-white flex flex-col px-[18px] py-[20px] rounded-[32px]"
                style={{
                  width: "362.75px",
                  height: "250px",
                }}
              >
                <h2 className="text-[48px] text-transparent bg-clip-text bg-gradient-to-b from-[#149994] to-[#149994] font pb-[17px] font-extrabold">
                  05
                </h2>
                <h3 className="text-[32px] text-[#292D34] pb-[8px] font-bold flex flex-col">
                  Push Boundaries
                </h3>
                <p className="text-[14px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#149994] to-[#149994] tracking-[2px] flex flex-col uppercase">
                  We question limits and create what doesn’t yet exist to
                  redefine lending experiences.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-b from-[#149994] to-[#149994] border-2 p-[0.5px] rounded-[34px] backdrop-blur-[7.34px] shadow-[0_22.22px_60.64px_0_rgba(16, 30, 54, 0.08)]">
              <div
                className="bg-white flex flex-col px-[18px] py-[20px] rounded-[32px]"
                style={{
                  width: "362.75px",
                  height: "250px",
                }}
              >
                <h2 className="text-[48px] text-transparent bg-clip-text bg-gradient-to-b from-[#149994] to-[#149994] font pb-[17px] font-extrabold">
                  06
                </h2>
                <h3 className="text-[32px] text-[#292D34] pb-[8px] font-bold flex flex-col">
                  Earn and Give Trust
                </h3>
                <p className="text-[14px] text-transparent bg-clip-text bg-gradient-to-b from-[#149994] to-[#149994] font-bold tracking-[2px] flex flex-col uppercase">
                  Trust is the cornerstone of lending, and we intend to keep it
                  that way.
                </p>
              </div>
            </div>
          </div>

          {/* Third Row */}
          <div className="flex md:flex-col gap-6">
            <CustomHeader
              className="hidden md:flex flex-col text-[56px]"
              text={
                <>
                  <span>What we</span>
                  <span>strive for!</span>
                </>
              }
            />
            <div className="bg-gradient-to-b from-[#BE95FF] to-[#9A5FF6] border-2 p-[0.5px] backdrop-blur-[7.34px] rounded-[34px] shadow-[0_22.22px_60.64px_0_rgba(16, 30, 54, 0.08)]">
              <div
                className="bg-white flex flex-col px-[18px] py-[20px] rounded-[32px]"
                style={{
                  width: "362.75px",
                  height: "294px",
                  border: "linear-gradient(to top right, #ff5b77, #a500ff)",
                }}
              >
                <h2 className="text-[48px] text-transparent bg-clip-text bg-gradient-to-b from-[#BE95FF] to-[#9A5FF6] font pb-[17px] font-extrabold">
                  07
                </h2>
                <h3 className="text-[32px] text-[#292D34] pb-[8px] font-bold flex flex-col">
                  <span>Empower Every </span>
                  <span>Stakeholder</span>
                </h3>
                <p className="text-[14px] text-transparent bg-clip-text bg-gradient-to-b from-[#BE95FF] to-[#9A5FF6] font-bold tracking-[2px] flex flex-col uppercase">
                  Enable everyone to focus on what they do best, knowing we have
                  their back.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-b from-[#BE95FF] to-[#9A5FF6] border-2 p-[0.5px] backdrop-blur-[7.34px] rounded-[34px] shadow-[0_22.22px_60.64px_0_rgba(16, 30, 54, 0.08)]">
              <div
                className="bg-white flex flex-col px-[18px] py-[20px] rounded-[32px]"
                style={{
                  width: "362.75px",
                  height: "226px",
                }}
              >
                <h2 className="text-[48px] text-transparent bg-clip-text bg-gradient-to-b from-[#BE95FF] to-[#9A5FF6] font pb-[17px] font-extrabold">
                  08
                </h2>
                <h3 className="text-[32px] text-[#292D34] pb-[8px] font-bold flex flex-col">
                  Celebrate Progress
                </h3>
                <p className="text-[14px] text-transparent bg-clip-text bg-gradient-to-b from-[#BE95FF] to-[#9A5FF6] font-bold tracking-[2px] flex flex-col uppercase">
                  Every small improvement leads to big wins
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] border-2 p-[0.5px] rounded-[34px] backdrop-blur-[7.34px] shadow-[0_22.22px_60.64px_0_rgba(16, 30, 54, 0.08)]">
              <div
                className="bg-white flex flex-col px-[18px] py-[20px] rounded-[32px]"
                style={{
                  width: "362.75px",
                  height: "270px",
                  border: "linear-gradient(to top right, #ff9900, #ffa500)",
                }}
              >
                <h2 className="text-[48px] text-transparent bg-clip-text bg-gradient-to-b from-[#BE95FF] to-[#9A5FF6] font pb-[17px] font-extrabold">
                  09
                </h2>
                <h3 className="text-[32px] text-[#292D34] pb-[8px] font-bold flex flex-col">
                  <span>Create Meaningful </span>
                  <span>Connections</span>
                </h3>
                <p className="text-[14px] text-transparent bg-clip-text bg-gradient-to-b from-[#BE95FF] to-[#9A5FF6] font-bold tracking-[2px] flex flex-col uppercase">
                  Lending is simple. We strive to make it so.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile  */}

      <div className="relative w-[100%] md:hidden flex flex-col gap-[31px] my-[65px]">
        <div className="absolute overflow-x-hidden w-[100%] top-40 opacity-[30%] h-max">
          <motion.div
            className="absolute top-0 -left-6 md:left-[96px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full 
    w-[283.3px] h-[172px] blur-[100px]"
            initial={{ x: "-50%" }}
            animate={{
              x: ["-30%", "30%", "-30%", "0%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ opacity: 1 }}
          />

          <motion.div
            className="absolute top-0 md:left-[20px] -left-6 bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full 
    w-[261px] h-[161px] blur-[100px] -z-10"
            initial={{ x: "100%" }}
            animate={{
              x: ["10%", "-20%", "10%", "0%"],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ opacity: 1 }}
          />

          <motion.div
            className="absolute top-0 left-0 md:-left-96 md:bottom-[10px] bg-[#BE95FF] rounded-full 
    w-[403.14px] h-[172px] blur-[100px] z-[-1]"
            initial={{ x: "-50%" }}
            animate={{
              x: ["-30%", "40%", "-40%", "0%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ opacity: 1 }}
          />
        </div>

        <CustomHeader
          className=" md:hidden px-8 flex text-left flex-col text-[28px]"
          text="What we strive for!"
        />
        <div className=" w-[100%]  overflow-x-scroll overflow-y-hidden flex font-plus-jakarta gap-[16px] md:gap-[24px]">
          {/* First Row */}
          <div
            className="ml-4 bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] backdrop-blur-[7.34px] 
          border-2 p-[0.5px] rounded-[34px] shadow-[0_22.22px_60.64px_0_rgba(16, 30, 54, 0.08)]"
          >
            <div className="bg-white flex flex-col px-[18px] py-[20px] rounded-[32px] w-[260px] h-[256px]">
              <h2 className="text-[40px] text-transparent bg-clip-text bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] font pb-[17px] font-extrabold">
                01
              </h2>
              <h3 className="text-[24px] text-[#292D34] pb-[8px] font-bold">
                Simplify Complexity
              </h3>
              <p className="text-[12px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] tracking-[2px] flex flex-col uppercase">
                Lending is simple. We strive to make it so.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] border-2 p-[0.5px] backdrop-blur-[7.34px] 
          rounded-[34px] shadow-[0_22.22px_60.64px_0_rgba(16, 30, 54, 0.08)]">
            <div className="bg-white flex flex-col px-[18px] py-[20px] rounded-[32px] w-[260px] h-[256px]">
              <h2 className="text-[40px] text-transparent bg-clip-text bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] font pb-[17px] font-extrabold">
                02
              </h2>
              <h3 className="text-[24px] text-[#292D34] pb-[8px] font-bold flex flex-col">
                <span>Design for </span>
                <span>Inclusivity</span>
              </h3>
              <p className="text-[12px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] tracking-[2px] flex flex-col uppercase">
                Financial services should work for all.
              </p>
            </div>
          </div>

          <div
            className="bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] backdrop-blur-[7.34px] border-2 p-[0.5px] 
          rounded-[34px] shadow-[0_22.22px_60.64px_0_rgba(16, 30, 54, 0.08)]"
          >
            <div className="bg-white flex flex-col px-[18px] py-[20px] rounded-[32px] w-[260px] h-[256px]">
              <h2 className="text-[40px] text-transparent bg-clip-text bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] font pb-[17px] font-extrabold">
                03
              </h2>
              <h3 className="text-[24px] text-[#292D34] pb-[8px] font-bold">
                Build with Purpose
              </h3>
              <p className="text-[12px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] tracking-[2px] flex flex-col uppercase">
                Inspired by precision and depth, like the mathematics in our
                name, we craft FUTURE READY TOOLS
              </p>
            </div>
          </div>

          {/* Second Row */}
          <div className="bg-gradient-to-b from-[#149994] to-[#149994] backdrop-blur-[7.34px] shadow-[0_22.22px_60.64px_0_rgba(16, 30, 54, 0.08)] border-2 p-[0.5px] rounded-[34px]">
            <div className="bg-white flex flex-col px-[18px] py-[20px] rounded-[32px] w-[260px] h-[256px]">
              <h2 className="text-[40px] text-transparent bg-clip-text bg-gradient-to-b from-[#149994] to-[#149994] font pb-[17px] font-extrabold">
                04
              </h2>
              <h3 className="text-[24px] text-[#292D34] pb-[8px] font-bold flex flex-col">
                <span>Obsess Over </span>
                <span>Impact</span>
              </h3>
              <p className="text-[12px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#149994] to-[#149994] tracking-[2px] flex flex-col uppercase">
                Every decision is guided by how it helps lenders and borrowers
                achieve.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-b from-[#149994] to-[#149994] border-2 p-[0.5px] rounded-[34px] backdrop-blur-[7.34px] shadow-[0_22.22px_60.64px_0_rgba(16, 30, 54, 0.08)]">
            <div className="bg-white flex flex-col px-[18px] py-[20px] rounded-[32px] w-[260px] h-[256px]">
              <h2 className="text-[40px] text-transparent bg-clip-text bg-gradient-to-b from-[#149994] to-[#149994] font pb-[17px] font-extrabold">
                05
              </h2>
              <h3 className="text-[24px] text-[#292D34] pb-[8px] font-bold">
                Push Boundaries
              </h3>
              <p className="text-[12px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#149994] to-[#149994] tracking-[2px] flex flex-col uppercase">
                We question limits and create what doesn’t yet exist to redefine
                lending experiences.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-b from-[#149994] to-[#149994] border-2 p-[0.5px] rounded-[34px] backdrop-blur-[7.34px] shadow-[0_22.22px_60.64px_0_rgba(16, 30, 54, 0.08)]">
            <div className="bg-white flex flex-col px-[18px] py-[20px] rounded-[32px] w-[260px] h-[256px]">
              <h2 className="text-[40px] text-transparent bg-clip-text bg-gradient-to-b from-[#149994] to-[#149994] font pb-[17px] font-extrabold">
                06
              </h2>
              <h3 className="text-[24px] text-[#292D34] pb-[8px] font-bold">
                Earn and Give Trust
              </h3>
              <p className="text-[12px] text-transparent bg-clip-text bg-gradient-to-b from-[#149994] to-[#149994] font-bold tracking-[2px] flex flex-col uppercase">
                Trust is the cornerstone of lending, and we intend to keep it
                that way.
              </p>
            </div>
          </div>

          {/* Third Row */}
          <div className="bg-gradient-to-b from-[#BE95FF] to-[#9A5FF6] border-2 p-[0.5px] backdrop-blur-[7.34px] rounded-[34px] shadow-[0_22.22px_60.64px_0_rgba(16, 30, 54, 0.08)]">
            <div className="bg-white flex flex-col px-[18px] py-[20px] rounded-[32px] w-[260px] h-[256px]">
              <h2 className="text-[40px] text-transparent bg-clip-text bg-gradient-to-b from-[#BE95FF] to-[#9A5FF6] font pb-[17px] font-extrabold">
                07
              </h2>
              <h3 className="text-[24px] text-[#292D34] pb-[8px] font-bold flex flex-col">
                <span>Empower Every </span>
                <span>Stakeholder</span>
              </h3>
              <p className="text-[12px] text-transparent bg-clip-text bg-gradient-to-b from-[#BE95FF] to-[#9A5FF6] font-bold tracking-[2px] flex flex-col uppercase">
                Enable everyone to focus on what they do best, knowing we have
                their back.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-b from-[#BE95FF] to-[#9A5FF6] border-2 p-[0.5px] backdrop-blur-[7.34px] rounded-[34px] shadow-[0_22.22px_60.64px_0_rgba(16, 30, 54, 0.08)]">
            <div className="bg-white flex flex-col px-[18px] py-[20px] rounded-[32px] w-[260px] h-[256px]">
              <h2 className="text-[40px] text-transparent bg-clip-text bg-gradient-to-b from-[#BE95FF] to-[#9A5FF6] font pb-[17px] font-extrabold">
                08
              </h2>
              <h3 className="text-[24px] text-[#292D34] pb-[8px] font-bold flex flex-col">
                Celebrate Progress
              </h3>
              <p className="text-[12px] text-transparent bg-clip-text bg-gradient-to-b from-[#BE95FF] to-[#9A5FF6] font-bold tracking-[2px] flex flex-col uppercase">
                Every small improvement leads to big wins.
              </p>
            </div>
          </div>

          <div className="mr-4 bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] border-2 p-[0.5px] rounded-[34px] backdrop-blur-[7.34px] shadow-[0_22.22px_60.64px_0_rgba(16, 30, 54, 0.08)]">
            <div className="bg-white flex flex-col px-[18px] py-[20px] rounded-[32px] w-[260px] h-[256px]">
              <h2 className="text-[40px] text-transparent bg-clip-text bg-gradient-to-b from-[#BE95FF] to-[#9A5FF6] font pb-[17px] font-extrabold">
                09
              </h2>
              <h3 className="text-[24px] text-[#292D34] pb-[8px] font-bold flex flex-col">
                <span>Create Meaningful </span>
                <span>Connections</span>
              </h3>
              <p className="text-[12px] text-transparent bg-clip-text bg-gradient-to-b from-[#BE95FF] to-[#9A5FF6] font-bold tracking-[2px] flex flex-col uppercase">
                Lending is simple. We strive to make it so.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
