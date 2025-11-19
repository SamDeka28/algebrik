"use client";

import Image from "next/image";
import { motion, Transition, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export default function OperatingSystemSection() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const transition: Transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.6, ease: "easeOut" };

  return (
    <motion.section
      initial={{ y: 30, opacity: 0 }}
      transition={transition}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      className="w-full bg-white py-16 md:py-24 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left Side - Text Content */}
          <div className="flex-1 flex flex-col gap-6 md:gap-8">
            <h2 className="text-[32px] md:text-[40px] lg:text-[40px] font-plus-jakarta font-bold text-[#2A5FAC] leading-tight">
              More than an LOS. The Operating System for Modern Lending.
            </h2>
            
            <div className="flex flex-col text-[#606060] text-[16px] md:text-[20px] font-plus-jakarta leading-relaxed">
              <p>
                Legacy systems were built to process loans. Algebrik One was built to orchestrate experiences.
              </p>
              <p>
                It connects every step of the journey - from account opening to funding and analytics, so lenders can work smarter, move faster, and serve members better.
              </p>
              <p className="mt-6 font-bold">
                Powered by Agentic AI, it learns and adapts across every stage - something traditional LOS platforms were never designed to do.
              </p>
            </div>

            <div className="mt-6">
              <button
                onClick={() => {
                  // Scroll to modules section
                  const modulesSection = document.getElementById("five-modules");
                  if (modulesSection) {
                    modulesSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="bg-gradient-to-r from-[#1C8DEA] to-[#195BD7] text-white font-bold py-3 px-8 text-[14px] md:text-[14px] rounded-full hover:opacity-90 transition-opacity w-full md:w-auto font-plus-jakarta"
              >
                Explore Modules
              </button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex-1 flex justify-center items-center relative">
            <div className="relative w-full max-w-[500px] md:max-w-[600px]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full blur-3xl opacity-50 -z-10"></div>
              <Image
                src="/assets/a1.png"
                alt="Algebrik One Operating System"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

