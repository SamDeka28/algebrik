"use client";

type ButtonProps = {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
  customClass?: string;
  activeStyle?: string; // Add this prop to customize active style
};

const Button = ({
  text,
  isActive,
  onClick,
  customClass = "",
  activeStyle = "", // Default empty string for activeStyle
}: ButtonProps) => {
  const baseStyle = `relative rounded-full font-medium transition-all duration-300 ease-in-out overflow-hidden`;

  // If activeStyle is not passed, use default active styles
  const defaultActiveStyle = isActive
    ? "bg-white text-[#292929] font-semibold"
    : "text-[#474747] font-medium";

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${activeStyle || defaultActiveStyle} ${customClass} h-[100%] flex-1`}
    >
      {/* Slide Animation */}
      <span
        className={`left-0 top-0 w-full h-full bg-white transition-all duration-300 ease-in-out ${
          isActive ? "scale-105" : ""
        }`}
      ></span>
      <span className="z-10 font-plus-jakarta">{text}</span>
    </button>
  );
};

export default Button;
