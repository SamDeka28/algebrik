"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CustomHeader } from "../CustomHeader";

export default function LoanLifecycle() {
  const cardData = [
    { title: "Verification", image: "/section_images/loan.png" },
    { title: "Decisioning", image: "/section_images/loan.png" },
    { title: "AI-Powered", image: "/section_images/loan.png" },
    { title: "Onboarding", image: "/section_images/loan.png" },
    { title: "Origination", image: "/section_images/loan.png" },
    { title: "Closing", image: "/section_images/loan.png" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollLocked, setScrollLocked] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const body = document.body;
    const section = sectionRef.current;

    const handleScroll = (e: WheelEvent) => {
      if (!scrollLocked) return;

      e.preventDefault();

      const direction = e.deltaY > 0 ? 1 : -1;
      const newIndex = activeIndex + direction;

      // Move to the next or previous card based on the scroll direction
      if (newIndex >= 0 && newIndex < cardData.length) {
        setActiveIndex(newIndex);
      }

      // Unlock scroll when reaching the last or first card
      if (newIndex < 0 || newIndex >= cardData.length) {
        setScrollLocked(false);
        body.style.overflow = "auto"; // Unlock scroll for the body
      }
    };

    const handleWindowScroll = () => {
      if (!section) return;

      const { top, bottom } = section.getBoundingClientRect();

      // Lock scroll when reaching the section
      if (top <= 0 && bottom >= window.innerHeight) {
        if (!scrollLocked) {
          setScrollLocked(true);
          body.style.overflow = "hidden"; // Lock body scroll
        }
      } else if (scrollLocked) {
        setScrollLocked(false);
        body.style.overflow = "auto"; // Unlock body scroll
      }
    };

    // Listen for scroll events
    window.addEventListener("scroll", handleWindowScroll);
    window.addEventListener("wheel", handleScroll, { passive: false });

    // Cleanup event listeners
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("wheel", handleScroll);
      body.style.overflow = "auto"; // Reset overflow style
    };
  }, [activeIndex, scrollLocked]);

  return (
    <section
      ref={sectionRef}
      id="loan-lifecycle-section"
      style={{
        height: scrollLocked ? "100vh" : "auto",
        zIndex: 1000,
        transition: "transform 0.3s ease-out", // Smooth scroll transition
      }}
      className="container pt-[108px] mx-auto flex flex-col items-center justify-between gap-[48px] relative"
    >
      <CustomHeader className="text-center" text="Reimagining the Loan Lifecycle, End to End" />

      <motion.div
        className="container px-[25px] py-[4px] md:w-[1013px] md:h-[44px] bg-white flex justify-between items-center rounded-[36px] drop-shadow-[0_0_60px_rgba(0,0,0,0.25)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {cardData.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-row gap-[8px] items-center"
            initial={{ opacity: 0.5 }}
            animate={{
              opacity: index === activeIndex ? 1 : 0.5,
              scale: index === activeIndex ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <Image src="/icons/check.png" width={16.67} height={16.67} alt="check" />
            <div
              className={`${
                index === activeIndex ? "bg-blue-500 text-white" : "bg-transparent"
              } px-2 py-1 rounded-full transition-all duration-300`}
            >
              {item.title}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="md:w-[1096px] md:h-[526px] rounded-[42px] overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        key={cardData[activeIndex].image}
      >
        <motion.div
          key={cardData[activeIndex].title}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={cardData[activeIndex].image}
            width={1096}
            height={526}
            alt={cardData[activeIndex].title}
            className="rounded-[42px]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
