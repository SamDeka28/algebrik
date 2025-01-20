import BookADemo from "../BookADemo";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";

export default function HeroSection() {
  return (
    <section
      className="mx-auto pt-[8px] md:pt-20 flex flex-col justify-center items-center md:bg-[url('/background_images/about_hero.png')] bg-[url('/section_images/about_mobile.png')] 
       bg-no-repeat bg-center bg-[bottom_left-30.5rem] md:bg-cover bg-cover -md:bg-[left_top_0rem] rounded-b-[32px] md:rounded-none"
      aria-label="Reshaping Lending, One Experience at a Time"
    >
      <div className="container h-[651px] md:h-[551px] flex flex-col justify-center items-center text-center gap-[20px] mx-auto">
        <CustomHeader
          className="text-[36px] md:text-[48px] px-[27px] md:px-0  text-white leading-[62px] flex flex-col"
          text={
            <>
              <span>Reshaping Lending,</span>
              <span>One Experience at a Time</span>
            </>
          }
        />
        <CustomSubtitle
          className="px-6 md:px-80 text-white text-[18px] font-normal pb-[30px] md:pb-[40px]"
          text="Algebrik's cloud-native, AI-powered platform empowers lenders to simplify lending experiences and delight borrowers"
        />
        <BookADemo />
      </div>
    </section>
  );
}
