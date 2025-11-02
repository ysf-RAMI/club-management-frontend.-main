import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers, faCalendarAlt, faHourglassHalf, faPlus, faUserCheck, 
  faUserTimes, faEye, faCrown
} from '@fortawesome/free-solid-svg-icons';
import Header from '../common/Header';
import { useSelector } from 'react-redux';



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

// Sample data for a single club admin
const clubData = {
  id: 1,
  name: "Photography Club",
  description: "A club for photography enthusiasts to share techniques and organize photo walks.",
  members: 127,
  events: 8,
  pendingRequests: 5,
  image: "/img/Club1.png",
  adminName: "Sarah Johnson"
}

const pendingMembers = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@university.edu",
      requestDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Emily Davis",
      email: "emily.davis@university.edu", 
      requestDate: "2024-01-14",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.wilson@university.edu",
      requestDate: "2024-01-13",
    }
]

const recentEvents = [
    {
      id: 1,
      title: "Photography Workshop",
      date: "2024-01-20",
      attendees: 45,
      status: "Upcoming"
    },
    {
      id: 2,
      title: "Photo Walk Downtown",
      date: "2024-01-18",
      attendees: 23,
      status: "Upcoming"
    },
    {
      id: 3,
      title: "Portrait Photography Session",
      date: "2024-01-15",
      attendees: 15,
      status: "Completed"
    }
]

export default function AdMemberDashboard({ onLinkClick }) {

  const {clubs} = useSelector((state) => state.clubs);
  



  const handleApproveMember = (memberId) => {
    console.log('Approving member:', memberId)
  }

  const handleRejectMember = (memberId) => {
    console.log('Rejecting member:', memberId)
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <Header 
        title={`${clubData.name} Dashboard`} 
        subtitle={`Welcome, Manage your club and oversee member activities.`}
        icon={faCrown} 
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Members" value={clubData.members} icon={faUsers} color="blue" />
        <StatCard title="Events Created" value={clubData.events} icon={faCalendarAlt} color="green" />
        <StatCard title="Pending Requests" value={clubData.pendingRequests} icon={faHourglassHalf} color="yellow" />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickActionCard 
            title="Manage Members" 
            subtitle="View and manage club members" 
            icon={faUsers} 
            color="blue"
            onClick={() => onLinkClick('Club Management')}
          />
          <QuickActionCard 
            title="Create Event" 
            subtitle="Schedule new club events" 
            icon={faPlus} 
            color="green"
            onClick={() => onLinkClick('Event Management')}
          />
          <QuickActionCard 
            title="Review Requests" 
            subtitle="Approve/reject members"
            icon={faUserCheck} 
            color="yellow"
            onClick={() => onLinkClick('Club Management')}
          />
          <QuickActionCard 
            title="View Events" 
            subtitle="See all club events" 
            icon={faCalendarAlt} 
            color="purple"
            onClick={() => onLinkClick('Event Management')}
          />
        </div>
      </div>

      {/* Pending Members and Recent Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Member Requests */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Pending Member Requests</h2>
            <div className="space-y-4">
                {pendingMembers.map(member => (
                    <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div>
                            <p className="font-semibold text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button onClick={() => handleApproveMember(member.id)} className="text-green-500 hover:text-green-700 p-2 rounded-full bg-green-100"><FontAwesomeIcon icon={faUserCheck} /></button>
                            <button onClick={() => handleRejectMember(member.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full bg-red-100"><FontAwesomeIcon icon={faUserTimes} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Events</h2>
            <div className="space-y-4">
                {recentEvents.map(event => (
                    <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div>
                            <p className="font-semibold text-gray-900">{event.title}</p>
                            <p className="text-sm text-gray-500">{event.date} - {event.attendees} attendees</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${event.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{event.status}</span>
                            <button className="text-gray-500 hover:text-gray-700"><FontAwesomeIcon icon={faEye} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
