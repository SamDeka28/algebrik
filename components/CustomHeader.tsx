type HeaderProps = {
  text: React.ReactNode;
    className?: string;
  };
  
  type SubtitleProps = {
    text: string;
    className?: string;
  };
  
  export const CustomHeader = ({ text, className }: HeaderProps) => {
    return (
      <h1
        className={`text-[40px] font-plus-jakarta font-bold text-[#2A5FAC] tracking-tight ${
          className || ""
        }`}
      >
        {text}
      </h1>
    );
  };
  
  export const CustomSubtitle = ({ text, className }: SubtitleProps) => {
    return (
      <div
        className={`text-[20px] font-normal font-plus-jakarta text-[#606060] leading-[30px] ${
          className || ""
        }`}
      >
        {text}
      </div>
    );
  };
  