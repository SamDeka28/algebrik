import React from "react";
import { TeamMemberCard } from "./OurTeam";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";

export default function Advisory({
  data,
  headerText,
  subtitleText,
}: {
  data: { image: string; name: string; title: string; place: string; bio?: string; linkedin?: string }[];
  headerText: React.ReactNode;
  subtitleText: string;
}) {
  return (
    <section className="w-full max-w-7xl mx-auto py-0 md:py-10 px-4 md:px-8 flex flex-col items-center">
      {/* Text Section */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-4 text-left mb-10 md:mb-16">
        <CustomHeader
          text={headerText}
          className="text-[28px] md:text-[40px] md: min-w-[317px] flex flex-col gap-[5px] font-bold"
        />
        <CustomSubtitle
          text={subtitleText}
          className="text-[14px] md:text-[20px] font-normal leading-[30px] pt-3"
        />
      </div>
      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 w-full justify-items-center">
        {data.map((item, idx) => (
          <TeamMemberCard
            key={"advisory-card-" + idx}
            image={item.image}
            name={item.name}
            title={item.title}
            place={item.place}
            carousel={false}
            bio={item.bio}
            linkedin={item.linkedin}
          />
        ))}
      </div>
    </section>
  );
} 