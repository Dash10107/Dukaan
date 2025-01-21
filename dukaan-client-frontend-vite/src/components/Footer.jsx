import React from 'react'
import { Link } from 'react-router-dom'
import { BsLinkedin, BsGithub, BsTwitter, BsInstagram } from 'react-icons/bs'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 border-b border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-6 md:mb-0 w-1/2">
              <img src="images/newsletter.png" alt="newsletter" className="h-8 w-auto mr-4" />
              <h2 className="text-2xl font-bold">Sign Up For Newsletter</h2>
            </div>
            <div className="w-full md:w-1/2">
              <div className="flex">
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-l-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Your Email"
                  aria-label="Enter Your Email"
                />
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition duration-300"
                  type="button"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <address className="not-italic mb-4">
              24 Street, Park Avenue,<br />
              New York, California<br />
              Pincode: 100010
            </address>
            <a href="tel:+91 7977113766" className="block mb-2 hover:text-blue-400">+91 7977113766</a>
            <a href="mailto:dakshcjain@gmail.com" className="block mb-4 hover:text-blue-400">dakshcjain@gmail.com</a>
            <div className="flex space-x-4">
              <a href="/" className="text-gray-400 hover:text-white"><BsLinkedin className="text-xl" /></a>
              <a href="/" className="text-gray-400 hover:text-white"><BsGithub className="text-xl" /></a>
              <a href="/" className="text-gray-400 hover:text-white"><BsTwitter className="text-xl" /></a>
              <a href="/" className="text-gray-400 hover:text-white"><BsInstagram className="text-xl" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Information</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className="hover:text-blue-400">Refund Policy</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-blue-400">Shipping Policy</Link></li>
              <li><Link to="/term-conditions" className="hover:text-blue-400">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Account</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-400">Search</Link></li>
              <li><Link to="/" className="hover:text-blue-400">About Us</Link></li>
              <li><Link to="/" className="hover:text-blue-400">FAQ</Link></li>
              <li><Link to="/" className="hover:text-blue-400">Contact</Link></li>
              <li><Link to="/" className="hover:text-blue-400">Size Chart</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-400">Accessories</Link></li>
              <li><Link to="/" className="hover:text-blue-400">Laptops</Link></li>
              <li><Link to="/" className="hover:text-blue-400">Headphones</Link></li>
              <li><Link to="/" className="hover:text-blue-400">Smart Watches</Link></li>
              <li><Link to="/" className="hover:text-blue-400">Tablets</Link></li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} Powered by Developer's</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer