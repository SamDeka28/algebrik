type ButtonProps = {
    text: string;
    isActive?: boolean;
    onClick?: () => void;
    // variant?: "primary" | "secondary" | "outline" | "ghost";
    // size?: "small" | "medium" | "large";
    customClass?: string;
  };
  
  const Button = ({
    text,
    isActive,
    onClick,
    // variant = "primary",
    // size = "medium", 
    customClass = "",
  }: ButtonProps) => {
    const baseStyle = `relative rounded-full font-medium transition-all duration-300 ease-in-out overflow-hidden`;
  
    // const variantStyles = {
    //   primary: `hover:bg-blue-700`,
    //   secondary: `hover:bg-gray-300`,
    //   outline: `border border-gray-500 text-gray-500 hover:bg-gray-100`,
    //   ghost: `bg-transparent text-gray-500 hover:bg-gray-200`,
    // };
  
    // const sizeStyles = {
    //   small: `px-4 py-1 text-sm`,
    //   medium: `px-6 py-2 text-base`,
    //   large: `px-8 py-3 text-lg`,
    // };
  
    const activeStyle = isActive
      ? "bg-white text-[#292929] font-semibold"
      : "text-[#474747] font-medium";
  
    return (
      <button
        onClick={onClick}
        className={`${baseStyle} ${activeStyle} ${customClass} h-[100%] flex-1`}
      >
        {/* Slide Animation */}
        <span
          className={`left-0 top-0 w-0 h-full bg-white transition-all duration-300 ease-in-out ${
            isActive ? "" : ""
          }`}
        ></span>
        <span className="z-10 font-plus-jakarta">{text}</span>
      </button>
    );
  };
  
  export default Button;
  