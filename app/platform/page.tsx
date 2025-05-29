import AICoreSection from "@/components/platform_page/AICoreSection";
import HeroSection from "@/components/platform_page/HeroSection";
import LendingExperience from "@/components/platform_page/LendingExp";
import LoanLifecycle from "@/components/platform_page/LoanLifecycle";
import ModernLender from "@/components/platform_page/ModernLender";
import { Metadata } from "next";

export const metadata :Metadata={
    title:"Algebrik Platform: Automating Loan Origination with AI Precision",
    description:"Discover Algebrik's fully automated, AI-first platform that streamlines lending processes, improves accuracy, and personalizes borrower journeys at scale."
}
export default function Home(){
    return(
        <>
        <main className="overflow-x-hidden">
            <HeroSection />
            <ModernLender />
            <LoanLifecycle />
            <AICoreSection />
            <LendingExperience />
        </main>
        </>
    )
}