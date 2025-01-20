import { CustomHeader } from "../CustomHeader";

export default function MissionSection() {
  return (
    <div className="container mx-auto px-[20px] -translate-y-4 -md:translate-y-0 md:p-8 md:w-[1160px] md:my-[45px] flex flex-col md:flex-row gap-[30px] font-plus-jakarta justify-center items-center">
      <div className="flex flex-col justify-start items-start gap-[24px]">
        <CustomHeader text="Our mission." className="text-[28px] md:text-[40px] font-bold" />
        <div className="flex flex-col gap-6 text-[14px] md:text-[16px] text-[#606060] leading-[24px] md:leading-[30px] font-normal">
          <p>
            While advancements in lending technology inspire us, the lending
            journey remains overly complicated. Disconnected systems create
            inefficiencies for lenders and barriers for borrowers.
          </p>
          <p>
            There has to be a better way to lend—this belief led to Algebrik AI.
            What began as a tool to streamline loan origination has grown into a
            mission to help lenders deliver loans digitally when and where they
            are needed most. Our vision is to revolutionize loan origination,
            making it faster, simpler, and more inclusive, while enabling
            lenders to focus on helping people achieve their goals.
          </p>
        </div>
      </div>

      <div className="flex-1 hidden md:flex flex-col items-center sm:hidden md:items-start  gap-6">
        <div className="md:w-[500px] md:h-[286px] flex justify-center"
        style={{
          backgroundImage: "url('/section_images/mission_text.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // borderRadius: "20px",
          overflow: "hidden",
          // boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.2)",
        }}
        >
        <CustomHeader className="text-[36px] gap-0 leading-snug"
          text={
            <>
              <span className="text-[36px] text-black block">Transforming</span>
              <span className="text-[36px] text-black block">lending with</span>
              <span className="text-[36px] block">
                simplicity, accessibility,
              </span>
              <span className="text-[36px] block">
                and seamless borrower 
              </span>
              <span className="text-[36px] block">
                experiences
              </span>
            </>
          }
          />
          </div>
      </div>
    </div>
  );
}
