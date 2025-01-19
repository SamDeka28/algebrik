"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CustomHeader } from "../CustomHeader";
import { motion } from "framer-motion";

type DebounceFunction<T extends any[]> = (...args: T) => void;

function debounce<T extends any[]>(
  func: any,
  delay: number,
  categoryIndexRef: React.RefObject<number>
): DebounceFunction<T> {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: any) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (categoryIndexRef.current !== undefined) {
        func(...args, categoryIndexRef.current);
      }
    }, delay);
  };
}
export default function LoanLifecycle() {
  const cardData = [
    {
      title: "Seamless Onboarding",
      image: "/section_images/seemless_onboarding.png",
    },
    { title: "Deploy in Mins", image: "/section_images/deploy_in_mins.png" },
    { title: "AI-Powered", image: "/section_images/ai_powered.png" },
    { title: "Smart Decisioning", image: "/section_images/smart_decision.png" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [firstTimeScrollLocked, setFirstTimeLocked] = useState(false);
  const timingDelay = 100; // Delay after threshold is passed to trigger the next action (in milliseconds)
  const [isHalfVisible, setIsHalfVisible] = useState(false);
  const [isDesktop,setIsDesktop]=useState(false);

  useEffect(()=>{
    const isDesktop = window?.innerWidth >= 1024; // Adjust for desktop detection
    setIsDesktop(isDesktop)
  },[])


  const sectionRef = useRef<HTMLDivElement | null>(null);
  const categoryIndexRef = useRef(activeIndex);

  // Debounced scroll handler
  const handleScrollEnd = debounce((e:WheelEvent) => {
    // Determine scroll direction
    if (e.deltaY > 0) {
      //check cateogry
      if (activeIndex <= cardData.length - 1) {
        const isLast = (activeIndex) === cardData.length - 1
        if (isLast) {
          setIsScrollLocked(false)
          setFirstTimeLocked(true)
        } else {
          setActiveIndex((prev: number) => {
            if (prev < cardData.length - 1) {
              setActiveIndex(prev + 1)
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
    const handleWheel = (e:WheelEvent) => {
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
      window.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (isDesktop) {
        window.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isScrollLocked, activeIndex]);



  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        if (window.scrollY === 0) {
          setFirstTimeLocked(false);
        }
        const { top, bottom } = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if 50% of the element is in the viewport
        const isVisible = top <= windowHeight * 0.2;

        if (isVisible !== isHalfVisible) {
          setIsHalfVisible(isVisible);
          console.log({ firstTimeScrollLocked })
          if (!firstTimeScrollLocked)
            setIsScrollLocked(true)
        }
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
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


  return (
    <section
      ref={sectionRef}
      id="loan-lifecycle-section"
      className="container pt-[108px] mx-auto hidden md:flex flex-col items-center justify-between gap-[48px] relative"
    >
      <CustomHeader
        className="text-center"
        text="Reimagining the Loan Lifecycle, End to End"
      />

      <div className="container px-[25px] py-[4px] md:w-[1013px] md:h-[44px] bg-white flex justify-between items-center rounded-[36px] drop-shadow-[0_0_60px_rgba(0,0,0,0.25)]">


        {cardData.map((item, index) => (
          <div
            key={activeIndex + index}
            className="flex flex-row gap-[8px] items-center cursor-pointer"
            onClick={() => setActiveIndex(index)}
            style={{
              opacity: index === activeIndex ? 1 : 0.5,
              transform: index === activeIndex ? "scale(1.1)" : "scale(1)",
              transition: "all 0.1s ease-in-out",
            }}
          >
            <Image
              src={index === activeIndex ? "/icons/check.png" : "/icons/uncheck.png"}
              width={24}
              height={24}
              alt={index === activeIndex ? "Checked" : "Unchecked"}
            />
            <div
              className={`${index === activeIndex ? "bg-blue-500 text-white" : "bg-transparent text-[#8C8C8C]"
                } px-2 py-1 rounded-full transition-all duration-300`}
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>

      <div
        className="md:w-[1096px] md:h-[526px] rounded-[42px] overflow-hidden"
        style={{ transition: "all 0.5s" }}
      >
        <div className="absolute top-64 md:left-[560px] opacity-[30%] z-[-1]">
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
        <div
          className="relative"
        // style={{
        //   marginLeft: activeIndex === 0 ? "0px" : "0",  
        // }}
        >

          <Image
            key={activeIndex}
            src={cardData[activeIndex].image}
            width={1096}
            height={526}
            alt={cardData[activeIndex].title}
            className="rounded-[42px] md:h-[526px]"
          />
        </div>
      </div>
    </section>
  );
}
