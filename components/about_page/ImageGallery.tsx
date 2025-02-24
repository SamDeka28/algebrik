"use client";
import Image from "next/image";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import { useState } from "react";
import { HiX } from "react-icons/hi"

const widths = [500, 1000, 1600]
const ratios = [2.2, 4, 6, 8]

export default function ImageGallery({ images }: any) {
    let [selectedImage, setSelectedImage] = useState();
    let [open, setOpen] = useState(false);
    return <div className="container mx-auto px-4 md:py-[93px] flex flex-col gap-[56px] font-plus-jakarta justify-center items-center">
        <div className="text-center flex flex-col gap-[16px] md:gap-[24px]">
            <CustomHeader text="Gallery" className="text-[28px] md:text-[40px]" />
            <CustomSubtitle
                text="Take a look at our gallery showcasing our social vibes and awesome moments!"
                className="px-4 md:px-80 text-[14px] md:text-[20px]"
            />
        </div>
        {/* <div>
            <div className="min-h-full w-full flex flex-wrap gap-4">
                {images.map((image:any,index:number)=><div className=" hover:border-[#87B9FF] hover:border-[8px] hover:scale-[1.01] transition-all border-white border-[10px] max-w-[18%] rounded-2xl"><img key={index} className="max-w-[100%]  h-[100%] object-cover shadow-xl cursor-pointer rounded-lg box-content" src={image.src} alt={image.src}
                    onClick={()=>{setOpen(true);setSelectedImage(image.src)}}
                /></div>)}
            </div>
        </div> */}
          <div className="w-screen overflow-x-auto p-4 scrollbar-hide">
      <div className="flex flex-col gap-4">
        {/* Row 1 */}
        <div className="flex gap-4 flex-nowrap h-64 overflow-x-scroll">
          {images.filter((_:any, index:number) => index % 2 === 0).map(({ src, width, height }:any, index:number) => {
            const aspectRatio = width / height;
            return (
              <div key={index} className="relative h-64 p-2 hover:bg-[#87B9FF] rounded-lg transition-all" style={{ minWidth: `${Math.max(300, aspectRatio * 300)}px` }}>
                <Image
                  src={src}
                  alt={`Gallery Image ${index + 1}`}
                  width={width}
                  height={height}
                  className="h-full w-full object-cover rounded-lg cursor-pointer drop-shadow-md"
                  onClick={()=>{setOpen(true);setSelectedImage(src)}}
                />
              </div>
            );
          })}
        </div>

        {/* Row 2 */}
        <div className="flex gap-4 flex-nowrap h-64 overflow-scroll">
          {images.filter((_:any, index:number) => index % 2 !== 0).map(({ src, width, height }:any, index:number) => {
            const aspectRatio = width / height;
            return (
              <div key={index} className="p-2 hover:bg-[#87B9FF] rounded-lg relative transition-all" style={{ minWidth: `${Math.max(300, aspectRatio * 300)}px` }}>
                <Image
                  src={src}
                  alt={`Gallery Image ${index + 1}`}
                  width={width}
                  height={height}
                  className="w-full h-full object-cover rounded-lg cursor-pointer drop-shadow-md"
                  onClick={()=>{setOpen(true);setSelectedImage(src)}}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>

        {open &&
            <div className="bg-[rgba(0,0,0,0.8)] transition-all w-full h-[100vh] fixed top-0 left-0 flex justify-center items-center z-[10000] " onClick={() => setOpen(false)}>
                <div className="lg:h-[80%] h-auto lg:w-auto w-[100%]  rounded-xl border-white lg:border-[10px] border-[10px] mx-4">
                    <HiX size={"50px"} color="#fff" className="absolute lg:top-10 lg:right-10 top-10 right-[10px] cursor-pointer" />
                    <img src={selectedImage} className="!h-[100%] rounded-xl" />
                </div>
            </div>
        }
    </div>
}