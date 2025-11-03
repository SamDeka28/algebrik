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
  "0-1/firstname": Yup.string().required("Name is required"),
  "0-1/lastname": Yup.string().required("Last name is required"),
  "0-1/email": Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const carouselDataTwo = [
  {
    image: "/team_images/deb.png",
    name: "Deb Dietz",
    title: "CEO",
    place: "Family Financial CU",
  },
  {
    image: "/team_images/barbara.png",
    name: "Barbara Appold",
    title: "President & CEO",
    place: "United Financial CU",
  },
  {
    image: "/team_images/Jennifer.jpeg",
    name: "Jennifer Hernandez",
    title: "VP, Customer Success",
    place: "Algebrik AI",
  },
  {
    image: "/team_images/andrea.webp",
    name: "Andrea Silvers",
    title: "VP, BD & Partnerships",
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
      "0-1/firstname": "",
      "0-1/lastname": "",
      "0-1/email": ""
    },
    validationSchema,
    onSubmit: async (values: { [key: string]: string }) => {
      setClicked(true);
      setLoading(true);
      const res = await fetch(
        "https://api.hsforms.com/submissions/v3/integration/submit/47671281/99fa068a-0bc9-4ec1-af77-1fb815fe2c4e",
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
              <h1 className="text-2xl lg:text-[40px] font-bold text-[#2A5FAC] text-center lg:leading-[60px]">Make Lending Great Again: 
                <h1 className="text-xl lg:text-[40px] text-[#2A5FAC] text-center lg:leading-[60px] font-normal mt-4 lg:mt-0">Reclaiming the Heart of Credit Union Lending in the Age of AI</h1>
              </h1>

            </div>
            <p className="text-[#292929] text-lg px-6 text-center max-w-5xl">Join credit union and product leaders for a conversation on how technology, empathy, and trust are coming together to redefine modern lending.</p>
            <Button
              openInBlank={false}
              text="Reserve Your Seat to Reimagine Lending | November 20 | 2 PM EST"
              isActive={true}
              // onClick={() => alert("Please provide the redirection page")}
              link="#form"
              customClass="bg-gradient-to-r from-[#1C8DEA] to-[#195BD7] text-white font-bold py-[10px] text-[14px] md:text-[16px] font-semibold hover:bg-blue-500 w-full md:w-auto"
              activeStyle="bg-white text-[#292929] font-bold text-center max-w-max px-[34px] mt-[32px]"
            />
            <Image src={"/background_images/20nov.png"} alt="secure your spot" width={1162} height={233} className="hidden lg:block w-full mt-[23px]" />
            <Image src={"/background_images/20nov.png"} alt="secure your spot" width={1162} height={233} className="lg:hidden w-full mt-[23px]" />
            <div className="lg:flex py-[20px]  justify-between w-full hidden px-20">
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
                <p className="text-2xl font-bold text-[#292929]">Rediscover the Human Side of Lending</p>
                <p className="text-base text-[#656565] font-medium">Explore how credit unions are restoring connection and care in a world driven by automation and compliance.</p>
              </div>
            </div>
            <div className="relative overflow-hidden flex bg-white p-4 rounded-[16px] border border-[#C9D2E0] bg-gradient-to-t from-gray-100 to-white gap-[21px] shadow-[0px_20px_36px_0px_#0A406C1A]">
              <Image src={"/background_images/cardbg.svg"} alt="badge" width={63} height={63} className="my-5 w-[50%] aspect-square absolute top-[-80%] right-[0%] object-cover  blur-3xl  opacity-60" />
              <Image src={"/background_images/badge.svg"} alt="badge" width={63} height={63} />
              <div>
                <p className="text-2xl font-bold text-[#292929]">Hear from Real Credit Union Leaders </p>
                <p className="text-base text-[#656565] font-medium"> Learn directly from CEOs of Family Financial CU and UFCU Michigan as they share how purpose and technology can coexist.</p>
              </div>
            </div>
          </div>
          <div className="flex-2">
            <div className="relative flex flex-row lg:flex-col bg-white p-4 rounded-[16px] border border-[#C9D2E0]  gap-[21px] h-full shadow-[0px_20px_36px_0px_#0A406C1A] overflow-hidden">
              <Image src={"/background_images/cardbg.svg"} alt="badge" width={63} height={63} className="my-5 w-[100%] aspect-square absolute top-[-60%] right-[-30%] object-cover  blur-3xl  opacity-60" />
              <Image src={"/background_images/badge.svg"} alt="badge" width={63} height={63} className="my-5" />
              <div>
                <p className="text-2xl font-bold text-[#292929]">Balance Speed with Soul</p>
                <p className="text-base text-[#656565] font-medium">See how intelligent workflows are helping lending teams move faster while keeping empathy and transparency at the core.</p>
              </div>
            </div>
          </div>
          <div className="flex-3 flex flex-col gap-4">
            <div className="relative overflow-hidden flex bg-white p-4 rounded-[16px] border border-[#C9D2E0] bg-gradient-to-t from-gray-100 to-white gap-[21px] shadow-[0px_20px_36px_0px_#0A406C1A]">
              <Image src={"/background_images/cardbg.svg"} alt="badge" width={63} height={63} className="my-5 w-[50%] aspect-square absolute top-[-80%] right-[0%] object-cover  blur-3xl opacity-80" />
              <Image src={"/background_images/badge.svg"} alt="badge" width={63} height={63} />
              <div>
                <p className="text-2xl font-bold text-[#292929]">Get Practical Frameworks and Tools</p>
                <p className="text-base text-[#656565] font-medium">Leave with actionable takeaways to strengthen trust, simplify processes, and enhance member experience.</p>
              </div>
            </div>
            <div className="relative overflow-hidden flex bg-white p-4 rounded-[16px] border border-[#C9D2E0] bg-gradient-to-t from-gray-100 to-white gap-[21px] shadow-[0px_20px_36px_0px_#0A406C1A]">
              <Image src={"/background_images/cardbg.svg"} alt="badge" width={63} height={63} className="my-5 w-[50%] aspect-square absolute top-[-80%] right-[0%] object-cover  blur-3xl opacity-80" />
              <Image src={"/background_images/badge.svg"} alt="badge" width={63} height={63} />
              <div>
                <p className="text-2xl font-bold text-[#292929]">Join a Movement That Puts People First</p>
                <p className="text-base text-[#656565] font-medium">Be part of a growing community committed to rebuilding lending around human connection, not just digital efficiency.</p>
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
                <h6 className="text-xl font-bold text-[#292929]">A New Definition of Great Lending</h6>
                <p className="text-base font-medium text-[#656565]">Understand how the most forward-thinking credit unions are blending technology with values to create lending that feels both fast and personal.</p>
              </div>
              <div className="flex flex-col gap-2">
                <h6 className="text-xl font-bold text-[#292929]">Proven Strategies for Member Trust</h6>
                <p className="text-base font-medium text-[#656565]"> Learn how leaders are using transparency, explainable workflows, and communication clarity to rebuild confidence.</p>
              </div>
              <div className="flex flex-col gap-2">
                <h6 className="text-xl font-bold text-[#292929]">Actionable Steps for Modernization</h6>
                <p className="text-base font-medium text-[#656565]">Discover how to streamline workflows without sacrificing empathy, and how to make technology quietly serve your teams.</p>
              </div>
              <div className="flex flex-col gap-2">
                <h6 className="text-xl font-bold text-[#292929]">Frameworks for Human-First Transformation</h6>
                <p className="text-base font-medium text-[#656565]"> Leave with checklists and strategies that help your credit union modernize responsibly while staying true to its mission.</p>
              </div>
            </div>
            <div className="lg:hidden flex-1 mt-10">
              <div className="border border-[#C9D2E0] rounded-[24px] p-6 flex flex-col gap-6 bg-white">
                <h6 className="text-[#2A5FAC] text-xl font-bold">Get expert insights and practical inspiration to lead with purpose in a changing lending landscape.</h6>
                <div className="flex gap-20 px-[10px] overflow-x-scroll hide-scrollbar h-[230px]">
                  <Marquee>
                    {carouselDataTwo.map((team, index) => {
                      return <div className="relative  h-[230px] mr-20" key={`team-${index}`}>
                        <Image src={team.image} alt={team.name} height={138} width={138} className="min-w-[138px] aspect-square !z-20  object-cover overflow-hidden rounded-lg relative bg-[#fff] border-solid border-2 border-[#E2E8F1]"  />
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
                      <p className="text-sm font-medium text-[#656565]">Stay ahead of the curve by learning how successful credit unions are combining automation with human understanding to reduce friction, accelerate approvals, and improve member experience.</p>
                    </div>
                  </div>
                  <div className="flex gap-6  items-center">
                    <Image src={"/background_images/tick.svg"} alt="tick" height={32} width={32} />
                    <div className="flex flex-col">
                      <p className="text-base font-bold text-[#292929]">Hands-On Insights</p>
                      <p className="text-sm font-medium text-[#656565]">Engage with real implementation stories, workflow examples, and lessons learned from Family Financial CU and UFCU Michigan as they reimagine lending from the inside out.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-center">
                    <Image src={"/background_images/tick.svg"} alt="tick" height={32} width={32} />
                    <div className="flex flex-col">
                      <p className="text-base font-bold text-[#292929]">Expanded Leadership Perspective</p>
                      <p className="text-sm font-medium text-[#656565]">Discover how a people-first approach to modernization is shaping the next era of credit union leadership and member growth.</p>
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
                        First Name
                      </label>
                      <input
                        type="text"
                        name="0-1/firstname"
                        placeholder="John"
                        value={formik.values["0-1/firstname"]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="border border-gray-300 font-plus-jakarta rounded-[8px] p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#1C8DEA]"
                      />
                      {formik.touched["0-1/firstname"] && formik.errors["0-1/firstname"] && (
                        <p className="text-red-500 font-plus-jakarta text-sm">{formik.errors["0-1/firstname"] as string}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-[12px] w-full ">
                      <label className="text-[#5D5A88] font-plus-jakarta text-[14px] font-bold">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="0-1/lastname"
                        placeholder="Doe"
                        value={formik.values["0-1/lastname"]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="border border-gray-300 font-plus-jakarta rounded-[8px] p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#1C8DEA]"
                      />
                      {formik.touched["0-1/lastname"] && formik.errors["0-1/lastname"] && (
                        <p className="text-red-500 font-plus-jakarta text-sm">{formik.errors["0-1/lastname"] as string}</p>
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
                        name="0-1/email"
                        placeholder="example@email.com"
                        value={formik.values["0-1/email"]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="border border-gray-300 font-plus-jakarta rounded-[8px] p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#1C8DEA]"
                      />
                      {formik.touched["0-1/email"] && formik.errors["0-1/email"] && (
                        <p className="text-red-500 font-plus-jakarta text-sm">{formik.errors["0-1/email"] as string}</p>
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
              <h6 className="text-[#2A5FAC] text-xl font-bold">Get expert insights and practical inspiration to lead with purpose in a changing lending landscape.</h6>
              <div className="flex gap-0 overflow-x-scroll hide-scrollbar h-[230px]">
                <Marquee className="overflow-x-scroll hide-scrollbar ]"
                >
                  {carouselDataTwo.map((team, index) => {
                    return <div className="relative mr-20 h-[230px]" key={`idx-${index}`}>
                      <Image src={team.image} alt={team.name} height={138} width={138} className="min-w-[138px] aspect-square !z-20  object-cover overflow-hidden rounded-lg relative bg-[#fff] border-solid border-2 border-[#E2E8F1]"  />
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
                    <p className="text-sm font-medium text-[#656565]">Stay ahead of the curve by learning how successful credit unions are combining automation with human understanding to reduce friction, accelerate approvals, and improve member experience.</p>
                  </div>
                </div>
                <div className="flex gap-6  items-center">
                  <Image src={"/background_images/tick.svg"} alt="tick" height={32} width={32} />
                  <div className="flex flex-col">
                    <p className="text-base font-bold text-[#292929]">Hands-On Insights</p>
                    <p className="text-sm font-medium text-[#656565]">Engage with real implementation stories, workflow examples, and lessons learned from Family Financial CU and UFCU Michigan as they reimagine lending from the inside out.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center">
                  <Image src={"/background_images/tick.svg"} alt="tick" height={32} width={32} />
                  <div className="flex flex-col">
                    <p className="text-base font-bold text-[#292929]">Expanded Leadership Perspective</p>
                    <p className="text-sm font-medium text-[#656565]">Discover how a people-first approach to modernization is shaping the next era of credit union leadership and member growth.</p>
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
