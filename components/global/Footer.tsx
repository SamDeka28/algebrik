"use client";

import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { useState } from "react";
import Contact from "../contacts";

const Footer = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  return (
    <footer className="bg-[#121212] pt-[40px] px-[20px] md:px-0 pb-[20px] font-plus-jakarta md:border md:border-t-1 md:border-[#262932]">
      <hr className="w-full border-none md:border-t text-[#787C91] border-gray-700" />
      <div className="container  mx-auto pt-[40px] grid grid-cols-1 md:grid-cols-7 gap-[40px] md:gap-6 justify-items-start md:justify-items-end">
        <div className="w-full">
          <Image src={logo} alt="logo" width={157} height={40.19} />
          <div className="mt-2 text-[#787C91]">
            <p>Algebrik AI Inc</p>
            <p>300 East 59th Street Suite 2801</p>
            <p>New York, NY 10022</p>
            <p>United States</p>
            <p>Ph : <a href="tel:+1(917)974-8905">+1(917)974-8905</a></p>
          </div>
        </div>
        <div>
          <h3 className="text-white font-medium mb-[29px]">Branch Offices</h3>
          <div className="mt-2 text-[#787C91]">
            <p>Fort Wayne, IN</p>
            <p>Phoenix, AZ</p>
            <p>Houston, TX</p>
          </div>
        </div>
        <div className="hidden md:block">
          <h3 className="text-white font-medium mb-[29px]">Platform</h3>
          <ul className="space-y-1 text-[#787C91] text-[14px] flex flex-col gap:[7px]">
            <Link href="/platform" passHref>
              {" "}
              <li>Platform</li>{" "}
            </Link>
            <Link href="/solutions/credit_union" passHref>
              {" "}
              <li>For Credit Unions</li>
            </Link>
            <Link href="/solutions/smb_lenders" passHref>
              {" "}
              <li>For Banks</li>
            </Link>
            <Link href="/solutions/auto_lenders" passHref>
              {" "}
              <li>For Auto Lenders</li>
            </Link>
          </ul>
        </div>
        <div className="hidden md:block">
          <h3 className="text-white font-medium mb-[29px]">Solutions</h3>
          <ul className="space-y-1 text-[#787C91] text-[14px] flex flex-col gap:[7px]">
            <Link href="/solutions/omnichannel-point-of-sale" passHref>
              {" "}
              <li>Point of Sale</li>{" "}
            </Link>
            <Link href="/solutions/lender-cockpit" passHref>
              {" "}
              <li>Lender's Cockpit</li>
            </Link>
            <Link href="/solutions/decisioning" passHref>
              {" "}
              <li>Decisioning Engine</li>
            </Link>
            <Link href="/solutions/portfolio-analytics" passHref>
              {" "}
              <li>Portfolio Analytics</li>
            </Link>
          </ul>
        </div>
        <div className="hidden md:block">
          <h3 className="text-white font-medium mb-[29px] ">Resources</h3>
          <ul className="space-y-1 text-[#787C91] text-[14px]">
            <Link href="/resource-center" passHref>
              {" "}
              <li>Origination Hub</li>
            </Link>
            {/* <li>Documentation</li> */}
          </ul>
        </div>
        {/* Mobile */}
        <div className="md:hidden flex flex-col gap-10">
          <div className="mb-10">
            <h3 className="text-white font-medium mb-[29px]">Platform</h3>
            <ul className="space-y-1 text-[#787C91] text-[14px] flex flex-col gap-[7px]">
              <Link href="/platform" passHref>
                {" "}
                <li>Platform</li>{" "}
              </Link>
              <Link href="/solutions/credit-union" passHref>
                {" "}
                <li>For Credit Unions</li>
              </Link>
              <Link href="/solutions/smb-lenders" passHref>
                {" "}
                <li>For Banks</li>
              </Link>
              <Link href="/solutions/auto-lenders" passHref>
                {" "}
                <li>For Auto Lenders</li>
              </Link>
            </ul>
          </div>
          <div className="mb-10">
            <h3 className="text-white font-medium mb-[29px]">Solutions</h3>
            <ul className="space-y-1 text-[#787C91] text-[14px] flex flex-col gap:[7px]">
              <Link href="/solutions/omnichannel-point-of-sale" passHref>
                {" "}
                <li>Point of Sale</li>{" "}
              </Link>
              <Link href="/solutions/lender-cockpit" passHref>
                {" "}
                <li>Lender's Cockpit</li>
              </Link>
              <Link href="/solutions/decisioning" passHref>
                {" "}
                <li>Decisioning Engine</li>
              </Link>
            </ul>
          </div>
          <div className="">
            <h3 className="text-white font-medium mb-[29px] ">Resources</h3>
            <ul className="space-y-1 text-[#787C91] text-[14px]">
              <Link href="/resource-center" passHref>
                {" "}
                <li>Origination Hub</li>
              </Link>
              {/* <li>Documentation</li> */}
            </ul>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:block ">
          <div>
            <h3 className="text-white font-medium mb-[29px]">Company</h3>
            <ul className="space-y-1 text-[#787C91] text-[14px] flex flex-col gap-[7px]">
              <Link href="/about" passHref>
                {" "}
                <li>About us</li>
              </Link>
              <Link href="/contact" passHref>
                {" "}
                <li>Contact us</li>
              </Link>
            </ul>
          </div>

        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col gap-10 md:space-x-0">
          <div>
            <h3 className="text-white font-medium mb-[29px]">Company</h3>
            <ul className="space-y-1 text-[#787C91] text-[14px] flex flex-col gap-[7px]">
              <Link href="/about" passHref>
                {" "}
                <li>About us</li>
              </Link>
              <button onClick={() => setShowContactModal(true)} style={{all:"unset"}}>
                {" "}
                <li>Contact us</li>
              </button>
            </ul>
          </div>
          <div>
            <div className="mt-[50px] space-y-1 text-[#787C91] text-[14px]">
              <Link
                href="https://www.linkedin.com/company/algebrik-ai/"
                target="_blank"
              >
                <p>Follow on LinkedIn</p>
              </Link>
              <Link
              href="https://www.youtube.com/@AlgebrikAI"
              target="_blank"
              // className="text-[#3E404C]"
            >
              <p>Youtube</p>
            </Link>
              {/* <p>Follow on X</p> */}
            </div>
          </div>
        </div>
        <div>
          <Image src={"/icons/soc2.png"} alt="soc2" width={100} height={100} />
        </div>
      </div>
      <div className=" mx-auto container mt-8 pt-4 px-0 md:px-28 text-sm flex flex-col-reverse gap-2 md:flex-row justify-between items-center">
        <div className="text-[#3E404C] text-[14.3px]">
          <p>© 2025 Algebrik. All rights reserved.</p>
        </div>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <div className="hidden md:block">
            <Link
              href="https://www.linkedin.com/company/algebrik-ai/"
              target="_blank"
              className="text-[#3E404C]"
            >
              <p>Follow on LinkedIn</p>
            </Link>
            {/* <p>Follow on X</p> */}
          </div>
          <div className="hidden md:block">
            <Link
              href="https://www.youtube.com/@AlgebrikAI"
              target="_blank"
              className="text-[#3E404C]"
            >
              <p>Youtube</p>
            </Link>
            {/* <p>Follow on X</p> */}
          </div>
          <Link href="/privacy-policy" className="text-[#3E404C] text-[14px]">
            Privacy policy
          </Link>
          {/* <Link href="#" className="text-[#3E404C] text-[14px]">
            GDPR
          </Link>
          <Link href="#" className="text-[#3E404C] text-[14px]">
            Terms of service
          </Link> */}
        </div>
      </div>
      <hr className="h-[7px] mt-[40px] bg-[#0281E0] border-0 dark:bg-gray-700 w-full" />
    </footer>
  );
};

export default Footer;
