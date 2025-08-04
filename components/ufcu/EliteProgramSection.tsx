import { useState, useEffect, useRef } from 'react';
import { Crown, Target, Shield, Zap, TrendingUp, Clock, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from "../LendingHealthCheck/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
const EliteProgramSection = () => {
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
  return <section ref={sectionRef} className="relative pt-20 lg:pb-32 overflow-hidden bg-background">
     <div className='flex justify-center'>
            <button onClick={scrollToForm} className="btn-primary group inline-flex items-center gap-3 hover:text-white mb-20">
              <span className="relative z-10 flex items-center gap-3">
                <Crown className="w-5 h-5" />
                <span>Join the Early Adopters Program today</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </div>
    {/* Background Elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-32 right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-32 left-32 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
    </div>

    <div className="container mx-auto px-6 lg:px-12 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 mb-6">
          <Crown className="w-4 h-4 text-primary" />
          <span className="font-poppins font-medium text-sm text-primary">Exclusive Opportunity</span>
        </div>

          <p className="body-large max-w-3xl mx-auto text-xl text-blue-600">The AI revolution in lending is accelerating.
            Market leaders must act now to secure competitive advantage.</p>
        </div>

        {/* Elite Program Benefits Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Left Side - Why Elite Program Exists */}
          <div className="space-y-8">
            <div>
              <h3 className="font-poppins font-bold text-2xl text-foreground mb-6">
                Market Transformation Timeline
              </h3>
              <div className="space-y-6">
                {[{
                  icon: Target,
                  title: 'First-Mover Advantage Window',
                  description: 'Limited to 10 institutions to ensure each gains significant competitive positioning',
                  timeline: 'Now - Q4 2025'
                }, {
                  icon: TrendingUp,
                  title: 'AI Adoption Acceleration',
                  description: 'Market adoption of AI lending expected to reach 80% by 2026',
                  timeline: 'Q1 2026'
                }, {
                  icon: Shield,
                  title: 'Competitive Saturation',
                  description: 'Late adopters will compete on commoditized AI offerings',
                  timeline: 'Q2 2026+'
                }].map((phase, index) => <div key={phase.title} className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <phase.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-foreground mb-2">{phase.title}</h4>
                    <p className="text-muted-foreground mb-2">{phase.description}</p>
                    <div className="text-sm text-primary font-medium">{phase.timeline}</div>
                  </div>
                </div>)}
              </div>
            </div>
          </div>

          {/* Right Side - Elite Benefits */}
          <div className="bg-card rounded-3xl p-8 border border-border shadow-lg">
            <h3 className="font-poppins font-bold text-2xl text-foreground mb-6">
              Elite Early Adopter Benefits
            </h3>
            <div className="space-y-6">
              {[{
                icon: Crown,
                title: 'Market Leadership Position',
                description: 'First-mover status in AI-powered lending technology'
              }, {
                icon: Zap,
                title: 'Competitive Technology Advantage',
                description: 'Exclusive access to most advanced AI lending platform'
              }, {
                icon: TrendingUp,
                title: 'Proven Business Results',
                description: '40% faster processing, 90% reduction in abandonment'
              }, {
                icon: Clock,
                title: 'Implementation Priority',
                description: 'Dedicated resources and accelerated deployment'
              }, {
                icon: Shield,
                title: 'Strategic Partnership',
                description: 'Long-term collaboration and technology roadmap influence'
              }].map((benefit, index) => <div key={benefit.title} className="flex gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-foreground mb-1">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>)}
            </div>
          </div>
        </div>

        {/* Market Urgency Analysis */}
        <div
          className={`rounded-3xl p-8 lg:p-12 border border-primary/20 mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-poppins font-bold text-2xl text-foreground mb-6">
              The AI Transformation Window is Closing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {[{
                title: 'Early Adopters (Now)',
                description: 'Market leadership + competitive advantage',
                status: 'Optimal Position',
                color: 'text-green-600'
              }, {
                title: 'Fast Followers (2026)',
                description: 'Playing catch-up with established leaders',
                status: 'Challenging Position',
                color: 'text-teal-600'
              }, {
                title: 'Late Adopters (2027+)',
                description: 'Commoditized technology, no differentiation',
                status: 'Disadvantaged Position',
                color: 'text-red-600'
              }].map((phase, index) => <div key={phase.title} className="text-center">
                <h4 className="font-poppins font-semibold text-foreground mb-2">{phase.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{phase.description}</p>
                <div className={`text-sm font-medium ${phase.color}`}>{phase.status}</div>
              </div>)}
            </div>
            <p className="body-large text-muted-foreground">
              UFCU understood this market dynamic and secured Elite Early Adopter status.
            </p>
            <div className='flex justify-center'>
              <button onClick={scrollToForm} className="btn-primary group inline-flex items-center gap-3 hover:text-white mt-10">
                <span className="relative z-10 flex items-center gap-3">
                  <Crown className="w-5 h-5" />
                  <span>Avoid Being a Late Adopter</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Financial Impact VS Comparison with Auto Scroll */}
        <div className={`bg-card rounded-3xl p-8 lg:p-12 border border-border shadow-lg transition-all duration-1000 delay-600 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="max-w-6xl mx-auto">
            <h3 className="font-poppins font-bold text-2xl text-foreground text-center mb-12">
              Financial Impact of Elite Early Adoption
            </h3>
            {/* VS Layout with Auto Scroll */}
            <div className="relative">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 4000,
                  }),
                ]}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {[
                    {
                      advantage: "90% reduction in member acquisition costs",
                      cost: "Market share loss to AI-enabled competitors",
                      advantageIcon: CheckCircle,
                      costIcon: AlertTriangle
                    },
                    {
                      advantage: "40% improvement in operational efficiency",
                      cost: "Higher implementation costs in crowded market",
                      advantageIcon: TrendingUp,
                      costIcon: AlertTriangle
                    },
                    {
                      advantage: "Premium member experience differentiation",
                      cost: "Member expectations already set by leaders",
                      advantageIcon: Crown,
                      costIcon: AlertTriangle
                    },
                    {
                      advantage: "Market leadership positioning value",
                      cost: "No differentiation advantage available",
                      advantageIcon: Target,
                      costIcon: AlertTriangle
                    }
                  ].map((comparison, index) => (
                    <CarouselItem key={index} className="pl-4 basis-full">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                        {/* Early Adopter Advantages - Left Side */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 lg:p-8 border border-green-200 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                          <div className="absolute top-0 right-0 w-20 h-20 bg-green-400/10 rounded-full blur-xl"></div>
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                <comparison.advantageIcon className="w-5 h-5 text-green-600" />
                              </div>
                              <h4 className="font-poppins font-bold text-green-800 text-lg">
                                Early Adopter Advantage
                              </h4>
                            </div>
                            <p className="text-green-700 font-medium leading-relaxed">
                              {comparison.advantage}
                            </p>
                          </div>
                        </div>
                        {/* VS Divider - Center */}
                        <div className="flex justify-center lg:hidden">
                          <div className="relative">
                            <div className="w-18 h-18 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20" style={{ background: 'var(--gradient-primary)' }}>
                              <span className="font-black text-white text-xl" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>VS</span>
                            </div>
                          </div>
                        </div>
                        {/* Late Adopter Costs - Right Side */}
                        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 lg:p-8 border border-red-200 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                          <div className="absolute top-0 right-0 w-20 h-20 bg-red-400/10 rounded-full blur-xl"></div>
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                                <comparison.costIcon className="w-5 h-5 text-red-600" />
                              </div>
                              <h4 className="font-poppins font-bold text-red-800 text-lg">
                                Late Adopter Cost
                              </h4>
                            </div>
                            <p className="text-red-700 font-medium leading-relaxed">
                              {comparison.cost}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              {/* Desktop VS Divider - Absolute positioned */}
              <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20" style={{ background: 'var(--gradient-primary)' }}>
                    <span className="font-black text-white text-2xl" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>VS</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Progress Indicators */}
            <div className="flex justify-center mt-8 gap-2">
              {[0, 1, 2, 3].map((dot) => (
                <div key={dot} className="w-2 h-2 bg-muted rounded-full opacity-50"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>;
};
export default EliteProgramSection; 