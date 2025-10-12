import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers, faCalendarAlt, faUserFriends, faHourglassHalf, faPlus, 
  faUser, faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import Header from '../common/Header';

// Reusable Stat Card Component
const StatCard = ({ title, value, icon, color }) => (
  <div className={`bg-white p-6 rounded-lg shadow-lg flex items-center justify-between border-l-4 border-${color}-500`}>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className={`text-3xl font-bold text-gray-800`}>{value}</p>
    </div>
    <div className={`w-16 h-16 bg-${color}-100 rounded-full flex items-center justify-center`}>
      <FontAwesomeIcon icon={icon} className={`text-${color}-500 text-3xl`} />
    </div>
  </div>
);

// Reusable Quick Action Card Component
const QuickActionCard = ({ title, subtitle, icon, onClick, color }) => (
  <div
    className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
    onClick={onClick}
  >
    <div className={`w-16 h-16 bg-${color}-100 rounded-full flex items-center justify-center mb-4`}>
      <FontAwesomeIcon icon={icon} className={`text-${color}-500 text-2xl`} />
    </div>
    <h3 className="font-bold text-gray-800 text-lg mb-1">{title}</h3>
    <p className="text-sm text-gray-500">{subtitle}</p>
  </div>
);

export default function AdminDashboard({ onQuickActionClick }) {
  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <Header 
        title="Admin Dashboard" 
        subtitle="Welcome! Manage clubs, events, and monitor platform activity."
        icon={faShieldAlt} 
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Clubs" value="24" icon={faUsers} color="blue" />
        <StatCard title="Total Events" value="156" icon={faCalendarAlt} color="green" />
        <StatCard title="Active Members" value="1,248" icon={faUserFriends} color="purple" />
        <StatCard title="Pending Requests" value="17" icon={faHourglassHalf} color="yellow" />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickActionCard 
            title="Manage Clubs" 
            subtitle="Edit and view clubs" 
            icon={faUsers} 
            color="blue"
            onClick={() => onQuickActionClick('Manage Clubs')} 
          />
          <QuickActionCard 
            title="User Management" 
            subtitle="Handle user roles" 
            icon={faUserFriends} 
            color="purple"
            onClick={() => onQuickActionClick('User Management')} 
          />
          <QuickActionCard 
            title="Manage Events" 
            subtitle="Create and manage events"
            icon={faCalendarAlt} 
            color="green"
            onClick={() => onQuickActionClick('Manage Events')} 
          />
          <QuickActionCard 
            title="Profile" 
            subtitle="View your profile"
            icon={faUser} 
            color="gray"
            onClick={() => onQuickActionClick('Profile')} 
          />
        </div>
      </div>

      {/* Recent Activities and Most Active Clubs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {/* Activity Item */}
            <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faPlus} className="text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">New club created: <span className="font-bold">"AI & Machine Learning"</span></p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
             {/* Activity Item */}
            <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">New event added to <span className="font-bold">"Debate Society"</span></p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
             {/* Activity Item */}
            <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faUserFriends} className="text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900"><span className="font-bold">12 new members</span> joined <span className="font-bold">"Photography Club"</span></p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
          <button className="mt-4 text-blue-600 hover:underline font-semibold">View All</button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Most Active Clubs</h2>
          <div className="space-y-4">
             {/* Club Item */}
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <img src="/img/Club1.png" alt="Club 1" className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-bold text-gray-900">Computer Science Club</p>
                  <p className="text-sm text-gray-500">142 members</p>
                </div>
              </div>
            </div>
             {/* Club Item */}
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <img src="/img/Club2.png" alt="Club 2" className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-bold text-gray-900">Debate Society</p>
                  <p className="text-sm text-gray-500">88 members</p>
                </div>
              </div>
            </div>
             {/* Club Item */}
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <img src="/img/Club3.png" alt="Club 3" className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-bold text-gray-900">Art & Creativity Club</p>
                  <p className="text-sm text-gray-500">64 members</p>
                </div>
              </div>
            </div>
          </div>
          <button className="mt-4 text-blue-600 hover:underline font-semibold">View All</button>
        </div>
      </div>
    </div>
  );
}
