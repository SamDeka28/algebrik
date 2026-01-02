"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Particles, ConfettiBurst } from "../Particles";
import { useState, useEffect } from "react";

interface FragmentOrbitProps {
  fragment: { label: string; angle: number; rotate: number };
  radius: number;
  orbitDuration: number;
  orbitDelay: number;
  inView: boolean;
  index: number;
}

const FragmentOrbit = ({ fragment, radius, orbitDuration, orbitDelay, inView, index }: FragmentOrbitProps) => {
  const angle = useMotionValue(fragment.angle);
  
  // Start the continuous revolution animation
  useEffect(() => {
    if (inView) {
      const controls = animate(angle, fragment.angle + 360, {
        duration: orbitDuration,
        repeat: Infinity,
        ease: "linear",
        delay: orbitDelay,
      });
      return () => controls.stop();
    }
  }, [inView, angle, fragment.angle, orbitDuration, orbitDelay]);

  // Transform angle to x and y positions
  const x = useTransform(angle, (a) => Math.cos((a * Math.PI) / 180) * radius);
  const y = useTransform(angle, (a) => Math.sin((a * Math.PI) / 180) * radius);

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scale: 0.5 
      }}
      animate={inView ? { 
        opacity: 1, 
        scale: 1,
      } : {}}
      transition={{ 
        opacity: { duration: 0.6, delay: 0.3 + index * 0.1 },
        scale: { duration: 0.6, delay: 0.3 + index * 0.1, type: "spring", stiffness: 100 },
      }}
      style={{
        x,
        y,
      }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div 
        className="px-6 py-3 bg-card/80 border border-[hsl(280_80%_55%/0.3)] rounded-xl backdrop-blur-sm"
        whileHover={{ scale: 1.1, borderColor: "hsl(280 80% 55% / 0.6)" }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <span className="text-sm font-display font-semibold text-foreground/90">{fragment.label}</span>
      </motion.div>
    </motion.div>
  );
};

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

  // Calculate circular positions for fragments - evenly spaced
  const radius = 200; // Distance from center
  const fragmentCount = 5;
  const angleStep = 360 / fragmentCount; // 72 degrees between each fragment
  const startAngle = -90; // Start at top
  
  const fragmentLabels = ["POS", "DAO", "LOS", "Engine", "Analytics"];
  const fragments = fragmentLabels.map((label, i) => {
    const angle = startAngle + (i * angleStep);
    return {
      label,
      angle,
      rotate: 0, // No rotation needed for labels
    };
  }).map(frag => ({
    ...frag,
    x: Math.cos((frag.angle * Math.PI) / 180) * radius,
    y: Math.sin((frag.angle * Math.PI) / 180) * radius,
  }));

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

        {/* Animated fragments orbiting around center */}
        <div className="relative h-[500px] mb-24 w-full flex items-center justify-center">
          {/* Container for logo and fragments - shifted slightly left */}
          <div className="absolute inset-0 -translate-x-8 flex items-center justify-center">
            {/* Center Algebrik Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 1 }}
              className="relative z-10"
            >
              {/* Glow effect behind logo */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[hsl(280_80%_55%/0.3)] rounded-full blur-[80px] animate-breathe" />
              
              {/* Logo container */}
              <motion.div 
                className="relative w-32 h-32 md:w-40 md:h-40 backdrop-blur-xl rounded-3xl border border-[hsl(280_80%_55%/0.3)] flex items-center justify-center"
                style={{ background: 'rgba(255, 255, 255, 0.05)', boxShadow: '0 0 30px hsl(280 80% 55% / 0.3), inset 0 1px 0 rgba(255,255,255,0.1)' }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div 
                  className="w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center p-2"
                  style={{ background: 'linear-gradient(135deg, hsl(280 80% 55%), hsl(280 80% 65%))' }}
                >
                  <img 
                    src="/ufcu-assets/f2069dd5-1ef4-43cb-963c-28b6c54909b7.png" 
                    alt="Algebrik Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
              
              {/* Pulsing rings */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping opacity-20">
                <div className="w-32 h-32 md:w-40 md:h-40 border border-[hsl(280_80%_55%/0.3)] rounded-3xl"></div>
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse opacity-15" style={{ animationDelay: '1s' }}>
                <div className="w-40 h-40 md:w-48 md:h-48 border border-[hsl(280_80%_55%/0.2)] rounded-3xl -m-4"></div>
              </div>
            </motion.div>

            {/* Orbiting fragments - positioned absolutely relative to the centered container */}
            {fragments.map((frag, i) => {
              const orbitDuration = 20; // seconds for full revolution
              const orbitDelay = i * 0.5; // stagger each fragment
              
              return (
                <FragmentOrbit
                  key={frag.label}
                  fragment={frag}
                  radius={radius}
                  orbitDuration={orbitDuration}
                  orbitDelay={orbitDelay}
                  inView={inView}
                  index={i}
                />
              );
            })}
          </div>
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

