import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Crown, Star, Users } from 'lucide-react';
import Modal from "./Modal";
import PRNewswireModal from "./PRNewswireModal";
const EliteHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [showPRModal, setShowPRModal] = useState(false);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
        if (timeoutId) clearTimeout(timeoutId);
      }
    }, { threshold: 0.3 });
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    // Mobile fallback: if not visible after 1s, show content
    if (typeof window !== 'undefined' && window.innerWidth < 700) {
      timeoutId = setTimeout(() => {
        setIsVisible(true);
        observer.disconnect();
      }, 1000);
    }
    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);
  const scrollToForm = () => {
    const formElement = document.getElementById('lead-form');
    formElement?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const parallaxOffset = scrollY * 0.3;
  return <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden" style={{
    background: 'var(--gradient-hero)'
  }}>
    {/* Sophisticated Background Elements */}
    <div className="absolute inset-0 opacity-5" style={{
      transform: `translateY(${parallaxOffset}px)`
    }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `\n            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),\n            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)\n          `,
        backgroundSize: '60px 60px'
      }} />
    </div>

    {/* Minimal Floating Elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-32 right-32 w-24 h-24 border border-white/10 rounded-full animate-float" />
      <div className="absolute bottom-40 left-40 w-16 h-16 bg-white/5 rounded-lg backdrop-blur-sm animate-float" style={{
        animationDelay: '3s'
      }} />
    </div>

    {/* Main Content */}
    <div className="container mx-auto px-6 lg:px-12 relative z-10 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-screen">

          {/* Left Content */}
          <div className="lg:col-span-8 space-y-8 pt-10 pb-0  lg:py-20">

            {/* Elite Status Badge */}
            <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-teal-500/20 to-teal-400/20 backdrop-blur-md border border-teal-300/30">
              <Crown className="w-4 h-4 text-teal-300" />
              <span className="font-poppins font-medium text-sm text-teal-100">Elite Early Adopter Program</span>
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            </div>
            </div>

            {/* Elite Headline */}
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>                <h1 className="heading-hero mb-6">
              <span className="block">Join the Elite 10</span>
              <span className="block text-teal-200">
                AI Lending Pioneers
              </span>
            </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-teal-400 rounded-full mb-6" />
            </div>

            {/* Professional Urgency */}
            <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="space-y-4">
                <p className="text-xl font-semibold text-white leading-relaxed">
                  United Financial Credit Union became <span className="text-teal-200 font-bold">Elite Early Adopter #1</span> —
                  securing first-mover advantage in AI-powered lending.
                </p>
                <p className="text-lg text-gray-100 max-w-3xl leading-relaxed">
                  Only <span className="font-bold text-teal-200">6 spots remain</span> in Algebrik AI's exclusive
                  Elite Early Adopter Program. The future of lending technology is available to select institutions only.
                </p>
              </div>
            </div>

            {/* Elite CTA */}
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-600 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <button onClick={scrollToForm} className="btn-primary group inline-flex items-center gap-3 hover:text-white">
                <span className="relative z-10 flex items-center gap-3">
                  <Crown className="w-5 h-5" />
                  <span>Make your Member's Experience Better</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
              <button
                className="btn-secondary group inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white"
                onClick={() => setShowPRModal(true)}
              >
                <span>Read Official Announcement</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <PRNewswireModal
                open={showPRModal}
                onClose={() => setShowPRModal(false)}
                url="https://thecreditunionconnection.com/united-financial-credit-union-selects-algebrikais-comprehensive-consumer-lending-suite-algebrik-one/"
              />
            </div>

            {/* Professional Urgency Messaging */}
            <div className={`text-center mt-6 transition-all duration-1000 delay-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>                <p className="text-teal-200 text-sm font-medium">
              The AI revolution in lending has begun • Elite program closes when 10 institutions are reached
            </p>
            </div>

            {/* Elite Program Stats */}
            <div className={`grid grid-cols-3 gap-8 pt-8 transition-all duration-1000 delay-800 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>                {[{
              value: '4',
              label: 'UFCU - First Elite Adopter',
              highlight: true
            }, {
              value: '6',
              label: 'Remaining Elite Spots',
              highlight: true
            }, {
              value: '40%',
              label: 'Faster Processing Proven',
              highlight: false
            }].map((stat, index) => <div key={stat.label} className="text-center">
              <div className={`font-poppins font-bold text-2xl lg:text-3xl mb-1 ${stat.highlight ? 'text-teal-300' : 'text-white'}`}>                      {stat.value}
              </div>
              <div className="font-opensans text-sm text-gray-300">
                {stat.label}
              </div>
            </div>)}
            </div>
          </div>

          {/* Right Content - Elite Status Visual */}
          <div className={`lg:col-span-4 mb-28 lg:mb-0 relative transition-all duration-1000 delay-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>              <div className="relative h-96 lg:h-[500px]">
            <div className="relative w-full h-full bg-gradient-to-br from-teal-500/10 to-teal-400/10 backdrop-blur-lg rounded-3xl border border-teal-300/30 p-8 overflow-hidden">

              {/* Elite Status Header */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-500 rounded-2xl flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-poppins font-semibold text-white">Elite Program</div>
                    <div className="font-opensans text-xs text-teal-200">Limited to 10 Institutions</div>
                  </div>
                </div>
              </div>

              {/* Elite Status Grid */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-400/20 rounded-2xl p-4 border border-green-400/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-green-400" />
                    <div className="text-xs font-opensans text-green-300">Elite Adopter #1</div>
                  </div>
                  <div className="text-lg font-poppins font-bold text-white">UFCU</div>
                  <div className="text-xs text-green-300">Under Implementation & Leading</div>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 border border-teal-300/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-teal-400" />
                    <div className="text-xs font-opensans text-teal-300">Available Spots</div>
                  </div>
                  <div className="text-lg font-poppins font-bold text-white">6 Remaining</div>
                  <div className="text-xs text-teal-300">Elite Status Open</div>
                </div>
              </div>

              {/* Elite Benefits Preview */}
              <div className="mt-6 space-y-2">
                <div className="text-xs font-opensans text-gray-300 mb-3">Elite Benefits</div>
                {['First-mover market advantage', 'Exclusive AI technology access', 'Strategic competitive positioning'].map((benefit, index) => <div key={benefit} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
                  <div className="text-xs text-gray-200">{benefit}</div>
                </div>)}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
        <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
      </div>
    </div>
  </section>;
};
export default EliteHeroSection; 