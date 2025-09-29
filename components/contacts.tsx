"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

declare global {
  interface Window {
    HubSpotMeetings: {
      loadMeetings: () => void;
    };
  }
}

export default function Contact({ open, onClose, isModal = true }: { open?: boolean; onClose?: () => void; isModal?: boolean }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [meetingScheduled, setMeetingScheduled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: ""
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const calendarRef = useRef<HTMLDivElement>(null);

  // Reset state when modal is closed
  const resetState = () => {
    setFormSubmitted(false);
    setMeetingScheduled(false);
    setIsLoading(false);
    setFormData({
      firstname: "",
      lastname: "",
      email: ""
    });
    setErrors({});
  };

  // Reset state when modal is closed and handle body scroll
  useEffect(() => {
    if (!open) {
      resetState();
    }
    
    // Prevent body scroll when modal is open
    if (isModal) {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      
      // Cleanup function to restore scroll when component unmounts
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [open, isModal]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required";
    }
    
    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(
        "https://api.hsforms.com/submissions/v3/integration/submit/47671281/6bb3db8a-6791-495d-8161-a2e5012b6c8f",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: [
              { name: "0-1/firstname", value: formData.firstname },
              { name: "0-1/lastname", value: formData.lastname },
              { name: "0-1/email", value: formData.email }
            ]
          }),
        }
      );
      
      if (response.ok) {
        setFormSubmitted(true);
        setFormData({ firstname: "", lastname: "", email: "" });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Load HubSpot calendar script
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.getElementById("hs-meetings-embed-script")) {
        const script = document.createElement("script");
        script.src = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
        script.type = "text/javascript";
        script.id = "hs-meetings-embed-script";
        document.body.appendChild(script);
      }
    }
  }, []);

  // Modal rendering
  if (isModal) {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm">
        <div className="h-full overflow-y-auto">
          <div className="flex min-h-full items-start md:items-center justify-center p-2 md:p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl my-4 md:my-8">
              <button
                className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black z-10"
                onClick={onClose}
                aria-label="Close Contact Modal"
              >
                &times;
              </button>
              {renderContactSection()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Non-modal rendering
  return <div className="pt-40">{renderContactSection()}</div>;

  function renderContactSection() {
    // Show success messages based on user action
    if (formSubmitted) {
      return (
        <div className="py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-plus-jakarta">Thank You!</h2>
            <p className="text-lg text-gray-600 font-plus-jakarta">
              We've received your information and will get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      );
    }

    if (meetingScheduled) {
      return (
        <div className="py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-plus-jakarta">Meeting Scheduled!</h2>
            <p className="text-lg text-gray-600 font-plus-jakarta">
              Thank you for scheduling a meeting. We'll send you a calendar invitation shortly.
            </p>
          </motion.div>
        </div>
      );
    }

    // Main contact form and calendar layout
    return (
      <section className="py-6 md:py-8 px-4 md:px-6">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2a5fac] mb-3 font-plus-jakarta">
            Get in Touch
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-plus-jakarta">
            Choose how you'd like to connect with us
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Left Side - Calendar Scheduling */}
          <div className="bg-gradient-to-br from-[#2a5fac] to-[#1e4a8a] rounded-2xl p-4 md:p-6 text-white">

            {/* HubSpot Calendar Embed */}
            <div className="min-h-[400px] md:min-h-[450px]">
              <HubspotMeetingEmbed />
            </div>
          </div>

          {/* OR Divider */}
          <div className="lg:hidden flex items-center justify-center my-8">
            <div className="flex items-center w-full">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-4 text-gray-500 font-medium font-plus-jakarta">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-4 md:p-6 lg:p-8">
            <div className="mb-4 md:mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 font-plus-jakarta">Send us a Message</h3>
              <p className="text-gray-600 font-plus-jakarta text-sm md:text-base">
                Fill out the form and we'll get back to you within 24 hours.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-2 font-plus-jakarta">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-[#2a5fac] focus:border-transparent font-plus-jakarta text-sm md:text-base ${
                    errors.firstname ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstname && (
                  <p className="mt-1 text-xs md:text-sm text-red-600 font-plus-jakarta">{errors.firstname}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-2 font-plus-jakarta">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-[#2a5fac] focus:border-transparent font-plus-jakarta text-sm md:text-base ${
                    errors.lastname ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastname && (
                  <p className="mt-1 text-xs md:text-sm text-red-600 font-plus-jakarta">{errors.lastname}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-plus-jakarta">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-[#2a5fac] focus:border-transparent font-plus-jakarta text-sm md:text-base ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-xs md:text-sm text-red-600 font-plus-jakarta">{errors.email}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#2a5fac] text-white py-3 md:py-4 px-4 md:px-6 rounded-lg font-semibold hover:bg-[#1e4a8a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-plus-jakarta text-sm md:text-base"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>

          {/* Desktop OR Divider */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 bg-white rounded-full border-4 border-gray-200 flex items-center justify-center shadow-lg">
              <span className="text-gray-500 font-bold font-plus-jakarta">OR</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const HubspotMeetingEmbed = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMeetings = () => {
      if (window.HubSpotMeetings) {
        window.HubSpotMeetings.loadMeetings();
      } else {
        setTimeout(loadMeetings, 1000); // Retry after 1 second if not loaded
      }
    };

    // Load the script
    if (!document.getElementById('hs-meetings-embed-script')) {
      const script = document.createElement('script');
      script.id = 'hs-meetings-embed-script';
      script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
      script.async = true;
      script.onload = loadMeetings;
      document.body.appendChild(script);
    } else {
      loadMeetings();
    }

    // Cleanup
    return () => {
      const script = document.getElementById('hs-meetings-embed-script');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="meetings-iframe-container"
      data-src="https://meetings-na2.hubspot.com/algebrik/meeting-with-team-algebrik-v2?embed=true"
      style={{ width: '100%',height: '100%' }}
    />
  );
};