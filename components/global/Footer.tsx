import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#121212] pt-[40px] px-[20px] md:px-0 pb-[20px] font-plus-jakarta md:border md:border-t-1 md:border-[#262932]">
      <hr className="w-full border-none md:border-t text-[#787C91] border-gray-700" />
      <div className="container max-w-7xl mx-auto pt-[40px] grid grid-cols-1 md:grid-cols-5 gap-[40px] md:gap-[76px] justify-items-start md:justify-items-end">
        <div>
          <Image src={logo} alt="logo" width={157} height={40.19} />
        </div>
        <div className="hidden md:block">
          <h3 className="text-white font-medium mb-[29px]">Product</h3>
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
          <h3 className="text-white font-medium mb-[29px] ">Resources</h3>
          <ul className="space-y-1 text-[#787C91] text-[14px]">
            <Link href="/resource_center" passHref>
              {" "}
              <li>Origination Hub</li>
            </Link>
            {/* <li>Documentation</li> */}
          </ul>
        </div>
        {/* Mobile */}
        <div className="md:hidden flex space-x-28">
          <div className="">
            <h3 className="text-white font-medium mb-[29px]">Product</h3>
            <ul className="space-y-1 text-[#787C91] text-[14px] flex flex-col gap-[7px]">
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
          <div className="">
            <h3 className="text-white font-medium mb-[29px] ">Resources</h3>
            <ul className="space-y-1 text-[#787C91] text-[14px]">
              <Link href="/resource_center" passHref>
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
              <Link href="/contact" passHref target="_blank">
                {" "}
                <li>Contact us</li>
              </Link>
            </ul>
          </div>
         
        </div>

        <div className="hidden md:block">
            <div className="mt-[50px] space-y-1 text-[#787C91] text-[14px]">
              <Link
                href="https://www.linkedin.com/company/algebrik-ai/"
                target="_blank"
              >
                <p>Follow on LinkedIn</p>
              </Link>
              {/* <p>Follow on X</p> */}
            </div>
          </div>

        {/* Mobile */}
        <div className="md:hidden flex space-x-28 md:space-x-0">
          <div>
            <h3 className="text-white font-medium mb-[29px]">Company</h3>
            <ul className="space-y-1 text-[#787C91] text-[14px] flex flex-col gap-[7px]">
              <Link href="/about" passHref>
                {" "}
                <li>About us</li>
              </Link>
              <Link href="/contact" passHref target="_blank">
                {" "}
                <li>Contact us</li>
              </Link>
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
              {/* <p>Follow on X</p> */}
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-8 pt-4 px-0 md:px-28 text-sm flex flex-col-reverse gap-2 md:flex-row justify-between items-center">
        <div className="text-[#3E404C] text-[14.3px]">
          <p>© 2024 Algebrik. All rights reserved.</p>
        </div>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link href="#" className="text-[#3E404C] text-[14px]">
            Privacy policy
          </Link>
          <Link href="#" className="text-[#3E404C] text-[14px]">
            GDPR
          </Link>
          <Link href="#" className="text-[#3E404C] text-[14px]">
            Terms of service
          </Link>
        </div>
      </div>
      <hr className="h-[7px] mt-[40px] bg-[#0281E0] border-0 dark:bg-gray-700 w-full" />
    </footer>
  );
};

export default Footer;
