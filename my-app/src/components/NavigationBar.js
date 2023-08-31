import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar({ user }) {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 group">
      <div className="container mx-auto p-8">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <nav className="bg-white-900">
            <div className="flex items-center justify-between mx-auto max-w-8xl p-4">
              <div>
              <Link to="/" className="text-grey-100 text-xl font-semibold hover:text-grey-300">
                  TaskMaster Beta
                </Link>
              </div>
              <div className="flex items-center">
                {user ? (
                  <div className="relative group">
                    <button className="text-grey focus:outline-none">
                      Hello, {user.firstName}{' '}
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
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
