import React from "react";

const Profile = () => {
  return (
    <div>
      <div className="mx-auto mt-10">
        <button className="fixed top-4 right-4 p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
          <svg
            className="w-6 h-6 dark:hidden"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
          <svg
            className="w-6 h-6 hidden dark:block"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
          </svg>
        </button>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-colors duration-200">
          <div className="relative h-48">
            <img
              src="https://images.unsplash.com/photo-1737200473221-55883c1fddc4?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute -bottom-12 left-6">
              <img
                src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722163/AbhirajK/Abhirajk%20mykare.webp"
                alt="Profile"
                className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-lg"
              />
            </div>
          </div>
          <div className="pt-16 px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Abhiraj K</h1>
                <p className="text-purple-600">
                  Node.js Developer &amp; Frontend Expert
                </p>
              </div>
              <a
                href="https://abhirajk.vercel.app/"
                target="_blank"
                className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                View API
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
            <p className="mt-6 text-gray-600">
              Hi, I'm a passionate developer with expertise in Node.js, React,
              and Tailwind CSS. I love building efficient and scalable web
              applications.
            </p>
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 rounded-lg text-sm font-medium">
                  Node.js
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 rounded-lg text-sm font-medium">
                  React
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 rounded-lg text-sm font-medium">
                  Tailwind CSS
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 rounded-lg text-sm font-medium">
                  MySQL
                </span>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Contact
              </h2>
              <a
                href="mailto:abhirajk@example.com"
                className="inline-flex items-center text-purple-600 hover:underline"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                abhirajk@example.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
