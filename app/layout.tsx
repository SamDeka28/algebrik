import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans, Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import Script from "next/script";
import RouteLoader from "@/components/global/RouteLoader";
import ConditionalConvoaiWidget from "@/components/ConditionalConvoaiWidget"


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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NKGM3FMJ');`,
          }}
        />
        {/* End Google Tag Manager */}
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
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-7VNDB4K3JH');
            `,
          }}
        />
        <Script
          id="storylane-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){"use strict";function e(t){var r=t.head;if(!r)return;var i=t.querySelector('script[src="https://js.storylane.io/js/v2/storylane.js"]'),n=t.querySelector('script[src="https://js.storylane.io/js/v1/storylane.js"]');if(i||n)return;var s=t.createElement("script");s.type="text/javascript",s.async=!0,s.src="https://js.storylane.io/js/v2/storylane.js",r.appendChild(s)}e(window.document)})()`
          }}
        />
        <Script
          id="hubspot-script"
          src="//js-na2.hs-scripts.com/47671281.js"
          strategy="afterInteractive" // Load after page is interactive
        />
        {/* Albacross tracking script */}
        {/**<Script
          id="albacross-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window._nQc="89180932";`,
          }}
        />
        <Script
          id="albacross-track"
          src="https://serve.albacross.com/track.js"
          strategy="afterInteractive"
        />**/}
      </head>

      <body
        className={`${plusJakartaSans.variable} ${dmSans.variable} ${bebas.variable} ${inter.variable} antialiased !bg-white`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NKGM3FMJ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <RouteLoader>
          <Navbar />
          {children}
          <Footer />
          <ConditionalConvoaiWidget/>
        </RouteLoader>
      </body>
    </html>
  );
}
