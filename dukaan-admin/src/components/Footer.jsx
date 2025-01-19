import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-white px-8 py-12 dark:bg-gray-900">
      <div className="mx-auto grid w-full gap-8 lg:grid-cols-4">
        {/* Company Info */}
        <div>
          <h3 className="mb-4 text-lg font-bold">GlobalCat Registry</h3>
          <p className="mb-4 text-sm text-gray-600">
            Your trusted partner in global catalog management and distribution.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-blue-500">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-600 hover:text-blue-500">About Us</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-500">Our Services</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-500">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-500">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="mb-4 font-semibold">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2 text-gray-600">
              <Mail className="h-4 w-4" />
              support@globalcat.com
            </li>
            <li className="flex items-center gap-2 text-gray-600">
              <Phone className="h-4 w-4" />
              +1 (555) 123-4567
            </li>
            <li className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              123 Business Ave, Suite 100<br />
              New York, NY 10001
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="mb-4 font-semibold">Newsletter</h4>
          <p className="mb-4 text-sm text-gray-600">
            Subscribe to our newsletter for updates and insights.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t pt-8 text-center text-sm text-gray-600">
        <p>© {year} GlobalCat Registry. All rights reserved.</p>
      </div>
    </footer>
  )
}

