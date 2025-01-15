// "use client";

// import { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { CustomHeader } from "../CustomHeader";
// import Image from "next/image";
// import { useInView } from "react-intersection-observer";

// const data = [
//   { title: "Verification", image: "/section_images/verification.png" },
//   { title: "Decisioning", image: "/section_images/seemless_onboarding.png" },
//   { title: "AI-Powered", image: "/section_images/origination.png" },
//   { title: "Onboarding", image: "/section_images/onboarding.png" },
//   { title: "Origination", image: "/section_images/origination.png" },
//   { title: "Closing", image: "/section_images/closing.png" },
// ];

// export default function LoanLifecycle() {
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
//   const sectionRef = useRef<HTMLDivElement | null>(null);

//   const { ref: sectionViewRef } = useInView({
//     triggerOnce: false,
//     threshold: 0.5,
//   });

//   // const handleScroll = (e: WheelEvent) => {
//   //   e.preventDefault();
//   //   if (e.deltaY > 0) {
//   //     if (currentCategoryIndex < data.length - 1) {
//   //       setCurrentCategoryIndex((prev) => prev + 1);
//   //     }
//   //   } else if (e.deltaY < 0) {
//   //     if (currentCategoryIndex > 0) {
//   //       setCurrentCategoryIndex((prev) => prev - 1);
//   //     }
//   //   }
//   // };

//   useEffect(() => {
//     const handleScroll = (e: WheelEvent) => {
//       if (sectionRef.current && sectionRef.current.contains(e.target as Node)) {
//         e.preventDefault();

//         if (e.deltaY > 0 && currentCategoryIndex < data.length - 1) {
//           setCurrentCategoryIndex((prev) => prev + 1);
//         } else if (e.deltaY < 0 && currentCategoryIndex > 0) {
//           setCurrentCategoryIndex((prev) => prev - 1);
//         }
//       }
//     };

//     window.addEventListener("wheel", handleScroll, { passive: false });

//     return () => {
//       window.removeEventListener("wheel", handleScroll);
//     };
//   }, [currentCategoryIndex]);

//   useEffect(() => {
//     setSelectedCategory(data[0].title);
//   }, []);

//   return (
//     <div className="container mx-auto p-4 md:p-8 flex flex-col gap-12 overscroll-contain">
//       <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto px-8 md:px-36">
//         <CustomHeader text="Reimagining the Loan Lifecycle, End to End" />
//       </div>

//       <div
//         ref={sectionViewRef}
//         className="flex justify-center items-center flex-wrap w-full relative"
//       >
//         <motion.div
//           className="container relative md:w-full flex gap-[24.42px] justify-center mt-[2px]"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <div className="relative opacity-[30%] z-[-1]">
//             <motion.div
//               className="absolute top-0 md:left-[96px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full md:w-[468.64px] md:h-[542.11px] blur-[100px]"
//               initial={{ x: "-50%" }}
//               animate={{
//                 x: ["-30%", "30%", "-30%", "0%"],
//               }}
//               transition={{
//                 duration: 10,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />

//             <motion.div
//               className="absolute top-0 md:left-[20px] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full md:w-[618.35px] md:h-[633.38px] blur-[100px] -z-10"
//               initial={{ x: "100%" }}
//               animate={{
//                 x: ["10%", "-20%", "10%", "0%"],
//               }}
//               transition={{
//                 duration: 12,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />

//             <motion.div
//               className="absolute top-0 md:bottom-[10px] bg-[#BE95FF] rounded-full md:w-[451.48px] md:h-[542.11px] blur-[100px] z-[-1]"
//               initial={{ x: "-50%" }}
//               animate={{
//                 x: ["-30%", "40%", "-40%", "0%"],
//               }}
//               transition={{
//                 duration: 8,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />
//           </div>
//         </motion.div>

//         <div className="w-[168px] max-h-[500px] rounded-[20px] overflow-y-auto">
//           {data.map((item, index) => (
//             <button
//               key={item.title}
//               onClick={() => {
//                 setSelectedCategory(item.title);
//                 setCurrentCategoryIndex(index);
//               }}
//               className={`flex items-center gap-2 py-[16px] pl-[16px] w-full text-left font-bold text-[15.38px] mb-2 ${
//                 currentCategoryIndex === index
//                   ? "text-[#056CC1] border-2 rounded-[26px] border-white"
//                   : "text-[#5F5F5F]"
//               }`}
//             >
//               <Image
//                 src={
//                   currentCategoryIndex === index
//                     ? "/icons/check.png"
//                     : "/icons/uncheck.png"
//                 }
//                 width={24}
//                 height={24}
//                 alt={currentCategoryIndex === index ? "Checked" : "Unchecked"}
//               />
//               {item.title}
//             </button>
//           ))}
//         </div>

//         <motion.div
//           ref={sectionRef}
//           className="flex justify-center items-center p-6 w-full md:w-[932px] h-[531.96px] rounded-[20px] relative"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           {selectedCategory ? (
//             <Image
//               src={data[currentCategoryIndex].image}
//               alt={selectedCategory}
//               width={932}
//               height={532}
//               className="rounded-[20px]"
//               priority
//               quality={100}
//             />
//           ) : (
//             <p className="text-gray-500 text-xl">
//               Select a category to see details
//             </p>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { CustomHeader } from "../CustomHeader";
// import Image from "next/image";

// const data = [
//   {
//     title: "Verification",
//     cardHeader: "VERIFICATION",
//     cardTitle: "Accurate & Fast Borrower Validation",
//     cardSubtitle:
//       "Automate KYC, AML, and income verification with real-time processes that reduce risks and eliminate manual delays.",
//     image: "/section_images/platform_card_section/verification.png",
//   },
//   {
//     title: "Decisioning",
//     cardHeader: "VERIFICATION",
//     cardTitle: "Accurate & Fast Borrower Validation",
//     cardSubtitle:
//       "Automate KYC, AML, and income verification with real-time processes that reduce risks and eliminate manual delays.",
//     image: "/section_images/platform_card_section/seemless_onboarding.png",
//   },
//   {
//     title: "AI-Powered",
//     cardHeader: "VERIFICATION",
//     cardTitle: "Accurate & Fast Borrower Validation",
//     cardSubtitle:
//       "Automate KYC, AML, and income verification with real-time processes that reduce risks and eliminate manual delays.",
//     image: "/section_images/platform_card_section/origination.png",
//   },
//   {
//     title: "Onboarding",
//     cardHeader: "ONBOARDING",
//     cardTitle: "Simplify Borrower Engagement",
//     cardSubtitle:
//       "Offer an intuitive application process with AI assistance, instant document uploads, and seamless digital experiences to increase completion rates",
//     image: "/section_images/platform_card_section/onboarding.png",
//   },
//   {
//     title: "Origination",
//     cardHeader: "ORIGINATION",
//     cardTitle: "Build and Customize Loans Effortlessly",
//     cardSubtitle:
//       "Create tailored loan products in minutes with dynamic templates, automated credit checks, and adaptable workflows",
//     image: "/section_images/platform_card_section/origination.png",
//   },
//   {
//     title: "Closing",
//     cardHeader: "CLOSING",
//     cardTitle: "Seamless Closures for Happy Borrowers",
//     cardSubtitle:
//       "Streamline agreements, enable faster disbursements, and keep borrowers informed with real-time updates and transparent workflows",
//     image: "/section_images/platform_card_section/closing.png",
//   },
// ];

// export default function LoanLifecycle() {
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
//   const sectionRef = useRef<HTMLDivElement | null>(null);

//   // Removed scrolling logic, this useEffect is no longer needed
//   // useEffect(() => {
//   //   const handleScroll = (e: WheelEvent) => {
//   //     if (sectionRef.current && sectionRef.current.contains(e.target as Node)) {
//   //       e.preventDefault();

//   //       if (e.deltaY > 0 && currentCategoryIndex < data.length - 1) {
//   //         setCurrentCategoryIndex((prev) => prev + 1);
//   //       } else if (e.deltaY < 0 && currentCategoryIndex > 0) {
//   //         setCurrentCategoryIndex((prev) => prev - 1);
//   //       }
//   //     }
//   //   };

//   //   window.addEventListener("wheel", handleScroll, { passive: false });

//   //   return () => {
//   //     window.removeEventListener("wheel", handleScroll);
//   //   };
//   // }, [currentCategoryIndex]);

//   useEffect(() => {
//     setSelectedCategory(data[0].title);
//   }, []);

//   return (
//     <div className="container mx-auto p-4 md:p-8 flex flex-col gap-12 overscroll-contain">
//       <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto px-8 md:px-36">
//         <CustomHeader text="Reimagining the Loan Lifecycle, End to End" />
//       </div>

//       <div
//         ref={sectionRef}
//         className="flex justify-center items-center flex-wrap w-full relative"
//       >
//         <motion.div
//           className="container relative md:w-full flex gap-[24.42px] justify-center mt-[2px]"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <div className="relative opacity-[30%] z-[-1]">
//             <motion.div
//               className="absolute top-0 -left-96 md:left-[96px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full md:w-[468.64px] md:h-[542.11px] blur-[100px]"
//               initial={{ x: "-50%" }}
//               animate={{
//                 x: ["-30%", "30%", "-30%", "0%"],
//               }}
//               transition={{
//                 duration: 10,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />

//             <motion.div
//               className="absolute top-0 md:left-[20px] -left-96 bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full md:w-[618.35px] md:h-[633.38px] blur-[100px] -z-10"
//               initial={{ x: "100%" }}
//               animate={{
//                 x: ["10%", "-20%", "10%", "0%"],
//               }}
//               transition={{
//                 duration: 12,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />

//             <motion.div
//               className="absolute top-0 -left-96 md:bottom-[10px] bg-[#BE95FF] rounded-full md:w-[451.48px] md:h-[542.11px] blur-[100px] z-[-1]"
//               initial={{ x: "-50%" }}
//               animate={{
//                 x: ["-30%", "40%", "-40%", "0%"],
//               }}
//               transition={{
//                 duration: 8,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />
//           </div>
//         </motion.div>

//         <div className="w-[168px] max-h-[500px] flex flex-col gap-[16px] rounded-[20px] overflow-y-auto">
//           {data.map((item, index) => (
//             <button
//               key={item.title}
//               onClick={() => {
//                 setSelectedCategory(item.title);
//                 setCurrentCategoryIndex(index);
//               }}
//               className={`flex items-center gap-2 font-plus-jakarta py-[10px] pl-[16px] w-full text-left font-bold text-[15.38px] mb-2 ${
//                 currentCategoryIndex === index
//                   ? "text-[#056CC1] border-2 rounded-[26px] bg-gradient-to-b from-[#D8E4FF80] to-[#D8E4FF] border-white"
//                   : "text-[#8C8C8C] font-normal"
//               }`}
//             >
//               <Image
//                 src={
//                   currentCategoryIndex === index
//                     ? "/icons/check.png"
//                     : "/icons/uncheck.png"
//                 }
//                 width={24}
//                 height={24}
//                 alt={currentCategoryIndex === index ? "Checked" : "Unchecked"}
//               />
//               {item.title}
//             </button>
//           ))}
//         </div>

//         <motion.div
//           ref={sectionRef}
//           className="flex justify-center items-center p-6 w-full md:w-[932px] h-[531.96px] rounded-[20px] relative"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           {selectedCategory ? (
//             <Image
//               src={data[currentCategoryIndex].image}
//               alt={selectedCategory}
//               width={932}
//               height={532}
//               className="rounded-[20px]"
//               priority
//               quality={100}
//             />
//           ) : (
//             <p className="text-gray-500 text-xl">
//               Select a category to see details
//             </p>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

export default function LoanLifecycle() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  useEffect(() => {
    setSelectedCategory(data[0].title);
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col gap-12 overscroll-contain">
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
              className={`flex items-center gap-2 font-plus-jakarta py-[10px] pl-[16px] text-left font-bold text-[14px] md:text-[15.38px] mb-2 ${
                currentCategoryIndex === index
                  ? "text-[#056CC1] w-max md:w-full md:border-2 rounded-[26px] md:bg-gradient-to-b from-[#D8E4FF80] to-[#D8E4FF] border-white"
                  : "text-[#8C8C8C] font-normal"
              }`}
            >
              <Image
                src={
                  currentCategoryIndex === index
                    ? "/icons/check.png"
                    : "/icons/uncheck.png"
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
          className="flex justify-center md:items-center p-[24px_24px_0_24px] md:p-6 w-full md:w-[932px] h-[531.96px] rounded-[36px] md:rounded-[42px] relative bg-white shadow-lg border border-gray-200"
          key={selectedCategory}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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
                <hr className="w-[71.69px] md:h-[3.58px] rounded-sm my-[12px] md:my-0 bg-[#C5DDFF]" />
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
                  src={data[currentCategoryIndex].image}
                  alt={selectedCategory}
                  width={350}
                  height={243}
                  className="md:hidden w-[100%] h-5/6 rounded-[10px] object-contain"
                  priority
                  quality={100}
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
