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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-purple-600">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-4xl mb-4 font-semibold text-gray-800">
          Register for TaskMaster
        </h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="mb-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-3 rounded-lg shadow-md focus:ring focus:ring-indigo-400"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-3 rounded-lg shadow-md focus:ring focus:ring-indigo-400"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg shadow-md focus:ring focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded-lg shadow-md focus:ring focus:ring-indigo-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg shadow-md focus:ring focus:ring-indigo-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded-lg shadow-md focus:ring focus:ring-indigo-400"
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
        <p className="text-gray-500 mt-4">
          &copy; {new Date().getFullYear()} TaskMaster. All rights reserved.
        </p>
        <p className="mt-4">
          Already have an account? <Link to="/login" className="text-indigo-500">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
