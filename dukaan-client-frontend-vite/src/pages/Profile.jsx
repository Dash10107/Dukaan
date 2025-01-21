import React from "react"
import { FiMail, FiPhone, FiExternalLink } from "react-icons/fi"

const Profile = () => {
  return (
    <div className="max-w-6xl mx-auto py-12">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Hero Banner */}
        <div className="relative h-48">
          <img
            src="https://st.depositphotos.com/17620692/61363/v/450/depositphotos_613637820-stock-illustration-black-technology-banner-background.jpg"
            alt="Winter pine branches"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        </div>

        {/* Profile Content */}
        <div className="relative px-6 py-8">
          {/* Profile Picture */}
          <div className="absolute -top-16 left-6">
            <div className="w-32 h-32 rounded-xl overflow-hidden border-4 border-white shadow-lg">
              <img src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-16">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">seller3 seller3</h1>
                <p className="text-gray-500 mt-1">Verified Seller</p>
              </div>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black transition-colors duration-200"
              >
                <span>View API</span>
                <FiExternalLink className="ml-2 w-4 h-4" />
              </a>
            </div>

            {/* Contact Information */}
            <div className="mt-8 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <FiPhone className="w-5 h-5 mr-3 text-gray-800" />
                    <span className="font-medium">2143658709</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiMail className="w-5 h-5 mr-3 text-gray-800" />
                    <a
                      href="mailto:seller3@gmail.com"
                      className="font-medium hover:text-gray-800 transition-colors duration-200"
                    >
                      seller3@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Stats or Information */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-800">124</div>
                <div className="text-sm text-gray-500">Products</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-800">4.8</div>
                <div className="text-sm text-gray-500">Rating</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-800">98%</div>
                <div className="text-sm text-gray-500">Response Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

