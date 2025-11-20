"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CustomHeader, CustomSubtitle } from "@/components/CustomHeader";
import Button from "@/components/Buttons";
import Image from "next/image";
import Marquee from "react-fast-marquee";

// 1. Define the new groupings and integration data
const integrationGroups = [
  {
    id: 'bureaus',
    name: 'Bureaus',
    integrations: [
      {
        name: 'Equifax',
        image: '/integration_logos/equifax.png',
        description: 'Instantly access credit reports and scores for streamlined underwriting.',
        website: 'https://equifax.com',
        newsArticle: '/resource-center/algebrik-ai-partners-with-equifax-to-power-smarter-fairer-and-faster-loan-decisions/',
      },
      {
        name: 'Experian',
        image: '/integration_logos/experian.png',
        description: 'Pull real-time credit data to power smarter lending decisions.',
        website: 'https://experian.com',
      },
      {
        name: 'TransUnion',
        image: '/integration_logos/transunion.png',
        description: 'Enable seamless credit pulls and borrower insights via TU integration.',
        website: 'https://transunion.com',
      },
    ],
  },
  {
    id: 'cores',
    name: 'Cores',
    integrations: [
      {
        name: 'Jack Henry',
        image: '/integration_logos/jackharry.png',
        description: 'Algebrik connects natively with Jack Henry to sync account and member data in real time.',
        website: 'https://jackhenry.com',
        newsArticle: 'https://www.businesswire.com/news/home/20250310636612/en/Algebrik-AI-Joins-the-Jack-Henry-Vendor-Integration-Program',
      },
      {
        name: 'Corelation',
        image: '/integration_logos/corelation.png',
        description: "Enable seamless origination and servicing through Algebrik's KeyStone integration.",
        website: 'https://corelationinc.com',
        newsArticle: 'https://www.businesswire.com/news/home/20250218309763/en/Algebrik-AI-and-Corelation-Announce-Integration-Agreement-to-Enhance-Personalization-Drive-Financial-Inclusion-Improve-Member-Experience',
      },
      // {
      //   name: 'Fiserv',
      //   image: '/integration_logos/fiserv.png',
      //   description: 'Algebrik supports Fiserv core connectivity to power fast, compliant workflows.',
      //   website: 'https://fiserv.com',
      // },
    ],
  },
  {
    id: 'indirect-auto',
    name: 'Indirect Auto',
    integrations: [
      {
        name: 'OttoMoto',
        image: '/integration_logos/ottomoto.png',
        description: 'Algebrik automates dealer-submitted loan ingestion via OttoMoto.',
        website: 'https://ottomoto.com',
        newsArticle: 'https://www.businesswire.com/news/home/20250121584404/en/OTTOMOTO',
      },
      {
        name: 'RouteOne',
        image: '/integration_logos/routeone.png',
        description: 'Receive and process indirect auto loans through Algebrik’s RouteOne bridge.',
        website: 'https://routeone.com',
      },
      {
        name: 'Dealertrack',
        image: '/integration_logos/dealertrack.png',
        description: 'With Algebrik, loan officers can easily handle apps flowing in from Dealertrack.',
        website: 'https://dealertrack.com',
      },
      {
        name: 'AppOne',
        image: '/integration_logos/appone.png',
        description: 'Algebrik’s AppOne integration simplifies indirect lending for credit unions and auto lenders.',
        website: 'https://appone.com',
      },
    ],
  },
  {
    id: 'consumer-permissioned',
    name: 'Consumer Permissioned Data & Income',
    integrations: [
      {
        name: 'Plaid',
        image: '/integration_logos/plaid.png',
        description: 'Algebrik lets borrowers share bank and income data securely through Plaid.',
        website: 'https://plaid.com',
        newsArticle: 'https://www.businesswire.com/news/home/20250203122111/en/Algebrik-AI-and-Plaid-Join-Forces-to-Simplify-Loan-Approvals-with-Smarter-Faster-Data-Connectivity',
      },
      {
        name: 'Conductiv',
        image: '/integration_logos/conductiv.png',
        description: 'Power income verification inside Algebrik with payroll access via Conductiv.',
        website: 'https://conductiv.com',
        newsArticle: '/resource-center/algebrik-ai-and-conductiv-elevate-lending-with-permissioned-data-automated-stipulations-and-smarter-underwriting',
      },
      // {
      //   name: 'SpringVerify',
      //   image: '/integration_logos/SpringVerify.png',
      //   description: 'Algebrik integrates SpringVerify to automate employment and income validation.',
      //   website: 'https://springverify.com',
      // },
    ],
  },
  {
    id: 'alternate-data',
    name: 'Alternate Data',
    integrations: [
      {
        name: 'LexisNexis',
        image: '/integration_logos/lexis.png',
        description: 'Algebrik brings in LexisNexis data to expand creditworthiness assessments beyond the bureau.',
        website: 'https://lexisnexis.com',
      },
    ],
  },
  {
    id: 'fraud',
    name: 'Fraud',
    integrations: [
      {
        name: 'Plaid',
        image: '/integration_logos/plaid.png',
        description: "Detect anomalies and reduce risk via Plaid's fraud prevention capabilities within Algebrik.",
        website: 'https://plaid.com',
        newsArticle: 'https://www.businesswire.com/news/home/20250203122111/en/Algebrik-AI-and-Plaid-Join-Forces-to-Simplify-Loan-Approvals-with-Smarter-Faster-Data-Connectivity',
      },
      {
        name: 'SentiLink',
        image: '/integration_logos/sentilink.png',
        description: 'Algebrik blocks synthetic identities with real-time risk scoring from SentiLink.',
        website: 'https://sentilink.com',
      },
      {
        name: 'Point Predictive',
        image: '/integration_logos/point.png',
        description: 'Use Point Predictive inside Algebrik to flag risky applications before approval.',
        website: 'https://pointpredictive.com',
      },
    ],
  },
  {
    id: 'identity',
    name: 'Identity',
    integrations: [
      {
        name: 'LexisNexis',
        image: '/integration_logos/lexis.png',
        description: 'Algebrik verifies borrower identity instantly through LexisNexis’s ID graph.',
        website: 'https://lexisnexis.com',
      },
      {
        name: 'Plaid',
        image: '/integration_logos/plaid.png',
        description: 'Confirm bank ownership and account legitimacy with Plaid inside Algebrik.',
        website: 'https://plaid.com',
        newsArticle: 'https://www.businesswire.com/news/home/20250203122111/en/Algebrik-AI-and-Plaid-Join-Forces-to-Simplify-Loan-Approvals-with-Smarter-Faster-Data-Connectivity',
      },
      //   {
      // name: 'Socure',
      //     image: '/integration_logos/socure.png',
      //     description: 'Leverage Socure via Algebrik to ensure fast, accurate identity verification.',
      // website: 'https://socure.com',
      //   },
    ],
  },
  {
    id: 'insurance',
    name: 'Insurance, GAP, Warranty',
    integrations: [
      {
        name: 'TruStage',
        image: '/integration_logos/trustage.png',
        description: 'Algebrik embeds TruStage protection products directly into the borrower journey.',
        website: 'https://trustage.com',
        newsArticle: 'https://www.prnewswire.com/news-releases/algebrik-ai-partners-with-trustage-to-offer-embedded-lending-protection-products-through-the-loan-origination-journey-302488113.html',
      },
      {
        name: 'Allied Solutions',
        image: '/integration_logos/allied.png',
        description: 'Offer GAP and warranty options inside Algebrik via Allied Solutions.',
        website: 'https://alliedsolutions.net',
      },
      {
        name: 'Auto Exam',
        image: '/integration_logos/auto.png',
        description: "Algebrik enables Auto Exam's mechanical coverage as part of auto loan flows.",
        website: 'https://autoexam.com',
        newsArticle: 'https://www.businesswire.com/news/home/20250127285961/en/Algebrik-AI-Partners-with-Auto-Exam-to-Seamlessly-Deliver-Auto-Loan-Protection-Solutions',
      },
      {
        name: 'SWBC',
        image: '/integration_logos/swbc.png',
        description: 'Add SWBC’s protection plans to Algebrik’s digital loan experience.',
        website: 'https://swbc.com',
      },
      {
        name: 'Frost',
        image: '/integration_logos/frost.png',
        description: 'Deliver embedded lending insurance offers through Frost integrations on Algebrik.',
        website: 'https://frost.com',
      },
      {
        name: 'Route66 Warranty',
        image: '/integration_logos/route66.png',
        description: 'Algebrik lets lenders offer Route66 Extended Warranty coverage directly within the lending workflow.',
        website: 'https://route66warranty.com',
      },
    ],
  },
  {
    id: 'others',
    name: 'Others',
    integrations: [
      {
        name: 'DocuSign',
        image: '/integration_logos/docusign.png',
        description: 'Algebrik powers secure document workflows with integrated e-signatures from DocuSign.',
        website: 'https://docusign.com',
      },
      {
        name: 'Carleton',
        image: '/integration_logos/carle.png',
        description: 'Generate compliant disclosures and payoff quotes in Algebrik via Carleton.',
        website: 'https://carleton.com',
        newsArticle: 'https://www.businesswire.com/news/home/20250210537797/en/Algebrik-AI-Partners-with-Carleton-to-Elevate-Lending-Accuracy-and-Compliance',
      },
      {
        name: 'J.D. Power',
        image: '/integration_logos/jdpower.png',
        description: 'Use J.D. Power data in Algebrik to price vehicles accurately for lending.',
        website: 'https://jdpower.com',
      },
      {
        name: 'Eltropy',
        image: '/integration_logos/eltropy.png',
        description: 'Communicate with borrowers via text, voice, or video right inside Algebrik using Eltropy.',
        website: 'https://eltropy.com',
      },
      {
        name: 'eDoc Innovations',
        image: '/integration_logos/edoc.png',
        description: 'Algebrik integrates with eDoc for compliant digital document storage and lifecycle management.',
        website: 'https://edoclogic.com',
      },
      {
        name: 'Carfax',
        image: '/integration_logos/carfax.png',
        description: 'Access vehicle history reports through Algebrik to inform safe, data-backed lending decisions.',
        website: 'https://carfax.com',
      },
      {
        name: 'Janusea',
        image: '/integration_logos/janusea.png',
        description: 'Algebrik uses Janusea to streamline and secure API connectivity with core systems.',
        website: 'https://janusea.com',
      },
    ],
  },
];

const allTabs = [
  { id: 'all', name: 'All' },
  ...integrationGroups.map((g) => ({ id: g.id, name: g.name })),
];

// Featured Integrations (separate from main groups)
const featuredIntegrationNames = ['Plaid', 'DocuSign', 'Equifax', 'RouteOne', 'Experian', 'TransUnion', 'Jack Henry', 'Corelation'];
const featuredIntegrations = featuredIntegrationNames
  .map((name) => {
    for (const group of integrationGroups) {
      const found = group.integrations.find((i) => i.name === name);
      if (found) return found;
    }
    return null;
  })
  .filter(Boolean);

// 2. Remove old partnerData, categories, featuredPartners, and related logic
// 3. Partner Card (reuse, but use new data)
const PartnerCard = ({ partner }: { partner: { name: string; image: string; description: string; website: string; newsArticle?: string } }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleLogoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = partner.newsArticle || partner.website;
    if (link && link !== '#') {
      // Check if it's a relative path (starts with /) or external URL
      if (link.startsWith('/')) {
        window.location.href = link;
      } else {
        window.open(link, '_blank');
      }
    }
  };
  const handleCardClick = () => {
    if (partner.website && partner.website !== '#') {
      window.open(partner.website, '_blank');
    }
  };
  return (
    <motion.div
      className={`bg-white border border-gray-200 rounded-xl p-6 text-center transition-all duration-300 ${isHovered ? 'border-blue-500' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="mb-4 flex justify-center items-center h-28 w-full cursor-pointer"
        onClick={handleLogoClick}
      >
        <img src={partner.image} alt={partner.name} className="w-1/2 h-full object-contain" />
      </div>
      <h4 className="text-lg font-semibold mb-2 text-[#2A5FAC] cursor-pointer" onClick={handleCardClick}>{partner.name}</h4>
      <p className="text-sm text-[#2A5FAC] opacity-80 leading-relaxed">{partner.description}</p>
    </motion.div>
  );
};

// 4. Main Page Component
export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState('all');

  // Helper to get integrations for the selected tab
  const getIntegrations = () => {
    if (activeTab === 'all') return integrationGroups;
    const group = integrationGroups.find((g) => g.id === activeTab);
    return group ? [group] : [];
  };

  return (
    <div className="min-h-screen bg-white pt-36">
      {/* Hero Section */}
      <section className="py-16 md:py-24 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <CustomHeader
            text="Connect with the Tools You Already Use"
            className="text-center mb-6"
          />
          <CustomSubtitle
            text="algebrik seamlessly integrates with 50+ leading platforms to create a unified lending ecosystem"
            className="text-center mb-8 max-w-3xl mx-auto"
          />
          <div className="mt-8">
            <Button
              text="View All Integrations"
              customClass="bg-transparent border border-[#2A5FAC] text-[#2A5FAC] hover:bg-[#2A5FAC] hover:text-white px-6 py-3 rounded-full"
              onClick={() => {
                const element = document.getElementById('all-integrations');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        </div>
      </section>

      {/* Featured Integrations Section */}
      <section className="py-16 bg-gray-50">
        <div className="w-full mx-auto px-4">
          <h3 className="text-3xl font-semibold mb-12 text-center text-[#2A5FAC]">
            Featured Integrations
          </h3>
          <div className="flex w-full mx-auto">
            <Marquee >
              {featuredIntegrations.filter((partner): partner is { name: string; image: string; description: string; website: string } => !!partner)
                .map((partner) => (
                  <div className="mx-4">
                  <PartnerCard key={partner.name} partner={partner} />
                  </div>
                ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* Integrations Tabs & Content */}
      <section id="all-integrations" className="py-16">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {allTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full border transition-all duration-300 text-sm font-medium ${activeTab === tab.id
                    ? 'bg-[#2A5FAC] border-[#2A5FAC] text-white'
                    : 'bg-white border-gray-300 text-[#2A5FAC] hover:bg-gray-50 hover:border-[#2A5FAC]'
                  }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Integrations Grid */}
          <AnimatePresence mode="wait">
            {getIntegrations().map((group) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="mb-12"
              >
                <h4 className="text-2xl font-semibold mb-5 pb-2 border-b-2 border-gray-200 text-[#2A5FAC] text-left">
                  {group.name}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {group.integrations.map((partner) => (
                    <PartnerCard key={partner.name} partner={partner} />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
} 