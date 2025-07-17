import { useState, useEffect } from 'react';
import { Crown } from 'lucide-react';

const AlgebrikFloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after 3 seconds of page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById('lead-form');
    formElement?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToForm}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform animate-fade-in"
      aria-label="Apply for Elite Status"
    >
      <Crown className="w-6 h-6" />
      <span className="hidden md:inline">Apply for Elite Status</span>
    </button>
  );
};

export default AlgebrikFloatingCTA; 