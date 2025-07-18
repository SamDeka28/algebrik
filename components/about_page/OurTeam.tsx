"use client";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import { useState, useEffect, useRef } from "react";
import { m, motion } from "framer-motion";
import Advisory from "./Advisory";
import { FaLinkedin } from "react-icons/fa";

const carouselDataOne = [
  {
    image: "/team_images/andrea.webp",
    name: "ANDREA SILVERS",
    title: "VP, BD & Partnerships",
    place: "N/A",
  },
  {
    image: "/team_images/Jennifer.jpeg",
    name: "JENNIFER HERNANDEZ",
    title: "VP,Customer Success and Account Management",
    place: "N/A",
  },
  {
    image: "/team_images/jesse.webp",
    name: "JESSE FRUGE",
    title: "VP, PRODUCT",
    place: "N/A",
  },
  {
    image: "/team_images/pankaj.webp",
    name: "PANKAJ JAIN ",
    title: "Founder & CEO",
    place: "N/A",
  },
  {
    image: "/team_images/prateek.webp",
    name: "PRATEEK SAMANTARAY",
    title: "AVP, Growth & Product Marketing",
    place: "N/A",
  },
  {
    image: "/team_images/arvind.webp",
    name: "ARVIND MISHRA",
    title: "Vice President - Business Development and Inside Sales",
    place: "N/A",
  },
  {
    image: "/team_images/tarun.webp",
    name: "TARUN KANERIA",
    title: "AVP, Product",
    place: "N/A",
  }
];

const carouselDataTwo = [
  {
    image: "/team_images/david.webp",
    name: "David Libby",
    title: "Chief Executive Officer",
    place: "Town & Country FCU, Maine",
    bio:"David Libby has worked at Town & Country Federal Credit Union for nearly 35 years and has been President & CEO since 2011. He has spearheaded Maine’s first contactless debit cards, Apple Pay, check-imaging ATMs, and even one of the nation’s earliest Alexa banking skills, all while fostering a “think-beyond-banking” culture.",
    linkedin:"https://www.linkedin.com/in/david-libby-166a8310/"
  },
  {
    image: "/team_images/hina.webp",
    name: "Hina Khalid",
    title: "Chief Financial Officer",
    place: "Labor Credit Union, Washington",
    bio:"Hina is an innovative financial leader with over 20 years of experience, currently serving as CFO at Labor Credit Union—where she also oversees HR, enterprise risk, compliance, and strategic partnerships. Hina is Vice Chair of the D.C. Chapter for the Maryland/D.C. Credit Union Association and a board member of DORA Financial, focused on expanding access to banking for low-income families.",
    linkedin:"https://www.linkedin.com/in/hinakh/"
  },
  {
    image: "/team_images/leAnne.webp",
    name: "LeAnne Hixson",
    title: "Chief Lending Officer",
    place: "PFCU Credit Union, Michigan",
    bio:"LeAnne Hixson is the Chief Lending Officer at PFCU Credit Union. She has twenty-five years of experience in the financial industry with a strong background in lending and loan product development. She is an integral part of the executive team and a recognized leader in the credit union community. LeAnne is a life-long Michigan resident who currently resides in Grand Ledge with her family.",
    linkedin:"https://www.linkedin.com/in/leanne-hixson-87147768/"
  },
  {
    image: "/team_images/Michael.webp",
    name: "Michael Barnhardt Jr",
    title: "Chief Lending Officer",
    place: "Oklahoma Central Credit Union, Oklahoma",
    bio:"Michael Barnhardt Jr. is Chief Lending Officer at Oklahoma Central Credit Union with 20+ years in lending strategy and analytics. An MBA/BS graduate of Western Governors University, he also heads the Meridian Trust NorthStar Foundation and advises Junior Achievement, CU 2.0, and Algebrik.",
    linkedin:"https://www.linkedin.com/in/michael-barnhardt-jr-mba-5136b722/"
  },
  {
    image: "/team_images/michele.webp",
    name: "Michele Dean",
    title: "Chief Executive Officer",
    place: "Suffolk FCU, New York",
    bio:"Michele Dean is President and CEO of Suffolk Federal Credit Union, with a background in executive strategy and lending at major financial institutions. She holds advanced finance and leadership credentials and serves on several industry and community boards. Recognized as a top business leader and influencer, Michele has received multiple accolades for her impact in finance and on Long Island.",
    linkedin:"https://www.linkedin.com/in/micheledean/"
  },
  {
    image: "/team_images/SherryWu.webp",
    name: "Sherry Wu",
    title: "Chief Technology Officer",
    place: "University of Michigan Credit Union, Michigan",
    bio:"Sherry Wu is the CTO of the University of Michigan Credit Union, guiding IT strategy after 25 years in leadership roles at IBM, Ford, and HPE and board service at People Driven CU. She holds an MBA from Michigan Ross and an MS in Computer Science from Eastern Michigan University.",
    linkedin:"https://www.linkedin.com/in/xiang-wu/"
  },
  {
    image:"/team_images/Shirley.jpeg",
    name:"Shirley Senn",
    title:"Chief Community Development & Impact Officer",
    place:"New Orleans Firemen's Federal Credit Union",
    bio:"Shirley is a Certified Credit Union Development Educator and passionate advocate for financial inclusion. With 30+ years of experience across fintech, credit union strategy, and nonprofit leadership, she brings a human-first lens to innovation and impact in community finance.",
    linkedin:"https://www.linkedin.com/in/shirley-senn-cude-4395377/"
  },
  {
    image: "/team_images/se.webp",
    name: "Shad Edwards",
    title: "Chief Lending Officer",
    place: "MidWest America FCU, Indiana",
    bio:"Shad Edwards is Chief Lending Officer at MidWest America FCU, Fort Wayne, IN, overseeing all lending operations. With 13 years as CLO and 16 years at the credit union, he previously served as VP of Commercial Banking in Northwest Ohio.",
    linkedin:"https://www.linkedin.com/in/shad-edwards-3a08b3b/"
  },
  {
    image: "/team_images/travis.webp",
    name: "Travis Bow",
    title: "Chief Executive Officer",
    place: "University of Hawaii FCU, Hawaii",
    bio:"Travis Bow is President and CEO of the University of Hawaii Federal Credit Union (UHFCU), Hawaii’s fifth largest credit union with $618 million in assets. He brings 17 years of experience at UHFCU, including as Vice President of Member Support, and is dedicated to member service and operational excellence. A University of Hawaii graduate, Bow is committed to the community and leading UHFCU’s continued growth.",
    linkedin:"https://www.linkedin.com/in/travis-b-2a0475279/"
  },
];

export function TeamMemberCard({
  image,
  name,
  title,
  place,
  carousel=true,
  bio,
  linkedin
}: {
  image: string;
  name: string;
  title: string;
  place?: string;
  carousel?: boolean;
  bio?: string;
  linkedin?: string;
}) {
  return (
    <div
      className={`${!carousel ? "w-full  h-[340px] md:h-[408.46px]  hover:border-[3px] hover:border-[#7EABFF]" : "w-[307px] h-[340px] md:w-[369.18px] md:h-[408.46px] bg-cover"} font-plus-jakarta 
       bg-cover bg-center relative rounded-[22.61px] flex flex-col-reverse md:flex-col items-center justify-end  shadow-lg group overflow-hidden`}
      style={{ backgroundImage: `url(${image})` }}
    >
      {!carousel && (
        <div className="absolute top-0 left-0 w-full h-full group-hover:visible invisible bg-[#001B41] bg-opacity-80 transition-opacity duration-300">
          {bio && <p className="text-white text-sm p-4 font-plus-jakarta leading-6 font-medium">{bio}</p>}
          {linkedin && <a href={linkedin} target="_blank" className="text-white text-sm p-4 absolute bottom-0 left-0"><FaLinkedin size={32}/></a>}
        </div>
      )}
      <div className={`${!carousel ? "w-full px-6 group-hover:invisible" : "w-[291px] md:w-[349px]  bg-white/80 backdrop-blur-sm bottom-6  "} absolute py-5 rounded-[13.57px] flex flex-col items-center justify-center shadow-[0px_18.09px_32.57px_0px_rgba(10,64,108,0.1)]`}
        style={!carousel ? { background: "linear-gradient(180deg, rgba(0, 27, 65, 0) 0%, #001B41 100%)",height:"100%",justifyContent:"flex-end"
        } : {}}
      >
        <h3 className="text-[16px] text-black font-bold" style={!carousel ? { color: "white",textTransform:"uppercase" } : {}}>{name}</h3>
        <p className="text-[14px] text-gray-600 text-center" style={!carousel ? { color: "white" } : {}}>{title}</p>
        {/* {place && place !== "N/A" && (
          <p className="text-[14px] text-gray-600" style={!carousel ? { color: "white" } : {}}>{place}</p>
        )} */}
      </div>
    </div>
  );
}

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


  // const visibleItems = isMobile
  //   ? data
  //   : data.slice(currentIndex, currentIndex + 3).length === 3
  //     ? data.slice(currentIndex, currentIndex + 3)
  //     : [...data.slice(currentIndex), ...data.slice(0, 3 - data.slice(currentIndex).length)];
  const visibleItems = data.slice(currentIndex, currentIndex + 3).length === 3
    ? data.slice(currentIndex, currentIndex + 3)
    : [...data.slice(currentIndex), ...data.slice(0, 3 - data.slice(currentIndex).length)];

  return (
    <div
      className="container w-[100%] md:max-w-7xl md:mx-auto  flex 
    flex-col md:flex-col gap-[30px] font-plus-jakarta md:justify-center items-center px-4 md:px-8"
    >
       <div className=" md:m-0 flex flex-wrap md:flex-nowrap gap-[16px] md:gap-[39px] justify-between items-start py-10 md:py-0 ">
        <div>
          <CustomHeader
            text={headerText}
            className="text-[28px] md:text-[40px] md:w-[317px] flex md:flex-col gap-[5px] font-bold"
          />
        </div>
        <div>
          <CustomSubtitle
            text={subtitleText}
            className="text-[14px] md:text-[20px] font-normal leading-[30px] pt-3"
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
      <Advisory
        data={carouselDataTwo}
        headerText={
          <>
            <div className="hidden md:flex flex-col">
              <span>Guided by the</span>
              <span>Best in the Field</span>
            </div>
            <div className="block md:hidden">
              Guided by the best in the Field
            </div>
          </>
        }
        subtitleText="Our Advisory Board brings together industry leaders and visionaries, guiding Algebrik AI with strategic insights, deep expertise, and a shared commitment to transforming lending into a seamless and inclusive experience."
      />
    </div>
  );
}
