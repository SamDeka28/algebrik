import { useEffect, useRef, useState } from 'react';
import { Linkedin, Twitter, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const AlgebrikFooter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/company/algebrik', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/algebrik', label: 'Twitter' },
  ];

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Partnership', href: '#partnership' },
    { label: 'Contact', href: '#contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Security', href: '/security' },
  ];

  return (
    <footer 
      ref={sectionRef} 
      className="py-16 relative overflow-hidden bg-blue-900 text-white"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className={`transition-all duration-800 ease-out ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}> 
            <div className="flex items-center gap-3 mb-6">
              <img src="/ufcu-assets/algebrik-logo.png" alt="Algebrik" className="w-10 h-10" />
              <span className="text-2xl font-bold">Algebrik</span>
            </div>
            <p className="mb-6 leading-relaxed text-white/80">
              Transforming financial services through innovative AI-powered lending solutions and strategic partnerships.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-400 hover:scale-110 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
          {/* Quick Links */}
          <div className={`transition-all duration-800 ease-out animate-delay-200 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}> 
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
                  >
                    <span>{link.label}</span>
                    {link.href.startsWith('http') && (
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact Info */}
          <div className={`transition-all duration-800 ease-out animate-delay-400 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}> 
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <a 
                  href="mailto:hello@algebrik.com"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  hello@algebrik.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <a 
                  href="tel:+15551234567"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                <span className="text-white/80">
                  123 Innovation Drive<br />
                  Austin, TX 78701
                </span>
              </div>
            </div>
          </div>
          {/* Newsletter */}
          <div className={`transition-all duration-800 ease-out animate-delay-600 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}> 
            <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
            <p className="mb-4 text-white/80">
              Get the latest updates on our partnerships and product releases.
            </p>
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                required
              />
              <button 
                type="submit"
                className="w-full px-4 py-3 bg-blue-400 hover:bg-opacity-90 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Subscribe
              </button>
            </form>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className={`border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center transition-all duration-800 ease-out animate-delay-800 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}> 
          <p className="text-white/60 text-sm">
            © 2024 Algebrik. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/terms" className="text-white/60 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="/security" className="text-white/60 hover:text-white text-sm transition-colors">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AlgebrikFooter; 