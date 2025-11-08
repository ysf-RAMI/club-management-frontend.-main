import { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../../src/contexts/AuthContext';
import { updateProfile, updatePassword } from '../../app/userSlice';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from './UI/Loader';
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
  faEnvelope,
  faBuilding,
  faIdCard,
  faLock,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from '../../config/api';

export default function Profile() {
  const dispatch = useDispatch();
  const { user, refreshUser } = useContext(AuthContext);
  const { loading: updateLoading, error } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    ...user,
    firstName: user.name ? user.name.split(' ')[0] : '',
    lastName: user.name ? user.name.split(' ').slice(1).join(' ') : '',
    profilePicture: user.image ? `${API_BASE_URL}${user.image}` : '/img/Club1.png',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setImageFile(file);

      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // Create FormData object
      const formDataToSend = new FormData();

      // Add user ID
      formDataToSend.append('id', user.id);

      // Add name (combine firstName and lastName)
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      if (fullName) {
        formDataToSend.append('name', fullName);
      }

      // Add email if changed
      if (formData.email && formData.email !== user.email) {
        formDataToSend.append('email', formData.email);
      }

      // Add department if changed
      if (formData.department && formData.department !== user.department) {
        formDataToSend.append('department', formData.department);
      }

      // Add image file if selected
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      // Add password if provided
      if (formData.password) {
        formDataToSend.append('password', formData.password);
        formDataToSend.append('password_confirmation', formData.confirmPassword);
      }

      // Add _method for Laravel
      formDataToSend.append('_method', 'PUT');

      // Dispatch update action
      const result = await dispatch(updateProfile(formDataToSend)).unwrap();

      // Success
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      setImageFile(null);

      // Refresh user context
      if (refreshUser) {
        await refreshUser();
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
      console.error('Profile update error:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setImageFile(null);
    // Reset form data to original values
    setFormData({
      ...user,
      firstName: user.name ? user.name.split(' ')[0] : '',
      lastName: user.name ? user.name.split(' ').slice(1).join(' ') : '',
      profilePicture: user.image ? `${API_BASE_URL}${user.image}` : '/img/Club1.png',
    });
  };

  const handlePasswordUpdate = async () => {
    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    try {
      await dispatch(updatePassword({
        userId: user.id,
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })).unwrap();

      toast.success('Password updated successfully!');

      // Reset password fields
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error(error.message || 'Failed to update password');
      console.error('Password update error:', error);
    }
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: faUser },
    { id: 'security', label: 'Security', icon: faShieldAlt },
  ];

  if (loading) {
    return <Loader fullScreen={true} size="large" message="Loading your profile..." />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-indigo-50/30 p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 text-white p-10 rounded-3xl shadow-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <FontAwesomeIcon icon={faUser} className="text-3xl" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-1">Profile Settings</h1>
                <p className="text-purple-100 text-base">
                  Manage your account information and preferences
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              <FontAwesomeIcon icon={faIdCard} className="text-white/20 text-8xl" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column - Profile Overview */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 h-24"></div>
            <div className="px-6 pb-6">
              <div className="relative -mt-12 mb-4">
                <div className="relative inline-block">
                  <img
                    src={formData.profilePicture}
                    alt="Profile"
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-xl"
                  />
                  {isEditing && (
                    <>
                      <input
                        type="file"
                        id="profileImageInput"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="profileImageInput"
                        className="absolute bottom-0 right-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-2.5 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faCamera} className="text-sm" />
                      </label>
                    </>
                  )}
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{formData.name}</h3>
                <p className="text-purple-600 text-sm font-semibold mb-3">{formData.role}</p>
                <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-xs" />
                  Active Account
                </span>
              </div>
            </div>
          </div>

          {/* Profile Navigation */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-300 text-sm font-medium cursor-pointer ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  <FontAwesomeIcon icon={tab.icon} className="mr-3 text-base" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            {activeTab === 'personal' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Update your personal details and contact information
                    </p>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 text-sm font-semibold shadow-lg cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      Edit Profile
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FontAwesomeIcon icon={faUser} className="text-purple-600" />
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm font-medium transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FontAwesomeIcon icon={faUser} className="text-purple-600" />
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm font-medium transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <FontAwesomeIcon icon={faEnvelope} className="text-purple-600" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm font-medium transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <FontAwesomeIcon icon={faBuilding} className="text-purple-600" />
                      Department
                    </label>
                    <input
                      name="department"
                      value={formData.department || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm font-medium transition-all duration-200"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-4 mt-8 pt-6 border-t-2 border-gray-100">
                    <button
                      onClick={handleCancel}
                      disabled={updateLoading}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FontAwesomeIcon icon={faTimes} className="mr-2" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={updateLoading}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 text-sm cursor-pointer shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {updateLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faSave} className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Security Settings</h2>
                  <p className="text-gray-600 text-sm">Update your password and security preferences</p>
                </div>

                <div className="max-w-2xl">
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 mb-8">
                    <div className="text-center mb-6">
                      <div className="inline-block p-4 bg-white rounded-2xl shadow-lg mb-4">
                        <FontAwesomeIcon icon={faShieldAlt} className="text-purple-600 text-4xl" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Change Password</h3>
                      <p className="text-gray-600 text-sm">Keep your account secure with a strong password</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <FontAwesomeIcon icon={faLock} className="text-purple-600" />
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordInputChange}
                            placeholder="Enter current password"
                            className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 text-sm font-medium transition-all duration-200"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors duration-200"
                          >
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <FontAwesomeIcon icon={faLock} className="text-purple-600" />
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordInputChange}
                            placeholder="Enter new password"
                            className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 text-sm font-medium transition-all duration-200"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors duration-200"
                          >
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <FontAwesomeIcon icon={faLock} className="text-purple-600" />
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordInputChange}
                            placeholder="Confirm new password"
                            className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 text-sm font-medium transition-all duration-200"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors duration-200"
                          >
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handlePasswordUpdate}
                      disabled={updateLoading}
                      className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 text-sm cursor-pointer shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FontAwesomeIcon icon={faSave} />
                      {updateLoading ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>

                  {/* Security Tips */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <FontAwesomeIcon icon={faShieldAlt} className="text-blue-600" />
                      Password Security Tips
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600 mt-0.5" />
                        <span>Use at least 8 characters with a mix of letters, numbers, and symbols</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600 mt-0.5" />
                        <span>Avoid using common words or personal information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600 mt-0.5" />
                        <span>Change your password regularly for better security</span>
                      </li>
                    </ul>
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
