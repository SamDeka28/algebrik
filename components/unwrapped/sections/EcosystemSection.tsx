"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CountUp } from "../CountUp";
import { Particles } from "../Particles";

const integrationLogos = [
  "Plaid", "Equifax", "Experian", "TransUnion", "FICO",
  "DocuSign", "Twilio", "Stripe", "FIS", "Jack Henry",
];

export const EcosystemSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="section-container section-theme-blue relative overflow-hidden">
      {/* Blue constellation theme background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,hsl(210_100%_50%/0.12)_0%,transparent_60%)]" />
      </motion.div>
      
      {/* Spinning constellation rings */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.15 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[hsl(210_100%_60%/0.3)] rounded-full animate-spin-slow pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.1 } : {}}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-[hsl(210_100%_60%/0.2)] rounded-full animate-spin-slow pointer-events-none"
        style={{ animationDirection: 'reverse', animationDuration: '30s' }}
      />

      <Particles count={30} color="blue" spread="full" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Giant stat - the hero moment */}
        <motion.div
          initial={{ opacity: 0, scale: 0.3, y: 50 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.8, 
            type: "spring",
            stiffness: 100
          }}
          className="mb-8"
        >
          <div className="flex items-baseline justify-center gap-4">
            <motion.span 
              className="stat-giant text-gradient-blue"
              animate={inView ? { 
                textShadow: [
                  "0 0 20px hsl(210 100% 60% / 0.3)",
                  "0 0 80px hsl(210 100% 60% / 0.5)",
                  "0 0 20px hsl(210 100% 60% / 0.3)"
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CountUp end={42} duration={2} />
            </motion.span>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="heading-lg text-foreground -mt-4"
          >
            integrations. <span className="text-gradient-blue">One</span> platform.
          </motion.p>
        </motion.div>

        {/* Floating logos in orbit - snapping in */}
        <div className="relative h-[280px] mt-16 mb-16">
          {integrationLogos.map((logo, i) => {
            const angle = (i / 10) * Math.PI * 2 - Math.PI / 2;
            const radius = 150;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius * 0.6;
            
            return (
              <motion.div
                key={logo}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={inView ? { 
                  opacity: 1, 
                  scale: 1, 
                  x: x - 40, 
                  y: y - 16 
                } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.8 + i * 0.08,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                className="absolute left-1/2 top-1/2"
              >
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ 
                    duration: 3 + i * 0.3, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: i * 0.15
                  }}
                  className="px-4 py-2 bg-card/80 border border-[hsl(210_100%_60%/0.2)] rounded-lg backdrop-blur-sm hover:border-[hsl(210_100%_60%/0.5)] hover:bg-[hsl(210_100%_60%/0.1)] transition-all duration-300 cursor-default"
                  whileHover={{ scale: 1.15 }}
                >
                  <span className="text-xs font-medium text-muted-foreground/80 hover:text-foreground transition-colors">{logo}</span>
                </motion.div>
              </motion.div>
            );
          })}
          
          {/* Center pulsing core */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.5, type: "spring" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative">
              <div className="w-24 h-24 bg-[hsl(210_100%_60%/0.2)] rounded-full blur-xl animate-breathe" />
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-8 h-8 bg-[hsl(210_100%_60%)] rounded-full shadow-[0_0_40px_hsl(210_100%_60%/0.6)]" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 2 }}
          className="body-lg max-w-md mx-auto"
        >
          Because lending breaks{" "}
          <span className="text-foreground font-semibold">between systems.</span>
        </motion.p>
      </div>
    </section>
  );
};

