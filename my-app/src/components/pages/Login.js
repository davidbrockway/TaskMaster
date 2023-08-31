import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data.message);
        localStorage.setItem('userId', data.user.id); // Store user ID
        navigate('/dashboard');
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Error logging in');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto mb-4 text-indigo-500"
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
        <h1 className="text-2xl mb-4 font-semibold text-gray-800">
          Welcome back to TaskMaster
        </h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded-lg border"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-indigo-500 text-white py-3 px-6 rounded-lg hover:bg-indigo-600 transition duration-300 shadow-md"
        >
          Login
        </button>
        <p className="text-gray-500 mt-4">
          &copy; {new Date().getFullYear()} TaskMaster. All rights reserved.
        </p>
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-500">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;