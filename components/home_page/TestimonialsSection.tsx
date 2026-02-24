"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import testimonialsData from "@/lib/testimonials.json";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  organization: string;
  logo: string;
  image: string;
  quoteColor: string;
  personBgColor: string;
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = next, -1 = prev
  const testimonials = testimonialsData as Testimonial[];

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToIndex = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const getVisibleTestimonials = () => {
    const prev = testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length];
    const current = testimonials[currentIndex];
    const next = testimonials[(currentIndex + 1) % testimonials.length];
    return [prev, current, next];
  };

  const [prev, current, next] = getVisibleTestimonials();

  return (
    <div className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a365d] text-center">
            Trusted by the Experts Shaping the Industry
          </h2>
        </div>

        {/* Testimonials Container */}
        <div className="relative max-w-7xl mx-auto">
          <div className="flex gap-4 md:gap-6 justify-center items-stretch overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16">
            <motion.div
              key={currentIndex}
              initial={{ x: direction === 1 ? 60 : -60 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="flex gap-4 md:gap-6 w-full justify-center"
            >
              {/* Left Card - Half Hidden */}
              <div className="hidden lg:block w-[645px] -ml-[322px] opacity-90">
                <div className="rounded-[22px] overflow-hidden shadow-lg relative" style={{ height: '409px', width: '645px' }}>
                  {/* Main Background with Gradient */}
                  <div 
                    className="absolute inset-0 rounded-[22px]"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(126,178,255,1) 0%, rgba(95,146,219,1) 21.25%, rgba(65,113,184,1) 42.5%, rgba(34,81,148,1) 63.75%, rgba(19,64,130,1) 74.375%, rgba(4,48,113,1) 85%), linear-gradient(90deg, rgb(42, 95, 172) 0%, rgb(42, 95, 172) 100%)'
                    }}
                  />
                  
                  {/* Dark Blue Section on Right Side */}
                  <div className="absolute right-0 top-0 w-[254px] h-full bg-[#032250] opacity-80 rounded-tr-[22px]" />
                  
                  {/* Light Blue Bottom Section with rounded corners */}
                  <div className="absolute left-0 bottom-0 w-full h-[146px] bg-[#e1ecf7] rounded-bl-[22px] rounded-br-[22px]" />
                  
                  {/* Quote Text */}
                  <p className="absolute left-[26px] top-[104px] text-white font-medium leading-[1.5] text-[18px] w-[326px] z-10" style={{ fontFeatureSettings: "'liga' 0" }}>
                    {prev.quote}
                  </p>
                  
                  {/* Person Info */}
                  <div className="absolute left-[26px] bottom-[20px] w-[217px] flex flex-col gap-1 z-10">
                    <p className="font-bold text-[#21406f] text-[20px] leading-[27px] uppercase">
                      {prev.name}
                    </p>
                    <div className="font-normal text-[#415c84] text-[16px] leading-[24px]">
                      <p className="mb-0">{prev.title},</p>
                      <p>{prev.organization}</p>
                    </div>
                  </div>
                  
                  {/* Person Image - Large, Full Image on Right */}
                  <div className="absolute right-[20px] top-[61px] w-[367px] h-[367px] pointer-events-none z-10">
                    {prev.image ? (
                      <Image
                        src={prev.image}
                        alt={prev.name}
                        width={367}
                        height={367}
                        className="object-cover w-full h-full rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-lg">
                        <svg className="w-24 h-24 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Logo - Top Right */}
                  {prev.logo && (
                    <div className="absolute right-[48px] top-[39px] w-[71px] h-[49px] z-20">
                      <div className="relative w-full h-full">
                        <Image
                          src={prev.logo}
                          alt={prev.organization}
                          fill
                          className="object-contain brightness-0 invert"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Center Card - Prominent */}
              <div className="flex-1 w-full max-w-[645px]">
                  {/* Mobile Layout */}
                  <div className="lg:hidden rounded-[16px] overflow-hidden shadow-2xl relative" style={{ minHeight: '500px' }}>
                    {/* Main Background with Gradient */}
                    <div 
                      className="absolute inset-0 rounded-[16px]"
                      style={{
                        background: 'radial-gradient(ellipse at center, rgba(126,178,255,1) 0%, rgba(95,146,219,1) 21.25%, rgba(65,113,184,1) 42.5%, rgba(34,81,148,1) 63.75%, rgba(19,64,130,1) 74.375%, rgba(4,48,113,1) 85%), linear-gradient(90deg, rgb(42, 95, 172) 0%, rgb(42, 95, 172) 100%)'
                      }}
                    />
                    
                    {/* Dark Blue Section on Right Side */}
                    <div className="absolute right-0 top-0 w-[35%] h-full bg-[#032250] opacity-80 rounded-tr-[16px]" />
                    
                    {/* Light Blue Bottom Section */}
                    <div className="absolute left-0 bottom-0 w-full h-[140px] bg-[#e1ecf7] rounded-bl-[16px] rounded-br-[16px]" />
                    
                    {/* Quote Text */}
                    <p className="absolute left-4 top-20 text-white font-medium leading-[1.5] text-sm w-[60%] z-10" style={{ fontFeatureSettings: "'liga' 0" }}>
                      {current.quote}
                    </p>
                    
                    {/* Person Info */}
                    <div className="absolute left-4 bottom-4 w-[60%] flex flex-col gap-1 z-10">
                      <p className="font-bold text-[#21406f] text-base leading-tight uppercase">
                        {current.name}
                      </p>
                      <div className="font-normal text-[#415c84] text-sm leading-tight">
                        <p className="mb-0">{current.title},</p>
                        <p className="break-words">{current.organization}</p>
                      </div>
                    </div>
                    
                    {/* Triangular Pointer - pointing down from blue section into white section */}
                    {/* <div className="absolute left-4 bottom-[140px] w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-[#e1ecf7] z-10" /> */}
                    
                    {/* Person Image - Aligned at bottom edge of blue section on Mobile */}
                    <div className="absolute right-2 bottom-[140px] w-[100px] h-[100px] pointer-events-none z-10" style={{ transform: 'translateY(0)' }}>
                      {current.image ? (
                        <Image
                          src={current.image}
                          alt={current.name}
                          width={100}
                          height={100}
                          className="object-cover w-full h-full rounded-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-lg">
                          <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* Logo - Top Right */}
                    {current.logo && (
                      <div className="absolute right-3 top-3 w-10 h-7 z-20">
                        <div className="relative w-full h-full">
                          <Image
                            src={current.logo}
                            alt={current.organization}
                            fill
                            className="object-contain brightness-0 invert"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Desktop Layout */}
                  <div className="hidden lg:block rounded-[22px] overflow-hidden shadow-2xl relative" style={{ height: '409px', width: '645px' }}>
                    {/* Main Background with Gradient */}
                    <div 
                      className="absolute inset-0 rounded-[22px]"
                      style={{
                        background: 'radial-gradient(ellipse at center, rgba(126,178,255,1) 0%, rgba(95,146,219,1) 21.25%, rgba(65,113,184,1) 42.5%, rgba(34,81,148,1) 63.75%, rgba(19,64,130,1) 74.375%, rgba(4,48,113,1) 85%), linear-gradient(90deg, rgb(42, 95, 172) 0%, rgb(42, 95, 172) 100%)'
                      }}
                    />
                    
                    {/* Dark Blue Section on Right Side */}
                    <div className="absolute right-0 top-0 w-[254px] h-full bg-[#032250] opacity-80 rounded-tr-[22px]" />
                    
                    {/* Light Blue Bottom Section with rounded corners */}
                    <div className="absolute left-0 bottom-0 w-full h-[146px] bg-[#e1ecf7] rounded-bl-[22px] rounded-br-[22px]" />
                    
                    {/* Quote Text */}
                    <p className="absolute left-[26px] top-[104px] text-white font-medium leading-[1.5] text-[18px] w-[326px] z-10" style={{ fontFeatureSettings: "'liga' 0" }}>
                      {current.quote}
                    </p>
                    
                    {/* Person Info */}
                    <div className="absolute left-[26px] bottom-[20px] w-[217px] flex flex-col gap-1 z-10">
                      <p className="font-bold text-[#21406f] text-[20px] leading-[27px] uppercase">
                        {current.name}
                      </p>
                      <div className="font-normal text-[#415c84] text-[16px] leading-[24px]">
                        <p className="mb-0">{current.title},</p>
                        <p>{current.organization}</p>
                      </div>
                    </div>
                    
                    {/* Triangular Pointer - pointing down from blue section into white section */}
                    {/* <div className="absolute left-[21px] bottom-[146px] w-0 h-0 border-l-[19px] border-l-transparent border-r-[19px] border-r-transparent border-b-[38px] border-b-[#e1ecf7] z-10" /> */}
                    
                    {/* Person Image - Large, Full Image on Right */}
                    <div className="absolute right-[20px] top-[61px] w-[367px] h-[367px] pointer-events-none z-10">
                      {current.image ? (
                        <Image
                          src={current.image}
                          alt={current.name}
                          width={367}
                          height={367}
                          className="object-cover w-full h-full rounded-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-lg">
                          <svg className="w-24 h-24 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* Logo - Top Right */}
                    {current.logo && (
                      <div className="absolute right-[48px] top-[39px] w-[71px] h-[49px] z-20">
                        <div className="relative w-full h-full">
                          <Image
                            src={current.logo}
                            alt={current.organization}
                            fill
                            className="object-contain brightness-0 invert"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              {/* Right Card - Half Hidden */}
              <div className="hidden lg:block w-[645px] -mr-[322px] opacity-90">
                <div className="rounded-[22px] overflow-hidden shadow-lg relative" style={{ height: '409px', width: '645px' }}>
                  {/* Main Background with Gradient */}
                  <div 
                    className="absolute inset-0 rounded-[22px]"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(126,178,255,1) 0%, rgba(95,146,219,1) 21.25%, rgba(65,113,184,1) 42.5%, rgba(34,81,148,1) 63.75%, rgba(19,64,130,1) 74.375%, rgba(4,48,113,1) 85%), linear-gradient(90deg, rgb(42, 95, 172) 0%, rgb(42, 95, 172) 100%)'
                    }}
                  />
                  
                  {/* Dark Blue Section on Right Side */}
                  <div className="absolute right-0 top-0 w-[254px] h-full bg-[#032250] opacity-80 rounded-tr-[22px]" />
                  
                  {/* Light Blue Bottom Section with rounded corners */}
                  <div className="absolute left-0 bottom-0 w-full h-[146px] bg-[#e1ecf7] rounded-bl-[22px] rounded-br-[22px]" />
                  
                  {/* Quote Text */}
                  <p className="absolute left-[26px] top-[104px] text-white font-medium leading-[1.5] text-[18px] w-[326px] z-10" style={{ fontFeatureSettings: "'liga' 0" }}>
                    {next.quote}
                  </p>
                  
                  {/* Person Info */}
                  <div className="absolute left-[26px] bottom-[20px] w-[217px] flex flex-col gap-1 z-10">
                    <p className="font-bold text-[#21406f] text-[20px] leading-[27px] uppercase">
                      {next.name}
                    </p>
                    <div className="font-normal text-[#415c84] text-[16px] leading-[24px]">
                      <p className="mb-0">{next.title},</p>
                      <p>{next.organization}</p>
                    </div>
                  </div>
                  
                  {/* Person Image - Large, Full Image on Right */}
                  <div className="absolute right-[20px] top-[61px] w-[367px] h-[367px] pointer-events-none z-10">
                    {next.image ? (
                      <Image
                        src={next.image}
                        alt={next.name}
                        width={367}
                        height={367}
                        className="object-cover w-full h-full rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-lg">
                        <svg className="w-24 h-24 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Logo - Top Right */}
                  {next.logo && (
                    <div className="absolute right-[48px] top-[39px] w-[71px] h-[49px] z-20">
                      <div className="relative w-full h-full">
                        <Image
                          src={next.logo}
                          alt={next.organization}
                          fill
                          className="object-contain brightness-0 invert"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 rounded-full p-2 md:p-3 shadow-md transition-all z-10 flex items-center justify-center"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 rounded-full p-2 md:p-3 shadow-md transition-all z-10 flex items-center justify-center"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-8 h-2 bg-blue-600"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
