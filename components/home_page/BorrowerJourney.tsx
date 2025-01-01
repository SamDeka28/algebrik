// "use client";

// import { useState, useEffect, useRef } from "react";
// import { CustomHeader, CustomSubtitle } from "../CustomHeader";
// import Image from "next/image";
// import { FaLongArrowAltRight } from "react-icons/fa";
// import borrowerData from "../constant/constant";

// export default function BorrowerJourney() {
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
//   const [scrollLock, setScrollLock] = useState(false); // Scroll lock state
//   const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0); // Current category index
//   const [currentSubcategoryIndex, setCurrentSubcategoryIndex] = useState(0); // Current subcategory index
//   const sectionRef = useRef<HTMLDivElement | null>(null); // Section reference to track when to lock scroll
//   const scrollContainerRef = useRef<HTMLDivElement | null>(null); // Scroll container reference

//   // Scroll handler for locking scroll and navigating through categories/subcategories
//   const handleScroll = (e: WheelEvent) => {
//     if (scrollLock) {
//       e.preventDefault(); // Prevent default scrolling behavior

//       // Scroll down
//       if (e.deltaY > 0) {
//         if (currentSubcategoryIndex < borrowerData[currentCategoryIndex].subcategories.length - 1) {
//           setCurrentSubcategoryIndex((prev) => prev + 1); // Move to the next subcategory
//         } else if (currentCategoryIndex < borrowerData.length - 1) {
//           setCurrentCategoryIndex((prev) => prev + 1); // Move to the next category
//           setCurrentSubcategoryIndex(0); // Reset subcategory index to 0
//         }
//       }
//       // Scroll up
//       else if (e.deltaY < 0) {
//         if (currentSubcategoryIndex > 0) {
//           setCurrentSubcategoryIndex((prev) => prev - 1); // Move to the previous subcategory
//         } else if (currentCategoryIndex > 0) {
//           setCurrentCategoryIndex((prev) => prev - 1); // Move to the previous category
//           setCurrentSubcategoryIndex(borrowerData[currentCategoryIndex - 1].subcategories.length - 1); // Reset to the last subcategory of the previous category
//         }
//       }
//     }
//   };

//   // Function to check when section is in view for scroll lock
//   const checkSectionInView = () => {
//     if (sectionRef.current) {
//       const sectionTop = sectionRef.current.getBoundingClientRect().top;
//       const windowHeight = window.innerHeight;

//       // Lock scroll when section is in view
//       if (sectionTop <= windowHeight && sectionTop >= 0) {
//         setScrollLock(true); // Enable scroll lock when the section reaches the top of the viewport
//       } else {
//         setScrollLock(false); // Disable scroll lock when it's out of view
//       }
//     }
//   };

//   useEffect(() => {
//     // Set initial category and subcategory on mount
//     if (borrowerData.length > 0) {
//       const firstCategory = borrowerData[0].category;
//       setSelectedCategory(firstCategory);
//       const firstSubcategory = borrowerData[0].subcategories[0].name;
//       setSelectedSubcategory(firstSubcategory);
//     }

//     // Attach event listener for scroll
//     window.addEventListener("wheel", handleScroll, { passive: false });

//     // Attach scroll listener to track section visibility
//     window.addEventListener("scroll", checkSectionInView);

//     return () => {
//       window.removeEventListener("wheel", handleScroll);
//       window.removeEventListener("scroll", checkSectionInView);
//     };
//   }, [borrowerData, scrollLock, currentCategoryIndex, currentSubcategoryIndex]);

//   return (
//     <div className="container mx-auto p-4 md:p-8 flex flex-col gap-12 overscroll-contain">
//       {/* Header Section */}
//       <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto px-8 md:px-36">
//         <CustomHeader text="Building Better Borrower Journeys" />
//         <CustomSubtitle text="From borrower onboarding to loan closure, Algebrik combines AI-driven automation, intelligent insights, and seamless workflows to transform every stage of the loan lifecycle." />
//       </div>

//       {/* Section for categories and subcategories */}
//       <div
//         ref={sectionRef}
//         className="flex gap-[45px] justify-center items-start flex-wrap w-full"
//       >
//         {/* Categories Section */}
//         <div className="w-[268px] max-h-[500px] bg-white shadow-md rounded-[20px] overflow-y-auto">
//           {borrowerData.map((item, index) => (
//             <div key={item.category}>
//               <button
//                 onClick={() => {
//                   setSelectedCategory(item.category);
//                   setCurrentCategoryIndex(index);
//                   setCurrentSubcategoryIndex(0); // Reset to first subcategory when selecting category
//                 }}
//                 className={`py-[16px] pl-[16px] w-full text-left font-bold text-[15.38px] mb-2 uppercase ${currentCategoryIndex === index ? "border-none" : "border-b border-b-[#F1F1F1]"}`}
//               >
//                 {item.category}
//               </button>

//               {selectedCategory === item.category && (
//                 <div className="flex flex-col gap-4 pl-4 max-h-[500px] overflow-y-auto">
//                   {item.subcategories.map((sub, subIndex) => (
//                     <button
//                       key={sub.name}
//                       onClick={() => setSelectedSubcategory(sub.name)}
//                       className="flex items-center justify-between gap-[8px] text-[13.13px] font-semibold"
//                     >
//                       <div
//                         className={`flex items-center gap-[8px] w-full py-[11px] px-[9px] ${
//                           selectedSubcategory === sub.name
//                             ? "text-[#056CC1] shadow-md rounded-[10px] border border-[#D8E7F5] bg-white/20"
//                             : "text-[#5F5F5F]"
//                         }`}
//                       >
//                         <Image
//                           src={selectedSubcategory === sub.name ? sub.activeIcons : sub.icons}
//                           alt={sub.name}
//                           width={24}
//                           height={24}
//                         />
//                         <span className="flex-1">{sub.name}</span>
//                         {selectedSubcategory === sub.name && (
//                           <FaLongArrowAltRight className="text-[#056CC1]" />
//                         )}
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Image Display Section */}
//         <div className="flex justify-center items-center p-6 w-full md:w-[865px] h-[522.43px] rounded-[20px]">
//           {selectedSubcategory ? (
//             <Image
//               src={borrowerData
//                 .flatMap((item) => item.subcategories)
//                 .find((sub) => sub.name === selectedSubcategory)?.image || ""}
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
