"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const aiBenefits = [
  { action: "It assists", description: "supporting human judgment" },
  { action: "It reasons", description: "not just calculating" },
  { action: "It scales judgment", description: "across every decision" },
];

export const AIDoneRightSection = () => {
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
          AI, Done Right
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="heading-lg mb-16"
        >
          AI joined the lending team.
        </motion.h2>

        <div className="space-y-8 mb-16">
          {aiBenefits.map((benefit, i) => (
            <motion.div
              key={benefit.action}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
              className="flex items-center justify-center gap-4"
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xl md:text-2xl font-display font-semibold text-foreground">
                {benefit.action}
              </span>
              <span className="text-lg md:text-xl text-muted-foreground">—</span>
              <span className="text-lg md:text-xl text-muted-foreground">{benefit.description}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="heading-md"
        >
          This was the year{" "}
          <span className="text-gradient-accent">AI became real.</span>
        </motion.p>
      </div>
    </section>
  );
};

