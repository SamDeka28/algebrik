"use client";

import Link from "next/link";

type ButtonProps = {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
  customClass?: string;
  disabled?:boolean;
  activeStyle?: string; 
  link?: string;
};

const Button = ({
  text,
  isActive,
  onClick,
  disabled=false,

  customClass = "",
  activeStyle = "",
  link = "",
}: ButtonProps) => {
  const baseStyle = `relative rounded-full font-medium transition-all duration-300 ease-in-out overflow-hidden`;

  const defaultActiveStyle = isActive
    ? "bg-white text-[#292929] font-semibold"
    : "text-[#474747] font-medium";

  const content = (
    <>
      {/* Slide Animation */}
      <span
        className={`left-0 top-0 w-full h-full bg-white transition-all duration-300 ease-in-out ${
          isActive ? "scale-105" : ""
        }`}
      ></span>
      <span className="z-10 font-plus-jakarta">{text}</span>
    </>
  );

  if (link) {
    return (
      <Link
        href={link}
        className={`${baseStyle} ${activeStyle || defaultActiveStyle} ${customClass} h-[100%] flex-1`} target="_blank"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${activeStyle || defaultActiveStyle} ${customClass} h-[100%] flex-1`}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;
