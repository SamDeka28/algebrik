"use client";

import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import DecisioningHero from "@/components/decisioning/Hero";
import { useState } from "react";

const beforeAfterData = [
    {
        type: "before",
        title: "Before Algebrik",
        titleClass: "mb-3 bg-[#E4E8ED] rounded-[40px] text-center text-[#292929] text-[20px] font-bold px-4 py-2",
        cardClass: "bg-white rounded-2xl shadow-2xl p-6 flex-1 min-w-[260px]",
        textClass: "text-gray-600 space-y-2 text-left",
        icon: null,
        items: [
            "Rules scattered across spreadsheets, code, and legacy systems",
            "Weeks to update score cutoffs or apply new pricing logic",
            "No visibility into what's working or why",
            "Risk of non-compliance and audit failures"
        ]
    },
    {
        type: "after",
        title: "After Algebrik",
        titleClass: "flex justify-center items-center gap-1 mb-3 bg-[#5A94E7] rounded-[40px] text-center text-[#FDFEFE] text-[20px] font-bold px-4 py-2",
        cardClass: "bg-gradient-to-br from-[#043071] to-[#7EB2FF] rounded-2xl shadow-2xl p-6 flex-1 min-w-[260px] text-white",
        textClass: "space-y-2 text-left",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0013 18.3334C14.5846 18.3334 18.3346 14.5834 18.3346 10C18.3346 5.41669 14.5846 1.66669 10.0013 1.66669C5.41797 1.66669 1.66797 5.41669 1.66797 10C1.66797 14.5834 5.41797 18.3334 10.0013 18.3334Z" fill="white" />
                <path d="M6.45703 10L8.81536 12.3583L13.5404 7.64166" stroke="#5A94E7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        items: [
            "All strategies managed from a single, no-code platform",
            "Changes deployed in minutes—by business users",
            "Champion-challenger testing and simulation built-in",
            "Audit trails, fairness checks, and explainability baked in"
        ]
    }
];

const featureCards = [
    {
        icon: "/icons/cs-1.svg",
        title: "No-Code Strategy Builder",
        description: "Design and launch rule-based or model-driven decisions with a drag-and-drop interface."
    },
    {
        icon: "/icons/cs-2.svg",
        title: "Champion–Challenger Testing",
        description: "Compare and optimize strategies live—without disrupting production."
    },
    {
        icon: "/icons/cs-3.svg",
        title: "Application Funnel Performance",
        description: "Track leads, drop-offs, approvals, and conversions by source or stage."
    },
    {
        icon: "/icons/cs-4.svg",
        title: "ML & Scorecard Deployment, No Dev Required",
        description: "Easily deploy machine learning models and risk scorecards directly into flows."
    },
    {
        icon: "/icons/cs-5.svg",
        title: "Custom Pricing & Treatment Logic",
        description: "Define loan terms, APR, and amounts with configurable rules or Python scripting."
    },
    {
        icon: "/icons/cs-6.svg",
        title: "Built-In Simulation & Backtesting",
        description: "Test strategies against historical data before go-live."
    },
    {
        icon: "/icons/cs-7.svg",
        title: "Compliance-First Design",
        description: "Support Fair Lending, ECOA, UDAAP and more with explainability and audit logging."
    }
];

const flowsData = [
    {
        icon: "/icons/ce1.png",
        title: "Design approval logic, pricing bands, and eligibility flows visually."
    },
    {
        icon: "/icons/ce2.png",
        title: "Test strategies on past applicants to predict impact."
    },
    {
        icon: "/icons/ce3.png",
        title: "Compare rule sets live to see what performs best."
    },
    {
        icon: "/icons/ce4.png",
        title: "Every decision is logged, explainable, and compliant."
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

export default function DecisioningPage() {
    return (
        <main className="bg-[#F8FAFF] min-h-screen w-full flex flex-col items-center font-plus-jakarta">
            {/* Hero Section */}
            <DecisioningHero />

            {/* Before/After Section */}
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
                <CustomHeader text="From Rule Sprawl to Real-Time Lending" className="text-center text-[28px] md:text-[40px] font-bold" />
                <p className="text-gray-600 text-center max-w-2xl mb-10 mt-6">
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
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.0013 18.3334C14.5846 18.3334 18.3346 14.5834 18.3346 10C18.3346 5.41669 14.5846 1.66669 10.0013 1.66669C5.41797 1.66669 1.66797 5.41669 1.66797 10C1.66797 14.5834 5.41797 18.3334 10.0013 18.3334Z" stroke="#606060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10 6.66669V10.8334" stroke="#606060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.99609 13.3333H10.0036" stroke="#606060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.0013 18.3334C14.5846 18.3334 18.3346 14.5834 18.3346 10C18.3346 5.41669 14.5846 1.66669 10.0013 1.66669C5.41797 1.66669 1.66797 5.41669 1.66797 10C1.66797 14.5834 5.41797 18.3334 10.0013 18.3334Z" stroke="#ACC7ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6.45703 10L8.81536 12.3583L13.5404 7.64166" stroke="#ACC7ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )} {item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Feature Cards Section */}
            <section className="w-full px-4 py-16 flex flex-col items-center">
                <CustomHeader text="A Smarter Way to Manage Credit Strategies" className="text-center text-[28px] md:text-[40px] font-bold" />
                <div className="w-full flex flex-nowrap gap-4 pb-4 mt-8 overflow-x-auto scrollbar-hide hide-scrollbar">
                    {featureCards.map((item, idx) => (
                        <div key={item.title} className="flex flex-col bg-white rounded-2xl shadow-md p-6 min-w-[330px] max-w-[380px] gap-2">
                            <div className="flex-shrink-0 flex items-center justify-center w-[78px] h-[78px] bg-[#F6F9FB] rounded-2xl mb-2">
                                <Image src={item.icon} alt={item.title} width={48} height={48} className="w-[48px] h-[48px] object-contain" />
                            </div>
                            <span className="font-bold text-[#292929] text-base mb-1">{item.title}</span>
                            <span className="text-[#606060] text-base leading-snug ">{item.description}</span>
                        </div>
                    ))}
                </div>
                <p className="text-[#2A5FAC] text-[20px] font-medium text-center max-w-2xl mt-8">Borrowers can start, pause, and resume—anywhere.</p>
            </section>

            {/* Analytics Section */}
            <section className="w-full max-w-7xl lg:px-4 lg:py-8 px-0 py-8 flex flex-col items-center relative">
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
                <Image src="/icons/lead.png" alt="Analytics" width={1000} height={1000} className="w-full z-10 shadow-2xl rounded-3xl" />
            </section>

            {/* Teams Section (Tabs/Pills) */}
            <section className="w-full flex flex-col items-center justify-center py-20relative mt-[72px] relative">
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
                        <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-2">Built for the Teams Who Own Lending</h2>
                        <p className="text-[#C7D6F3] text-lg text-center mb-8">Let Risk, Lending, and Compliance Teams Drive Change—No Tickets Needed.</p>
                        {(() => {
                            const teams = [
                                {
                                    key: "credit",
                                    label: "Credit & Risk",
                                    content: {
                                        title: "Take control of scorecards and policy",
                                        bullets: [
                                            "Launch & tweak cutoffs instantly",
                                            "Simulate strategy impact pre-launch",
                                            "Reduce dependence on engineering teams"
                                        ],
                                        image: "/icons/credit&risk.png"
                                    }
                                },
                                {
                                    key: "product",
                                    label: "Product & Lending",
                                    content: {
                                        title: "Test and scale new loan ideas",
                                        bullets: [
                                            "Configure APR, term, and amount",
                                            "Build flows per product line",
                                            "Launch variations without writing code"
                                        ],
                                        image: "/icons/product&lending.png"
                                    }
                                },
                                {
                                    key: "compliance",
                                    label: "Compliance & Governance",
                                    content: {
                                        title: "Enforce fairness, transparency, and control",
                                        bullets: [
                                            "Monitor all decisions in real-time",
                                            "Ensure auditability across rule sets",
                                            "Support Fair Lending and ECOA"
                                        ],
                                        image: "/icons/complaince&governance.png"
                                    }
                                },
                                {
                                    key: "pricing",
                                    label: "Pricing Analysts",
                                    content: {
                                        title: "Deploy complex pricing strategies easily",
                                        bullets: [
                                            "Segment pricing logic by borrower",
                                            "Use Python or visual rules",
                                            "Adjust thresholds without IT support"
                                        ],
                                        image: "/icons/pricinganalyst.png"
                                    }
                                },
                                {
                                    key: "ops",
                                    label: "Lending Ops & Strategy",
                                    content: {
                                        title: "Scale what works, kill what doesn't",
                                        bullets: [
                                            "Clone and test flows at scale",
                                            "Track performance by segment",
                                            "Optimize based on live results"
                                        ],
                                        image: "/icons/lendingops&strategy.png"
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
                                    <div className="flex flex-row flex-wrap gap-8 w-full">
                                        {/* Placeholder image with white border */}
                                        <div className="rounded-2xl p-2" >
                                            <div className="w-full lg:w-[460px] lg:h-[320px] flex items-center justify-center rounded-xl">
                                                <Image src={current?.content.image as string} alt="Credit" width={460} height={320} className="w-full lg:h-full object-cover rounded-xl" />
                                            </div>
                                        </div>
                                        {/* Content */}
                                        <div className="flex-1 flex flex-col items-start max-w-xl pt-6">
                                            <h3 className="text-white text-2xl font-semibold mb-4">{current?.content.title}</h3>
                                            <ul className="text-[#C7D6F3] text-lg space-y-2">
                                                {current?.content.bullets.map((b, i) => (
                                                    <li key={i} className="flex items-center gap-2">
                                                        <span className=" w-2 h-2 bg-white rounded-full inline-block"></span>
                                                        <span>{b}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            </section>

            {/* Flows Section */}
            <section className="w-full max-w-7xl px-4 py-8 lg:py-16 flex flex-col items-center relative mt-[72px]">
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
                <CustomHeader text="Control Every Decision. Without the Backlog" className="text-center z-10" />
                <div className="w-full flex flex-nowrap md:flex-wrap gap-4 md:gap-8 z-10 justify-start md:justify-center pb-4 mt-8 overflow-x-auto scrollbar-hide hide-scrollbar">
                    {flowsData.map((item, idx) => (
                        <div key={item.title} className="bg-white rounded-2xl min-w-[270px] flex-1 shadow-md p-4 flex flex-col items-center">
                            <Image src={item.icon} alt={item.title} width={240} height={133} className="mb-3 w-full object-cover border border-[#BEBEBE5C] rounded-2xl" />
                            <span className="text-base font-medium text-[#292929] text-left">{item.title}</span>
                        </div>
                    ))}
                </div>
                <p className="text-base lg:text-[20px] text-[#606060] font-semibold mt-8 lg:text-left">From partner onboarding to mobile lending widget in under 30 days.</p>
            </section>

            {/* Scale Section */}
            <section className="w-full max-w-7xl px-4 py-8 lg:py-16 flex flex-col items-center">
                <CustomHeader text="Built for Credit Strategy at Scale." className="text-center" />
                <div className="w-full flex mt-[44px] flex-wrap gap-4 md:gap-8 justify-start md:justify-center pb-4">
                    {scaleData.map((item, idx) => (
                        <div key={item.title} className="flex-1 bg-white w-[300px] min-w-[300px] pb-[30px] rounded-2xl shadow-2xl p-4 flex flex-col items-start">
                            <Image src={item.icon} alt={item.title} width={64} height={64} className="mb-3 w-[64px] h-[64px] object-cover" />
                            <span className="text-base font-medium text-[#2A5FAC] text-left">{item.title}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="w-full py-16 flex flex-col items-center text-center">
                <CustomHeader text="Your Credit Strategy Shouldn't Wait for a Ticket" className="text-center text-2xl md:text-[44px] max-w-3xl leading-normal font-bold mb-4" />
                <p className="max-w-5xl mx-auto text-sm lg:text-2xl px-6 lg:px-0 text-[#606060] mt-6">
                    Algebrik gives your lending, risk, and compliance teams full control to test, launch, and scale decisions—faster than ever before
                </p>
                <Link href="#demo" className="inline-block bg-[#1C8DEA] from-[#1C8DEA] to-[#195BD7] text-white font-semibold px-8 py-4 rounded-full transition mt-8 lg:mt-16">
                    See how fast it can be
                </Link>
            </section>
        </main>
    );
} 