import Contact from "@/components/contact_page/contact";
import ContactUs from "@/components/contacts";
import { Metadata } from "next";

export const metadata:Metadata={
    title: "Contact-Algebrik AI | Lending Platform Experts",
    description: "Get in touch with Team at Algebrik AI for demos, partnerships, or support on our AI-powered lending platform."
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