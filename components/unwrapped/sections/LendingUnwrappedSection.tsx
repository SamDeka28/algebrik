"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Particles } from "../Particles";

const modules = [
  {
    title: "Point of Sale",
    from: "rate shopping",
    to: "relationships",
    icon: "💳",
  },
  {
    title: "Digital Account Opening",
    from: "forms",
    to: "minutes",
    icon: "⚡",
  },
  {
    title: "Loan Origination (LOS)",
    from: "queues",
    to: "real-time flow",
    icon: "🔄",
  },
  {
    title: "Decisioning Engine",
    from: "rules",
    to: "reasoning",
    icon: "🧠",
  },
  {
    title: "Portfolio Analytics",
    from: "hindsight",
    to: "foresight",
    icon: "📊",
  },
];

const ModuleCard = ({ module, index }: { module: typeof modules[0]; index: number }) => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, rotateX: -20 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.12, 
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className="group relative"
    >
      <motion.div 
        className="relative bg-card/80 border border-[hsl(175_85%_50%/0.2)] rounded-2xl p-8 md:p-10 overflow-hidden backdrop-blur-sm"
        whileHover={{ 
          scale: 1.02, 
          borderColor: "hsl(175 85% 50% / 0.5)",
          boxShadow: "0 0 40px hsl(175 85% 50% / 0.2)"
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[hsl(175_85%_50%/0.6)] to-transparent" />
        </div>
        
        {/* Number badge - giant */}
        <motion.span 
          className="absolute top-4 right-4 text-6xl font-display font-bold text-foreground/[0.03] group-hover:text-[hsl(175_85%_50%/0.1)] transition-colors duration-500"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
        >
          0{index + 1}
        </motion.span>
        
        {/* Icon with pop animation */}
        <motion.span 
          className="text-4xl mb-4 block"
          initial={{ scale: 0, rotate: -20 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ 
            delay: 0.4 + index * 0.1, 
            type: "spring",
            stiffness: 200
          }}
          whileHover={{ scale: 1.3, rotate: 10 }}
        >
          {module.icon}
        </motion.span>
        
        <h3 className="heading-sm text-foreground mb-6 group-hover:text-gradient-teal transition-all duration-500">
          {module.title}
        </h3>
        
        <div className="flex items-center gap-4 text-base md:text-lg">
          <span className="text-muted-foreground/40 line-through decoration-2">{module.from}</span>
          <motion.span 
            className="text-[hsl(175_85%_50%)] text-2xl"
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
          <span className="text-foreground font-bold">{module.to}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const LendingUnwrappedSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="section-container section-theme-teal relative">
      {/* Teal theme background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,hsl(175_85%_50%/0.12)_0%,transparent_60%)]" />
      </motion.div>
      
      <Particles count={20} color="teal" spread="full" />
      
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: 80 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-px bg-gradient-to-r from-transparent via-[hsl(175_85%_50%)] to-transparent mx-auto mb-6"
          />
          <p className="text-sm font-display font-semibold tracking-[0.3em] uppercase text-[hsl(175_85%_50%)] mb-4">
            Lending, Unwrapped
          </p>
          <h2 className="heading-lg">
            The five pillars.{" "}
            <span className="text-gradient-teal">Transformed.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.slice(0, 3).map((module, i) => (
            <ModuleCard key={module.title} module={module} index={i} />
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
          {modules.slice(3).map((module, i) => (
            <ModuleCard key={module.title} module={module} index={i + 3} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20"
        >
          <p className="heading-md text-foreground">
            Five modules.{" "}
            <span className="text-gradient-teal">One lending brain.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

