import { Metadata } from "next";
import SecureYourSpot from "@/components/secure-your-spot/12-aug-2025";
import WebinarGate from "@/components/webinars/WebinarGate";

export const metadata: Metadata = {
  title: "Algebrik AI | Agentic AI in Lending Webinar",
  description: "Join our webinar to explore how agentic AI is transforming lending with automation, faster decisions, and smarter workflows.",
};

export default function Home() {
  return (
    <WebinarGate
      webinarSlug="12-aug-2025"
      pageTitle="Webinar — August 12, 2025"
    >
      <SecureYourSpot />
    </WebinarGate>
  );
}
