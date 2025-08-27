"use client";

import { useState, useEffect, useRef } from "react";
import { motion, Transition } from "framer-motion";
import { CustomHeader } from "../CustomHeader";
import Image from "next/image";

const data = [
  {
    title: "Onboarding",
    cardHeader: "ONBOARDING",
    cardTitle: "Simplify Borrower Engagement",
    cardSubtitle:
      "Offer an intuitive application process with AI assistance, instant document uploads, and seamless digital experiences to increase completion rates.",
    image: "/section_images/platform_card_section/onboarding.png",
    mobImage: "/section_images/platform_card_section/mob_verification.png",
  },
  {
    title: "Verification",
    cardHeader: "VERIFICATION",
    cardTitle: "Accurate & Fast Borrower Validation",
    cardSubtitle:
      "Automate KYC, AML, and income verification with real-time processes that reduce risks and eliminate manual delays.",
    image: "/section_images/platform_card_section/verification.png",
  },
  {
    title: "Origination",
    cardHeader: "ORIGINATION",
    cardTitle: "Build and Customize Loans Effortlessly",
    cardSubtitle:
      "Create tailored loan products in minutes with dynamic templates, automated credit checks, and adaptable workflows.",
    image: "/section_images/platform_card_section/origination.png",
  },
  {
    title: "Decisioning",
    cardHeader: "DECISIONING",
    cardTitle: "Faster and Smarter Decisions",
    cardSubtitle:
      "Harness AI-driven insights to approve loans quickly and accurately while minimizing risks.",
    image: "/section_images/platform_card_section/decisioning.png",
  },
  {
    title: "Closing",
    cardHeader: "CLOSING",
    cardTitle: "Seamless Closures for Happy Borrowers",
    cardSubtitle:
      "Streamline agreements, enable faster disbursements, and keep borrowers informed with real-time updates and transparent workflows.",
    image: "/section_images/platform_card_section/closing.png",
  },
];

type DebounceFunction<T extends any[]> = (...args: T) => void;

function debounce<T extends any[]>(
  func: any,
  delay: number,
  categoryIndexRef: React.RefObject<number>
): DebounceFunction<T> {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: T) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (categoryIndexRef.current !== undefined) {
        func(...args, categoryIndexRef.current);
      }
    }, delay);
  };
}

export default function LoanLifecycle() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isHalfVisible, setIsHalfVisible] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [firstTimeScrollLocked, setFirstTimeLocked] = useState(false);
  const timingDelay = 200; // Delay after threshold is passed to trigger the next action (in milliseconds)

  useEffect(() => {
    setSelectedCategory(data[0].title);
  }, []);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const isDesktop = window?.innerWidth >= 1024; // Adjust for desktop detection
    setIsDesktop(isDesktop)
  }, [])
  const categoryIndexRef = useRef(currentCategoryIndex);

  // Debounced scroll handler
  const handleScrollEnd = debounce((e: WheelEvent) => {
    // Determine scroll direction
    if (e.deltaY > 0) {
      //check cateogry
      if (currentCategoryIndex <= data.length - 1) {
        const isLast = (currentCategoryIndex) === data.length - 1
        if (isLast) {
          setIsScrollLocked(false)
          setFirstTimeLocked(true)
        } else {
          setCurrentCategoryIndex((prev: number) => {
            if (prev < data.length - 1) {
              setSelectedCategory(data[prev + 1].title)
              return prev + 1
            } else {
              return 0
            }
          })
        }
      }
    }
  }, timingDelay, categoryIndexRef);

  // Lock the scroll when the component mounts and unlock after the timer
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrollLocked && !firstTimeScrollLocked) {
        if (isDesktop) {
          if (e.deltaY < 0) {
            e.preventDefault(); // Prevent scroll up
          } else if (e.deltaY > 0) {
            e.preventDefault();
            handleScrollEnd(e); // Call the debounced function on scroll
          }
        }
      }
    };
    if (isDesktop) {
      // window.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (isDesktop) {
        // window.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isScrollLocked, currentCategoryIndex]);



  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        if (window.scrollY === 0) {
          setFirstTimeLocked(false);
        }
        const { top } = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if 50% of the element is in the viewport
        const isVisible = top <= windowHeight * 0.2;

        if (isVisible !== isHalfVisible) {
          setIsHalfVisible(isVisible);
          if (!firstTimeScrollLocked)
            setIsScrollLocked(true)
        }
      }
    };

    // Attach the scroll event listener
    // window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener
    return () => {
      // window.removeEventListener("scroll", handleScroll);
    };
  }, [isHalfVisible]);

  useEffect(() => {
    if (isHalfVisible && !firstTimeScrollLocked && sectionRef.current) {
      // Snap the component to the top when it's 50% visible
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start", // Align the top of the element with the top of the viewport
      });
    }
  }, [isHalfVisible]);

  const transition: Transition = {
    duration: 2,
    delay: 0,
    ease: [0, 0.71, 0.2, 1.01],
  }

  return (
    <motion.div initial={{
      y: "20%"
    }}
      transition={transition}
      whileInView={{
        y: 0
      }}
      // viewport={{ once: true }}
      >
      <motion.div viewport={{ once: false, amount: 0.8 }}
        ref={sectionRef} className="container mx-auto p-4 md:p-8 flex flex-col gap-12 overscroll-contain">
        <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto px-8 md:px-36">
          <CustomHeader text="Reimagining the Loan Lifecycle, End to End" />
        </div>

        <div className="flex justify-center items-center flex-wrap gap-[36px] md:gap-[76px] w-full relative">
          <div className="w-full md:w-[168px] max-h-[500px] flex md:flex-col gap-[26px] rounded-[20px] overflow-y-auto md:overflow-y-visible">
            {data.map((item, index) => (
              <button
                key={item.title}
                onClick={() => {
                  setSelectedCategory(item.title);
                  setCurrentCategoryIndex(index);
                }}
                className={`flex min-w-max items-center gap-2 font-plus-jakarta py-[10px] px-[16px] rounded-[26px]  text-left font-bold text-[14px] md:text-[15.38px] mb-2 ${currentCategoryIndex === index
                  ? "text-[#056CC1] w-max md:w-full border-2 rounded-[26px] shadow-sm bg-gradient-to-b from-[#D8E4FF] to-[#D8E4FF] border-[#FFFFFF]"
                  : "text-[#8C8C8C] font-normal"
                  }`}
                style={
                  currentCategoryIndex === index ? { border: "#fff" } : {}
                }
              >
                <Image
                  src={
                    currentCategoryIndex === index
                      ? "/icons/check.webp"
                      : "/icons/uncheck.webp"
                  }
                  width={24}
                  height={24}
                  alt={currentCategoryIndex === index ? "Checked" : "Unchecked"}
                />
                {item.title}
              </button>
            ))}
          </div>



          <motion.div
            className="flex justify-center md:items-center p-[24px_24px_0_24px] md:p-6 w-full md:w-[932px] h-[531.96px] rounded-[36px] md:rounded-[42px] relative bg-[rgba(255,255,255,0.7)] shadow-lg border border-gray-200"
            key={selectedCategory}
            initial={{ x: 100, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="hidden md:block absolute top-0 opacity-[30%] z-[-1]">
              <motion.div
                className="absolute top-0 -left-96 md:left-[96px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full md:w-[468.64px] md:h-[542.11px] blur-[100px]"
                initial={{ x: "-50%" }}
                animate={{
                  x: ["-30%", "30%", "-30%", "0%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute top-0 md:left-[20px] -left-96 bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full md:w-[618.35px] md:h-[633.38px] blur-[100px] -z-10"
                initial={{ x: "100%" }}
                animate={{
                  x: ["10%", "-20%", "10%", "0%"],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute top-0 -left-96 md:bottom-[10px] bg-[#BE95FF] rounded-full md:w-[451.48px] md:h-[542.11px] blur-[100px] z-[-1]"
                initial={{ x: "-50%" }}
                animate={{
                  x: ["-30%", "40%", "-40%", "0%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            <div className="block md:hidden absolute top-0 opacity-[30%] z-[-1] w-[80%]">
              <motion.div
                className="absolute top-0 left-0 w-full bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full h-[350px] sm:w-[400px] sm:h-[450px] md:w-[468.64px] md:h-[542.11px] blur-[50px] sm:blur-[100px]"
                initial={{ x: "0%" }}
                animate={{
                  x: ["-10%", "10%", "-10%", "0%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute top-0 left-0 w-full bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full h-[350px] sm:w-[500px] sm:h-[600px] md:w-[618.35px] md:h-[633.38px] blur-[50px] sm:blur-[100px] -z-10"
                initial={{ x: "0%" }}
                animate={{
                  x: ["10%", "-10%", "10%", "0%"],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute top-[300px] sm:top-0 left-0 w-full bg-[#BE95FF] rounded-full h-[300px] sm:w-[400px] sm:h-[500px] md:w-[451.48px] md:h-[542.11px] blur-[50px] sm:blur-[100px] z-[-1]"
                initial={{ x: "0%" }}
                animate={{
                  x: ["-10%", "10%", "-10%", "0%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {selectedCategory && (
              <div className=" flex flex-col md:flex-row w-[100%] md:w-[932px] md:h-[531.96px]">
                <div className=" md:pl-[44px] pt-[0px] md:pt-[52.59px] flex flex-col justify-start font-plus-jakarta items-start gap-[12px] md:w-96">
                  <h3 className="text-[#29292999] tracking-wider font-bold text-[12px] uppercase">
                    {data[currentCategoryIndex].cardHeader}
                  </h3>
                  <h2 className="text-[#292929] font-semibold text-[25px] md:text-[32px] leading-[42px]">
                    {data[currentCategoryIndex].cardTitle}
                  </h2>
                  <div className="w-[71.69px] h-[5px] rounded-sm my-[12px] md:my-0 bg-[#C5DDFF]" />
                  <p className="text-[#292929] font-normal text-[14px] md:text-[16px] leading-[21.51px]">
                    {data[currentCategoryIndex].cardSubtitle}
                  </p>
                </div>

                <div className="flex-1 justify-end items-end relative bottom-0 md:pl-0 w-[100%] h-[143px] md:w-[800px] md:h-[879px]">
                  <Image
                    src={data[currentCategoryIndex].image}
                    alt={selectedCategory}
                    width={728}
                    height={900}
                    className="hidden md:block rounded-[10px] md:h-[528px] object-fill"
                    priority
                    quality={100}
                  />
                  <Image
                    src={data[currentCategoryIndex].mobImage || data[currentCategoryIndex].image}
                    alt={selectedCategory}
                    width={350}
                    height={243}
                    className="md:hidden w-[100%] h-full rounded-[10px] object-cover"
                    priority
                    quality={100}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
