import React from 'react'
import { Link } from 'react-router-dom';
import {BsLinkedin,BsGithub,BsTwitter,BsInstagram} from 'react-icons/bs'
const Footer = () => {
  return (
    <div className=''>
      <footer className='py-4 '>
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src="images/newsletter.png" alt="newsletter" />
                <h2 className='mb-0 text-white'>Sign Up For Newsletter</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group mb-3">
                <input type="text" className="form-control py-2" placeholder="Enter Your Email" aria-label="Enter Your Email" aria-describedby="basic-addon2"></input>
                <span className="input-group-text p-3" id="basic-addon2">
                  Subcribe
                </span>
              </div>
            </div>

          </div>
        </div>
      </footer>
      <footer className='py-4'>
        <div className="continer-xxl">
          <div className="row ">
            <div className="col-4 " style={{paddingLeft:"10%"}}>
              <h4 className='text-white mb-4  '> Contact Us</h4>
              <div className="">
                <address className='text-white fs-6'>24 Street , Park Avenue,<br/>New York , California <br/>
                Pincode : 100010 </address>
                <a href='tel:+91 7977113766' className='mt-4 d-block mb-1 text-white'>+91 7977113766</a>
                <a href='mailto:dakshcjain@gmail.com' className='mt-4 d-block mb-4 text-white'>dakshcjain@gmail.com</a>
                <div className='social_icons d-flex align-items-center gap-30 text-white'>
                <a href="/" className='text-white'><BsLinkedin  className='text-white fs-4'/></a>
                <a href="/" className='text-white'><BsGithub    className='text-white fs-4'/></a>
                <a href="/" className='text-white'><BsTwitter   className='text-white fs-4'/></a>
                <a href="/" className='text-white'><BsInstagram className='text-white fs-4' /></a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className='text-white mb-4'>Information</h4>
              <div className="footer-links d-flex flex-column">
              <Link to="/privacy-policy" className="text-white py-2 mb-1">
                  Privacy Policy
                </Link>
                <Link to="/refund-policy" className="text-white py-2 mb-1">
                  Refund Policy
                </Link>
                <Link to="/shipping-policy" className="text-white py-2 mb-1">
                  Shipping Policy
                </Link>
                <Link to="/term-conditions" className="text-white py-2 mb-1">
                  Terms & Conditions
                </Link>
              </div>

            </div>
            <div className="col-3">
              <h4 className='text-white mb-4'>Account</h4>
              <div className="footer-links d-flex flex-column">
                <Link className='text-white py-2 mb-1'>Search</Link>
                <Link className='text-white py-2 mb-1'>About Us</Link>
                <Link className='text-white py-2 mb-1'>Faq</Link>
                <Link className='text-white py-2 mb-1'>Contact</Link>
                <Link className='text-white py-2 mb-1'>Size Chart</Link>
              </div>

            </div>
            <div className="col-2" style={{paddingRight:"5%"}}>
              <h4 className='text-white mb-4'>Quick Links</h4>
              <div className="footer-links d-flex flex-column">
                <Link className='text-white py-2 mb-1'>Accessories</Link>
                <Link className='text-white py-2 mb-1'>Laptops</Link>
                <Link className='text-white py-2 mb-1'>Headphones</Link>
                <Link className='text-white py-2 mb-1'>Smart Watches</Link>
                <Link className='text-white py-2 mb-1'>Tablets</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-4'>
        <div className="row">
          <div className="col-12">
            <p className="text-center mb-0 text-white">&copy; {new Date().getFullYear()}; Powerde by Developer'rs</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer