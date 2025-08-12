import { Button } from "../LendingHealthCheck/ui/button";
import { ArrowDown, Play, Calendar, Users } from "lucide-react";
import { useState, useEffect } from "react";

import dynamic from "next/dynamic";
import ReactDOM from "react-dom";
const Contact = dynamic(() => import("../contacts"), { ssr: false });

function ContactModalPortal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (typeof window === "undefined") return null;
  return ReactDOM.createPortal(
    <Contact open={open} onClose={onClose} />,
    document.body
  );
}

const HeroSection = ({openModal}:{openModal:()=>void}) => {
  const [showContactModal,setShowContactModal]=useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown to webinar date (example: 7 days from now)
  useEffect(() => {
    const webinarDate = new Date();
    webinarDate.setDate(webinarDate.getDate() + 7);
    webinarDate.setHours(14, 0, 0, 0); // 2:00 PM

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = webinarDate.getTime() - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
          minutes: Math.floor(distance % (1000 * 60 * 60) / (1000 * 60)),
          seconds: Math.floor(distance % (1000 * 60) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const scrollToDemo = () => {
    document.getElementById('demo-section')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const scrollToRegistration = () => {
    document.getElementById('cta-section')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-subtle pt-20 lg:pt-0">
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,hsl(var(--primary))_1px,transparent_0)] bg-[size:20px_20px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-20 lg:pt-0 text-center">
        {/* Webinar Badge */}
        <div className="animate-fade-in-up mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20 glass-morphism">
            <div className="w-2 h-2 bg-success rounded-full animate-gentle-pulse" />
            <span className="text-sm font-medium">Agentic AI in Action</span>
          </div>
        </div>

        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-foreground">
            Meet the Future of{" "}
            <span className="text-gradient">Lending</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8">
            Your Virtual Loan Officer, Powered by Algebrik AI
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">Experience the first-ever AI-native lending assistant. Conversational, Intelligent, Instant.</p>
        </div>

        {/* Countdown Timer */}
        

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up">
          <Button onClick={()=>setShowContactModal(true)} size="lg" className="bg-primary hover:bg-primary-dark text-primary-foreground font-bold py-4 px-8 text-lg rounded-full hover-lift glow-primary">
            <Calendar className="mr-3 h-6 w-6" />
            Schedule a Demo With Us
          </Button>
          <Button onClick={openModal} variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold py-4 px-8 text-lg rounded-full hover-lift">
            <Play className="mr-3 h-6 w-6" />
            See In Action          
          </Button>
        </div>

        {/* Social Proof */}
        <div className="mt-16 animate-fade-in-up">
          <div className="flex items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm"> Instant Pre-qualification</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="text-sm">Future of Lending</div>
            <div className="w-px h-4 bg-border" />
            <div className="text-sm">Fully Encrypted </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex items-center justify-center animate-bounce mt-20 cursor-pointer" onClick={scrollToDemo} >
          <ArrowDown className="h-8 w-8 text-primary opacity-60" />
        </div>
      </div>
      <ContactModalPortal open={showContactModal} onClose={() => setShowContactModal(false)} />
    </section>;
};
export default HeroSection;