import Image from "next/image";



export default function Placeholder() {
  return (
    <div className="container mx-auto p-4 md:py-[5px] md:pb-10 flex items-center justify-center font-plus-jakarta flex-col">
      <div className="flex flex-col items-center justify-center md:flex-row gap-[92px] w-full">
            <div>
                <Image src="/section_images/place.png" className="" alt="" width={556} height={543}/>
            </div>
            <div>
                <Image src="/section_images/place.png" className="" alt="" width={556} height={543}/>
            </div>
        </div>
    </div>
  );
}