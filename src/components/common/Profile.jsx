import { useState, useContext } from 'react';
import { AuthContext } from '../../../src/contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCog,
  faShieldAlt,
  faBell,
  faCamera,
  faSave,
  faTimes,
  faEdit,
  faCheck,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ...user,
    firstName: user.name ? user.name.split(' ')[0] : '',
    lastName: user.name ? user.name.split(' ').slice(1).join(' ') : '',
    profilePicture: user.image || '/img/Club1.png',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to API
    console.log('Saving profile data:', formData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
    setFormData(user);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: faUser },
    { id: 'security', label: 'Security', icon: faShieldAlt },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <header className="mb-6">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">Profile Settings</h1>
              <p className="text-purple-100 text-base">
                Manage your account information and preferences
              </p>
            </div>
            <FontAwesomeIcon icon={faUser} className="text-white text-5xl opacity-30" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Profile Overview */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
              <div className="text-center">
                <div className="relative inline-block mb-3">
                  <img
                    src={formData.profilePicture}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover mx-auto"
                  />
                  <button className="absolute bottom-0 right-0 bg-purple-600 text-white p-1 rounded-full hover:bg-purple-700 transition-colors cursor-pointer">
                    <FontAwesomeIcon icon={faCamera} className="text-xs" />
                  </button>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{formData.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{formData.role}</p>
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
            </div>

            {/* Profile Navigation */}
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors duration-200 text-sm cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-500'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <FontAwesomeIcon icon={tab.icon} className="mr-2 text-xs" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-3">
            {activeTab === 'personal' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                    <p className="text-gray-600 text-sm">
                      Update your personal details and contact information
                    </p>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm cursor-pointer"
                  >
                    <FontAwesomeIcon icon={isEditing ? faCheck : faEdit} className="mr-2" />
                    {isEditing ? 'Save' : 'Edit'}
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <input
                      name="department"
                      value={formData.department || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 text-sm cursor-pointer"
                    ></input>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faSave} className="mr-2" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Security</h2>
                <div className="text-center py-8">
                    <FontAwesomeIcon icon={faShieldAlt} className="text-gray-300 text-5xl mb-3" />
                    <h3 className="text-lg font-medium text-gray-500 mb-1">Security Settings</h3>
                    <p className="text-gray-400 text-sm">Password and security options will be available here</p>
                    <div className="flex flex-col items-center mt-4">
                        <div className="relative w-1/2">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                placeholder="New Password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 text-sm pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            >
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="text-gray-500" />
                            </button>
                        </div>
                        <div className="relative w-1/2 mt-2">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm New Password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 text-sm pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            >
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="text-gray-500" />
                            </button>
                        </div>
                        <button
                            onClick={handleSave}
                            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faSave} className="mr-2" />
                            Update Password
                        </button>
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
