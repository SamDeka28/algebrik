import { Metadata } from "next";
import SecureYourSpot from "@/components/secure-your-spot/20-nov-2025";
import WebinarGate from "@/components/webinars/WebinarGate";

export const metadata: Metadata = {
  title: "Algebrik Webinar — November 20, 2025",
  description:
    "Register for the Algebrik webinar: industry leaders on next-gen borrowers and lending workflows.",
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
