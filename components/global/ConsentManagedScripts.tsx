"use client";

import { useEffect, useState, useCallback } from "react";
import Script from "next/script";
import Link from "next/link";

const STORAGE_KEY = "algebrik_cookie_consent";

type ConsentValue = "accepted" | "declined" | null;

function readStoredConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "accepted" || v === "declined") return v;
  } catch {
    /* private mode */
  }
  return null;
}

/**
 * Loads GTM, GA, HubSpot, Storylane only after explicit opt-in.
 * No tracking scripts run until the user clicks Accept.
 */
export default function ConsentManagedScripts() {
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState<ConsentValue>(null);

  useEffect(() => {
    setMounted(true);
    setConsent(readStoredConsent());
  }, []);

  const accept = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* still allow session */
    }
    setConsent("accepted");
  }, []);

  const decline = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "declined");
    } catch {
      /* */
    }
    setConsent("declined");
  }, []);

  if (!mounted) {
    return null;
  }

  if (consent === "accepted") {
    return (
      <>
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NKGM3FMJ');`,
          }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NKGM3FMJ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <Script
          id="hs-script-loader"
          strategy="afterInteractive"
          src="https://js.hs-scripts.com/47671281.js"
        />
        <Script
          id="hubspot-script-na2"
          strategy="afterInteractive"
          src="https://js-na2.hs-scripts.com/47671281.js"
        />
        <Script
          id="gtag-loader"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-7VNDB4K3JH"
        />
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
            __html: `(function(){"use strict";function e(t){var r=t.head;if(!r)return;var i=t.querySelector('script[src="https://js.storylane.io/js/v2/storylane.js"]'),n=t.querySelector('script[src="https://js.storylane.io/js/v1/storylane.js"]');if(i||n)return;var s=t.createElement("script");s.type="text/javascript",s.async=!0,s.src="https://js.storylane.io/js/v2/storylane.js",r.appendChild(s)}e(window.document)})()`,
          }}
        />
      </>
    );
  }

  if (consent === "declined") {
    return null;
  }

  /* No stored choice yet — show consent UI */
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4 font-plus-jakarta"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
    >
      <div className="max-w-lg rounded-2xl bg-white p-6 shadow-xl md:p-8">
        <h2
          id="cookie-consent-title"
          className="text-lg font-semibold text-[#292929] md:text-xl"
        >
          Cookies and privacy
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-[#3E404C] md:text-[15px]">
          This website stores cookies on your computer. These cookies are used to
          collect information about how you interact with our website and allow us
          to remember you. We use this information to improve and customize your
          browsing experience and for analytics and metrics about our visitors on
          this website and other media. To find out more, see our{" "}
          <Link
            href="/privacy-policy/"
            className="font-medium text-[#2A5FAC] underline hover:no-underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#3E404C] md:text-[15px]">
          If you decline, your information won&apos;t be tracked when you visit
          this website. A single cookie will be used in your browser to remember
          your preference not to be tracked.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={decline}
            className="order-2 rounded-full border-2 border-[#2A5FAC] bg-white px-6 py-3 text-center text-sm font-semibold text-[#2A5FAC] transition hover:bg-[#f0f4fa] sm:order-1"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={accept}
            className="order-1 rounded-full bg-[#2A5FAC] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#1e4a8a] sm:order-2"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
