import { Metadata } from "next";
import SecureYourSpot from "@/components/secure-your-spot/20-nov-2025";
import WebinarGate from "@/components/webinars/WebinarGate";

export const metadata: Metadata = {
  title: "Algebrik | End-to-End Lending Platform Webinar",
  description: "Discover how an end-to-end lending platform streamlines origination, decisioning, and onboarding in one AI-powered system.",
};

export default function Home() {
  return (
    <WebinarGate
      webinarSlug="20-nov-2025"
      pageTitle="Webinar — November 20, 2025"
    >
      <SecureYourSpot />
    </WebinarGate>
  );
}
