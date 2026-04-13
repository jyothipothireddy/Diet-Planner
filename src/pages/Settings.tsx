import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Settings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // Profile form state
  const [profileData, setProfileData] = useState({
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    activityLevel: 'moderate',
    goal: 'maintain',
    dietPreference: 'balanced',
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');

  // Load profile data on component mount
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    if (profile) {
      setProfileData(profile);
    }
  }, []);

  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle password form changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  // Save profile updates
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  // Change password
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('Passwords do not match!');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage('Password must be at least 6 characters!');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    // Update password in localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const userIndex = users.findIndex((u: any) => u.email === currentUser.email);
    if (userIndex !== -1) {
      users[userIndex].password = passwordData.newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      currentUser.password = passwordData.newPassword;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    setMessage('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setMessage(''), 3000);
  };

  // Reset all data
  const handleResetData = () => {
    localStorage.removeItem('userProfile');
    setShowResetModal(false);
    navigate('/profile');
  };

  // Delete account
  const handleDeleteAccount = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const updatedUsers = users.filter((u: any) => u.email !== currentUser.email);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('isLoggedIn');

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>

        {/* Success/Error Message */}
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {message}
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-4 px-6 font-semibold ${
                activeTab === 'profile'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600'
              }`}
            >
              Profile Settings
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`flex-1 py-4 px-6 font-semibold ${
                activeTab === 'password'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600'
              }`}
            >
              Change Password
            </button>
            <button
              onClick={() => setActiveTab('data')}
              className={`flex-1 py-4 px-6 font-semibold ${
                activeTab === 'data'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600'
              }`}
            >
              Data Management
            </button>
          </div>

          <div className="p-6">
            {/* Profile Settings Tab */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={profileData.age}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Gender</label>
                    <select
                      name="gender"
                      value={profileData.gender}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={profileData.height}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={profileData.weight}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Activity Level</label>
                  <select
                    name="activityLevel"
                    value={profileData.activityLevel}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Light</option>
                    <option value="moderate">Moderate</option>
                    <option value="active">Active</option>
                    <option value="very-active">Very Active</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Goal</label>
                  <select
                    name="goal"
                    value={profileData.goal}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="lose">Lose Weight</option>
                    <option value="maintain">Maintain Weight</option>
                    <option value="gain">Gain Weight</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Diet Preference</label>
                  <select
                    name="dietPreference"
                    value={profileData.dietPreference}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="balanced">Balanced</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="high-protein">High Protein</option>
                    <option value="low-carb">Low Carb</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition"
                >
                  Save Changes
                </button>
              </form>
            )}

            {/* Change Password Tab */}
            {activeTab === 'password' && (
              <form onSubmit={handleChangePassword} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition"
                >
                  Change Password
                </button>
              </form>
            )}

            {/* Data Management Tab */}
            {activeTab === 'data' && (
              <div className="space-y-6">
                <div className="border border-gray-300 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Reset Profile Data</h3>
                  <p className="text-gray-600 mb-4">
                    This will reset your profile settings. You'll need to set up your profile again.
                  </p>
                  <button
                    onClick={() => setShowResetModal(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition"
                  >
                    Reset Data
                  </button>
                </div>

                <div className="border border-red-300 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-red-600 mb-2">Delete Account</h3>
                  <p className="text-gray-600 mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Reset</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to reset your profile data? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleResetData}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition"
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-red-600 mb-4">Confirm Account Deletion</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? All your data will be permanently removed.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
