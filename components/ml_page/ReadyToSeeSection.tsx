"use client";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ReadyToSeeSection() {
  const isMobile = useIsMobile();

  const baseMotion = {
    initial: isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: isMobile ? 0.01 : 0.6, ease: "easeOut" },
    viewport: { once: false, amount: 0.2 },
  } as const;

  return (
    <section className="py-20 w-full font-plus-jakarta bg-[#EBEEF5]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div {...baseMotion} className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-[#2a5fac] mb-6 font-plus-jakarta">
            Ready to see the modern alternative?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 font-plus-jakarta">
            Algebrik unifies Account Opening, POS, LOS, Decisioning, and Analytics into one agentic AI-powered platform - built for Personal, Auto, Credit Card, and HELOC lending.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a target="_blank" href="/lending-health-check" className="bg-gradient-to-r from-[#1C8DEA] to-[#195BD7] text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all font-plus-jakarta">
              Check how my stack compares
            </a>
            <a target="_blank" href="/solutions/lender-cockpit" className="border-2 rounded-full border-[#2a5fac] text-[#2a5fac] px-8 py-4 font-semibold hover:bg-[#2a5fac] hover:text-white transition-colors font-plus-jakarta">
              Self-paced Demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
