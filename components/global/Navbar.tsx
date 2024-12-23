"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-8 inset-x-0 z-50 md:max-w-[1260px] lg:w-5/6 h-[84px] mx-auto ${
        isScrolled
          ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#7EB2FF]  to-[#043071] rounded-[88px] drop-shadow-xl "
          : "bg-transparent"
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/">
          <Image src={logo} alt="logo" className="w-[157px] h-[40px]" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-white">
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
          className="hidden md:inline-block bg-white px-6 py-2 rounded-full text-[#292929] text-[14px] font-bold hover:bg-blue-300 transition"
        >
          Contact Us
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white text-2xl focus:outline-none"
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
          className="md:hidden text-white"
        >
          <Link
            href="/"
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
            href="/data-center"
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
            className="block px-6 py-3 bg-white text-blue-900 hover:bg-blue-300"
          >
            Connect
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
