"use client";

import { motion, Transition, useReducedMotion } from "framer-motion";
import Image from "next/image";

const modules = [
  {
    title: "Digital Account Opening (DAO)",
    points: [
      {
        label: "AI Identity Verifier",
        description:
          "Auto-verifies member documents and KYC signals using image recognition and pattern matching; flags anomalies in real time.",
      },
      {
        label: "Smart Prefill Engine",
        description:
          "Uses existing CU data and member behavior to pre-populate applications, reducing friction and abandonment.",
      },
    ],
  },
  {
    title: "Lender's Cockpit (LOS)",
    points: [
      {
        label: "AI Takeover",
        description:
          "Executes deterministic tasks and provides confidence-based recommendations for probabilistic cases - Loan Officer decides next.",
      },
      {
        label: "AI Loan Officer",
        description:
          "A voice-enabled Agentic AI that handles borrower calls, answers queries, and fills applications directly into Algebrik One through APIs.",
      },
    ],
  },
  {
    title: "Decision Engine",
    points: [
      {
        label: "No-code Model Deployer",
        description:
          "Empowers non-technical users to deploy ML scorecards and run Champion-Challenger strategies in minutes.",
      },
      {
        label: "Confidence Scoring & Auto-Override Logic",
        description:
          "System self-evaluates decision confidence; escalates borderline cases automatically.",
      },
    ],
  },
  {
    title: "Portfolio Analytics",
    points: [
      {
        label: "Predictive Risk Monitor",
        description:
          "Detects early delinquency signals from portfolio data and alerts underwriting teams.",
      },
      {
        label: "AI Performance Loop",
        description:
          "Continuously retrains models using outcomes to refine lending strategy accuracy over time.",
      },
    ],
  },
];

const AgenticAISection = () => {
  const prefersReducedMotion = useReducedMotion();
  const transition: Transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.6, ease: "easeOut" };

  return (
    <section className="w-full px-4 md:px-8 py-16 md:pb-24 font-plus-jakarta">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transition}
          viewport={{ once: false, amount: 0.2 }}
          className="relative rounded-[48px]  text-white px-6 pt-6 pb-6 md:px-16 md:pt-8 md:pb-16 shadow-[0_40px_90px_rgba(15,35,92,0.45)]"
        style={{
          background: "radial-gradient(circle, #7EB2FF 0%, #043071 100%)",
        }}
        >
          <div className="absolute inset-x-10 -top-24 h-60 bg-[#92C7FF]/25 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute inset-x-6 md:inset-x-12 inset-y-10 rounded-[40px] pointer-events-none" />

          <div className="flex flex-col gap-1 text-center">
            <div className="mx-auto inline-flex items-center inset-[18px] border-[2px] border-white/12 gap-2 rounded-full bg-gradient-to-r from-[#0A8CFF] via-[#9929EF] to-[#F22E9A] px-6 py-[16px] text-xs md:text-xl font-plus-jakarta font-semibold text-white shadow-[0_12px_35px_rgba(122,123,255,0.45)]">
              <Image src="/icons/pahiw/pai.svg" alt="Agentic AI" width={24} height={24} />
              <span>Powered by Agentic AI</span>
            </div>

            <div>
              <h2 className="text-[28px] md:text-[40px] font-plus-jakarta font-bold">
                AI, Everywhere It Matters.
              </h2>
              <p className="mt-4 text-[16px] md:text-[20px] font-plus-jakarta text-white/80 max-w-4xl mx-auto">
                From onboarding to analytics, Agentic AI powers every module of Algebrik One - automating what's repetitive, assisting where judgment is needed, and learning from every decision.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {modules.map((module, index) => (
              <div
                key={module.title}
                className={`relative rounded-[32px] p-6 md:p-8 hover:bg-[#001637] bg-[#03204B] shadow-[0_18px_40px_rgba(6,18,53,0.45)] transition-transform duration-300 hover:-translate-y-1 
                  border-[6px] border-[#03204B] hover:border-[#71B7FF] hover:shadow-[0_25px_55px_rgba(71,159,255,0.45)]
                }`}
              >
                <div className="absolute inset-0 rounded-[32px] border border-white/5 pointer-events-none" />
                <h3 className="text-[20px] md:text-[20px] font-plus-jakarta font-bold text-white mb-6">
                  {module.title}
                </h3>
                <div className="space-y-5">
                  {module.points.map((point) => (
                    <div key={point.label} className="space-y-1">
                      <h4 className="text-[12px] md:text-[14px] font-extrabold font-plus-jakarta uppercase tracking-[2px] text-[#7CB2FF]">
                        {point.label}
                      </h4>
                      <p className="text-[14px] md:text-[15px] font-plus-jakarta text-[#fff]/50 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AgenticAISection;

