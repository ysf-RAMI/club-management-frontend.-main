import { useState, useContext } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faSignOutAlt,
  faCog,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

export default function DashHeader({ onLinkClick }) {
  const { user, Logout, role } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await Logout();
    navigate('/login');
  };

  const handleProfile = () => {
    if (onLinkClick) {
      onLinkClick('Profile');
    }
    setShowDropdown(false);
  };

  const handleSettings = () => {
    if (onLinkClick) {
      onLinkClick('Settings');
    }
    setShowDropdown(false);
  };

  const getRoleBadgeColor = (userRole) => {
    switch (userRole) {
      case 'admin':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'admin-member':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'member':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'student':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatRole = (userRole) => {
    if (userRole === 'admin-member') return 'Admin Member';
    return userRole?.charAt(0).toUpperCase() + userRole?.slice(1);
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                <span className="text-white font-bold text-xl">CM</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent hidden sm:block">
                Club Management
              </span>
            </a>
          </div>

          {/* Right Section - User Menu */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
              >
                {/* User Avatar */}
                <div className="relative">
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-purple-200 group-hover:border-purple-400 transition-colors duration-200"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center border-2 border-purple-200 group-hover:border-purple-400 transition-colors duration-200">
                      <span className="text-white font-semibold text-sm">
                        {user?.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>

                {/* User Info */}
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-200">
                    {user?.name}
                  </p>
                  <p className={`text-xs px-2 py-0.5 rounded-full border inline-block ${getRoleBadgeColor(role)}`}>
                    {formatRole(role)}
                  </p>
                </div>

                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`text-gray-400 text-xs transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                  {/* User Info in Dropdown */}
                  <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-4">
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-sm text-purple-100">{user?.email}</p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      onClick={handleProfile}
                      className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors duration-200 flex items-center space-x-3 text-gray-700 hover:text-purple-600"
                    >
                      <FontAwesomeIcon icon={faUser} className="w-5" />
                      <span className="font-medium">My Profile</span>
                    </button>

                    <button
                      onClick={handleSettings}
                      className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors duration-200 flex items-center space-x-3 text-gray-700 hover:text-purple-600"
                    >
                      <FontAwesomeIcon icon={faCog} className="w-5" />
                      <span className="font-medium">Settings</span>
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors duration-200 flex items-center space-x-3 text-red-600 hover:text-red-700"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="w-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </header>
  );
}
