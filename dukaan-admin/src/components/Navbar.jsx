import {
  ShoppingCart,
  User,
  Bell,
  ChevronDown,
  Search,
  Globe,
  Settings,
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userName = "John Doe"; // This would come from your auth context

  return (
    <nav className="fixed top-0 right-0 left-0 z-40 flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm backdrop-blur-sm  ">
      <div className="flex items-center">
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
            width="150"
            height="80"
            viewBox="0 0 192.756 192.756"
          >
            <g fill-rule="evenodd" clip-rule="evenodd">
              <path d="M49.665 79.176c-4.172-3.183-9.644-4.55-18.055-4.55H16.788l-8.284 7.597h9.743v35.972c2.41.327 6.128.65 11.276.65 8.605 0 15.709-1.816 20.34-5.644 4.169-3.573 7.235-9.352 7.235-17.731.001-7.79-2.869-12.924-7.433-16.294zM31.609 111.12c-1.175 0-2.611 0-3.452-.192V82.223h4.493c8.61 0 13.951 4.16 13.951 13.578 0 10.452-5.928 15.387-14.992 15.319zM63.68 118.391h9.913l-.551-27.356h-8.809l-.553 27.356zM136.621 74.625h-9.906l.545 27.357h8.808l.553-27.357zM68.635 73.912c-3.643 0-6.588 2.942-6.588 6.567 0 3.624 2.945 6.565 6.588 6.565 3.643 0 6.593-2.942 6.593-6.565 0-3.625-2.95-6.567-6.593-6.567zM109.309 110.277c-.781.321-2.604.578-4.818.578-8.151 0-13.892-5.254-13.892-14.345 0-9.478 6.327-14.154 14.603-14.154 4.83 0 7.754.78 10.174 1.883l.744-8.51c-2.393-.804-6.178-1.56-10.85-1.56-14.402 0-25.029 8.314-25.096 22.861 0 6.426 2.214 12.141 6.192 15.975 4.039 3.829 9.839 5.84 17.856 5.84 5.809 0 11.604-1.429 14.668-2.464V92.647h-9.582v17.63h.001zM167.648 110.146c-8.797 0-14.012-5.354-14.012-14.118 0-9.804 6.125-13.998 13.947-13.998 3.588 0 6.387.78 8.344 1.627l.74-8.356c-2.07-.732-5.381-1.388-9.477-1.388-13.293 0-23.98 7.701-23.98 22.631 0 12.536 7.814 21.848 23.006 21.848h9.756l8.279-8.245h-16.603v-.001zM131.668 105.718c-3.641 0-6.59 2.938-6.59 6.561 0 3.628 2.949 6.566 6.59 6.566 3.639 0 6.592-2.938 6.592-6.566 0-3.624-2.953-6.561-6.592-6.561z" />
            </g>
          </svg>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Cart Icon with Badge */}
        <div className="relative">
          <ShoppingCart className="h-5 w-5 text-gray-600 hover:text-gray-900" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            3
          </span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <Bell className="h-5 w-5 text-gray-600 hover:text-gray-900" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 text-xs text-white">
            5
          </span>
        </div>

        {/* Settings */}
        <button className="rounded-full p-1 hover:bg-gray-100">
          <Settings className="h-5 w-5 text-gray-600" />
        </button>

        {/* Profile Section */}
        <div className="relative flex items-center gap-4">
          <button
            className="flex items-center gap-2"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-blue-500">
              <img
                src="https://my-portfolio-beryl-eta.vercel.app/avatar.jpg"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </button>
          <div className="text-left">
            <p className="text-md text-gray-600">Hello, {userName}</p>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 rounded-lg border bg-white py-1 shadow-lg">
              <div className="border-b px-4 py-2">
                <p className="font-medium">{userName}</p>
                <p className="text-sm text-gray-600">Seller ID: #123456</p>
              </div>
              <a
                href="#profile"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <User className="h-4 w-4" />
                Your Profile
              </a>
              <a
                href="#settings"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Settings className="h-4 w-4" />
                Settings
              </a>
              <div className="border-t px-4 py-2">
                <button className="w-full rounded-md bg-red-50 px-4 py-2 text-sm text-red-600 hover:bg-red-100">
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
