import { Card } from "../LendingHealthCheck/ui/card";
import { Button } from "../LendingHealthCheck/ui/button";
import { MessageCircle, Mic, Send, Sparkles, Zap, Shield, Clock, Calendar, Brain } from "lucide-react";
import { useState } from "react";

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
const DemoSection = () => {
  const [showContactModal,setShowContactModal]=useState(false)

  const [activeTab, setActiveTab] = useState("chat");
  const [messages] = useState([{
    type: "ai",
    content: "Hello! I'm your AI Virtual Loan Officer. I can help you with your loan application in just a few minutes. What type of loan are you interested in today?",
    timestamp: "2:14 PM"
  }, {
    type: "user",
    content: "I need a personal loan for home renovations",
    timestamp: "2:15 PM"
  }, {
    type: "ai",
    content: "Perfect! Home renovations are a great investment. I can help you get pre-approved in under 5 minutes. To get started, can you tell me approximately how much you're looking to borrow?",
    timestamp: "2:15 PM"
  }]);
  const demoFeatures = [{
    icon: MessageCircle,
    title: "Natural Conversation",
    description: "Chat naturally about your loan needs - no forms to fill out initially"
  }, {
    icon: Zap,
    title: "Instant Processing",
    description: "Get pre-approval decisions in under 5 minutes, not days"
  }, {
    icon: Shield,
    title: "Transparent Decisions",
    description: "Understand exactly why decisions are made with clear explanations"
  }, {
    icon: Clock,
    title: "24/7 Availability",
    description: "Apply anytime, anywhere - your AI loan officer never sleeps"
  }];
  return <section id="demo-section" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20 mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Interactive Demo</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Experience the AI Loan Officer
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">See how our state of the art Agentic AI transforms the lending experience. 
This demo shows real interactions you'll experience in the webinar.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Demo Interface */}
          <div className="animate-scale-in">
            <Card className="bento-card p-6 h-[600px] flex flex-col">
              {/* Demo Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Brain className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Algebrik AI Assistant</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-gentle-pulse" />
                      <span className="text-sm text-muted-foreground">Online</span>
                    </div>
                  </div>
                </div>
                
                {/* Tab Switcher */}
                <div className="flex bg-muted rounded-lg p-1">
                  <Button variant={activeTab === "chat" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("chat")} className="text-xs">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Chat
                  </Button>
                  <Button variant={activeTab === "voice" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("voice")} className="text-xs">
                    <Mic className="h-3 w-3 mr-1" />
                    Voice
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message, index) => <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl ${message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>)}
                
                {/* Typing Indicator */}
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{
                      animationDelay: '0.1s'
                    }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{
                      animationDelay: '0.2s'
                    }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <div className="flex-1 bg-muted rounded-full px-4 py-2">
                  <input type="text" placeholder="Type your message..." className="w-full bg-transparent border-none outline-none text-sm" disabled />
                </div>
                <Button size="sm" className="rounded-full" disabled>
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Demo Notice */}
              <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-xs text-muted-foreground text-center">
                  🎬 This is a demo preview. Experience the full interactive version in our webinar!
                </p>
              </div>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="space-y-6">
            <div className="animate-fade-in-up">
              <h3 className="text-2xl font-bold text-foreground mb-6">Why This Changes Everything</h3>
            </div>
            
            <div className="grid gap-4">
              {demoFeatures.map((feature, index) => <div key={index} className="bento-card p-6 animate-fade-in-up hover-lift" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>)}
            </div>

            {/* CTA */}
            <div className="bento-card p-6 text-center animate-fade-in-up">
              <h4 className="font-semibold text-foreground mb-2">Ready to Experience It Live?</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Schedule a demo for hands-on interaction with the AI loan officer
              </p>
              <Button className="bg-primary hover:bg-primary-dark text-primary-foreground hover-lift" onClick={() =>setShowContactModal(true)}>
                <Calendar className="mr-2 h-4 w-4" />
                Test Drive Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ContactModalPortal open={showContactModal} onClose={() => setShowContactModal(false)} />
    </section>;
};
export default DemoSection;