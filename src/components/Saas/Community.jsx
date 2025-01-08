// import community from '@data/Saas/community.json';
// import communityRTL from '@data/Saas/community-rtl.json';

// const Community = ({ rtl }) => {
//   const communityData = rtl ? communityRTL : community;

//   return (
//     <section className="community pt-40 style-5">
//       <div className="container">
//         <div className="section-head text-center mb-40 style-5">
//           <h2 className="mb-20">{ rtl ? 'لماذا' : 'Top' } <span>{ rtl ? 'نحن' : 'Reasons' }</span> </h2>
//           <p>{ rtl ? 'توحيد بيانات عملك في لوحة تحكم بسيطة واحدة للتجارة الإلكترونية' : 'Unify your business data in one simple ecommerce dashboard' }</p>
//         </div>
//         <div className="content rounded-pill">
//           {
//             communityData.map((item, index) => (
//               <div className="commun-card" key={index}>
//                 <div className="icon">
//                   <img src={item.img} alt="" />
//                 </div>
//                 <div className="inf">
//                   <h5>{ item.title }</h5>
//                 </div>
//               </div>
//             ))
//           }
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Community

import React from 'react'

function Community() {
  return (
    <section className='cont-2  style-5 ' id="about-alegbrik">
      <div className="content">
    <div className='container section-head style-5 pt-lg-5'>
      <div className="row align-items-center justify-content-between ">
        <div className="col-lg-5 col-sm-12 col-md-12 col-12">
          <h2 className=''>About <span>Algebrik</span></h2>


          <p className='pt-lg-3 py-2 algerbik-p'>Algebrik AI is the world's first cloud-native and AI-powered digital-era Loan Origination System (LOS).        </p>
          
          <p className="algerbik-p">In an industry that hasn’t seen significant innovation in over 25 years, Algebrik AI empowers lenders to engage next-gen borrowers and stay competitive in today’s digital era by transforming loan originations end to end. We do all the heavy lifting so you can focus on growing your business and margins.</p>
          
        </div>
        <div className="col-lg-7 col-sm-12 col-md-12 col-12 ">
          <img src='/assets/img/algebrik/about_us.png' className="img-fluid float-lg-left  me-auto" />
        </div>
      </div>
    </div>
    </div>
    </section>
  )
}

export default Community