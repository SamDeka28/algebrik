"use client";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export default function LegacyStacksSection() {
  const isMobile = useIsMobile();

  const baseMotion = {
    initial: isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: isMobile ? 0.01 : 0.6, ease: "easeOut" },
    viewport: { once: false, amount: 0.2 },
  } as const;

  return (
    <section className="w-full py-20 font-plus-jakarta">
      {/* <div className="container relative opacity-[30%] -z-20">
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
      </div>  */}
      <div className="max-w-7xl mx-auto px-4">
        <motion.div {...baseMotion} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#2a5fac] mb-6 font-plus-jakarta">
            Where legacy stacks fall short
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto font-plus-jakarta">
            From DAO to Analytics, see how Algebrik turns bolt-on modules into one unified platform.
          </p>
        </motion.div>

        <motion.div {...baseMotion} className="grid grid-cols-1 bg-white md:grid-cols-3 gap-6 rounded-[40px] shadow-xl ">
          {/* Column 1: Product Area */}
          <div className="p-4">
            <div className="text-left mb-2 w-full">
              <div className="bg-[#FAFAFA] border border-[#CCCCCC] !w-full text-gray-700 px-5 py-4 rounded-full text-lg font-semibold font-plus-jakarta">Product Area</div>
            </div>
            {[
              "Account Opening (DAO)",
              "POS (Omnichannel)",
              "Loan Origination (LOS)",
              "Cross-Sell",
              "Decisioning Engine",
              "Analytics",
              "Customization",
              "Support"
            ].map((area, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-base font-semibold text-gray-900 font-plus-jakarta">{area}</span>
              </div>
            ))}
          </div>

          {/* Column 2: Legacy LOS */}
          <div className="border-l border-gray-200 pl-4 pr-6 p-4">
            <div className="text-left mb-2 w-full">
              <div className="bg-[#FAFAFA] border border-[#CCCCCC] !w-full text-gray-700 px-5 py-4 rounded-full text-lg font-semibold font-plus-jakarta">Legacy LOS</div>
            </div>
            {[
              "Separate module, extra cost",
              "Add-on, limited customization",
              "Siloed modules (Personal, Auto, CC, HELOC)",
              "Generic approvals only",
              "Rules-only, external AI vendors",
              "Canned reports, separate BI tools",
              "SOWs for workflow changes",
              "CSM exits post-launch"
            ].map((item, index) => (
              <div key={index} className=" p-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.9974 18.3333C14.5807 18.3333 18.3307 14.5833 18.3307 9.99996C18.3307 5.41663 14.5807 1.66663 9.9974 1.66663C5.41406 1.66663 1.66406 5.41663 1.66406 9.99996C1.66406 14.5833 5.41406 18.3333 9.9974 18.3333Z" fill="#FAFAFA" />
                      <path d="M7.63906 12.3583L12.3557 7.64163M12.3557 12.3583L7.63906 7.64163M9.9974 18.3333C14.5807 18.3333 18.3307 14.5833 18.3307 9.99996C18.3307 5.41663 14.5807 1.66663 9.9974 1.66663C5.41406 1.66663 1.66406 5.41663 1.66406 9.99996C1.66406 14.5833 5.41406 18.3333 9.9974 18.3333Z" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                  </div>
                  <span className="text-base text-gray-600 font-plus-jakarta">{item}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Column 3: Algebrik - Elevated Style */}
          <div className="border-solid border-[6px] border-[#5A94E7] rounded-[40px] p-4 box-border bg-white scale-105">
            <div className="text-left mb-2 w-full">
              <div className="text-[#2a5fac] bg-[#EFF6FC] border border-[#C7DAF5] px-5 py-4 w-full rounded-full  text-lg font-semibold font-plus-jakarta">Algebrik</div>
            </div>
            {[
              "Embedded into lending flows",
              "Native web, mobile, branch, self-serve",
              "Unified LOS across all consumer lending",
              "Bureau-driven recapture & balance transfers",
              "Native agentic AI, bulk backtesting",
              "Real-time lender cockpit",
              "Self-serve workflow & strategy builder",
              "Dedicated successpod"
            ].map((item, index) => (
              <div key={index} className="p-4">
                <div className="flex items-center gap-3">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.4974 18.3333C15.0807 18.3333 18.8307 14.5833 18.8307 9.99996C18.8307 5.41663 15.0807 1.66663 10.4974 1.66663C5.91406 1.66663 2.16406 5.41663 2.16406 9.99996C2.16406 14.5833 5.91406 18.3333 10.4974 18.3333Z" fill="#EFF6FC" stroke="#2A5FAC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.96094 10.0001L9.31927 12.3584L14.0443 7.64172" stroke="#2A5FAC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


                  <span className="text-base font-medium font-plus-jakarta">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="text-center mt-12">
        <a target="_blank" href="/solutions/credit-union" className="bg-gradient-to-r from-[#1C8DEA] to-[#195BD7] text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all font-plus-jakarta">
              Explore Algebrik in action
            </a>
        </div>
      </div>
    </section>
  );
}
