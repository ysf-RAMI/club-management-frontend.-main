import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faCalendarAlt,
  faClock,
  faGraduationCap,
  faPlus,
  faChartPie,
  faChartLine,
  faFileAlt,
  faBell,
  faDownload,
  faUser,
  faCrown,
  faCheckCircle,
  faExclamationTriangle,
  faEye,
  faUserCheck,
  faUserTimes
} from '@fortawesome/free-solid-svg-icons';

export default function AdMemberDashboard() {
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
      department: "Computer Science",
      requestDate: "2024-01-15",
      reason: "Interested in learning photography techniques"
    },
    {
      id: 2,
      name: "Emily Davis",
      email: "emily.davis@university.edu", 
      department: "Arts",
      requestDate: "2024-01-14",
      reason: "Want to improve my photography skills"
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.wilson@university.edu",
      department: "Engineering",
      requestDate: "2024-01-13",
      reason: "Looking to join photography community"
    }
  ]

  const recentEvents = [
    {
      id: 1,
      title: "Photography Workshop",
      date: "2024-01-20",
      time: "2:00 PM - 4:00 PM",
      location: "Room A-101",
      attendees: 45,
      maxAttendees: 50,
      status: "Upcoming"
    },
    {
      id: 2,
      title: "Photo Walk Downtown",
      date: "2024-01-18",
      time: "10:00 AM - 12:00 PM", 
      location: "Downtown Area",
      attendees: 23,
      maxAttendees: 30,
      status: "Upcoming"
    },
    {
      id: 3,
      title: "Portrait Photography Session",
      date: "2024-01-15",
      time: "3:00 PM - 5:00 PM",
      location: "Studio B",
      attendees: 15,
      maxAttendees: 20,
      status: "Completed"
    }
  ]

  const handleApproveMember = (memberId) => {
    console.log('Approving member:', memberId)
    // Here you would call API to approve member
  }

  const handleRejectMember = (memberId) => {
    console.log('Rejecting member:', memberId)
    // Here you would call API to reject member
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <main className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-xl shadow-lg mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Club Admin Dashboard 👑</h2>
            <p className="text-purple-100 text-lg">Manage your Photography Club and oversee member activities</p>
            <div className="mt-4 flex space-x-6">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUsers} className="text-purple-300 mr-2" />
                <div>
                  <p className="text-xl font-bold">{clubData.members}</p>
                  <p className="text-purple-100 text-sm">Total Members</p>
                </div>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-purple-300 mr-2" />
                <div>
                  <p className="text-xl font-bold">{clubData.events}</p>
                  <p className="text-purple-100 text-sm">Events Created</p>
                </div>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faClock} className="text-purple-300 mr-2" />
                <div>
                  <p className="text-xl font-bold">{clubData.pendingRequests}</p>
                  <p className="text-purple-100 text-sm">Pending Requests</p>
                </div>
              </div>
            </div>
          </div>
          <FontAwesomeIcon icon={faCrown} className="text-white text-6xl opacity-30" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Club Overview */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">My Club: {clubData.name}</h3>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Active
                </span>
              </div>
              <div className="mt-4 flex items-center space-x-6">
                <img src={clubData.image} alt={clubData.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-gray-600 mb-2">{clubData.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Admin: <span className="font-medium text-gray-700">{clubData.adminName}</span></span>
                    <span>•</span>
                    <span>{clubData.members} members</span>
                    <span>•</span>
                    <span>{clubData.events} events</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Events */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Recent Events</h3>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm font-medium">
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Create Event
                </button>
              </div>
              <div className="space-y-3">
                {recentEvents.map(event => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{event.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span>{event.date}</span>
                        <span>•</span>
                        <span>{event.time}</span>
                        <span>•</span>
                        <span>{event.location}</span>
                        <span>•</span>
                        <span>{event.attendees}/{event.maxAttendees} attendees</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                        event.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {event.status}
                      </span>
                      <button className="text-gray-500 hover:text-gray-700 p-1">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Pending Member Requests */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Pending Member Requests</h3>
              <div className="space-y-3">
                {pendingMembers.map(member => (
                  <div key={member.id} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-800">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                        <p className="text-xs text-gray-400">{member.department} • {member.requestDate}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{member.reason}</p>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleApproveMember(member.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 transition-colors"
                      >
                        <FontAwesomeIcon icon={faUserCheck} className="mr-1" />
                        Approve
                      </button>
                      <button 
                        onClick={() => handleRejectMember(member.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition-colors"
                      >
                        <FontAwesomeIcon icon={faUserTimes} className="mr-1" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Club Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active Members</span>
                  <span className="font-bold text-purple-600">{clubData.members}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Upcoming Events</span>
                  <span className="font-bold text-green-600">{recentEvents.filter(e => e.status === 'Upcoming').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Pending Requests</span>
                  <span className="font-bold text-yellow-600">{clubData.pendingRequests}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Completed Events</span>
                  <span className="font-bold text-blue-600">{recentEvents.filter(e => e.status === 'Completed').length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-md mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center gap-3 border border-gray-200 p-4 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition cursor-pointer">
              <span className="bg-purple-100 p-2 rounded-md">
                <FontAwesomeIcon icon={faUsers} className="text-purple-600" />
              </span>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-800">Manage Members</p>
                <p className="text-sm text-gray-500">View and manage club members</p>
              </div>
            </button>
            <button className="flex items-center gap-3 border border-gray-200 p-4 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition cursor-pointer">
              <span className="bg-purple-100 p-2 rounded-md">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-purple-600" />
              </span>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-800">Create Event</p>
                <p className="text-sm text-gray-500">Schedule new club events</p>
              </div>
            </button>
            <button className="flex items-center gap-3 border border-gray-200 p-4 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition cursor-pointer">
              <span className="bg-purple-100 p-2 rounded-md">
                <FontAwesomeIcon icon={faFileAlt} className="text-purple-600" />
              </span>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-800">Manage Files</p>
                <p className="text-sm text-gray-500">Upload and organize files</p>
              </div>
            </button>
            <button className="flex items-center gap-3 border border-gray-200 p-4 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition cursor-pointer">
              <span className="bg-purple-100 p-2 rounded-md">
                <FontAwesomeIcon icon={faUserCheck} className="text-purple-600" />
              </span>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-800">Review Requests</p>
                <p className="text-sm text-gray-500">Approve/reject member requests</p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}