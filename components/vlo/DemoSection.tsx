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
  const [showContactModal, setShowContactModal] = useState(false)

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
                  <svg
                    width={"96"}
                    height={"96"}
                    viewBox="0 0 512 512"
                    className={`relative z-10 drop-shadow-2xl transition-all duration-500`}
                  >
                    <defs>
                      <radialGradient id="paint0_radial_siri" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-191 -390.5) rotate(56.6599) scale(1021.64 780.625)">
                        <stop stopColor="hsl(220 70% 70%)" />
                        <stop offset="1" stopColor="hsl(220 70% 50%)" />
                      </radialGradient>
                      <linearGradient id="paint1_linear_siri" x1="212.671" y1="128.658" x2="212.671" y2="383.342" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white" stopOpacity="0.95" />
                        <stop offset="1" stopColor="white" />
                      </linearGradient>
                      <linearGradient id="paint2_linear_siri" x1="393.549" y1="317.1" x2="393.549" y2="382.449" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white" stopOpacity="0.95" />
                        <stop offset="1" stopColor="white" />
                      </linearGradient>
                    </defs>

                    <rect width="512" height="512" rx="88" fill="white" />
                    <rect width="512" height="512" rx="88" fill="url(#paint0_radial_siri)" />

                    {/* Animated path morphing */}
                    <path
                      d="M86 254.881C86 230.114 91.0728 208.181 101.218 189.084C111.662 169.986 125.687 155.216 143.293 144.772C161.197 134.029 180.891 128.658 202.376 128.658C221.772 128.658 238.631 132.537 252.955 140.296C267.576 147.756 279.214 157.155 287.867 168.494V132.686H339.341V379.314H287.867V342.61C279.214 354.248 267.427 363.946 252.507 371.704C237.587 379.463 220.578 383.342 201.481 383.342C180.294 383.342 160.898 377.971 143.293 367.228C125.687 356.188 111.662 340.969 101.218 321.573C91.0728 301.879 86 279.648 86 254.881ZM287.867 255.776C287.867 238.767 284.286 223.997 277.125 211.464C270.262 198.931 261.16 189.382 249.821 182.817C238.482 176.253 226.248 172.97 213.118 172.97C199.989 172.97 187.754 176.253 176.415 182.817C165.076 189.084 155.825 198.483 148.664 211.016C141.801 223.251 138.369 237.872 138.369 254.881C138.369 271.89 141.801 286.81 148.664 299.641C155.825 312.472 165.076 322.319 176.415 329.182C188.053 335.747 200.287 339.03 213.118 339.03C226.248 339.03 238.482 335.747 249.821 329.182C261.16 322.618 270.262 313.069 277.125 300.536C284.286 287.705 287.867 272.785 287.867 255.776Z"
                      fill="url(#paint1_linear_siri)"
                      stroke="white"
                      strokeWidth="8"
                      strokeLinejoin="round"
                      style={{
                        transition: 'all 0.3s ease-in-out'
                      }}
                    />

                    <path
                      d="M393.773 382.449C384.523 382.449 376.764 379.316 370.498 373.05C364.231 366.783 361.098 359.025 361.098 349.775C361.098 340.524 364.231 332.766 370.498 326.499C376.764 320.233 384.523 317.1 393.773 317.1C402.725 317.1 410.334 320.233 416.6 326.499C422.867 332.766 426 340.524 426 349.775C426 359.025 422.867 366.783 416.6 373.05C410.334 379.316 402.725 382.449 393.773 382.449Z"
                      fill="url(#paint2_linear_siri)"
                      stroke="white"
                      strokeWidth="8"
                      strokeLinejoin="round"
                      style={{
                        transition: 'all 0.3s ease-in-out'
                      }}
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Algebrik AI  Loan Assistant</h3>
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
            <Button className="bg-primary hover:bg-primary-dark text-primary-foreground hover-lift" onClick={() => setShowContactModal(true)}>
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