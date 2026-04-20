import { Metadata } from "next";
import SecureYourSpot from "@/components/secure-your-spot";
import WebinarGate from "@/components/webinars/WebinarGate";

export const metadata: Metadata = {
  title: "Algebrik AI Insights | AI Lending Webinar Series",
  description: "Watch Algebrik AI\u2019s latest webinar on digital lending, AI automation, and modern loan origination strategies for financial institutions.",
  keywords: ["Algebrik Ai's Latest Webinar"],
};

;

export default function Home() {
  return (
    <WebinarGate
      webinarSlug="algebrik-webinar1"
      pageTitle="Webinar — Lending 2030 (Algebrik Webinar 1)"
    >
      <SecureYourSpot />
    </WebinarGate>
  );
}
