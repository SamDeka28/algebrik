"use client";

import { motion, Transition, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const timelineSteps = [
  {
    number: "1",
    title: "Borrower applies",
    description:
      "Frictionless application across web, mobile, or branch – members onboard in under 3 minutes.",
    align: "right" as const,
    icon: "/icons/pahiw/ba.svg",
  },
  {
    number: "2",
    title: "AI checks & underwriting",
    description:
      "Agentic AI and no-code rules automate verification and risk checks – underwriting time cut by 40%.",
    align: "left" as const,
    icon: "/icons/pahiw/ai.svg",
  },
  {
    number: "3",
    title: "Instant decision",
    description:
      "Decisions delivered in seconds – so funding can begin the same day.",
    align: "right" as const,
    icon: "/icons/pahiw/id.svg",
  },
  {
    number: "4",
    title: "Funding / disbursement",
    description:
      "One-click disbursement ensures funds reach the borrower seamlessly.",
    align: "left" as const,
    icon: "/icons/pahiw/fd.svg",
  },
  {
    number: "5",
    title: "Analytics & portfolio insight",
    description:
      "Continuous intelligence and monitoring unlock predictive insights for future success.",
    align: "right" as const,
    icon: "/icons/pahiw/api.svg",
  },
];

const HowItWorksSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const elementRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const transition: Transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.6, ease: "easeOut" };

  const baseMotion = {
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition,
    viewport: { once: false, amount: 0.2 },
  } as const;

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    elementRefs.current.forEach((element, index) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: "-20% 0px -20% 0px",
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="relative w-full py-16 md:py-24 px-4 md:px-8 overflow-hidden flex flex-col items-center justify-center">
      {/* Animated background accents */}
      <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[28%] pointer-events-none">
        <motion.div
          className="absolute -top-24 md:left-[40px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full w-[420px] h-[180px] md:w-[520px] md:h-[520px] blur-[120px]"
          animate={prefersReducedMotion ? undefined : { x: ["-10%", "10%", "-5%", "0%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-8 md:left-[-60px] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full w-[420px] h-[240px] md:w-[460px] md:h-[460px] blur-[120px]"
          animate={prefersReducedMotion ? undefined : { x: ["10%", "-15%", "12%", "0%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.div
          className="absolute top-56 md:top-24 md:-left-[360px] bg-[#BE95FF] rounded-full w-[360px] h-[260px] md:w-[420px] md:h-[420px] blur-[120px]"
          animate={prefersReducedMotion ? undefined : { x: ["-8%", "18%", "-12%", "0%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div {...baseMotion} className="text-center mb-12 md:mb-16">
          <h2 className="text-[28px] md:text-[40px] font-bold text-[#2A5FAC] mb-4 font-plus-jakarta">
            How it works – one intelligent flow from onboarding to portfolio insight
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#606060] max-w-3xl mx-auto font-plus-jakarta">
            See how Algebrik One transforms the lending lifecycle into a cohesive, AI-powered journey.
          </p>
        </motion.div>

        {/* Desktop timeline */}
        <motion.div {...baseMotion} className="hidden md:block">
          <style dangerouslySetInnerHTML={{__html: `
            .vertical-timeline {
              max-width: 100%;
              margin: 0 auto;
            }
            .vertical-timeline::before {
              background: linear-gradient(
                180deg,
                rgba(198, 215, 240, 0) 0%,
                #C6D7F0 20%,
                #C6D7F0 80%,
                rgba(198, 215, 240, 0) 100%
              ) !important;
              width: 4px !important;
            }
            .vertical-timeline-element-icon {
              box-shadow: 0 0 0 4px white, 0 0 0 8px transparent !important;
              width: 40px !important;
              height: 40px !important;
              left: 50% !important;
              margin-left: -20px !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              font-family: 'Plus Jakarta Sans', sans-serif !important;
              font-weight: bold !important;
              font-size: 18px !important;
              transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }
            .vertical-timeline-element-content {
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
              border: 1px solid #E7EEF8 !important;
              border-radius: 20px !important;
              padding: 0 !important;
              background: transparent !important;
            }
            .vertical-timeline-element-content:hover {
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
            }
            .vertical-timeline-element-content-arrow {
              border-right: 7px solid white !important;
              display: none !important;
            }
            .vertical-timeline-element--left .vertical-timeline-element-content-arrow,
            .vertical-timeline-element--right .vertical-timeline-element-content-arrow {
              border-left: 7px solid white !important;
            }
          `}} />
          <div className="relative max-w-5xl mx-auto">
            <VerticalTimeline lineColor="#C6D7F0" animate={!prefersReducedMotion}>
              {timelineSteps.map((step, index) => {
                // Highlight if hovered (all up to hovered index) or if active (only the active one)
                const shouldHighlight = hoveredIndex !== null 
                  ? index <= hoveredIndex 
                  : index === activeIndex;
                return (
                  <VerticalTimelineElement
                    key={step.number}
                    className="vertical-timeline-element--work"
                    date=""
                    iconStyle={{
                      background: shouldHighlight
                        ? "linear-gradient(135deg, #1C8DEA 0%, #195BD7 100%)"
                        : "white",
                      color: shouldHighlight ? "white" : "#2A5FAC",
                      border: "4px solid white",
                      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    icon={<span>{step.number}</span>}
                    position={step.align === "left" ? "left" : "right"}
                  >
                    <div
                      ref={(el) => {
                        elementRefs.current[index] = el;
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="bg-white rounded-[20px] p-6 shadow-lg border border-[#E7EEF8] hover:shadow-xl transition-all duration-300 ease-in-out flex gap-5 items-center"
                    >
                      <div className="flex-shrink-0">
                        <Image src={step.icon} alt={step.title} width={48} height={48} className="w-12 h-12" />
                      </div>
                      <div className="space-y-2 text-left">
                        <h3 className="text-[#2A5FAC] text-xl font-bold font-plus-jakarta">{step.title}</h3>
                        <p className="text-[#606060] text-sm font-plus-jakarta leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </VerticalTimelineElement>
                );
              })}
            </VerticalTimeline>
          </div>
        </motion.div>

        {/* Mobile vertical list */}
        <motion.div {...baseMotion} className="md:hidden space-y-6">
          {timelineSteps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-[20px] p-5 shadow-lg border border-[#E7EEF8]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1C8DEA] to-[#195BD7] text-white font-plus-jakarta font-bold flex items-center justify-center">
                  {step.number}
                </div>
                <div className="flex items-center gap-3">
                  <Image src={step.icon} alt={step.title} width={36} height={36} className="w-9 h-9" />
                  <h3 className="text-[#2A5FAC] text-lg font-bold font-plus-jakarta text-left">
                    {step.title}
                  </h3>
                </div>
              </div>
              <p className="text-[#606060] text-sm font-plus-jakarta leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div {...baseMotion} className="mt-20 md:mt-24 text-center">
          <h3 className="text-[#1A3A5C] text-[20px] md:text-[24px] font-bold font-plus-jakarta mb-8 md:mb-10">
            Ready to see Algebrik One in action?
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 md:gap-6">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-[#1C8DEA] to-[#195BD7] text-white px-8 py-4 rounded-full font-semibold font-plus-jakarta text-base md:text-lg shadow-lg hover:shadow-xl hover:from-[#195BD7] hover:to-[#1C8DEA] transition-all duration-300 w-full sm:w-auto"
            >
              Request a Demo
            </Link>
            <Link
              href="/platform#modules"
              className="border-2 border-[#1C8DEA] text-[#1C8DEA] px-8 py-4 rounded-full font-semibold font-plus-jakarta text-base md:text-lg hover:bg-[#E8F3FF] hover:border-[#195BD7] transition-all duration-300 w-full sm:w-auto"
            >
              Explore the Modules
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

