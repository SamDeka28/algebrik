export default function BookADemo(){
    return(
        <div className="relative w-full sm:w-[353px] flex items-center gap-4 mt-4">
            <input
              type="email"
              placeholder="Enter your work email"
              className="w-full sm:w-[353px] h-[48px] font-plus-jakarta px-4 py-2 bg-[#3E6296] placeholder-[#C1DAFF] text-[#C1DAFF] text-[14px] font-medium rounded-[31px] focus:outline-none"
            />
            <button className="absolute w-[143px] h-[48px] font-plus-jakarta right-0 bg-[#1C8DEA] text-white text-[14px] font-medium rounded-[31px] px-6 py-2 border border-[#2F9AFB] hover:opacity-90 transition-all">
              Book a Demo
            </button>
          </div>
    )
}