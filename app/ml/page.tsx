import HeroSection from "@/components/ml_page/HeroSection";
import WhyRethinkingSection from "@/components/ml_page/WhyRethinkingSection";
import ComplexityToClaritySection from "@/components/ml_page/ComplexityToClaritySection";
import BoltOnModulesSection from "@/components/ml_page/BoltOnModulesSection";
import SwitchingSection from "@/components/ml_page/SwitchingSection";
import LegacyStacksSection from "@/components/ml_page/LegacyStacksSection";
import ReadyToSeeSection from "@/components/ml_page/ReadyToSeeSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Lending Platforms for Credit Unions | AI",
  description: "Compare top AI-powered lending platforms for credit unions and modern lenders."
}

export default function MLPage() {
  return (
    <main className="overflow-x-hidden flex flex-col items-center">
      <HeroSection />
      <WhyRethinkingSection />
      <ComplexityToClaritySection />
      <BoltOnModulesSection />
      <SwitchingSection />
      <LegacyStacksSection />
      <ReadyToSeeSection />
    </main>
  );
}
