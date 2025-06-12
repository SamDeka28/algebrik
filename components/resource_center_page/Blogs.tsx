// import Image from "next/image";
// import Link from "next/link";
// import { blogContent } from "../constant/blogs";

// const newsArticles = [
//   {
//     title:
//     "Scienaptic AI co-founder steps down to launch new venture, Algebrik AI",
//   author: "Prateek Samantaray",
//   role: "Marketing",
//   link: "https://www.fintechfutures.com/2024/09/scienaptic-ai-co-founder-steps-down-to-launch-new-venture-algebrik-ai/",
//     image: "/icons/evan-gerdisch.webp",
//   },
//   {
//     title: "Algebrik AI Secures $4M in Series A to Disrupt the Global Loan Origination Software Market",
//     author: "Prateek Samantaray",
//     role: "Marketing",
//     link: "https://www.businesswire.com/news/home/20241104357477/en/Algebrik-AI-Secures-4M-in-Series-A-to-Disrupt-the-Global-Loan-Origination-Software-Market",
//     image: "/icons/evan-gerdisch.webp",
//   },
//   {
//     title: "Algebrik AI Expands Founding Leadership Team with the Appointment of Jesse Frugé as VP of Product Management",
//     author: "Prateek Samantaray",
//     role: "Marketing",
//     link: "https://finance.yahoo.com/news/algebrik-ai-expands-founding-leadership-120000953.html",
//     image: "/icons/evan-gerdisch.webp",
//   },
//   {
//     title: "Algebrik AI Strengthens Founding Leadership with Appointment of Andrea Silvers as VP of Business Development & Partnerships",
//   author: "Prateek Samantaray",
//   role: "Marketing",
//   link: "https://www.businesswire.com/news/home/20241005942200/en/Algebrik-AI-Strengthens-Founding-Leadership-with-Appointment-of-Andrea-Silvers-as-VP-of-Business-Development-Partnerships",
//     image: "/icons/evan-gerdisch.webp",
//   },
//   {
//     title: "Algebrik AI: $4 Million (Series A) Raised To Advance Cloud-Native Loan Origination Platform",
//     author: "Prateek Samantaray",
//     role: "Marketing",
//     link: "https://pulse2.com/algebrik-ai-4-million-series-a-raised-to-advance-cloud-native-loan-origination-platform/amp/",
//     image: "/icons/evan-gerdisch.webp",
//   }
// ];




// export default function Blogs() {
//   return (
//     <section className="container mx-auto max-w-[1160px] py-[40px] px-6 rounded-[36px] mt-10">
//       <div className="flex flex-col items-center justify-center font-plus-jakarta">

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {newsArticles.map((article, index) => (
//             <div
//               key={index}
//               className="bg-white max-w-[360px] h-[428px] text-gray-900 rounded-[20px] shadow p-6 relative flex flex-col"
//             >
//               <div className="flex flex-col flex-grow">
//                 <div className="h-[269px]">
//                   <h6 className="text-gray-400 tracking-widest text-[14px] font-bold uppercase mb-2">
//                     News
//                   </h6>
//                   <p className="font-bold mb-4 text-[20px]">{article.title}</p>
//                 </div>
//                 <div className="flex items-center">
//                   <Image
//                     src={article.image}
//                     alt={`Image of ${article.author}`}
//                     width={60}
//                     height={60}
//                     className="object-cover rounded-full"
//                     quality={100}
//                   />
//                   <div className="flex flex-col justify-center pl-3">
//                     {/* <p className="text-[#333333] text-[14px] font-extrabold">
//                       {article.author}
//                     </p>
//                     <p className="text-gray-600 text-[12px]">{article.role}</p> */}
//                   </div>
//                 </div>
//               </div>
//               <div className="absolute bottom-0 left-0 flex justify-center w-full bg-white text-center py-3 h-[54px] rounded-b-[20px]">
//                 <Link href={article.link} className="text-[#1A69DC] font-semibold">
//                   Read More →
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
//           {blogContent.map((blog, index) => (
//             <div
//               key={index}
//               className="bg-white max-w-[360px] h-[528px] text-gray-900 rounded-[20px] shadow p-6 relative flex flex-col"
//             >
//               <div className="h-[269px]">
//                 <Image
//                   src={blog.blogImage}
//                   alt={`Image for ${blog.blogTitle}`}
//                   width={360}
//                   height={209}
//                   className="rounded-md object-cover"
//                   quality={100}
//                 />
//                 <h6 className="text-gray-400 tracking-widest text-[14px] font-bold uppercase md:mt-4 mb-2">
//                   Blog
//                 </h6>
//                 <p className="font-bold mt-4 text-[20px]">{blog.blogTitle}</p>
//               </div>
//               <div className="absolute bottom-0 left-0 flex justify-center w-full cursor-pointer bg-white text-center h-[54px] rounded-b-[20px]">
//                 <Link href={`/resource_center/blogs/${blog.blogTitle.toLowerCase().replace(/ /g, "-")}`} className="text-[#1A69DC] font-semibold">
//                   Read More →
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }