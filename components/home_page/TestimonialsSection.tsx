"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import testimonialsData from "@/lib/testimonials.json";

const CARD_GRADIENT =
  "radial-gradient(ellipse at center, rgba(126,178,255,1) 0%, rgba(95,146,219,1) 21.25%, rgba(65,113,184,1) 42.5%, rgba(34,81,148,1) 63.75%, rgba(19,64,130,1) 74.375%, rgba(4,48,113,1) 85%), linear-gradient(90deg, rgb(42, 95, 172) 0%, rgb(42, 95, 172) 100%)";

const CARD_WIDTH = 645;
const GAP = 24;
const STEP = CARD_WIDTH + GAP;

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

/** Single card used in the sliding track (fixed width so track slides smoothly) */
function TrackCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className="flex-shrink-0 rounded-[22px] overflow-hidden shadow-lg relative"
      style={{ width: CARD_WIDTH, height: "409px" }}
    >
      <div className="absolute inset-0 rounded-[22px]" style={{ background: CARD_GRADIENT }} />
      <div className="absolute right-0 top-0 w-[254px] h-full bg-[#032250] opacity-80 rounded-tr-[22px]" />
      <div className="absolute left-0 bottom-0 w-full h-[146px] bg-[#e1ecf7] rounded-bl-[22px] rounded-br-[22px]" />
      <div className="absolute left-4 top-10 w-[60%] z-10">
        <Image src="/icons/quote.png" alt="" width={43 } height={28} className="flex-shrink-0 mt-0.5 brightness-0 invert opacity-90" />
      </div>
      <p className="absolute left-[26px] top-[104px] text-white font-medium leading-[1.5] text-[18px] w-[326px] z-10" style={{ fontFeatureSettings: "'liga' 0" }}>
        {testimonial.quote}
      </p>
      <div className="absolute left-[26px] bottom-[20px] w-[217px] flex flex-col gap-1 z-10">
        <p className="font-bold text-[#21406f] text-[20px] leading-[27px] uppercase">{testimonial.name}</p>
        <div className="font-normal text-[#415c84] text-[16px] leading-[24px]">
          <p className="mb-0">{testimonial.title},</p>
          <p>{testimonial.organization}</p>
        </div>
      </div>
      <div className="absolute right-[20px] top-[61px] w-[367px] h-[367px] pointer-events-none z-10">
        {testimonial.image ? (
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={367}
            height={367}
            className="object-contain w-full h-full rounded-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-lg">
            <svg className="w-24 h-24 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
      </div>
      {testimonial.logo && (
        <div className="absolute right-[48px] top-[39px] w-[71px] h-[49px] z-20">
          <div className="relative w-full h-full">
            <Image
              src={testimonial.logo}
              alt={testimonial.organization}
              fill
              className="object-contain brightness-0 invert"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

/** Mobile: card with quote on top, full-width photo, then details strip (per design) */
function MobileCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="lg:hidden w-full max-w-[400px] mx-auto rounded-[16px] overflow-hidden shadow-2xl flex flex-col">
      {/* Top: dark blue quote section with quote icon */}
      <div className="bg-[#2A5FAC] px-4 pt-4 pb-3 rounded-t-[16px]">
        <div className="flex  flex-col gap-3 items-start">
          <Image
            src="/icons/quote.png"
            alt=""
            width={32}
            height={32}
            className="flex-shrink-0 opacity-90 brightness-0 invert"
          />
          <p
            className="text-white font-medium leading-[1.5] text-base font-plus-jakarta flex-1 min-w-0"
            style={{ fontFeatureSettings: "'liga' 0" }}
          >
            {testimonial.quote}
          </p>
        </div>
      </div>
      {/* Middle: full-width headshot */}
      <div className="w-full h-[220px] relative bg-[#2A5FAC]  ">
        {testimonial.image ? (
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-contain object-top z-10"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-400 flex items-center justify-center">
            <svg className="w-16 h-16 text-white/60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
        <div className="absolute left-0 bottom-0 w-full h-1/2 bg-[#032250] z-1"></div>
      </div>
      {/* Bottom: light blue-grey strip with name/title/org left, logo right */}
      <div className="bg-[#e1ecf7] px-4 py-4 flex justify-between items-center gap-3 rounded-b-[16px] min-h-[100px]">
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[#21406f] text-sm leading-tight uppercase">
            {testimonial.name}
          </p>
          <div className="font-normal text-[#415c84] text-xs leading-tight mt-0.5">
            <p className="mb-0">{testimonial.title},</p>
            {testimonial.organization && <p className="break-words mb-0">{testimonial.organization}</p>}
          </div>
        </div>
        {testimonial.logo && (
          <div className="relative w-16 h-10 flex-shrink-0">
            <Image
              src={testimonial.logo}
              alt={testimonial.organization}
              fill
              className="object-contain object-right"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const testimonialsList = testimonialsData as Testimonial[];
const testimonials = [...testimonialsList, ...testimonialsList, ...testimonialsList];
const L = testimonials.length;
const UNIQUE = testimonialsList.length;
const MID_START = UNIQUE;
const MID_END = UNIQUE * 2 - 1;

const AUTO_ADVANCE_MS = 5000;

export default function TestimonialsSection() {
  const [trackIndex, setTrackIndex] = useState(MID_START);
  const [resetKey, setResetKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [startOffset, setStartOffset] = useState(278);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateOffset = () => setStartOffset(el.clientWidth / 2 - CARD_WIDTH / 2);
    updateOffset();
    const ro = new ResizeObserver(updateOffset);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setTrackIndex((i) => (i === MID_END ? MID_START + UNIQUE : Math.min(i + 1, MID_START + UNIQUE))),
      AUTO_ADVANCE_MS
    );
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleAnimationComplete = () => {
    if (trackIndex === MID_START + UNIQUE) {
      setTrackIndex(MID_START);
      setResetKey((k) => k + 1);
    } else if (trackIndex === L - 1) {
      setTrackIndex(MID_END);
      setResetKey((k) => k + 1);
    }
  };

  const goToNext = () => {
    startTimer();
    setTrackIndex((i) => (i === MID_END ? MID_START + UNIQUE : Math.min(i + 1, MID_START + UNIQUE)));
  };
  const goToPrev = () => {
    startTimer();
    setTrackIndex((i) => (i === MID_START ? L - 1 : i - 1));
  };

  const goToIndex = (dotIndex: number) => {
    startTimer();
    setTrackIndex(MID_START + (dotIndex % UNIQUE));
  };
  const currentDotIndex = trackIndex % UNIQUE;

  return (
    <div className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-center mb-12 md:mb-16">
          <h2 className="text-[28px] md:text-[40px] font-plus-jakarta font-bold text-[#2A5FAC] text-center">
            Shaped by Lending Leaders
          </h2>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Desktop: sliding track — one row, we animate translateX so cards slide visibly */}
          <div
            ref={containerRef}
            className="hidden lg:block overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <motion.div
              key={resetKey}
              className="flex items-stretch py-4"
              style={{
                gap: GAP,
                paddingLeft: startOffset,
                width: startOffset + testimonials.length * STEP,
              }}
              initial={resetKey === 0 ? false : { x: -trackIndex * STEP }}
              animate={{ x: -trackIndex * STEP }}
              transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
              onAnimationComplete={handleAnimationComplete}
            >
              {testimonials.map((t, i) => (
                <TrackCard key={i} testimonial={t} />
              ))}
            </motion.div>
          </div>

          {/* Mobile: single card with slide animation */}
          <div className="lg:hidden overflow-hidden px-4">
            <motion.div
              key={currentDotIndex}
              initial={{ x: 40 }}
              animate={{ x: 0 }}
              transition={{ type: "tween", duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex justify-center"
            >
              <MobileCard testimonial={testimonials[trackIndex]} />
            </motion.div>
          </div>

          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={goToPrev}
              className="rounded-[34px] flex items-center justify-center p-2 w-12 h-10 md:w-[82px] md:h-9 bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] text-white hover:opacity-90 transition-opacity shadow-md"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="rounded-[34px] flex items-center justify-center p-2 w-12 h-10 md:w-[82px] md:h-9 bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] text-white hover:opacity-90 transition-opacity shadow-md"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* <div className="flex justify-center items-center gap-2 mt-4">
            {Array.from({ length: UNIQUE }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentDotIndex ? "w-8 h-2 bg-[#195BD7]" : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}
