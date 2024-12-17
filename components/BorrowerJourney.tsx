// "use client";

// import { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import Image from "next/image";

// const data = [
//   {
//     category: "SIMPLIFIED APPLICATION",
//     subcategories: [
//       { name: "Smart Onboarding", image: "/images/onboarding.png" },
//       { name: "Guided Borrower Flow", image: "/images/borrower-flow.png" },
//       { name: "Smart Pre-Filling", image: "/images/pre-filling.png" },
//       { name: "Omnichannel Access", image: "/images/omnichannel.png" },
//     ],
//   },
//   {
//     category: "INTELLIGENT VERIFICATION",
//     subcategories: [
//       { name: "ID Verification", image: "/images/id-verification.png" },
//       { name: "Document Validation", image: "/images/doc-validation.png" },
//     ],
//   },
//   {
//     category: "AGILE DECISIONING",
//     subcategories: [
//       { name: "Credit Scoring", image: "/images/credit-scoring.png" },
//       { name: "Risk Assessment", image: "/images/risk-assessment.png" },
//     ],
//   },
//   {
//     category: "EFFORTLESS CLOSING",
//     subcategories: [
//       { name: "Seamless Loan Closure", image: "/images/loan-closure.png" },
//     ],
//   },
// ];

// export default function BorrowerJourney() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end end"],
//   });

//   // Calculate step-based animations for each category and subcategory
//   const categorySteps = data.map((_, i) => [
//     i / data.length,
//     (i + 0.7) / data.length,
//     (i + 1) / data.length,
//   ]);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative h-[500vh] bg-gradient-to-b from-white to-gray-50"
//     >
//       <div className="flex h-full">
//         {/* Sidebar */}
//         <aside className="sticky top-0 h-screen w-[25%] bg-white shadow-lg p-6 overflow-hidden">
//           {data.map((category, i) => {
//             const categoryOpacity = useTransform(
//               scrollYProgress,
//               categorySteps[i],
//               [0, 1, 0]
//             );

//             return (
//               <motion.div
//                 key={i}
//                 style={{ opacity: categoryOpacity }}
//                 className="mb-8"
//               >
//                 <h2 className="text-lg font-bold text-gray-800 mb-2">
//                   {category.category}
//                 </h2>
//                 <ul>
//                   {category.subcategories.map((sub, j) => (
//                     <motion.li
//                       key={j}
//                       className="py-2 pl-4 text-gray-600 border-l-2 border-gray-300 hover:text-blue-600 hover:border-blue-600 transition"
//                     >
//                       {sub.name}
//                     </motion.li>
//                   ))}
//                 </ul>
//               </motion.div>
//             );
//           })}
//         </aside>

//         {/* Content Section */}
//         <div className="relative w-[75%] flex flex-col">
//           {data.map((category, i) => (
//             <div key={i} className="h-screen flex flex-col justify-center">
//               {category.subcategories.map((sub, j) => {
//                 const subOpacity = useTransform(
//                   scrollYProgress,
//                   categorySteps[i],
//                   [0, 1, 0]
//                 );

//                 return (
//                   <motion.div
//                     key={j}
//                     style={{ opacity: subOpacity }}
//                     className="h-screen flex items-center justify-center"
//                   >
//                     <Image
//                       src={sub.image}
//                       alt={sub.name}
//                       width={700}
//                       height={500}
//                       className="rounded-lg shadow-lg"
//                     />
//                   </motion.div>
//                 );
//               })}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
