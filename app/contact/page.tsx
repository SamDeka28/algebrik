import Contact from "@/components/contact_page/contact";
import ContactUs from "@/components/contacts";
import { Metadata } from "next";

export const metadata:Metadata={
    title:"Contact Algebrik AI | Get in Touch for Lending Solutions",
    description:"Reach out to Algebrik AI for AI-powered lending solutions, product demos, support, and partnership inquiries. Connect with our team today"
}

export default function Home(){
    return(
     <>
     <main className="overflow-x-hidden">
        {/* <Contact /> */}
        <ContactUs isModal={false}/>
     </main>
     </>
    )
}