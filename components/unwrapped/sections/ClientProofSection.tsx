"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Play } from "lucide-react";
import { Particles } from "../Particles";

const clientOutcomes = [
  { metric: "73", suffix: "%", label: "Reduced loan processing time" },
  { metric: "42", suffix: "%", label: "Increased member satisfaction" },
];

export const ClientProofSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="section-container section-theme-coral relative overflow-hidden">
      {/* Coral theme background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,hsl(15_90%_55%/0.1)_0%,transparent_60%)]" />
      </motion.div>
      
      <Particles count={20} color="coral" spread="full" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="body-lg mb-20"
        >
          But the real proof lives inside{" "}
          <span className="text-foreground font-medium">credit unions.</span>
        </motion.p>

        {/* Giant stats with snap animation */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {clientOutcomes.map((outcome, i) => (
            <motion.div
              key={outcome.label}
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 0.3 + i * 0.2,
                type: "spring",
                stiffness: 100
              }}
              className="group relative"
            >
              <div className="bg-card/80 border border-[hsl(15_90%_55%/0.2)] rounded-2xl p-10 text-center backdrop-blur-sm hover:border-[hsl(15_90%_55%/0.4)] transition-all duration-300">
                <motion.div 
                  className="stat-large text-gradient-coral mb-4"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.2, type: "spring", stiffness: 150 }}
                >
                  {outcome.metric}<span className="text-[0.6em]">{outcome.suffix}</span>
                </motion.div>
                <p className="text-lg font-display text-foreground/80">{outcome.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative aspect-video max-w-2xl mx-auto mb-16 rounded-2xl overflow-hidden group cursor-pointer"
        >
          <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-br from-[hsl(15_90%_55%/0.4)] via-transparent to-[hsl(35_90%_55%/0.4)]">
            <div className="w-full h-full rounded-2xl bg-card" />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="absolute inset-0 bg-[hsl(15_90%_55%/0.3)] rounded-full blur-xl animate-breathe" />
              <div className="relative w-20 h-20 rounded-full bg-[hsl(15_90%_55%/0.2)] backdrop-blur-sm border border-[hsl(15_90%_55%/0.4)] flex items-center justify-center">
                <Play className="w-8 h-8 text-[hsl(15_90%_55%)] ml-1" />
              </div>
            </motion.div>
          </div>
          
          <p className="absolute bottom-4 left-4 text-sm text-muted-foreground font-medium">
            Watch Barbara's story
          </p>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-2xl mx-auto relative"
        >
          <span className="absolute -top-8 -left-4 text-7xl font-display text-[hsl(15_90%_55%/0.15)]">"</span>
          <p className="text-2xl md:text-3xl font-display text-foreground leading-relaxed">
            This didn't feel like software. It felt like a{" "}
            <span className="text-gradient-coral font-bold">step-change.</span>
          </p>
          <span className="absolute -bottom-6 -right-2 text-7xl font-display text-[hsl(15_90%_55%/0.15)]">"</span>
        </motion.blockquote>
      </div>
    </section>
  );
};

