"use client";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export default function SwitchingSection() {
  const isMobile = useIsMobile();

  const baseMotion = {
    initial: isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: isMobile ? 0.01 : 0.6, ease: "easeOut" },
    viewport: { once: false, amount: 0.2 },
  } as const;

  return (
    <section className="py-20 bg-white font-plus-jakarta">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div {...baseMotion} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#2a5fac] mb-6 font-plus-jakarta">
            Switching doesn't have to be painful
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto font-plus-jakarta">
            We make it easy to move from legacy LOS to Algebrik - with a parallel run, phased rollout, and zero downtime.
          </p>
        </motion.div>

        <motion.div {...baseMotion} className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {[
              {
                number: "1",
                title: "Assessment",
                description: "Map current workflows, decisioning rules, and vendor dependencies. Identify quick wins and gaps.",
                icon: "assessment"
              },
              {
                number: "2", 
                title: "Proof-of-Value",
                description: "Replicate 2-3 high-impact strategies in Algebrik. Show real-time results alongside your existing LOS.",
                icon: "proof"
              },
              {
                number: "3",
                title: "Rollout", 
                description: "Parallel run to minimize risk. Phased adoption (Decisioning first, then LOS + POS + Analytics).",
                icon: "rollout"
              }
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-6 relative">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-[#2a5fac] rounded-full flex items-center justify-center text-white font-bold text-xl font-plus-jakarta">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#2a5fac] mb-3 font-plus-jakarta">{step.title}</h3>
                  <p className="text-gray-600 text-lg font-plus-jakarta">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute left-8 mt-16 w-0.5 h-16 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-[#2a5fac] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1e4a8a] transition-colors font-plus-jakarta">
              Get my Migration Plan
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
