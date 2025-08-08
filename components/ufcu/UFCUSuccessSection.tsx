import { useState, useEffect, useRef } from 'react';
import { Quote, TrendingUp, Clock, Award, CheckCircle, UserPlus, Wallet, Monitor, Scale, PieChart, Crown, ArrowRight } from 'lucide-react';

const HubspotMeetingEmbed = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMeetings = () => {
      if (window.HubSpotMeetings) {
        window.HubSpotMeetings.loadMeetings();
      } else {
        setTimeout(loadMeetings, 1000); // Retry after 1 second if not loaded
      }
    };

    // Load the script
    if (!document.getElementById('hs-meetings-embed-script')) {
      const script = document.createElement('script');
      script.id = 'hs-meetings-embed-script';
      script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
      script.async = true;
      script.onload = loadMeetings;
      document.body.appendChild(script);
    } else {
      loadMeetings();
    }

    // Cleanup
    return () => {
      const script = document.getElementById('hs-meetings-embed-script');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="meetings-iframe-container pt-20"
      data-src="https://meetings-na2.hubspot.com/algebrik/ufcu-win?embed=true"
      style={{  width: '100%' }}
    />
  );
};

const UFCUSuccessSection = () => {
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
    <div id="lead-form">
      <HubspotMeetingEmbed/>
    </div>
    <section
      ref={sectionRef}
      className="relative pt-10 lg:pt-10 overflow-hidden"
      style={{
        // background: 'linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--background)) 100%)'
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 mb-6">
              <Award className="w-4 h-4 text-primary" />
              <span className="font-poppins font-medium text-sm text-primary">Elite Early Adopter #1 Success Story</span>
            </div>
            <h2 className="heading-section text-foreground mb-6 text-2xl lg:text-4xl font-bold">
              UFCU: First-Mover Advantage
              <span className="block text-primary mt-5">in AI-Powered Lending</span>
            </h2>
            <p className="body-large text-muted-foreground max-w-3xl mx-auto">
              See the measurable results from becoming the first Elite Early Adopter of Algebrik One
            </p>
          </div>

          {/* UFCU Logo and Elite Badge */}
          <div className={`flex justify-center mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}>
            <div className="relative">
              <div className="bg-card rounded-3xl p-8 border border-border shadow-lg">
                <div className="flex items-center gap-6">
                  <img
                    src="/ufcu-assets/ufcu.png"
                    alt="United Financial Credit Union"
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <h3 className="font-poppins font-bold text-xl text-foreground">United Financial Credit Union</h3>
                    <p className="text-muted-foreground">Saginaw, Michigan</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="px-3 py-1 bg-primary/10 rounded-full">
                        <span className="text-xs font-medium text-primary">Elite Early Adopter #1</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          </div>

          {/* UFCU Implementation Modules */}
          <div className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}>
            <div className="text-center mb-8">
              <h3 className="font-poppins font-bold text-xl text-foreground mb-2">
                UFCU Implementation Modules
              </h3>
              <p className="text-muted-foreground">
                Complete AI-powered lending suite deployed
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { title: 'Digital Account Opening', icon: UserPlus, delay: '400ms' },
                { title: 'Point of Sales (PoS)', icon: Wallet, delay: '500ms' },
                { title: 'Lenders Cockpit (LoS)', icon: Monitor, delay: '600ms' },
                { title: 'Decisioning Engine', icon: Scale, delay: '700ms' },
                { title: 'Portfolio Analytics', icon: PieChart, delay: '800ms' }
              ].map((module, index) => (
                <div
                  key={module.title}
                  className={`group bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-all duration-500 hover:border-primary/30 hover:bg-card/80 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: module.delay }}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                      <module.icon className="w-6 h-6 text-primary group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <div className="font-poppins font-medium text-sm text-foreground group-hover:text-primary transition-colors duration-300">
                      {module.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Success Metrics Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}>
            {[
              {
                icon: TrendingUp,
                value: '90%',
                label: 'Reduction in Abandonment',
                description: 'From industry standard to best-in-class',
                color: 'text-green-600'
              },
              {
                icon: Clock,
                value: '40%',
                label: 'Faster Processing',
                description: 'Measurable efficiency gains',
                color: 'text-blue-600'
              },
              {
                icon: Award,
                value: '94.2%',
                label: 'Approval Rate',
                description: 'AI-powered decision accuracy',
                color: 'text-purple-600'
              },
              {
                icon: CheckCircle,
                value: 'First',
                label: 'Market Position',
                description: 'Leading AI adoption in lending',
                color: 'text-primary'
              }
            ].map((metric, index) => (
              <div key={metric.label} className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-background flex items-center justify-center ${metric.color}`}>
                    <metric.icon className="w-5 h-5" />
                  </div>
                </div>
                <div className={`font-poppins font-bold text-3xl mb-2 ${metric.color}`}>
                  {metric.value}
                </div>
                <div className="font-poppins font-semibold text-foreground mb-1">
                  {metric.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-center'>
            <button onClick={scrollToForm} className="btn-primary group inline-flex items-center gap-3 hover:text-white mb-20">
              <span className="relative z-10 flex items-center gap-3">
                <Crown className="w-5 h-5" />
                <span>Become an Early Adopter</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </div>
          {/* Executive Quote */}
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}>
            <div className="bg-card rounded-3xl p-1 lg:p-1 border border-border shadow-lg overflow-hidden">
              <div className="w-full mx-auto">
                <div className="flex items-start gap-6">
                  <img src={"/ufcu-assets/ufcuf.webp"} className='w-full rounded-3xl' />
                  {/* <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Quote className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <blockquote className="body-large text-foreground mb-6 leading-relaxed">
                      "Selecting Algebrik AI as our lending technology partner was a strategic decision that positioned 
                      UFCU at the forefront of the AI revolution in financial services. The comprehensive suite delivers 
                      measurable results - 40% faster processing and 90% reduction in abandonment rates. We've gained 
                      a significant competitive advantage by being first to implement this transformative technology."
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-poppins font-semibold text-foreground">Sarah Johnson</div>
                        <div className="text-muted-foreground">Chief Technology Officer, UFCU</div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Decision Timeline */}
          <div className={`mt-16 transition-all duration-1000 delay-800 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}>
            <div className="text-center">
              <h3 className="font-poppins font-bold text-2xl text-foreground mb-8">
                Strategic Decision Timeline
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    step: '1',
                    title: 'Elite Program Selection',
                    description: 'UFCU chosen as Elite Early Adopter #1',
                    date: 'Q2 2025'
                  },
                  {
                    step: '2',
                    title: 'Rapid Implementation',
                    description: 'Full Algebrik One suite deployment',
                    date: 'Q3 2025'
                  },
                  {
                    step: '3',
                    title: 'Market Leadership',
                    description: 'First-mover advantage established',
                    date: 'Q4 2025'
                  }
                ].map((phase, index) => (
                  <div key={phase.step} className="text-center">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-4">
                      {phase.step}
                    </div>
                    <h4 className="font-poppins font-semibold text-foreground mb-2">{phase.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{phase.description}</p>
                    <div className="text-xs text-primary font-medium">{phase.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Executive Quote */}
          <div className={`transition-all duration-1000 delay-600 mt-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}>
            <div className="bg-card rounded-3xl p-1 lg:p-1 border border-border shadow-lg overflow-hidden">
              <div className="w-full mx-auto">
                <div className="flex items-start gap-6">
                  <img src={"/ufcu-assets/ufcum.webp"} className='w-full rounded-3xl' />
                  {/* <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Quote className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <blockquote className="body-large text-foreground mb-6 leading-relaxed">
                      "Selecting Algebrik AI as our lending technology partner was a strategic decision that positioned 
                      UFCU at the forefront of the AI revolution in financial services. The comprehensive suite delivers 
                      measurable results - 40% faster processing and 90% reduction in abandonment rates. We've gained 
                      a significant competitive advantage by being first to implement this transformative technology."
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-poppins font-semibold text-foreground">Sarah Johnson</div>
                        <div className="text-muted-foreground">Chief Technology Officer, UFCU</div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default UFCUSuccessSection; 