"use client";
import React, { useState } from 'react';
import { Button } from "@/components/LendingHealthCheck/ui/button";
import { Input } from "@/components/LendingHealthCheck/ui/input";
import { Label } from "@/components/LendingHealthCheck/ui/label";
import { CheckCircle, Zap, Send } from "lucide-react";

const LeadCaptureForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    title: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    // Handle form submission logic here
  };

  return (
    <div className="mt-24 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl border p-10 transform transition-all duration-700 hover:shadow-2xl animate-fade-in">
      <div className="max-w-2xl mx-auto text-center">
        {/* Urgency Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-50 border border-orange-200 mb-6 animate-bounce hover:animate-pulse transition-all duration-300 hover:scale-105">
          <Zap className="w-4 h-4 mr-2 text-orange-600 animate-pulse" />
          <span className="text-sm font-medium text-orange-600">
            Limited Early Access - Reserve Your Spot Today
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 transform transition-all duration-500 hover:scale-105" style={{ color: '#2A5FAC' }}>
          Transform Lending with Jack Henry AI Integration
        </h2>

        {/* Subheadline */}
        <p className="text-lg text-gray-600 mb-8 leading-relaxed animate-fade-in transition-all duration-500">
          Join leading credit unions already transforming their lending process. Request your personalized demo today 
          and see how AI can reduce loan processing time by 85% while maintaining full Jack Henry Symitar® compliance.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          {[
            { id: 'name', label: 'Full Name *', type: 'text', placeholder: 'Enter your full name', required: true },
            { id: 'email', label: 'Business Email *', type: 'email', placeholder: 'Enter your business email', required: true },
            { id: 'institution', label: 'Credit Union/Bank Name *', type: 'text', placeholder: 'Enter your institution name', required: true },
            { id: 'title', label: 'Job Title/Role', type: 'text', placeholder: 'Enter your job title (optional)', required: false }
          ].map((field, index) => (
            <div key={field.id} className={`space-y-2 animate-fade-in opacity-0 animate-[fade-in_0.6s_ease-out_forwards] delay-[${index * 100}ms] group`}>
              <Label htmlFor={field.id} className="text-left block font-medium text-gray-700 group-hover:text-blue-700 transition-colors duration-300">
                {field.label}
              </Label>
              <Input
                id={field.id}
                name={field.id}
                type={field.type}
                required={field.required}
                value={formData[field.id as keyof typeof formData]}
                onChange={handleInputChange}
                className="w-full transition-all duration-300 focus:scale-105 focus:shadow-lg hover:shadow-md border-gray-200 focus:border-blue-400"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          <Button 
            type="submit"
            size="lg" 
            disabled={isSubmitting}
            className="w-full px-8 py-6 text-lg font-semibold bg-[#2A5FAC] hover:bg-[#1e4a8c] text-white transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed animate-fade-in opacity-0 animate-[fade-in_0.6s_ease-out_0.6s_forwards] group"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                Request Free Demo
                <Send className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>

        {/* Trust Elements */}
        <div className="mt-8 space-y-4 animate-fade-in opacity-0 animate-[fade-in_0.8s_ease-out_0.8s_forwards]">
          <div className="flex items-center justify-center group">
            <CheckCircle className="w-5 h-5 mr-2 transition-all duration-300 group-hover:scale-110" style={{ color: '#2A5FAC' }} />
            <span className="text-sm font-medium group-hover:text-blue-800 transition-colors duration-300" style={{ color: '#2A5FAC' }}>
              Jack Henry Symitar® Certified Integration
            </span>
          </div>
          
          <p className="text-sm text-gray-500 transition-all duration-300 hover:text-gray-700">
            Your information is secure and will never be shared. We'll contact you within 24 hours to schedule your personalized demo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureForm;
