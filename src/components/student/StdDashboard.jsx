import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faUsers,
  faCalendarAlt,
  faClock,
  faPlus,
  faEye,
  faCheckCircle,
  faExclamationTriangle,
  faTimes,
  faHeart,
  faBookmark,
  faTrophy,
  faStar
} from '@fortawesome/free-solid-svg-icons';

export default function StdDashboard({ onLinkClick, activeContent }) {
  // Sample student data for a student who has not joined any clubs
  const studentData = {
    name: "Alex Johnson",
    department: "Computer Science",
    year: "Junior",
    clubsJoined: 0,
    eventsAttended: 0,
    pendingRequests: 1
  }

  // Sample club requests
  const clubRequests = [
    {
      id: 1,
      name: "Photography Club",
      image: "/img/Club1.png",
      appliedDate: "3 days ago",
      status: "Pending",
      description: "Learn photography techniques and join photo walks"
    }
  ]

  // Sample upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Photography Workshop",
      club: "Photography Club",
      date: "Tomorrow",
      time: "2:00 PM - 4:00 PM",
      location: "Room A-101",
      attendees: 45,
      maxAttendees: 50,
      status: "Available",
      image: "/img/camera.svg"
    },
    {
      id: 2,
      title: "Robot Building Competition",
      club: "Robotics Club",
      date: "Friday",
      time: "10:00 AM - 6:00 PM",
      location: "Engineering Lab",
      attendees: 23,
      maxAttendees: 30,
      status: "Available",
      image: "/img/robot.svg"
    },
    {
      id: 3,
      title: "Debate Tournament",
      club: "Debate Society",
      date: "Next Monday",
      time: "6:00 PM - 9:00 PM",
      location: "Auditorium",
      attendees: 12,
      maxAttendees: 20,
      status: "Available",
      image: "/img/mic.svg"
    }
  ]

  const handleRegisterEvent = (eventId) => {
    console.log('Registering for event:', eventId)
    // Here you would call API to register for event
  }

  const handleViewEvent = (eventId) => {
    console.log('Viewing event:', eventId)
    // Here you would navigate to event details
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Rejected': return 'bg-red-100 text-red-800'
      case 'Available': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <main className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl shadow-lg mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome, {studentData.name}! 👋</h2>
            <p className="text-blue-100 text-lg">
              Ready to explore new clubs and events? Let's make the most of your university experience.
            </p>
          </div>
          <FontAwesomeIcon icon={faGraduationCap} className="text-white text-6xl opacity-30" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Club Requests */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">My Club Requests</h3>
                <button
                  onClick={() => (window.location.href = '/clubs')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Browse More Clubs
                </button>
              </div>
              <div className="space-y-3 mt-4">
                {clubRequests.map(request => (
                  <div key={request.id} className={`flex items-center justify-between p-4 rounded-lg border ${
                    request.status === 'Approved' ? 'bg-green-50 border-green-200' :
                    request.status === 'Pending' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center">
                      <img src={request.image} alt={request.name} className="h-12 w-12 rounded-lg object-cover mr-4" />
                      <div>
                        <p className="font-medium text-gray-800">{request.name}</p>
                        <p className="text-sm text-gray-600">{request.description}</p>
                        <p className="text-xs text-gray-500">Applied {request.appliedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                      <button className="text-gray-500 hover:text-gray-700 p-1">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => (window.location.href = '/clubs')}
                className="mt-4 w-full py-3 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Request to Join New Club
              </button>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Upcoming Events</h3>
                <button
                  onClick={() => onLinkClick('Events Registration')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View All Events
                </button>
              </div>
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                      <img src={event.image} alt={event.title} className="h-12 w-12 rounded-lg object-cover mr-4" />
                      <div>
                        <p className="font-medium text-gray-800">{event.title}</p>
                        <p className="text-sm text-gray-600">{event.club}</p>
                        <p className="text-xs text-gray-500">
                          {event.date} • {event.time} • {event.location}
                        </p>
                        <p className="text-xs text-gray-500">
                          {event.attendees}/{event.maxAttendees} attendees
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                      <button
                        onClick={() => handleRegisterEvent(event.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                      >
                        Register
                      </button>
                      <button
                        onClick={() => handleViewEvent(event.id)}
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
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
            {/* Discover More */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-bold mb-2">Discover More</h3>
              <p className="text-blue-100 mb-4">Explore new clubs and expand your interests!</p>
              <button
                onClick={() => (window.location.href = '/clubs')}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Clubs
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Help Button */}
      <button className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
        <FontAwesomeIcon icon={faGraduationCap} className="text-lg" />
      </button>
    </div>
  );
}
