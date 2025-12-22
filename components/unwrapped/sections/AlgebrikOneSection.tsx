"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Particles } from "../Particles";

export const AlgebrikOneSection = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section ref={ref} className="section-container section-theme-gold relative overflow-hidden">
      {/* Golden explosion background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_50%,hsl(40_100%_55%/0.2)_0%,transparent_60%)]" />
      </motion.div>
      
      {/* Spinning rings */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.15 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div className="w-[500px] h-[500px] border border-[hsl(40_100%_55%/0.3)] rounded-full animate-spin-slow" />
        <div className="absolute inset-12 border border-[hsl(40_100%_55%/0.2)] rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
      </motion.div>

      <Particles count={35} color="primary" spread="center" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Giant brand reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.3, y: 60 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
        >
          <motion.h2 
            className="font-display font-bold text-7xl md:text-9xl lg:text-[12rem] text-gradient-gold mb-8 tracking-tight leading-none"
            animate={inView ? {
              textShadow: [
                "0 0 30px hsl(40 100% 55% / 0.3)",
                "0 0 100px hsl(40 100% 55% / 0.5)",
                "0 0 30px hsl(40 100% 55% / 0.3)"
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Algebrik One
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-3"
        >
          <motion.p 
            className="text-xl md:text-2xl font-display text-foreground/80"
            initial={{ x: -30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            One platform.
          </motion.p>
          <motion.p 
            className="text-xl md:text-2xl font-display text-foreground/80"
            initial={{ x: 30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            One data spine.
          </motion.p>
          <motion.p 
            className="text-xl md:text-2xl font-display text-[hsl(40_100%_55%)] font-bold"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 1.2, type: "spring" }}
          >
            One AI-native lending experience.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="w-32 h-1 bg-gradient-to-r from-transparent via-[hsl(40_100%_55%)] to-transparent mx-auto mt-12 rounded-full"
        />
      </div>
    </section>
  );
};

