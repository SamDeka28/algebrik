"use client";
import HeroSection from "@/components/home_page/HeroSection";
import CardsContainer from "@/components/card";
import FooterCards from "@/components/FooterCards";
import LendingJourney from "@/components/home_page/LendingJourney";
import Potential from "@/components/home_page/Potential";
import IntegrationsSection from "@/components/home_page/IntegrationsSection";
import FeaturesSection from "@/components/home_page/FeaturesSection";
import BorrowerJourney from "@/components/home_page/BorrowerJourney";

import { useConversation } from '@elevenlabs/react';


import React, { useEffect, useState, useCallback } from 'react';
import Script from "next/script";
import { motion, AnimatePresence } from 'framer-motion';
import CarouselSection from "@/components/about_page/CarouselSection";
import dynamic from "next/dynamic";

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
        <FeaturesSection />
        <LazyBorrowerJourney />
        <LazyLendingJourney />
        <LazyPotential />
        <CardsContainer />
        <div className="lg:py-20 py-10">
          <CarouselSection
            data={[
              {
                image: "/team_images/Michael.webp",
                name: "Michael Barnhardt Jr",
                title: "Chief Lending Officer",
                place: "Oklahoma Central Credit Union, Oklahoma",
              },
              {
                image: "/team_images/SherryWu.webp",
                name: "Sherry Wu",
                title: "Chief Technology Officer",
                place: "University of Michigan Credit Union, Michigan",
              },
              {
                image: "/team_images/michele.webp",
                name: "Michele Dean",
                title: "Chief Executive Officer",
                place: "Suffolk FCU, New York",
              },
              {
                image: "/team_images/travis.webp",
                name: "Travis Bow",
                title: "Chief Executive Officer",
                place: "University of Hawaii FCU, Hawaii",
              },
              {
                image: "/team_images/leAnne.webp",
                name: "LeAnne Hixson",
                title: "Chief Lending Officer",
                place: "PFCU Credit Union, Michigan",
              },
              {
                image: "/team_images/david.webp",
                name: "David Libby",
                title: "Chief Executive Officer",
                place: "Town & Country FCU, Maine",
              },
              {
                image: "/team_images/se.webp",
                name: "Shad Edwards",
                title: "Chief Lending Officer",
                place: "MidWest America FCU, Indiana",
              },
              {
                image: "/team_images/hina.webp",
                name: "Hina Khalid",
                title: "Chief Financial Officer",
                place: "Labor Credit Union, Washington",
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
        </div>
        {showIntegrations && <LazyIntegrationsSection />}
        {showFooter && <LazyFooterCards />}
        {showConversation && <Conversation />}
        {/* <elevenlabs-convai agent-id="agent_01jwdd48b1e17rkf0dngh470mv" />
        <Script
          src="https://unpkg.com/@elevenlabs/convai-widget-embed"
          strategy="afterInteractive"
        /> */}
      </main>
    </>
  );
}


function Conversation() {
  const [showTerms, setShowTerms] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [showWidget, setShowWidget] = useState(true);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [micMuted, setMicMuted] = useState(false);
  const conversation = useConversation({
    micMuted,
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
  });

  // On mount, check if terms were already accepted
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('convai-terms-accepted') === 'true') {
      setAccepted(true);
    }
  }, []);

  const startConversation = useCallback(async () => {
    if (accepted) {
      setShowWidget(false);
      setTimeout(async () => {
        setShowWidget(true);
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          setMediaStream(stream);
          setMicMuted(false);
          await conversation.startSession({
            agentId: 'agent_01jwdd48b1e17rkf0dngh470mv',
          });
        } catch (error) {
          console.error('Failed to start conversation:', error);
        }
      }, 200); // short delay for animation
    } else {
      setShowTerms(true);
    }
  }, [accepted, conversation]);

  const acceptTerms = useCallback(async () => {
    setShowTerms(false);
    setAccepted(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('convai-terms-accepted', 'true');
    }
    setShowWidget(false);
    setTimeout(async () => {
      setShowWidget(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMediaStream(stream);
        setMicMuted(false);
        await conversation.startSession({
          agentId: 'agent_01jwdd48b1e17rkf0dngh470mv',
        });
      } catch (error) {
        console.error('Failed to start conversation:', error);
      }
    }, 200);
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    setShowWidget(false);
    setTimeout(async () => {
      setShowWidget(true);
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        setMediaStream(null);
        setMicMuted(false);
      }
      await conversation.endSession();
      setAccepted(true); // keep accepted true so terms don't show again
    }, 200);
  }, [conversation, mediaStream]);

  // Mic mute/unmute toggle at browser level
  const toggleMic = useCallback(() => {
    if (mediaStream) {
      const audioTrack = mediaStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setMicMuted(!audioTrack.enabled);
      }
    }
  }, [mediaStream]);

  return (
    <>
      {/* Animated Terms Modal */}
      <AnimatePresence>
        {showTerms && (
          <motion.div
            className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/40 backdrop-blur-sm text-[#000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl absolute bottom-10 right-4 border border-gray-100"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <h2 className="text-lg font-bold mb-2">Terms and conditions</h2>
              <p className="text-sm mb-4">
                By clicking "Agree," and each time I interact with this AI agent, I consent to the recording, storage, and sharing of my communications with third-party service providers, and as described in the Privacy Policy. If you do not wish to have your conversations recorded, please refrain from using this service.
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-4 py-2 text-sm rounded-3xl bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                  onClick={() => setShowTerms(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm rounded-3xl bg-black text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black transition"
                  onClick={acceptTerms}
                >
                  Accept
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Widget */}
      <div
        className="fixed bottom-10 font-plus-jakarta right-4 rounded-full flex items-center p-2.5 bg-white shadow-2xl pointer-events-auto overflow-hidden w-fit z-50 border border-gray-100"
      >
        <motion.div
          className="relative shrink-0 w-10 h-10 mx-1 shadow-md rounded-full border border-gray-200  bg-[#2a5fac] bg-[url('/logo.png')] bg-center bg-no-repeat bg-contain"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
        >
          {/* <img
            src="/logo.webp"
            alt="algebrik"
            className="w-full object-contain"
          /> */}
        </motion.div>
        <AnimatePresence mode="wait">
          {conversation.status !== 'connected' ? (
            <motion.button
              key="start"
              type="button"
              aria-label="Start a call"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black transition ml-2 shadow-sm"
              onClick={startConversation}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <svg height="1em" width="1em" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3.7489 2.25C2.93286 2.25 2.21942 2.92142 2.27338 3.7963C2.6686 10.2041 7.79483 15.3303 14.2026 15.7255C15.0775 15.7795 15.7489 15.066 15.7489 14.25V11.958C15.7489 11.2956 15.3144 10.7116 14.6799 10.5213L12.6435 9.91035C12.1149 9.75179 11.542 9.89623 11.1518 10.2864L10.5901 10.8482C9.15291 10.0389 7.95998 8.84599 7.15074 7.40881L7.71246 6.84709C8.10266 6.45689 8.24711 5.88396 8.08854 5.35541L7.47761 3.31898C7.28727 2.6845 6.70329 2.25 6.04087 2.25H3.7489Z"></path></svg>
              Start a call
            </motion.button>
          ) : (
            <motion.div className="flex gap-2 ml-2" key="end-mic"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <motion.button
                type="button"
                aria-label="End"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-300 text-black text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition shadow-sm"
                onClick={stopConversation}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg height="1em" width="1em" viewBox="0 0 19 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.0303 3.53033C16.3232 3.23744 16.3232 2.76256 16.0303 2.46967C15.7374 2.17678 15.2626 2.17678 14.9697 2.46967L8.6271 8.81224C8.25925 8.3778 7.93185 7.90804 7.65074 7.40881L8.21246 6.84709C8.60266 6.45689 8.74711 5.88396 8.58854 5.35541L7.97761 3.31898C7.78727 2.6845 7.20329 2.25 6.54087 2.25H4.2489C3.43286 2.25 2.71942 2.92142 2.77338 3.7963C2.95462 6.73468 4.13069 9.40357 5.96899 11.4703L2.96967 14.4697C2.67678 14.7626 2.67678 15.2374 2.96967 15.5303C3.26256 15.8232 3.73744 15.8232 4.03033 15.5303L16.0303 3.53033Z"></path><path d="M14.7026 15.7255C12.2994 15.5773 10.0765 14.7636 8.21584 13.4665L10.9278 10.7545C10.9815 10.7863 11.0356 10.8175 11.0901 10.8482L11.6518 10.2864C12.042 9.89623 12.6149 9.75179 13.1435 9.91035L15.1799 10.5213C15.8144 10.7116 16.2489 11.2956 16.2489 11.958V14.25C16.2489 15.066 15.5775 15.7795 14.7026 15.7255Z"></path></svg>
                End
              </motion.button>
              <motion.button
                type="button"
                aria-label={micMuted ? 'Unmute microphone' : 'Mute microphone'}
                className={`flex items-center justify-center w-9 h-9 rounded-full border ${micMuted ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-300 bg-white text-black'} hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition shadow-sm`}
                onClick={toggleMic}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.97 }}
              >
                {micMuted ? (
                  <svg height="1em" width="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10 14a4 4 0 0 0 4-4V7a4 4 0 1 0-8 0v3a4 4 0 0 0 4 4zm5-4a1 1 0 1 1 2 0 6 6 0 0 1-6 6v2a1 1 0 1 1-2 0v-2a6 6 0 0 1-6-6 1 1 0 1 1 2 0 4 4 0 0 0 8 0z" /><line x1="4" y1="4" x2="16" y2="16" stroke="red" strokeWidth="2" /></svg>
                ) : (
                  <svg height="1em" width="1em" viewBox="0 0 19 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9.50008 1.5C7.42901 1.5 5.75008 3.17893 5.75008 5.25V8.25C5.75008 10.3211 7.42901 12 9.50008 12C11.5712 12 13.2501 10.3211 13.2501 8.25V5.25C13.2501 3.17893 11.5712 1.5 9.50008 1.5Z"></path><path d="M4.88997 10.8417C4.66448 10.4943 4.20002 10.3954 3.85256 10.6209C3.50509 10.8463 3.40621 11.3108 3.63169 11.6583C4.47442 12.9569 6.08493 14.6838 8.75008 14.9616V15.75C8.75008 16.1642 9.08587 16.5 9.50008 16.5C9.9143 16.5 10.2501 16.1642 10.2501 15.75V14.9616C12.9152 14.6838 14.5257 12.9569 15.3685 11.6583C15.594 11.3108 15.4951 10.8463 15.1476 10.6209C14.8001 10.3954 14.3357 10.4943 14.1102 10.8417C13.3305 12.0432 11.9002 13.5 9.50008 13.5C7.1 13.5 5.66968 12.0432 4.88997 10.8417Z"></path></svg>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

