import { useState, useEffect } from 'react';


const Contact = () => {

  useEffect(() => {
    const script = document.createElement('script');
        script.src='https://js.hsforms.net/forms/embed/v2.js';
        document.body.appendChild(script);

        script.addEventListener('load', () => {
            // @ts-ignore
            if (window.hbspt) {
                // @ts-ignore
                window.hbspt.forms.create({
                  portalId: "47671281",
                  formId: "ef0905e8-682b-4ccc-b336-693bdeff495b",
                  target: '#hubspot-form'
                });
            }
        });
    
  }, [])
  

  return (
    <>
      <section className="services section-padding pb-50 style-5" id="contact">
        <div className="form-container container">
          <div className="demo-bg">
            <div className="row align-items-center gap-4 justify-content-center p-lg-5 p-4">
              <h2 className="demo-h2 text-center">Ready to Transform Your Lending Process?</h2>
              <p className="demo-text text-center" >"Fill in your details here to get a personalized demo of Algebrik AI to see how it can drive efficiency and scale for your institution."</p>
            </div>
          </div>
          <div className='form-block'>
              <div id='hubspot-form'></div>
          </div>
        </div>  
      </section>
    </>
  )
}

export default Contact