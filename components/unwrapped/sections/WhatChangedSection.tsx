"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Particles, ConfettiBurst } from "../Particles";
import { useState, useEffect } from "react";

export const WhatChangedSection = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [showConfetti, setShowConfetti] = useState(false);

  // Trigger confetti when the "one" text appears
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setShowConfetti(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  const fragments = [
    { label: "POS", x: -180, y: -120, rotate: -15 },
    { label: "DAO", x: 170, y: -100, rotate: 12 },
    { label: "LOS", x: -150, y: 100, rotate: -8 },
    { label: "Engine", x: 180, y: 80, rotate: 10 },
    { label: "Analytics", x: 0, y: 150, rotate: 5 },
  ];

  return (
    <section ref={ref} className="section-container section-theme-purple relative overflow-hidden">
      {/* Purple theme background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,hsl(280_80%_55%/0.15)_0%,transparent_60%)]" />
      </motion.div>
      
      <Particles count={25} color="purple" spread="full" />
      <ConfettiBurst trigger={showConfetti && inView} colors={["#8B5CF6", "#A855F7", "#D946EF", "#F5A623", "#FFFFFF"]} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="body-lg mb-24"
        >
          Lending used to live in silos.
        </motion.p>

        {/* Animated fragments with snap animation */}
        <div className="relative h-[350px] mb-24">
          {fragments.map((frag, i) => (
            <motion.div
              key={frag.label}
              initial={{ 
                opacity: 0.3, 
                x: frag.x, 
                y: frag.y, 
                rotate: frag.rotate, 
                scale: 0.8 
              }}
              animate={inView ? { 
                opacity: 1, 
                x: 0, 
                y: 0, 
                rotate: 0, 
                scale: 1 
              } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.3 + i * 0.1, 
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div 
                className="px-6 py-3 bg-card/80 border border-[hsl(280_80%_55%/0.3)] rounded-xl backdrop-blur-sm"
                whileHover={{ scale: 1.1, borderColor: "hsl(280 80% 55% / 0.6)" }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="text-sm font-display font-semibold text-foreground/90">{frag.label}</span>
              </motion.div>
            </motion.div>
          ))}
          
          {/* Center glow - pulsing purple */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-40 h-40 bg-[hsl(280_80%_55%/0.3)] rounded-full blur-[80px] animate-breathe" />
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-6 h-6 bg-[hsl(280_80%_55%)] rounded-full shadow-[0_0_30px_hsl(280_80%_55%/0.6)]" />
            </motion.div>
          </motion.div>
        </div>

        {/* Giant stat reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ 
            duration: 0.6, 
            delay: 1.4,
            type: "spring",
            stiffness: 100
          }}
          className="mb-6"
        >
          <span className="stat-large text-gradient-purple">5 → 1</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="heading-md mb-8"
        >
          Five core systems became{" "}
          <span className="text-gradient-purple font-bold">one brain.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 2.2 }}
          className="inline-block text-[hsl(280_80%_65%)] font-display font-bold text-xl tracking-wide px-6 py-2 rounded-full border border-[hsl(280_80%_55%/0.3)] bg-[hsl(280_80%_55%/0.1)]"
        >
          Powered by Algebrik.
        </motion.p>
      </div>
    </section>
  );
};

