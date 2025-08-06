import { Card } from "../LendingHealthCheck/ui/card";
import { TrendingUp, Users, Shield, Smartphone } from "lucide-react";

const WhyItMattersSection = () => {
  const benefits = [
    {
      icon: TrendingUp,
      stat: "60%",
      label: "faster processing times",
      description: "Streamlined workflow eliminates bottlenecks"
    },
    {
      icon: Users,
      stat: "10x",
      label: "better user experience",
      description: "Conversational interface reduces friction"
    },
    {
      icon: Shield,
      stat: "100%",
      label: "compliance logging",
      description: "Automated documentation and audit trails"
    },
    {
      icon: Smartphone,
      stat: "24/7",
      label: "availability across channels",
      description: "Works on web, mobile, and in-branch"
    }
  ];

  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 ai-circuit opacity-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Age of{" "}
            <span className="text-gradient bg-gradient-to-r from-accent to-neon bg-clip-text text-transparent">
              Agentic Lending
            </span>{" "}
            Is Here
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Transform your lending operations with AI that thinks, learns, and adapts
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-white/10 border-accent/30 p-6 text-center backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-accent mb-2">{benefit.stat}</div>
              <div className="text-lg font-semibold text-white mb-2">{benefit.label}</div>
              <p className="text-sm text-white/70">{benefit.description}</p>
            </Card>
          ))}
        </div>

        {/* Trust Banner */}
        <div className="bg-white/10 rounded-3xl p-8 text-center backdrop-blur-sm border border-accent/20">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Shield className="h-8 w-8 text-accent" />
            <h3 className="text-2xl font-bold ">🔒 Secure. Compliant. Real-time.</h3>
          </div>
          <p className="text-lg text-accent">
            Powered by the trusted infrastructure of Algebrik One.
          </p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-24 h-24 bg-accent/20 rounded-full animate-float" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-neon/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
    </section>
  );
};

export default WhyItMattersSection;