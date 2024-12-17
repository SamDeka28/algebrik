"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import clock from "@/public/icons/clock.png";
import doc from "@/public/icons/doc.png";

const features = [
  { title: "Agreement Generation", icon: clock },
  { title: "Document Processing", icon: doc },
  { title: "KYC Automation", icon: doc },
  { title: "Origination", icon: doc },
  { title: "Application Management", icon: doc },
  { title: "AI-Lender Enablement", icon: doc },
  { title: "Agreement Generation", icon: doc },
  { title: "Document Processing", icon: doc },
  { title: "KYC Automation", icon: doc },
];

export default function FeaturesSection() {
  return (
    <section className="py-[63px] bg-white overflow-hidden">
      <div className="relative w-full">
        <motion.div
          className="flex gap-6"
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            ease: "linear",
            duration: 20,
            repeat: Infinity,
          }}
        >
          {[...features, ...features, ...features, ...features, ...features].map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between min-w-[112px] h-[100px] p-4 gap-[9px]"
            >
              <div className="w-[55px] h-[55px] flex items-center justify-center bg-[#F2F6FF] rounded-[12px] p-4">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={21}
                  height={21}
                  style={{ objectFit: "contain" }}
                  quality={100}
                />
              </div>
              <h3 className="text-[#868687] text-[14px] font-medium text-center leading-tight hover:font-extrabold hover:text-[16px] hover:text-[#2A5FAC] hover:cursor-pointer">
                {feature.title}
              </h3>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
