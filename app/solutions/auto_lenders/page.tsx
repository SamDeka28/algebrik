

import FooterCards from "@/components/FooterCards";
import FAQs from "@/components/credit_union/FAQs";
import HeroSection from "@/components/credit_union/Hero";
import AutoLender from "@/components/auto_lenders/AutoLenders";
import RoadBlocks from "@/components/auto_lenders/Roadblocks";
import Revolutionize from "@/components/auto_lenders/Revolutionize";
import PlaysAndBrings from "@/components/auto_lenders/Plays&Brings";
import LendersAchieve from "@/components/auto_lenders/LendersAchieve";




export default function AutoLenders() {
  return (
    <>
      <main>
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
