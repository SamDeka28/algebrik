"use client";

import { usePathname } from "next/navigation";
import ConvaiWidget from "@/components/ConvoaiWidget";

export default function ConditionalConvoaiWidget() {
  const pathname = usePathname();
  
  // Don't render ConvaiWidget on vault pages
  if (pathname?.startsWith('/vault')) {
    return null;
  }
  
  return <ConvaiWidget />;
}
