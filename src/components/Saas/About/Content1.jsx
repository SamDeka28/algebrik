import React from 'react'
import {useState, useEffect, useRef} from 'react'

const Content = ({ links, rtl }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(sectionRef.current); // Stop observing once it becomes visible
        }
      },
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current); // Cleanup on unmount
      }
    };
  }, []);

  return (
    <div className="content mb-lg-5 pb-lg-5">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="section-head mb-30 pb-lg-5 style-5">
              <h2 className="text-lg-center text-left">What's slowing <span>lenders down?</span></h2>
            </div>

            <div className="col-lg-3 d-grid gap-lg-5 gap-4 order-0 order-lg-1 col-md-6">
              <div ref={sectionRef} className={`fade-in ${isVisible ? 'active' : ''}`}>
                <h2 className="text-blue lender_down_num">80%</h2>
                <h4 className="lender_down_title">Customer drop offs </h4>
                
              </div>
              <div ref={sectionRef} className={`fade-in ${isVisible ? 'active' : ''}`}>
                <h2 className="text-blue lender_down_num">$200 - $500</h2>
                <h4 className="text-dark lender_down_title">Cost of acquiring a customer </h4>
                
              </div>
            </div>
            <div className="col-lg-4 order-2 order-lg-2 col-md-12">
            <div className="img main-img1">
              <img src="/assets/img/about/about_s5_1_1.png" alt="" className="sm-circle" />
              <img src="/assets/img/about/about_s5_1_2.jpeg" alt="" className="img-body" />
              {/* <img src="/assets/img/about/about_s5_1_3.png" alt="" className="card1" />
              <img src="/assets/img/about/about_s5_1_4.png" alt="" className="card2" /> */}
              <img src="/assets/img/about/about_s5_1_5.png" alt="" className="lg-circle" />
            </div>
            </div>
            {/* <div className="col-lg-1"></div> */}
            <div className="col-lg-4 d-grid gap-lg-5 gap-4 order-1 order-lg-3 mt-lg-0 mt-4 col-md-6">
            <div ref={sectionRef} className={`fade-in ${isVisible ? 'active' : ''}`}>
                <h2 className="text-blue lender_down_num">5 to 7 days</h2>
                <h4 className="text-dark lender_down_title">Loan processing times  </h4>
               
              </div>
              <div ref={sectionRef} className={`fade-in ${isVisible ? 'active' : ''}`}>
                <h2 className="text-blue lender_down_num">6 months to 1 year</h2>
                <h4 className="text-dark lender_down_title">To launch new products </h4>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Content