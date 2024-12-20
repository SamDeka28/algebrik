
import CardsContainer from "@/components/card";

import FooterCards from "@/components/FooterCards";
import HeroSection from "@/components/home_page/HeroSection";
import LendingJourney from "@/components/home_page/LendingJourney";
import Potential from "@/components/home_page/Potential";
import IntegrationsSection from "@/components/home_page/IntegrationsSection";



export default function Home() {
  return (
    <>
      <main>
        <HeroSection />

        <LendingJourney/>
        <Potential />
        <CardsContainer/>
        <IntegrationsSection />
        <FooterCards/>
      </main>
    </>
  );
}
