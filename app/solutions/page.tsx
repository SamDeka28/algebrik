
import CardsContainer from "@/components/card";

import FooterCards from "@/components/FooterCards";
import HeroSection from "@/components/home_page/HeroSection";
import LendingJourney from "@/components/home_page/LendingJourney";
import Potential from "@/components/home_page/Potential";
import IntegrationsSection from "@/components/home_page/IntegrationsSection";
import FeaturesSection from "@/components/home_page/FeaturesSection";



export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <FeaturesSection />
        <LendingJourney/>
        <Potential />
        <CardsContainer/>
        <IntegrationsSection />
        <FooterCards/>
      </main>
    </>
  );
}