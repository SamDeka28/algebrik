"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomHeader, CustomSubtitle } from "./CustomHeader";
import { motion } from "framer-motion";
import { useState, useEffect,useRef } from "react";

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


export default function Contact() {
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
    onSubmit: async (values: {[key:string]:string}) => {
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

  return (
    <section className="container md:max-w-7xl w-full mx-auto mt-32 md:mb-28 md:p-8 
    flex flex-col md:flex-row font-plus-jakarta justify-center items-start gap-[43px] md:gap-[98px] overflow-hidden">
       <div className="absolute top-[100px] opacity-[30%] -z-10">
          <motion.div
            className="absolute -top-9 md:left-[96px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full w-[550px] h-[135px] md:w-[461.73px] md:h-[439.68px] blur-[80px]"
            animate={{
              x: ["0%", "30%", "-20%", "0%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-20 md:left-[20px] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full w-[550px] h-[235px] md:w-[196.91px] md:h-[280.03px] blur-[100px]"
            animate={{
              x: ["0%", "-30%", "20%", "0%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 top-96 md:top-56 bg-[#BE95FF] rounded-full w-[530px] h-[405px] md:w-[526.24px] md:h-[439.68px] blur-[100px]"
            animate={{
              x: ["0%", "40%", "-20%", "0%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <HubspotMeetingEmbed />
      {/* <div className="flex flex-col text-center md:text-left gap-[20px] p-8 md:p-0 relative top-[80px] md:block md:top-0 md:w-[568px]">
        <CustomHeader
          className="md:text-[56px] font-bold flex flex-col gap-0"
          text={
            <>
              <span>We'd love to show </span>
              <span>you around!</span>
            </>
          }
        />
        <CustomSubtitle
          text="Whether you're looking to streamline your loan processes, enhance borrower experiences, or explore our AI-powered, cloud-native solutions, our team is here to help. Connect with us to start your journey toward a smarter, more efficient lending ecosystem."
        />
      </div> */}

      {/* <div className="relative w-full max-w-lg pb-[20px] md:pb-0 ">
        <form
          onSubmit={formik.handleSubmit}
          className="relative mx-auto z-10 w-[362px] mt-[43px] md:mt-0 font-plus-jakarta drop-shadow-xl md:w-[518px]
           bg-white/90 backdrop-blur-sm rounded-[24px] p-8"
        >
          <div className="flex flex-col gap-[24px] !text-[#5D5A88] ">
            <div className="flex flex-col md:flex-row gap-[24px]">
              <div className="flex flex-col gap-[12px] w-full">
                <label className="text-[#5D5A88] font-plus-jakarta text-[14px] font-bold">
                  Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  placeholder="John Carter"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border border-gray-300 font-plus-jakarta rounded-[8px] p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#1C8DEA]"
                />
                {formik.touched.firstname && formik.errors.firstname && (
                  <p className="text-red-500 font-plus-jakarta text-sm">{formik.errors.firstname as string}</p>
                )}
              </div>
              <div className="flex flex-col gap-[12px] w-full">
                <label className="text-[#5D5A88] font-plus-jakarta text-[14px] font-bold">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="(123) 456 - 7890"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border border-gray-300 font-plus-jakarta rounded-[8px] p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#1C8DEA]"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500 font-plus-jakarta text-sm">{formik.errors.phone as string}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-[24px]">
              <div className="flex flex-col gap-[12px] w-full">
                <label className="text-[#5D5A88] font-plus-jakarta text-[14px] font-bold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border border-gray-300 font-plus-jakarta rounded-[8px] p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#1C8DEA]"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 font-plus-jakarta text-sm">{formik.errors.email as string}</p>
                )}
              </div>
              <div className="flex flex-col gap-[12px] w-full">
                <label className="text-[#5D5A88] font-plus-jakarta text-[14px] font-bold">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="Facebook"
                  value={formik.values.company}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border border-gray-300 font-plus-jakarta rounded-[8px] p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#1C8DEA]"
                />
                {formik.touched.company && formik.errors.company && (
                  <p className="text-red-500 font-plus-jakarta text-sm">
                    {formik.errors.company as string}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-[12px]">
              <label className="text-[#5D5A88] font-plus-jakarta text-[14px] font-bold">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Please type your message here..."
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-300 font-plus-jakarta rounded-[8px]
                 p-2 w-full h-[142px] focus:outline-none focus:ring-2 focus:ring-[#1C8DEA]"
              />
              {formik.touched.message && formik.errors.message && (
                <p className="text-red-500 font-plus-jakarta text-sm">{formik.errors.message as string}</p>
              )}
            </div>

            <motion.button
              type="submit"
              animate={{
                backgroundColor: clicked && !loading ? "#5cb85c" : "#1C8DEA",
              }}
              className="bg-[#1C8DEA] flex justify-center items-center w-full font-plus-jakarta
               text-white md:text-[16px] font-bold rounded-[31px] p-4 hover:bg-blue-600 transition"
            >
              {loading &&

                <div role="status">
                  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                </div>

              }
              {!loading ? 
              !clicked ? 'Get in touch' :  "We'll get back to you" :''}
            </motion.button>
          </div>
        </form>
        <section className="mt-8">
          <div
            className="meetings-iframe-container"
            data-src="https://meetings-na2.hubspot.com/algebrik?embed=true"
            id="hubspot-meetings-embed"
          ></div>
        </section>
      </div> */}
    </section>
  );
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
      style={{ minHeight: '700px', width: '100%' }}
    />
  );
};

