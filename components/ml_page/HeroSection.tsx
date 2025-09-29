"use client";

export default function HeroSection() {
  return (
    <div
      className="w-full md:h-[670px] flex items-center justify-center overflow-hidden rounded-b-[32px] md:rounded-b-none relative"
      style={{
        background: "radial-gradient(128.68% 367.63% at 50% -243.57%, #7EB2FF 0%, #043071 85%)"
      }}
    >
      <img 
        src="/background_images/modern_lender.webp" 
        alt="Hero Background" 
        className="z-0 hidden md:block absolute top-0 left-0 object-cover w-full h-full" 
        fetchPriority="high" 
      />
      <img 
        src="/background_images/ml-single.webp" 
        alt="Hero Background"  
        className="z-0 lg:hidden absolute top-0 left-0 object-cover w-full h-full" 
        fetchPriority="high" 
      />
      
      <div className="container pt-[181px] text-center md:mx-auto md:px-6 flex flex-col md:flex-row items-center md:justify-center md:pt-16 gap-0 md:gap-16">
        <div className="flex flex-col gap-6 px-16 md:px-0 max-w-[719px] h-72 w-full">
          <h1 className="text-white text-[36px] md:text-[56px] font-plus-jakarta font-normal leading-[45.36px] md:leading-tight">
            The modern alternative lenders asked for
          </h1>
          <p className="text-white text-[16px] font-normal md:text-[18px] font-plus-jakarta md:font-light opacity-80 leading-relaxed">
            Replace rigid stacks with a unified, AI-first platform for Personal, Auto, Credit Card, and HELOC lending. Built for speed, flexibility, and growth.
          </p>
          <div className="relative md:static -bottom-48 z-20 flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <a 
            target="_blank"
            href="/lending-health-check"
            className="bg-gradient-to-r from-[#1C8DEA] to-[#195BD7] text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all font-plus-jakarta"
          >
              Check how my stack compares
            </a>
            <a target="_blank" href="/solutions/lender-cockpit" className="bg-white border-2 border-white text-[#195BD7] px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#2a5fac] transition-colors font-plus-jakarta">
              Self-paced Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
