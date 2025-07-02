"use client";
import { Button } from "@/components/LendingHealthCheck/ui/button";
import { ArrowRight, CheckCircle, Zap, Brain, Users, Clock, Target, DollarSign, Heart, Shield, Linkedin, Download, TrendingUp, Link, Settings, Play, FileCheck, ArrowRight as ArrowRightIcon, Rocket } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/LendingHealthCheck/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/LendingHealthCheck/ui/avatar"; 
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/LendingHealthCheck/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import LeadCaptureForm from "@/components/LendingHealthCheck/LeadCaptureForm"; 

export default function JackHenry() {
  const leadershipTeam = [{
    name: "Pankaj Jain",
    initials: "PJ",
    bio: "Former VP of Technology at Jack Henry, led core banking integrations for 8+ years. Expert in financial technology architecture and regulatory compliance.",
    image: "/lovable-uploads/ebfb0084-d7d6-42a5-9fac-211397d5d327.png"
  }, {
    name: "Andrea Silvers",
    initials: "AS",
    bio: "20+ years in credit union operations and lending. Former Chief Lending Officer at Pacific Northwest Credit Union with expertise in loan origination processes.",
    image: "/lovable-uploads/40016d77-84b2-4fd7-8e49-fe6355fd7d1b.png"
  }, {
    name: "Jesse Fruge",
    initials: "JF",
    bio: "AI/ML engineer with 12+ years in financial services. Previously built underwriting models at Experian and risk assessment tools for community banks.",
    image: "/lovable-uploads/22be4814-961e-48aa-b27b-74d2e39b2133.png"
  }, {
    name: "Jennifer Hernandez",
    initials: "JH",
    bio: "Compliance and security specialist with CISA certification. Former risk management director ensuring SOC 2 and banking regulation adherence.",
    image: "/lovable-uploads/83ca53fa-34a9-499e-978a-50208c4406c4.png"
  }];
  const handleDownloadOnePager = () => {
    // Create a sample PDF download - in production this would be a real PDF
    const link = document.createElement('a');
    link.href = '#'; // In production, this would be the actual PDF URL
    link.download = 'algebrik-ai-integration-guide.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const scrollToForm = () => {
    const formElement = document.getElementById('lead-capture-form');
    if (formElement) {
      formElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-28">
      {/* Hero Section */}
      <section id="experience" className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-8 animate-fade-in animate-bounce">
              <Zap className="w-4 h-4 mr-2 animate-pulse" style={{
              color: '#2A5FAC'
            }} />
              <span className="text-sm font-medium" style={{
              color: '#2A5FAC'
            }}>
                Jack Henry Symitar® Certified Integration
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span style={{
              color: '#2A5FAC'
            }} className="animate-fade-in block transform transition-all duration-700 hover:scale-105">Experience the Future</span>
              <span className="text-gray-900 animate-fade-in block transform transition-all duration-700 delay-200">of Intelligent Lending</span>
              <span className="text-gray-900 animate-fade-in block transform transition-all duration-700 delay-400">with Algebrik AI</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-600">The first AI-powered LOS with certified SymXchange™ integration — delivering real-time approvals, seamless workflows, and member experiences that feel like magic.</p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in delay-800">
              <Button size="lg" className="px-8 py-6 text-lg font-semibold bg-[#2A5FAC] hover:bg-[#1e4a8c] text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-2xl">
                Experience the Demo
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" onClick={handleDownloadOnePager} className="px-8 py-6 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-black">
                <Download className="mr-2 w-5 h-5" />
                Download One-Pager
              </Button>
            </div>

            {/* Key Benefits - Updated to Auto-scroll Carousel */}
            <div className="mt-16">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 3000,
                  }),
                ]}
                className="w-full max-w-6xl mx-auto"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {[{
                    icon: TrendingUp,
                    title: "Lower Abandonment",
                    desc: "Pre-filled apps, zero redundant data entry",
                    delay: "delay-100"
                  }, {
                    icon: Brain,
                    title: "Dynamic Journeys",
                    desc: "Auto-approval for members, guided onboarding for new borrowers",
                    delay: "delay-200"
                  }, {
                    icon: Zap,
                    title: "85% Faster Processing",
                    desc: "From days to minutes with AI + Symitar® workflows",
                    delay: "delay-300"
                  }, {
                    icon: Link,
                    title: "Zero-Error Integration",
                    desc: "Read/write access to member profiles via SymXchange™",
                    delay: "delay-400"
                  }, {
                    icon: Target,
                    title: "Smarter Underwriting",
                    desc: "Real-time cash flow, not just credit scores",
                    delay: "delay-500"
                  }].map((benefit, index) => 
                    <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                      <div className={`text-center p-6 lg:p-8 rounded-lg bg-white shadow-sm border hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in delay-1000 ${benefit.delay} group h-full`}>
                        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                          <benefit.icon className="w-6 h-6 lg:w-8 lg:h-8 group-hover:scale-110 transition-transform duration-300" style={{
                            color: '#2A5FAC'
                          }} />
                        </div>
                        <h3 className="text-xl lg:text-2xl font-semibold mb-3 text-gray-900 group-hover:text-blue-800 transition-colors duration-300 leading-tight">{benefit.title}</h3>
                        <p className="text-base lg:text-lg text-gray-600 leading-relaxed">{benefit.desc}</p>
                      </div>
                    </CarouselItem>
                  )}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            </div>

            {/* Experience Metrics */}
            <div id="technology" className="mt-20 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl border p-10 transform transition-all duration-700 hover:shadow-2xl animate-fade-in delay-1200">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 transform transition-all duration-500 hover:scale-105" style={{
                color: '#2A5FAC'
              }}>
                  The Experience Delivers Results
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Witness the transformation happening at credit unions and community banks embracing the future
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[{
                icon: Clock,
                stat: "85%",
                title: "Time Transformation",
                desc: "Experience processing that moves from days to minutes",
                delay: "delay-100"
              }, {
                icon: Target,
                stat: "40%",
                title: "Precision Enhancement",
                desc: "Witness dramatically improved underwriting accuracy",
                delay: "delay-200"
              }, {
                icon: DollarSign,
                stat: "60%",
                title: "Efficiency Revolution",
                desc: "Discover significant operational cost reductions",
                delay: "delay-300"
              }, {
                icon: Heart,
                stat: "35%",
                title: "Member Joy",
                desc: "Feel the satisfaction of streamlined member experiences",
                delay: "delay-400"
              }].map((metric, index) => <div key={index} className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 animate-fade-in delay-1400 ${metric.delay} group`}>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors duration-300">
                        <metric.icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" style={{
                      color: '#2A5FAC'
                    }} />
                      </div>
                      <div className="text-3xl font-bold group-hover:scale-110 transition-transform duration-300" style={{
                    color: '#2A5FAC'
                  }}>{metric.stat}</div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{metric.title}</h3>
                    <p className="text-sm text-gray-600">{metric.desc}</p>
                  </div>)}

                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-500 lg:col-span-2 transform hover:scale-105 hover:-translate-y-1 animate-fade-in delay-1600 group">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors duration-300">
                      <Shield className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" style={{
                      color: '#2A5FAC'
                    }} />
                    </div>
                    <div className="text-xl font-bold group-hover:scale-110 transition-transform duration-300" style={{
                    color: '#2A5FAC'
                  }}>Flawless Integration</div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Experience Zero-Error Processing</h3>
                  <p className="text-sm text-gray-600">Feel confident with seamless Jack Henry Symitar® core integration</p>
                </div>
              </div>
            </div>

            {/* How It Works Section - Enhanced */}
            <div className="mt-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 rounded-3xl shadow-2xl border border-slate-700 p-12 transform transition-all duration-700 hover:shadow-3xl animate-fade-in delay-1600 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-slate-500/10 pointer-events-none" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl -translate-y-48 translate-x-48" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-400/5 rounded-full blur-3xl translate-y-48 -translate-x-48" />
              
              <div className="relative z-10">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 transform transition-all duration-500 hover:scale-105 text-white">
                    How It Works: Deep Integration Without the Heavy Lifting
                  </h2>
                  <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                    Experience seamless integration with your existing infrastructure through our proven 5-step process
                  </p>
                </div>

                {/* Vertical Steps - Enhanced */}
                <div className="max-w-5xl mx-auto">
                  <div className="relative">
                    {/* Enhanced Vertical line with gradient */}
                    <div className="absolute left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-cyan-400 to-blue-400 shadow-lg shadow-blue-500/50"></div>
                    
                    {/* Steps */}
                    {[
                      {
                        icon: Link,
                        title: "Connect via SymXchange™",
                        description: "Certified API access to your Symitar® core without custom dev work.",
                        delay: "delay-100",
                        gradient: "from-blue-500 to-cyan-500"
                      },
                      {
                        icon: Settings,
                        title: "Turn on AI Decisioning",
                        description: "Automate approvals, funding, and member journeys in real time.",
                        delay: "delay-200",
                        gradient: "from-cyan-500 to-teal-500"
                      },
                      {
                        icon: FileCheck,
                        title: "Maintain Compliance",
                        description: "SOC 2 standards ensure your security, auditability, and peace of mind.",
                        delay: "delay-300",
                        gradient: "from-teal-500 to-green-500"
                      },
                      {
                        icon: Play,
                        title: "Skip the Disruption",
                        description: "Works alongside your current workflows — no learning curve.",
                        delay: "delay-400",
                        gradient: "from-green-500 to-emerald-500"
                      },
                      {
                        icon: Rocket,
                        title: "Scale with Confidence",
                        description: "Whether you're $200M or $2B AUM — Algebrik adapts to your needs.",
                        delay: "delay-500",
                        gradient: "from-emerald-500 to-blue-500"
                      }
                    ].map((step, index) => (
                      <div key={index} className={`relative flex items-start mb-16 last:mb-0 animate-fade-in delay-1800 ${step.delay} group`}>
                        {/* Enhanced Step circle with gradient and glow */}
                        <div className={`relative z-10 w-20 h-20 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-2xl border-2 border-white/20 group-hover:scale-110 group-hover:shadow-3xl transition-all duration-500 transform backdrop-blur-sm`}>
                          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} opacity-20 blur-xl animate-pulse`} />
                          <step.icon className="w-8 h-8 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        
                        {/* Enhanced Step content */}
                        <div className="ml-12 pb-8 flex-1">
                          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:scale-[1.02] group-hover:-translate-y-2 border border-white/20">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-4 text-slate-800 group-hover:text-blue-800 transition-colors duration-300">
                                  {step.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                  {step.description}
                                </p>
                              </div>
                              <div className="ml-4 opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="text-6xl font-black text-slate-200 group-hover:text-blue-200 transition-colors duration-300">
                                  {String(index + 1).padStart(2, '0')}
                                </div>
                              </div>
                            </div>
                            
                            {/* Progress indicator */}
                            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                              <div 
                                className={`h-full bg-gradient-to-r ${step.gradient} rounded-full transition-all duration-1000 group-hover:w-full`}
                                style={{ width: `${(index + 1) * 20}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action at bottom */}
                <div className="text-center mt-16 pt-8 border-t border-white/10">
                  <p className="text-slate-300 mb-6 text-lg">Ready to experience the transformation?</p>
                  <Button 
                    size="lg" 
                    onClick={scrollToForm}
                    className="px-10 py-6 text-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-2xl border-0"
                  >
                    Start Your Integration Journey
                    <ArrowRight className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Why Experience Algebrik AI Section */}
            <div id="team" className="mt-24 bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl border p-10 transform transition-all duration-700 hover:shadow-2xl animate-fade-in delay-2200">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 transform transition-all duration-500 hover:scale-105" style={{
                color: '#2A5FAC'
              }}>
                  Experience Built by Experts
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Our team combines decades of financial technology expertise with deep Jack Henry knowledge, 
                  crafting an experience that seamlessly integrates with your existing infrastructure while 
                  maintaining the highest security standards your credit union demands.
                </p>
              </div>

              {/* Leadership Team */}
              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-center mb-8 text-gray-900">
                  Meet the Visionaries Behind the Experience
                </h3>
                <div className="flex justify-center items-center gap-8 flex-wrap">
                  {leadershipTeam.map((member, index) => <HoverCard key={index}>
                      <HoverCardTrigger asChild>
                        <div className={`flex flex-col items-center cursor-pointer group transition-all duration-500 hover:scale-110 animate-fade-in delay-2000`}>
                          <Avatar className="w-20 h-20 mb-3 ring-2 ring-blue-100 group-hover:ring-blue-300 transition-all duration-300 group-hover:shadow-lg">
                            <AvatarImage src={member.image} alt={member.name} />
                            <AvatarFallback className="bg-blue-100 text-blue-800 font-semibold">
                              {member.initials}
                            </AvatarFallback>
                          </Avatar>
                          <p className="font-medium text-gray-900 text-center group-hover:text-blue-800 transition-colors duration-300">{member.name}</p>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80 p-4 animate-scale-in">
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={member.image} alt={member.name} />
                            <AvatarFallback className="bg-blue-100 text-blue-800 font-semibold">
                              {member.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{member.name}</h4>
                              <Linkedin className="w-4 h-4 text-blue-600 hover:text-blue-800 cursor-pointer transition-colors" />
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>)}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[{
                icon: Shield,
                title: "SymXchange™ Native",
                desc: "Experience seamless API integration with Jack Henry Symitar® core"
              }, {
                icon: CheckCircle,
                title: "Bank-Grade Security",
                desc: "Feel secure with SOC 2 compliant data protection standards"
              }, {
                icon: Users,
                title: "Expert Guidance",
                desc: "Experience dedicated support from credit union specialists"
              }, {
                icon: Target,
                title: "Proven Innovation",
                desc: "Trust enterprise-grade AI built for financial services"
              }].map((trust, index) => <div key={index} className={`text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 animate-fade-in delay-2200 group`}>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                      <trust.icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" style={{
                    color: '#2A5FAC'
                  }} />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{trust.title}</h4>
                    <p className="text-sm text-gray-600">{trust.desc}</p>
                  </div>)}
              </div>

              {/* Additional Trust Statement */}
              <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200 transform transition-all duration-500 hover:shadow-md animate-fade-in delay-2400">
                <p className="text-center text-gray-700 leading-relaxed">
                  <strong className="-bottom-0 ">Our Promise:</strong> We believe exceptional experiences are built on trust. That's why Algebrik AI 
                  is crafted with the same meticulous attention to detail expected by financial institutions—complete regulatory 
                  compliance, transparent AI decision-making, and uncompromising data security. Your members' experience and trust 
                  drive everything we do.
                </p>
              </div>
            </div>

            {/* Lead Capture Form */}
            <div id="lead-capture-form" className="animate-fade-in delay-2800">
              <LeadCaptureForm />
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 pt-8 border-t animate-fade-in delay-3000">
              <p className="text-sm text-gray-500 mb-4">Experience trusted by leading credit unions and community banks</p>
              <div className="flex items-center justify-center space-x-8 opacity-60">
                {["Jack Henry Certified", "SOC 2 Compliant", "Bank-Grade Security"].map((badge, index) => <div key={index} className={`px-4 py-2 bg-gray-100 rounded text-sm font-medium text-gray-600 transition-all duration-300 hover:bg-gray-200 hover:scale-105 animate-fade-in delay-3000`}>
                    {badge}
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};

