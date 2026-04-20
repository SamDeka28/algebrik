 

import FooterCards from "@/components/FooterCards";
import FAQs from "@/components/credit_union/FAQs";
import HeroSection from "@/components/credit_union/Hero";
import AutoLender from "@/components/auto_lenders/AutoLenders";
import RoadBlocks from "@/components/auto_lenders/Roadblocks";
import Revolutionize from "@/components/auto_lenders/Revolutionize";
import PlaysAndBrings from "@/components/auto_lenders/Plays&Brings";
import LendersAchieve from "@/components/auto_lenders/LendersAchieve";
import { Metadata } from "next";
 

export const metadata: Metadata = {
  title: "Algebrik | Auto Lending Software with AI Automation",
  description: "Streamline auto lending with AI-powered software that accelerates approvals, improves accuracy, and enhances borrower experience.",
  keywords: ["Auto lending software"],
};

export default function AutoLenders() {
  return (
    <>
      <main className="overflow-x-hidden">
        <HeroSection />
        <AutoLender/>
        <RoadBlocks/>
        <Revolutionize/>
        <PlaysAndBrings/>
        <LendersAchieve />
        <FooterCards />
        <FAQs/>
      </main>
    </>
  );
}
