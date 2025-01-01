import HeroSection from "@/components/about_page/Hero_Section";
import MissionSection from "@/components/about_page/Mission";
import News from "@/components/about_page/news";
import OurStory from "@/components/about_page/OurStory";
import OurTeam from "@/components/about_page/OurTeam";
import ReadyToGo from "@/components/about_page/ReadyToGo";
import WhatWeStriveFor from "@/components/about_page/WhatWeStriveFor";




export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <MissionSection />
        <WhatWeStriveFor />
        <OurStory/>
        <OurTeam/>
        <News />
        <ReadyToGo />
      </main>
    </>
  );
}
