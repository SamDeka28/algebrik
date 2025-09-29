"use client";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import { useState } from "react";
import Contact from "../contacts";

const timelineData = [
  {
    number: "1",
    title: "Assessment",
    description: [
      "Map current workflows, decisioning rules, and vendor dependencies.",
      "Identify quick wins and gaps."
    ],
    icon: "/icons/das1.svg",
    side: "right"
  },
  {
    number: "2",
    title: "Proof-of-Value",
    description: [
      "Replicate 2-3 high-impact strategies in Algebrik",
      "Show real-time results alongside your existing LOS"
    ],
    icon: "/icons/das3.svg",
    side: "left"
  },
  {
    number: "3",
    title: "Rollout",
    description: [
      "Parallel run to minimize risk",
      "Phased adoption (Decisioning first, then LOS + POS + Analytics)"
    ],
    icon: "/icons/das2.svg",
    side: "right"
  }
];

export default function SwitchingSection() {
  const isMobile = useIsMobile();
  const [showContactModal, setShowContactModal] = useState(false);

  const baseMotion = {
    initial: isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: isMobile ? 0.01 : 0.6, ease: "easeOut" },
    viewport: { once: false, amount: 0.2 },
  } as const;

  return (
    <section className="py-20 font-plus-jakarta">
      <div className="container relative opacity-[30%] -z-20">
        <motion.div
          className="absolute top-20 md:left-[296px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full md:w-[861.73px] md:h-[239.68px] blur-[100px]"
          animate={{
            y: [50, 30, 50],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-20 md:left-[20px] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full md:w-[796.91px] md:h-[280.03px] blur-[100px] -z-10"
          animate={{
            y: [50, 30, 60],
          }}
          transition={{
            duration: 2,
            delay: 0.2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-56 bg-[#BE95FF] rounded-full md:w-[1226.24px] md:h-[239.68px] blur-[100px] z-[-1]"
          animate={{
            y: [10, 90, 0],
          }}
          transition={{
            duration: 2,
            delay: 0.4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div {...baseMotion} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#2a5fac] mb-6 font-plus-jakarta">
            Switching doesn't have to be painful
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto font-plus-jakarta">
            We make it easy to move from legacy LOS to Algebrik - with a parallel run, phased rollout, and zero downtime.
          </p>
        </motion.div>

        <motion.div {...baseMotion} className="relative">
          {/* Timeline Container */}
          <div className="relative max-w-4xl mx-auto">
            {/* Central Timeline Line */}
            <div
              className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-[6px] h-full"
              style={{
                background: 'linear-gradient(180deg, rgba(198, 215, 240, 0) 0%, #C6D7F0 20%, #C6D7F0 80%, rgba(198, 215, 240, 0) 100%)'
              }}
            ></div>

            {/* Timeline Items */}
            <div className="space-y-16">
              {timelineData.map((step, index) => (
                <div key={index} className="relative flex items-center">
                  {/* Timeline Circle */}
                  <div className={`hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-10 h-10 ${index == 0 ? "bg-gradient-to-tr from-[#1C8DEA] to-[#195BD7] border-4 border-white text-white" : "bg-white text-[#2A5FAC]"} rounded-full items-center justify-center  font-bold text-xl font-plus-jakarta shadow-lg z-10 ${step.side === 'left' ? 'bg-[#EFF6FC]' : ''}`}>
                    {step.number}
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-6/12 ${step.side === 'left' ? 'md:pr-10' : 'md:pl-10 md:ml-auto'
                    }`}>
                    <div className="bg-white rounded-2xl  flex gap-5 p-5 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                      <div className={`flex items-center gap-4 mb-4`}>
                        <Image src={step.icon} alt={step.title} width={64} height={64} className="min-w-16 min-h-16 max-w-16 max-h-16 w-16 h-16" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-[#2a5fac] font-plus-jakarta">{step.title}</h3>
                        <ul className="space-y-2">
                          {step.description.map((item, i) => (
                            <li key={i} className="text-gray-600 font-plus-jakarta text-sm flex items-start">
                              <span className="w-2 h-2 bg-[#666] rounded-full flex-shrink-0 mt-2 mr-3"></span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Cards - No Timeline
          <div className="lg:hidden space-y-6">
            {timelineData.map((step, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-[#2a5fac] rounded-full flex items-center justify-center text-white font-bold text-xl font-plus-jakarta">
                    {step.number}
                  </div>
                  <div className="flex items-center gap-3">
                    <Image src={step.icon} alt={step.title} width={48} height={48} className="w-12 h-12" />
                    <h3 className="text-xl font-bold text-[#2a5fac] font-plus-jakarta">{step.title}</h3>
                  </div>
                </div>
                <ul className="space-y-2 pl-4">
                  {step.description.map((item, i) => (
                    <li key={i} className="text-gray-600 font-plus-jakarta text-sm flex items-start">
                      <span className="w-2 h-2 bg-[#2a5fac] rounded-full flex-shrink-0 mt-2 mr-3"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div> */}

          <div className="text-center mt-12">
            <button 
              onClick={() => setShowContactModal(true)}
              className="bg-gradient-to-r from-[#1C8DEA] to-[#195BD7] text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all font-plus-jakarta"
            >
              Get my Migration Plan
            </button>
          </div>
        </motion.div>
      </div>
      <Contact open={showContactModal} onClose={() => setShowContactModal(false)} />
    </section>
  );
}

