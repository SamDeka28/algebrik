"use client";

import { motion } from "framer-motion";

type Solr26AmbientOrbsBackgroundProps = {
  className?: string;
};

/**
 * Centered soft gradient orbs. Uses overflow-visible so blur halos are not clipped.
 * Place inside a `relative` parent (e.g. max-w-7xl column).
 */
export default function Solr26AmbientOrbsBackground({
  className = "",
}: Solr26AmbientOrbsBackgroundProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 overflow-visible ${className}`}
      aria-hidden
    >
      {/* Geometry centered in the section column; glow may extend past edges */}
      <div className="absolute left-1/2 top-1/2 w-[min(92vw,920px)] max-w-full -translate-x-1/2 -translate-y-1/2">
        <div className="relative aspect-[16/11] w-full min-h-[min(52vw,380px)] md:min-h-[420px]">
          <motion.div
            className="absolute -left-[8%] -top-[12%] h-[min(42vw,320px)] w-[min(42vw,320px)] max-h-[380px] max-w-[380px] rounded-full bg-gradient-to-br from-[#66B3B0] to-[#149994] opacity-[0.28] blur-[80px] sm:blur-[96px] md:opacity-[0.32]"
            animate={{ opacity: [0.22, 0.32, 0.22] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-[32%] top-[22%] h-[min(46vw,340px)] w-[min(50vw,380px)] max-h-[420px] max-w-[460px] rounded-full bg-gradient-to-tr from-[#1C8DEA] to-[#195BD7] opacity-[0.22] blur-[88px] sm:blur-[100px] md:opacity-[0.26]"
            animate={{ opacity: [0.18, 0.28, 0.18] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-[18%] -right-[6%] h-[min(38vw,280px)] w-[min(38vw,280px)] max-h-[340px] max-w-[340px] rounded-full bg-[#BE95FF] opacity-[0.22] blur-[76px] sm:blur-[88px] md:opacity-[0.26]"
            animate={{ opacity: [0.17, 0.26, 0.17] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
