import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto mb-4 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
          />
        </svg>
        <h1 className="text-3xl mb-4 font-semibold text-gray-800">
          Welcome to TaskMaster
        </h1>
        <p className="text-gray-600 mb-6">
          This app is still in beta and experimental.
          <br />
          Simplify your life by managing tasks with our innovative to-do list app.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/register"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg transition duration-300"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-lg transition duration-300"
          >
            Login
          </Link>
        </div>
        <p className="text-gray-400 mt-6">
          &copy; {new Date().getFullYear()} TaskMaster. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Home;
