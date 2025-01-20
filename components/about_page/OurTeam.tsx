"use client";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const carouselDataOne = [
  {
    image: "/team_images/pankaj.png",
    name: "PANKAJ JAIN ",
    title: "Founder & CEO",
    place: "N/A",
  },
  {
    image: "/team_images/jesse.png",
    name: "JESSE FRUGE",
    title: "VP, PRODUCT",
    place: "N/A",
  },
  {
    image: "/team_images/andrea.png",
    name: "ANDREA SILVERS",
    title: "VP, BD & Partnerships",
    place: "N/A",
  },
];

const carouselDataTwo = [
  {
    image: "/team_images/michele.png",
    name: "Michele Dean",
    title: "Chief Executive Officer",
    place: "Suffolk FCU, New York",
  },
  {
    image: "/team_images/travis.png",
    name: "Travis Bow",
    title: "Chief Executive Officer",
    place: "University of Hawaii FCU, Hawaii",
  },
  {
    image: "/team_images/leAnne.png",
    name: "LeAnne Hixson",
    title: "Chief Lending Officer",
    place: "PFCU Credit Union, Michigan",
  },
  {
    image: "/team_images/david.png",
    name: "David Libby",
    title: "Chief Executive Officer",
    place: "Town & Country FCU, Maine",
  },
  {
    image: "/team_images/travisBow.png",
    name: "Shad Edwards",
    title: "Chief Lending Officer",
    place: "MidWest America FCU, Indiana",
  },
  {
    image: "/team_images/hina.png",
    name: "Hina Khalid",
    title: "Chief Financial Officer",
    place: "Labor Credit Union, Washington",
  },
];

function TeamMemberCard({ image, name, title, place }: { image: string; name: string; title: string; place?: string }) {
  return (
    <div
      className="w-[307px] h-[340px] md:w-[369.18px] md:h-[408.46px] font-plus-jakarta 
      relative rounded-[22.61px] flex flex-col-reverse md:flex-col items-center justify-end bg-cover bg-center shadow-lg"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="bg-white/80 backdrop-blur-sm absolute bottom-6 w-[291px] md:w-[349px] py-5 rounded-[13.57px] flex flex-col items-center justify-center shadow-[0px_18.09px_32.57px_0px_rgba(10,64,108,0.1)]">
        <h3 className="text-[16px] text-black font-bold">{name}</h3>
        <p className="text-[14px] text-gray-600">{title}</p>
        {place && place !== "N/A" && <p className="text-[14px] text-gray-600">{place}</p>}
      </div>
    </div>
  );
}

function CarouselSection({
  data,
  headerText,
  subtitleText,
}: {
  data: { image: string; name: string; title: string; place: string }[];
  headerText: React.ReactNode;
  subtitleText: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [timeRef, setTimeRef] = useState<any>();
  const [refresh,setRefresh] = useState(Date.now())
  useEffect(() => {
    // Check for mobile view
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    // if (isMobile) {
    interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000);
    // }

    setTimeRef(interval);
    return () => clearInterval(interval);
  }, [isMobile, data.length,refresh]);


  const visibleItems = isMobile
    ? data
    : data.slice(currentIndex, currentIndex + 3).length === 3
      ? data.slice(currentIndex, currentIndex + 3)
      : [...data.slice(currentIndex), ...data.slice(0, 3 - data.slice(currentIndex).length)];

  return (
    <div className="container w-[100%] md:w-min md:mx-auto  flex 
    flex-col-reverse md:flex-col gap-[30px] font-plus-jakarta md:justify-center items-center">
      <div className="w-[100%] md:w-full flex overflow-x-scroll md:overflow-x-hidden flex-col gap-[26px]">
        <motion.div
          className={`flex gap-[16px] md:gap-[32px] mx-4 md:mx-0 md:justify-center items-baseline`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
              animate={{ opacity: 1, scale: 1, translateX: 0 }}
              initial={{ opacity: 0, translateX: `${100 * (index + 1)}%` }}
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
              onClick={() =>{
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

export default function OurTeam() {
  return (
    <div className="w-[100%] flex flex-col gap-[88px] md:mb-[83px]">
      <CarouselSection
        data={carouselDataOne}
        headerText={
          <>
            <div className="hidden md:flex flex-col">
              <span>Meet our team</span>
              <span> members</span>
            </div>
            <div className="block md:hidden">Meet our team members</div>
          </>
        }
        subtitleText="Our vision to reshape
 the way lending is done is backed by 100+ man years of experience in the field. Meet the people behind Algebrik!"
      />
      <CarouselSection
        data={carouselDataTwo}
        headerText={
          <>
            <div className="hidden md:flex flex-col">
              <span>Guided by the</span>
              <span>Best in the Field</span>
            </div>

            <div className="block md:hidden">Guided by the best in the Field</div>
          </>
        }
        subtitleText="Our Advisory Board brings together industry leaders and visionaries, guiding Algebrik AI with strategic insights, deep expertise, and a shared commitment to transforming lending into a seamless and inclusive experience."
      />
    </div>
  );
}
