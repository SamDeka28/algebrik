"use client"

import Image from "next/image";
import { motion } from "framer-motion";

export default function Placeholder() {
  return (
    <div className="container mx-auto p-4 md:py-[5px] md:pb-10 flex items-center justify-center font-plus-jakarta flex-col">
      <div className="relative flex flex-col items-center justify-center md:flex-row gap-[92px] w-full">
        <div className="absolute opacity-[30%] top-0 -z-10">
        <motion.div
              className="absolute top-0 -left-96 md:left-[96px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full md:w-[468.64px] md:h-[542.11px] blur-[100px]"
              initial={{ x: "-50%" }}
              animate={{
                x: ["-30%", "30%", "-30%", "0%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute top-0 md:left-[20px] -left-96 bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full md:w-[618.35px] md:h-[633.38px] blur-[100px] -z-10"
              initial={{ x: "100%" }}
              animate={{
                x: ["10%", "-20%", "10%", "0%"],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute top-0 -left-96 md:bottom-[10px] bg-[#BE95FF] rounded-full md:w-[451.48px] md:h-[542.11px] blur-[100px] z-[-1]"
              initial={{ x: "-50%" }}
              animate={{
                x: ["-30%", "40%", "-40%", "0%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
    
      
        </div>
        <Image
          src="/section_images/blog/res.png"
          className=""
          alt=""
          width={857}
          height={630}
          priority
          quality={100}
        />
      </div>
    </div>
  );
}
