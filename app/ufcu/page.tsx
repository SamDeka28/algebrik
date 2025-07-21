"use client";
import { useState, useEffect } from "react";
import AlgebrikUniverseLoading from "../../components/ufcu/AlgebrikUniverseLoading";
import EliteHeroSection from "../../components/ufcu/EliteHeroSection";
import UFCUSuccessSection from "../../components/ufcu/UFCUSuccessSection";
import EliteProgramSection from "../../components/ufcu/EliteProgramSection";
import EliteActionSection from "../../components/ufcu/EliteActionSection";
import AlgebrikLeadForm from "../../components/ufcu/AlgebrikLeadForm";
import ConvoaiWidget from "../../components/ConvoaiWidget";

export default function UFCUPage() {
  const [showLoading, setShowLoading] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  if (!pageLoaded) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="ufcu-root">
      {/* Algebrik Universe Loading */}
      {showLoading && <AlgebrikUniverseLoading onComplete={handleLoadingComplete} />}
      {/* Main Content */}
      <main className={`transition-opacity duration-500  font-plus-jakarta ${showLoading ? "opacity-0" : "opacity-100"}`}>
        <EliteHeroSection />
        <UFCUSuccessSection />
        <EliteProgramSection />
        <EliteActionSection />
        <AlgebrikLeadForm />
        {/* <AlgebrikFooter /> */}
        {/* Floating CTA */}
        {/* <AlgebrikFloatingCTA /> */}
        <ConvoaiWidget/>
      </main>
    </div>
  );
} 