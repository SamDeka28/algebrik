import { Metadata } from "next";
"use client"
import LendingHealthCheck from "@/components/LendingHealthCheck";


export const metadata: Metadata = {
  title: "Algebrik AI | Digital Lending Health Check",
  description: "Assess your digital lending solution and identify gaps to improve loan origination performance and member experience.",
};

export default function LendingHealthCheckPage() {
  return <LendingHealthCheck />;
}
