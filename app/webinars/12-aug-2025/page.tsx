import { Metadata } from "next";
import SecureYourSpot from "@/components/secure-your-spot/12-aug-2025";
import WebinarGate from "@/components/webinars/WebinarGate";

export const metadata: Metadata = {
  title: "Algebrik Webinar — August 12, 2025",
  description:
    "Register for the Algebrik live webinar on intelligent lending and credit union innovation.",
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
