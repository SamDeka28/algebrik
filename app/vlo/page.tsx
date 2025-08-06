"use client"
import HeroSection from "../../components/vlo/HeroSection";
import DemoSection from "../../components/vlo/DemoSection";
import HowItWorksSection from "../../components/vlo/HowItWorksSection";
import WhyItMattersSection from "../../components/vlo/WhyItMattersSection";
import TestimonialsSection from "../../components/vlo/TestimonialsSection";
import CTASection from "../../components/vlo/CTASection";
import  "./index.css";
const Index = () => {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <DemoSection />
        <HowItWorksSection />
        <WhyItMattersSection />
        <TestimonialsSection />
        {/* <CTASection /> */}
      </main>
    </div>
  );
};

export default Index;
