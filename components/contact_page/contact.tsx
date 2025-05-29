"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { useRouter } from "next/navigation";

interface FormValues {
  firstname: string;
  phone: string;
  email: string;
  company: string;
  jobtitle: string;
}

const validationSchema = Yup.object({
  firstname: Yup.string().required("Name is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  company: Yup.string().required("Company name is required"),
  jobtitle: Yup.string().required("Job title is required")
});

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const router=useRouter();

  const formik = useFormik<FormValues>({
    initialValues: {
      firstname: "",
      phone: "",
      email: "",
      company: "",
      jobtitle: ""
    },
    validationSchema,
    onSubmit: async (values :FormValues | any) => {
      setClicked(true);
      setLoading(true);

      try {
        const res = await fetch(
          "https://api.hsforms.com/submissions/v3/integration/submit/47671281/1d0e9c2e-5946-4f26-8de6-74a50198cc03",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fields: Object.keys(values).map((key:string) => ({
                name: key,
                value: values[key],
              })),
            }),
          }
        );

        if (res.ok) {
          formik.resetForm();
          router.push("/thank_you")
        } else {
          alert("Failed to submit form. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <section className="flex flex-col md:flex-row font-plus-jakarta items-center gap-[43px] md:gap-[98px] overflow-hidden">
      <div className="bg-[url('/section_images/gac/gac.png')] md:h-[950px] object-cover bg-no-repeat bg-cover flex flex-col text-center md:text-left gap-[20px] p-8 md:p-0 relative md:block md:top-0 md:w-[723px]">
        <div className="mx-auto md:px-[99px] pt-[50px] md:pt-[72px] pb-[73px] text-white flex flex-col gap-[40px] font-plus-jakarta">
          <div className="">
            <Link href="/" className="flex justify-center items-center md:block">
              <Image
                src={logo}
                alt="logo"
                className="w-[201px] h-[54.51px]"
              />
            </Link>
          </div>
          <div className="flex flex-col gap-[20px] ">
            <h1 className="md:text-[56px] font-semibold">An Evening with Credit Union Leaders at GAC!</h1>
            <p className="md:text-[18px] leading-[28px]">
              A private dinner for Credit Union executives to unwind, connect,
              and discuss the future of lending—over great food and even better
              company
            </p>
          </div>
          <div className="flex flex-col gap-[30px]">
            <p className="md:text-[18px] leading-[28px]">
              Join us for an invite-only dinner at GAC on March 2nd, where we’ll
              gather over good food and great conversations. No sales
              pitches—just an evening of insights and networking with your
              peers.
            </p>
            <p className="md:text-[18px] leading-[28px]">What to Expect:</p>
            <p className="md:text-[18px] leading-[28px]">
              A Relaxed, invite-only setting with top CU leadersMeaningful
              discussions on lending trends & technologyA fun dining experience!
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-lg pb-[20px] md:pb-0">
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

        <form
          onSubmit={formik.handleSubmit}
          className="relative mx-auto z-10 w-[362px] mt-[43px] md:mt-0 font-plus-jakarta drop-shadow-2xl md:w-[518px] bg-white/90 backdrop-blur-sm rounded-[24px] p-8"
        >
          <div className="flex flex-col gap-[24px]">
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
                  <p className="text-red-500 font-plus-jakarta text-sm">
                    {formik.errors.firstname}
                  </p>
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
                  <p className="text-red-500 font-plus-jakarta text-sm">
                    {formik.errors.phone}
                  </p>
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
                  <p className="text-red-500 font-plus-jakarta text-sm">
                    {formik.errors.email}
                  </p>
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
                    {formik.errors.company}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-[12px]">
              <label className="text-[#5D5A88] font-plus-jakarta text-[14px] font-bold">
                Job Title
              </label>
              <input
                type="text"
                name="jobtitle"
                placeholder="Please type your job title here..."
                value={formik.values.jobtitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-300 font-plus-jakarta rounded-[8px] p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#1C8DEA]"
              />
              {formik.touched.jobtitle && formik.errors.jobtitle && (
                <p className="text-red-500 font-plus-jakarta text-sm">
                  {formik.errors.jobtitle}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              animate={{
                backgroundColor: clicked && !loading ? "#5cb85c" : "#1C8DEA",
              }}
              className="bg-[#1C8DEA] flex justify-center !text-center items-center w-full font-plus-jakarta
               text-white md:text-[16px] font-bold rounded-[31px] p-4 hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              ) : clicked ? (
                "We'll get back to you"
              ) : (
                "Count Me In!"
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </section>
  );
}