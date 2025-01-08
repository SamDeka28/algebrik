import BookADemo from "../BookADemo";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";

export default function HeroSection() {
  return (
    <section
      className="mx-auto md:pt-20 flex flex-col justify-center items-center"
      aria-label="Hero Section: Build the Lending Experience of Tomorrow"
      style={{
        backgroundImage: "url('/background_images/about_hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#000000",
      }}
    >
      <div className="container h-[551px] flex flex-col justify-center items-center text-center gap-[20px] mx-auto">
        <CustomHeader
          className="text-[36px] md:text-[48px] text-white leading-[62px] flex flex-col"
          text={
            <>
              <span>Reshaping Lending,</span>
              <span>One Experience at a Time</span>
            </>
          }
        />
        <CustomSubtitle
          className="px-6 md:px-80 text-white text-[18px] font-normal pb-[40px]"
          text="Algebrik's cloud-native, AI-powered platform empowers lenders to simplify lending experiences and delight borrowers"
        />
        <BookADemo />
      </div>
    </section>
  );
}
