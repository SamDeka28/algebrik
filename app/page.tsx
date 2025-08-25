"use client";
import HeroSection from "@/components/home_page/HeroSection";
import CardsContainer from "@/components/card";
import FeaturesSection from "@/components/home_page/FeaturesSection";
import ConvoaiWidget from "@/components/ConvoaiWidget"


import React, { useEffect, useState, useCallback } from 'react';
import CarouselSection from "@/components/about_page/CarouselSection";
import dynamic from "next/dynamic";
import Conversation from "@/components/Conversation";
import { motion } from "framer-motion";

const LazyIntegrationsSection = dynamic(() => import("@/components/home_page/IntegrationsSection"), { ssr: false, loading: () => <div /> });
const LazyFooterCards = dynamic(() => import("@/components/FooterCards"), { ssr: false, loading: () => <div /> });
const LazyBorrowerJourney = dynamic(() => import("@/components/home_page/BorrowerJourney"), { ssr: false, loading: () => <div /> });
const LazyLendingJourney = dynamic(() => import("@/components/home_page/LendingJourney"), { ssr: false, loading: () => <div /> });
const LazyPotential = dynamic(() => import("@/components/home_page/Potential"), { ssr: false, loading: () => <div /> });

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
                    alt="CATCH UP WITH US AT THE 2025 CUES FUTURE SUMMIT (FEB 4-6) Experience the future of loan origination with Algebrik AI—built for speed, intelligence, and seamless borrower experiences. Bonus: Get an exclusive hands-on demo of the world's first cloud-native, AI-powered LOS, designed to simplify workflows and drive results for modern lenders!"
                    loading="lazy"
                    src="https://no-cache.hubspot.com/cta/default/47671281/interactive-184976867374.webp"
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
  const [showConversation, setShowConversation] = useState(false);
  const [showIntegrations, setShowIntegrations] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => setShowConversation(true));
        (window as any).requestIdleCallback(() => setShowIntegrations(true));
        (window as any).requestIdleCallback(() => setShowFooter(true));
      } else {
        setTimeout(() => setShowConversation(true), 500);
        setTimeout(() => setShowIntegrations(true), 700);
        setTimeout(() => setShowFooter(true), 900);
      }
    }
  }, []);

  return (
    <>
      <main className="overflow-x-hidden">
        <HeroSection />
        {/* <HubSpotPopup /> */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <FeaturesSection />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <LazyBorrowerJourney />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <LazyLendingJourney />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <LazyPotential />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <CardsContainer />
        </motion.div>
        <motion.div
          className="lg:py-20 py-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <CarouselSection
            data={[
              {
                image: "/team_images/david.webp",
                name: "David Libby",
                title: "Chief Executive Officer",
                place: "Town & Country FCU, Maine",
                // bio:"David Libby has worked at Town & Country Federal Credit Union for nearly 35 years and has been President & CEO since 2011. He has spearheaded Maine’s first contactless debit cards, Apple Pay, check-imaging ATMs, and even one of the nation’s earliest Alexa banking skills, all while fostering a “think-beyond-banking” culture.",
                // linkedin:"https://www.linkedin.com/in/david-libby-166a8310/"
              },
              {
                image: "/team_images/hina.webp",
                name: "Hina Khalid",
                title: "Chief Financial Officer",
                place: "Labor Credit Union, Washington",
                // bio:"Hina is an innovative financial leader with over 20 years of experience, currently serving as CFO at Labor Credit Union—where she also oversees HR, enterprise risk, compliance, and strategic partnerships. Hina is Vice Chair of the D.C. Chapter for the Maryland/D.C. Credit Union Association and a board member of DORA Financial, focused on expanding access to banking for low-income families.",
                // linkedin:"https://www.linkedin.com/in/hinakh/"
              },
              {
                image: "/team_images/leAnne.webp",
                name: "LeAnne Hixson",
                title: "Chief Lending Officer",
                place: "PFCU Credit Union, Michigan",
                // bio:"LeAnne Hixson is the Chief Lending Officer at PFCU Credit Union. She has twenty-five years of experience in the financial industry with a strong background in lending and loan product development. She is an integral part of the executive team and a recognized leader in the credit union community. LeAnne is a life-long Michigan resident who currently resides in Grand Ledge with her family.",
                // linkedin:"https://www.linkedin.com/in/leanne-hixson-87147768/"
              },
              {
                image: "/team_images/Michael.webp",
                name: "Michael Barnhardt Jr",
                title: "Chief Lending Officer",
                place: "Oklahoma Central Credit Union, Oklahoma",
                // bio:"Michael Barnhardt Jr. is Chief Lending Officer at Oklahoma Central Credit Union with 20+ years in lending strategy and analytics. An MBA/BS graduate of Western Governors University, he also heads the Meridian Trust NorthStar Foundation and advises Junior Achievement, CU 2.0, and Algebrik.",
                // linkedin:"https://www.linkedin.com/in/michael-barnhardt-jr-mba-5136b722/"
              },
              {
                image: "/team_images/michele.webp",
                name: "Michele Dean",
                title: "Chief Executive Officer",
                place: "Suffolk FCU, New York",
                // bio:"Michele Dean is President and CEO of Suffolk Federal Credit Union, with a background in executive strategy and lending at major financial institutions. She holds advanced finance and leadership credentials and serves on several industry and community boards. Recognized as a top business leader and influencer, Michele has received multiple accolades for her impact in finance and on Long Island.",
                // linkedin:"https://www.linkedin.com/in/micheledean/"
              },
              {
                image: "/team_images/SherryWu.webp",
                name: "Sherry Wu",
                title: "Chief Technology Officer",
                place: "University of Michigan Credit Union, Michigan",
                // bio:"Sherry Wu is the CTO of the University of Michigan Credit Union, guiding IT strategy after 25 years in leadership roles at IBM, Ford, and HPE and board service at People Driven CU. She holds an MBA from Michigan Ross and an MS in Computer Science from Eastern Michigan University.",
                // linkedin:"https://www.linkedin.com/in/xiang-wu/"
              },
              {
                image:"/team_images/Shirley.jpeg",
                name:"Shirley Senn",
                title:"Chief Community Development & Impact Officer",
                place:"New Orleans Firemen's Federal Credit Union",
                // bio:"Shirley is a Certified Credit Union Development Educator and passionate advocate for financial inclusion. With 30+ years of experience across fintech, credit union strategy, and nonprofit leadership, she brings a human-first lens to innovation and impact in community finance.",
                // linkedin:"https://www.linkedin.com/in/shirley-senn-cude-4395377/"
              },
              {
                image: "/team_images/se.webp",
                name: "Shad Edwards",
                title: "Chief Lending Officer",
                place: "MidWest America FCU, Indiana",
                // bio:"Shad Edwards is Chief Lending Officer at MidWest America FCU, Fort Wayne, IN, overseeing all lending operations. With 13 years as CLO and 16 years at the credit union, he previously served as VP of Commercial Banking in Northwest Ohio.",
                // linkedin:"https://www.linkedin.com/in/shad-edwards-3a08b3b/"
              },
              {
                image: "/team_images/travis.webp",
                name: "Travis Bow",
                title: "Chief Executive Officer",
                place: "University of Hawaii FCU, Hawaii",
                // bio:"Travis Bow is President and CEO of the University of Hawaii Federal Credit Union (UHFCU), Hawaii’s fifth largest credit union with $618 million in assets. He brings 17 years of experience at UHFCU, including as Vice President of Member Support, and is dedicated to member service and operational excellence. A University of Hawaii graduate, Bow is committed to the community and leading UHFCU’s continued growth.",
                // linkedin:"https://www.linkedin.com/in/travis-b-2a04
              },
            ]}
            autoScroll
            headerText={
              <>
                <div className="hidden md:flex flex-col">
                  <span>Guided by the</span>
                  <span>Best in the Field</span>
                </div>
                <div className="block md:hidden">
                  Guided by the best in the Field
                </div>
              </>
            }
            subtitleText="Our Advisory Board brings together industry leaders and visionaries, guiding Algebrik AI with strategic insights, deep expertise, and a shared commitment to transforming lending into a seamless and inclusive experience."
          />
        </motion.div>
        {showIntegrations && <LazyIntegrationsSection />}
        {showFooter && <LazyFooterCards />}
        {/* <ConvoaiWidget/> */}
        {/* <elevenlabs-convai agent-id="agent_01jwdd48b1e17rkf0dngh470mv" />
        <Script
          src="https://unpkg.com/@elevenlabs/convai-widget-embed"
          strategy="afterInteractive"
        /> */}
      </main>
    </>
  );
}

