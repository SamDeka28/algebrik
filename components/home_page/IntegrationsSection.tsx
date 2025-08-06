"use client";

import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import Image from "next/image";
import Articles from "./Articles";
import Marquee from "react-fast-marquee";
import Button from "../Buttons";
import { useRouter } from "next/navigation";

const integrations = [
  { image: "/partner_icons/allied.webp" },
  { image: "/partner_icons/autoexam.webp" },
  { image: "/partner_icons/carle.webp" },
  { image: "/partner_icons/conductiv.webp" },
  { image: "/partner_icons/corelation.webp" },
  { image: "/partner_icons/equifax.webp" },
  { image: "/partner_icons/experian.webp" },
  // { image: "/partner_icons/cuanswers.webp" },
  { image: "/partner_icons/dealertrack.webp" },
  { image: "/partner_icons/docusign.webp" },
  { image: "/partner_icons/fiserv.webp" },
  { image: "/partner_icons/jackharry.webp" },
  { image: "/partner_icons/jdpower.webp" },
  { image: "/partner_icons/lexis.webp" },
  { image: "/partner_icons/ottomoto.webp" },
  { image: "/partner_icons/plaid.webp" },
  // { image: "/partner_icons/point.webp" },
  // { image: "/partner_icons/portico.webp" },
  { image: "/partner_icons/routeone.webp" },
  // { image: "/partner_icons/scienaptic.webp" },
  { image: "/partner_icons/sentilink.webp" },
  // { image: "/partner_icons/socure.webp" },
  { image: "/partner_icons/transunion.webp" },
  { image: "/partner_icons/trustage.webp" },
  // { image: "/partner_icons/zest.webp" },
  { image: "/partner_icons/kelly.webp" },
];

export default function IntegrationsSection() {
  const router = useRouter();
  const firstHalf = integrations.slice(0, Math.floor(integrations.length / 2));
  const secondHalf = integrations.slice(Math.floor(integrations.length / 2));

  return (
    <div className="bg-white py-10">
      <div className="text-center">
        <CustomHeader text="Seamlessly Connected, Effortlessly Scaled" />
        <CustomSubtitle className="px-7 mt-[16px] md:px-0 md:mt-0 text-[14px] md:text-[20px] font-normal leading-[30px]" text="Algebrik integrates with the tools and systems you already use, creating a unified, efficient lending ecosystem." />

        <div className="relative my-20 flex flex-col gap-5">

          <Marquee
            speed={50}
            gradient={false}
            pauseOnHover={true}
            direction="left"
            className="flex items-center overflow-hidden"
          >
            {firstHalf.map((integration, index) => (
              <div
                key={index}
                className="bg-gray-50 w-[200px] h-[106px] py-[12px] px-[12px] rounded-[12px] flex items-center justify-center mx-4"
              >
                <Image
                  src={integration.image}
                  alt={`Integration ${index}`}
                  width={120}
                  height={90}
                  objectFit="scale-down"
                  priority
                  quality={100}
                />
              </div>
            ))}
          </Marquee>

          <Marquee
            speed={50}
            gradient={false}
            pauseOnHover={true}
            direction="right"
            className="flex items-center overflow-hidden"
          >
            {secondHalf.map((integration, index) => (
              <div
                key={index}
                className="bg-gray-50 w-[200px] h-[106px] py-[12px] px-[12px] rounded-[12px] flex items-center justify-center mx-4"
              >
                <Image
                  src={integration.image}
                  alt={`Integration ${index}`}
                  width={120}
                  height={120}
                  objectFit="scale-down"
                  priority
                  quality={100}
                />
              </div>
            ))}
          </Marquee>
        </div>
        <div className="mb-20">
            <Button
              text="View All Integrations"
              customClass="bg-transparent border border-[#2A5FAC] text-[#2A5FAC] hover:bg-[#2A5FAC] hover:text-white px-6 py-3 rounded-full"
              onClick={() => {
                router.push('/integrations');
              }}
            />
          </div>
      </div>
      <Articles />
    </div>
  );
}
