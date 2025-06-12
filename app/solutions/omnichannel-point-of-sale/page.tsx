"use client";

import { CustomHeader } from "@/components/CustomHeader";
import HeroSection from "@/components/omnichannel/Hero";
import Image from "next/image";
import Link from "next/link";
import borrowerData from "@/components/constant/constant";
import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Contact from "@/components/contacts";
const beforeAfterData = [
    {
        type: "before",
        title: "Before Algebrik",
        titleClass: "mb-3 bg-[#E4E8ED] rounded-[40px] text-center text-[#292929] text-[20px] font-bold px-4 py-2",
        cardClass: "bg-white rounded-2xl shadow-2xl p-6 pb-20 flex-1 min-w-[260px]",
        textClass: "text-gray-600 space-y-2 text-left",
        icon: null,
        items: [
            "Borrowers start online, finish on paper",
            "Branch, dealer, and mobile apps don't talk to each other",
            "Member repeats experience or can't finish",
            "Staff juggling multiple tools & rekeying data"
        ]
    },
    {
        type: "after",
        title: "After Algebrik",
        titleClass: "flex justify-center items-center gap-1 mb-3 bg-[#5A94E7] rounded-[40px] text-center text-[#FDFEFE] text-[20px] font-bold px-4 py-2",
        cardClass: "bg-gradient-to-br from-[#043071] to-[#7EB2FF] rounded-2xl shadow-2xl p-6 pb-20 flex-1 min-w-[260px] text-white border-[5px] border-[#5A94E7]",
        textClass: "space-y-2 text-left",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0013 18.3334C14.5846 18.3334 18.3346 14.5834 18.3346 10C18.3346 5.41669 14.5846 1.66669 10.0013 1.66669C5.41797 1.66669 1.66797 5.41669 1.66797 10C1.66797 14.5834 5.41797 18.3334 10.0013 18.3334Z" fill="white" />
                <path d="M6.45703 10L8.81536 12.3583L13.5404 7.64166" stroke="#5A94E7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        items: [
            "Single, start-to-finish digital journey",
            "Unified experience across all channels",
            "Pre-filled, contextual experiences for borrowers",
            "Embedded analytics for conversion optimization"
        ]
    }
];

const borrowerExperienceData = [
    {
        icon: "/icons/mobile.svg",
        title: "Mobile",
        description: "In-app lending built for Gen Z attention spans"
    },
    {
        icon: "/icons/branch.webp",
        title: "Branch",
        description: "Staff-assisted flows with pre-fill and ID capture"
    },
    {
        icon: "/icons/dealer.svg",
        title: "Dealer",
        description: "Secure partner portals for indirect auto lending"
    },
    {
        icon: "/icons/web.svg",
        title: "Web",
        description: "Embedded application widgets on your site"
    }
];

const posFlowsData = [
    {
        icon: "/icons/pos-1.svg",
        title: "Configure flows per channel (no-code)",
        description: "No-code admin, fast customization, ready-on day one"
    },
    {
        icon: "/icons/pos-2.svg",
        title: "Auto-map form fields, pre-fill data",
        description: "From partner onboarding to mobile lending widget in under 30 days"
    },
    {
        icon: "/icons/pos-3.svg",
        title: "Built-in document & ID capture",
        description: "Lead forms, CRM inputs, doc collection tools, and application portals—streamlined"
    },
    {
        icon: "/icons/pos-4.svg",
        title: "White-labeled templates for fast deployment",
        description: "Great news: Jack! You're pre-approved"
    }
];

const resultsData = [
    {
        image: "/icons/rs-1.svg",
        title: "Simulated 50+ dealer journeys across partner, in-branch, and mobile environments",
        description: "→ No-code setup, fast customization, zero dev dependencies."
    },
    {
        image: "/icons/rs-2.svg",
        title: "30% increase in borrower application completion",
        description: "→ Lead forms, CRM inputs, doc collection tools, and application portals—streamlined."
    },
    {
        image: "/icons/sub-60.svg",
        title: "Sub-60 second application kickoff in guided, staff-assisted flows",
        description: "→ Optimized for branch, kiosk, and dealer use cases."
    },
    {
        image: "/icons/rs-4.svg",
        title: "30% increase in borrower application completion",
        description: "→ Driven by mobile-optimized UX, pre-fill logic, and fewer drop-offs"
    }
];

export default function OmnichannelPOSPage() {
    const [cardSets, setCardSets] = useState(2); // Start with 2 sets
    const controls = useAnimation();
    const trackRef = useRef<HTMLDivElement>(null);
    const setWidthRef = useRef(0);
    const [setWidth, setSetWidth] = useState(0);
    const router = useRouter();
    const [showContactModal, setShowContactModal] = useState(false);
    // Function to measure width of one set
    const measureSetWidth = () => {
        const track = trackRef.current;
        if (!track) return 0;
        const children = Array.from(track.children);
        const setLength = borrowerExperienceData.length;
        let width = 0;
        for (let i = 0; i < setLength; i++) {
            const el = children[i] as HTMLElement;
            const style = getComputedStyle(el);
            width += el.offsetWidth + parseFloat(style.marginRight || "0");
        }
        return width;
    };

    // Start or update animation
    const startAnimation = (width: number, sets: number) => {
        if (width > 0) {
            controls.start({
                x: [0, -width * (sets - 1)],
                transition: {
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 20 * sets, // proportional to number of sets
                        ease: "linear",
                    },
                },
            });
        }
    };

    // Measure and animate on mount and resize
    useEffect(() => {
        function handleResize() {
            const width = measureSetWidth();
            setSetWidth(width);
            setWidthRef.current = width;
            startAnimation(width, cardSets);
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
        // eslint-disable-next-line
    }, [cardSets]);

    // Append a new set when the first card of the last set is visible at the left
    useEffect(() => {
        if (!setWidth) return;
        let animationFrame: number;
        function checkAndAppend() {
            const track = trackRef.current;
            if (!track) return;
            // Get the first card of the last set
            const children = Array.from(track.children);
            const setLength = borrowerExperienceData.length;
            const firstOfLastSet = children[setLength * (cardSets - 1)] as HTMLElement;
            if (firstOfLastSet) {
                const rect = firstOfLastSet.getBoundingClientRect();
                const parentRect = track.parentElement?.getBoundingClientRect();
                if (parentRect && rect.left <= parentRect.left + 1) {
                    setCardSets(s => s + 1);
                }
            }
            animationFrame = requestAnimationFrame(checkAndAppend);
        }
        animationFrame = requestAnimationFrame(checkAndAppend);
        return () => cancelAnimationFrame(animationFrame);
    }, [setWidth, cardSets]);

    return (
        <main className="bg-[#F8FAFF] min-h-screen w-full flex flex-col items-center font-plus-jakarta">
            {/* Hero Section */}
            <HeroSection />

            {/* Fragmented Lending Section */}
            <section className="w-full max-w-6xl px-4 py-16 flex flex-col items-center relative">
                <div className="container relative opacity-[30%] z-0">
                    <motion.div
                        className="absolute top-20 md:left-[296px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full md:w-[861.73px] md:h-[239.68px] blur-[100px]"
                        animate={{
                            y: [50, 30, 50],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="absolute top-20 md:left-[20px] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full md:w-[796.91px] md:h-[280.03px] blur-[100px] -z-10"
                        animate={{
                            y: [50, 30, 60],
                        }}
                        transition={{
                            duration: 2,
                            delay: 0.2,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="absolute top-56 bg-[#BE95FF] rounded-full md:w-[1226.24px] md:h-[239.68px] blur-[100px] z-[-1]"
                        animate={{
                            y: [10, 90, 0],
                        }}
                        transition={{
                            duration: 2,
                            delay: 0.4,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                        }}
                    />
                </div>

                <CustomHeader text="Fragmented lending journeys break trust.Algebrik fixes the flow." className="z-10 text-center max-w-3xl text-[28px] md:text-[40px] font-bold" />
                <p className="text-gray-600 text-center max-w-2xl mb-10 mt-6 z-10">
                    Deliver seamless, personalized member experiences across every channel, while empowering your team with faster decisions and scalable solutions.
                </p>
                <div className="flex flex-col md:flex-row gap-6 w-full justify-center z-10">
                    {beforeAfterData.map((card, idx) => (
                        <div key={card.type} className={card.cardClass}>
                            <h3 className={card.titleClass}>
                                {card.icon && <span className="mr-1">{card.icon}</span>}
                                {card.title}
                            </h3>
                            <ul className={card.textClass} style={{ marginTop: "20px" }}>
                                {card.items.map((item, i) => (
                                    <li key={i} className="flex items-center gap-2">{card.type === "before" ? (
                                        <Image src="/icons/info-circle.svg" alt="Tick" width={20} height={20} />
                                    ) : (
                                        <Image src="/icons/tick-circle.svg" alt="Info" width={20} height={20} />
                                    )} {item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Borrower Experience Section */}
            <section className="w-full px-4 py-[20] md:py-16 flex flex-col items-center">
                <CustomHeader text="Launch a borrower experience that fits wherever lending happens." className="text-center max-w-3xl text-[28px] md:text-[40px] font-bold" />
                <div className="w-full overflow-x-hidden">
                    <motion.div
                        ref={trackRef}
                        className="flex flex-nowrap gap-4 md:gap-8 justify-start md:justify-center pb-4 mt-8"
                        animate={controls}
                    >
                        {Array(cardSets).fill(0).flatMap((_, setIdx) =>
                            borrowerExperienceData.map((item, idx) => (
                                <div
                                    key={item.title + setIdx + idx}
                                    className="flex flex-col lg:flex-row lg:items-center bg-white rounded-[32px] p-4 min-w-[400px] max-w-[400px] gap-6"
                                    style={{ boxShadow: "0 4px 24px 0 rgba(10,64,108,0.10)" }}
                                >
                                    <div className="flex-shrink-0 flex items-center justify-center w-[78px] h-[78px] bg-[#F6F9FB] rounded-2xl">
                                        <Image src={item.icon} alt={item.title} width={78} height={78} className="w-[78px] h-[78px] object-contain" />
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <span className="font-bold text-[#2A5FAC] text-lg md:text-xl mb-1">{item.title}</span>
                                        <span className="text-[#606060] text-base md:text-lg leading-snug">{item.description}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </motion.div>
                </div>
                {/* <p className="text-gray-600 text-center max-w-2xl mt-8 font-extrabold">Borrowers can start, pause, and resume—anywhere.</p> */}
            </section>

            {/* Analytics Section */}
            <section className="w-full max-w-7xl lg:px-4 lg:py-16 px-0 py-8 flex flex-col items-center">
                <div className="bg-gradient-to-br from-[#043071] to-[#7EB2FF] lg:rounded-3xl shadow-xl p-10 lg:pr-0 w-full flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Track conversion, drop-offs, and channel health in one view</h2>
                        <ul className="text-white/90 space-y-2 mb-4">
                            <li>• Real-time funnel dashboards</li>
                            <li>• Channel performance breakdown</li>
                            <li>• Device-level heatmaps</li>
                            <li>• Embedded analytics for A/B testing</li>
                        </ul>
                    </div>
                    <div className="flex-1 flex justify-center lg:justify-end">
                        <div className="rounded-2xl w-full lg:w-[486px] lg:h-[296px] flex items-center justify-center lg:justify-end">
                            <Image src="/icons/conversion.webp" alt="Analytics" width={486} height={296} className="hidden lg:block" />
                            <Image src="/icons/cv2.webp" alt="Analytics" width={320} height={180} className="block lg:hidden" />
                        </div>
                    </div>
                </div>
            </section>

            {/* POS Flows Section */}
            <section className="w-full px-4 py-8 lg:py-16 flex flex-col items-center">
                <CustomHeader text="POS Flows that Don't Take a Quarter to Go Live" className="text-center" />
                <div className="w-full flex flex-nowrap md:flex-wrap gap-4 md:gap-8 justify-start md:justify-center py-8 overflow-x-auto scrollbar-hide hide-scrollbar">
                    {posFlowsData.map((item, idx) => (
                        <motion.div 
                            key={item.title} 
                            className="bg-white w-[300px] min-w-[300px] rounded-2xl shadow-md p-4 flex flex-col items-center"
                            style={{ boxShadow: "0 4px 24px 0 rgba(10,64,108,0.10)" }}
                            whileHover={{ 
                                scale: 1.05
                            }}
                            transition={{ 
                                duration: 0.3,
                                ease: "easeInOut"
                            }}
                        >
                            <Image src={item.icon} alt={item.title} width={120} height={120} className="mb-3 w-full aspect-square object-cover border border-[#BEBEBE5C] rounded-2xl" />
                            <span className="text-base font-medium text-[#292929]">{item.title}</span>
                        </motion.div>
                    ))}
                </div>
                <p className="text-base lg:text-[20px]  text-[#2A5FAC] font-bold  mt-8 text-center lg:text-left">From partner onboarding to mobile lending widget in under 30 days.</p>
            </section>

            {/* Results Section */}
            <section className="w-full max-w-7xl px-4 py-8 lg:py-16 flex flex-col items-center">
                <CustomHeader text="Tested. Tuned. Ready to Scale." className="text-center" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-6 mt-8">
                    {resultsData.map((item, idx) => (
                        <motion.div 
                            key={item.title + idx} 
                            className="bg-white rounded-2xl shadow-xl p-6 flex flex-col lg:flex-row lg:items-center gap-6"
                            style={{ boxShadow: "0 4px 24px 0 rgba(10,64,108,0.10)" }}
                            whileHover={{ 
                                scale: 1.05
                            }}
                            transition={{ 
                                duration: 0.3,
                                ease: "easeInOut"
                            }}
                        >
                            <div className="flex-shrink-0 w-[64px] h-[64px] md:w-[80px] md:h-[80px] flex items-center justify-center rounded-2xl">
                                <Image src={item.image} alt={item.title} width={64} height={64} className="object-contain w-[48px] h-[48px] md:w-[64px] md:h-[64px]" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="font-bold text-lg mb-2 text-[#2A5FAC]">{item.title}</span>
                                <span className="text-xs text-gray-500">{item.description}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="w-full py-16 flex flex-col items-center text-center">
                <CustomHeader text="Lending happens everywhere." className="text-center text-2xl md:text-3xl font-bold mb-4" />
                <CustomHeader text="Make sure you're there for it." className="text-center text-2xl md:text-3xl font-bold mb-4" />

                <p className="max-w-5xl mx-auto text-sm lg:text-2xl px-6 lg:px-0 text-[#606060] mt-6">
                    From mobile apps to dealer desks, Algebrik's POS Lending helps you show up where your borrowers need you most—seamlessly, instantly, intelligently.
                </p>
                <motion.button
                    className="relative bg-gradient-to-tr from-[#1C8DEA] to-[#195BD7] text-white py-[14px] px-6 font-bold rounded-[31px] overflow-hidden group mt-8 lg:mt-16"
                    whileHover={{
                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeInOut"
                    }}
                    onClick={() => {
                        setShowContactModal(true);
                    }}
                >
                    <span className="relative z-10">Plan Your POS Rollout With Us</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#195BD7] to-[#1C8DEA] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
                </motion.button>
                <Contact open={showContactModal} onClose={() => setShowContactModal(false)} />
            </section>
        </main>
    );
} 