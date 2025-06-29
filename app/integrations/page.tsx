"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CustomHeader, CustomSubtitle } from "@/components/CustomHeader";
import Button from "@/components/Buttons";
import Image from "next/image";

// Partner data structure
interface Partner {
  name: string;
  image: string;
  category: string;
  description: string;
  website: string;
  logoClass: string;
}

// const integrations = [
//     { image: "/partner_icons/allied.webp" },
//     { image: "/partner_icons/autoexam.webp" },
//     { image: "/partner_icons/carle.webp" },
//     { image: "/partner_icons/conductiv.webp" },
//     { image: "/partner_icons/corelation.webp" },
//     { image: "/partner_icons/equifax.webp" },
//     { image: "/partner_icons/experian.webp" },
//     // { image: "/partner_icons/cuanswers.webp" },
//     { image: "/partner_icons/dealertrack.webp" },
//     { image: "/partner_icons/docusign.webp" },
//     { image: "/partner_icons/fiserv.webp" },
//     { image: "/partner_icons/jackharry.webp" },
//     { image: "/partner_icons/jdpower.webp" },
//     { image: "/partner_icons/lexis.webp" },
//     { image: "/partner_icons/ottomoto.webp" },
//     { image: "/partner_icons/plaid.webp" },
//     // { image: "/partner_icons/point.webp" },
//     // { image: "/partner_icons/portico.webp" },
//     { image: "/partner_icons/routeone.webp" },
//     // { image: "/partner_icons/scienaptic.webp" },
//     { image: "/partner_icons/sentilink.webp" },
//     // { image: "/partner_icons/socure.webp" },
//     { image: "/partner_icons/transunion.webp" },
//     { image: "/partner_icons/trustage.webp" },
//     // { image: "/partner_icons/zest.webp" },
//     { image: "/partner_icons/kelly.webp" },
//   ];

// Partner data
const partnerData: { [key: string]: Partner } = {
  'Plaid': {
    name: 'Plaid',
    image: "/integration_logos/plaid.png",
    category: 'Core Banking & Financial Data',
    description: 'Consumer-permissioned access to real-time financial data enabling faster, more accurate lending decisions.',
    website: 'https://plaid.com',
    logoClass: 'bg-gradient-to-r from-green-400 to-blue-400'
  },
  'DocuSign': {
    name: 'DocuSign',
    image: "/integration_logos/docusign.png",
    category: 'Document & Workflow Management',
    description: 'Industry-leading electronic signature technology with new sonic identity reflecting leadership position.',
    website: 'https://docusign.com',
    logoClass: 'bg-yellow-500'
  },
  'Equifax': {
    name: 'Equifax',
    image: "/integration_logos/equifax.png",
    category: 'Credit Bureaus',
    description: 'Comprehensive credit reporting and risk assessment with deep industry expertise and tradition of trust in lending decisions.',
    website: 'https://equifax.com',
    logoClass: 'bg-red-600'
  },
  'RouteOne': {
    name: 'RouteOne',
    image: "/integration_logos/routeone.png",
    category: 'Auto Lending & Vehicle Data',
    description: 'Comprehensive F&I platform connecting dealerships with approximately 1,500 integrated finance sources.',
    website: 'https://routeone.com',
    logoClass: 'bg-blue-600'
  },
  'Experian': {
    name: 'Experian',
    image: "/integration_logos/experian.png",
    category: 'Credit Bureaus',
    description: 'Advanced credit data and analytics to help lenders make informed decisions with global credit reporting expertise.',
    website: 'https://experian.com',
    logoClass: 'bg-orange-500'
  },
  'TransUnion': {
    name: 'TransUnion',
    image: "/integration_logos/transunion.png",
    category: 'Credit Bureaus',
    description: 'Innovative credit reporting solutions and risk management tools for modern lending operations.',
    website: 'https://transunion.com',
    logoClass: 'bg-blue-700'
  },
  'Corelation': {
    name: 'Corelation',
    image: "/integration_logos/corelation.png",
    category: 'Core Banking & Financial Data',
    description: 'Core banking system integration for enhanced personalization and improved member experience in credit union environments.',
    website: 'https://corelationinc.com',
    logoClass: 'bg-blue-500'
  },
  'Fiserv': {
    name: 'Fiserv',
    image: "/integration_logos/fiserv.png",
    category: 'Core Banking & Financial Data',
    description: 'Comprehensive financial technology platform providing core banking solutions with vibrant, innovative approach to fintech.',
    website: 'https://fiserv.com',
    logoClass: 'bg-orange-500'
  },
  'Conductiv': {
    name: 'Conductiv',
    image: "/integration_logos/conductiv.png",
    category: 'Core Banking & Financial Data',
    description: 'Permissioned data access with automated stipulations and enhanced underwriting capabilities.',
    website: 'https://conductiv.com',
    logoClass: 'bg-gray-700'
  },
  'Spinwheel': {
    name: 'Spinwheel',
    image: "/integration_logos/spinwheel.png",
    category: 'Core Banking & Financial Data',
    description: 'Advanced financial data connectivity and insights for improved lending decision-making.',
    website: 'https://spinwheelplatform.com',
    logoClass: 'bg-purple-600'
  },
  'OTTOMOTO': {
    name: 'OTTOMOTO',
    image: "/integration_logos/ottomoto.png",
    category: 'Auto Lending & Vehicle Data',
    description: 'Enhanced embedded lending capabilities with AI-driven insights for automotive finance.',
    website: 'https://ottomoto.com',
    logoClass: 'bg-gray-800'
  },
  'Carfax': {
    name: 'Carfax',
    image: "/integration_logos/carfax.png",
    category: 'Auto Lending & Vehicle Data',
    description: 'Comprehensive vehicle history reports and automotive data for informed auto lending decisions.',
    website: 'https://carfax.com',
    logoClass: 'bg-orange-600'
  },
  'Auto Exam': {
    name: 'Auto Exam',
    image: "/integration_logos/auto.png",
    category: 'Auto Lending & Vehicle Data',
    description: 'Seamless delivery of auto loan protection solutions and vehicle-related financial products.',
    website: 'https://autoexam.com',
    logoClass: 'bg-gray-600'
  },
  'LexisNexis': {
    name: 'LexisNexis',
    image: "/integration_logos/lexis.png",
    category: 'Fraud Detection & Identity',
    description: 'Advanced risk and identity solutions for comprehensive fraud detection and compliance management.',
    website: 'https://lexisnexis.com',
    logoClass: 'bg-blue-800'
  },
  'SentiLink': {
    name: 'SentiLink',
    image: "/integration_logos/sentilink.png",
    category: 'Fraud Detection & Identity',
    description: 'Sophisticated fraud detection technology specializing in synthetic identity prevention.',
    website: 'https://sentilink.com',
    logoClass: 'bg-red-600'
  },
  'Point Predictive': {
    name: 'Point Predictive',
    image: "/integration_logos/point.png",
    category: 'Fraud Detection & Identity',
    description: 'AI-powered fraud detection covering auto, mortgage, fintech, and personal lending with over 90% fraud detection accuracy.',
    website: 'https://pointpredictive.com',
    logoClass: 'bg-teal-600'
  },
  'Socure': {
    name: 'Socure',
    image: "/integration_logos/socure.png",
    category: 'Fraud Detection & Identity',
    description: 'AI-powered digital identity platform for streamlined identity verification and risk assessment.',
    website: 'https://socure.com',
    logoClass: 'bg-teal-500'
  },
  'Allied Solutions': {
    name: 'Allied Solutions',
    image: "/integration_logos/allied.png",
    category: 'Insurance & Warranty',
    description: 'Comprehensive insurance and risk management solutions with extensive industry experience.',
    website: 'https://alliedsolutions.net',
    logoClass: 'bg-blue-900'
  },
  'SWBC': {
    name: 'SWBC',
    image: "/integration_logos/swbc.png",
    category: 'Insurance & Warranty',
    description: 'Insurance and risk management solutions with over 35 years of experience in the insurance industry.',
    website: 'https://swbc.com',
    logoClass: 'bg-blue-700'
  },
  'TruSTAGE': {
    name: 'TruSTAGE',
    image: "/integration_logos/trustage.png",
    category: 'Insurance & Warranty',
    description: 'Trusted insurance and financial protection products designed specifically for credit union members.',
    website: 'https://trustage.com',
    logoClass: 'bg-blue-600'
  },
  'Extended Warranty': {
    name: 'Extended Warranty',
    image: "/integration_logos/extended.png",
    category: 'Insurance & Warranty',
    description: 'Comprehensive warranty protection solutions for various lending products.',
    website: '#',
    logoClass: 'bg-gray-700'
  },
  'J.D. Power': {
    name: 'J.D. Power',
    image: "/integration_logos/jdpower.png",
    category: 'Document & Workflow Management',
    description: 'Trusted insights and analytics for improving customer satisfaction and lending performance.',
    website: 'https://jdpower.com',
    logoClass: 'bg-gray-900'
  },
  'Carleton': {
    name: 'Carleton',
    image: "/integration_logos/carle.png",
    category: 'Document & Workflow Management',
    description: 'Enhanced lending accuracy and compliance through advanced verification and data solutions.',
    website: 'https://carleton.com',
    logoClass: 'bg-purple-700'
  },
  'Eltropy': {
    name: 'Eltropy',
    image: "/integration_logos/eltropy.png",
    category: 'Document & Workflow Management',
    description: 'Communication platform for streamlined borrower engagement and loan servicing.',
    website: 'https://eltropy.com',
    logoClass: 'bg-purple-600'
  },
  'Janusea': {
    name: 'Janusea',
    image: "/integration_logos/janusea.png",
    category: 'Document & Workflow Management',
    description: 'Advanced document processing and workflow management solutions.',
    website: 'https://janusea.com',
    logoClass: 'bg-teal-400'
  }
};

// Category data
const categories = [
  { id: 'all', name: 'All' },
  { id: 'Credit Bureaus', name: 'Credit Bureaus' },
  { id: 'Core Banking & Financial Data', name: 'Core Banking & Financial Data' },
  { id: 'Auto Lending & Vehicle Data', name: 'Auto Lending & Vehicle Data' },
  { id: 'Fraud Detection & Identity', name: 'Fraud Detection & Identity' },
  { id: 'Insurance & Warranty', name: 'Insurance & Warranty' },
  { id: 'Document & Workflow Management', name: 'Document & Workflow Management' }
];

// Featured partners
const featuredPartners = ['Plaid', 'DocuSign', 'Equifax', 'RouteOne'];

// Partner Card Component
const PartnerCard = ({ partner, isFeatured = false }: { partner: Partner; isFeatured?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handlePartnerClick = () => {
    if (partner.website && partner.website !== '#') {
      window.open(partner.website, '_blank');
    }
  };

  return (
    <motion.div
      className={`bg-white border border-gray-200 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
        isFeatured ? 'border-2' : ''
      } ${isHovered ? 'border-blue-500' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePartnerClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4 flex justify-center items-center h-28 w-full">
        <img src={partner.image} alt={partner.name} className="w-1/2 h-full object-contain" />
      </div>
      <h4 className="text-lg font-semibold mb-2 text-[#2A5FAC]">{partner.name}</h4>
      <p className="text-sm text-[#2A5FAC] opacity-80 leading-relaxed">{partner.description}</p>
    </motion.div>
  );
};

// Category Section Component
const CategorySection = ({ category, partners }: { category: string; partners: Partner[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h4 className="text-2xl font-semibold mb-5 pb-2 border-b-2 border-gray-200 text-[#2A5FAC]">
        {category}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {partners.map((partner) => (
          <PartnerCard key={partner.name} partner={partner} />
        ))}
      </div>
    </motion.div>
  );
};

export default function IntegrationsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Get all partners grouped by category
  const partnersByCategory = Object.values(partnerData).reduce((acc, partner) => {
    if (!acc[partner.category]) {
      acc[partner.category] = [];
    }
    acc[partner.category].push(partner);
    return acc;
  }, {} as { [key: string]: Partner[] });

  // Get featured partners
  const featuredPartnersList = featuredPartners.map(name => partnerData[name]).filter(Boolean);

  // Handle category filter
  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
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

      {/* Featured Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-semibold mb-12 text-center text-[#2A5FAC]">
            Featured Integrations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {featuredPartnersList.map((partner) => (
              <PartnerCard key={partner.name} partner={partner} isFeatured={true} />
            ))}
          </div>
        </div>
      </section>

      {/* All Integrations Section */}
      <section id="all-integrations" className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h3 className="text-3xl font-semibold mb-8 text-center text-[#2A5FAC]">
              All Integrations By Category
            </h3>
            
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryFilter(category.id)}
                  className={`px-4 py-2 rounded-full border transition-all duration-300 text-sm font-medium ${
                    activeCategory === category.id
                      ? 'bg-[#2A5FAC] border-[#2A5FAC] text-white'
                      : 'bg-white border-gray-300 text-[#2A5FAC] hover:bg-gray-50 hover:border-[#2A5FAC]'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Partners Grid */}
          <AnimatePresence mode="wait">
            {activeCategory === 'all' ? (
              <motion.div
                key="all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {Object.entries(partnersByCategory).map(([category, partners]) => (
                  <CategorySection key={category} category={category} partners={partners} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CategorySection 
                  category={activeCategory} 
                  partners={partnersByCategory[activeCategory] || []} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
} 