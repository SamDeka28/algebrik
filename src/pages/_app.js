import React, { useEffect } from "react";
import Script from "next/script";
import Head from "next/head";
// import "../styles/globals.css";

function MyApp({ Component, pageProps }) {

  const GA_TRACKING_ID = 'G-B5T9VV81L5';

  // Function to initialize Google Analytics
  const initGA = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID);
  };

  useEffect(() => {
    initGA();
  }, []);

  return (
    <>
      <Head>
        <title>Iteck</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        
      </Head>

      <Component {...pageProps} />
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />

      {/* Inline Google Analytics initialization script */}
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}');
        `}
      </Script>


      <Script strategy="beforeInteractive" src="/assets/js/lib/pace.js"></Script>
      <Script strategy="beforeInteractive" src="/assets/js/lib/bootstrap.bundle.min.js"></Script>
      <Script strategy="beforeInteractive" src="/assets/js/lib/mixitup.min.js"></Script>
      <Script strategy="beforeInteractive" src="/assets/js/lib/wow.min.js"></Script>
      <Script strategy="beforeInteractive" src="/assets/js/lib/html5shiv.min.js"></Script>
      <Script strategy="lazyOnload" src="/assets/js/main.js"></Script>
    </>
  );
}

export default MyApp;
