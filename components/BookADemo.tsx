"use client";

import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function BookADemo() {
  const [clicked, setClicked] = useState(false);
  const [email, setEmail] = useState("");
  const pathname = usePathname();

  const handleClick = () => {
    if (valid(email)) {
      setClicked(true);
      console.log("Email sent successfully");
    } else {
      console.error("Invalid email");
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  function valid(email: string) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  return (
    <div className="relative w-full sm:w-[353px] flex items-center gap-4 mt-4">
      <div className="hidden md:flex w-full sm:w-[353px] items-center gap-4">
        {!clicked && (
          <input
            type="email"
            onChange={handleEmailChange}
            placeholder="Enter your work email"
            className="w-full sm:w-[353px] h-[48px] font-plus-jakarta px-4 py-2 bg-[#3E6296] placeholder-[#C1DAFF] text-[#C1DAFF] text-[14px] font-medium rounded-[31px] focus:outline-none"
          />
        )}

        <motion.button
          onClick={handleClick}
          animate={{
            width: clicked ? "100%" : "143px",
            backgroundColor: clicked ? "#5cb85c" : "#1C8DEA",
          }}
          className="absolute w-[143px] h-[48px] font-plus-jakarta right-0 bg-[#1C8DEA] text-white text-[14px] font-medium rounded-[31px] px-6 py-2 border border-[#2F9AFB] hover:opacity-90 transition-all"
        >
          {!clicked ? "Book a Demo" : "We'll get back to you"}
          {/* Book a Demo */}
        </motion.button>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 w-full md:hidden">
        <button className=" w-[326px] h-[52px] font-plus-jakarta bg-[#1C8DEA] text-white text-[16px] font-medium rounded-[31px] px-6 py-2 border border-[#2F9AFB] hover:opacity-90 transition-all">
          Book a Demo
        </button>
        {pathname !== "/" && pathname !== "/about" && (
          <button className="w-[326px] h-[52px] border border-[#2F9AFB] bg-[#1D457F] text-white py-3 rounded-[31px] text-[16px] font-plus-jakarta font-medium">
            Watch a Demo
          </button>
        )}
      </div>
    </div>
  );
}
