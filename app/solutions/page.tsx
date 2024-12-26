

import FooterCards from "@/components/FooterCards";
import ChallengesSection from "@/components/solutions/ChallengesSection";
import FAQs from "@/components/solutions/FAQs";
import HeroSection from "@/components/solutions/Hero";



export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <ChallengesSection />
        <FooterCards />
    <FAQs/>
      </main>
    </>
  );
}
