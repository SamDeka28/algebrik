"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import BookADemo from "../BookADemo";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";

export default function HeroSection() {
  const pathname = usePathname();

  const isCreditUnion = pathname.includes("credit_union");
  const isAutoLenders = pathname.includes("auto_lenders");
  const isSmbLenders = pathname.includes("smb_lenders");

  const heroContent = isCreditUnion
    ? {
        header: (
          <>
            <span>Simplify Lending.</span>
            <span>Delight Members. Drive Growth.</span>
          </>
        ),
        subtitle:
          "Empower your credit union to reduce approval times, boost member satisfaction, and lower operational costs—all with Algebrik AI’s cloud-native, AI-powered solutions tailored to your needs.",
        sectionImage: "/section_images/credit_hero.png",
        subtitleClass: "text-[18px] text-gray-300 font-plus-jakarta font-normal text-center px-[193px] mb-[10px]",
      }
    : isAutoLenders
    ? {
        header: (
          <>
            <span>Accelerate Lending,</span>
            <span>Drive Customer Delight.</span>
          </>
        ),
        subtitle:
          "Streamline auto financing with a unified platform that integrates trusted services, simplifies workflows, and delights your borrowers and employees.",
        sectionImage: "/section_images/auto_lenders/hero.png",
        subtitleClass: "!text-[18px] text-gray-300 font-plus-jakarta font-normal text-center px-[400px] mb-[10px]",
      }
    : isSmbLenders
    ? {
        header: (
          <>
            <span>Empowering SMB Lenders with</span>
            <span>Smarter Workflows</span>
          </>
        ),
        subtitle:
          "Simplify lending operations, improve decision-making, and deliver faster, seamless borrower experiences—all tailored for SMB lenders",
        sectionImage: "/section_images/smb_lenders/hero.png",
        subtitleClass: "text-[18px] text-gray-300 font-plus-jakarta font-normal text-center px-[430px] mb-[10px]",
      }
    : null;

  if (!heroContent) {
    return null;
  }

  return (
    <div className="w-full h-max">
      <div
        className="w-full h-[758px] flex items-center justify-center overflow-hidden relative"
        style={{
          backgroundImage: "url('/background_images/platform_hero.png')",
          backgroundSize: "100%",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: "bottom",
        }}
      >
        <div className="absolute top-48 mx-auto flex flex-col items-center justify-start gap-[20px]">
          <div className="flex flex-col gap-[20px]">
            <CustomHeader
              text={heroContent.header}
              className="text-[56px] text-white text-center flex flex-col"
            />
            <CustomSubtitle
              text={heroContent.subtitle}
              className={heroContent.subtitleClass}
            />
          </div>
          <BookADemo />
        </div>
      </div>

      <div className="relative h-[458px] flex justify-center">
        <div className="cursor-pointer">
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
