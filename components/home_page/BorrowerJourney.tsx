"use client";

import { useState, useEffect, useRef } from "react";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import borrowerData from "../constant/constant";

export default function BorrowerJourney() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [scrollLock, setScrollLock] = useState(false);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentSubcategoryIndex, setCurrentSubcategoryIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (borrowerData.length > 0) {
      setSelectedCategory(borrowerData[0].category);
      setSelectedSubcategory(borrowerData[0].subcategories[0]?.name || null);
    }

    const handleScroll = (e: WheelEvent) => {
      if (scrollLock) {
        e.preventDefault();
        if (e.deltaY > 0) {
          if (currentSubcategoryIndex < borrowerData[currentCategoryIndex].subcategories.length - 1) {
            setCurrentSubcategoryIndex((prev) => prev + 1);
            setSelectedSubcategory(borrowerData[currentCategoryIndex].subcategories[currentSubcategoryIndex + 1].name);
          } else if (currentCategoryIndex < borrowerData.length - 1) {
            setCurrentCategoryIndex((prev) => prev + 1);
            setCurrentSubcategoryIndex(0);
            setSelectedCategory(borrowerData[currentCategoryIndex + 1].category);
            setSelectedSubcategory(borrowerData[currentCategoryIndex + 1].subcategories[0].name);
          } else {
            setScrollLock(false);
          }
        } else if (e.deltaY < 0) {
          if (currentSubcategoryIndex > 0) {
            setCurrentSubcategoryIndex((prev) => prev - 1);
            setSelectedSubcategory(borrowerData[currentCategoryIndex].subcategories[currentSubcategoryIndex - 1].name);
          } else if (currentCategoryIndex > 0) {
            setCurrentCategoryIndex((prev) => prev - 1);
            setCurrentSubcategoryIndex(borrowerData[currentCategoryIndex - 1].subcategories.length - 1);
            setSelectedCategory(borrowerData[currentCategoryIndex - 1].category);
            setSelectedSubcategory(borrowerData[currentCategoryIndex - 1].subcategories[borrowerData[currentCategoryIndex - 1].subcategories.length - 1].name);
          } else {
            setScrollLock(false);
          }
        }
      }
    };

    const checkInView = () => {
      if (sectionRef.current) {
        const { top, bottom } = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (top < windowHeight && bottom > 0) {
          setScrollLock(true);
        } else {
          setScrollLock(false);
        }
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("scroll", checkInView);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("scroll", checkInView);
    };
  }, [scrollLock, currentCategoryIndex, currentSubcategoryIndex]);

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col gap-12 overscroll-contain">
      <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto px-8 md:px-36">
        <CustomHeader text="Building Better Borrower Journeys" />
        <CustomSubtitle text="From borrower onboarding to loan closure, Algebrik combines AI-driven automation, intelligent insights, and seamless workflows to transform every stage of the loan lifecycle." />
      </div>
      <div
        ref={sectionRef}
        className="flex gap-[45px] justify-center items-start flex-wrap w-full"
      >
        <div className="w-[268px] max-h-[500px] bg-white shadow-md rounded-[20px] overflow-y-auto">
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
                className={`py-[16px] pl-[16px] w-full text-left font-bold text-[15.38px] mb-2 uppercase ${currentCategoryIndex === index ? "bg-gray-100" : "border-b border-b-[#F1F1F1]"}`}
              >
                {item.category}
              </button>
              {selectedCategory === item.category && (
                <div className="flex flex-col gap-4 pl-4 max-h-[500px] overflow-y-auto">
                  {item.subcategories.map((sub) => (
                    <button
                      key={sub.name}
                      onClick={() => setSelectedSubcategory(sub.name)}
                      aria-pressed={selectedSubcategory === sub.name}
                      className={`flex items-center gap-[8px] w-full py-[11px] px-[9px] ${
                        selectedSubcategory === sub.name
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      <Image
                        src={selectedSubcategory === sub.name ? sub.activeIcons : sub.icons}
                        alt={sub.name}
                        width={24}
                        height={24}
                      />
                      <span className="flex-1">{sub.name}</span>
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
        <div className="flex justify-center items-center p-6 w-full md:w-[865px] h-[522.43px] rounded-[20px]">
          {selectedSubcategory ? (
            <Image
              src={
                borrowerData
                  .flatMap((item) => item.subcategories)
                  .find((sub) => sub.name === selectedSubcategory)?.image || ""
              }
              alt={selectedSubcategory}
              className="w-full md:w-[865px] h-[300px] md:h-[522.43px] rounded"
              width={865}
              height={522.43}
              objectFit="cover"
              priority
              quality={100}
            />
          ) : (
            <p className="text-gray-500">Select a subcategory to view the image</p>
          )}
        </div>
      </div>
    </div>
  );
}