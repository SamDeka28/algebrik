import Image from "next/image";
import BookADemo from "../BookADemo";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import hero from "@/public/section_images/sol_hero.png";

export default function HeroSection() {
  return (
    <div className=" w-full h-max">
      <div
        className="w-full h-[758px] flex items-center justify-center overflow-hidden relative"
        style={{
          backgroundImage: "url('/background_images/platform_hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-48 mx-auto flex flex-col items-center justify-start gap-[40px]">
          <div className="flex flex-col gap-[20px]">
            <CustomHeader
              
                    text={
                        <>
                          <span>Simplify Lending.</span>
                          <span>Delight Members. Drive Growth.</span>
                        </>
                      }
              className="text-[56px] text-white text-center flex flex-col"
            />
            <CustomSubtitle
              text="Empower your credit union to reduce approval times, boost member satisfaction, and lower operational costs—all with Algebrik AI’s cloud-native, AI-powered solutions tailored to your needs."
              className="text-[18px] text-gray-300 font-plus-jakarta font-normal text-center px-[193px] mb-[20px]"
            />
          </div>
          <BookADemo />
        </div>
      </div>

      <div className="relative -mt-[150px] flex justify-center">
        <div className="  backdrop-blur-sm rounded-[32px] m-0 p-0 shadow-lg overflow-hidden">
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
           
          </div>
        </div>
      </div>
    </div>
  );
}
