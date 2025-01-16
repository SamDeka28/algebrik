import AICoreSection from "@/components/platform_page/AICoreSection";
import HeroSection from "@/components/platform_page/HeroSection";
import LendingExperience from "@/components/platform_page/LendingExp";
import LoanLifecycle from "@/components/platform_page/LoanLifecycle";
import ModernLender from "@/components/platform_page/ModernLender";


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