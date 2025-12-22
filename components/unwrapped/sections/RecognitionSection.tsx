"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const newsItems = [
  { source: "Credit Union Times", headline: "AI-Native Lending Platform Reshapes Industry" },
  { source: "CU Today", headline: "Algebrik Leads New Wave of Lending Innovation" },
  { source: "Fintech Futures", headline: "The Platform Connecting Credit Union Ecosystems" },
];

export const RecognitionSection = () => {
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
          Industry Recognition
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="heading-lg mb-16"
        >
          Momentum leaves proof.
        </motion.h2>

        <div className="space-y-6">
          {newsItems.map((item, i) => (
            <motion.div
              key={item.source}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
              className="p-6 bg-secondary/30 border border-border/20 rounded-xl text-left hover:border-primary/20 transition-colors duration-300"
            >
              <p className="text-xs font-medium text-primary/70 uppercase tracking-wider mb-2">
                {item.source}
              </p>
              <p className="text-lg md:text-xl font-display text-foreground">
                "{item.headline}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

