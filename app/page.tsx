
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import FooterCards from "@/components/FooterCards";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";



export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FooterCards/>
      </main>
      <Footer />
    </>
  );
}
