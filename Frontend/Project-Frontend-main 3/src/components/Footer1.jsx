import React from 'react'
import './Footer1.css'

const Footer1 = () => {
  return (
    <>
      <div className="Footer">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="ft-1">
              <h3 className="text-2xl md:text-3xl font-bold mb-4"><span>WILD</span>EYES</h3>
              <p style={{ fontFamily: "cursive" }} className="text-sm md:text-base">
                Identify species, learn fascinating facts and discover the wonders of wildlife around you <br /> - Start your journey into the wild today{" "}
              </p>
              <div className="footer-icons mt-4">
                <i className="fa-brands fa-facebook mx-2"></i>
                <i className="fa-brands fa-twitter mx-2"></i>
                <i className="fa-brands fa-instagram mx-2"></i>
                <i className="fa-brands fa-linkedin-in mx-2"></i>
              </div>
            </div>
            <div className="ft-2 mt-8 md:mt-0">
              <h5 className="text-lg md:text-xl font-semibold mb-4">Quick Links</h5>
              <ul className="text-sm md:text-base">
                <li className="nav-item mb-2">
                  <a className="" href="/cars">Explore</a>
                </li>
                <li className="nav-item mb-2">
                  <a className="" href="/">Home</a>
                </li>
                <li className="nav-item mb-2">
                  <a className="" href="/profile">Services</a>
                </li>
                <li className="nav-item mb-2">
                  <a className="" href="/">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className="ft-3 mt-8 lg:mt-0">
              <h5 className="text-lg md:text-xl font-semibold mb-4">Contact Us</h5>
              <p className="text-sm md:text-base mb-2"><i className="fa-solid fa-phone-volume mr-2"></i> +91 8858371818</p>
              <p className="text-sm md:text-base mb-2"><i className="fa-solid fa-envelope mr-2"></i> wildeyes07@gmail.com</p>
              <p className="text-sm md:text-base"><i className="fa-solid fa-paper-plane mr-2"></i> Guwahati, India.</p>
            </div>
          </div>
        </div>
      </div>
      <div className='Last-footer'>
        <p className="text-center text-sm md:text-base py-4">Design By Group 4</p>
      </div>
    </>
  )
}

export default Footer1;