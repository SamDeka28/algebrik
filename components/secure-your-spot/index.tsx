"use client"
import { motion } from "framer-motion";
import Button from "../Buttons";
import Image from "next/image";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import Marquee from "react-fast-marquee";
import { parsePhoneNumberFromString } from "libphonenumber-js"
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  firstname: Yup.string().required("Name is required"),
  phone: Yup.string()
    .test("is-valid-phone", "Phone number is invalid", (value) =>
      validatePhoneNumber(value || "")
    )
    .required("Phone is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  company: Yup.string().required("Company name is required"),
  message: Yup.string().optional(),
});

const carouselDataTwo = [
  {
    image: "/team_images/jesse.png",
    name: "JESSE FRUGE",
    title: "VP, PRODUCT",
    place: "",
  },
  {
    image: "/team_images/andrea.png",
    name: "ANDREA SILVERS",
    title: "VP, BD & Partnerships",
    place: "",
  },
  {
    image: "/team_images/leAnne.png",
    name: "LeAnne Hixson",
    title: "Chief Lending Officer",
    place: "PFCU Credit Union, Michigan",
  },
  {
    image: "/team_images/david.png",
    name: "David Libby",
    title: "Chief Executive Officer",
    place: "Town & Country FCU, Maine",
  },
  {
    image: "/team_images/travisBow.png",
    name: "Shad Edwards",
    title: "Chief Lending Officer",
    place: "MidWest America FCU, Indiana",
  }
];

const validatePhoneNumber = (value: string) => {
  const phoneNumber = parsePhoneNumberFromString(value || "");
  return phoneNumber && phoneNumber.isValid();
};

export default function SecureYourSpot() {
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  const router=useRouter();

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
        "https://api.hsforms.com/submissions/v3/integration/submit/47671281/5ceb8f3c-3313-4338-a03c-2c0c483a0e8c",
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
        router.push("/thank_you")
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
              <h1 className="text-3xl lg:text-5xl font-bold text-[#2A5FAC] text-center leading-[60px]">Lending 2030: Beyond AI-Shaping the Future of Lending</h1>
            </div>
            <p className="text-[#292929] text-lg px-6 text-center">Join industry leaders as they unveil strategies to engage next-gen borrowers and streamline lending workflows.</p>
            <Button
              openInBlank={false}
              text="Secure Your Spot in Lending’s Next Era"
              isActive={true}
              // onClick={() => alert("Please provide the redirection page")}
              link="#form"
              customClass="bg-gradient-to-r from-blue-400 to-blue-900 text-white font-bold py-[10px] text-[14px] md:text-[16px] font-bold hover:bg-blue-500 w-full md:w-auto"
              activeStyle="bg-white text-[#292929] font-bold text-center max-w-max px-[34px] mt-[32px]"
            />
            <Image src={"/background_images/heroimagesys.png"} alt="secure your spot" width={1162} height={233} className="hidden lg:block w-full mt-[23px]" />
            <Image src={"/background_images/heroimg.png"} alt="secure your spot" width={1162} height={233} className="lg:hidden w-full mt-[23px]" />
            <div className="lg:flex py-[20px] px-[38px] justify-between w-full hidden">
              <div className="flex flex-col  items-center">
                <p className="text-lg text-[#292929] font-bold">Jesse Fruge</p>
                <p className="text-base font-medium text-[#292929]">VP, Product</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg text-[#292929] font-bold">Shad Edwards</p>
                <p className="text-base font-medium text-[#292929]">Chief Lending Officer</p>
                <p className="text-xs font-normal text-[#292929]">MidWest America FCU, Indiana</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg text-[#292929] font-bold">David Libby</p>
                <p className="text-base font-medium text-[#292929]">Chief Executive Officer</p>
                <p className="text-xs font-normal text-[#292929]">Town & Country FCU, Maine</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg text-[#292929] font-bold">LeAnne Hixson</p>
                <p className="text-base font-medium text-[#292929]">Chief Lending Officer</p>
                <p className="text-xs font-normal text-[#292929]">PFCU Credit Union, Michigan</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg text-[#292929] font-bold">Andrea Silvers</p>
                <p className="text-base font-medium text-[#292929]">VP, BD & Partnerships</p>
              </div>
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
                <p className="text-2xl font-bold text-[#292929]">Stay Ahead of the Curve</p>
                <p className="text-base text-[#656565] font-medium">Learn what the future of lending looks like and get ahead before competitors catch up.</p>
              </div>
            </div>
            <div className="relative overflow-hidden flex bg-white p-4 rounded-[16px] border border-[#C9D2E0] bg-gradient-to-t from-gray-100 to-white gap-[21px] shadow-[0px_20px_36px_0px_#0A406C1A]">
              <Image src={"/background_images/cardbg.svg"} alt="badge" width={63} height={63} className="my-5 w-[50%] aspect-square absolute top-[-80%] right-[0%] object-cover  blur-3xl  opacity-60" />
              <Image src={"/background_images/badge.svg"} alt="badge" width={63} height={63} />
              <div>
                <p className="text-2xl font-bold text-[#292929]">Access to Experts</p>
                <p className="text-base text-[#656565] font-medium">Hear from seasoned Advisory Board members who know the challenges you’re facing.</p>
              </div>
            </div>
          </div>
          <div className="flex-2">
            <div className="relative flex flex-row lg:flex-col bg-white p-4 rounded-[16px] border border-[#C9D2E0]  gap-[21px] h-full shadow-[0px_20px_36px_0px_#0A406C1A] overflow-hidden">
              <Image src={"/background_images/cardbg.svg"} alt="badge" width={63} height={63} className="my-5 w-[100%] aspect-square absolute top-[-60%] right-[-30%] object-cover  blur-3xl  opacity-60" />
              <Image src={"/background_images/badge.svg"} alt="badge" width={63} height={63} className="my-5" />
              <div>
                <p className="text-2xl font-bold text-[#292929]">Cutting-Edge<br /> Strategies</p>
                <p className="text-base text-[#656565] font-medium">Discover the latest techniques and tools that top-performing lenders are already using.</p>
              </div>
            </div>
          </div>
          <div className="flex-3 flex flex-col gap-4">
            <div className="relative overflow-hidden flex bg-white p-4 rounded-[16px] border border-[#C9D2E0] bg-gradient-to-t from-gray-100 to-white gap-[21px] shadow-[0px_20px_36px_0px_#0A406C1A]">
              <Image src={"/background_images/cardbg.svg"} alt="badge" width={63} height={63} className="my-5 w-[50%] aspect-square absolute top-[-80%] right-[0%] object-cover  blur-3xl opacity-80" />
              <Image src={"/background_images/badge.svg"} alt="badge" width={63} height={63} />
              <div>
                <p className="text-2xl font-bold text-[#292929]">Actionable Insights</p>
                <p className="text-base text-[#656565] font-medium">Walk away with clear, step-by-step guidance you can implement immediately.</p>
              </div>
            </div>
            <div className="relative overflow-hidden flex bg-white p-4 rounded-[16px] border border-[#C9D2E0] bg-gradient-to-t from-gray-100 to-white gap-[21px] shadow-[0px_20px_36px_0px_#0A406C1A]">
              <Image src={"/background_images/cardbg.svg"} alt="badge" width={63} height={63} className="my-5 w-[50%] aspect-square absolute top-[-80%] right-[0%] object-cover  blur-3xl opacity-80" />
              <Image src={"/background_images/badge.svg"} alt="badge" width={63} height={63} />
              <div>
                <p className="text-2xl font-bold text-[#292929]">Connect with Leaders</p>
                <p className="text-base text-[#656565] font-medium">Be part of a community that’s shaping the next generation of lending innovation.</p>
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
                <h6 className="text-xl font-bold text-[#292929]">Proven Strategies for Next-Gen Borrowers</h6>
                <p className="text-base font-medium text-[#656565]">Learn how to engage younger borrowers like Gen Z and Gen Alpha with personalized, digital-first experiences.</p>
              </div>
              <div className="flex flex-col gap-2">
                <h6 className="text-xl font-bold text-[#292929]">Faster Lending Workflows</h6>
                <p className="text-base font-medium text-[#656565]">Gain the tools and insights you need to speed up approvals and reduce processing times without sacrificing accuracy.</p>
              </div>
              <div className="flex flex-col gap-2">
                <h6 className="text-xl font-bold text-[#292929]">Exclusive Expert Guidance</h6>
                <p className="text-base font-medium text-[#656565]">Hear directly from industry thought leaders on what’s coming after AI and how to prepare your credit union for the future.</p>
              </div>
              <div className="flex flex-col gap-2">
                <h6 className="text-xl font-bold text-[#292929]">Future-Proofing Your Lending Strategy</h6>
                <p className="text-base font-medium text-[#656565]">Walk away with a clear plan to streamline compliance, enhance member satisfaction, and thrive in a rapidly changing market.</p>
              </div>
            </div>
            <div className="lg:hidden flex-1 mt-10">
              <div className="border border-[#C9D2E0] rounded-[24px] p-6 flex flex-col gap-6 bg-white">
                <h6 className="text-[#2A5FAC] text-xl font-bold">Get expert insights and practical solutions to stay competitive in a fast-evolving lending market.</h6>
                <div className="flex gap-20 px-[10px] overflow-x-scroll hide-scrollbar h-[230px]">
                  <Marquee>
                    {carouselDataTwo.map((team, index) => {
                      return <div className="relative  h-[230px] mr-20" key={`team-${index}`}>
                        <Image src={team.image} alt={team.name} height={138} width={138} className="min-w-[138px] aspect-square !z-20  object-cover overflow-hidden rounded-lg relative" />
                        <div className="bg-white px-2 pb-2 pt-[50px] w-[199px] h-[123px] rounded-[14px] border-[2px] border-[#E2E8F1] absolute left-[-10px] bottom-[10px] z-10">
                          <p className="text-[18px] font-bold text-[#292929] mb-[2px]">{team.name}</p>
                          <p className="text-sm text-[#292929] font-medium">{team.title}</p>
                          <p className="text-xs text-[#656565] font-normal">{team.place}</p>
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
            <div className="relative w-full pb-[20px] md:pb-0 mt-[47px]" id="form">
              <div className="md:hidden bg-[#121212] p-10 absolute bottom-0 w-[200%] left-[-10%] min-h-20 h-20"></div>
              <hr className="md:hidden absolute bottom-0 z-20 w-screen left-[-6%] border-b border-[#262932]" />
              <form
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
                    <div className="flex flex-col gap-[12px] w-full">
                      <label className="text-[#5D5A88] font-plus-jakarta text-[14px] font-bold">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        placeholder="+1 (123) 456 7890"
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
                        <p className="text-[18px] font-bold text-[#292929] mb-[2px]">{team.name}</p>
                        <p className="text-sm text-[#292929] font-medium">{team.title}</p>
                        <p className="text-xs text-[#656565] font-normal">{team.place}</p>
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
