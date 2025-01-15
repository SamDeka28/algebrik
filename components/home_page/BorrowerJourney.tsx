"use client";

// import { useState, useEffect, useRef } from "react";
// import { CustomHeader, CustomSubtitle } from "../CustomHeader";
// import Image from "next/image";
// import { FaLongArrowAltRight } from "react-icons/fa";
// import { useInView } from "react-intersection-observer";
// import borrowerData from "../constant/constant";

// export default function BorrowerJourney() {
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
//   const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
//   const [currentSubcategoryIndex, setCurrentSubcategoryIndex] = useState(0);
//   const [scrollLocked, setScrollLocked] = useState(true);
//   const isScrolling = useRef(false);

//   const { ref: sectionViewRef, inView: isInView } = useInView({
//     triggerOnce: false,
//     threshold: 0.5,
//   });

//   useEffect(() => {
//     if (isInView) {
//       setScrollLocked(true);
//       document.body.style.overflow = "hidden";
//     } else {
//       setScrollLocked(false);
//       document.body.style.overflow = "auto";
//     }
//   }, [isInView]);

//   useEffect(() => {
//     const handleScroll = (e: WheelEvent) => {
//       if (!scrollLocked || isScrolling.current) return;

//       e.preventDefault();
//       isScrolling.current = true;

//       if (e.deltaY > 0) {
//         if (currentSubcategoryIndex < borrowerData[currentCategoryIndex].subcategories.length - 1) {
//           setCurrentSubcategoryIndex((prev) => prev + 1);
//           setSelectedSubcategory(borrowerData[currentCategoryIndex].subcategories[currentSubcategoryIndex + 1].name);
//         } else if (currentCategoryIndex < borrowerData.length - 1) {
//           setCurrentCategoryIndex((prev) => prev + 1);
//           setCurrentSubcategoryIndex(0);
//           setSelectedCategory(borrowerData[currentCategoryIndex + 1].category);
//           setSelectedSubcategory(borrowerData[currentCategoryIndex + 1].subcategories[0].name);
//         }
//       } else if (e.deltaY < 0) {
//         if (currentSubcategoryIndex > 0) {
//           setCurrentSubcategoryIndex((prev) => prev - 1);
//           setSelectedSubcategory(borrowerData[currentCategoryIndex].subcategories[currentSubcategoryIndex - 1].name);
//         } else if (currentCategoryIndex > 0) {
//           setCurrentCategoryIndex((prev) => prev - 1);
//           const prevCategory = borrowerData[currentCategoryIndex - 1];
//           const lastSubIndex = prevCategory.subcategories.length - 1;
//           setCurrentSubcategoryIndex(lastSubIndex);
//           setSelectedCategory(prevCategory.category);
//           setSelectedSubcategory(prevCategory.subcategories[lastSubIndex].name);
//         }
//       }

//       setTimeout(() => {
//         isScrolling.current = false;
//       }, 500);
//     };

//     window.addEventListener("wheel", handleScroll, { passive: false });

//     return () => {
//       window.removeEventListener("wheel", handleScroll);
//     };
//   }, [scrollLocked, currentCategoryIndex, currentSubcategoryIndex]);

//   useEffect(() => {
//     if (borrowerData.length > 0) {
//       setSelectedCategory(borrowerData[0].category);
//       setSelectedSubcategory(borrowerData[0].subcategories[0].name);
//     }
//   }, []);

//   useEffect(() => {
//     const isLastSubcategory = currentCategoryIndex === borrowerData.length - 1 && currentSubcategoryIndex === borrowerData[currentCategoryIndex].subcategories.length - 1;
//     const isFirstSubcategory = currentCategoryIndex === 0 && currentSubcategoryIndex === 0;

//     if (isLastSubcategory || isFirstSubcategory) {
//       setScrollLocked(false);
//       document.body.style.overflow = "auto";
//     } else {
//       setScrollLocked(true);
//       document.body.style.overflow = "hidden";
//     }
//   }, [currentCategoryIndex, currentSubcategoryIndex]);

//   return (
//     <div className="container mx-auto p-4 md:p-8 flex flex-col gap-12 overscroll-contain">
//       <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto px-8 md:px-36">
//         <CustomHeader text="Building Better Borrower Journeys" />
//         <CustomSubtitle text="From borrower onboarding to loan closure, Algebrik combines AI-driven automation, intelligent insights, and seamless workflows to transform every stage of the loan lifecycle." />
//       </div>
//       <div
//         ref={sectionViewRef}
//         className="flex gap-[45px] justify-center items-start flex-wrap w-full"
//       >
//         <div className="w-[268px] max-h-[500px] items-start justify-start bg-white shadow-md rounded-[20px] overflow-y-auto">
//           {borrowerData.map((item, index) => (
//             <div key={item.category}>
//               <button
//                 onClick={() => {
//                   setSelectedCategory(item.category);
//                   setCurrentCategoryIndex(index);
//                   setCurrentSubcategoryIndex(0);
//                   setSelectedSubcategory(item.subcategories[0].name);
//                 }}
//                 aria-pressed={currentCategoryIndex === index}
//                 className={`py-[16px] pl-[16px] w-full text-left font-bold text-[15.38px] mb-2 uppercase ${currentCategoryIndex === index ? "bg-white-100" : "border-b border-b-[#F1F1F1]"}`}
//               >
//                 {item.category}
//               </button>
//               {selectedCategory === item.category && (
//                 <div className="flex flex-col items-start justify-start gap-4 pl-4">
//                   {item.subcategories.map((sub, subIndex) => (
//                     <button
//                       key={sub.name}
//                       onClick={() => {
//                         setSelectedSubcategory(sub.name);
//                         setCurrentSubcategoryIndex(subIndex);
//                       }}
//                       aria-pressed={selectedSubcategory === sub.name}
//                       className={`flex items-center gap-[8px] w-full py-[11px] px-[9px] ${selectedSubcategory === sub.name ? "bg-white border border-[#D8E7F5] shadow-md rounded-[10px] text-blue-600" : "text-gray-700"}`}
//                     >
//                       <Image src={selectedSubcategory === sub.name ? sub.activeIcons : sub.icons} alt={sub.name} width={24} height={24} />
//                       <span className="flex-1 text-left">{sub.name}</span>
//                       {selectedSubcategory === sub.name && <FaLongArrowAltRight className="text-blue-600" />}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-center items-center p-6 w-full md:w-[865px] h-[522.43px] rounded-[20px]">
//           {selectedSubcategory ? (
//             <Image
//               src={borrowerData.flatMap((item) => item.subcategories).find((sub) => sub.name === selectedSubcategory)?.image || ""}
//               alt={selectedSubcategory}
//               className="w-full md:w-[865px] h-[300px] md:h-[522.43px] rounded"
//               width={865}
//               height={522.43}
//               objectFit="cover"
//               priority
//               quality={100}
//             />
//           ) : (
//             <p className="text-gray-500">Select a subcategory to view the image</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import { motion } from "framer-motion";
import borrowerData from "../constant/constant";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

export default function BorrowerJourney() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [, setCurrentSubcategoryIndex] = useState(0);
  const [imageKey, setImageKey] = useState(Date.now());

  useEffect(() => {
    if (borrowerData.length > 0) {
      setSelectedCategory(borrowerData[0].category);
      setSelectedSubcategory(borrowerData[0].subcategories[0].name);
    }
  }, []);

  const handleImageChange = () => {
    setImageKey(Date.now());
  };

  const handlePrevious = () => {
    setCurrentCategoryIndex((prev) =>
      prev === 0 ? borrowerData.length - 1 : prev - 1
    );
    setSelectedCategory(
      borrowerData[
        currentCategoryIndex === 0
          ? borrowerData.length - 1
          : currentCategoryIndex - 1
      ].category
    );
    setSelectedSubcategory(
      borrowerData[
        currentCategoryIndex === 0
          ? borrowerData.length - 1
          : currentCategoryIndex - 1
      ].subcategories[0].name
    );
  };

  const handleNext = () => {
    setCurrentCategoryIndex((prev) =>
      prev === borrowerData.length - 1 ? 0 : prev + 1
    );
    setSelectedCategory(
      borrowerData[
        currentCategoryIndex === borrowerData.length - 1
          ? 0
          : currentCategoryIndex + 1
      ].category
    );
    setSelectedSubcategory(
      borrowerData[
        currentCategoryIndex === borrowerData.length - 1
          ? 0
          : currentCategoryIndex + 1
      ].subcategories[0].name
    );
  };

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col gap-12 overscroll-contain">
      <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto px-8 md:px-36">
        <CustomHeader
          className="px-5"
          text="Building Better Borrower Journeys"
        />
        <CustomSubtitle text="From borrower onboarding to loan closure, Algebrik combines AI-driven automation, intelligent insights, and seamless workflows to transform every stage of the loan lifecycle." />
      </div>

      <div className="flex flex-col md:flex-row gap-[45px] justify-center items-start flex-wrap w-full">
        <div className="w-full h-[550px] md:w-[268px] md:h-[500px] items-start justify-start bg-white shadow-md rounded-[20px] overflow-y-auto">
          {/* Mobile carousel navigation */}
          <div className="flex md:hidden font-plus-jakarta justify-between items-center px-4 py-4 rounded-t-lg">
            <button
              onClick={handlePrevious}
              aria-label="Previous Category"
              className="rounded-full w-[32px] h-[32px] bg-white border border-[#D8E7F5] shadow-2xl flex items-center justify-center"
            >
              <MdNavigateBefore className="text-2xl text-[#2A5FAC]" />
            </button>
            <span className="text-[16px] font-bold font-plus-jakarta text-sm text-black">
              {selectedCategory}
            </span>
            <button
              onClick={handleNext}
              aria-label="Next Category"
              className="rounded-full w-[32px] h-[32px] bg-white border border-[#D8E7F5] shadow-2xl flex items-center justify-center"
            >
              <MdNavigateNext className="text-2xl text-[#2A5FAC]" />
            </button>
          </div>

          {borrowerData.map((item, index) => (
            <div
              key={item.category}
              className={`${
                index === currentCategoryIndex ? "block" : "hidden"
              } md:block`}
            >
              <button
                onClick={() => {
                  setSelectedCategory(item.category);
                  setCurrentCategoryIndex(index);
                  setCurrentSubcategoryIndex(0);
                  setSelectedSubcategory(item.subcategories[0].name);
                }}
                aria-pressed={currentCategoryIndex === index}
                className={`hidden md:block py-[16px] pl-[16px] w-full font-plus-jakarta text-left text-black font-bold text-[15.38px] mb-2 uppercase ${
                  currentCategoryIndex === index
                    ? "bg-white-100"
                    : "border-b border-b-[#F1F1F1]"
                }`}
              >
                {item.category}
              </button>
              {selectedCategory === item.category && (
                <div className="flex flex-col items-start justify-start gap-4 pl-4">
                  {item.subcategories.map((sub, subIndex) => (
                    <button
                      key={sub.name}
                      onClick={() => {
                        setSelectedSubcategory(sub.name);
                        setCurrentSubcategoryIndex(subIndex);
                        handleImageChange();
                      }}
                      aria-pressed={selectedSubcategory === sub.name}
                      className={`flex items-center font-plus-jakarta gap-[8px] w-full py-[11px] px-[9px] ${
                        selectedSubcategory === sub.name
                          ? "bg-white/70 border border-[#D8E7F5] shadow-md rounded-[10px] text-[#056CC1] font-[600]"
                          : "text-gray-700"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <Image
                          src={
                            selectedSubcategory === sub.name
                              ? sub.activeIcons
                              : sub.icons
                          }
                          alt={sub.name}
                          width={24}
                          height={24}
                          className="!w-[13px] h-[13px] md:w-[24px] !md:h-[24px]"
                        />
                      </div>
                      <span className="flex-1 text-left">{sub.name}</span>
                      {selectedSubcategory === sub.name && (
                        <FaLongArrowAltRight className="text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="w-[20%]">
        <motion.div
  className="container relative -inset-y-[700px] md:inset-0 w-full flex gap-[24.42px] justify-center mt-[2px]"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  <div className="relative opacity-[30%] z-[-1]">
    <motion.div
      className="absolute top-0 left-1/2 transform  sm:-left-6 md:left-[96px] bg-gradient-to-b sm:bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full w-[100%] h-[400px] sm:w-[100%] sm:h-[500px] md:w-[468.64px] md:h-[542.11px] blur-[50px] sm:blur-[100px]"
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
      className="absolute top-[200px] sm:top-0 left-1/2 transform -translate-x-1/2 sm:left-6 md:left-[20px] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full w-[350px] h-[450px] sm:w-[500px] sm:h-[600px] md:w-[618.35px] md:h-[633.38px] blur-[50px] sm:blur-[100px] -z-10"
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
      className="absolute top-[400px] sm:top-0 left-1/2 transform -translate-x-1/2 sm:left-10 md:-left-96 md:bottom-[10px] bg-[#BE95FF] rounded-full w-[250px] h-[350px] sm:w-[400px] sm:h-[500px] md:w-[451.48px] md:h-[542.11px] blur-[50px] sm:blur-[100px] z-[-1]"
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
</motion.div>


          <div className="absolute -translate-y-[310px] -translate-x-5 md:static md:translate-x-0 md:-translate-y-[10px] flex justify-center items-center p-6 w-full h-[231px] md:w-[865px] md:h-[522.43px] rounded-[20px]">
            {selectedSubcategory && (
              <motion.div
                key={imageKey}
                initial={{ x: "20%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-20%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 25 }}
              >
                <Image
                  src={
                    borrowerData
                      .flatMap((item) => item.subcategories)
                      .find((sub) => sub.name === selectedSubcategory)?.image ||
                    ""
                  }
                  alt={selectedSubcategory}
                  className="w-[363px] h-[220] md:w-[865px] md:h-[522.43px] rounded-[16px] md:rounded"
                  width={865}
                  height={522.43}
                  objectFit="cover"
                  priority
                  quality={100}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
