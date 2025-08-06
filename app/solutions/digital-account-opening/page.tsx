"use client";

import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import LenderCockpitHero from "@/components/digital-account-opening/Hero";
import { useRouter } from "next/navigation";
import Contact from "@/components/contacts";
import Marquee from "react-fast-marquee";

const beforeAfterData = [
    {
        type: "before",
        title: "Before Algebrik",
        titleClass: "mb-3 bg-[#E4E8ED] rounded-[40px] text-center text-[#292929] text-[20px] font-bold px-4 py-2",
        cardClass: "bg-white rounded-2xl shadow-2xl p-6 pb-10 flex-1 min-w-[260px] hover:scale-105 transition-all ease-in",
        textClass: "text-gray-600 space-y-2 text-left",
        icon: null,
        items: [
            "Static forms with poor mobile experience",
            "Drop-offs before essential info is collected",
            "Manual task management slows approvals",
            "Teams operate in silos"
        ]
    },
    {
        type: "after",
        title: "After Algebrik",
        titleClass: "flex justify-center items-center gap-1 mb-3 bg-[#5A94E7] rounded-[40px] text-center text-[#FDFEFE] text-[20px] font-bold px-4 py-2",
        cardClass: "bg-gradient-to-br from-[#043071] to-[#7EB2FF] rounded-2xl shadow-2xl p-6 pb-10 flex-1 min-w-[260px] text-white border-[5px] border-[#5A94E7]  hover:scale-105 transition-all ease-in",
        textClass: "space-y-2 text-left",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0013 18.3334C14.5846 18.3334 18.3346 14.5834 18.3346 10C18.3346 5.41669 14.5846 1.66669 10.0013 1.66669C5.41797 1.66669 1.66797 5.41669 1.66797 10C1.66797 14.5834 5.41797 18.3334 10.0013 18.3334Z" fill="white" />
                <path d="M6.45703 10L8.81536 12.3583L13.5404 7.64166" stroke="#5A94E7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        items: [
            "Adaptive forms optimized for mobile, web & in-branch",
            "Auto-save, resume later, and progressive data capture",
            "Omnichannel sync with core LOS in real-time",
            "Visibility into drop-offs and incomplete"
        ]
    }
];

const featureCards = [
    {
        icon: "/icons/lst.svg",
        title: "Application Kickstart",
        description: "Borrowers can begin applications via web, app, call center, or even embedded links"
    },
    {
        icon: "/icons/ai.svg",
        title: "Mobile-First Experience",
        description: "Responsive, guided forms with smart defaults and dynamic field rules"
    },
    {
        icon: "/icons/sta.svg",
        title: "Auto Save & Resume",
        description: "Incomplete applications are saved across devices and re-engaged via SMS/email"
    },
    {
        icon: "/icons/ubv.svg",
        title: "Omnichannel Sync",
        description: "Seamless transition between channels—start online, complete in-branch"
    },
    {
        icon: "/icons/wpt.svg",
        title: "Real-Time Validation",
        description: "Verify KYC, identity, income, and credit score inline"
    },
    {
        icon: "/icons/wpt.svg",
        title: "Guided Journeys",
        description: "Dynamic flows based on borrower profile, loan type, and prior data"
    }
];

const flowsData = [
    {
        icon: "/icons/appintake.svg",
        title: "Application Intake"
    },
    {
        icon: "/icons/arr.svg",
    },
    {
        icon: "/icons/ec.svg",
        title: "Eligibility Check"
    },
    {
        icon: "/icons/arr.svg"
    },
    {
        icon: "/icons/creditreview.svg",
        title: "Credit Review"
    },
    {
        icon: "/icons/arr.svg",
    },
    {
        icon: "/icons/bfu.svg",
        title: "Borrower Follow-Up"
    },
    {
        icon: "/icons/arr.svg",
    },
    {
        icon: "/icons/fa.svg",
        title: "Final Approval"
    }
];

const scaleData = [
    {
        icon: "/icons/bcs1.svg",
        title: "Rule and pricing changes deployed in under 60 seconds by business users"
    },
    {
        icon: "/icons/bcs2.svg",
        title: "Thousands of pricing variations executed without slowing down performance"
    },
    {
        icon: "/icons/bcs3.svg",
        title: "Every decision logged with full traceability in under 200 milliseconds"
    }
];

const lendingTimeline = [
    {
        time: "9:00 AM",
        title: "Start the Day with a Smart Queue",
        details: [
            "Loan officer logs in to a priority-sorted task list with recommended next steps",
            "Sees flagged applications that need immediate attention or documents"
        ],
        variant: "primary",
        flex: 1
    },
    {
        time: "11:30 AM",
        title: "Collaborate with Credit Analyst",
        details: [
            "Shares file directly from the Cockpit with contextual notes",
            "Real-time status tracking ensures no back-and-forth emails"
        ],
        variant: "secondary",
        flex: 1
    },
    {
        time: "2:00 PM",
        title: "Respond to a Borrower",
        details: [
            "Uses the in-app messaging panel to send a pre-built response",
            "Uploads or requests documents without leaving the screen"
        ],
        variant: "secondary",
        flex: 1
    },
    {
        time: "4:00 PM",
        title: "Review End-of-Day Pipeline",
        details: [
            "Views a dashboard of loans in progress, SLAs met, and tasks completed",
            "Escalates a delayed file with a single click to Lending Ops"
        ],
        variant: "secondary",
        flex: 1
    }
];

const clarityBullets = [
    "Loan officers saved 20+ minutes per file in internal benchmarks",
    "Follow-up rates improved by 35% with automated nudges and AI prioritization",
    "Fewer internal handoffs thanks to real-time file visibility",
    "No more 'who owns this file?' confusion across branches or teams"
];

const resultsData = [
    {
        image: "/icons/rs-2.svg",
        title: "30% increase in application completions through auto-resume & guided flows",
        description: "→ No-code setup, fast customization, zero dev dependencies."
    },
    {
        image: "/icons/sub-60.svg",
        title: "40% faster time to verified application via inline document capture & checks",
        description: "→ Lead forms, CRM inputs, doc collection tools, and application portals—streamlined."
    },
    {
        image: "/icons/sub-60.svg",
        title: "Up to 20% reduction in support queries from simplified, mobile-optimized flows",
        description: "→ Optimized for branch, kiosk, and dealer use cases."
    },
    {
        image: "/icons/rs-4.svg",
        title: "3x higher submission rates from embedded journeys in marketing pages",
        description: "→ Driven by mobile-optimized UX, pre-fill logic, and fewer drop-offs"
    }
];

export default function DecisioningPage() {
    const [activeCard, setActiveCard] = useState(0);
    const [showPoints, setShowPoints] = useState(true);
    const [showContactModal, setShowContactModal] = useState(false);
    const router = useRouter();
    const handleCardHover = (idx: number) => {
        if (activeCard !== idx) {
            setShowPoints(false);
            setActiveCard(idx);
            setTimeout(() => {
                setShowPoints(true);
            }, 500); // Match the transition duration
        }
    };

    return (
        <main className="bg-[#F8FAFF] min-h-screen w-full flex flex-col items-center font-plus-jakarta">
            {/* Hero Section */}
            <LenderCockpitHero />

            {/* Before/After Section */}
            <section className="w-full max-w-6xl px-4 pb-16 pt-16 lg:pt-0 flex flex-col items-center relative">
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
                <CustomHeader text="From Fragmented Forms to Frictionless Flows" className="text-center text-[28px] md:text-[40px] font-bold" />
                {/* <p className="text-gray-600 text-center max-w-4xl mb-10 mt-6">
                    Deliver seamless, personalised member experiences across every channel, while empowering your team with faster decisions and scalable solutions
                </p> */}
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

            {/* Feature Cards Section */}
            <section className="w-full py-16 flex flex-col items-center lg:px-0 px-6">
                <CustomHeader text="Onboard Borrowers. On Any Channel. In Any Context" className="text-center text-[28px] md:text-[40px] font-bold" />
                <p className="text-gray-600 text-center max-w-4xl mt-6">
                    Every Journey Starts with Experience
                </p>
                <div className="w-full overflow-x-auto scrollbar-hide hide-scrollbar px-4">
                    <Marquee
                        className="flex justify-start md:justify-around pb-4 mt-8"
                        direction="left"
                        pauseOnHover
                        loop={0}
                        speed={100}
                        gradient={false}
                    >
                        {featureCards.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                className="flex flex-col bg-white rounded-2xl shadow-md p-6 min-w-[330px] max-w-[380px] gap-2 mx-2"
                                style={{ boxShadow: "0 4px 24px 0 rgba(10,64,108,0.10)" }}
                                whileHover={{
                                    scale: 1.05
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="flex-shrink-0 flex items-center justify-center w-[78px] h-[78px] bg-[#F6F9FB] rounded-2xl mb-2">
                                    <Image src={item.icon} alt={item.title} width={48} height={48} className="w-[48px] h-[48px] object-contain" />
                                </div>
                                <span className="font-bold text-[#292929] text-base mb-1">{item.title}</span>
                                <span className="text-[#606060] text-base leading-snug ">{item.description}</span>
                            </motion.div>
                        ))}
                    </Marquee>
                </div>
            </section>

            {/* Teams Section (Tabs/Pills) */}
            <section className="w-full flex flex-col items-center justify-center py-8 md:pt-10 relative">
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
                <div className="relative z-10 w-full flex justify-center max-w-7xl">
                    <div className="w-full bg-gradient-to-br from-[#1C3B6F] to-[#2563EB] rounded-[36px] shadow-2xl px-8 py-10 flex flex-col items-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-white">Built for Lending Teams in Action</h2>
                        {(() => {
                            const teams: {
                                key: string;
                                label: string;
                                content: {
                                    title?: string;
                                    bullets: string[];
                                    image: string;
                                };
                            }[] = [
                                    {
                                        key: "credit",
                                        label: "Branch & RM Teams",
                                        content: {
                                            // title: "Monitor daily application and approval metrics across branches and products",
                                            bullets: [
                                                "Launch guided applications in branch or remotely",
                                                "Seamlessly hand off apps across channels",
                                                "Track real-time status and completions"
                                            ],
                                            image: "/icons/lo.webp"
                                        }
                                    },
                                    {
                                        key: "product",
                                        label: "Lending Ops",
                                        content: {
                                            bullets: [
                                                "Eliminate duplicate data entry and rework",
                                                "Accelerate KYC and credit validations",
                                                "Monitor drop-offs and journey progress"
                                            ],
                                            image: "/icons/ca.webp"
                                        }
                                    },
                                    {
                                        key: "compliance",
                                        label: "Risk & Compliance",
                                        content: {
                                            bullets: [
                                                "Validate ID, income, credit via APIs",
                                                "Monitor real-time KYC and fraud checks",
                                                "Ensure policy adherence from step one"
                                            ],
                                            image: "/icons/bm.webp"
                                        }
                                    },
                                    {
                                        key: "pricing",
                                        label: "Product Teams",
                                        content: {
                                            // title: "See staff productivity and stage-level drop-offs",
                                            bullets: [
                                                "A/B test onboarding flows and layouts",
                                                "Track funnel metrics by version and channel",
                                                "Optimize journeys for every borrower segment"
                                            ],
                                            image: "/icons/lops.webp"
                                        }
                                    },
                                ];
                            const [selected, setSelected] = useState("credit");
                            const current = teams.find(t => t.key === selected);
                            return (
                                <div className="w-full flex flex-col items-center">
                                    {/* Pills as nav bar at the top of the card */}
                                    <div className="flex flex-row flex-wrap justify-center gap-2 md:gap-4 mb-8 border-[2px] rounded-lg lg:rounded-full border-[#467AC6] p-[6px] bg-[#1F3048]">
                                        {teams.map(team => (
                                            selected === team.key ? (
                                                <div
                                                    key={team.key}
                                                    style={{
                                                        padding: 2,
                                                        borderRadius: '9999px',
                                                        background: 'linear-gradient(180deg, rgba(95, 143, 214, 0) -14.47%, #5F8FD6 100%)',
                                                        display: 'inline-block',
                                                    }}
                                                >
                                                    <button
                                                        onClick={() => setSelected(team.key)}
                                                        className="px-6 py-2 rounded-full transition font-medium text-base focus:outline-none min-w-[170px] text-center text-white shadow"
                                                        style={{
                                                            background: 'radial-gradient(63.84% 195.11% at 50.27% -71.05%, #7EB2FF 0%, #043071 98.49%)',
                                                            border: 'none',
                                                            borderRadius: '9999px',
                                                        }}
                                                    >
                                                        {team.label}
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    key={team.key}
                                                    onClick={() => setSelected(team.key)}
                                                    className="px-6 py-2 rounded-full transition font-medium text-base focus:outline-none min-w-[170px] text-center bg-transparent text-white border-white/40 hover:bg-white/10"
                                                    style={{

                                                    }}
                                                >
                                                    {team.label}
                                                </button>
                                            )
                                        ))}
                                    </div>
                                    {/* Two-column layout: image left, text right */}
                                    <motion.div
                                        key={selected}
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className="flex flex-row flex-wrap gap-8 w-full"
                                    >
                                        {/* Placeholder image with white border */}
                                        <div className="rounded-2xl p-2">
                                            <div className="w-full lg:w-[460px] lg:h-[320px] flex items-center justify-center rounded-xl">
                                                <Image src={current?.content.image as string} alt="Credit" width={460} height={320} className="w-full lg:h-full object-cover rounded-xl" />
                                            </div>
                                        </div>
                                        {/* Content */}
                                        <div className="flex-1 flex flex-col justify-center items-start max-w-xl">
                                            <h3 className="text-white text-2xl font-semibold mb-4">{current?.content.title}</h3>
                                            <ul className="text-[#C7D6F3] text-lg space-y-2">
                                                {current?.content.bullets.map((b, i) => (
                                                    <li key={i} className="flex items-center gap-2">
                                                        <span className="w-2 h-2 bg-white rounded-full inline-block"></span>
                                                        <span>{b}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            </section>

            {/* Core section */}
            <section className="w-full flex flex-col items-center justify-center py-8 md:pt-10 relative">
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
                <div className="relative z-10 w-full flex justify-center max-w-7xl">
                    <div className="w-full bg-white rounded-[36px] shadow-2xl px-8 lg:px-[73px] py-10 flex flex-col items-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-[#2A5FAC]">Connect to Core. Embed. Personalize.</h2>
                        <p className="text-xl text-[#606060] font-plus-jakarta">DAO fits into your stack—not the other way around</p>
                        <div className="flex flex-col lg:flex-row justify-start items-center w-full">
                            <div className="flex-2 flex flex-col gap-[14px] mt-10 lg:mt-0">
                                {[
                                    "Built on same framework as Algebrik LOS",
                                    "Embed in websites, landing pages, apps, emails",
                                    "Connect with CRMs, KYC providers, bureaus (Equifax, TransUnion, etc.)",
                                    "Pre-integrated with Algebrik POS, Decision Engine",
                                    "Role-based dashboards for Branch, Ops, Compliance",
                                    "SOC2-grade access control, end-to-end encryption"
                                ].map(item => <p className="flex gap-2 items-center">
                                    <svg className="min-w-[20px] min-h-[20px]" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.9974 19.2263C14.5807 19.2263 18.3307 15.4763 18.3307 10.893C18.3307 6.30963 14.5807 2.55963 9.9974 2.55963C5.41406 2.55963 1.66406 6.30963 1.66406 10.893C1.66406 15.4763 5.41406 19.2263 9.9974 19.2263Z" stroke="#292929" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M6.46094 10.8929L8.81927 13.2513L13.5443 8.53461" stroke="#292929" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span className="text-[#292929] text-base font-medium">{item}</span>
                                </p>)}
                            </div>
                            <div className="flex-1">
                                <img className="object-cover w-full" src="/core.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Results Section */}
            <section className="w-full max-w-7xl px-4 py-8 lg:py-16 flex flex-col items-center">
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
                <CustomHeader text="Tested. Tuned. Ready to Scale." className="text-center" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-6 mt-8 z-10">
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
                                {/* <span className="text-xs text-gray-500">{item.description}</span> */}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="w-full py-16 mb-24 flex flex-col items-center text-center">
                <CustomHeader text="Lending Growth Starts at Hello" className="text-center text-2xl md:text-[44px] max-w-3xl leading-normal font-bold mb-4" />
                <p className="max-w-5xl mx-auto text-sm lg:text-2xl px-6 lg:px-0 text-[#606060] mt-6">
                    Don’t let your borrowers fall through the cracks. Build onboarding flows that adapt to them
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
                    onClick={() => setShowContactModal(true)}
                >
                    <span className="relative z-10">Talk to a Borrower Experience Expert</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#195BD7] to-[#1C8DEA] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
                </motion.button>
                <Contact open={showContactModal} onClose={() => setShowContactModal(false)} />
            </section>
        </main>
    );
} 