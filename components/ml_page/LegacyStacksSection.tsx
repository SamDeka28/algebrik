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
    <section className="py-20 bg-gray-50 font-plus-jakarta">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div {...baseMotion} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#2a5fac] mb-6 font-plus-jakarta">
            Where legacy stacks fall short
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto font-plus-jakarta">
            From DAO to Analytics, see how Algebrik turns bolt-on modules into one unified platform.
          </p>
        </motion.div>

        <motion.div {...baseMotion} className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 font-plus-jakarta">Product Area</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 font-plus-jakarta">Legacy LOS</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 font-plus-jakarta">Algebrik</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  {
                    area: "Account Opening (DAO)",
                    legacy: "Separate module, extra cost",
                    algebrik: "Embedded into lending flows"
                  },
                  {
                    area: "POS (Omnichannel)",
                    legacy: "Add-on, limited customization", 
                    algebrik: "Native web, mobile, branch, self-serve"
                  },
                  {
                    area: "Loan Origination (LOS)",
                    legacy: "Siloed modules (Personal, Auto, CC, HELOC)",
                    algebrik: "Unified LOS across all consumer lending"
                  },
                  {
                    area: "Cross-Sell",
                    legacy: "Generic approvals only",
                    algebrik: "Bureau-driven recapture & balance transfers"
                  },
                  {
                    area: "Decisioning Engine",
                    legacy: "Rules-only, external AI vendors",
                    algebrik: "Native agentic AI, bulk backtesting"
                  },
                  {
                    area: "Analytics",
                    legacy: "Canned reports, separate BI tools",
                    algebrik: "Real-time lender cockpit"
                  },
                  {
                    area: "Customization",
                    legacy: "SOWs for workflow changes",
                    algebrik: "Self-serve workflow & strategy builder"
                  },
                  {
                    area: "Support",
                    legacy: "CSM exits post-launch",
                    algebrik: "Dedicated successpod"
                  }
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 font-plus-jakarta">{row.area}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                        <span className="font-plus-jakarta">{row.legacy}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#2a5fac]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-plus-jakarta">{row.algebrik}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="text-center mt-12">
          <button className="bg-[#2a5fac] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1e4a8a] transition-colors font-plus-jakarta">
            Check full comparison here
          </button>
        </div>
      </div>
    </section>
  );
}
