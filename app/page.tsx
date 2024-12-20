
import CardsContainer from "@/components/card";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/global/Footer";
import FooterCards from "@/components/FooterCards";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/global/Navbar";
import LendingJourney from "@/components/home_page/LendingJourney";
import Potential from "@/components/home_page/Potential";
import IntegrationsSection from "@/components/home_page/IntegrationsSection";



export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <LendingJourney/>
        <Potential />
        <CardsContainer/>
        <IntegrationsSection />
        <FooterCards/>
      </main>
      <Footer />
    </>
  );
}
