import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faCalendarAlt,
  faUserFriends,
  faHourglassHalf,
  faPlus,
  faClipboardList,
  faChartBar,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export default function AdminDashboard({ onQuickActionClick }) {
  return (
    <div className="  p-2">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm">Manage clubs, events, and monitor platform activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Total Clubs Card */}
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Clubs</p>
            <p className="text-2xl font-bold text-blue-400">24</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <FontAwesomeIcon icon={faUsers} className="text-blue-400 text-2xl" />
          </div>
        </div>

        {/* Total Events Card */}
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Events</p>
            <p className="text-2xl font-bold text-green-400">156</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-green-400 text-2xl" />
          </div>
        </div>

        {/* Active Members Card */}
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Active Members</p>
            <p className="text-2xl font-bold text-purple-400">1,248</p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <FontAwesomeIcon icon={faUserFriends} className="text-purple-400 text-2xl" />
          </div>
        </div>

        {/* Pending Requests Card */}
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Pending Requests</p>
            <p className="text-2xl font-bold text-yellow-400">17</p>
          </div>
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <FontAwesomeIcon icon={faHourglassHalf} className="text-yellow-400 text-2xl" />
          </div>
        </div>
      </div>

      {/* Recent Activities and Most Active Clubs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Recent Activities */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-md font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faPlus} className="text-green-600 text-xs" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  New club created: "AI & Machine Learning"
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
          </div>
          <button className="mt-4 text-blue-500 hover:underline">View All</button>
        </div>

        {/* Most Active Clubs */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Most Active Clubs</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between  border border-gray-200 p-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <img src="/public/img/Club1.png" alt="Club 1" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Computer Science Club</p>
                  <p className="text-sm text-gray-500">142 members</p>
                </div>
              </div>
            </div>
          </div>
          <button className="mt-4 text-blue-500 hover:underline">View All</button>
        </div>
      </div>

      {/* Quick Actions */}
      <div id="quick-actions" className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-md font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div
            className="border border-gray-300 rounded-lg text-center cursor-pointer flex items-center gap-2 p-2"
            onClick={() => onQuickActionClick('Manage Clubs')}
          >
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faPlus} className="text-blue-500 text-xs" />
            </div>
            <div>
              <p className="font-medium">Create Club</p>
              <p className="text-sm text-gray-500">Add new club</p>
            </div>
          </div>
          <div
            className="border border-gray-300 rounded-lg text-center cursor-pointer flex items-center gap-2 p-2"
            onClick={() => onQuickActionClick('Manage Events')}
          >
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-green-500 text-xs" />
            </div>
            <div>
              <p className="font-medium">Create Event</p>
              <p className="text-sm text-gray-500">Add new event</p>
            </div>
          </div>

          <div
            className="border border-gray-300 rounded-lg cursor-pointer flex items-center gap-2 p-2"
            onClick={() => onQuickActionClick('Manage Users')}
          >
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faUsers} className="text-yellow-500 text-xs" />
            </div>
            <div>
              <p className="font-medium">Review Requests</p>
              <p className="text-sm text-gray-500">Review pending requests</p>
            </div>
          </div>

          <div
            className="border border-gray-300 rounded-lg cursor-pointer flex items-center gap-2 p-2"
            onClick={() => onQuickActionClick('Profile')}
          >
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-purple-500 text-xs" />
            </div>
            <div>
              <p className="font-medium">Profile</p>
              <p className="text-sm text-gray-500">View and manage your profile</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
