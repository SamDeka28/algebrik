import Image from "next/image";
import logo from "@/public/logo.png"

const Footer = () => {
  return (
    <footer className="bg-[#121212] text-gray-300 py-8 px-4 md:px-12">
      <div className="max-w-7xl mx-auto pt-[40px] grid grid-cols-1 md:grid-cols-5 gap-[76px]">
        <div>
          <Image src={logo} alt="logo" width={157} height={40.19}/>
        </div>
        <div>
          <h3 className="text-white font-medium mb-[29px]">Product</h3>
          <ul className="space-y-1 text-[#787C91] text-[14px]">
            <li>Platform</li>
            <li>For Credit Unions</li>
            <li>For SMB Lenders</li>
            <li>For Auto Lenders</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-medium mb-[29px]">Resources</h3>
          <ul className="space-y-1 text-[#787C91] text-[14px]">
            <li>Blog</li>
            <li>Documentation</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-medium mb-[29px]">Company</h3>
          <ul className="space-y-1 text-[#787C91] text-[14px]">
            <li>About us</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div>
        <div className="mt-[50px] space-y-1 text-[#787C91] text-[14px]">
            <p>Follow on LinkedIn</p>
            <p>Follow on X</p>
          </div>
        </div>
      </div>
      <div className="border-t text-[#787C91] text-[14px] border-gray-700 mt-8 pt-4 text-sm flex flex-col md:flex-row justify-between items-center">
        <p>© 2024 Algebrik. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="text-[#787C91] text-[14px]">
            Privacy policy
          </a>
          <a href="#" className="text-[#787C91] text-[14px]">
            GDPR
          </a>
          <a href="#" className="text-[#787C91] text-[14px]">
            Terms of service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
