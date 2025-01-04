"use client";

import Image from "next/image";

type CardProps = {
  number?: string;
  subtitle?: string;
  title?: string;
  description?: string;
  isLarge?: boolean;
  customStyles?: {
    container?: string;
    number?: string;
    subtitle?: string;
    title?: string;
    description?: string;
    button?: string;
    imageContainer?: string;
    image?: string;
    [key: string]: string | undefined;
  };
  buttonText?: string;
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
  responsive?: {
    container?: string; 
    width?: string; 
    height?: string; 
  };
};

const Card = ({
  number,
  subtitle,
  title,
  description,
  isLarge,
  responsive = {},
  customStyles,
  buttonText,
  imageSrc,
  imageWidth = 500,
  imageHeight = 300,
}: CardProps) => {
  return (
    <div
      className={`relative px-6 py-8 rounded-[20px] shadow-[0_16px_52px_0px_rgba(10,64,108,0.1)] backdrop-blur-lg bg-white/60 border border-[#CAD3E0] flex flex-col justify-end
        ${isLarge ? "md:h-[755px] md:w-[558.16px] h-[501px] w-[369.86px]" : "md:w-[558.16px] md:h-[361.58px] w-[369.86px] h-[326px]"}
        ${customStyles?.container || ""} ${responsive?.container || ""}`}
      style={{
        background:
          "linear-gradient(80deg, rgba(255, 255, 255, 0.7), rgba(230, 245, 255, 0.5))",
      }}
    >
      <div className="mb-4">
        <div className="flex items-baseline gap-4 mb-4">
          <p
            className={`text-[72px] font-bold leading-none font-plus-jakarta text-[#D3E5FF] ${customStyles?.number || ""}`}
            style={{
              WebkitTextStroke: "2px rgb(28, 141, 234, 100%)",
            }}
          >
            {number}
          </p>
          <p
            className={`text-[#8BB0EE] text-[16px] font-plus-jakarta font-semibold uppercase ${customStyles?.subtitle || ""}`}
          >
            {subtitle}
          </p>
        </div>
        <h2
          className={`text-[#2A5FAC] text-[24px] font-plus-jakarta font-bold mb-2 ${customStyles?.title || ""}`}
          style={{ marginTop: "16px", marginBottom: "8px" }}
        >
          {title}
        </h2>
        <p
          className={`text-[#292929] text-[16px] font-plus-jakarta leading-6 ${customStyles?.description || ""}`}
          style={{ paddingTop: "8px" }}
        >
          {description}
        </p>
      </div>

      {/* {imageSrc && (
        <div
          className={`relative ${customStyles?.imageContainer || ""}`}
          style={{ maxWidth: "100%", height: "auto", overflow: "hidden" }}
        >
          <Image
            src={imageSrc}
            alt={title || "Card image"}
            className={`object-cover rounded-md transition-all duration-300 ease-in-out
              ${customStyles?.image || ""}`}
            width={imageWidth}
            height={imageHeight}
            style={{
              objectFit: "cover",
              filter: "blur(28px) drop-shadow(0px 36px 36px rgba(0, 0, 0, 0.08))",
              opacity: 0.5,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.filter = "none";
              e.currentTarget.style.opacity = "1";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.filter =
                "blur(28px) drop-shadow(0px 36px 36px rgba(0, 0, 0, 0.08))";
              e.currentTarget.style.opacity = "0.5";
            }}
          />
        </div>
      )} */}

{imageSrc && (
  <div
    className={`absolute top-4 right-4 ${customStyles?.imageContainer || ""}`}
    style={{ width: "auto", height: "auto", overflow: "hidden" }}
  >
    <Image
      src={imageSrc}
      alt={title || "Card image"}
      className={`object-cover rounded-md transition-all duration-300 ease-in-out ${customStyles?.image || ""}`}
      width={imageWidth}
      height={imageHeight}
      style={{
        objectFit: "cover",
        filter: "blur(28px) drop-shadow(0px 36px 36px rgba(0, 0, 0, 0.08))",
        opacity: 0.5,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.filter = "none";
        e.currentTarget.style.opacity = "1";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.filter =
          "blur(28px) drop-shadow(0px 36px 36px rgba(0, 0, 0, 0.08))";
        e.currentTarget.style.opacity = "0.5";
      }}
    />
  </div>
)}


      {buttonText && (
        <button
          className={`mt-4 w-[139px] h-[41px] font-plus-jakarta border-2 border-[#2A5FAC] text-[#2A5FAC] text-[14px] font-medium py-2 px-6 rounded-full transition hover:bg-[#2A5FAC] hover:text-white ${customStyles?.button || ""}`}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default Card;