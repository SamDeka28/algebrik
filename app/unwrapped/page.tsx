"use client";
import { HeroSection } from "@/components/unwrapped/sections/HeroSection";
import { WhatChangedSection } from "@/components/unwrapped/sections/WhatChangedSection";
import { LendingUnwrappedSection } from "@/components/unwrapped/sections/LendingUnwrappedSection";
import { WowMomentSection } from "@/components/unwrapped/sections/WowMomentSection";
import { EcosystemSection } from "@/components/unwrapped/sections/EcosystemSection";
import { VoicesSection } from "@/components/unwrapped/sections/VoicesSection";
import { RecognitionSection } from "@/components/unwrapped/sections/RecognitionSection";
import { ClientProofSection } from "@/components/unwrapped/sections/ClientProofSection";
import { AlgebrikOneSection } from "@/components/unwrapped/sections/AlgebrikOneSection";
import { AIDoneRightSection } from "@/components/unwrapped/sections/AIDoneRightSection";
import { BelongingSection } from "@/components/unwrapped/sections/BelongingSection";
import { FinalSection } from "@/components/unwrapped/sections/FinalSection";
import { StoryProgress } from "@/components/unwrapped/StoryProgress";
import { useEffect, useRef } from "react";

export default function UnwrappedPage() {
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const mouseYRef = useRef(0);

  useEffect(() => {
    // Force dark theme for unwrapped page
    const root = document.documentElement;
    const body = document.body;
    
    root.classList.add("dark");
    body.classList.add("unwrapped-page");
    
    // Prevent body scroll when using fixed container
    body.style.overflow = "hidden";
    
    // Set dark theme colors
    root.style.setProperty("--background", "240 10% 3%");
    root.style.setProperty("--foreground", "45 10% 96%");
    root.style.setProperty("--primary", "38 92% 55%");
    root.style.setProperty("--primary-foreground", "240 10% 3%");
    root.style.setProperty("--card", "240 8% 6%");
    root.style.setProperty("--card-foreground", "45 10% 96%");
    root.style.setProperty("--secondary", "240 6% 10%");
    root.style.setProperty("--secondary-foreground", "45 10% 85%");
    root.style.setProperty("--muted", "240 6% 12%");
    root.style.setProperty("--muted-foreground", "240 5% 50%");
    root.style.setProperty("--accent", "32 95% 50%");
    root.style.setProperty("--accent-foreground", "240 10% 3%");
    root.style.setProperty("--border", "240 6% 15%");
    
    // Navbar visibility control
    let isNavbarVisible = true;
    const NAVBAR_HIDE_DELAY = 2000; // 2 seconds of inactivity
    
    // Find navbar - it's the nav element with fixed positioning at top
    const findNavbar = () => {
      // Try to find the nav element with fixed top positioning
      const navs = document.querySelectorAll('nav');
      for (const nav of Array.from(navs)) {
        const classes = nav.className;
        if (classes.includes('fixed') && classes.includes('top')) {
          return nav as HTMLElement;
        }
      }
      // Fallback to first nav element
      return document.querySelector('nav') as HTMLElement;
    };
    
    const showNavbar = () => {
      const nav = findNavbar();
      if (nav) {
        nav.style.opacity = "1";
        nav.style.pointerEvents = "auto";
        nav.style.transform = "translateY(0)";
        nav.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        isNavbarVisible = true;
      }
      // Clear inactivity timer
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }
    };
    
    const hideNavbar = () => {
      if (!isNavbarVisible) return;
      
      const nav = findNavbar();
      if (nav) {
        nav.style.opacity = "0";
        nav.style.pointerEvents = "none";
        nav.style.transform = "translateY(-20px)";
        nav.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        isNavbarVisible = false;
      }
    };
    
    const resetInactivityTimer = () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      inactivityTimerRef.current = setTimeout(() => {
        // Only hide if scrolled past first section
        const scrollContainer = document.querySelector('main.snap-scroll-container') as HTMLElement;
        if (scrollContainer && scrollContainer.scrollTop > 100) {
          hideNavbar();
        }
      }, NAVBAR_HIDE_DELAY);
    };
    
    // Scroll handler
    const handleScroll = () => {
      const scrollContainer = document.querySelector('main.snap-scroll-container') as HTMLElement;
      if (!scrollContainer) return;
      
      const scrollTop = scrollContainer.scrollTop;
      
      // Show navbar in first section (top 100px)
      if (scrollTop < 100) {
        showNavbar();
      } else {
        // Hide navbar when scrolled past first section
        hideNavbar();
        resetInactivityTimer();
      }
    };
    
    // Mouse movement handler - show navbar on any mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseYRef.current = e.clientY;
      
      // Show navbar on any mouse movement (if scrolled past first section)
      const scrollContainer = document.querySelector('main.snap-scroll-container') as HTMLElement;
      if (scrollContainer && scrollContainer.scrollTop > 100) {
        showNavbar();
        resetInactivityTimer();
      }
    };
    
    // Mouse leave handler (when mouse leaves viewport)
    const handleMouseLeave = () => {
      const scrollContainer = document.querySelector('main.snap-scroll-container') as HTMLElement;
      if (scrollContainer && scrollContainer.scrollTop > 100) {
        resetInactivityTimer();
      }
    };
    
    // Initial setup - show navbar
    showNavbar();
    
    // Event listeners
    const scrollContainer = document.querySelector('main.snap-scroll-container') as HTMLElement;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    }
    
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    
    // Initial check
    handleScroll();
    
    return () => {
      root.classList.remove("dark");
      body.classList.remove("unwrapped-page");
      body.style.overflow = "";
      
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      
      const container = document.querySelector('main.snap-scroll-container') as HTMLElement;
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      
      // Reset navbar styles
      const nav = findNavbar();
      if (nav) {
        nav.style.opacity = "";
        nav.style.pointerEvents = "";
        nav.style.transform = "";
        nav.style.transition = "";
      }
    };
  }, []);

  return (
    <div className="unwrapped-page bg-[hsl(240_10%_3%)] text-[hsl(45_10%_96%)] overflow-x-hidden antialiased fixed inset-0 snap-scroll-container">
      <main className="relative h-full overflow-y-scroll snap-scroll-container">
        <StoryProgress />
        <div className="noise-overlay" />
        <div className="snap-section">
          <HeroSection />
        </div>
        <div className="snap-section">
          <WhatChangedSection />
        </div>
        <div className="snap-section">
          <LendingUnwrappedSection />
        </div>
        <div className="snap-section">
          <WowMomentSection />
        </div>
        <div className="snap-section">
          <EcosystemSection />
        </div>
        <div className="snap-section">
          <VoicesSection />
        </div>
        <div className="snap-section">
          <RecognitionSection />
        </div>
        <div className="snap-section">
          <ClientProofSection />
        </div>
        <div className="snap-section">
          <AlgebrikOneSection />
        </div>
        <div className="snap-section">
          <AIDoneRightSection />
        </div>
        <div className="snap-section">
          <BelongingSection />
        </div>
        <div className="snap-section">
          <FinalSection />
        </div>
      </main>
    </div>
  );
}

