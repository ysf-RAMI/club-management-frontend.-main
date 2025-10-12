import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faMapMarkerAlt,
  faClock,
  faUsers,
  faEye,
  faTimes,
  faCheckCircle,
  faExclamationTriangle,
  faSearch,
  faFilter,
  faPlus,
  faGraduationCap
} from '@fortawesome/free-solid-svg-icons';

export default function EventsRegistration() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClub, setFilterClub] = useState('');

  // Sample events data
  const upcomingEvents = [
    {
      id: 1,
      title: "Photography Workshop",
      description: "Learn advanced photography techniques and composition.",
      club: "Photography Club",
      date: "2024-01-20",
      time: "2:00 PM - 4:00 PM",
      location: "Room A-101",
      attendees: 45,
      maxAttendees: 50,
      status: "Available",
      image: "/img/camera.svg",
      category: "Workshop"
    },
    {
      id: 2,
      title: "Robot Building Competition",
      description: "Annual robotics competition with prizes for winners.",
      club: "Robotics Club",
      date: "2024-01-22",
      time: "10:00 AM - 6:00 PM",
      location: "Engineering Lab",
      attendees: 23,
      maxAttendees: 30,
      status: "Available",
      image: "/img/robot.svg",
      category: "Competition"
    },
    {
      id: 3,
      title: "Debate Tournament",
      description: "Competitive debating tournament with multiple rounds.",
      club: "Debate Society",
      date: "2024-01-25",
      time: "6:00 PM - 9:00 PM",
      location: "Auditorium",
      attendees: 12,
      maxAttendees: 20,
      status: "Available",
      image: "/img/mic.svg",
      category: "Tournament"
    },
    {
      id: 4,
      title: "Environmental Awareness Day",
      description: "Promoting sustainability and environmental consciousness.",
      club: "Environmental Club",
      date: "2024-01-28",
      time: "9:00 AM - 3:00 PM",
      location: "Main Campus",
      attendees: 0,
      maxAttendees: 100,
      status: "Available",
      image: "/img/Club1.png",
      category: "Awareness"
    }
  ];

  const registeredEvents = [
    {
      id: 5,
      title: "Tech Talk Series",
      description: "Weekly tech discussions and presentations.",
      club: "Computer Science Club",
      date: "2024-01-18",
      time: "3:00 PM - 5:00 PM",
      location: "Tech Lab",
      attendees: 35,
      maxAttendees: 40,
      status: "Registered",
      image: "/img/Club2.png",
      category: "Talk",
      registrationDate: "2024-01-15"
    },
    {
      id: 6,
      title: "Art Exhibition",
      description: "Student artwork showcase and gallery walk.",
      club: "Art Club",
      date: "2024-01-19",
      time: "7:00 PM - 9:00 PM",
      location: "Art Gallery",
      attendees: 28,
      maxAttendees: 50,
      status: "Registered",
      image: "/img/Club3.png",
      category: "Exhibition",
      registrationDate: "2024-01-12"
    }
  ];

  const pastEvents = [
    {
      id: 7,
      title: "Coding Bootcamp",
      description: "Intensive coding workshop for beginners.",
      club: "Computer Science Club",
      date: "2024-01-10",
      time: "9:00 AM - 5:00 PM",
      location: "Computer Lab",
      attendees: 25,
      maxAttendees: 30,
      status: "Completed",
      image: "/img/Club2.png",
      category: "Workshop",
      attended: true
    },
    {
      id: 8,
      title: "Sports Day",
      description: "Annual sports competition and activities.",
      club: "Sports Club",
      date: "2024-01-08",
      time: "8:00 AM - 4:00 PM",
      location: "Sports Complex",
      attendees: 150,
      maxAttendees: 200,
      status: "Completed",
      image: "/img/Club1.png",
      category: "Sports",
      attended: false
    }
  ];

  const clubs = ["All Clubs", "Photography Club", "Robotics Club", "Debate Society", "Environmental Club", "Computer Science Club", "Art Club", "Sports Club"];

  const getFilteredEvents = (events) => {
    return events.filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterClub === '' || filterClub === 'All Clubs' || event.club === filterClub)
    );
  };

  const handleRegisterEvent = (eventId) => {
    console.log('Registering for event:', eventId);
    // Here you would call API to register for event
  };

  const handleUnregisterEvent = (eventId) => {
    console.log('Unregistering from event:', eventId);
    // Here you would call API to unregister from event
  };

  const handleViewEvent = (eventId) => {
    console.log('Viewing event:', eventId);
    // Here you would navigate to event details
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-blue-100 text-blue-800';
      case 'Registered': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      case 'Full': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const EventCard = ({ event, showActions = true }) => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <img src={event.image} alt={event.title} className="h-10 w-10 rounded-md object-cover mr-3" />
            <div>
              <h3 className="text-md font-bold text-gray-800">{event.title}</h3>
              <p className="text-xs text-gray-600">{event.club}</p>
              <span className="inline-block bg-purple-100 text-purple-800 text-2xs px-1.5 py-0.5 rounded-full mt-1">
                {event.category}
              </span>
            </div>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-2xs font-medium ${getStatusColor(event.status)}`}>
            {event.status}
          </span>
        </div>
        
        <p className="text-gray-600 mb-3 text-xs">{event.description}</p>
        
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center text-2xs text-gray-500">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1.5 text-blue-500" />
            {event.date}
          </div>
          <div className="flex items-center text-2xs text-gray-500">
            <FontAwesomeIcon icon={faClock} className="mr-1.5 text-blue-500" />
            {event.time}
          </div>
          <div className="flex items-center text-2xs text-gray-500">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1.5 text-blue-500" />
            {event.location}
          </div>
          <div className="flex items-center text-2xs text-gray-500">
            <FontAwesomeIcon icon={faUsers} className="mr-1.5 text-blue-500" />
            {event.attendees}/{event.maxAttendees} attendees
          </div>
        </div>

        {event.registrationDate && (
          <div className="text-2xs text-gray-500 mb-3">
            Registered on: {event.registrationDate}
      </div>
        )}

        {showActions && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleViewEvent(event.id)}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer"
            >
              <FontAwesomeIcon icon={faEye} className="mr-1" />
              View
            </button>
            {event.status === 'Available' && (
              <button
                onClick={() => handleRegisterEvent(event.id)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-1" />
                Register
              </button>
            )}
            {event.status === 'Registered' && (
              <button
                onClick={() => handleUnregisterEvent(event.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer"
              >
                <FontAwesomeIcon icon={faTimes} className="mr-1" />
                Unregister
              </button>
            )}
            </div>
        )}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <header className="mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">Events Registration</h1>
              <p className="text-blue-100 text-sm">Discover and register for club events</p>
            </div>
            <FontAwesomeIcon icon={faCalendarAlt} className="text-white text-4xl opacity-30" />
          </div>
        </div>
      </header>

      {/* Search and Filter Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs cursor-pointer" 
              />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-md pl-8 pr-3 py-2 focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Search events..." 
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faFilter} className="text-gray-500 mr-2 cursor-pointer" />
              <select 
                value={filterClub}
                onChange={(e) => setFilterClub(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1.5 focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm cursor-pointer"
              >
                {clubs.map(club => (
                  <option key={club} value={club}>{club}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex items-center px-4 py-2 rounded-md font-medium text-xs transition cursor-pointer ${
              activeTab === 'upcoming' ? "bg-blue-500 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-blue-50"
            }`}
          >
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1.5" />
            Upcoming ({getFilteredEvents(upcomingEvents).length})
          </button>
          <button
            onClick={() => setActiveTab('registered')}
            className={`flex items-center px-4 py-2 rounded-md font-medium text-xs transition cursor-pointer ${
              activeTab === 'registered' ? "bg-blue-500 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-blue-50"
            }`}
          >
            <FontAwesomeIcon icon={faCheckCircle} className="mr-1.5" />
            Registered ({getFilteredEvents(registeredEvents).length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex items-center px-4 py-2 rounded-md font-medium text-xs transition cursor-pointer ${
              activeTab === 'past' ? "bg-blue-500 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-blue-50"
            }`}
          >
            <FontAwesomeIcon icon={faGraduationCap} className="mr-1.5" />
            Past ({getFilteredEvents(pastEvents).length})
          </button>
        </div>
      </div>

      {/* Events Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeTab === 'upcoming' && getFilteredEvents(upcomingEvents).map(event => (
          <EventCard key={event.id} event={event} />
        ))}
        
        {activeTab === 'registered' && getFilteredEvents(registeredEvents).map(event => (
          <EventCard key={event.id} event={event} />
        ))}
        
        {activeTab === 'past' && getFilteredEvents(pastEvents).map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer">
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <img src={event.image} alt={event.title} className="h-10 w-10 rounded-md object-cover mr-3" />
                  <div>
                    <h3 className="text-md font-bold text-gray-800">{event.title}</h3>
                    <p className="text-xs text-gray-600">{event.club}</p>
                    <span className="inline-block bg-purple-100 text-purple-800 text-2xs px-1.5 py-0.5 rounded-full mt-1">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded-full text-2xs font-medium ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                  {event.attended && (
                    <div className="mt-1">
                      <span className="text-green-600 text-2xs font-medium">✓ Attended</span>
                    </div>
                  )}
                </div>
              </div>
              
              <p className="text-gray-600 mb-3 text-xs">{event.description}</p>
              
              <div className="space-y-1.5 mb-3">
                <div className="flex items-center text-2xs text-gray-500">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-1.5 text-blue-500" />
                  {event.date}
                </div>
                <div className="flex items-center text-2xs text-gray-500">
                  <FontAwesomeIcon icon={faClock} className="mr-1.5 text-blue-500" />
                  {event.time}
                </div>
                <div className="flex items-center text-2xs text-gray-500">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1.5 text-blue-500" />
                  {event.location}
                </div>
              </div>

              <button
                onClick={() => handleViewEvent(event.id)}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer"
              >
                <FontAwesomeIcon icon={faEye} className="mr-1" />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {((activeTab === 'upcoming' && getFilteredEvents(upcomingEvents).length === 0) ||
        (activeTab === 'registered' && getFilteredEvents(registeredEvents).length === 0) ||
        (activeTab === 'past' && getFilteredEvents(pastEvents).length === 0)) && (
        <div className="text-center py-10">
          <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-300 text-5xl mb-3" />
          <h3 className="text-lg font-medium text-gray-500 mb-1.5">No events found</h3>
          <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
        </div>
      )}
    </main>
  );
}
