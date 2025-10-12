import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers, faCalendarAlt, faLightbulb, faPlus, faUser, faSearch
} from '@fortawesome/free-solid-svg-icons';
import Header from '../common/Header';

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

// Sample data for a student
const studentData = {
    name: "Alex Ray",
    myClubs: [
        { id: 1, name: "Robotics Club", image: "/img/Club1.png" },
        { id: 2, name: "Debate Society", image: "/img/Club2.png" },
    ],
    recommendedClubs: [
        { id: 3, name: "Photography Club", image: "/img/Club3.png", description: "Capture moments and learn new skills."}, 
        { id: 4, name: "Art & Creativity Club", image: "/img/Club4.png", description: "Express yourself through various art forms."},
    ],
    upcomingEvents: [
        { id: 1, title: "Robotics Competition", club: "Robotics Club", date: "2024-03-15" },
        { id: 2, title: "Debate Workshop", club: "Debate Society", date: "2024-03-20" },
    ]
};

export default function StudentDashboard() {
  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <Header 
        title={`Welcome, ${studentData.name}!`} 
        subtitle="Your central hub for club activities and events."
        icon={faUser} 
      />

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickActionCard title="Browse Clubs" subtitle="Find new clubs" icon={faSearch} color="blue" />
          <QuickActionCard title="My Events" subtitle="View your events" icon={faCalendarAlt} color="green" />
          <QuickActionCard title="My Profile" subtitle="Update your info" icon={faUser} color="purple" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Clubs & Upcoming Events */}
        <div className="lg:col-span-2 space-y-8">
            {/* My Clubs */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">My Clubs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {studentData.myClubs.map(club => (
                        <div key={club.id} className="flex items-center p-4 rounded-lg bg-gray-50 border border-gray-200">
                            <img src={club.image} alt={club.name} className="w-12 h-12 rounded-full mr-4" />
                            <p className="font-semibold text-gray-900">{club.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
                <div className="space-y-4">
                    {studentData.upcomingEvents.map(event => (
                        <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <div>
                                <p className="font-semibold text-gray-900">{event.title}</p>
                                <p className="text-sm text-gray-500">from {event.club}</p>
                            </div>
                            <p className="text-sm font-medium text-blue-600">{event.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Recommended Clubs */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recommended Clubs</h2>
            <div className="space-y-4">
                {studentData.recommendedClubs.map(club => (
                    <div key={club.id} className="flex items-start p-4 rounded-lg bg-gray-50 border border-gray-200">
                        <img src={club.image} alt={club.name} className="w-16 h-16 rounded-lg mr-4" />
                        <div>
                            <p className="font-semibold text-gray-900">{club.name}</p>
                            <p className="text-sm text-gray-600 mb-2">{club.description}</p>
                            <button className="text-sm font-semibold text-blue-600 hover:underline">Learn More &rarr;</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
