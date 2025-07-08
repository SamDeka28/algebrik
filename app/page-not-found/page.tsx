"use client";
import Link from "next/link";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#F8FAFF] to-[#E4E8ED] font-plus-jakarta relative px-4 py-12 overflow-hidden">
      {/* Animated background accent */}
      <div className="absolute left-0 top-0 w-[700px] h-[700px] bg-[#2A5FAC]/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-[#195BD7]/10 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="relative z-10 flex flex-col items-center gap-8 bg-white/95 rounded-3xl shadow-2xl px-8 py-16 max-w-xl w-full border border-[#E4E8ED]">
        {/* Large 404 number with playful icon */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[80px] md:text-[120px] font-extrabold text-[#2A5FAC] drop-shadow-lg leading-none tracking-tight">404</span>
          <Image src="/icons/ai.svg" alt="AI Icon" width={72} height={72} className="mb-2 animate-spin-slow" />
        </div>
        <CustomHeader text="Oops! Page Not Found" className="!text-[#2A5FAC] text-center text-[32px] md:text-[40px] font-bold" />
        <p className="!text-[#606060] text-lg md:text-xl text-center max-w-lg mb-2">We looked everywhere, but couldn’t find the page you’re after.<br/>Let’s get you back to something awesome!</p>
        <Link href="/">
          <button className="border border-[#2A5FAC] text-[#2A5FAC] rounded-full px-8 py-3 font-semibold hover:bg-[#2A5FAC] hover:text-white transition-all text-lg shadow-md mt-4">Go to Homepage</button>
        </Link>
      </div>
    </div>
  );
}

// Add this to your global CSS for slow spin:
// .animate-spin-slow { animation: spin 3s linear infinite; } 