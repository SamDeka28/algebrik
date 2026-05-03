"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import ReactDOM from "react-dom";
import logo from "@/public/logo.png";
import blueLogo from "@/public/blue_logo.webp";
import { useIsMobile } from "@/hooks/use-mobile";

const ACCENT = "#2A5FAC";
const REPORT_HREF = "#year-in-numbers";

/** Same scroll threshold and surface transition as `components/global/Navbar.tsx`. */
export default function Solr26Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  const pillClass =
    "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#7EB2FF] to-[#043071] rounded-[88px] drop-shadow-xl w-[90%] max-w-[95%]";

  return (
    <>
      <motion.nav
        className={`fixed top-8 inset-x-0 z-50 md:max-w-[1260px] lg:w-5/6 h-[84px] mx-auto ${
          isScrolled ? pillClass : "bg-transparent"
        } transition-all duration-300`}
      >
        <div className="container mx-auto px-10 py-4 flex justify-between items-center h-full">
          {!isScrolled && (
            <Link href="/" aria-label="Algebrik home">
              <Image
                src={blueLogo}
                alt="Algebrik"
                className="w-[157px] h-[40px]"
                priority
              />
            </Link>
          )}

          {isScrolled ? (
            isMobile ? (
              <Link href="/" aria-label="Algebrik home">
                <img src="/a.png" alt="" className="w-[40px] h-[40px]" />
              </Link>
            ) : (
              <Link href="/" aria-label="Algebrik home">
                <Image src={logo} alt="Algebrik" className="w-[157px] h-[40px]" />
              </Link>
            )
          ) : null}

          <div className="hidden md:flex items-center gap-3 ml-auto">
            <Link
              href={REPORT_HREF}
              className={`px-5 py-2 rounded-full text-sm font-bold transition ${
                isScrolled
                  ? "bg-white text-[#292929] hover:bg-gray-100"
                  : "border-2 bg-white/80 hover:bg-white"
              }`}
              style={
                isScrolled
                  ? undefined
                  : { borderColor: ACCENT, color: ACCENT }
              }
            >
              Download Full Report
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className={`md:hidden text-2xl focus:outline-none p-1 ${
              isScrolled ? "text-white" : "text-[#292929]"
            }`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <HiX /> : <HiOutlineMenu />}
          </button>
        </div>
      </motion.nav>

      {menuOpen && mounted
        ? ReactDOM.createPortal(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed top-0 left-0 right-0 bottom-0 w-[100vw] min-h-[100dvh] bg-white z-[100] flex flex-col font-plus-jakarta pt-6 pb-10 px-5 overflow-y-auto text-black"
            >
              <div className="flex items-center justify-between mb-8 px-1">
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  <Image src={blueLogo} alt="Algebrik" className="h-8 w-auto" />
                </Link>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                  aria-label="Close"
                >
                  <HiX className="text-2xl" />
                </button>
              </div>
              <nav className="flex flex-col gap-4 text-lg font-semibold">
                <Link
                  href={REPORT_HREF}
                  className="py-3 border-b border-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Download Full Report
                </Link>
                <Link
                  href={REPORT_HREF}
                  className="py-3 border-b border-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Read Full Report
                </Link>
                <Link
                  href={REPORT_HREF}
                  className="py-3 border-b border-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Key Findings
                </Link>
              </nav>
            </motion.div>,
            document.body
          )
        : null}
    </>
  );
}
