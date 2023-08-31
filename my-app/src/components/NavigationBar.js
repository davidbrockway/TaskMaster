import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar({ user }) {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between mx-auto max-w-6xl">
        <div>
          <span className="text-white text-xl font-semibold">
            TaskMaster Beta
          </span>
        </div>
        {user && (
          <div className="flex items-center">
            <div className="relative group">
              <button className="text-white focus:outline-none">
                Hello, {user.firstName}!{' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline-block ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <ul className="absolute hidden group-hover:block mt-2 bg-white border border-gray-300 rounded shadow-md">
                <li>
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      localStorage.removeItem('userId');
                      navigate('/login');
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavigationBar;
