"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CountUp } from "../CountUp";
import { Particles } from "../Particles";

export const WowMomentSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const leftItems = ["Disconnected systems", "Manual decisions", "Slow outcomes"];
  const rightItems = [
    { text: "integrations", count: 42 },
    { text: "AI inside every step", count: null },
    { text: "Decisions at speed", count: null },
  ];

  return (
    <section ref={ref} className="section-container section-theme-electric relative overflow-hidden">
      {/* Electric yellow/gold theme background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,hsl(45_100%_50%/0.08)_0%,transparent_60%)]" />
      </motion.div>
      
      {/* Animated center line - more dramatic */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={inView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute left-1/2 top-[10%] bottom-[10%] w-0.5 origin-top"
      >
        <div className="w-full h-full bg-gradient-to-b from-transparent via-[hsl(45_100%_60%/0.5)] to-transparent" />
        <motion.div
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[hsl(45_100%_60%)] to-transparent"
        />
      </motion.div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-32">
          {/* Left - Old way - crossed out with drama */}
          <div className="text-right flex flex-col justify-center">
            {leftItems.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -60 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15, type: "spring" }}
                className="relative mb-6"
              >
                <motion.p
                  className="text-2xl md:text-3xl lg:text-4xl font-display"
                  style={{ color: 'hsl(240 5% 65%)' }}
                  initial={{ opacity: 0.8 }}
                  animate={inView ? { opacity: 0.6 } : {}}
                >
                  {item}
                </motion.p>
                {/* Animated strikethrough */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
                  className="absolute top-1/2 right-0 w-full h-0.5 bg-[hsl(0_80%_50%/0.7)] origin-right"
                />
              </motion.div>
            ))}
          </div>

          {/* Right - New way - bold and bright */}
          <div className="text-left flex flex-col justify-center">
            {rightItems.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: 60, scale: 0.9 }}
                animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.5 + i * 0.15, 
                  type: "spring",
                  stiffness: 100
                }}
                className="mb-6"
              >
                {item.count ? (
                  <div className="flex items-baseline gap-3">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ 
                        delay: 0.7 + i * 0.15, 
                        type: "spring",
                        stiffness: 150
                      }}
                      className="stat-large text-[hsl(45_100%_60%)]"
                    >
                      <CountUp end={item.count} />
                    </motion.span>
                    <span className="text-2xl md:text-3xl font-display text-foreground/90">
                      {item.text}
                    </span>
                  </div>
                ) : (
                  <p className="text-2xl md:text-3xl lg:text-4xl font-display text-foreground font-semibold">
                    {item.text}
                    {i === 1 && (
                      <motion.span
                        initial={{ width: 0 }}
                        animate={inView ? { width: "100%" } : {}}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="block h-1 bg-gradient-to-r from-[hsl(45_100%_60%)] to-[hsl(35_100%_50%)] mt-2 rounded-full"
                      />
                    )}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2, type: "spring" }}
          className="text-center mt-28"
        >
          <p className="body-lg mb-4">This wasn't a small upgrade.</p>
          <motion.p 
            className="heading-lg"
            initial={{ scale: 0.9 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 1.4, type: "spring" }}
          >
            It was a{" "}
            <span className="text-gradient-gold font-bold">structural shift.</span>
          </motion.p>
        </motion.div>
      </div>
      
      <Particles count={15} color="primary" spread="bottom" />
    </section>
  );
};

