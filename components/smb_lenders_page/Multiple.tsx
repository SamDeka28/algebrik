import Image from "next/image";

export default function Multiple() {
  return (
    <div className="container mx-auto p-4 md:mt-[5px] flex items-center justify-center font-plus-jakarta">
      <div className="md:w-[1160px] md:h-[526px] flex rounded-[42px] backdrop-blur-sm shadow-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out">

        <div className="flex md:flex-col gap-[4px] p-4 w-full md:w-1/2">
          <div className="w-full py-[42px] px-[34px]">
            <h3 className="text-white font-plus-jakarta text-[28px] font-semibold leading-[30px] pb-[12px]">Get over disjointed systems</h3>
            <p className="text-gray-300 font-plus-jakarta text-[16px] font-thin leading-[26px] mt-2 pr-10">
            SMB lenders struggle with disjointed systems, causing inefficiencies and borrower dissatisfaction.
            </p>
          </div>
          <div className="w-full flex justify-center items-center">
            <Image
              src="/section_images/auto_lenders/plays.png"
              alt="Plays Well With Others"
              width={332}
              height={231}
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="w-[3px] bg-gradient-to-b from-[#6399E700] via-[#99bcee] to-[#6399E700] opacity-50 mx-6 h-full" />

        <div className="flex md:flex-col p-4 gap-[4px] mb-6 w-full md:w-1/2">
          <div className="w-full py-[42px] px-[14px]">
            <h3 className="text-white font-plus-jakarta text-[28px] font-semibold leading-[30px] pb-[12px]">One Platform. Multiple Integrations!</h3>
            <p className="text-gray-300 font-plus-jakarta text-[16px] font-thin leading-[26px] mt-2 pr-10">
            Algebrik unifies tools and automates workflows, simplifying lending for SMB lenders effortlessly
            </p>
          </div>
          <div className="w-full flex justify-center items-center">
            <Image
              src="/section_images/auto_lenders/brings.png"
              alt="And Brings Them Together"
              width={332}
              height={231}
              className="rounded-lg"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
