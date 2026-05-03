"use client";

import Link from "next/link";
import Solr26Hero from "@/components/solr26/Solr26Hero";
import Solr26YearInNumbers from "@/components/solr26/Solr26YearInNumbers";
import Solr26AmbitionSection from "@/components/solr26/Solr26AmbitionSection";
import Solr26YearLongBuildSection from "@/components/solr26/Solr26YearLongBuildSection";
import Solr26SpeedExpectationsSection from "@/components/solr26/Solr26SpeedExpectationsSection";
import Solr26CapabilitiesSection from "@/components/solr26/Solr26CapabilitiesSection";
import Solr26LoanOfficerSection from "@/components/solr26/Solr26LoanOfficerSection";
import Solr26PairedTruthsSection from "@/components/solr26/Solr26PairedTruthsSection";
import Solr26ReportGate from "@/components/solr26/Solr26ReportGate";
import Solr26LeadersSection from "@/components/solr26/Solr26LeadersSection";

const navy = "#0c2340";

export default function Solr26Landing() {
  return (
    <div className="font-[family-name:var(--font-plus-jakarta-sans)] bg-white text-slate-900">
      <Solr26Hero />

      <Solr26YearInNumbers />

      <Solr26AmbitionSection />

      <Solr26YearLongBuildSection />

      <Solr26SpeedExpectationsSection />

      <Solr26ReportGate>
        <Solr26CapabilitiesSection />

        <Solr26LoanOfficerSection />

        <Solr26PairedTruthsSection />
      </Solr26ReportGate>

      <Solr26LeadersSection />

      {/* Closing strip */}
      <div className="bg-[#07090F] py-12 text-center text-[#07090F]"></div>
      {/* <section
        className="py-12 text-center text-white"
        style={{ backgroundColor: navy }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-lg font-semibold mb-4">
            Ready to turn this year&apos;s data into next year&apos;s advantage?
          </p>
          <Link
            href="/contact"
            className="inline-flex rounded-md bg-white px-6 py-3 text-sm font-semibold text-[#0c2340] hover:bg-sky-100 transition-colors"
          >
            Talk to Algebrik
          </Link>
        </div>
      </section> */}
    </div>
  );
}
