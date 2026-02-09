"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Loader from "./Loader";

export default function RouteLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, [pathname]);

  // Always render children to maintain hook order, overlay loader when loading
  return (
    <>
      {loading && <Loader />}
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.3s' }}>
        {children}
      </div>
    </>
  );
} 