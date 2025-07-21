import { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle, User, Mail, Building, Phone, AlertCircle } from 'lucide-react';

const AlgebrikLeadForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    '0-1/firstname': '',
    '0-1/email': '',
    '0-1/company': '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
        if (timeoutId) clearTimeout(timeoutId);
      }
    }, { threshold: 0.3 });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    // Mobile fallback: if not visible after 1s, show content
    if (typeof window !== 'undefined' && window.innerWidth < 700) {
      timeoutId = setTimeout(() => {
        setIsVisible(true);
        observer.disconnect();
      }, 1000);
    }
    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case '0-1/firstname':
        return value.trim() ? '' : 'This field is required';
      case '0-1/email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Please enter a valid email address';
      case '0-1/company':
        return value.trim() ? '' : 'Company name is required';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    // HubSpot API submission
    const portalId = '47671281';
    const formId = 'bae55d74-b903-49c1-9e26-1804d64fc213';
    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
    const fields = [
      { name: '0-1/firstname', value: formData['0-1/firstname'] },
      { name: '0-1/email', value: formData['0-1/email'] },
      { name: '0-1/company', value: formData['0-1/company'] },
    ];
    const context = {
      pageUri: window.location.href,
      pageName: document.title || 'UFCU',
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields, context }),
      });
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          '0-1/firstname': '',
          '0-1/email': '',
          '0-1/company': '',
        });
        setErrors({});
      } else {
        const errorData = await response.json();
        setErrors({ form: errorData.message || 'Submission failed. Please try again.' });
      }
    } catch (err) {
      setErrors({ form: 'Submission failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="lead-form" ref={sectionRef} className="section-spacing bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <div className="w-24 h-24 bg-light-blue/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12 text-light-blue" />
              </div>
              <h2 className="heading-2 text-dark-blue mb-6">Thank You!</h2>
              <p className="body-text">
                Your request has been received. Our team will contact you within 24 hours to discuss how 
                Algebrik can transform your lending operations and enhance your member experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-form" ref={sectionRef} className="section-spacing bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-12 transition-all duration-800 ease-out ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
            <h2 className="heading-2 text-dark-blue mb-6" style={{ fontSize: '28px', lineHeight: '36px' }}>
              Interested in Transforming Your Lending Operations?
            </h2>
            <p className="body-text max-w-2xl mx-auto">
              Join leading financial institutions already benefiting from Algebrik's AI-powered lending solutions. 
              Get early access and discover how we can enhance your member experience.
            </p>
          </div>
          {/* Form Card */}
          <div className={`bg-white rounded-2xl p-8 md:p-12 transition-all duration-800 ease-out animate-delay-400 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`} style={{ boxShadow: 'rgba(0,0,0,0.1) 0 8px 24px' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name */}
              <div>
                <label className="form-label" htmlFor="0-1/firstname">
                  First Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-text-secondary" />
                  </div>
                  <input type="text" id="0-1/firstname" name="0-1/firstname" value={formData['0-1/firstname']} onChange={handleInputChange} className={`form-input pl-20 bg-[#F7F8FA] placeholder-gray-400 focus:bg-white shadow-sm ${errors['0-1/firstname'] ? 'border-red-500' : 'border-transparent'}`} placeholder="Enter your first name" required />
                </div>
                {errors['0-1/firstname'] && <div className="flex items-center gap-2 mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors['0-1/firstname']}</span>
                </div>}
              </div>
              {/* Email */}
              <div>
                <label className="form-label" htmlFor="0-1/email">
                  Business Email *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-text-secondary" />
                  </div>
                  <input type="email" id="0-1/email" name="0-1/email" value={formData['0-1/email']} onChange={handleInputChange} className={`form-input pl-20 bg-[#F7F8FA] placeholder-gray-400 focus:bg-white shadow-sm ${errors['0-1/email'] ? 'border-red-500' : 'border-transparent'}`} placeholder="name@company.com" required />
                </div>
                {errors['0-1/email'] && <div className="flex items-center gap-2 mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors['0-1/email']}</span>
                </div>}
              </div>
              {/* Company */}
              <div>
                <label className="form-label" htmlFor="0-1/company">
                  Financial Institution / Company *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-text-secondary" />
                  </div>
                  <input type="text" id="0-1/company" name="0-1/company" value={formData['0-1/company']} onChange={handleInputChange} className={`form-input pl-10 bg-[#F7F8FA] placeholder-gray-400 focus:bg-white shadow-sm ${errors['0-1/company'] ? 'border-red-500' : 'border-transparent'}`} placeholder="Enter your institution name" required />
                </div>
                {errors['0-1/company'] && <div className="flex items-center gap-2 mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors['0-1/company']}</span>
                </div>}
              </div>
              {/* Submit Button */}
              <div className="flex justify-center text-center mt-8">
                <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 btn-primary w-full md:w-auto min-w-[200px] text-lg py-4 px-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </> : <>
                    <span>The Lending Stack Test Drive</span>
                    <Send className="w-5 h-5" />
                  </>}
                </button>
              </div>
              {/* Privacy Note */}
              <p className="text-center text-text-secondary text-sm mt-4">
                Your information is secure and will only be used to contact you about Algebrik services. 
                We respect your privacy and will never share your data with third parties.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlgebrikLeadForm; 