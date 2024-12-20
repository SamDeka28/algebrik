"use client";

import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import Image from "next/image";
import Articles from "../Articles";
import Marquee from "react-fast-marquee";

const integrations = [
  { image: "/partner_icons/allied.png" },
  { image: "/partner_icons/autoexam.png" },
  { image: "/partner_icons/carleton.png" },
  { image: "/partner_icons/conductiv.png" },
  { image: "/partner_icons/corelation.png" },
  { image: "/partner_icons/equifax.png" },
  { image: "/partner_icons/experian.png" },
  { image: "/partner_icons/cuanswers.png" },
  { image: "/partner_icons/cudl.png" },
  { image: "/partner_icons/dealertrack.png" },
  { image: "/partner_icons/docusign.png" },
  { image: "/partner_icons/fiserv.png" },
  { image: "/partner_icons/jackharry.png" },
  { image: "/partner_icons/jdpower.png" },
  { image: "/partner_icons/lexis.png" },
  { image: "/partner_icons/ottomoto.png" },
  { image: "/partner_icons/plaid.png" },
  { image: "/partner_icons/point.png" },
  { image: "/partner_icons/portico.png" },
  { image: "/partner_icons/routeone.png" },
  { image: "/partner_icons/scienaptic.png" },
  { image: "/partner_icons/sentilink.png" },
  { image: "/partner_icons/socure.png" },
  { image: "/partner_icons/transunion.png" },
  { image: "/partner_icons/trustage.png" },
  { image: "/partner_icons/zest.png" },
];

export default function IntegrationsSection() {
  const firstHalf = integrations.slice(0, Math.floor(integrations.length / 2));
  const secondHalf = integrations.slice(Math.floor(integrations.length / 2));

  return (
    <div className="bg-white py-10">
      <div className="text-center">
        <CustomHeader text="Seamlessly Connected, Effortlessly Scaled" />
        <CustomSubtitle text="Algebrik integrates with the tools and systems you already use, creating a unified, efficient lending ecosystem." />

        <div className="relative my-[33px] flex flex-col gap-5">
          <Marquee speed={50} gradient={false} pauseOnHover={true} direction="right">
            {firstHalf.map((integration, index) => (
              <div
                key={index}
                className="bg-gray-50 w-[150px] h-[56px] py-[12px] px-[12px] rounded-[12px] flex items-center justify-center mx-4"
              >
                <Image
                  src={integration.image}
                  alt={`Integration ${index}`}
                  width={100}
                  height={100}
                  objectFit="contain"
                  quality={100}
                />
              </div>
            ))}
          </Marquee>

          <Marquee speed={50} gradient={false} pauseOnHover={true} direction="left">
            {secondHalf.map((integration, index) => (
              <div
                key={index}
                className="bg-gray-50 w-[150px] h-[56px] py-[12px] px-[12px] rounded-[12px] flex items-center justify-center mx-4"
              >
                <Image
                  src={integration.image}
                  alt={`Integration ${index}`}
                  width={150}
                  height={75}
                  className="object-contain"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>

      <Articles />
    </div>
  );
}
