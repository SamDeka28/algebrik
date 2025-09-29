"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const beforeAfterData = [
    {
        type: "before",
        title: "Legacy LOS",
        titleClass: "mb-3 bg-[#E4E8ED] rounded-[40px] text-center text-[#292929] text-[20px] font-bold px-4 py-2",
        cardClass: "bg-white rounded-2xl shadow-2xl p-6 pb-20 flex-1 min-w-[260px] hover:scale-105 transition-all ease-in",
        textClass: "text-gray-600 space-y-2 text-left",
        icon: null,
        items: [
            "Rigid workflows that can't adapt",
            "Contradictory rules with no visibility",
            "Canned reports and costly add-ons",
            "Support hand-off after go-live"
        ]
    },
    {
        type: "after",
        title: "Algebrik",
        titleClass: "flex justify-center items-center gap-1 mb-3 bg-[#5A94E7] rounded-[40px] text-center text-[#FDFEFE] text-[20px] font-bold px-4 py-2",
        cardClass: "bg-gradient-to-br from-[#043071] to-[#7EB2FF] rounded-2xl shadow-2xl p-6 pb-20 flex-1 min-w-[260px] text-white border-[5px] border-[#5A94E7] hover:scale-105 transition-all ease-in",
        textClass: "space-y-2 text-left",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0013 18.3334C14.5846 18.3334 18.3346 14.5834 18.3346 10C18.3346 5.41669 14.5846 1.66669 10.0013 1.66669C5.41797 1.66669 1.66797 5.41669 1.66797 10C1.66797 14.5834 5.41797 18.3334 10.0013 18.3334Z" fill="white" />
                <path d="M6.45703 10L8.81536 12.3583L13.5404 7.64166" stroke="#5A94E7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        items: [
            "Unified platform across Personal, Auto, CC, HELOC",
            "Agentic AI for smarter, faster decisions",
            "Self-serve flow and strategy control",
            "Dedicated success pod throughout your journey"
        ]
    }
];

export default function WhyRethinkingSection() {
    return (
        <section className="w-full max-w-7xl gap-8 px-4 py-16 flex flex-col items-center relative font-plus-jakarta">
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

            <h2 className="z-10 text-center max-w-3xl text-[28px] md:text-[40px] font-bold text-[#2a5fac]">
                Why lenders are rethinking their LOS
            </h2>

            <div className="flex flex-col md:flex-row gap-6 w-full justify-center z-10 relative">
                {beforeAfterData.map((card, idx) => (
                    <>
                        <div key={card.type} className={card.cardClass}>
                            <h3 className={card.titleClass}>
                                {card.icon && <span className="mr-1">{card.icon}</span>}
                                {card.title}
                            </h3>
                            <ul className={card.textClass} style={{ marginTop: "20px" }}>
                                {card.items.map((item, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        {card.type === "before" ? (
                                            <Image src="/icons/info-circle.svg" alt="Info" width={20} height={20} />
                                        ) : (
                                            <Image src="/icons/tick-circle.svg" alt="Tick" width={20} height={20} />
                                        )}
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {idx == 0 &&
                            <div className="hidden md:flex flex-col items-center justify-center z-20 gap-2">
                                <div className="bg-white rounded-full py-4 pl-4 pr-6 flex items-center justify-center">
                                    <svg width="45" height="19" viewBox="0 0 45 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.8" d="M-33 8.25C-33.6904 8.25 -34.25 8.80964 -34.25 9.5C-34.25 10.1904 -33.6904 10.75 -33 10.75L-33 9.5L-33 8.25ZM43.8839 10.3839C44.372 9.89572 44.372 9.10427 43.8839 8.61611L35.9289 0.661159C35.4408 0.173004 34.6493 0.173004 34.1612 0.661159C33.673 1.14931 33.673 1.94077 34.1612 2.42893L41.2322 9.49999L34.1612 16.5711C33.673 17.0592 33.673 17.8507 34.1612 18.3388C34.6493 18.827 35.4408 18.827 35.9289 18.3388L43.8839 10.3839ZM-33 9.5L-33 10.75L43 10.75L43 9.49999L43 8.24999L-33 8.25L-33 9.5Z" fill="url(#paint0_linear_1582_1386)" />
                                        <defs>
                                            <linearGradient id="paint0_linear_1582_1386" x1="9" y1="9.99999" x2="43" y2="9.99999" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#164486" stop-opacity="0" />
                                                <stop offset="1" stop-color="#164486" />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                </div>
                                <p className="text-[#2a5fac] text-sm font-normal text-wrap text-center">
                                    Switch to a modern <br /> alternative
                                </p>
                            </div>}
                    </>
                ))}
            </div>
        </section>
    );
}
