"use client";
import HeroSection from "@/components/home_page/HeroSection";
import CardsContainer from "@/components/card";
import FooterCards from "@/components/FooterCards";
import LendingJourney from "@/components/home_page/LendingJourney";
import Potential from "@/components/home_page/Potential";
import IntegrationsSection from "@/components/home_page/IntegrationsSection";
import FeaturesSection from "@/components/home_page/FeaturesSection";
import BorrowerJourney from "@/components/home_page/BorrowerJourney";

import React, { useEffect, useState } from 'react';

const HubSpotPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 5 seconds
    const timer = setTimeout(() => setIsVisible(true), 5000);

    // Cleanup timeout when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setIsVisible(false);

  return (
    <>
      {isVisible && (
        <div className="px-4 fixed min-w-full md:min-w-max inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-transparent rounded-lg shadow-lg min-w-full md:min-w-max p-6">
            <div className="mt-4 min-w-full md:min-w-max">
              <div
                className="hs-cta-embed hs-cta-simple-placeholder hs-cta-embed-184976867374 relative"
                style={{ maxHeight: '100%' }}
                data-hubspot-wrapper-cta-id="184976867374"
              >
                <button
                  onClick={handleClose}
                  className="text-[#2a5fac] hover:text-gray-800 focus:outline-none absolute top-3 right-4"
                >
                  ✖
                </button>
                <a
                  href="https://cta-service-cms2.hubspot.com/web-interactives/public/v1/track/redirect?encryptedPayload=AVxigLI%2F3grIyx%2BWJXwNDhkBL3iTj8ROdmO74%2B5P%2FE74veUJJghKZ%2FZ3VK9BbBM4lkPU7To2XktOKWDjqX%2FQ0oI49nBbgbFdaRYOPVHBFDNubt927%2BgItlHQec4raHVA7FxA16LrWC3XuSWeyP3rMxgkCBm%2FMXwTt7my52FxbeVaM1XgafhtUOkEzaKhTQhSvDJEUOGB9AYKWXE1YdbZ4b9cZg%3D%3D&webInteractiveContentId=184976867374&portalId=47671281"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt="CATCH UP WITH US AT THE 2025 CUES FUTURE SUMMIT (FEB 4-6) Experience the future of loan origination with Algebrik AI—built for speed, intelligence, and seamless borrower experiences. Bonus: Get an exclusive hands-on demo of the world’s first cloud-native, AI-powered LOS, designed to simplify workflows and drive results for modern lenders!"
                    loading="lazy"
                    src="https://no-cache.hubspot.com/cta/default/47671281/interactive-184976867374.png"
                    style={{ height: '100%', width: '100%', objectFit: 'fill' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default function Home() {
  return (
    <>

      <main className="overflow-x-hidden">
        <HeroSection />
        {/* <HubSpotPopup /> */}
        <FeaturesSection />
        <BorrowerJourney />
        <LendingJourney />
        <Potential />
        <CardsContainer />
        <IntegrationsSection />
        <FooterCards />
      </main>
    </>
  );
}
