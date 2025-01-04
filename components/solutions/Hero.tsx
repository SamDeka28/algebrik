"use client";

import BookADemo from "../BookADemo";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";

export default function HeroSection() {
  return (
    <div className="w-full h-max">
      <div
        className="w-full h-[758px] flex items-center justify-center overflow-hidden relative"
        style={{
          backgroundImage: "url('/background_images/platform_hero.png')",
          backgroundSize: "100%",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: "bottom",
        }}
      >
        <div className="absolute top-48 mx-auto flex flex-col items-center justify-start gap-[20px]">
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
              className="text-[18px] text-gray-300 font-plus-jakarta font-normal text-center px-[193px] mb-[10px]"
            />
          </div>
          <BookADemo />
        </div>
      </div>

      <div className="relative mb-[425px]  flex justify-center">
        <div>
          <div className="relative -inset-y-40 right-[425px]">
            <div>
              <script async src="https://js.storylane.io/js/v2/storylane.js"></script>
              <div
                className="sl-embed"
                style={{
                  position: "relative",
                  paddingBottom: "calc(66.44% + 25px)",
                  width: "100%",
                  height: "0",
                  transform: "scale(1)",
                }}
              >
                <iframe
                  loading="lazy"
                  className="sl-demo"
                  src="https://app.storylane.io/demo/9gq55pwnefgy?embed=inline"
                  name="sl-embed"
                  allow="fullscreen"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "865px", // Set width to match image
                    height: "555px", // Set height to match image
                    border: "1px solid rgba(63,95,172,0.35)",
                    boxShadow: "0px 0px 18px rgba(26, 19, 72, 0.15)",
                    borderRadius: "10px",
                    boxSizing: "border-box",
                  }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
