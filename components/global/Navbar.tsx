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
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSolutions = () => {
    setIsSolutionsOpen(!isSolutionsOpen);
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

  // const isContactOrResourcePage = pathname === "/contact" || pathname === "/resource_center" || pathname === "/resource_center/out_of_the_lending_maze" || pathname === "/resource_center/from_fragmentation_to_seamlessness" || pathname === "/resource_center/beyond_decisioning" || pathname === "/resource_center/redefining_borrower";

  const BlueLogoPaths = [
    "/contact", "/contact/",
    "/resource_center", "/resource_center/",
    "/resource_center/out_of_the_lending_maze","/resource_center/out_of_the_lending_maze/",
    "/resource_center/from_fragmentation_to_seamlessness","/resource_center/from_fragmentation_to_seamlessness/",
    "/resource_center/beyond_decisioning","/resource_center/beyond_decisioning/",
    "/resource_center/redefining_borrower","/resource_center/redefining_borrower/",
    "/thank_you/"
  ]

  const isContactOrResourcePage = Boolean(BlueLogoPaths.includes(pathname));

  console.log({isContactOrResourcePage,pathname})

  function getLogo() {
    if (isScrolled) {
      return logo;
    } else {
      if (isContactOrResourcePage) {
        return blueLogo
      } else {
        return logo
      }
    }
  }
  if(pathname === "/gac-conference-dinner/"){
    return null;
  }
  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-8 inset-x-0 z-50 md:max-w-[1260px] lg:w-5/6 h-[84px] mx-auto ${isScrolled
        ? isContactOrResourcePage
          ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#7EB2FF] to-[#043071] rounded-[88px] drop-shadow-xl"
          : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#7EB2FF] to-[#043071] rounded-[88px] drop-shadow-xl"
        : "bg-transparent"
        } transition-all duration-300`}
    >
      <div className="container mx-auto px-10 py-6 flex justify-between items-center">
        <Link href="/">
          <Image
            src={getLogo()}
            alt="logo"
            className="w-[157px] h-[40px]"
          />
        </Link>

        {/* Desktop Menu */}
        <div
          className={`hidden md:flex space-x-8 ${isContactOrResourcePage
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
              className="flex items-center   hover:bg-opacity-50 rounded-[20px] hover:text-black transition"
            >
              Solutions
              <HiChevronDown
                className={`ml-2 transform transition-all ${dropdownOpen ? "rotate-180" : "rotate-0"
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
                  onClick={toggleMenu}
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
                  href="/solutions/banks"
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
                    Banks
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
          className={`hidden md:inline-block px-6 py-2 rounded-full text-[14px] font-bold transition ${isScrolled
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
          className={`md:hidden text-2xl focus:outline-none ${isScrolled? "text-white" : isContactOrResourcePage ? "text-black" : "text-white"
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
          className={`md:hidden flex flex-col justify-between gap bg-white font-plus-jakarta backdrop-blur-3xl py-6 h-[500px]
            px-5 ${isContactOrResourcePage ? "text-black" : "text-black"}`}
        >
          <div>
            <Link
              href="/platform"
              onClick={toggleMenu}
              className="block px-6 py-3 text-[18px] font-plus-jakarta hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white"
            >
              Platform
            </Link>
            <div

              onClick={toggleSolutions}
              className="block px-6 py-3 text-[18px] hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white"
            >
              Solutions
            </div>
            {isSolutionsOpen && (
              <div className="pl-6">
                <Link href="/solutions/credit_union" onClick={toggleMenu} className="block px-6 py-3 text-[18px] hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white">
                  Credit Union
                </Link>
                <Link href="/solutions/auto_lenders" onClick={toggleMenu} className="block px-6 py-3 text-[18px]  hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white">
                  Auto Lenders
                </Link>
                <Link href="/solutions/banks" onClick={toggleMenu} className="block px-6 py-3 text-[18px] hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white">
                  Banks
                </Link>
              </div>
            )}
            <Link
              href="/resource_center"
              onClick={toggleMenu}
              className="block px-6 py-3 text-[18px]  hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white"
            >
              Resource Center
            </Link>
            <Link
              href="/about"
              onClick={toggleMenu}
              className="block px-6 py-3 text-[18px]  hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white"
            >
              About Us
            </Link>
          </div>
          <div>
            <Link
              href="/contact"
              onClick={toggleMenu}
              className="block px-6 py-4 border border-[#B4C7E1] text-[18px] w-full text-center bg-white shadow-2xl rounded-[36px] text-black hover:bg-gray-700"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
