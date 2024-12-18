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
};

const Card = ({
  number,
  subtitle,
  title,
  description,
  isLarge,
  customStyles,
  buttonText = "Know More",
  imageSrc,
  imageWidth = 500,
  imageHeight = 300,
}: CardProps) => {
  return (
    <div
      className={`
        px-6 py-8 rounded-[20px] shadow-lg backdrop-blur-lg bg-white/60 border border-[#CAD3E0] flex flex-col justify-end
        ${isLarge ? "md:h-[755px] md:w-[558.16px] h-[501px] w-[369.86px]" : "md:w-[558.16px] md:h-[361.58px] w-[369.86px] h-[326px]"}
        ${customStyles?.container || ""}
      `}
      style={{
        background: "linear-gradient(80deg, rgba(255, 255, 255, 0.7), rgba(230, 245, 255, 0.5))",
      }}
    >
      <div className="mb-4">
        <div className="flex items-baseline gap-4 mb-4">
          <p
            className={`text-[64px] font-bold leading-none font-plus-jakarta text-[#D3E5FF] ${customStyles?.number || ""}`}
            style={{
              WebkitTextStroke: "2px rgb(28, 141, 234, 100%)",
            }}
          >
            {number}
          </p>
          <p
            className={`text-[#2A5FAC] text-[16px] font-semibold uppercase ${customStyles?.subtitle || ""}`}
          >
            {subtitle}
          </p>
        </div>
        <h2 className={`text-[#2A5FAC] text-[20px] font-bold mb-2 ${customStyles?.title || ""}`}>
          {title}
        </h2>
        <p className={`text-[#292929] text-[14px] leading-6 ${customStyles?.description || ""}`}>
          {description}
        </p>
      </div>

      {imageSrc && (
        <div
          className={`mb-4 ${customStyles?.imageContainer || ""}`}
          style={{ maxWidth: "100%", height: "auto", overflow: "hidden" }}
        >
          <Image
            src={imageSrc}
            alt={title}
            className={`object-cover rounded-md ${customStyles?.image || ""}`}
            width={imageWidth}   // Use custom width for the image
            height={imageHeight}  // Use custom height for the image
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      <button
        className={`mt-4 w-[139px] h-[41px] border-2 border-[#2A5FAC] text-[#2A5FAC] text-[14px] font-medium py-2 px-6 rounded-full transition hover:bg-[#2A5FAC] hover:text-white ${customStyles?.button || ""}`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Card;
