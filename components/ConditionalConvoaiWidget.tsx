"use client";

import { usePathname } from "next/navigation";
import ConvaiWidget from "@/components/ConvoaiWidget";

export default function ConditionalConvoaiWidget() {
  const pathname = usePathname();
  
  // Don't render ConvaiWidget on vault and loan-kitchen pages
  if (pathname?.startsWith('/vault') || pathname === '/loan-kitchen' || pathname === '/loan-kitchen/') {
    return null;
  }
  
  return <ConvaiWidget />;
}
