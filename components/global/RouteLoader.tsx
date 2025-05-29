"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Loader from "./Loader";

export default function RouteLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShow(true);
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    if (!loading) {
      // Wait for fade-out before unmounting
      const timeout = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  // Only render children when not loading
  if (show) {
    return loading ? <Loader /> : null;
  }
  return <>{children}</>;
} 