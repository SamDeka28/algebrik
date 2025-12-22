"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Particles } from "../Particles";

export const HeroSection = () => {
  return (
    <section className="section-container section-theme-hero relative overflow-hidden">
      {/* Animated gradient background - more dramatic */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary glow orb - larger and more intense */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[1000px] h-[1000px]"
        >
          <div className="absolute inset-0 bg-primary/25 rounded-full blur-[200px] animate-breathe" />
        </motion.div>
        
        {/* Secondary accent orbs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 3, delay: 0.5 }}
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[150px] animate-float-slow"
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 3, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] animate-float"
        />
        
        {/* Particles */}
        <Particles count={40} spread="full" />
      </div>
      
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="body-lg mb-8"
        >
          This wasn't just another year in lending.
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1, type: "spring", stiffness: 100 }}
          className="heading-xl text-foreground mb-4"
        >
          This was the year
        </motion.h1>
        
        {/* Giant animated reveal */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 1.6,
            type: "spring",
            stiffness: 100
          }}
          className="overflow-hidden"
        >
          <motion.span 
            className="stat-large text-gradient-accent inline-block"
            animate={{ 
              textShadow: [
                "0 0 20px hsl(38 92% 55% / 0.3)",
                "0 0 60px hsl(38 92% 55% / 0.5)",
                "0 0 20px hsl(38 92% 55% / 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            lending changed.
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="mt-16"
        >
          <div className="inline-flex items-center gap-3">
            <motion.div 
              className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 2.6 }}
            />
            <p className="text-sm font-display font-semibold tracking-[0.4em] uppercase text-primary">
              Algebrik Unwrapped
            </p>
            <motion.div 
              className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 2.6 }}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-medium text-muted-foreground/50 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-primary/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};

