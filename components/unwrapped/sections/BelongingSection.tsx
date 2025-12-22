"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CountUp } from "../CountUp";

export const BelongingSection = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section ref={ref} className="section-container">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-sm font-display font-medium tracking-[0.2em] uppercase text-primary mb-8"
        >
          Belonging & Growth
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
            <CountUp end={400} suffix="+" className="text-primary" />
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground">
            leaders joined the conversation
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="body-lg mb-6"
        >
          The Algebrik family grew.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <p className="heading-md text-foreground">Shared momentum.</p>
        </motion.div>
      </div>
    </section>
  );
};

