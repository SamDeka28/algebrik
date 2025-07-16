"use client"
import { motion } from "framer-motion";
import Button from "../Buttons";
import Image from "next/image";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Marquee from "react-fast-marquee";
import { parsePhoneNumberFromString } from "libphonenumber-js"
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  firstname: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const carouselDataTwo = [
  {
    image: "/team_images/jesse.webp",
    name: "JESSE FRUGE",
    title: "VP, PRODUCT",
    place: "Algebrik AI",
  },
  {
    image: "/team_images/travis.webp",
    name: "Travis Bow",
    title: "Chief Executive Officer",
    place: "University of Hawaii FCU, Hawaii",
    bio:"Travis Bow is President and CEO of the University of Hawaii Federal Credit Union (UHFCU), Hawaii’s fifth largest credit union with $618 million in assets. He brings 17 years of experience at UHFCU, including as Vice President of Member Support, and is dedicated to member service and operational excellence. A University of Hawaii graduate, Bow is committed to the community and leading UHFCU’s continued growth.",
    linkedin:"https://www.linkedin.com/in/travis-b-2a0475279/"
  },
  {
    image: "/team_images/SherryWu.webp",
    name: "Sherry Wu",
    title: "Chief Technology Officer",
    place: "University of Michigan Credit Union, Michigan",
    bio: "Sherry Wu is the CTO of the University of Michigan Credit Union, guiding IT strategy after 25 years in leadership roles at IBM, Ford, and HPE and board service at People Driven CU. She holds an MBA from Michigan Ross and an MS in Computer Science from Eastern Michigan University.",
    linkedin: "https://www.linkedin.com/in/xiang-wu/"
  },
  {
    image: "/team_images/Shirley.jpeg",
    name: "Shirley Senn",
    title: "Chief Community Development",
    place: "New Orleans Firemen's Federal Credit Union",
    bio: "Shirley is a Certified Credit Union Development Educator and passionate advocate for financial inclusion. With 30+ years of experience across fintech, credit union strategy, and nonprofit leadership, she brings a human-first lens to innovation and impact in community finance.",
    linkedin: "https://www.linkedin.com/in/shirley-senn-cude-4395377/"
  },
  {
    image: "/team_images/Jennifer.jpeg",
    name: "Jennifer Hernandez",
    title: "VP,Customer Success",
    place: "Algebrik AI",
  }
];

const validatePhoneNumber = (value: string) => {
  const phoneNumber = parsePhoneNumberFromString(value || "");
  return phoneNumber && phoneNumber.isValid();
};

export default function SecureYourSpot() {
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#form") {
      const el = document.getElementById("form");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); // slight delay to ensure render
      }
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      email: "",
    },
    validationSchema,
    onSubmit: async (values: { [key: string]: string }) => {
      setClicked(true);
      setLoading(true);
      const res = await fetch(
        "https://api.hsforms.com/submissions/v3/integration/submit/47671281/7164404c-1055-4e81-972e-819bc2fbe403",
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
        router.push("/thank-you")
      } else {
        alert("Failed to submit form.");
      }
    },
  });

  return (
    <>
      <main className="overflow-x-hidden mt-32 md:mb-28 md:p-8 flex flex-col items-center font-plus-jakarta overflow-hidden px-6 lg:px-5">
        <div className="absolute top-[100px] opacity-[30%] -z-10 overflow-hidden">
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
        <div className="mt-8 Hero w-full max-w-7xl lg:bg-[url('/background_images/bg-2.svg')]  bg-[length:150%_auto] bg-center bg-white pt-[36px] border border-[#E2E8F1] rounded-[24px] shadow-[0px_20px_36px_0px_#0A406C1A] overflow-hidden">
          <div className="row flex flex-col gap-3 items-center">
            <div className="px-6 lg:px-36">
              <h1 className="text-3xl lg:text-[40px] font-bold text-[#2A5FAC] text-center leading-[60px]">Generative Al vs. Agentic Al :
                <h1 className="text-3xl lg:text-[40px] text-[#2A5FAC] text-center leading-[60px] font-normal">Why It Matters for Loan Origination</h1>
              </h1>

            </div>
            <p className="text-[#292929] text-lg px-6 text-center">Join industry leaders as they decode Agentic AI's real impact on lending workflows.</p>
            <Button
              openInBlank={false}
              text="12th August, 2025 at 02:00 PM EDT"
              isActive={true}
              // onClick={() => alert("Please provide the redirection page")}
              link="#form"
              customClass="bg-gradient-to-r from-[#1C8DEA] to-[#195BD7] text-white font-bold py-[10px] text-[14px] md:text-[16px] font-semibold hover:bg-blue-500 w-full md:w-auto"
              activeStyle="bg-white text-[#292929] font-bold text-center max-w-max px-[34px] mt-[32px]"
            />
            <Image src={"/background_images/12aug2pm-d.png"} alt="secure your spot" width={1162} height={233} className="hidden lg:block w-full mt-[23px]" />
            <Image src={"/background_images/12aug2pm-m.png"} alt="secure your spot" width={1162} height={233} className="lg:hidden w-full mt-[23px]" />
            <div className="lg:flex py-[20px] px-[38px] justify-between w-full hidden">
              {carouselDataTwo.map(item => <div className="flex flex-col  items-center">
                <p className="text-lg text-[#292929] font-bold">{item.name}</p>
                <p className="text-base font-medium text-[#292929]">{item.title}</p>
                <p className="text-[12px] text-[#656565]">{item.place}</p>
              </div>)}
            </div>
          </div>
        </div>

        {/**Section 2 */}
        <div className="flex flex-wrap lg:flex-nowrap w-full max-w-7xl mt-16 gap-4">
          <div className="flex-3 flex flex-col gap-4">
            <div className="relative overflow-hidden flex bg-white p-4 rounded-[16px] border border-[#C9D2E0] bg-gradient-to-t from-gray-100 to-white gap-[21px] shadow-[0px_20px_36px_0px_#0A406C1A]">
              <Image src={"/background_images/cardbg.svg"} alt="badge" width={63} height={63} className="my-5 w-[50%] aspect-square absolute top-[-80%] right-[0%] object-cover  blur-3xl opacity-60" />
              <Image src={"/background_images/badge.svg"} alt="badge" width={63} height={63} />
              <div>
                <p className="text-2xl font-bold text-[#292929]">Understand the Shift</p>
                <p className="text-base text-[#656565] font-medium">Get clarity on the difference between Generative and Agentic Al-and why it's becoming the defining technology in modern lending. </p>
              </div>
            </div>
            <div className="relative overflow-hidden flex bg-white p-4 rounded-[16px] border border-[#C9D2E0] bg-gradient-to-t from-gray-100 to-white gap-[21px] shadow-[0px_20px_36px_0px_#0A406C1A]">
              <Image src={"/background_images/cardbg.svg"} alt="badge" width={63} height={63} className="my-5 w-[50%] aspect-square absolute top-[-80%] right-[0%] object-cover  blur-3xl  opacity-60" />
              <Image src={"/background_images/badge.svg"} alt="badge" width={63} height={63} />
              <div>
                <p className="text-2xl font-bold text-[#292929]">Learn from Real Leaders: </p>
                <p className="text-base text-[#656565] font-medium">Hear from seasoned credit union executives, technologists, and community advocates who are already navigating this transition.</p>
              </div>
            </div>
          </div>
          <div className="flex-2">
            <div className="relative flex flex-row lg:flex-col bg-white p-4 rounded-[16px] border border-[#C9D2E0]  gap-[21px] h-full shadow-[0px_20px_36px_0px_#0A406C1A] overflow-hidden">
              <Image src={"/background_images/cardbg.svg"} alt="badge" width={63} height={63} className="my-5 w-[100%] aspect-square absolute top-[-60%] right-[-30%] object-cover  blur-3xl  opacity-60" />
              <Image src={"/background_images/badge.svg"} alt="badge" width={63} height={63} className="my-5" />
              <div>
                <p className="text-2xl font-bold text-[#292929]">See What's Working:</p>
                <p className="text-base text-[#656565] font-medium">Explore how leading institutions are using Agentic Al to speed up approvals, reduce exceptions, and simplify compliance-without increasing headcount.</p>
              </div>
            </div>
          </div>
          <div className="flex-3 flex flex-col gap-4">
            <div className="relative overflow-hidden flex bg-white p-4 rounded-[16px] border border-[#C9D2E0] bg-gradient-to-t from-gray-100 to-white gap-[21px] shadow-[0px_20px_36px_0px_#0A406C1A]">
              <Image src={"/background_images/cardbg.svg"} alt="badge" width={63} height={63} className="my-5 w-[50%] aspect-square absolute top-[-80%] right-[0%] object-cover  blur-3xl opacity-80" />
              <Image src={"/background_images/badge.svg"} alt="badge" width={63} height={63} />
              <div>
                <p className="text-2xl font-bold text-[#292929]">Leave with a Playbook</p>
                <p className="text-base text-[#656565] font-medium">Walk away with vendor evaluation checklists, governance frameworks, and practical workflows to apply immediately. </p>
              </div>
            </div>
            <div className="relative overflow-hidden flex bg-white p-4 rounded-[16px] border border-[#C9D2E0] bg-gradient-to-t from-gray-100 to-white gap-[21px] shadow-[0px_20px_36px_0px_#0A406C1A]">
              <Image src={"/background_images/cardbg.svg"} alt="badge" width={63} height={63} className="my-5 w-[50%] aspect-square absolute top-[-80%] right-[0%] object-cover  blur-3xl opacity-80" />
              <Image src={"/background_images/badge.svg"} alt="badge" width={63} height={63} />
              <div>
                <p className="text-2xl font-bold text-[#292929]">Join the Movement:</p>
                <p className="text-base text-[#656565] font-medium">Be part of a growing community committed to responsible, intelligent lending transformation.</p>
              </div>
            </div>
          </div>
        </div>

        {/**Section 3 */}
        <div className="flex flex-wrap relative max-w-7xl w-full mt-[83px] gap-8 justify-center">
          <div className="absolute top-[30%] lg:top-[200px] opacity-[30%] -z-10">
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
          <div className="flex-1 w-1/2">
            <h1 className="text-3xl lg:text-5xl text-[#2A5FAC] font-bold mb-[47px]">What You’ll Take Away</h1>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h6 className="text-xl font-bold text-[#292929]">A Clear Understanding of Agentic Al</h6>
                <p className="text-base font-medium text-[#656565]">Finally demystify the difference between Generative and Agentic Al-and why one is built to write while the other is built to act inside your lending workflows.</p>
              </div>
              <div className="flex flex-col gap-2">
                <h6 className="text-xl font-bold text-[#292929]">Faster, Smarter Loan Decisions</h6>
                <p className="text-base font-medium text-[#656565]">Learn how credit unions are using Agentic Al to automate document validation, exception handling, and decisioning-reducing time-to-approve without increasing workload. </p>
              </div>
              <div className="flex flex-col gap-2">
                <h6 className="text-xl font-bold text-[#292929]">Real-World Governance and Trust Frameworks</h6>
                <p className="text-base font-medium text-[#656565]">Get guidance on how to implement Al that's not only powerful, but compliant, auditable, and explainable to both staff and members.</p>
              </div>
              <div className="flex flex-col gap-2">
                <h6 className="text-xl font-bold text-[#292929]">Tools to Evaluate Al Vendors Confidently</h6>
                <p className="text-base font-medium text-[#656565]">Leave with the right questions to ask before buying into any "Al-powered" tool-and how to ensure it delivers real workflow transformation. </p>
              </div>
            </div>
            <div className="lg:hidden flex-1 mt-10">
              <div className="border border-[#C9D2E0] rounded-[24px] p-6 flex flex-col gap-6 bg-white">
                <h6 className="text-[#2A5FAC] text-xl font-bold">Get expert insights and practical solutions to stay competitive in a fast-evolving lending market. </h6>
                <div className="flex gap-20 px-[10px] overflow-x-scroll hide-scrollbar h-[230px]">
                  <Marquee>
                    {carouselDataTwo.map((team, index) => {
                      return <div className="relative  h-[230px] mr-20" key={`team-${index}`}>
                        <Image src={team.image} alt={team.name} height={138} width={138} className="min-w-[138px] aspect-square !z-20  object-cover overflow-hidden rounded-lg relative" />
                        <div className="bg-white px-2 pb-2 pt-[50px] w-[199px] h-[123px] rounded-[14px] border-[2px] border-[#E2E8F1] absolute left-[-10px] bottom-[10px] z-10">
                          <p className="text-[18px] font-bold text-[#292929] mb-[2px]">{team.name}</p>
                          <p className="text-sm text-[#292929] font-medium">{team.title}</p>
                          {/* <p className="text-xs text-[#656565] font-normal">{team.place}</p> */}
                        </div>
                      </div>
                    })}
                  </Marquee>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-6  items-center">
                    <Image src={"/background_images/tick.svg"} alt="tick" height={32} width={32} />
                    <div className="flex flex-col">
                      <p className="text-base font-bold text-[#292929]">Master industry-relevant skills</p>
                      <p className="text-sm font-medium text-[#656565]">Stay ahead of the curve by learning how leading credit unions are using Agentic Al to address operational bottlenecks, member expectations, and compliance risk—all in one go. </p>
                    </div>
                  </div>
                  <div className="flex gap-6  items-center">
                    <Image src={"/background_images/tick.svg"} alt="tick" height={32} width={32} />
                    <div className="flex flex-col">
                      <p className="text-base font-bold text-[#292929]">Hands-on experience</p>
                      <p className="text-sm font-medium text-[#656565]">Engage with real workflows, use cases, and decision logic that you can take back to your team-no buzzwords, just proven outcomes.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-center">
                    <Image src={"/background_images/tick.svg"} alt="tick" height={32} width={32} />
                    <div className="flex flex-col">
                      <p className="text-base font-bold text-[#292929]">Expanded career opportunities</p>
                      <p className="text-sm font-medium text-[#656565]">Discover how autonomous lending supports better experiences for Gen Z and Gen Alpha borrowers-and the leaders ready to serve them. </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full pb-[20px] md:pb-0 mt-[47px]" id="form">
              <div className="md:hidden bg-[#121212] p-10 absolute bottom-0 w-[200%] left-[-10%] min-h-20 h-20"></div>
              <hr className="md:hidden absolute bottom-0 z-20 w-screen left-[-6%] border-b border-[#262932]" />
              <form id="form"
                onSubmit={formik.handleSubmit}
                className="relative mx-auto z-10 mt-[43px] md:mt-0 font-plus-jakarta drop-shadow-xl w-full
           bg-white/90 backdrop-blur-sm rounded-[24px] p-8"
              >
                <div className="flex flex-col gap-[24px] text-black">
                  <h1 className="text-2xl font-bold text-[#2A5FAC] mb-[26px]" >Reserve Your Seats Now</h1>
                  <div className="flex flex-col md:flex-row gap-[24px]">
                    <div className="flex flex-col gap-[12px] w-full ">
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
                      !clicked ? 'Get in touch' : "We'll get back to you" : ''}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
          <div className="hidden lg:flex lg:flex-col flex-1 w-1/2">
            <div className="border border-[#C9D2E0] rounded-[24px] p-6 flex flex-col gap-6 bg-white">
              <h6 className="text-[#2A5FAC] text-xl font-bold">Get expert insights and practical solutions to stay competitive in a fast-evolving lending market.</h6>
              <div className="flex gap-0 overflow-x-scroll hide-scrollbar h-[230px]">
                <Marquee className="overflow-x-scroll hide-scrollbar ]"
                >
                  {carouselDataTwo.map((team, index) => {
                    return <div className="relative mr-20 h-[230px]" key={`idx-${index}`}>
                      <Image src={team.image} alt={team.name} height={138} width={138} className="min-w-[138px] aspect-square !z-20  object-cover overflow-hidden rounded-lg relative" />
                      <div className="bg-white px-2 pb-2 pt-[50px] w-[199px] h-[123px] rounded-[14px] border-[2px] border-[#E2E8F1] absolute left-[-10px] bottom-[10px] z-10">
                        <p className="text-[14px] font-bold text-[#292929] mb-[2px]">{team.name}</p>
                        <p className="text-sm text-[#292929] font-medium">{team.title}</p>
                        {/* <p className="text-xs text-[#656565] font-normal">{team.place}</p> */}
                      </div>
                    </div>
                  })}
                </Marquee>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-6  items-center">
                  <Image src={"/background_images/tick.svg"} alt="tick" height={32} width={32} />
                  <div className="flex flex-col">
                    <p className="text-base font-bold text-[#292929]" id="form">Master industry-relevant skills</p>
                    <p className="text-sm font-medium text-[#656565]">Stay ahead in your field by learning strategies that address real-world challenges.</p>
                  </div>
                </div>
                <div className="flex gap-6  items-center">
                  <Image src={"/background_images/tick.svg"} alt="tick" height={32} width={32} />
                  <div className="flex flex-col">
                    <p className="text-base font-bold text-[#292929]">Hands-on experience</p>
                    <p className="text-sm font-medium text-[#656565]">Engage with current lending issues and gain actionable solutions.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center">
                  <Image src={"/background_images/tick.svg"} alt="tick" height={32} width={32} />
                  <div className="flex flex-col">
                    <p className="text-base font-bold text-[#292929]">Expanded career opportunities</p>
                    <p className="text-sm font-medium text-[#656565]">Learn how to engage younger borrowers like Gen Z and Gen Alpha with personalized, digital-first experiences.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
