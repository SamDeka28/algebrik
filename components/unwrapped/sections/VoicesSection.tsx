"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mic, Podcast, MessageSquare } from "lucide-react";

const presenceItems = [
  { icon: Mic, label: "Speaking on stages" },
  { icon: Podcast, label: "Sharing ideas on podcasts" },
  { icon: MessageSquare, label: "Leading conversations" },
];

export const VoicesSection = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section ref={ref} className="section-container">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-sm font-display font-medium tracking-[0.2em] uppercase text-primary mb-12"
        >
          Voices & Presence
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {presenceItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              className="group"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-secondary/50 border border-border/30 flex items-center justify-center group-hover:border-primary/30 transition-colors duration-300">
                <item.icon className="w-7 h-7 text-primary/80" />
              </div>
              <p className="body-md text-foreground">{item.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="heading-md text-muted-foreground mb-2">Not shouting.</p>
          <p className="heading-md text-foreground">Being heard.</p>
        </motion.div>
      </div>
    </section>
  );
};

