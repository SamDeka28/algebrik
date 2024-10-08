import { useEffect, useRef } from 'react';
import Head from 'next/head';
//= Scripts
import navbarScrollEffect from "@common/navbarScrollEffect";
//= Layout
import MainLayout from '@layouts/Main';
//= Components

import Navbar from '@components/Navbars/SaasNav';
import Header from '@components/Saas/Header';
import Community from '@components/Saas/Community';
import About from '@components/Saas/About';
import Testimonials from '@components/Saas/Testimonials';
import Footer from '@components/Saas/Footer';
import Services from '@components/Saas/Services';
import Contact from '@components/Saas/Contact';

const HomeSaasTechnology = () => {
  const navbarRef = useRef(null);

  useEffect(() => {
    navbarScrollEffect(navbarRef.current);
  }, [navbarRef]);

  return (
    <>
      <Head>
        <title>Algebrik - Personalized digital lending starts here</title>
      </Head>

      <MainLayout>
        <Navbar navbarRef={navbarRef} />
        <Header />
        <main>
          <Community />
          <About />
          <Services />
          <Contact />
          {/* <Testimonials /> */}
        </main>
        <Footer />
      </MainLayout>
    </>
  )
}

export default HomeSaasTechnology;