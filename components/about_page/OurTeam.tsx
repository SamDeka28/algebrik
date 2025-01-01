"use client";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import { useState } from "react";

const carouselDataOne = [
  {
    image: "/team.png",
    name: "John Doe",
    title: "CEO & Founder",
  },
  {
    image: "/team.png",
    name: "Jane Smith",
    title: "CFO & Co-Founder",
  },
  {
    image: "/team.png",
    name: "Emily Johnson",
    title: "CTO",
  },
  {
    image: "/team.png",
    name: "Michael Brown",
    title: "Head of Marketing",
  },
];

const carouselDataTwo = [
  {
    image: "/team.png",
    name: "Shane Doe",
    title: "CEO & Founder",
  },
  {
    image: "/team.png",
    name: "Alice Green",
    title: "CFO & Co-Founder",
  },
  {
    image: "/team.png",
    name: "Mark Taylor",
    title: "CTO",
  },
  {
    image: "/team.png",
    name: "Sophia Davis",
    title: "Head of Strategy",
  },
];

function TeamMemberCard({ image, name, title }: { image: string; name: string; title: string }) {
  return (
    <div
      className="md:w-[369.18px] md:h-[408.46px] relative rounded-[22.61px] flex flex-col items-center justify-end bg-cover bg-center shadow-lg"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="bg-white absolute bottom-6 px-28 py-5 rounded-[13.57px] flex flex-col items-center justify-center backdrop-blur-[25.94px] shadow-[0px_18.09px_32.57px_0px_rgba(10,64,108,0.1)]">
        <h3 className="text-[16px] font-bold">{name}</h3>
        <p className="text-[14px] text-gray-600">{title}</p>
      </div>
    </div>
  );
}

function CarouselSection({
  data,
  headerText,
  subtitleText,
}: {
  data: { image: string; name: string; title: string }[];
  headerText: React.ReactNode;
  subtitleText: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3 >= data.length ? 0 : prevIndex + 3));
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.length - 3 : prevIndex - 3));
  };

  const visibleItems =
    data.slice(currentIndex, currentIndex + 3).length === 3
      ? data.slice(currentIndex, currentIndex + 3)
      : [...data.slice(currentIndex), ...data.slice(0, 3 - data.slice(currentIndex).length)];

  return (
    <div className="container md:w-[1160px] mx-auto p-8 flex flex-col gap-[32px] font-plus-jakarta justify-center items-center">
      <div className="flex flex-col gap-[26px]">
        <div className="flex gap-[32px] justify-center">
          {visibleItems.map((item, index) => (
            <TeamMemberCard key={index} image={item.image} name={item.name} title={item.title} />
          ))}
        </div>
      </div>
      <div className="flex gap-[39px] justify-between items-start mt-8">
        <div>
          <CustomHeader text={headerText} className="text-[40px] md:w-[317px] flex flex-col font-bold" />
        </div>
        <div>
          <CustomSubtitle text={subtitleText} className="text-[20px] font-normal" />
        </div>
        <div className="flex gap-[8px] justify-center mt-6">
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
    <>
      <CarouselSection
        data={carouselDataOne}
        headerText={
          <>
            <span>Meet our team</span>
            <span>members</span>
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
    </>
  );
}
