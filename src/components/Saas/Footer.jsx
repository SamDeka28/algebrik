import Link from 'next/link';
import footerData from '@data/Saas/footer.json';

const Footer = () => {
  return (
    <footer className="style-5 border-top brd-gray" id="contact">
      {/* <div className="footer-container px-lg-5 px-2">
          <div className="content d-lg-flex gap-lg-4 align-items-lg-center justify-content-lg-center">
           {
              footerData.usefulLink.map((item, index) => (
                <div className="footer-card mb-3 mb-lg-0 " key={index}>
                  <div className="card-title text-light">
                   { item.title }
                  </div>
                  <div className="float-end ">
                    <img src={item.img} alt="" />
                  </div>
                  
                </div>
              ))
            }
          </div>
        </div> */}
      <div className="container">
        
        <div className="row gx-0 justify-content-between">
          <div className="col-lg-6 col-sm-12 col-12 col-md-12">
            <div className="items d-flex align-items-center gap-5">
              <a className="navbar-brand" href="#">
                <img src="/assets/img/algebrik/logo.svg" alt="" />
              </a>
              <div className="socail-icons">
                {/* <a href="https://twitter.com/" rel="noreferrer" className="icon-35 rounded-circle bg-white overflow-hidden d-inline-flex align-items-center justify-content-center text-dark me-2" target="_blank">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://facebook.com/" rel="noreferrer" className="icon-35 rounded-circle bg-white overflow-hidden d-inline-flex align-items-center justify-content-center text-dark me-2" target="_blank">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://instagram.com/" rel="noreferrer" className="icon-35 rounded-circle bg-white overflow-hidden d-inline-flex align-items-center justify-content-center text-dark me-2" target="_blank">
                  <i className="fab fa-instagram"></i>
                </a> */}
                <a href="https://www.linkedin.com/company/algebrik-ai/posts/?feedView=all" rel="noreferrer" className="icon-35 rounded-circle bg-white overflow-hidden d-inline-flex align-items-center justify-content-center text-dark " target="_blank">
                <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
            <div className="items pt-lg-3 pt-0">
            <ul className="line-links list-icon">
                <li><span className="text-blue me-2 my-1">
                    <i className="bi bi-geo-alt-fill"></i>
                  </span>
                  <a>300 E 59th St. Suite 2801, New York, NY 10022</a></li>
                  <li><span className="text-blue me-2 my-1">
                    <i className="bi bi-telephone-fill"></i>
                  </span>
                  <a href="tel:+1 917 974 8905">+1 917 974 8905</a></li>
                  <li><span className="text-blue me-2 my-1">
                    <i className="bi bi-envelope-fill"></i>
                  </span>
                  <a href="mailto:pankaj.jain@algebrik.com">pankaj.jain@algebrik.com</a></li>
            </ul>
            </div>
          </div>
          <div className="col-lg-2 col-sm-6 col-6 col-md-4">
            <div className="items">
              <div className="fw-bold pb-3 text-blue">
              Services
              </div>
              <ul>
                {
                  footerData.services.map((link, index) => (
                    <li key={index}>
                      {/* <Link href={link.link}><a>{link.title}</a></Link> */}
                      <a>{link.title}</a>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-sm-6 col-6 col-md-4">
            <div className="items">
              <div className="fw-bold pb-3 text-blue">
                Resource
              </div>
              <ul>
                {
                  footerData.resources.map((link, index) => (
                    <li key={index}>
                      {/* <Link href={link.link}><a>{link.title}</a></Link> */}
                      <a>{link.title}</a>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-sm-6 col-6 col-md-4">
            <div className="items">
              <div className="fw-bold pb-3 text-blue">
                Company
              </div>
              <ul>
                {
                  footerData.company.map((link, index) => (
                    <li key={index}>
                      {/* <a href={link.link}>{link.title}</a> */}
                      <a>{link.title}</a>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="foot">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-6 col-12 col-md-6">
            © 2024 <a href="#" className="text-decoration-none">algebrik.com</a> All Rights Reserved.
            </div>
            <div className="col-lg-6 col-md-6">
              <small className="small float-lg-end">
              <a href="#" className=" text-decoration-none ">Terms & Conditions</a> | <a href="#" className=" text-decoration-none">Privacy Policy</a> 
              </small>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer