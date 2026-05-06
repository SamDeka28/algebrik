"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./solr26Reveal.module.css";

type Solr26RevealProps = {
  children: React.ReactNode;
  className?: string;
  /**
   * CSS duration is the source of truth; this is only the IO trigger point.
   * Mirrors the reference HTML (threshold ~0.05 + slight bottom rootMargin).
   */
  threshold?: number;
  rootMargin?: string;
  /**
   * Optional stagger delay for this element (ms) via CSS var.
   */
  delayMs?: number;
};

export default function Solr26Reveal({
  children,
  className = "",
  threshold = 0.05,
  rootMargin = "0px 0px -2% 0px",
  delayMs,
}: Solr26RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Make sure the "no-JS fallback" becomes inactive once we mount.
    requestAnimationFrame(() => {
      document.documentElement.classList.add("solr26-reveal-ready");
    });

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setInView(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${inView ? styles.revealIn : ""} ${className}`}
      style={
        delayMs != null ? ({ ["--rev-delay" as any]: `${delayMs}ms` } as any) : undefined
      }
    >
      {children}
    </div>
  );
}

