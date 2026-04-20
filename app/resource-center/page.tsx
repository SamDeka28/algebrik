import ReadyToGo from "@/components/about_page/ReadyToGo";
import BlogCarousel from "@/components/resource_center_page/BlogCarousel";
import Hero from "@/components/resource_center_page/Hero";
import Placeholder from "@/components/resource_center_page/Placeholder";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: "Digital Lending Resources & Insights | Algebrik",
  description: "Explore digital lending resources, blogs, and insights for modern lenders.",
  keywords: ["Digital Lending Resources"],
};

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
