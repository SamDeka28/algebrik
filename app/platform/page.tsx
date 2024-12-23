import AICoreSection from "@/components/platform_page/AICoreSection";
import HeroSection from "@/components/platform_page/HeroSection";
import LendingExperience from "@/components/platform_page/LendingExp";
import ModernLender from "@/components/platform_page/ModernLender";


export default function Home(){
    return(
        <>
        <main>
            <HeroSection />
            <ModernLender />
            <AICoreSection />
            <LendingExperience />
        </main>
        </>
    )
}