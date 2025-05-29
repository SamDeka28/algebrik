import HeroSection from "@/components/about_page/Hero_Section";
import ImageGallery from "@/components/about_page/ImageGallery";
import MissionSection from "@/components/about_page/Mission";
import News from "@/components/about_page/news";
import OurStory from "@/components/about_page/OurStory";
import OurTeam from "@/components/about_page/OurTeam";
import ReadyToGo from "@/components/about_page/ReadyToGo";
import WhatWeStriveFor from "@/components/about_page/WhatWeStriveFor";
import { Metadata } from "next";

import { getEventImages } from "@/lib/utils";

export const metadata:Metadata={
  title:"About Algebrik: Innovating the Future of Lending Technology",
  description:"Learn how Algebrik is transforming the lending landscape with cutting-edge AI solutions, empowering financial institutions to offer faster and smarter loan services"
}

export default function Home({}) {
  const images = getEventImages(); // Directly fetching images
  console.log({images})
  return (
     <>
      <main className="overflow-x-hidden">
        <HeroSection />
        <MissionSection />
        <WhatWeStriveFor />
        <OurStory/>
        <OurTeam/>
        <News />

        <ImageGallery images={images}/>
        <ReadyToGo /> 
      </main>
    </>
  );
}
