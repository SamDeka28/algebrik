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

export default function BorrowerJourney() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
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

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col gap-12 overscroll-contain">
      <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto px-8 md:px-36">
        <CustomHeader text="Building Better Borrower Journeys" />
        <CustomSubtitle text="From borrower onboarding to loan closure, Algebrik combines AI-driven automation, intelligent insights, and seamless workflows to transform every stage of the loan lifecycle." />
      </div>
      <div className="flex gap-[45px] justify-center items-start flex-wrap w-full">
        <div className="w-[268px] h-[500px] items-start justify-start bg-white shadow-md rounded-[20px] overflow-y-auto">
          {borrowerData.map((item, index) => (
            <div key={item.category}>
              <button
                onClick={() => {
                  setSelectedCategory(item.category);
                  setCurrentCategoryIndex(index);
                  setCurrentSubcategoryIndex(0);
                  setSelectedSubcategory(item.subcategories[0].name);
                }}
                aria-pressed={currentCategoryIndex === index}
                className={`py-[16px] pl-[16px] w-full font-plus-jakarta text-left text-black font-plus-jakarta font-bold text-[15.38px] mb-2 uppercase ${currentCategoryIndex === index ? "bg-white-100" : "border-b border-b-[#F1F1F1]"}`}
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
                      className={`flex items-center font-plus-jakarta gap-[8px] w-full py-[11px] px-[9px] ${selectedSubcategory === sub.name ? "bg-white border border-[#D8E7F5] shadow-md rounded-[10px] text-blue-600" : "text-gray-700"}`}
                    >
<div className="flex-shrink-0">
  <Image
    src={selectedSubcategory === sub.name ? sub.activeIcons : sub.icons}
    alt={sub.name}
    width={24}
    height={24}
    className="!md:w-[24px] !md:h-[24px]"
  />
</div>                      <span className="flex-1 text-left">{sub.name}</span>
                      {selectedSubcategory === sub.name && <FaLongArrowAltRight className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center p-6 w-full md:w-[865px] h-[522.43px] rounded-[20px]">
          {selectedSubcategory && (
            <motion.div
              key={imageKey}
              initial={{ x: '20%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-20%', opacity: 0 }} 
              transition={{ type: 'spring', stiffness: 100, damping: 25 }}
            >
              <Image
                src={borrowerData.flatMap((item) => item.subcategories).find((sub) => sub.name === selectedSubcategory)?.image || ""}
                alt={selectedSubcategory}
                className="w-full md:w-[865px] h-[300px] md:h-[522.43px] rounded"
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
  );
}


