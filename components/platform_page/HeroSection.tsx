import Image from "next/image";
import BookADemo from "../BookADemo";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import hero from "@/public/section_images/platform.png";

export default function HeroSection() {
  return (
    <div className=" w-full h-max">
      <div
        className="w-full h-[758px] flex items-center justify-center overflow-hidden relative"
        style={{
          backgroundImage: "url('/background_images/platform_hero.png')",
          backgroundSize: '100%',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundPositionY: 'bottom',
        }}
        
      >
        <div className="absolute top-48 mx-auto flex flex-col items-center justify-start gap-[40px]">
          <div className="flex flex-col gap-[20px]">
            <CustomHeader
              text="Lending just got easier"
              className="text-[56px] text-white text-center"
            />
            <CustomSubtitle
              text="Experience the future of lending: a fully automated, AI-First platform that simplifies workflows, improves decision accuracy, and creates personalized borrower journeys at scale"
              className="text-[18px] text-gray-300 font-plus-jakarta font-normal text-center px-[293px]"
            />
          </div>
          <BookADemo />
        </div>
      </div>

      <div className="relative -mt-[250px] flex justify-center">
        <div className="cursor-pointer">
          <div className="relative">
            <Image
              src={hero}
              width={865}
              height={555}
              quality={100}
              className="rounded-[32px] object-fill"
              objectFit="fill"
              alt="algebrik platform hero image"
            />
            {/* <div className="absolute inset-0 flex flex-col justify-center items-center gap-6">
              <span className="text-white text-[32px] font-bold px-4 py-2 bg-opacity-60 rounded-full shadow-md">
                See Algebrik in Action
              </span>
              <button className="rounded-[31px] bg-gradient-to-tr from-blue-400 to-blue-800 hover:bg-blue-600 text-white px-6 py-3">
                Watch Tour
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
