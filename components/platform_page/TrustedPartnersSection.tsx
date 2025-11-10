"use client";

import { motion, Transition, useReducedMotion, MotionConfig } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { CustomHeader } from "../CustomHeader";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Button from "../Buttons";
import { useRouter } from "next/navigation";


const partnerLogos = [
  { name: "Equifax", image: "/integration_logos/equifax.png" },
  { name: "TransUnion", image: "/integration_logos/transunion.png" },
  { name: "Jack Henry", image: "/integration_logos/jackharry.png" },
  { name: "Plaid", image: "/integration_logos/plaid.png" },
  { name: "Conductiv", image: "/integration_logos/conductiv.png" },
  { name: "TruStage", image: "/integration_logos/trustage.png" },
];

const testimonials = [
  {
    quote: "For us, this wasn't just about digitizing lending—it was about choosing a partner that understands where the future of lending is headed,",
    source: "Barbara Appold, CEO, UFCU"
  },
  {
    quote: "At United Financial, our members expect speed, simplicity, and support—and we're all in on delivering it",
    source: "Josh Sawyer, CLO, UFCU"
  },
  {
    quote: "Algebrik One's modularity and built-in AI allow us to approve faster, fund sooner, and stay compliant",
    source: "Erin Folland, VP Lending, FFCU"
  },
  {
    quote: "Algebrik One gives us the agility to meet every member moment with agility, speed and empathy.",
    source: "Deb Dietz, CEO, FFCU"
  },
];

export default function TrustedPartnersSection() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const router = useRouter();
  const transition: Transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.1, ease: "easeOut" };

  return (
    <MotionConfig reducedMotion={isMobile ? "always" : "never"}>
      <motion.section
        initial={{ y: 30, opacity: 0 }}
        transition={transition}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        className="w-full bg-white pt-16 md:pt-24 px-4 md:px-8 relative"
      >

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <CustomHeader
              text="Trusted Partners & Proven Results"
              className="text-[32px] md:text-[40px] lg:text-[48px] text-[#2A5FAC] mb-6"
            />
          </div>

          {/* Partner Logos Row */}
          <div className="text-center  w-full">
            <Marquee autoFill className="grid grid-cols-2 md:flex items-center py-5 gap-4 md:gap-4  w-full">
            {partnerLogos.map((partner, index) => (
              <motion.div
                key={partner.name}
                // initial={{ y: 20, opacity: 0 }}
                transition={{ ...transition, delay: index * 0.1 }}
                // whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: false, amount: 0.2 }}
                className="mr-4 bg-white  cursor-pointer rounded-lg border border-[#C3C3C3] p-3 md:p-4 lg:p-6 flex items-center justify-center hover:shadow-lg transition-shadow duration-300 h-[48px] md:h-[56px] md:flex-shrink-0"
              >
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="max-w-[90px] md:max-w-[100px] lg:max-w-[120px] h-auto object-contain"
                />
              </motion.div>
            ))}
            </Marquee>
            <Button 
            text="View All Partners"
            customClass="bg-transparent border border-[#2A5FAC] text-[#2A5FAC] hover:bg-[#2A5FAC] hover:text-white px-6 py-3 rounded-full min-w-max"
            onClick={() => {
              router.push('/integrations');
            }}
          />
          </div>
        </div>

        {/* Testimonial Cards Row - Container with overflow */}
        <div className="relative z-10 w-full pt-0 -mx-4 md:-mx-8">
          <div className="w-full">
            <Marquee autoFill 
              className="flex gap-4 md:gap-6 pb-4 pt-10 overflow-x-auto scroll-smooth pl-4 md:pl-[max(32px,calc((100%-1280px)/2+32px))] pr-4 md:pr-8 hide-scrollbar" 
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  transition={{ ...transition, delay: index * 0.1 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  className="bg-white mr-4 rounded-[20px] p-5 md:p-9 flex-shrink-0 relative flex flex-col w-[240px] md:w-[calc((1280px-64px-48px)/3)] overflow-visible pt-6 md:pt-8"
                  style={{
                    boxShadow: '-10px 4px 20px rgba(0, 0, 0, 0.08), 0 2px 10px rgba(0, 0, 0, 0.04)'
                  }}
                >
                {/* Large Quotation Mark Image - Top Right */}
                <div className="absolute -top-2 right-2 md:-top-2 md:right-3 pointer-events-none overflow-visible">
                  <Image
                    src="/assets/singlequote.png"
                    alt="Quote"
                    width={100}
                    height={100}
                    className="w-20 h-20 md:w-[74px] md:h-[56px] object-contain opacity-50"
                  />
                </div>

                {/* FEEDBACK Label - Top Left */}
                <p className="text-[#6A8CCF] text-[11px] md:text-[12px] font-plus-jakarta font-semibold uppercase tracking-wider mb-3 relative z-10">
                  FEEDBACK
                </p>

                {/* Quote */}
                <p className="text-[#333333] text-[13px] md:text-[15px] font-plus-jakarta leading-relaxed mb-5 flex-grow relative z-10 pr-2">
                  "{testimonial.quote}"
                </p>

                {/* Source - Bottom Right */}
                <p className="text-[#3B82F6] text-[13px] md:text-[15px] font-plus-jakarta font-semibold text-right relative z-10 mt-auto">
                  - {testimonial.source}
                </p>
                </motion.div>
              ))}
            </Marquee>
          </div>
        </div>
      </motion.section>
    </MotionConfig>
  );
}

