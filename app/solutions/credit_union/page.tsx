

import FooterCards from "@/components/FooterCards";
import ChallengesSection from "@/components/credit_union/ChallengesSection";
import CreditUnion from "@/components/credit_union/CreditUnions";
import FAQs from "@/components/credit_union/FAQs";
import HeroSection from "@/components/credit_union/Hero";
import LoanLifecycle from "@/components/credit_union/LoanLifecycle";



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
