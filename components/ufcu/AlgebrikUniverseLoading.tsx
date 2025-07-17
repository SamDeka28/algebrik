import React, { useState, useEffect } from 'react';
import { Button } from '../LendingHealthCheck/ui/button';
import { Brain, Shield, Zap, TrendingUp, Users, Globe, Sparkles } from 'lucide-react';

interface AlgebrikUniverseProps {
  onComplete: () => void;
}

const AlgebrikUniverseLoading = ({ onComplete }: AlgebrikUniverseProps) => {
  const [showSkip, setShowSkip] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const modules = [
    { name: 'Lending AI', icon: Brain, color: 'from-light-blue to-primary', delay: 0 },
    { name: 'Risk Engine', icon: Zap, color: 'from-primary to-medium-blue', delay: 0.2 },
    { name: 'Analytics', icon: TrendingUp, color: 'from-medium-blue to-dark-blue', delay: 0.4 },
    { name: 'Compliance', icon: Shield, color: 'from-dark-blue to-primary', delay: 0.6 },
    { name: 'Member Portal', icon: Users, color: 'from-primary to-light-blue', delay: 0.8 },
    { name: 'Integration Hub', icon: Globe, color: 'from-light-blue to-medium-blue', delay: 1.0 },
  ];

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 2000);
    const collapseTimer = setTimeout(() => {
      setIsCollapsing(true);
      setTimeout(() => setShowText(true), 2000);
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(onComplete, 1500);
      }, 4000);
    }, 5000);
    return () => {
      clearTimeout(skipTimer);
      clearTimeout(collapseTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsComplete(true);
    onComplete();
  };

  return (
    <div 
      className={`fixed inset-0 z-50 transition-opacity duration-1000 ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 border border-white/20 rounded-3xl animate-float" />
        <div className="absolute bottom-32 left-32 w-24 h-24 bg-white/5 rounded-full backdrop-blur-sm animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-2xl animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-20 right-1/3 w-40 h-40 border border-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      </div>
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>
      {/* Central Universe Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-[600px] h-[600px] md:w-[700px] md:h-[700px]">
          {/* Central Algebrik Logo */}
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-2000 ease-out ${isCollapsing ? 'scale-150' : 'scale-100'} ${showText ? 'opacity-0 scale-75' : 'opacity-100'}`}>
            <div className="relative">
              <div 
                className="w-32 h-32 md:w-40 md:h-40 backdrop-blur-xl rounded-3xl border border-white/30 flex items-center justify-center"
                style={{ background: 'var(--glass-bg)', boxShadow: 'var(--shadow-glow-lg), inset 0 1px 0 rgba(255,255,255,0.1)' }}
              >
                <div 
                  className="w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center p-2"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <img 
                    src="/ufcu-assets/f2069dd5-1ef4-43cb-963c-28b6c54909b7.png" 
                    alt="Algebrik Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              {/* Pulsing Rings */}
              <div className="absolute inset-0 animate-ping opacity-20">
                <div className="w-32 h-32 md:w-40 md:h-40 border border-white/30 rounded-3xl"></div>
              </div>
              <div className="absolute inset-0 animate-pulse opacity-15" style={{ animationDelay: '1s' }}>
                <div className="w-40 h-40 md:w-48 md:h-48 border border-white/20 rounded-3xl -m-4"></div>
              </div>
              <div className="absolute inset-0 animate-ping opacity-10" style={{ animationDelay: '2s' }}>
                <div className="w-48 h-48 md:w-56 md:h-56 border border-white/15 rounded-3xl -m-8"></div>
              </div>
            </div>
          </div>
          {/* Orbiting Modules */}
          {modules.map((module, index) => {
            const angle = (index * 60) * (Math.PI / 180);
            const radius = 220;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <div
                key={module.name}
                className={`absolute top-1/2 left-1/2 transition-all duration-3000 ease-out ${isCollapsing ? 'transform -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0' : 'animate-fade-in'}`}
                style={{
                  transform: isCollapsing 
                    ? `translate(-50%, -50%) scale(0) rotate(${720 + index * 120}deg)` 
                    : `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  transitionDelay: isCollapsing ? `${index * 0.15}s` : `${index * 0.2}s`,
                  animationDelay: `${index * 0.3}s`,
                }}
              >
                <div 
                  className="absolute -inset-4 opacity-30"
                  style={{ 
                    animation: `spin ${15 + index * 2}s linear infinite`,
                    animationDirection: index % 2 === 0 ? 'normal' : 'reverse',
                  }}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"></div>
                </div>
                <div 
                  className="relative w-24 h-24 md:w-28 md:h-28 backdrop-blur-xl rounded-2xl border border-white/30 group transition-all duration-500"
                  style={{ 
                    background: `linear-gradient(135deg, ${
                      module.color.includes('light-blue') ? 'hsl(var(--light-blue) / 0.2)' :
                      module.color.includes('primary') ? 'hsl(var(--primary) / 0.2)' :
                      module.color.includes('medium-blue') ? 'hsl(var(--medium-blue) / 0.2)' :
                      'hsl(var(--dark-blue) / 0.2)'
                    }, rgba(255,255,255,0.1))`,
                    boxShadow: 'var(--shadow-glow), inset 0 1px 0 rgba(255,255,255,0.1)',
                    animation: `spin ${20 + index * 3}s ease-in-out infinite`,
                    animationDirection: index % 2 === 0 ? 'normal' : 'reverse',
                  }}
                >
                  <div 
                    className="w-full h-full flex items-center justify-center text-white transition-transform duration-500 group-hover:scale-110" 
                    style={{ 
                      animation: `spin ${20 + index * 3}s ease-in-out infinite reverse`,
                    }}
                  >
                    {module.icon ? <module.icon size={28} strokeWidth={2} /> : <div className="w-7 h-7" />}
                  </div>
                  <div 
                    className="absolute inset-0 rounded-2xl blur-xl opacity-40 -z-10 transition-opacity duration-500 group-hover:opacity-60"
                    style={{ 
                      background: `linear-gradient(135deg, ${
                        module.color.includes('light-blue') ? 'hsl(var(--light-blue) / 0.3)' :
                        module.color.includes('primary') ? 'hsl(var(--primary) / 0.3)' :
                        module.color.includes('medium-blue') ? 'hsl(var(--medium-blue) / 0.3)' :
                        'hsl(var(--dark-blue) / 0.3)'
                      }, transparent)`
                    }}
                  />
                </div>
                <div 
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-white/90 text-sm font-poppins font-medium whitespace-nowrap backdrop-blur-sm px-3 py-2 rounded-xl border border-white/20"
                  style={{ background: 'var(--glass-bg)' }}
                >
                  {module.name}
                </div>
              </div>
            );
          })}
          {/* Orbital Paths with Gradients */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'translate(0, 0)' }}>
            <circle cx="50%" cy="50%" r="220" fill="none" stroke="url(#orbital-gradient-main)" strokeWidth="1" strokeDasharray="4,12" className="animate-spin opacity-30" style={{ animationDuration: '40s', animationTimingFunction: 'linear' }} />
            <circle cx="50%" cy="50%" r="180" fill="none" stroke="url(#orbital-gradient-inner)" strokeWidth="0.5" strokeDasharray="2,6" className="animate-spin opacity-20" style={{ animationDuration: '60s', animationTimingFunction: 'linear', animationDirection: 'reverse' }} />
            <circle cx="50%" cy="50%" r="260" fill="none" stroke="url(#orbital-gradient-outer)" strokeWidth="0.5" strokeDasharray="1,8" className="animate-spin opacity-15" style={{ animationDuration: '80s', animationTimingFunction: 'linear' }} />
            <defs>
              <linearGradient id="orbital-gradient-main" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="30%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="70%" stopColor="rgba(255,255,255,0.6)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
              <linearGradient id="orbital-gradient-inner" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--light-blue) / 0)" />
                <stop offset="50%" stopColor="hsl(var(--light-blue) / 0.3)" />
                <stop offset="100%" stopColor="hsl(var(--light-blue) / 0)" />
              </linearGradient>
              <linearGradient id="orbital-gradient-outer" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary) / 0)" />
                <stop offset="50%" stopColor="hsl(var(--primary) / 0.2)" />
                <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      {/* Skip Button */}
      {/* {showSkip && !isCollapsing && (
        <Button
          onClick={handleSkip}
          variant="outline"
          className="fixed top-8 right-8 text-white border-white/30 hover:scale-105 backdrop-blur-xl z-30 transition-all duration-500 font-medium bg-white/10 shadow-lg"
        >
          Skip Animation
        </Button>
      )} */}
      {/* Logo and Text Layout */}
      {showText && (
        <div className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none">
          <div className="flex flex-col items-center text-center">
            <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="w-24 h-24 md:w-28 md:h-28 backdrop-blur-xl rounded-2xl border border-white/30 flex items-center justify-center bg-white/10 shadow-xl">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center p-1 bg-gradient-to-br from-blue-400 via-blue-600 to-blue-900">
                    <img 
                      src="/ufcu-assets/f2069dd5-1ef4-43cb-963c-28b6c54909b7.png" 
                      alt="Algebrik Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-6 h-6 text-white/80 animate-pulse" />
                </div>
              </div>
            </div>
            <h1 className="mb-6 tracking-tight text-5xl md:text-7xl font-bold text-white">
              {Array.from('ALGEBRIK').map((letter, index) => (
                <span
                  key={index}
                  className="inline-block animate-fade-in-up bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent"
                  style={{ 
                    animationDelay: `${index * 0.15}s`,
                    animationDuration: '1s',
                    animationFillMode: 'both',
                    transform: 'translateY(30px)',
                    opacity: 0
                  }}
                >
                  {letter}
                </span>
              ))}
            </h1>
            <div className="relative animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
              <p className="text-4xl md:text-5xl font-light text-white/90 tracking-[0.2em] mb-4">
                One
              </p>
              <div className="w-32 h-1 bg-gradient-to-r from-blue-400 via-white to-purple-400 rounded-full mx-auto" />
            </div>
            <p className="text-lg md:text-xl text-blue-100 mt-8 animate-fade-in tracking-wide" style={{ animationDelay: '2s' }}>
              The Future of Financial Intelligence
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlgebrikUniverseLoading; 