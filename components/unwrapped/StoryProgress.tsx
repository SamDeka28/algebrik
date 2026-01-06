"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const sections = [
  { id: 1, label: "Intro" },
  { id: 2, label: "Change" },
  { id: 3, label: "Unwrapped" },
  { id: 4, label: "Impact" },
  { id: 5, label: "Ecosystem" },
  { id: 6, label: "Voices" },
  { id: 7, label: "Recognition" },
  { id: 8, label: "Proof" },
  { id: 9, label: "One" },
  { id: 10, label: "AI" },
  { id: 11, label: "Team" },
  { id: 12, label: "Future" },
];

export const StoryProgress = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Find the scrollable main container
      const scrollContainer = document.querySelector('main.snap-scroll-container') as HTMLElement;
      
      if (!scrollContainer) {
        // Fallback to window if container not found
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        const maxScroll = scrollHeight - clientHeight;
        const scrollPercent = maxScroll > 0 ? scrollTop / maxScroll : 0;
        
        setProgress(Math.min(Math.max(scrollPercent, 0), 1));
        
        const sectionIndex = Math.min(
          Math.max(Math.floor(scrollPercent * sections.length) + 1, 1),
          sections.length
        );
        setCurrentSection(sectionIndex);
        return;
      }
      
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;
      const maxScroll = scrollHeight - clientHeight;
      const scrollPercent = maxScroll > 0 ? scrollTop / maxScroll : 0;
      
      setProgress(Math.min(Math.max(scrollPercent, 0), 1));
      
      const sectionIndex = Math.min(
        Math.max(Math.floor(scrollPercent * sections.length) + 1, 1),
        sections.length
      );
      setCurrentSection(sectionIndex);
    };

    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      handleScroll();
      
      // Find the scrollable container
      const scrollContainer = document.querySelector('main.snap-scroll-container') as HTMLElement;
      
      if (scrollContainer) {
        scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
      } else {
        // Fallback to window scroll
        window.addEventListener("scroll", handleScroll, { passive: true });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      const scrollContainer = document.querySelector('main.snap-scroll-container') as HTMLElement;
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
      className="fixed left-8 top-1/2 -translate-y-1/2 z-40 pointer-events-none hidden lg:block"
    >
      {/* Vertical timeline */}
      <div className="relative flex flex-col items-center h-[70vh] max-h-[500px]">
        {/* Background track */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-border/30" />
        
        {/* Progress fill */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary/60 via-primary/50 to-primary/60 origin-top"
          style={{
            height: `${progress * 100}%`,
          }}
          initial={{ height: 0 }}
          animate={{ height: `${progress * 100}%` }}
          transition={{ duration: 0.15, ease: "linear" }}
        />
        
        {/* Section markers */}
        <div className="relative flex flex-col justify-between h-full">
          {sections.map((section, i) => {
            const isActive = i + 1 === currentSection;
            const isPast = i + 1 < currentSection;
            const isNearActive = Math.abs(i + 1 - currentSection) <= 2;
            
            return (
              <div
                key={section.id}
                className="relative flex items-center justify-center"
                style={{ 
                  position: 'absolute',
                  top: `${(i / (sections.length - 1)) * 100}%`,
                  transform: 'translateY(-50%)',
                  left: '50%',
                  marginLeft: '-50%',
                }}
              >
                {/* Dot marker */}
                <motion.div
                  className={`relative rounded-full transition-all duration-500 ${
                    isPast 
                      ? 'w-2 h-2 bg-primary/70' 
                      : isActive 
                        ? 'w-3 h-3 bg-primary' 
                        : 'w-1.5 h-1.5 bg-muted-foreground/40'
                  }`}
                  animate={{
                    scale: isActive ? 1.4 : isPast ? 1.1 : 1,
                    opacity: isNearActive ? 1 : isPast ? 0.7 : 0.5,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Glow for active */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/40"
                      animate={{
                        scale: [1, 2.5, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.div>
                
                {/* Label - show for active and nearby sections */}
                <motion.div
                  className="absolute left-6 whitespace-nowrap"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ 
                    opacity: isActive ? 0.8 : isNearActive ? 0.4 : 0,
                    x: 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className={`text-[11px] font-display font-medium tracking-wider uppercase ${
                    isActive 
                      ? 'text-primary/90' 
                      : 'text-muted-foreground/60'
                  }`}>
                    {section.label}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

