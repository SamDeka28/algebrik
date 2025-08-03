import { useState, useEffect, useRef } from 'react';
import { Crown, ArrowRight, Calendar, CheckCircle, Users, Clock } from 'lucide-react';
import Contact from '../contacts';
const EliteActionSection = () => {
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openContact,setOpenContact]=useState(false)
  // useEffect(() => {
  //   let timeoutId: NodeJS.Timeout | undefined;
  //   if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
  //     setIsVisible(true);
  //     return;
  //   }
  //   const observer = new IntersectionObserver(([entry]) => {
  //     if (entry.isIntersecting) {
  //       setIsVisible(true);
  //       observer.disconnect();
  //       if (timeoutId) clearTimeout(timeoutId);
  //     }
  //   }, { threshold: 0.3 });
  //   if (sectionRef.current) {
  //     observer.observe(sectionRef.current);
  //   }
  //   // Mobile fallback: if not visible after 1s, show content
  //   if (typeof window !== 'undefined' && window.innerWidth < 700) {
  //     timeoutId = setTimeout(() => {
  //       setIsVisible(true);
  //       observer.disconnect();
  //     }, 1000);
  //   }
  //   return () => {
  //     observer.disconnect();
  //     if (timeoutId) clearTimeout(timeoutId);
  //   };
  // }, []);
  const scrollToForm = () => {
    const formElement = document.getElementById('lead-form');
    formElement?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const openCalendar = () => {
    setOpenContact(true);
  };
  return <section ref={sectionRef} className="relative py-20 lg:py-32 overflow-hidden" style={{
    background: 'var(--gradient-hero)'
  }}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center text-white">
          {/* Executive Decision Header */}
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
              <Crown className="w-4 h-4 text-teal-300" />
              <span className="font-poppins font-medium text-sm">Executive Decision Point</span>
            </div>
            <h2 className="heading-hero mb-8">
              <span className="block">Secure Your Institution's</span>
              <span className="block bg-gradient-to-r from-teal-200 via-white to-teal-200 bg-clip-text text-transparent">Elite Status</span>
            </h2>
            <p className="body-large text-white max-w-3xl mx-auto mb-12" style={{color:"#fff"}}>
              UFCU among others made the strategic decision to lead. Join them in the Elite Early Adopter Program before the remaining 6 spots are claimed by your competitors.
            </p>
          </div>
          {/* Elite Status Visual */}
          <div className={`mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-2xl mx-auto">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <div className="font-poppins font-bold text-2xl text-green-400 mb-2">4</div>
                  <div className="text-sm text-green-300">UFCU - Under Implementation</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-teal-400" />
                  </div>
                  <div className="font-poppins font-bold text-2xl text-teal-400 mb-2">6</div>
                  <div className="text-sm text-teal-300">Spots Remaining</div>
                </div>
              </div>
            </div>
          </div>
          {/* Application Process */}
          {/* <div className={`mb-12 transition-all duration-1000 delay-400 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[{
              step: '1',
              title: 'Executive Strategy Session',
              description: 'C-level discussion on AI transformation strategy',
              duration: '45 minutes'
            }, {
              step: '2',
              title: 'Elite Program Evaluation',
              description: 'Assessment of strategic fit and implementation readiness',
              duration: '2-3 days'
            }, {
              step: '3',
              title: 'Elite Status Confirmation',
              description: 'Formal invitation and implementation timeline',
              duration: '1 week'
            }].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                  <span className="font-poppins font-bold text-teal-300">{step.step}</span>
                </div>
                <h4 className="font-poppins font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-blue-100 text-sm mb-2">{step.description}</p>
                <div className="inline-flex items-center gap-2 text-teal-300 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>{step.duration}</span>
                </div>
              </div>
            ))}
            </div>
          </div> */}
          {/* Urgency Messaging */}
          <div className={`mt-12 transition-all duration-1000 delay-800 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-3xl mx-auto">
              <h4 className="font-poppins font-semibold text-teal-300 mb-3">Market Reality</h4>
              <p className="text-blue-100 text-sm leading-relaxed">
                The AI transformation in lending is accelerating rapidly. UFCU understood that being first provides lasting competitive advantage. Each month of delay increases implementation costs and reduces market differentiation opportunity. The Elite Early Adopter Program ensures your institution captures maximum strategic value from AI-powered lending technology.
              </p>
            </div>
          </div>
          {/* Final Elite Messaging */}
          <div className={`mt-8 transition-all duration-1000 delay-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <p className="text-teal-200 font-medium">
              Elite Early Adopter Program • Limited to 10 Institutions • 6 Spots Remaining
            </p>
          </div>
           {/* Primary CTA */}
           <div className={`space-y-6 transition-all duration-1000 delay-600 mt-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="text-center">
              <button onClick={openCalendar} className="btn-secondary group inline-flex items-center gap-3">
                <Calendar className="w-5 h-5" />
                <span>Schedule Executive Strategy Session</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Contact open={openContact} onClose={() => setOpenContact(false)} />
    </section>;
};
export default EliteActionSection; 