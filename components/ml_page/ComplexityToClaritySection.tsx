"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const clarityData = [
    {
        image: "/icons/das1.svg", // You can replace with appropriate icons
        title: "Fewer vendors",
        description: "→ One platform for origination, decisioning, analytics, and POS."
    },
    {
        image: "/icons/das2.svg", // You can replace with appropriate icons
        title: "Faster Iteration",
        description: "→ Configure workflows and strategies in hours, not quarters."
    },
    {
        image: "/icons/das3.svg", // You can replace with appropriate icons
        title: "Smarter decisions",
        description: "→ Agentic AI with champion challenger and bulk backtesting."
    },
    {
        image: "/icons/das4.svg", // You can replace with appropriate icons
        title: "Stronger partnership",
        description: "→ A dedicated success pod that stays beyond go-live."
    }
];

export default function ComplexityToClaritySection() {
  return (
    <section className="relative w-full flex flex-col items-center">
       <img src="/background_images/modern_lender.webp" alt="Complexity to Clarity" className="absolute top-0 opacity-30 left-0 w-full h-full object-cover" />
    <div className="w-full max-w-7xl px-4 py-8 lg:py-16 flex flex-col items-center font-plus-jakarta relative">
        {/**Background images */}
       
        <h2 className="text-center text-[28px] md:text-[40px] font-bold text-[#2a5fac] mb-6">
            From complexity to clarity
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto text-center mb-8">
            Algebrik replaces fragmented tools with one unified lending stack - so every decision, flow, and dashboard works together.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-6 mt-8">
            {clarityData.map((item, idx) => (
                <motion.div 
                    key={item.title + idx} 
                    className="bg-white rounded-2xl shadow-xl p-6 flex flex-col lg:flex-row lg:items-center gap-6"
                    style={{ boxShadow: "0 4px 24px 0 rgba(10,64,108,0.10)" }}
                    whileHover={{ 
                        scale: 1.05
                    }}
                    transition={{ 
                        duration: 0.3,
                        ease: "easeInOut"
                    }}
                >
                    <div className="flex-shrink-0 w-[64px] h-[64px] md:w-[80px] md:h-[80px] flex items-center justify-center rounded-2xl">
                        <Image src={item.image} alt={item.title} width={64} height={64} className="object-contain w-[48px] h-[48px] md:w-[64px] md:h-[64px]" />
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="font-bold text-lg mb-2 text-[#2A5FAC]">{item.title}</span>
                        <span className="text-xs text-gray-500">{item.description}</span>
                    </div>
                </motion.div>
            ))}
        </div>
        </div>
    </section>
  );
}
