"use client";
import Image from "next/image";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import { useState } from "react";
import { HiX } from "react-icons/hi"
import Marquee from "react-fast-marquee";

const widths = [500, 1000, 1600]
const ratios = [2.2, 4, 6, 8]

export default function ImageGallery({ images }: any) {
  let [selectedImage, setSelectedImage] = useState();
  let [open, setOpen] = useState(false);
  return <div className="container mx-auto max-w-7xl pl-4 py-[30px] md:py-[93px] flex flex-col gap-[30px] lg:gap-[56px] font-plus-jakarta justify-center items-center">
    <div className="text-left md:text-center flex flex-col gap-[16px] md:gap-[24px]">
      <CustomHeader text="Gallery" className="px-4 lg:px-0 text-[28px] md:text-[40px]" />
      <CustomSubtitle
        text="Take a look at our gallery showcasing our social vibes and awesome moments!"
        className="px-4 lg:px-0 md:px-80 text-[14px] md:text-[20px]"
      />
    </div>
    {/* <div>
            <div className="min-h-full w-full flex flex-wrap gap-4">
                {images.map((image:any,index:number)=><div className=" hover:border-[#87B9FF] hover:border-[8px] hover:scale-[1.01] transition-all border-white border-[10px] max-w-[18%] rounded-2xl"><img key={index} className="max-w-[100%]  h-[100%] object-cover shadow-xl cursor-pointer rounded-lg box-content" src={image.src} alt={image.src}
                    onClick={()=>{setOpen(true);setSelectedImage(image.src)}}
                /></div>)}
            </div>
        </div> */}
    <div className="w-screen overflow-x-scroll p-4 scrollbar-hide">
      <div className="flex flex-col gap-4">
        {/* Row 1 */}
        <div className="flex gap-4 flex-nowrap h-64 overflow-x-scroll">
          <Marquee
            speed={50}
            gradient={false}
            pauseOnHover={true}
            direction="left"
            className="flex gap-6 items-center overflow-hidden"
          >
            {images.filter((_: any, index: number) => index % 2 === 0).map(({ src, width, height }: any, index: number) => {
              const aspectRatio = width / height;
              return (
                <div key={index} className="relative h-64 p-2 hover:bg-[#87B9FF] rounded-lg transition-all" style={{ minWidth: `${Math.max(300, aspectRatio * 300)}px` }}>
                  <Image
                    src={src}
                    alt={`Gallery Image ${index + 1}`}
                    width={width}
                    height={height}
                    className="h-full w-full object-cover rounded-lg cursor-pointer drop-shadow-md"
                    onClick={() => { setOpen(true); setSelectedImage(src) }}
                  />
                </div>
              );
            })}
          </Marquee>
        </div>

        {/* Row 2 */}
        <div className="flex gap-4 flex-nowrap h-64 overflow-x-scroll">
          <Marquee
            speed={50}
            gradient={false}
            pauseOnHover={true}
            direction="right"
            className="flex items-center overflow-hidden"
          > 
          {images.filter((_: any, index: number) => index % 2 !== 0).map(({ src, width, height }: any, index: number) => {
            const aspectRatio = width / height;
            return (
              <div key={index} className="relative h-64 p-2 hover:bg-[#87B9FF] rounded-lg transition-all" style={{ minWidth: `${Math.max(300, aspectRatio * 300)}px` }}>
                <Image
                  src={src}
                  alt={`Gallery Image ${index + 1}`}
                  width={width}
                  height={height}
                  className="w-full h-full object-cover rounded-lg cursor-pointer drop-shadow-md"
                  onClick={() => { setOpen(true); setSelectedImage(src) }}
                />
              </div>
              );
            })}
          </Marquee>
        </div>
      </div>
    </div>

    {open &&
      <div className="bg-[rgba(0,0,0,0.8)] transition-all w-full h-[100vh] fixed top-0 left-0 flex justify-center items-center z-[10000] " onClick={() => setOpen(false)}>
        <div className="w-[100%] md:w-auto h-auto lg:h-[80vh] rounded-xl border-white lg:border-[10px] border-[10px] mx-4">
          <HiX size={"50px"} color="#fff" className="absolute lg:top-10 lg:right-10 top-10 right-[10px] cursor-pointer" />
          <img src={selectedImage} className="rounded-xl lg:h-full" />
        </div>
      </div>
    }
  </div>
}