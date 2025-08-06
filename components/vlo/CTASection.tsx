import { Button } from "../LendingHealthCheck/ui/button";
import { Card } from "../LendingHealthCheck/ui/card";
import { Input } from "../LendingHealthCheck/ui/input";
import { Label } from "../LendingHealthCheck/ui/label";
import { Calendar, Clock, MapPin, Users, Play, CheckCircle } from "lucide-react";
import { useState } from "react";

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Thank you for registering! You'll receive a confirmation email shortly.");
    setFormData({ name: "", email: "", organization: "", role: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const restartDemo = () => {
    document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const webinarDetails = [
    {
      icon: Calendar,
      label: "Date",
      value: "Thursday, January 18th, 2024"
    },
    {
      icon: Clock,
      label: "Time",
      value: "2:00 PM - 2:45 PM EST"
    },
    {
      icon: Users,
      label: "Format",
      value: "Live Interactive Session"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Online (Zoom)"
    }
  ];

  const webinarAgenda = [
    "AI Loan Officer Live Demo (15 mins)",
    "Real-time Q&A with Use Cases (15 mins)", 
    "Implementation Strategy (10 mins)",
    "Open Discussion & Next Steps (5 mins)"
  ];

  return (
    <section id="cta-section" className="py-24 gradient-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:30px_30px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Join the Future of Lending
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
            Register for our exclusive webinar and be among the first to experience 
            the AI-powered lending revolution
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Webinar Details */}
          <div className="space-y-8">
            {/* Demo Restart */}
            <Card className="glass-morphism p-6 animate-scale-in">
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-4">Want to See the Demo Again?</h3>
                <Button 
                  onClick={restartDemo}
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground hover-lift"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Replay Demo
                </Button>
              </div>
            </Card>

            {/* Webinar Details */}
            <Card className="glass-morphism p-6 animate-fade-in-up">
              <h3 className="text-xl font-bold text-foreground mb-6">Webinar Details</h3>
              <div className="space-y-4">
                {webinarDetails.map((detail, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <detail.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{detail.label}</p>
                      <p className="font-semibold text-foreground">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Agenda */}
            <Card className="glass-morphism p-6 animate-fade-in-up">
              <h3 className="text-xl font-bold text-foreground mb-6">What You'll Experience</h3>
              <div className="space-y-3">
                {webinarAgenda.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Social Proof */}
            <div className="text-center space-y-4 animate-fade-in-up">
              <div className="flex items-center justify-center gap-8 text-primary-foreground/80">
                <div className="text-center">
                  <div className="text-2xl font-bold">2,500+</div>
                  <div className="text-sm">Registered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">45</div>
                  <div className="text-sm">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm">Free</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Registration Form */}
          <Card className="glass-morphism p-8 animate-scale-in">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">Reserve Your Spot</h3>
              <p className="text-muted-foreground">Limited seats available for interactive experience</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="mt-2"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="mt-2"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <Label htmlFor="organization" className="text-foreground">Organization *</Label>
                <Input
                  id="organization"
                  type="text"
                  value={formData.organization}
                  onChange={(e) => handleInputChange("organization", e.target.value)}
                  className="mt-2"
                  placeholder="Your company or institution"
                  required
                />
              </div>

              <div>
                <Label htmlFor="role" className="text-foreground">Your Role</Label>
                <Input
                  id="role"
                  type="text"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className="mt-2"
                  placeholder="e.g., Chief Lending Officer, IT Director"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 hover-lift glow-primary"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Register for Free Webinar
              </Button>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  By registering, you'll receive webinar details and occasional updates about Algebrik AI. 
                  Unsubscribe anytime.
                </p>
              </div>
            </form>

            {/* Additional CTAs */}
            <div className="mt-8 pt-6 border-t border-border space-y-3">
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => window.open('https://calendar.example.com', '_blank')}
              >
                📅 Add to Calendar
              </Button>
              <Button
                variant="ghost"
                className="w-full text-muted-foreground hover:text-foreground"
                onClick={() => window.open('mailto:?subject=AI%20Lending%20Webinar', '_blank')}
              >
                📤 Share with Colleagues
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CTASection;