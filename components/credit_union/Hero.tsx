"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import BookADemo from "../BookADemo";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";

export default function HeroSection() {
  const pathname = usePathname();

  const isCreditUnion = pathname.includes("credit_union");
  const isAutoLenders = pathname.includes("auto_lenders");
  const isSmbLenders = pathname.includes("banks");

  const heroContent = isCreditUnion
    ? {
        header: (
          <>
            <div className="hidden md:flex flex-col">
            <span>Simplify Lending.</span>
            <span>Delight Members. Drive Growth.</span>
            </div>
            <div className="md:hidden flex flex-col px-[36px]">
            <span>Simplify </span>
            <span>Delight Lending.</span>
            <span>Members. Drive Growth.</span>
            </div>
          </>
        ),
        subtitle:
          "Empower your credit union to reduce approval times, boost member satisfaction, and lower operational costs—all with Algebrik AI’s cloud-native, AI-powered solutions tailored to your needs.",
        sectionImage: "/section_images/credit_hero.png",
        subtitleClass: "text-[16px] md:text-[18px] text-gray-300 font-plus-jakarta font-normal text-center px-[38px] md:px-[193px] mb-[10px]",
      }
    : isAutoLenders
    ? {
        header: (
          <>
           <div className="hidden md:flex flex-col">
           <span>Accelerate Lending,</span>
           <span>Drive Customer Delight.</span>
            </div>
            <div className="md:hidden flex flex-col px-[36px]">
            <span>Accelerate </span>
            <span>Lending, Drive </span>
            <span>Customer Delight.</span>
            </div>
          </>
        ),
        subtitle:
          "Streamline auto financing with a unified platform that integrates trusted services, simplifies workflows, and delights your borrowers and employees.",
        sectionImage: "/section_images/auto_lenders/hero.png",
        subtitleClass: "text-[16px] md:text-[18px] text-gray-300 font-plus-jakarta font-normal text-center md:px-[400px] mb-[10px]",
      }
    : isSmbLenders
    ? {
        header: (
          <>
            <div className="hidden md:flex flex-col">
            <span>Empowering Banks with</span>
            <span>Smarter Workflows</span>
            </div>
            <div className="md:hidden flex flex-col px-[6px]">
            <span>Empowering Banks</span>
          
            <span>with Smarter Workflows</span>
            </div>
          </>
        ),
        subtitle:
          "Simplify lending operations, improve decision-making, and deliver faster, seamless borrower experiences—all tailored for SMB lenders",
        sectionImage: "/section_images/smb_lenders/hero.png",
        subtitleClass: "text-[16px] md:text-[18px] text-gray-300 font-plus-jakarta font-normal text-center md:px-[430px] mb-[10px]",
      }
    : null;

  if (!heroContent) {
    return null;
  }

  return (
    <div className="w-full h-max">
      <div
        // className="w-full h-[758px] flex items-center justify-center overflow-hidden relative"
        // style={{
        //   backgroundImage: "url('/background_images/platform_hero.png')",
        //   backgroundSize: "100%",
        //   backgroundPosition: "center center",
        //   backgroundRepeat: "no-repeat",
        //   backgroundPositionY: "bottom",
        // }}
        className="    w-full h-[758px] flex items-center justify-center overflow-hidden relative 
    md:bg-[url('/background_images/platform_hero.png')] bg-[url('/background_images/mobile_solutions.png')] rounded-b-[32px] md:rounded-none bg-no-repeat bg-center 
    bg-cover"

      >
        <div className="absolute top-48 mx-auto flex flex-col items-center justify-start gap-[20px]">
          <div className="flex flex-col gap-[20px]">
            <CustomHeader
              text={heroContent.header}
              className="text-[36px] md:text-[56px] text-white font-medium text-center  flex flex-col"
            />
            <CustomSubtitle
              text={heroContent.subtitle}
              className={heroContent.subtitleClass}
            />
          </div>
          <BookADemo />
        </div>
      </div>

      <div className="hidden relative h-[458px] md:flex justify-center">
        <div className="">
          <div className="relative -inset-y-40 right-[25px]">
            <Image
              src={heroContent.sectionImage}
              alt="Section Hero"
              width={865}
              height={555}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
