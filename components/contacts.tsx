"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomHeader, CustomSubtitle } from "./CustomHeader";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

declare global {
  interface Window {
    HubSpotMeetings: {
      loadMeetings: () => void;
    };
  }
}

const validationSchema = Yup.object({
  firstname: Yup.string()
    .matches(/^[a-zA-Z0-9\s]*$/, "Name should only contain letters, numbers, and spaces")
    .required("Name is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  company: Yup.string()
    .matches(/^[a-zA-Z0-9\s]*$/, "Company name should only contain letters, numbers, and spaces")
    .required("Company name is required"),
  message: Yup.string()
    .matches(/^[a-zA-Z0-9\s.,!?]*$/, "Message should only contain letters, numbers, spaces, and basic punctuation")
    .required("Message is required"),
});

export default function Contact({ open, onClose, isModal = true }: { open?: boolean; onClose?: () => void; isModal?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstname: "",
      phone: "",
      email: "",
      company: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values: { [key: string]: string }) => {
      setClicked(true);
      setLoading(true);
      const res = await fetch(
        "https://api.hsforms.com/submissions/v3/integration/submit/47671281/42165c6a-f1e2-4626-9391-d384e354e6d1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: [
              ...Object.keys(values).map((key: string) => ({ name: key, value: values[key] }))
            ],
          }),
        }
      );
      setLoading(false)
      if (res.ok) {
        formik.resetForm()
      } else {
        alert("Failed to submit form.");
      }
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.getElementById("hs-meetings-embed-script")) {
        const script = document.createElement("script");
        script.src = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
        script.type = "text/javascript";
        script.id = "hs-meetings-embed-script";
        document.getElementById("hubspot-meetings-embed")?.appendChild(script);
      }
    }
  }, []);

  // Modal rendering
  if (isModal) {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 px-6 pt-6 overflow-y-auto overflow-x-hidden">
          <button
            className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
            onClick={onClose}
            aria-label="Close Contact Modal"
          >
            &times;
          </button>
          {renderContactSection()}
        </div>
      </div>
    );
  }

  // Non-modal rendering
  return <div className="pt-40">{renderContactSection()}</div>;

  function renderContactSection() {
    return (
      <section className="container md:max-w-7xl w-full mx-auto md:px-8 md:pt-8 flex flex-col md:flex-row font-plus-jakarta justify-center items-start gap-[43px] md:gap-[98px] overflow-hidden">
        <div className="absolute top-[100px] opacity-[30%] -z-10">
          <motion.div
            className="absolute -top-9 md:left-[96px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full w-[550px] h-[135px] md:w-[461.73px] md:h-[439.68px] blur-[80px]"
            animate={{ x: ["0%", "30%", "-20%", "0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-20 md:left-[20px] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full w-[550px] h-[235px] md:w-[196.91px] md:h-[280.03px] blur-[100px]"
            animate={{ x: ["0%", "-30%", "20%", "0%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 top-96 md:top-56 bg-[#BE95FF] rounded-full w-[530px] h-[405px] md:w-[526.24px] md:h-[439.68px] blur-[100px]"
            animate={{ x: ["0%", "40%", "-20%", "0%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <HubspotMeetingEmbed />
      </section>
    );
  }
}

import Script from 'next/script';

const HubspotMeetingEmbed = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMeetings = () => {
      if (window.HubSpotMeetings) {
        window.HubSpotMeetings.loadMeetings();
      } else {
        setTimeout(loadMeetings, 1000); // Retry after 1 second if not loaded
      }
    };

    // Load the script
    if (!document.getElementById('hs-meetings-embed-script')) {
      const script = document.createElement('script');
      script.id = 'hs-meetings-embed-script';
      script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
      script.async = true;
      script.onload = loadMeetings;
      document.body.appendChild(script);
    } else {
      loadMeetings();
    }

    // Cleanup
    return () => {
      const script = document.getElementById('hs-meetings-embed-script');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="meetings-iframe-container"
      data-src="https://meetings-na2.hubspot.com/algebrik?embed=true"
      style={{  width: '100%' }}
    />
  );
};

