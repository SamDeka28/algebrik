import { CustomHeader, CustomSubtitle } from "../CustomHeader";

const cardData = [
  {
    number: "01",
    title: "Automated Document Verification",
    description: "Validate borrower documents in seconds, reducing manual errors.",
  },
  {
    number: "02",
    title: "KYC and Risk Analysis",
    description: "Streamline compliance with real-time identity checks, risk analysis, and anomaly detection.",
  },
  {
    number: "03",
    title: "Credit Scoring",
    description: "Leverage AI-driven credit scoring and predictive analytics to make smarter, faster loan approvals.",
  },
  {
    number: "04",
    title: "Borrower Assistance",
    description: "Guide borrowers through applications with instant responses and real-time updates.",
  },
  {
    number: "05",
    title: "Adaptive Workflow Automation",
    description: "Provide actionable insights to improve decision-making and borrower targeting.",
  },
  {
    number: "06",
    title: "Agreement Explainer",
    description: "Simplify complex loan agreements into easy-to-understand language for borrowers.",
  },
];

const AICoreSection = () => {
  return (
    <div
      className="mx-auto p-4 md:p-8 flex flex-col justify-center items-center gap-8"
      style={{
        backgroundImage: "url('/background_images/modern_lender.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundPositionY: "150px",
      }}
    >
      <div className="container flex flex-col justify-center items-center text-center gap-5">
        <CustomHeader className="text-[48px]" text="AI at the Core: Driving Precision and Speed" />
        <CustomSubtitle
          className="px-64 text-[20px]"
          text="From automation to intelligent insights, Algebrik's AI-powered tools enhance every stage of the loan lifecycle, enabling lenders to deliver faster, smarter, and more accurate outcomes."
        />
      </div>

      <div className="container relative flex justify-center opacity-[30%] z-[-1]">
        <div className="absolute top-32 left-[546px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full w-[794.87px] h-[392.59px] blur-3xl animate-fadeIn" />
        <div className="absolute top-36 left-[20px] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full w-[735.08px] h-[458.69px] blur-[228px] -z-10 animate-fadeIn delay-200" />
        <div className="absolute top-48 bottom-[10px] bg-[#BE95FF] rounded-full w-[1131.09px] h-[392.59px] blur-[228px] z-[-1] animate-fadeIn delay-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10 items-center">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="relative px-6 py-8 rounded-[20px] shadow-[0_16px_52px_0px_rgba(10,64,108,0.1)] backdrop-blur-lg bg-white/60 border border-[#CAD3E0] flex flex-col justify-between"
            style={{
              width: "370px",
              height: "276px",
              background:
                "linear-gradient(80deg, rgba(255, 255, 255, 0.7), rgba(230, 245, 255, 0.5))",
            }}
          >
            <div >
              <div className="flex items-center gap-4 justify-between mb-4">
                <p
                  className="text-[72px] font-bold leading-none font-plus-jakarta text-[#D3E5FF]"
                  style={{ WebkitTextStroke: "2px rgb(28, 141, 234, 100%)" }}
                >
                  {card.number}
                </p>
              </div>
              <h2 className="text-[#2A5FAC] text-[24px] font-bold font-plus-jakarta leading-[34px] mt-[16px] mb-[8px]">
                {card.title}
              </h2>
              <p className="text-[#292929] text-[16px] font-normal font-plus-jakarta leading-6">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AICoreSection;
