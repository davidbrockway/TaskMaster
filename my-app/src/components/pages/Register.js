import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
      setErrorMessage('Please fill out all fields');
      return;
    }
  
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
  
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      return;
    }
  
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          username,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Registration successful:', data.message);
        navigate('/login');
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessage('Error registering user');
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
          Register for TaskMaster
        </h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="mb-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-3 rounded-lg border"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-3 rounded-lg border"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
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
        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded-lg border"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleRegister}
          className="bg-indigo-500 text-white py-3 px-6 rounded-lg hover:bg-indigo-600 transition duration-300 shadow-md"
        >
          Register
        </button>
        <p className="text-gray-400 mt-6">
          &copy; {new Date().getFullYear()} TaskMaster. All rights reserved.
        </p>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-500">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;