"use client";

import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import DashboardAnalyticsHero from "@/components/dashboard-analytics/Hero";
import LenderCockpitHero from "@/components/lender-cockpit/Hero";
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
            "Juggling between CRM, core, email, and spreadsheets",
            "No visibility into borrower status or stage",
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
            "One interface for the full lending lifecycle pre-disbursement",
            "Live loan status, app progress, and next steps at a glance",
            "Smart workflows prioritize and automate officer actions",
            "Shared visibility across credit, lending, and branch teams"
        ]
    }
];

const featureCards = [
    {
        icon: "/icons/lst.svg",
        title: "Loan Status Tracking",
        description: "See every loan's real-time progress-by stage, borrower, or team"
    },
    {
        icon: "/icons/ai.svg",
        title: "AI-Powered Recommendations",
        description: "Next-best actions auto-suggested for stalled files or missing docs"
    },
    {
        icon: "/icons/sta.svg",
        title: "Smart Task Automation",
        description: "Auto-assign follow-ups, pre-fill documents, and trigger compliance checks"
    },
    {
        icon: "/icons/ubv.svg",
        title: "Unified Borrower View",
        description: "Centralized borrower timeline with all activities, uploads, and communications"
    },
    {
        icon: "/icons/wpt.svg",
        title: "Workload Planning for Teams",
        description: "See who's overloaded, what's delayed, and where files are stuck"
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
                <CustomHeader text="From Fragmented Screens to Full Control" className="text-center text-[28px] md:text-[40px] font-bold" />
                <p className="text-gray-600 text-center max-w-4xl mb-10 mt-6">
                    Deliver seamless, personalised member experiences across every channel, while empowering your team with faster decisions and scalable solutions
                </p>
                <div className="flex flex-col md:flex-row gap-6 w-full justify-center z-10 mt-6">
                    {beforeAfterData.map((card, idx) => (
                        <div key={card.type} className={card.cardClass}>
                            <h3 className={card.titleClass}>
                                {card.icon && <span className="mr-1">{card.icon}</span>}
                                {card.title}
                            </h3>
                            <ul className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-3`} style={{ marginTop: "20px" }}>
                                {card.items.map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-left">
                                        {card.type === "before" ? (
                                            <Image src="/icons/info-circle.svg" alt="Info" width={20} height={20} className="mt-0.5 flex-shrink-0 h-full min-w-10" />
                                    ) : (
                                            <Image src="/icons/tick-circle.svg" alt="Check" width={20} height={20} className="mt-0.5 flex-shrink-0 h-full min-w-10" />
                                        )}
                                        <span className={`text-sm md:text-base font-plus-jakarta !font-normal leading-relaxed ${card.type === "after" ? "text-white" : "text-gray-600"}`}>
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Feature Cards Section */}
            <section className="w-full py-16 flex flex-col items-center lg:px-0 px-6">
                <CustomHeader text="What Makes the Cockpit Work for Loan Teams" className="text-center text-[28px] md:text-[40px] font-bold" />
                <p className="text-gray-600 text-center max-w-4xl mt-6">
                    Every Task. Every Stage. Every Borrower—Right Where You Need Them.
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
                    <div className="w-full  bg-gradient-to-br from-[#1C3B6F] to-[#2563EB]  rounded-[36px] shadow-2xl px-8 py-10 flex flex-col items-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-white">Built for the Teams Who Own Lending</h2>
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
                                    label: "Loan Officers",
                                    content: {
                                        // title: "Monitor daily application and approval metrics across branches and products",
                                        bullets: [
                                            "View assigned applications with status and priority",
                                            "Take next-step actions (e.g. request docs, escalate)",
                                            "Communicate with borrowers in-platform"
                                        ],
                                        image: "/icons/lo.webp"
                                    }
                                },
                                {
                                    key: "product",
                                    label: "Credit Analysts ",
                                    content: {
                                        bullets: [
                                            "Review flagged files and add approval conditions",
                                            "Collaborate with officers via internal notes and tagging",
                                            "Track files by risk category or manual review triggers"
                                        ],
                                        image: "/icons/ca.webp"
                                    }
                                },
                                {
                                    key: "compliance",
                                    label: "Branch Managers",
                                    content: {
                                        bullets: [
                                            "Monitor staff workload and turnaround timese",
                                            "Identify pending files and SLAs at risk",
                                            "Reassign files or intervene in bottlenecked queues"
                                        ],
                                        image: "/icons/bm.webp"
                                    }
                                },
                                {
                                    key: "pricing",
                                    label: "Lending Ops",
                                    content: {
                                        // title: "See staff productivity and stage-level drop-offs",
                                        bullets: [
                                            "See workload distribution across staff",
                                            "Spot stuck files and SLA breaches",
                                            "Monitor daily task and app completion rates"
                                        ],
                                        image: "/icons/lops.webp"
                                    }
                                },
                                {
                                    key: "ops",
                                    label: "Compliance / Risk",
                                    content: {
                                        // title: "Review policy exceptions and score distribution for audit readiness",
                                        bullets: [
                                            "View full audit trails for every officer action",
                                            "Monitor exception handling and policy deviations",
                                            "Ensure documentation and decision logs are complete"
                                        ],
                                        image: "/icons/risk.webp"
                                    }
                                }
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

            {/* Lending Timeline Section */}
            <section className="w-full flex flex-col items-center py-16 relative px-6">
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
                <CustomHeader text="What Lending looks like when you can do it all in one tab" className="z-10 text-center" />
                <p className="text-[#606060] text-lg text-center mb-10 max-w-3xl z-10">The Cockpit brings structure, automation, and visibility to every hour of your loan officers' day—so they can focus on lending, not logistics.</p>
                <div 
                    className="flex flex-col md:flex-row gap-4 w-full max-w-7xl justify-center z-10"
                    onMouseLeave={() => {
                        setActiveCard(0);
                        setShowPoints(true);
                    }}
                >
                    {lendingTimeline.map((item, idx) => (
                        <div
                            key={item.time}
                            className={
                                activeCard === idx
                                    ? `min-w-[50%] lg:h-[220px] bg-[radial-gradient(89.87%_256.74%_at_50%_-132.69%,_#7EB2FF_0%,_#043071_98.49%)] text-white rounded-2xl p-6 shadow-lg flex flex-col flex-3 transition-all duration-500 ease-in-out`
                                    : "lg:max-w-[16.66%] lg:min-w-[20%] lg:h-[220px] w-full bg-white border border-[#C7D6F3] rounded-2xl p-6 shadow-sm flex flex-col bg-[url('/icons/patt.svg')] bg-no-repeat bg-right-bottom flex-1 transition-all duration-500 ease-in-out"
                            }
                            style={{
                                cursor: 'pointer',
                                overflow:"hidden"
                            }}
                            onMouseEnter={() => handleCardHover(idx)}
                        >
                            <span className={"font-bebas-neue mb-2 " + (activeCard === idx ? "text-white text-3xl md:text-[56px]" : "text-[#689BE8] text-2xl md:text-[48px]")}>{item.time}</span>
                            <span className={"text-lg font-medium mb-2 " + (activeCard === idx ? "text-white" : "text-[#606060]")}>{item.title}</span>
                            {activeCard === idx && (
                                <ul className={`mt-2 text-[#ACC7ED] text-base list-disc list-inside space-y-1 hidden lg:block transition-none duration-2000 ease-in-out ${true ? 'opacity-100' : 'opacity-0'}`}>
                                    {item.details.map((d, i) => (
                                        <li key={i}>{d}</li>
                                    ))}
                                </ul>
                            )}
                            <ul className="mt-2 text-[#ACC7ED] text-base list-disc list-inside space-y-1 block lg:hidden">
                                {item.details.map((d, i) => (
                                    <li key={i} className={`text-[#606060] text-sm ${activeCard === idx ? "text-white" : ""}`}>{d}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Flows Section */}
            <section className="w-full max-w-7xl px-4 md:px-0 py-8 lg:py-16 flex flex-col items-center relative md:mt-[72px]">
                <CustomHeader text="Fits Right Into the Flow of Lending" className="text-center z-10" />
                <p className="text-[#606060] text-lg text-center mb-10 max-w-3xl z-10">The Lender's Cockpit doesn't sit on the sidelines. It's woven directly into your origination journey—powering action at every stage.</p>
                <Marquee className="flex gap-[20px]">
                <div className="md:hidden w-full flex flex-nowrap md:flex-wrap  z-10 justify-start md:justify-center pt-2 pb-8 mt-8 overflow-x-auto scrollbar-hide hide-scrollbar">
                    {flowsData.map((item, idx) => (
                        !item.title ? (
                            <div key={item.title} className="min-w-[82px] p-4 flex flex-col items-start justify-center hover:scale-105 transition-all ease-in">
                                <Image src={item.icon} alt="arrow" width={82} height={3} className="mb-3 w-full object-cover rounded-2xl" />
                            </div>
                        ) :
                            <div key={item.title} className="bg-white w-[152px] shadow-lg p-4 flex flex-col items-start border-[2px] border-[#1B5AD2] rounded-[20px] hover:scale-105 transition-all ease-in">
                                <Image src={item.icon} alt={item.title} width={40} height={40} className="mb-3  w-[40px] h-[40px] object-cover rounded-2xl" />
                                <span className="text-[18px] font-bold text-[#2A5FAC] text-left">{item.title}</span>
                            </div>
                    ))}
                </div></Marquee>

                <div className="hidden w-full md:flex flex-nowrap md:flex-wrap  z-10 justify-start md:justify-center pt-2 pb-8 mt-8 overflow-x-auto scrollbar-hide hide-scrollbar">
                    {flowsData.map((item, idx) => (
                        !item.title ? (
                            <div key={item.title} className="min-w-[82px] p-4 flex flex-col items-start justify-center hover:scale-105 transition-all ease-in">
                                <Image src={item.icon} alt="arrow" width={82} height={3} className="mb-3 w-full object-cover rounded-2xl" />
                            </div>
                        ) :
                            <div key={item.title} className="bg-white w-[152px] shadow-lg p-4 flex flex-col items-start border-[2px] border-[#1B5AD2] rounded-[20px] hover:scale-105 transition-all ease-in">
                                <Image src={item.icon} alt={item.title} width={40} height={40} className="mb-3  w-[40px] h-[40px] object-cover rounded-2xl" />
                                <span className="text-[18px] font-bold text-[#2A5FAC] text-left">{item.title}</span>
                            </div>
                    ))}
                </div>
            </section>


            {/* Clarity Drives Speed Section */}
            <section className="w-full flex flex-col items-center py-16 px-6 lg:px-0">
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
                <CustomHeader text="Clarity Drives Speed. Speed Drives Conversions" className="pt-6 pb-[32px] z-10 text-center" />
                <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row items-center p-8 md:p-0 gap-8 z-10 backdrop-blur-lg">
                    <div className="flex-1 flex flex-col justify-center  md:p-10">
                        <h3 className="text-[#2A5FAC] text-lg md:text-xl font-bold mb-4">Deliver seamless, personalised member experiences across every channel, while empowering your team with faster decisions and scalable solutions</h3>
                        <ul className="space-y-3">
                            {clarityBullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-2 text-[#292929] text-base md:text-lg">
                                    <span className=" text-[#2563EB]">→</span>
                                    <span className="">{b}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* <div className="flex-1 flex items-end justify-end self-end"> */}
                    <img src="/icons/cds.webp" alt="Clarity Dashboard" className="rounded-2xl w-full max-w-md z-10" />
                    {/* </div> */}
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="w-full py-16 mb-24 flex flex-col items-center text-center">
                <CustomHeader text="Give Your Loan Officers the Control They Deserve" className="text-center text-2xl md:text-[44px] max-w-3xl leading-normal font-bold mb-4" />
                <p className="max-w-5xl mx-auto text-sm lg:text-2xl px-6 lg:px-0 text-[#606060] mt-6">
                    Your lending teams drive your business. It's time they had the tools to do it with speed, visibility, and confidence.
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
                    <span className="relative z-10">See the Cockpit in Action</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#195BD7] to-[#1C8DEA] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
                </motion.button>
                <Contact open={showContactModal} onClose={() => setShowContactModal(false)} />
            </section>
        </main>
    );
} 