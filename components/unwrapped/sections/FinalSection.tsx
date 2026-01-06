"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Sparkles } from "lucide-react";
import { Particles, ConfettiBurst } from "../Particles";
import { useState, useEffect } from "react";
import Contact from "../../contacts";

export const FinalSection = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [showConfetti, setShowConfetti] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setShowConfetti(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <section ref={ref} className="section-container section-theme-sunrise relative overflow-hidden">
      {/* Epic sunrise gradient background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,hsl(35_100%_55%/0.25)_0%,transparent_60%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,hsl(35_100%_55%/0.15)_0%,transparent_70%)]" />
      </motion.div>

      <Particles count={50} color="primary" spread="full" />
      <ConfettiBurst trigger={showConfetti} colors={["#F5A623", "#FFD700", "#FFA500", "#FFFFFF", "#FFE4B5"]} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-xl text-foreground mb-4">
            This was the year
          </h2>
          <motion.span 
            className="stat-large text-gradient-accent block"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
          >
            lending changed.
          </motion.span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="body-lg text-muted-foreground mt-8 mb-16"
        >
          And we're just getting started.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="relative inline-block"
        >
          <div className="absolute inset-0 bg-primary/40 rounded-full blur-2xl animate-breathe" />
          
          <button 
            onClick={() => setShowContactModal(true)}
            className="btn-primary group relative"
          >
            <Sparkles className="w-5 h-5" />
            <span>Explore what's next</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 2 }}
          className="mt-24 flex items-center justify-center gap-4"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <p className="text-sm font-display font-medium tracking-[0.3em] uppercase text-muted-foreground/40">
            Algebrik Unwrapped • 2025
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </motion.div>
      </div>
      <Contact open={showContactModal} onClose={() => setShowContactModal(false)} />
    </section>
  );
};

