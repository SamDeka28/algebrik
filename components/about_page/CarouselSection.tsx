import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TeamMemberCard } from "./OurTeam";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function CarouselSection({
  data,
  headerText,
  subtitleText,
  autoScroll,
}: {
  data: { image: string; name: string; title: string; place: string }[];
  headerText: React.ReactNode;
  subtitleText: string;
  autoScroll?: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [timeRef, setTimeRef] = useState<any>();
  const [refresh, setRefresh] = useState(Date.now())
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (data.length > 3 && !isMobile) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
      }, 2000);

      setTimeRef(interval);
    }

    if (isMobile) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
      }, 2000);

      setTimeRef(interval);
    }

    return () => clearInterval(interval);
  }, [isMobile, data.length, refresh]);

  const visibleItems = data.slice(currentIndex, currentIndex + 3).length === 3
    ? data.slice(currentIndex, currentIndex + 3)
    : [...data.slice(currentIndex), ...data.slice(0, 3 - data.slice(currentIndex).length)];

  return (
    <div
      className="container w-[100%] md:w-min md:mx-auto  flex \
    flex-col-reverse md:flex-col gap-[30px] font-plus-jakarta md:justify-center items-center"
    >
      <div
        className={`w-[100%] md:w-full flex overflow-x-scroll md:overflow-x-hidden flex-col gap-[26px]`}
      >
        <motion.div
          className={`flex gap-[16px] md:gap-[32px] mx-4 md:mx-0 md:justify-center items-baseline`}
          initial={{ opacity: 0, x: isMobile ? 0 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isMobile ? 0 : 100 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {visibleItems.map((item, index) => (
            <motion.div
              key={`${currentIndex}-${index}`}
              className="w-[307px] h-[340px] md:w-[369.18px] md:h-[408.46px]"
              animate={{ translateX: 0 }}
              initial={{ translateX: `${100}%` }}
              exit={{ opacity: 0, x: 100 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <TeamMemberCard
                image={item.image}
                name={item.name}
                title={item.title}
                place={item.place}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="m-8 md:m-0 flex flex-wrap md:flex-nowrap gap-[16px] md:gap-[39px] justify-between items-start">
        <div>
          <CustomHeader
            text={headerText}
            className="text-[28px] md:text-[40px] md:w-[317px] flex md:flex-col gap-[5px] font-bold"
          />
        </div>
        <div>
          <CustomSubtitle
            text={subtitleText}
            className="text-[14px] md:text-[20px] font-normal leading-[30px]"
          />
        </div>
        {!isMobile && data.length > 3 && (
          <div className="hidden md:flex gap-[8px] justify-center">
            <button
              onClick={() => {
                clearInterval(timeRef)
                setRefresh(Date.now())
                setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.length - 3 : prevIndex - 3))
              }
              }
              className="rounded-[34px] flex items-center justify-center p-[8px] md:w-[82px] md:h-[36px] bg-gradient-to-b from-[#1C8DEA] to-[#195BD7]"
            >
              <IoIosArrowBack size={20} color="white" />
            </button>
            <button
              onClick={() => {
                clearInterval(timeRef)
                setRefresh(Date.now())
                setCurrentIndex((prevIndex) =>
                  prevIndex + 3 >= data.length ? 0 : prevIndex + 3
                )
              }
              }
              className="rounded-[34px] flex items-center justify-center p-[8px] md:w-[82px] md:h-[36px] bg-gradient-to-b from-[#1C8DEA] to-[#195BD7]"
            >
              <IoIosArrowForward size={20} color="white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CarouselSection; 