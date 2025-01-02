"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import Image from "next/image";
import logo from "@/public/logo.png";
import blueLogo from "@/public/blue_logo.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isContactPage = pathname === "/contact";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-8 inset-x-0 z-50 md:max-w-[1260px] lg:w-5/6 h-[84px] mx-auto ${
        isScrolled
          ? isContactPage
            ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#7EB2FF] to-[#043071] rounded-[88px] drop-shadow-xl"
            : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#7EB2FF] to-[#043071] rounded-[88px] drop-shadow-xl"
          : "bg-transparent"
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-10 py-6 flex justify-between items-center">
        <Link href="/">
          <Image
            src={isScrolled ? logo : isContactPage ? blueLogo : logo}
            alt="logo"
            className="w-[157px] h-[40px]"
          />
        </Link>

        {/* Desktop Menu */}
        <div className={`hidden md:flex space-x-8 ${isScrolled ? (isContactPage ? "text-white" : "text-black") : "text-black"}`}>

          <Link href="/platform" className="hover:text-blue-300 transition">
            Platform
          </Link>
          <Link href="/solutions" className="hover:text-blue-300 transition">
            Solutions
          </Link>
          <Link href="/resource_center" className="hover:text-blue-300 transition">
            Resource Center
          </Link>
          <Link href="/about" className="hover:text-blue-300 transition">
            About Us
          </Link>
        </div>
        <Link
          href="/contact"
          className={`hidden md:inline-block px-6 py-2 rounded-full text-[14px] font-bold transition ${
            isScrolled
              ? isContactPage
                ? "bg-white text-black hover:bg-gray-700"
                : "bg-white text-[#292929] hover:bg-blue-300"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}          
        >
          Contact Us
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className={`md:hidden text-2xl focus:outline-none ${
            isContactPage ? "text-black" : "text-white"
          }`}
        >
          {isOpen ? <HiX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`md:hidden ${isContactPage ? "text-black" : "text-white"}`}
        >
          <Link
            href="/platform"
            onClick={toggleMenu}
            className="block px-6 py-3 hover:bg-blue-700"
          >
            Platform
          </Link>
          <Link
            href="/solutions"
            onClick={toggleMenu}
            className="block px-6 py-3 hover:bg-blue-700"
          >
            Solutions
          </Link>
          <Link
            href="/resource_center"
            onClick={toggleMenu}
            className="block px-6 py-3 hover:bg-blue-700"
          >
            Resource Center
          </Link>
          <Link
            href="/about"
            onClick={toggleMenu}
            className="block px-6 py-3 hover:bg-blue-700"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            onClick={toggleMenu}
            className="block px-6 py-3 bg-black text-white hover:bg-gray-700"
          >
            Connect
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
