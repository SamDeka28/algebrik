import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans, Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import Script from "next/script";
import RouteLoader from "@/components/global/RouteLoader";
import ConvoaiWidget from "@/components/ConvoaiWidget"


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
})


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
        <Script
          id="hs-script-loader"
          strategy="afterInteractive"
          src="//js.hs-scripts.com/47671281.js"
        ></Script>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-7VNDB4K3JH"
        />
        {/**add favicon */}
        <link rel="icon" href="/favicon.ico" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-7VNDB4K3JH');
        `}
        </Script>
        <Script
          id="storylane-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){"use strict";function e(t: Document){var r=t.head;if(!r)return;var i=t.querySelector('script[src="https://js.storylane.io/js/v2/storylane.js"]'),n=t.querySelector('script[src="https://js.storylane.io/js/v1/storylane.js"]');if(i||n)return;var s=t.createElement("script");s.type="text/javascript",s.async=!0,s.src="https://js.storylane.io/js/v2/storylane.js",r.appendChild(s)}e(window.document)})()`
          }}
        />
        <Script
          id="hubspot-script"
          src="//js-na2.hs-scripts.com/47671281.js"
          strategy="afterInteractive" // Load after page is interactive
        />
      </head>

      <body
        className={`${plusJakartaSans.variable} ${dmSans.variable} ${bebas.variable} ${inter.variable} antialiased !bg-white`}
      >
        <RouteLoader>
          <Navbar />
          {children}
          <Footer />
          <ConvoaiWidget/>
        </RouteLoader>
      </body>
    </html>
  );
}
