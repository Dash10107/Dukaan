import React, { useState } from "react"
import { Sidebar } from "./Sidebar"

export function DocsLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar for mobile screens */}
      <div
        className={`fixed inset-0 z-20 transition-opacity ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div className="absolute inset-0 bg-black opacity-50" onClick={toggleSidebar}></div>
        <div
          className={`absolute top-0 left-0 bottom-0 w-64 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <Sidebar />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-900">API Documentation</h1>
            <button
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}

