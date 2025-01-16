"use client";

import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function BookADemo() {
  const [clicked, setClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const handleClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (!valid(email)) {
      return
    }

    setLoading(true)
    const res = await fetch(
      "https://api.hsforms.com/submissions/v3/integration/submit/47671281/91653e9f-bf54-4883-be96-9b37d9db08bf",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: [
            { name: "email", value: email },
          ],
        }),
      }
    );
    setLoading(false)
    if (res.ok) {
      setEmail("")
      setClicked(true);
    } else {
      alert("Failed to submit form.");
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
          className="absolute flex items-center justify-center w-[143px] h-[48px] font-plus-jakarta right-0 bg-[#1C8DEA] text-white text-[14px] font-medium rounded-[31px] px-6 py-2 border border-[#2F9AFB] hover:opacity-90 transition-all"
        >
          {loading &&

            <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
            </div>

          }
          {!loading ? 
          !clicked ? "Book a Demo" : "We'll get back to you" :''}

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
