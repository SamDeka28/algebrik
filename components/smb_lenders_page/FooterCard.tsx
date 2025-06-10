"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Contact from '../contacts';


type CardProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
  imageUrl?: string;
  isPrimary?: boolean;
  handleClick?: () => void;
};

const Card = ({ title, description, buttonLink, buttonText, imageUrl, isPrimary, handleClick }: CardProps) => {

  const cardClasses = `w-[100%] h-[322px] md:w-[570px] md:h-[374px] p-6 md:p-16 rounded-[20px] md:rounded-lg shadow-lg flex flex-col justify-between ${isPrimary ? "text-white bg-gradient-to-b from-[#0057A3]/90 to-[#003B73]/90" : "text-[#2A5FAC] bg-white z-2"
    }`;

  const buttonClasses = isPrimary
    ? "bg-white text-[#292929] hover:bg-gray-200"
    : "border-2 border-[#2A5FAC] text-[#292929] hover:bg-[#003B73] hover:text-white";


  return (
    <div
      className={`relative ${cardClasses}`}
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: imageUrl ? undefined : "#f0f0f0",
      }}
    >
      <div className='font-plus-jakarta'>
        <h2 className={`text-[28px] md:text-[36px] font-bold mb-4 ${!isPrimary ? "text-[#2A5FAC]" : ""}`}>{title}</h2>
        <p className={`mb-6 text-[18px] font-normal ${!isPrimary ? "text-[#2A5FAC]" : ""}`}>{description}</p>
      </div>
      {!handleClick && buttonLink ? <Link href={buttonLink} passHref target='_blank'>
        <button
          className={`w-full md:w-[194px] md:h-[42px] text-[14px] font-bold py-2 px-4 rounded-[20px] transition ${buttonClasses}`}
        >
          {buttonText}
        </button>
      </Link> : <button
        className={`w-full md:w-[194px] md:h-[42px] text-[14px] font-bold py-2 px-4 rounded-[20px] transition ${buttonClasses}`}
        onClick={handleClick}
      >
        {buttonText}
      </button>}
    </div>
  );
};

const FooterCard = () => {
  const [isSolutionsPage, setIsSolutionsPage] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('solutions')) {
      setIsSolutionsPage(true);
    } else {
      setIsSolutionsPage(false);
    }
  }, []);
  return (
    <div className="relative font-plus-jakarta">
      <div className={`absolute top-1/2 left-0 w-full h-1/2 ${isSolutionsPage ? '' : 'bg-[#121212]'} -z-10`}></div>
      <div className="flex flex-col md:flex-row gap-6 mx-auto max-w-7xl px-4 pt-16 md:pt-0 md:py-28 relative z-10 justify-center">
        <Card
          title="Let’s Scale your Lending Processes Together"
          description="Talk to our experts and explore how Algebrik can solve your unique lending challenges."
          buttonText="Schedule a Demo Call"
          handleClick={() => {
            setShowContactModal(true);
          }}
          imageUrl="/background_images/futureLending.webp"
          isPrimary
        />
        <Card
          title="Experience Algebrik Firsthand"
          description="Take a guided tour of our platform to explore its features at your own pace."
          buttonText="Get tour"
          buttonLink="https://app.storylane.io/demo/9gq55pwnefgy?embed=inline"
          imageUrl="/background_images/algebrikFirsthand.webp"
        />
      </div>
      <Contact open={showContactModal} onClose={() => setShowContactModal(false)} />
    </div>
  );
};

export default FooterCard;
