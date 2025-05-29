import ReadyToGo from "@/components/about_page/ReadyToGo";
import BlogCarousel from "@/components/resource_center_page/BlogCarousel";
import Hero from "@/components/resource_center_page/Hero";
import Placeholder from "@/components/resource_center_page/Placeholder";
import { Metadata } from "next";



export const metadata :Metadata={
  title:"Algebrik Resource Center: Insights and Updates on AI in Lending",
  description:"Stay informed with the latest articles, case studies, and news on AI-driven lending solutions, and discover how Algebrik is leading the industry transformation"
}

export default function Home() {
  return (
    <>
      <main className="overflow-x-hidden">
        <Hero/>
        <Placeholder />
        <BlogCarousel />
        <ReadyToGo />
      </main>
    </>
  );
}
