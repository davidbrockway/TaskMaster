import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar({ user }) {
  const navigate = useNavigate();

  return (
    <nav className="bg-indigo-900 shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-6xl p-4">
        <div>
          <Link to="/" className="text-white text-xl font-semibold hover:text-indigo-300">
            TaskMaster Beta
          </Link>
        </div>
        <div className="flex items-center">
          {user ? (
            <div className="relative group">
              <button className="text-white focus:outline-none">
                Hello, {user.firstName}{' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline-block ml-1 text-indigo-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  {/* Your SVG path */}
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
          ) : (
            <div className="flex items-center">
              <Link to="/login" className="text-white hover:text-indigo-300 mr-4">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-indigo-300">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
