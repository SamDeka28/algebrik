


import FAQs from "@/components/credit_union/FAQs";
import HeroSection from "@/components/credit_union/Hero";
import FooterCard from "@/components/smb_lenders_page/FooterCard";
import Multiple from "@/components/smb_lenders_page/Multiple";
import SmbRevolutionize from "@/components/smb_lenders_page/SmbRevolutionize";
import SmbRoadBlocks from "@/components/smb_lenders_page/SmbRoadblocks";
import Streamlined from "@/components/smb_lenders_page/Streamlined";
import Unlock from "@/components/smb_lenders_page/Unlock";
import { Metadata } from "next";

export const metadata:Metadata={
  title:"Algebrik for Banks: Enhancing Lending Efficiency with AI",
  description:"Empower your bank with Algebrik's AI-powered loan origination system, streamlining processes, reducing costs, and delivering superior borrower experiences."
}

export default function SMBLenders() {
  return (
    <>
      <main className="overflow-x-hidden">
        <HeroSection />
       <Streamlined />
       <SmbRoadBlocks/>
       <SmbRevolutionize />
       <Multiple />
       <Unlock />
       <FooterCard />
       <FAQs/>
      </main>
    </>
  );
}
