import BorrowerJourney from "@/components/BorrowerJourney";
import CarouselSection from "@/components/CarouselSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import FooterCards from "@/components/FooterCards";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import StatisticsSection from "@/components/StatisticsSection";


export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <BorrowerJourney/>
        {/* <CarouselSection />
        <StatisticsSection /> */}
        <FooterCards/>
      </main>
      <Footer />
    </>
  );
}
