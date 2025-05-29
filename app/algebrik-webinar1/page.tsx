
import { Metadata } from "next";
import SecureYourSpot from "@/components/secure-your-spot";



export const metadata :Metadata={
  title:"Algebrik Resource Center: Insights and Updates on AI in Lending",
  description:"Stay informed with the latest articles, case studies, and news on AI-driven lending solutions, and discover how Algebrik is leading the industry transformation"
}

export default function Home() {
  return (
    <SecureYourSpot/>
  );
}
