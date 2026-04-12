import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans, Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import RouteLoader from "@/components/global/RouteLoader";
import ConditionalConvoaiWidget from "@/components/ConditionalConvoaiWidget";
import ConsentManagedScripts from "@/components/global/ConsentManagedScripts";


const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Algebrik: AI-Powered Loan Origination Software for Seamless Lending",
  description: "Experience the future of lending with Algebrik's cloud-native, AI-powered platform. Simplify workflows, enhance decision-making, and deliver exceptional borrower experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/background_images/hero_background.webp" />
        <link rel="preload" as="image" href="/blue_logo.webp" />
        <link rel="preload" as="image" href="/background_images/modern_lender.webp" />
        <link rel="preload" as="image" href="/background_images/ml-single.webp" />
        <link rel="preload" as="image" href="/section_images/home_page/loan.webp" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body
        className={`${plusJakartaSans.variable} ${dmSans.variable} ${bebas.variable} ${inter.variable} antialiased !bg-white`}
      >
        <RouteLoader>
          <Navbar />
          {children}
          <Footer />
          <ConditionalConvoaiWidget />
        </RouteLoader>
        {/* GTM, GA, HubSpot, Storylane — only after explicit consent */}
        <ConsentManagedScripts />
      </body>
    </html>
  );
}
