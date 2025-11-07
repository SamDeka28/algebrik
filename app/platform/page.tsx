import AICoreSection from "@/components/platform_page/AICoreSection";
import HeroSection from "@/components/platform_page/HeroSection";
import LendingExperience from "@/components/platform_page/LendingExp";
import LoanLifecycle from "@/components/platform_page/LoanLifecycle";
import ModernLender from "@/components/platform_page/ModernLender";
import OperatingSystemSection from "@/components/platform_page/OperatingSystemSection";
import FiveModulesSection from "@/components/platform_page/FiveModulesSection";
import FragmentedToFluidSection from "@/components/platform_page/FragmentedToFluidSection";
import BeforeAfterSection from "@/components/platform_page/BeforeAfterSection";
import TrustedPartnersSection from "@/components/platform_page/TrustedPartnersSection";
import HowItWorksSection from "@/components/platform_page/HowItWorksSection";
import AgenticAISection from "@/components/platform_page/AgenticAISection";
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
            <OperatingSystemSection />
            <FiveModulesSection />
            <FragmentedToFluidSection />
            <BeforeAfterSection />
            <TrustedPartnersSection />
            <HowItWorksSection />
            <AgenticAISection />
            {/* <ModernLender />
            <LoanLifecycle />
            <AICoreSection />*/}
            <LendingExperience /> 
        </main>
        </>
    )
}