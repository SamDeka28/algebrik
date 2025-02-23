

import FooterCards from "@/components/FooterCards";
import FAQs from "@/components/credit_union/FAQs";
import HeroSection from "@/components/credit_union/Hero";
import AutoLender from "@/components/auto_lenders/AutoLenders";
import RoadBlocks from "@/components/auto_lenders/Roadblocks";
import Revolutionize from "@/components/auto_lenders/Revolutionize";
import PlaysAndBrings from "@/components/auto_lenders/Plays&Brings";
import LendersAchieve from "@/components/auto_lenders/LendersAchieve";
import { Metadata } from "next";

export const metadata:Metadata={
  title:"Algebrik for Auto Lenders: Accelerate Approvals with AI Technology",
  description:"Enhance your auto lending services with Algebrik's AI-powered solutions, speeding up loan approvals and providing seamless borrower experiences"
}

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
