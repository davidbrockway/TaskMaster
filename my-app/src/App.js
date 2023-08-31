import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard/Dashboard';
import ProfilePage from './components/pages/Dashboard/ProfilePage.js';
import AuthRoute from './components/AuthRoute'; // Import the AuthRoute component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        {/* Protected route for dashboard */}
        <Route path="/dashboard/*" element={<AuthRoute element={<Dashboard />} />} />
        <Route path="/dashboard/profile" element={<AuthRoute element={<ProfilePage />} />} />
        {/* Redirect unknown paths to home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
