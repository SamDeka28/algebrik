import Link from 'next/link';

const Header = () => {
  
  return (
    <header className=" style-5" data-scroll-index="0">
      <div className="content">
      <div className="container section-head style-5 py-lg-0 pt-4 pt-md-0 ">
        <div className="row gap-5 gap-lg-0 align-items-center">
          <div className="col-lg-6 col-md-12 col-12 col-sm-12 ">
            <h1 className=""><span className='text_blue'>Personalized digital onboarding starts here</span></h1>
            <h3 className="heading_sec mt-lg-3 my-2">Take prospects from<br></br>
                <span className="fw-bold fst-italic">Looked to Booked </span> in minutes,<br></br>
                not days</h3>
            <a className='btn blue5-3Dbutn hover-blue2 btn-sm  text-white mt-lg-3 mt-2 ' href="#contact" >Read for demo</a>
          </div>
          <div className="col-lg-6 col-md-12 col-12 col-sm-12 order-0 order-lg-2 ">
            <div className="img main-img1">
            <img src='/assets/img/algebrik/worlds-first-cloud.png' className="" /></div>
          </div>
        </div>
      </div>
      </div>
    </header>
  )
}

export default Header