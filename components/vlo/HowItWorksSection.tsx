import { Card } from "../LendingHealthCheck/ui/card";
import { Mic, Database, Zap, CheckCircle, ArrowRight } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Mic,
      title: "You Speak",
      description: "The AI listens, understands, and guides",
      detail: "Natural conversation processing with context awareness"
    },
    {
      icon: Database,
      title: "AI Collects Data",
      description: "Smart form-filling in the background",
      detail: "Intelligent data extraction from conversational inputs"
    },
    {
      icon: Zap,
      title: "Underwriting in Real Time",
      description: "Uses Algebrik One Decision Engine",
      detail: "Advanced risk assessment with instant processing"
    },
    {
      icon: CheckCircle,
      title: "Loan Approved",
      description: "All in under 5 minutes",
      detail: "Immediate decision with transparent explanations"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of lending through intelligent conversation
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Connection Line */}
          {/* <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-neon to-accent" /> */}
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="p-6 text-center border-2 border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-xl bg-card">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-accent text-primary rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-neon rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-accent font-medium mb-3">{step.description}</p>
                  <p className="text-sm text-muted-foreground">{step.detail}</p>
                </Card>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-8 z-10">
                    <ArrowRight className="h-8 w-8 text-accent animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-16">
          <div className="inline-block bg-gradient-primary p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4 !text-primary">
              This isn't a chatbot. It's an intelligent lending assistant.
            </h3>
            <p className="text-lg text-accent">
              Trained on real borrower behavior, built into Algebrik One.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;