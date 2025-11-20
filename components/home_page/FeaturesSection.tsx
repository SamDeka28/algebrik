"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";


const features = [
  { title: "Digital Account Opening", icon: "/icons/home/bc.svg" },
  { title: "Document Processing", icon: "/icons/home/fu.svg" },
  { title: "Point of Sale", icon: "/icons/home/bv.svg" },
  { title: "Borrower Communication", icon: "/icons/home/or.svg" },
  { title: "AI powered Decisioning", icon: "/icons/home/am.svg" },
  { title: "Origination", icon: "/icons/home/ai.svg" },
  { title: "Member Verification", icon: "/icons/home/ag.svg" },
  { title: "Application Management", icon: "/icons/home/do.svg" },
  { title: "Portfolio Analytics", icon: "/icons/home/ka.svg" },
  { title: "AI Lender Enablement", icon: "/icons/home/cs.svg"}
];

export default function FeaturesSection() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Use requestIdleCallback if available, otherwise fallback to setTimeout
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => setAnimate(true));
    } else {
      setTimeout(() => setAnimate(true), 500); // fallback
    }
  }, []);

  return (
    <section className="pt-[32px] pb-[46px] md:pt-[38px] md:pb-[38px] font-plus-jakarta bg-white overflow-hidden">
      <div className="relative w-full">
        <motion.div
          className="flex gap-6"
          animate={animate ? { x: ["0%", "-100%"] } : false}
          transition={
            animate
              ? {
            ease: "linear",
            duration: 20,
            repeat: Infinity,
                }
              : undefined
          }
        >
          {[
            ...features,
            ...features,
            ...features,
            ...features,
            ...features,
          ].map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between min-w-[112px] h-[100px] p-4 gap-[9px]"
            >
              <div className="w-[60px] h-[60px] flex items-center justify-center bg-[#F2F6FF] rounded-[12px] p-4">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={55}
                  height={55}
                  style={{ objectFit: "contain" }}
                  quality={100}
                />
              </div>
              <h3 
              className="text-[#868687] text-[14px] font-medium text-center leading-tight hover:font-extrabold hover:text-[16px] hover:text-[#2A5FAC] hover:cursor-pointer">
                {feature.title}
              </h3>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
