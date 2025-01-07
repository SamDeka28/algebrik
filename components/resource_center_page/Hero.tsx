import BookADemo from "../BookADemo";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";

export default function Hero(){
    return(
        <div className="container mx-auto p-4 md:py-[160px] flex items-center justify-center font-plus-jakarta flex-col">
            <CustomHeader text="Welcome to the Originations Hub" className="md:pb-[20px] text-[56px] font-semibold"/>
            <CustomSubtitle text="Your guide to modern lending trends, insights, and innovations." className="md:pb-[43px]"/>
            <BookADemo/>
        </div>
    )
}