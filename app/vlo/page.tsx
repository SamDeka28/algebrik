"use client"
import HeroSection from "../../components/vlo/HeroSection";
import DemoSection from "../../components/vlo/DemoSection";
import HowItWorksSection from "../../components/vlo/HowItWorksSection";
import WhyItMattersSection from "../../components/vlo/WhyItMattersSection";
import TestimonialsSection from "../../components/vlo/TestimonialsSection";
import { VLO } from "@/components/ai";

import  "./index.css";
import { useState } from "react";

const Index = () => {
  const [open,setOpen]=useState(false);
  return (
    <div className="min-h-screen">
      <main className="!bg-white">
        <HeroSection openModal={()=>setOpen(true)}/>
        <DemoSection />
        <HowItWorksSection />
        <WhyItMattersSection />
        <TestimonialsSection />
        {/* <CTASection /> */}
      </main>
      <VLO open={open} onClose={()=>setOpen(false)}/>
    </div>
  );
};

export default Index;
