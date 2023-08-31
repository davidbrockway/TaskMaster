import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../NavigationBar'; 

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailEditMode, setEmailEditMode] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`http://localhost:4000/user/${userId}`);
      const userData = await response.json();

      if (response.ok) {
        setUser(userData);
        setEmail(userData.email); // Set initial email state
      } else {
        console.error('Error fetching user data:', userData.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const navigate = useNavigate();

  const handleUpdateProfile = async () => {
    if (emailEditMode) {
      if (!email || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
        setEmailError('Invalid email format');
        return;
      }

    if (newPassword.length > 0 && newPassword.length < 6) {
      console.error('Password must be at least 6 characters long');
      return;
    }

    console.log('Validation successful. Proceeding with update...');
  
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:4000/user/${userId}/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email, // Updated email value
            password: newPassword, // Updated password value
          }),
        });
  
        if (response.ok) {
          setEmailEditMode(false); // Disable email editing mode
          setNewPassword(''); // Clear new password field
          fetchUserData(); // Fetch updated user data
        } else {
          console.error('Error updating profile:', response.message);
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };
  

  const handleDeleteAccount = async () => {
    if (deleteConfirmation) {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:4000/user/${userId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          localStorage.removeItem('userId');
          navigate('/login');
        } else {
          console.error('Error deleting account:', response.message);
        }
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };
  

  return (
    <>
   <NavigationBar user={user} />
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      {user && (
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="mb-4">
              <label className="block font-medium mb-1">First Name</label>
              <input
                type="text"
                className="w-full p-2 rounded border bg-gray-200"
                value={user.firstName}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Last Name</label>
              <input
                type="text"
                className="w-full p-2 rounded border bg-gray-200"
                value={user.lastName}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Username</label>
              <input
                type="text"
                className="w-full p-2 rounded border bg-gray-200"
                value={user.username}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Email</label>
              <div className="relative rounded border bg-gray-200">
                <input
                  type="email"
                  className={`w-full p-2 pr-8 ${emailEditMode ? '' : 'cursor-not-allowed'}`}
                  value={email}
                  readOnly={!emailEditMode}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(''); // Clear previous error when user starts typing
                  }}
                />
                {!emailEditMode && (
                  <button
                    onClick={() => setEmailEditMode(true)}
                    className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                  >
                    Edit
                  </button>
                )}
              </div>
              {emailError && <p className="text-red-500 mt-2">{emailError}</p>}
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block font-medium mb-1">New Password</label>
              <input
                type="password"
                className="w-full p-2 rounded border"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Confirm New Password</label>
              <input
                type="password"
                className="w-full p-2 rounded border"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            <button
              onClick={handleUpdateProfile}
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-300"
            >
              Update Profile
            </button>
            <div className="mt-8">
              <button
                onClick={() => setDeleteConfirmation(true)}
                className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
              >
                Delete Account
              </button>
              {deleteConfirmation && (
                <div className="mt-2 text-red-500">
                  Are you sure you want to delete your account? This action cannot be undone.
                  <button
                    onClick={handleDeleteAccount}
                    className="w-full bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300 mt-2"
                  >
                    Confirm Deletion
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default ProfilePage;