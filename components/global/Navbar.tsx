"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { HiChevronDown } from "react-icons/hi";
import Image from "next/image";
import logo from "@/public/logo.png";
import blueLogo from "@/public/blue_logo.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openDropdown = () => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    const timeout = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
    setDropdownTimeout(timeout);
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

  const isContactOrResourcePage = pathname === "/contact" || pathname === "/resource_center" || pathname === "/resource_center/out_of_the_lending_maze" || pathname === "/resource_center/from_fragmentation_to_seamlessness" || pathname === "/resource_center/beyond_decisioning" || pathname === "/resource_center/redefining_borrower";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-8 inset-x-0 z-50 md:max-w-[1260px] lg:w-5/6 h-[84px] mx-auto ${
        isScrolled
          ? isContactOrResourcePage
            ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#7EB2FF] to-[#043071] rounded-[88px] drop-shadow-xl"
            : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#7EB2FF] to-[#043071] rounded-[88px] drop-shadow-xl"
          : "bg-transparent"
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-10 py-6 flex justify-between items-center">
        <Link href="/">
          <Image
            src={isScrolled ? logo : isContactOrResourcePage ? blueLogo : logo}
            alt="logo"
            className="w-[157px] h-[40px]"
          />
        </Link>

        {/* Desktop Menu */}
        <div
          className={`hidden md:flex space-x-8 ${
            isContactOrResourcePage
              ? isScrolled
                ? "text-white"
                : "text-black"
              : "text-white"
          }`}
        >
          <Link href="/platform" className="hover:text-blue-300 transition">
            Platform
          </Link>

          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={openDropdown} 
            onMouseLeave={closeDropdown} 
          >
            <Link
              href="/solutions"
              onClick={(e) => e.preventDefault()}
              className="flex items-center   hover:bg-opacity-50 rounded-[20px] hover:text-white transition"
            >
              Solutions
              <HiChevronDown
                className={`ml-2 transform transition-all ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`} 
              />
            </Link>
            {dropdownOpen && (
              <div
                className="absolute p-[16px] top-full flex flex-col items-start justify-center left-0 md:w-[303px] md:h-[176px] mt-2 bg-black/50 backdrop-blur-3xl rounded-[20px] text-white shadow-lg"
                onClick={closeDropdown}
              >
                <Link
                  href="/solutions/credit_union"
                  className="block px-4 py-2 hover:bg-gray-200 hover:w-full hover:bg-opacity-60 hover:backdrop-blur-2xl hover:rounded-lg"
                >
                    <div className="flex items-center gap-2">
      <Image
        src="/icons/svg/bank.svg"
        alt="Credit Unions Icon"
        width={20}
        height={20}
        className="text-white"
      />
      Credit Unions
    </div>
                </Link>
                <Link
                  href="/solutions/auto_lenders"
                  className="block px-4 py-2  hover:bg-gray-200 hover:w-full hover:bg-opacity-60 hover:backdrop-blur-2xl hover:rounded-lg"
                >
              <div className="flex items-center gap-2">
      <Image
        src="/icons/svg/car.svg"
        alt="Auto Lenders Icon"
        width={20}
        height={20}
        className="text-white"
      />
      Auto Lenders
    </div>
                </Link>
                <Link
                  href="/solutions/smb_lenders"
                  className="block px-4 py-2  hover:bg-gray-200 hover:w-full hover:bg-opacity-60 hover:backdrop-blur-2xl hover:rounded-lg"
                >
                <div className="flex items-center gap-2">
      <Image
        src="/icons/svg/shop.svg"
        alt="Coming Soon Icon"
        width={20}
        height={20}
        className="text-white"
      />
      SMB Lenders
    </div>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/resource_center"
            className="hover:text-blue-300 transition"
          >
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
              ? isContactOrResourcePage
                ? "bg-white text-[#292929] hover:bg-gray-700"
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
            isContactOrResourcePage ? "text-black" : "text-white"
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
          className={`md:hidden ${isContactOrResourcePage ? "text-black" : "text-white"}`}
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
