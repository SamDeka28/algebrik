"use client";

import { CustomHeader, CustomSubtitle } from "@/components/CustomHeader";
import Link from "next/link";
import { motion } from "framer-motion";

type CardProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl?: string;
  isPrimary?: boolean;
};

const Card = ({
  title,
  description,
  buttonLink,
  buttonText,
  imageUrl,
  isPrimary,
}: CardProps) => {
  const cardClasses = `w-[100%] h-[322px] md:w-[570px] md:h-[374px] p-6 md:p-16 rounded-[20px] md:rounded-lg shadow-lg flex flex-col justify-between ${
    isPrimary
      ? "text-white bg-gradient-to-b from-[#0057A3]/90 to-[#003B73]/90"
      : "text-[#2A5FAC] bg-white z-2"
  }`;

  const buttonClasses = isPrimary
    ? "bg-white text-[#292929] hover:bg-gray-200"
    : "border-2 border-[#2A5FAC] text-[#292929] hover:bg-[#003B73] hover:text-white";

  return (
    <div
      className={`relative ${cardClasses}`}
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: imageUrl ? undefined : "#f0f0f0",
      }}
    >
      <div className="font-plus-jakarta">
        <h2
          className={`text-[28px] md:text-[36px] font-bold mb-4 ${
            !isPrimary ? "text-[#2A5FAC]" : ""
          }`}
        >
          {title}
        </h2>
        <p
          className={`mb-6 text-[18px] font-normal ${
            !isPrimary ? "text-[#2A5FAC]" : ""
          }`}
        >
          {description}
        </p>
      </div>
      <Link href={buttonLink} passHref target="_blank">
        <button
          className={`w-full md:w-[194px] md:h-[42px] text-[14px] font-bold py-2 px-4 rounded-[20px] transition ${buttonClasses}`}
        >
          {buttonText}
        </button>
      </Link>
    </div>
  );
};

export default function ThankYou() {
  return (
    <section className="flex flex-col justify-center items-center px-[16px] pt-40 md:pt-64 md:gap-[42px] font-plus-jakarta">
      <div className="flex flex-col justify-center text-center items-center gap-[30px]">
        <CustomHeader
          className="md:text-[72px] !font-inter !font-medium"
          text="Your Seat’s Locked in"
        />
        <CustomSubtitle
          className="text-[14px] md:text-[24px] font-normal !font-inter"
          text="You’re officially joining the room where the future of lending is being shaped."
        />
         <CustomSubtitle
          className="text-[14px] md:text-[32px] !font-bold !font-inter mt-10"
          text="This isn’t just another Webinar."
        />
        <CustomSubtitle
          className="text-[14px] md:text-[24px] font-normal!font-inter"
          text="It’s a virtual table full of leaders asking the hard questions—and sharing the real answers."
        />
        <CustomSubtitle
          className="text-[14px] md:text-[24px] font-normal!font-inter"
          text="The conversations you won’t hear anywhere else start here."
        />
      </div>
      <div className="flex justify-center items-center flex-col gap-[32px]">
        <div className="container relative opacity-[30%] z-[-1]">
          <motion.div
            className="absolute top-1 md:left-[296px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] 
            rounded-full md:w-[861.73px] md:h-[439.68px] blur-[100px]"
            animate={{
              y: [50, 30, 50],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1 md:left-[20px] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] 
            rounded-full md:w-[796.91px] md:h-[280.03px] blur-[100px] -z-10"
            animate={{
              y: [50, 30, 60],
            }}
            transition={{
              duration: 2,
              delay: 0.2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-56 bg-[#BE95FF] rounded-full md:w-[1226.24px] md:h-[239.68px] blur-[100px] z-[-1]"
            animate={{
              y: [10, 90, 0],
            }}
            transition={{
              duration: 2,
              delay: 0.4,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        </div>
        <div className="block md:hidden relative w-[80%] h-full">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-tr from-[#66B3B0] to-[#149994] 
    rounded-full h-[350px] sm:w-[400px] sm:h-[450px] md:w-[468.64px] md:h-[542.11px] blur-[125px] opacity-30"
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
            className="absolute top-0 left-0 w-full bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] 
    rounded-full h-[150px] sm:w-[500px] sm:h-[600px] md:w-[618.35px] md:h-[633.38px] blur-[125px] opacity-30 -z-10"
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
            className="absolute top-[300px] sm:top-0 left-0 w-full bg-[#BE95FF] 
    rounded-full h-[900px] sm:w-[400px] sm:h-[500px] md:w-[451.48px] md:h-[642.11px] blur-[105px] opacity-30 z-[-1]"
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
        <div>
          <CustomSubtitle
            className=" text-[14px] text-center md:text-[24px] font-normal !font-inter"
            text="📅 November 20th, 2025 at 2:00 PM EST"
          />
          <CustomSubtitle
            className="text-[14px] text-center md:text-[24px] font-normal !font-inter mt-2"
            text="📍Venue and Time: Details are waiting in your inbox—check your email for the full agenda and location. "
          />
        </div>
        <div className=" font-plus-jakarta">
          <div
            className="flex flex-col md:flex-row gap-6 md:mx-auto max-w-7xl 
          md:px-4 md:pt-[53px] pb-[30px] md:pb-[75px] relative z-10 justify-center items-center"
          >
            <Card
              title="Want a Head Start?"
              description="Grab our guide, “5 Moves to Modern Lending,” for quick wins you can use before the event. It’s short, practical, and built for busy credit union teams like yours."
              buttonText="Download the Guide:"
              buttonLink="https://hubs.ly/Q03gwGqS0"
              imageUrl="/background_images/futureLending.webp"
              isPrimary
            />
            <Card
              title="Join the Leaders on LinkedIn"
              description="Want a front-row seat to what your peers are thinking? RSVP to the event and Follow Algebrik"
              buttonText="RSVP on Linkedin"
              buttonLink="https://www.linkedin.com/events/lending2030-beyondai-shapingthe7315351703766122496/"
              imageUrl="/background_images/algebrikFirsthand.webp"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
