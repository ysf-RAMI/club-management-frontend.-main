import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function AdminProfile() {
  const [sectionClick, setSectionClick] = useState('Personal Information');

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white p-6 shadow-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://img.freepik.com/free-vector/flat-design-illustration-avatar-man_23-2149025244.jpg?w=740&t=st=1695004863~exp=1695005463~hmac=3922922220032223240301629222222222222222222222222222222222222222"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-3"
          />
          <h2 className="text-xl font-semibold text-gray-800">Youssef RAMI</h2>
          <p className="text-sm text-gray-600">Administrator</p>
          <span className="bg-green-200 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mt-2">
            Active
          </span>
        </div>
        <nav>
          <ul>
            <li
              className={`mb-2 p-2 rounded-md cursor-pointer ${sectionClick === 'Personal Information' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setSectionClick('Personal Information')}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" /> Personal Information
            </li>
            <li
              className={`mb-2 p-2 rounded-md cursor-pointer ${sectionClick === 'Account Settings' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setSectionClick('Account Settings')}
            >
              <FontAwesomeIcon icon={faLock} className="mr-2" /> Account Settings
            </li>
            <li
              className={`mb-2 p-2 rounded-md cursor-pointer ${sectionClick === 'Security' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setSectionClick('Security')}
            >
              <FontAwesomeIcon icon={faLock} className="mr-2" /> Security
            </li>
            <li
              className={`mb-2 p-2 rounded-md cursor-pointer ${sectionClick === 'Notifications' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setSectionClick('Notifications')}
            >
              <FontAwesomeIcon icon={faLock} className="mr-2" /> Notifications
            </li>
          </ul>
        </nav>
      </div>

      {/* Right Content */}
      <div className="w-3/4 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile Settings</h1>
        <p className="text-gray-600 mb-8">Manage your account information and preferences</p>

        {sectionClick === 'Personal Information' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
            <p className="text-gray-600 mb-6">
              Update your personal details and contact information
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value="Sarah"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value="Johnson"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value="sarah.johnson@university.edu"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  id="department"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option>Computer Science</option>
                  <option>Engineering</option>
                  <option>Arts</option>
                </select>
              </div>
              <div className="col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows="4"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  Experienced administrator with a passion for student engagement and club
                  management. Dedicated to creating meaningful experiences for all students.
                </textarea>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {sectionClick === 'Account Settings' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h2>
            <p className="text-gray-600">Account settings content goes here.</p>
          </div>
        )}

        {sectionClick === 'Security' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Security</h2>
            <p className="text-gray-600">Security settings content goes here.</p>
          </div>
        )}

        {sectionClick === 'Notifications' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Notifications</h2>
            <p className="text-gray-600">Notification settings content goes here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
