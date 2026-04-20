 

import FooterCards from "@/components/FooterCards";
import ChallengesSection from "@/components/credit_union/ChallengesSection";
import CreditUnion from "@/components/credit_union/CreditUnions";
import FAQs from "@/components/credit_union/FAQs";
import HeroSection from "@/components/credit_union/Hero";
import LoanLifecycle from "@/components/credit_union/LoanLifecycle";
import { Metadata } from "next";
 

export const metadata: Metadata = {
  title: "Algebrik AI | Credit Union Lending Software",
  description: "Modernize credit union lending with AI-powered software that streamlines workflows, improves decisions, and enhances member experience.",
  keywords: ["credit union lending software"],
};

export default function CreditUnions() {
  return (
    <>
      <main className="overflow-x-hidden">
        <HeroSection />
        <CreditUnion />
        <ChallengesSection />
        <LoanLifecycle />
        <FooterCards />
        <FAQs/>
      </main>
    </>
  );
}
