import { Metadata } from "next";
import HubSpotMeetingEmbed from "@/components/HubSpotMeetingEmbed";


export const metadata: Metadata = {
  title: "Partner with Algebrik AI: Lending Tech Partnerships",
  description: "Partner with Algebrik AI to deliver AI-powered lending solutions. Explore referral, integration, and co-selling opportunities for fintech growth.",
  keywords: ["partner with algebrik ai"],
};

;

export default function BecomeAPartnerPage() {
  return (
    <div className="min-h-screen bg-white pt-36">
      <HubSpotMeetingEmbed />
    </div>
  );
} 
