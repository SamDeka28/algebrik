"use client";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import { useState } from "react";
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
  {
    image: "/team.png",
    name: "Michael Brown",
    title: "Head of Marketing",
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
    name: "Travis Bow",
    title: "Chief Lending Officer",
    place: "MidWest America FCU, Indiana",
  },
];

function TeamMemberCard({
  image,
  name,
  title,
  place,
}: {
  image: string;
  name: string;
  title: string;
  place?: string;
}) {
  return (
    <div
      className="md:w-[369.18px] md:h-[408.46px] font-plus-jakarta relative rounded-[22.61px] flex flex-col items-center justify-end bg-cover bg-center shadow-lg"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="bg-white/80 backdrop-blur-sm absolute bottom-6 md:w-[349px] py-5 rounded-[13.57px] flex flex-col items-center justify-center shadow-[0px_18.09px_32.57px_0px_rgba(10,64,108,0.1)]">
        <h3 className="text-[16px] font-bold">{name}</h3>
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
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const handleNext = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= data.length ? 0 : prevIndex + 3
    );
  };

  const handlePrevious = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 3 : prevIndex - 3
    );
  };

  const visibleItems =
    data.slice(currentIndex, currentIndex + 3).length === 3
      ? data.slice(currentIndex, currentIndex + 3)
      : [
          ...data.slice(currentIndex),
          ...data.slice(0, 3 - data.slice(currentIndex).length),
        ];

  return (
    <div className="container md:w-[1160px] mx-auto p-8 flex flex-col gap-[32px] font-plus-jakarta justify-center items-center">
      <div className="flex flex-col gap-[26px]">
        <motion.div
          className="flex gap-[32px] justify-center items-baseline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          style={{ display: "flex", flexDirection: "row" }}
        >
          {visibleItems.map((item, index) => (
            <motion.div
              key={index}
              className="md:w-[369.18px] md:h-[408.46px]"
              initial={{ opacity: 0, x: direction === 'left' ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: direction === 'left' ? -100 : 100,
              }}
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
      <div className="flex flex-wrap md:flex-nowrap gap-[39px] justify-between items-baseline">
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
        <div className="flex gap-[8px] justify-center">
          <button
            onClick={handlePrevious}
            className="rounded-[34px] flex items-center justify-center p-[8px] md:w-[82px] md:h-[36px] bg-gradient-to-b from-[#1C8DEA] to-[#195BD7]"
          >
            <IoIosArrowBack size={20} color="white" />
          </button>
          <button
            onClick={handleNext}
            className="rounded-[34px] flex items-center justify-center p-[8px] md:w-[82px] md:h-[36px] bg-gradient-to-b from-[#1C8DEA] to-[#195BD7]"
          >
            <IoIosArrowForward size={20} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OurTeam() {
  return (
    <div className="flex flex-col gap-[88px]">
      <CarouselSection
        data={carouselDataOne}
        headerText={
          <>
            <span>Meet our team</span>
            <span> members</span>
          </>
        }
        subtitleText="Our vision to reshape the way lending is done is backed by 100+ man years of experience in the field. Meet the people behind Algebrik!"
      />
      <CarouselSection
        data={carouselDataTwo}
        headerText={
          <>
            <span>Guided by the</span>
            <span>Best in the Field</span>
          </>
        }
        subtitleText="Our Advisory Board brings together industry leaders and visionaries, guiding Algebrik AI with strategic insights, deep expertise, and a shared commitment to transforming lending into a seamless and inclusive experience."
      />
    </div>
  );
}
