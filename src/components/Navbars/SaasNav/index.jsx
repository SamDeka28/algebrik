import Link from 'next/link';
import {useRef} from "react";

const Navbar = ({ navbarRef, bgWhite }) => {
  const handleMouseMove = (event) => {
    const dropDownToggler = event.target.classList.contains('dropdown-toggle') ? event.target : event.target.querySelector('.dropdown-toggle');
    const dropDownMenu = dropDownToggler?.nextElementSibling;

    dropDownToggler?.classList?.add('show');
    dropDownMenu?.classList?.add('show');
  }

  const handleMouseLeave = (event) => {
    const dropdown = event.target.classList.contains('dropdown') ? event.target : event.target.closest('.dropdown');
    const dropDownToggler = dropdown.querySelector('.dropdown-toggle');
    const dropDownMenu = dropdown.querySelector('.dropdown-menu');

    dropDownToggler?.classList?.remove('show');
    dropDownMenu?.classList?.remove('show');
  }

  return (
    <nav className={`navbar navbar-expand-lg navbar-light style-5 ${bgWhite ? 'bg-light':''}`} ref={navbarRef}>
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src="/assets/img/algebrik/logo.svg" alt="" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <Link href="/">
                <a className="nav-link">
                  HOME
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#about-alegbrik">
                <a className="nav-link">
                  ABOUT ALGEBRIK
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#challengs">
                <a className="nav-link">
                CHALLENGES
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#solutions">
                <a className="nav-link">
                SOLUTIONS
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#">
                <a className="nav-link">
                BLOG
                </a>
              </Link>
            </li>
            {/* <li className="nav-item dropdown" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Services
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li><Link href="/"><a className="dropdown-item">Personal Loans</a></Link></li>
                <li><Link href="/"><a className="dropdown-item">Auto Loans</a></Link></li>
                <li><Link href="/"><a className="dropdown-item">Business Loans</a></Link></li>
                <li><Link href="/"><a className="dropdown-item">Student Loans</a></Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Resources
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li><Link href="/"><a className="dropdown-item">White Paper</a></Link></li>
                <li><Link href="/"><a className="dropdown-item">News Paper</a></Link></li>
                <li><Link href="/"><a className="dropdown-item">Blogs</a></Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Company
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li><Link href="/"><a className="dropdown-item">About Us</a></Link></li>
                <li><Link href="/"><a className="dropdown-item">Our Team</a></Link></li>
                <li><Link href="/"><a className="dropdown-item">Contact Us</a></Link></li>
                <li><Link href="/"><a className="dropdown-item">Careers</a></Link></li>
              </ul>
            </li> */}
          </ul>
          <div className="nav-side">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="#contact">
                <a className="btn blue5-3Dbutn hover-blue2 sm-butn" href="#contact">
                <span>CONTACT</span>
                </a>
              </Link>
            </li>
          </ul>
            {/* <div className="d-flex align-items-center">
              <Link href="/page-contact-5">
                <a className="btn rounded-pill blue5-3Dbutn hover-blue2 sm-butn fw-bold">
                  <span>Start Free Trial </span>
                </a>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar