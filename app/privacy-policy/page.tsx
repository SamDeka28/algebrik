import Content from "@/components/privacy-policy/content";
import { Metadata } from "next";



export const metadata :Metadata={
  title: "Algebrik AI Lending Platform | Privacy Policy",
  description: "Learn how Algebrik AI collects, uses, and protects your data across our platform."
}

export default function Home() {
  return (
    <>
      <main className="overflow-x-hidden">
        <Content/>
      </main>
    </>
  );
}
