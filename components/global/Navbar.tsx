"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { HiChevronDown } from "react-icons/hi";
import Image from "next/image";
import logo from "@/public/logo.png";
import blueLogo from "@/public/blue_logo.webp";
import PortalDropdown from "./PortalDropdown";
import { blogContent } from "@/components/constant/blogs";
import dynamic from "next/dynamic";

const Contact = dynamic(() => import("../contacts"), { ssr: false });

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const solutionsRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  const [selectedBlogs, setSelectedBlogs] = useState(() => {
    // Pick 2 random blogs initially (will be replaced on first open)
    const shuffled = [...blogContent].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  });
  const [showContactModal, setShowContactModal] = useState(false);

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
      setDropdownOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Persist random blogs only when dropdown is opened
  useEffect(() => {
    if (dropdownOpen) {
      const shuffled = [...blogContent].sort(() => 0.5 - Math.random());
      setSelectedBlogs(shuffled.slice(0, 2));
    }
  }, [dropdownOpen]);

  // const isContactOrResourcePage = pathname === "/contact" || pathname === "/resource_center" || pathname === "/resource_center/out_of_the_lending_maze" || pathname === "/resource_center/from_fragmentation_to_seamlessness" || pathname === "/resource_center/beyond_decisioning" || pathname === "/resource_center/redefining_borrower";

  const BlueLogoPaths = [
    "/roi-calculator", "/roi-calculator/", "/algebrik-webinar1", "/algebrik-webinar1/",
    "/contact", "/contact/", "/privacy-policy", "/privacy-policy/",
    "/resource_center", "/resource_center/",
    "/resource_center/out_of_the_lending_maze", "/resource_center/out_of_the_lending_maze/",
    "/resource_center/from_fragmentation_to_seamlessness", "/resource_center/from_fragmentation_to_seamlessness/",
    "/resource_center/beyond_decisioning", "/resource_center/beyond_decisioning/",
    "/resource_center/redefining_borrower", "/resource_center/redefining_borrower/",
    "/thank_you/",
    "/resource_center/algebrik-ai-and-conductiv-elevate-lending-with-permissioned-data-automated-stipulations-and-smarter-underwriting",
    "/resource_center/algebrik-ai-and-conductiv-elevate-lending-with-permissioned-data-automated-stipulations-and-smarter-underwriting/",
    "/resource_center/credit-union-mergers-are-at-an-all-time-high",
    "/resource_center/credit-union-mergers-are-at-an-all-time-high/",
    "/resource_center/how-digital-first-credit-unions-are-winning-member-loyalty",
    "/resource_center/how-digital-first-credit-unions-are-winning-member-loyalty/",
    "/resource_center/innovations-reshaping-lending-workflows",
    "/resource_center/innovations-reshaping-lending-workflows/",
    "/resource_center/what-driving-the-shift-to-intelligent-lending",
    "/resource_center/what-driving-the-shift-to-intelligent-lending/",
    "/resource_center/what-you-will-learn-in-our-intelligent-lending-roundtable",
    "/resource_center/what-you-will-learn-in-our-intelligent-lending-roundtable/",
  ]

  const isContactOrResourcePage = Boolean(BlueLogoPaths.includes(pathname));

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
  if (pathname === "/gac-conference-dinner/") {
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
          className={`hidden md:flex space-x-8 items-center ${isContactOrResourcePage
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
            className="relative font-plus-jakarta"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
            ref={solutionsRef}
          >
            <Link
              href="/solutions"
              onClick={(e) => e.preventDefault()}
              className={`flex items-center px-[15px] py-[11px] hover:bg-black/20 ${dropdownOpen ? 'bg-black/20' : ''} rounded-[20px] hover:text-white transition`}
            >
              Solutions
              <HiChevronDown
                className={`ml-2 transform transition-all ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
              />
            </Link>
            {dropdownOpen && (
              <PortalDropdown anchorRef={solutionsRef}>
                <div className="flex gap-12 min-w-[1100px]  rounded-2xl p-4 shadow-2xl font-plus-jakarta">
                  {/* Column 1: By Institution */}
                  <div className="flex flex-col min-w-[260px] gap-3">
                    <div className="text-[18px] p-3 font-bold text-[#FFFFFF] border-b border-[#4571AF]">By Institution</div>
                    <Link href="/solutions/credit-union" className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 transition text-white text-base font-medium">
                      <Image src="/icons/svg/bank.svg" alt="Credit Unions Icon" width={20} height={20} />
                      Credit Unions
                    </Link>
                    <Link href="/solutions/auto-lenders" className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 transition text-white text-base font-medium">
                      <Image src="/icons/svg/car.svg" alt="Auto Lenders Icon" width={20} height={20} />
                      Auto Lenders
                    </Link>
                    <Link href="/solutions/banks" className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 transition text-white text-base font-medium">
                    <Image src="/icons/svg/bank.svg" alt="Credit Unions Icon" width={20} height={20} />
                      Banks
                    </Link>
                  </div>
                  {/* Column 2: By Usecase + Button */}
                  <div className="flex flex-col min-w-[260px] gap-3">
                      <div className="text-[18px]  p-3 font-bold text-[#FFFFFF] border-b border-[#4571AF]">By Usecase</div>
                      <Link href="/solutions/omnichannel-point-of-sale" className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 transition text-white text-base font-medium">
                        <Image src="/icons/pos.svg" alt="Point of Sale Icon" width={20} height={20} />
                        Point of Sale
                      </Link>
                      <Link href="/solutions/decisioning" className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 transition text-white text-base font-medium">
                        <Image src="/icons/de.svg" alt="Decisioning Engine Icon" width={20} height={20} />
                        Decisioning Engine
                      </Link>
                      <Link href="/solutions/dashboard-analytics" className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 transition text-white text-base font-medium">
                        <Image src="/icons/da.svg" alt="Dashboard Analytics Icon" width={20} height={20} />
                        Dashboard Analytics
                      </Link>
                      <Link href="/solutions/lender-cockpit" className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 transition text-white text-base font-medium">
                        <Image src="/icons/lc.svg" alt="Lender Cockpit Icon" width={20} height={20} />
                        Lender Cockpit
                      </Link>
                  </div>
                  {/* Column 3: Blog Cards */}
                  <div className="flex flex-col gap-6 min-w-[360px] pl-8">
                    {selectedBlogs.map((blog, i) => (
                      <Link key={i} href={`/resource_center/${blog.blogSubtitle}`} className="rounded-xl bg-black/20 p-6 flex gap-4 items-center min-w-[340px] shadow-md hover:bg-white/30 transition">
                        <div className="min-w-[160px] max-w-[160px] min-h-[125px] max-h-[125px] bg-white/30 rounded-lg flex items-center justify-center overflow-hidden">
                          <img src={blog.blogImage} alt={blog.blogTitle} className="object-cover w-[160px] h-[125px] rounded-lg" />
                        </div>
                        <div className="flex flex-col justify-start h-full">
                          <span className="text-sm text-[#A0AEC0] font-bold mb-1  tracking-[30%] ">BLOG</span>
                          <span className="text-white font-semibold text-[20px] leading-normal">{blog.blogTitle}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </PortalDropdown>
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
        <button
          type="button"
          onClick={() => setShowContactModal(true)}
          className={`hidden md:inline-block px-6 py-2 rounded-full text-[14px] font-bold transition ${isScrolled
            ? isContactOrResourcePage
              ? "bg-white text-[#292929] hover:bg-gray-700"
              : "bg-white text-[#292929] hover:bg-blue-300"
            : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
        >
          Contact Us
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className={`md:hidden text-2xl focus:outline-none ${isScrolled ? "text-white" : isContactOrResourcePage ? "text-black" : "text-white"
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
                <Link href="/solutions/credit-union" onClick={toggleMenu} className="block px-6 py-3 text-[18px] hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white">
                  Credit Union
                </Link>
                <Link href="/solutions/auto-lenders" onClick={toggleMenu} className="block px-6 py-3 text-[18px]  hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white">
                  Auto Lenders
                </Link>
                <Link href="/solutions/banks" onClick={toggleMenu} className="block px-6 py-3 text-[18px] hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white">
                  Banks
                </Link>
                <Link href="/solutions/decisioning" onClick={toggleMenu} className="block px-6 py-3 text-[18px]  hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white">
                  Decisioning
                </Link>
                <Link href="/solutions/omnichannel-point-of-sale" onClick={toggleMenu} className="block px-6 py-3 text-[18px] hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white">
                  Omnichannel point of sale
                </Link>
                <Link href="/solutions/dashboard-analytics" onClick={toggleMenu} className="block px-6 py-3 text-[18px] hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white">
                  Dashboard Analytics
                </Link>
                <Link href="/solutions/lender-cockpit" onClick={toggleMenu} className="block px-6 py-3 text-[18px] hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white">
                  Lender Cockpit
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
            <button
              type="button"
              onClick={() => { setShowContactModal(true); toggleMenu(); }}
              className="block px-6 py-4 border border-[#B4C7E1] text-[18px] w-full text-center bg-white shadow-2xl rounded-[36px] text-black hover:bg-gray-700"
            >
              Contact Us
            </button>
          </div>
        </motion.div>
      )}
      {/* Contact Modal */}
      <Contact open={showContactModal} onClose={() => setShowContactModal(false)} />
    </motion.nav>
  );
}
