import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-4xl mb-4 font-semibold text-gray-800">
          Welcome to the TaskMaster App
        </h1>
        <p className="text-gray-600 mb-6">
          This app is still in beta and experimental. Simplify your life by managing tasks with our innovative to-do list app.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/register"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg text-lg transition duration-300"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg text-lg transition duration-300"
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
