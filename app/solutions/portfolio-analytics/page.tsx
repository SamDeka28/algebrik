"use client";

import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import DashboardAnalyticsHero from "@/components/dashboard-analytics/Hero";
import { useRouter } from "next/navigation";
import Contact from "@/components/contacts";
import Marquee from "react-fast-marquee";

const beforeAfterData = [
    {
        type: "before",
        title: "Before Algebrik",
        titleClass: "mb-3 bg-[#E4E8ED] rounded-[40px] text-center text-[#292929] text-[20px] font-bold px-4 py-2",
        cardClass: "bg-white rounded-2xl shadow-2xl p-6 pb-10 flex-1 min-w-[260px]",
        textClass: "text-gray-600 space-y-2 text-left",
        icon: null,
        items: [
            "Application funnel buried in disconnected reports",
            "No insight into channel or branch performance",
            "Risk mix unknown until post-review",
            "Teams wait days for reports"
        ]
    },
    {
        type: "after",
        title: "After Algebrik",
        titleClass: "flex justify-center items-center gap-1 mb-3 bg-[#5A94E7] rounded-[40px] text-center text-[#FDFEFE] text-[20px] font-bold px-4 py-2",
        cardClass: "bg-gradient-to-br from-[#043071] to-[#7EB2FF] rounded-2xl shadow-2xl p-6 pb-10 flex-1 min-w-[260px] text-white  border-[5px] border-[#5A94E7]",
        textClass: "space-y-2 text-left",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0013 18.3334C14.5846 18.3334 18.3346 14.5834 18.3346 10C18.3346 5.41669 14.5846 1.66669 10.0013 1.66669C5.41797 1.66669 1.66797 5.41669 1.66797 10C1.66797 14.5834 5.41797 18.3334 10.0013 18.3334Z" fill="white" />
                <path d="M6.45703 10L8.81536 12.3583L13.5404 7.64166" stroke="#5A94E7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        items: [
            "See drop-offs, pull-through rates, and approval breakdowns live",
            "Drill down by source, product, or geography instantly",
            "Visualize scorecard distribution and pricing spread in real-time",
            "Dashboards update in seconds across users and teams."
        ]
    }
];

const featureCards = [
    {
        icon: "/icons/sales-funnel.svg",
        title: "Application Funnel Performance",
        description: "Track leads, drop-offs, approvals, and conversions by source or stage."
    },
    {
        icon: "/icons/risk.svg",
        title: "Approval & Decline Trends",
        description: "See how credit policy changes or market shifts affect outcomes"
    },
    {
        icon: "/icons/analysis.svg",
        title: "Risk Tier Distribution",
        description: "Visualize approved vs declined loans by credit score bands or segments"
    },
    {
        icon: "/icons/pricing.svg",
        title: "Pricing Mix Visibility",
        description: "Understand which APRs, terms, and amounts are being booked most often"
    },
    {
        icon: "/icons/service-time.svg",
        title: "Turnaround Time Insights",
        description: "Identify bottlenecks across teams, stages, or partner channels"
    }
];

const flowsData = [
    {
        icon: "/icons/das1.svg",
        title: "Drop-offs reduced by 25% after pinpointing abandonment hotspots"
    },
    {
        icon: "/icons/das2.svg",
        title: "Approval rate increased through real-time policy iteration tracking"
    },
    {
        icon: "/icons/das3.svg",
        title: "Risk tier skews detected early and adjusted mid-campaign"
    },
    {
        icon: "/icons/das4.svg",
        title: "Custom dashboards configured in minutes, no analyst required"
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
    const router = useRouter();
    const [showContactModal, setShowContactModal] = useState(false);
    return (
        <main className="bg-[#F8FAFF] min-h-screen w-full flex flex-col items-center font-plus-jakarta">
            {/* Hero Section */}
            <DashboardAnalyticsHero />

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
                <CustomHeader text="From Gut Feel to Ground Truth" className="text-center text-[28px] md:text-[40px] font-bold" />
                <p className="text-gray-600 text-center max-w-4xl mb-10 mt-6">
                    Deliver seamless, personalised member experiences across every channel, while empowering your team with faster decisions and scalable solutions
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

            {/* Feature Cards Section */}
            <section className="w-full py-16 flex flex-col items-center lg:px-0 px-6">
                <CustomHeader text="A Smarter Way to Manage Credit Strategies" className="text-center text-[28px] md:text-[40px] font-bold" />
                {/* <p className="text-gray-600 text-center max-w-4xl mb-10 mt-6">
                    Funnel, Risk, and Pricing—Visualized in One Place
                </p> */}
                <div className="w-full px-4 mt-5">
                    <Marquee
                        className="flex items-center justify-start md:justify-around pb-4 pt-8"
                        direction="left"
                        pauseOnHover
                        loop={0}
                        speed={100}
                        gradient={false}
                        >
                            {featureCards.map((item, idx) => (
                                <motion.div 
                                    key={item.title} 
                                className="flex flex-col bg-white rounded-2xl shadow-md p-6 min-w-[330px] max-w-[380px] gap-2 mx-2 h-[280px]"
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
                                <span className="text-[#606060] text-base leading-snug flex-1">{item.description}</span>
                                </motion.div>
                            ))}
                    </Marquee>
                </div>
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
                                    label: "CLO / Lending Head",
                                    content: {
                                        title: "Monitor daily application and approval metrics across branches and products",
                                        bullets: [
                                            "Track loan volume and approval trends daily",
                                            "Compare product performance across branches",
                                            "Monitor lending pipeline health in real-time"
                                        ],
                                        image: "/icons/clo.webp"
                                    }
                                },
                                {
                                    key: "product",
                                    label: "Credit Strategy",
                                    content: {
                                        title: "Compare funnel performance before and after credit/policy changes",
                                        bullets: [
                                            "Analyze score-tier level approval/decline ratios",
                                            "Assess impact of recent rule or pricing changes",
                                            "Identify gaps in policy coverage by segment"
                                        ],
                                        image: "/icons/cs.webp"
                                    }
                                },
                                {
                                    key: "compliance",
                                    label: "Channel/Partner Ops",
                                    content: {
                                        title: "Track which partners or campaigns convert best",
                                        bullets: [
                                            "Rank partners by completed application volume",
                                            "Identify drop-offs by affiliate or dealer",
                                            "Attribute conversions to campaigns or channels"
                                        ],
                                        image: "/icons/cpo.webp"
                                    }
                                },
                                {
                                    key: "pricing",
                                    label: "Branch Leaders",
                                    content: {
                                        title: "See staff productivity and stage-level drop-offs",
                                        bullets: [
                                            "See workload distribution across staff",
                                            "Spot stuck files and SLA breaches",
                                            "Monitor daily task and app completion rates"
                                        ],
                                        image: "/icons/bl.webp"
                                    }
                                },
                                {
                                    key: "ops",
                                    label: "Compliance / Risk",
                                    content: {
                                        title: "Review policy exceptions and score distribution for audit readiness",
                                        bullets: [
                                            "Track policy exception rates and overrides",
                                            "Track performance by segmentAudit rule execution and decision fairness",
                                            "Segment approvals by risk and pricing tiers"
                                        ],
                                        image: "/icons/cr.webp"
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

             {/* Analytics Section */}
             <section className="w-full max-w-7xl lg:px-4 lg:py-8 px-0 py-8 flex flex-col items-center relative lg:px-0 px-6">
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
                <CustomHeader text="Fits Your LOS. Feeds Your Tools. Powers Your Decisions" className="text-center z-10 mt-[64px] mb-[40px] lg:text-[40px] text-[28px] font-bold" />
                <Image src="/icons/los.svg" alt="Analytics" width={1000} height={1000} className="w-full z-10  rounded-3xl hidden lg:block" />
                <Image src="/icons/los-mobile.svg" alt="Analytics" width={1000} height={1000} className="w-full z-10  rounded-3xl block lg:hidden" />
            </section>

            {/* Flows Section */}
            <section className="w-full max-w-7xl px-4 py-8 lg:py-16 flex flex-col items-center relative mt-[72px]">
                <CustomHeader text="Turning Origination Data into Actionable Strategy" className="text-center z-10" />
                <div className="w-full flex flex-nowrap md:flex-wrap gap-4 md:gap-8 z-10 justify-start md:justify-center pb-8 mt-8 overflow-x-auto scrollbar-hide hide-scrollbar">
                    <div className="flex gap-4 md:gap-8 px-4">
                        {flowsData.map((item, idx) => (
                            <motion.div 
                                key={item.title} 
                                className="bg-white rounded-2xl min-w-[270px] flex-1 shadow-lg p-4 flex flex-col items-start"
                                whileHover={{ 
                                    scale: 1.05
                                }}
                                transition={{ 
                                    duration: 0.3,
                                    ease: "easeInOut"
                                }}
                            >
                                <Image src={item.icon} alt={item.title} width={64} height={64} className="mb-3 w-[64px] h-[64px] object-cover rounded-2xl" />
                                <span className="text-[18px] font-medium text-[#2A5FAC] text-left">{item.title}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Final CTA Section */}
            <section className="w-full py-16 mb-24 flex flex-col items-center text-center">
                <CustomHeader text="Lending Strategy Starts with Visibility" className="text-center text-2xl md:text-[44px] max-w-3xl leading-normal font-bold mb-4" />
                <p className="max-w-5xl mx-auto text-sm lg:text-2xl px-6 lg:px-0 text-[#606060] mt-6">
                Know what's moving through your origination pipeline—so you can act fast, stay efficient, and grow smarter.
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
                    <span className="relative z-10"> Talk to a Lending Funnel Expert</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#195BD7] to-[#1C8DEA] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
                </motion.button>
            </section>
            <Contact open={showContactModal} onClose={() => setShowContactModal(false)} />
        </main>
    );
} 