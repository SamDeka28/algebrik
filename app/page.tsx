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
          <div className="bg-white rounded-lg shadow-lg min-w-full md:min-w-max p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Talk to us at AFSA!</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-800 focus:outline-none"
              >
                ✖
              </button>
            </div>
            <div className="mt-4 min-w-full md:min-w-max">
              <div
                className="hs-cta-embed hs-cta-simple-placeholder hs-cta-embed-184976867374"
                style={{ maxWidth: '100%' }}
                data-hubspot-wrapper-cta-id="184976867374"
              >
                <a
                  href="https://cta-service-cms2.hubspot.com/web-interactives/public/v1/track/redirect?encryptedPayload=AVxigLKbB%2B%2BIfZAau5UkZvqH6zKoH6nSpnL3HBSqW%2BHN7L2z6KOyf6SbmE8h1dUCMR1POX8BVi%2BmeZIhB1seH3sfDMMuWlS1PBTDUOzT%2F5HQMowdkn3RD4npwpnweYS3w9G1ocmA57Erp5W5IdQTCI1%2B5hUkrsVhI0B6iy1q%2FzD4qx%2FgUaS4csBJjcO23XYkNWj0QVmIG0OFl8YRw8jCIilp8AS72rphy0HoBVp%2FSlA%3D&webInteractiveContentId=184976867374&portalId=47671281"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt="JOIN US AT AFSA VEHICLE FINANCE CONFERENCE! Explore smarter, faster lending with Algebrik AI at Booth #19."
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
        {/* <HubSpotPopup/> */}
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
