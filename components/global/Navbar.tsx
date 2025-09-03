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
import ReactDOM from "react-dom";
import { WEBINARS } from "../constant/webinars";
import { useIsMobile } from "@/hooks/use-mobile";

const Contact = dynamic(() => import("../contacts"), { ssr: false });

function ContactModalPortal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (typeof window === "undefined") return null;
  return ReactDOM.createPortal(
    <Contact open={open} onClose={onClose} />,
    document.body
  );
}

interface Partner {
  name: string;
  image: string;
  category: string;
  description: string;
  website: string;
  logoClass: string;
}

const partnerData: { [key: string]: Partner } = {
  'Equifax': {
    name: 'Equifax',
    image: '/menu-icons/ef.png',
    category: 'Core Banking & Financial Data',
    description: 'Consumer-permissioned access to real-time financial data enabling faster, more accurate lending decisions.',
    website: 'https://www.equifax.com/',
    logoClass: 'bg-gradient-to-r from-green-400 to-blue-400'
  },
  'Plaid': {
    name: 'Plaid',
    image: "/menu-icons/plaid.png",
    category: 'Core Banking & Financial Data',
    description: 'Consumer-permissioned access to real-time financial data enabling faster, more accurate lending decisions.',
    website: 'https://plaid.com',
    logoClass: 'bg-gradient-to-r from-green-400 to-blue-400'
  },
  'Corelation': {
    name: 'Corelation',
    image: "/menu-icons/cr.png",
    category: 'Document & Workflow Management',
    description: 'Industry-leading electronic signature technology with new sonic identity reflecting leadership position.',
    website: 'https://corelationinc.com/',
    logoClass: 'bg-yellow-500'
  },
  'Jack Henry': {
    name: 'Jack Henry',
    image: "/menu-icons/jh.png",
    category: 'Credit Bureaus',
    description: 'Comprehensive credit reporting and risk assessment with deep industry expertise and tradition of trust in lending decisions.',
    website: 'https://www.jackhenry.com/',
    logoClass: 'bg-red-600'
  },
  'TruStage': {
    name: 'TruStage',
    image: "/menu-icons/ts.png",
    category: 'Auto Lending & Vehicle Data',
    description: 'Comprehensive F&I platform connecting dealerships with approximately 1,500 integrated finance sources.',
    website: 'https://www.trustage.com/',
    logoClass: 'bg-blue-600'
  }
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const solutionsRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  const aboutRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  const [selectedBlogs, setSelectedBlogs] = useState(() => {
    // Pick 2 random blogs initially (will be replaced on first open)
    const shuffled = [...blogContent].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  });
  const [showContactModal, setShowContactModal] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutTimeout, setAboutTimeout] = useState<NodeJS.Timeout | null>(null);
  const isMobile=useIsMobile();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSolutions = () => {
    setIsSolutionsOpen(!isSolutionsOpen);
  };

  const openAbout = () => {
    if (aboutTimeout) clearTimeout(aboutTimeout);
    setAboutOpen(true);
  };

  const toggleAbout = () => {
    setAboutOpen(!aboutOpen)
  }

  const closeAbout = () => {
    const timeout = setTimeout(() => {
      setAboutOpen(false);
    }, 200);
    setAboutTimeout(timeout);
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
      setAboutOpen(false);
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

  // const isContactOrResourcePage = pathname === "/contact" || pathname === "/resource-center" || pathname === "/resource-center/out_of_the_lending_maze" || pathname === "/resource-center/from_fragmentation_to_seamlessness" || pathname === "/resource-center/beyond_decisioning" || pathname === "/resource-center/redefining_borrower";

  const BlueLogoPaths = [
    "/vlo","/vlo/",
    "/roi-calculator", "/roi-calculator/", "/algebrik-webinar1", "/algebrik-webinar1/",
    "/contact", "/contact/", "/privacy-policy", "/privacy-policy/",
    "/resource-center", "/resource-center/",
    "/resource-center/out_of_the_lending_maze", "/resource-center/out_of_the_lending_maze/",
    "/resource-center/from_fragmentation_to_seamlessness", "/resource-center/from_fragmentation_to_seamlessness/",
    "/resource-center/beyond_decisioning", "/resource-center/beyond_decisioning/",
    "/resource-center/redefining_borrower", "/resource-center/redefining_borrower/",
    "/thank-you/",
    "/resource-center/algebrik-ai-and-conductiv-elevate-lending-with-permissioned-data-automated-stipulations-and-smarter-underwriting",
    "/resource-center/algebrik-ai-and-conductiv-elevate-lending-with-permissioned-data-automated-stipulations-and-smarter-underwriting/",
    "/resource-center/credit-union-mergers-are-at-an-all-time-high",
    "/resource-center/credit-union-mergers-are-at-an-all-time-high/",
    "/resource-center/how-digital-first-credit-unions-are-winning-member-loyalty",
    "/resource-center/how-digital-first-credit-unions-are-winning-member-loyalty/",
    "/resource-center/innovations-reshaping-lending-workflows",
    "/resource-center/innovations-reshaping-lending-workflows/",
    "/resource-center/what-driving-the-shift-to-intelligent-lending",
    "/resource-center/what-driving-the-shift-to-intelligent-lending/",
    "/resource-center/what-you-will-learn-in-our-intelligent-lending-roundtable",
    "/resource-center/what-you-will-learn-in-our-intelligent-lending-roundtable/",
    '/resource-center/algebrik-ai-partners-with-equifax-to-power-smarter-fairer-and-faster-loan-decisions',
    '/resource-center/algebrik-ai-partners-with-equifax-to-power-smarter-fairer-and-faster-loan-decisions/',
    '/resource-center/a-product-peek-into-what-is-new-at-algebrik-this-month',
    '/resource-center/a-product-peek-into-what-is-new-at-algebrik-this-month/',
    "/integrations",
    "/integrations/",
    "/become-a-partner",
    "/become-a-partner/",
    "/lending-health-check",
    "/lending-health-check/",
    "/jack-henry",
    "/jack-henry/",
    "/page-not-found",
    "/page-not-found/",
    "/resource-center/is-your-member-experience-broken",
    "/resource-center/is-your-member-experience-broken/",
    "/resource-center/the-silent-sabotage",
    "/resource-center/the-silent-sabotage/",
    "/resource-center/how-credit-unions-are-putting-agentic-ai-to-work",
    "/resource-center/how-credit-unions-are-putting-agentic-ai-to-work/",
    "/resource-center/building-digital-first-loyalty-for-credit-unions",
    "/resource-center/building-digital-first-loyalty-for-credit-unions/",
    "/resource-center/automating-lending-decisions-with-unprecedented-precision",
    "/resource-center/automating-lending-decisions-with-unprecedented-precision/",
    "/resource-center/the-future-of-auto-lending",
    "/resource-center/the-future-of-auto-lending/",
    "/resource-center/cable-tv-lending-is-dead",
    "/resource-center/cable-tv-lending-is-dead/",
    "/resource-center/mastering-digital-onboarding",
    "/resource-center/mastering-digital-onboarding/",
    "/resource-center/year-one-at-algebrik",
    "/resource-center/year-one-at-algebrik/",
    ...WEBINARS.map(item => item.link),
    ...WEBINARS.map(item => item.link + "/")
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

  // Hide Navbar on all /ufcu routes
  if (pathname.startsWith('/ufcu')) {
    return null;
  }

  if (pathname === "/gac-conference-dinner/") {
    return null;
  }
  return (
    <motion.nav
      // initial={{ opacity: 0, y: -50 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.8 }}
      className={`fixed top-8 inset-x-0 z-50 md:max-w-[1260px] lg:w-5/6 h-[84px] mx-auto  ${isScrolled
        ? isContactOrResourcePage
          ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#7EB2FF] to-[#043071] rounded-[88px] drop-shadow-xl w-[90%] max-w-[95%]"
          : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#7EB2FF] to-[#043071] rounded-[88px] drop-shadow-xl w-[90%] max-w-[95%]"
        : "bg-transparent"
        } transition-all duration-300`}
    >
      <div className="container mx-auto px-10 py-6 flex justify-between items-center">
        {!isScrolled && <Link href="/">
          <Image
            src={getLogo()}
            alt="logo"
            className="w-[157px] h-[40px]"
          />
        </Link>
        }

        {(isScrolled) ? isMobile ? <Link href="/">
          <img
            src={"/a.png"}
            alt="logo"
            className="w-[40px]"
          />
        </Link>:<Link href="/">
          <Image
            src={getLogo()}
            alt="logo"
            className="w-[157px] h-[40px]"
          />
        </Link>:""}

        {/* Desktop Menu */}
        <div
          className={`hidden md:flex space-x-8 items-center ${isContactOrResourcePage
            ? isScrolled
              ? "text-white"
              : "text-black"
            : "text-white"
            }`}
        >
          <Link href="/platform" className="hover:text-[#15C3A9] transition">
            Platform
          </Link>

          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
            ref={solutionsRef}
          >
            <Link
              href="/solutions"
              onClick={(e) => e.preventDefault()}
              className={` transition flex items-center px-2 py-1 hover:bg-black/20 ${dropdownOpen ? 'bg-black/20 text-[' : ''} rounded-[20px] hover:text-[#15C3A9] transition`}
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
                    <Link href="/solutions/digital-account-opening" className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 transition text-white text-base font-medium">
                      <Image src="/icons/lc.svg" alt="Lender Cockpit Icon" width={20} height={20} />
                      Digital Account Opening
                    </Link>
                    <Link href="/solutions/lender-cockpit" className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 transition text-white text-base font-medium">
                      <Image src="/icons/lc.svg" alt="Lender Cockpit Icon" width={20} height={20} />
                      Lender's Cockpit (LOS)
                    </Link>
                    <Link href="/solutions/decisioning" className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 transition text-white text-base font-medium">
                      <Image src="/icons/de.svg" alt="Decisioning Engine Icon" width={20} height={20} />
                      Decisioning Engine
                    </Link>
                    <Link href="/solutions/portfolio-analytics" className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 transition text-white text-base font-medium">
                      <Image src="/icons/da.svg" alt="Dashboard Analytics Icon" width={20} height={20} />
                      Portfolio Analytics
                    </Link>

                  </div>
                  {/* Column 3: Blog Cards */}
                  <div className="flex flex-col gap-6 min-w-[360px] pl-8">
                    {selectedBlogs.map((blog, i) => (
                      <Link key={i} href={`/resource-center/${blog.blogSubtitle}`} className="rounded-xl bg-black/20 p-6 flex gap-4 items-center min-w-[340px] shadow-md hover:bg-white/30 transition">
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
            href="/resource-center"
            className="hover:text-[#15C3A9] transition"
          >
            Resource Center
          </Link>
          <div
            className="relative"
            onMouseEnter={openAbout}
            onMouseLeave={closeAbout}
            ref={aboutRef}
          >
            <Link
              href="/about"
              onClick={(e) => e.preventDefault()}
              className={` transition flex items-center px-2 py-1 hover:bg-black/20 ${aboutOpen ? 'bg-black/20 text-white' : ''} rounded-[20px] hover:text-[#15C3A9] transition`}
            >
              About Us
              <HiChevronDown
                className={`ml-2 transform transition-all ${aboutOpen ? "rotate-180" : "rotate-0"}`}
              />
            </Link>
            {aboutOpen && (
              <PortalDropdown anchorRef={aboutRef} autoWidth={true}>
                <div className="lg:grid grid-cols-3 gap-12 min-w-[1100px]  rounded-2xl p-4 shadow-2xl font-plus-jakarta hidden">
                  {/* Column 1: By Institution */}
                  <div className="flex flex-col  gap-3">
                    <div className="text-[18px] p-3 font-bold text-[#FFFFFF] border-b border-[#4571AF]">About Us</div>
                    <Link href="/about" className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 transition text-white text-base font-medium">
                      <Image src="/icons/company.svg" alt="Credit Unions Icon" width={20} height={20} />
                      Company
                    </Link>
                    <Link href="/integrations" className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 transition text-white text-base font-medium">
                      <Image src="/icons/integrations.svg" alt="Auto Lenders Icon" width={20} height={20} />
                      Integrations
                    </Link>
                    <Link href="/become-a-partner" className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 transition text-white text-base font-medium">
                      <Image src="/icons/partner.svg" alt="Credit Unions Icon" width={20} height={20} />
                      Become a Partner
                    </Link>
                  </div>
                  <div className="col-span-2 flex flex-col min-w-[260px] gap-3">
                    <div className="text-[18px] p-3 font-bold text-[#FFFFFF] border-b border-[#4571AF]">Featured Integrations</div>
                    <div className="grid grid-cols-3 gap-6 my-4 pr-20">
                      {Object.values(partnerData).map((partner, i) => (
                        <Link key={i} target="_blank" href={partner.website} className="px-10 w-full h-16 flex items-center gap-2  py-3 rounded-lg transition text-black text-base font-medium">
                          <img src={partner.image} alt={partner.name} className="w-full h-full object-contain" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </PortalDropdown>
            )}
          </div>
          {/* <Link href="/about" className="hover:text-blue-300 transition">
            About Us
          </Link> */}
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
          className={`md:hidden flex flex-col justify-between gap bg-white font-plus-jakarta backdrop-blur-3xl py-6 h-[90vh] pb-10 overflow-y-scroll
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
                <Link href="/solutions/omnichannel-point-of-sale" onClick={toggleMenu} className="block px-6 py-3 text-[18px] hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white">
                  Point of sale
                </Link>
                <Link href="/solutions/digital-account-opening" onClick={toggleMenu} className="block px-6 py-3 text-[18px] hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white">
                  Digital Account Opening
                </Link>
                <Link href="/solutions/lender-cockpit" onClick={toggleMenu} className="block px-6 py-3 text-[18px] hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white">
                  Lender's Cockpit (LOS)
                </Link>
                <Link href="/solutions/decisioning" onClick={toggleMenu} className="block px-6 py-3 text-[18px]  hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white">
                  Decisioning Engine
                </Link>
                <Link href="/solutions/portfolio-analytics" onClick={toggleMenu} className="block px-6 py-3 text-[18px] hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white">
                  Portfolio Analytics
                </Link>

              </div>
            )}
            <Link
              href="/resource-center"
              onClick={toggleMenu}
              className="block px-6 py-3 text-[18px]  hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white"
            >
              Resource Center
            </Link>
            <div
              onClick={toggleAbout}
              className="block px-6 py-3 text-[18px]  hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white"
            >
              About Us
            </div>
            {aboutOpen && (
              <div className="pl-6 z-100">
                <Link href="/about" onClick={toggleMenu} className="block px-6 py-3 text-[18px] hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white">
                  Company
                </Link>
                <Link href="/integrations" onClick={toggleMenu} className="block px-6 py-3 text-[18px]  hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white">
                  Integrations
                </Link>
                <Link href="/become-a-partner" onClick={toggleMenu} className="block px-6 py-3 text-[18px] hover:bg-[#153A6F] opacity-85 rounded-[8px] hover:text-white">
                  Become a Partner
                </Link>
              </div>
            )}
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
      <ContactModalPortal open={showContactModal} onClose={() => setShowContactModal(false)} />
    </motion.nav>
  );
}
