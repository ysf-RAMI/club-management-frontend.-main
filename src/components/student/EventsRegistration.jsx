import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchEventById, fetchEvents, registerForEvent } from '../../app/eventSlice';
import { addRegisteredEvent, fetchUserRegisteredEvents } from '../../app/userSlice';
import { AuthContext } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faMapMarkerAlt,
  faClock,
  faUsers,
  faEye,
  faTimes,
  faCheckCircle,
  faSearch,
  faFilter,
  faPlus,
  faGraduationCap,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';

export default function EventsRegistration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userId = user ? user.id : null;

  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClub, setFilterClub] = useState('');

  const { events, eventsLoading, error } = useSelector((state) => state.events);
  const { registeredEvents, registeredEventsLoading } = useSelector((state) => state.user);
  const { clubs } = useSelector((state) => state.clubs);

  const clubNames = ['All Clubs', ...clubs.map((club) => club.name)];

  const isRegistered = (eventId) =>
    registeredEvents.some((event) => event.id === eventId);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserRegisteredEvents(userId));
    }
  }, [userId, dispatch]);

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Helper function to format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Helper function to get event status based on registration
  const getEventStatus = (event, registeredEvents) => {
    console.log('Checking event status for event ID:', event.id, 'Registered Events:', registeredEvents);
    const isPast = new Date(event.date) < new Date();

    if (isPast) return 'Completed';

    const registeredEvent = registeredEvents.find((regEvent) => regEvent.id === event.id);

    if (registeredEvent) {
      return registeredEvent.status;
    }

    const currentAttendees = event.users ? event.users.length : 0;
    const isFull = currentAttendees >= event.max_participants;

    if (isFull) return 'Full';
    return 'Available';
  };

  // Helper function to get attendee info
  const getAttendeeInfo = (event) => {
    const currentAttendees = event.users ? event.users.length : 0;
    return `${currentAttendees}/${event.max_participants}`;
  };

  const getFilteredEvents = (eventsList) => {
    return eventsList.filter((event) => {
      const clubName = event.club?.name || event.club_info?.name || '';
      return (
        (event.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) &&
        (filterClub === '' || filterClub === 'All Clubs' || clubName === filterClub)
      );
    });
  };

  const today = new Date();
  const upcomingEvents = events.filter((event) => new Date(event.date) >= today);
  const pastEvents = events.filter((event) => new Date(event.date) < today);

  const handleRegisterEvent = async (id) => {
    if (id) {
      const eventToRegister = events.find((event) => event.id === id);
      if (!eventToRegister) {
        toast.error('Event not found.');
        return;
      }
      const result = await dispatch(registerForEvent({ eventId: id }));
      if (registerForEvent.fulfilled.match(result)) {
        dispatch(fetchEventById(id));
        const registeredEventPayload = { ...eventToRegister, status: 'pending' };
        dispatch(addRegisteredEvent(registeredEventPayload));
      } else if (registerForEvent.rejected.match(result)) {
        toast.error(result.payload || 'Failed to register for the event.');
      }
    }
  };

  const handleViewEvent = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'Full':
        return 'bg-red-100 text-red-800';
      case 'Registered':
        return 'bg-green-100 text-green-800';
      case 'Available':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const EventCard = ({ event, showActions = true, registeredEvents }) => {
    const status = getEventStatus(event, registeredEvents);
    const clubName = event.club?.name || event.club_info?.name || 'Unknown Club';
    const category = event.club?.categorie || 'General';
    const eventImage = event.image || '/vite.svg';

    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer flex flex-col">
        <div className="p-4 flex flex-col flex-grow justify-between">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <img
                src={eventImage}
                alt={event.title}
                className="h-10 w-10 rounded-md object-cover mr-3"
              />
              <div>
                <h3 className="text-md font-bold text-gray-800">{event.title}</h3>
                <p className="text-xs text-gray-600">{clubName}</p>
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-1.5 py-0.5 rounded-full mt-1">
                  {category}
                </span>
              </div>
            </div>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}
            >
              {status}
            </span>
          </div>

          <p className="text-gray-600 mb-3 text-xs">{event.description}</p>

          <div className="space-y-1.5 mb-3">
            <div className="flex items-center text-xs text-gray-500">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-1.5 text-blue-500" />
              {formatDate(event.date)}
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <FontAwesomeIcon icon={faClock} className="mr-1.5 text-blue-500" />
              {formatTime(event.date)}
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1.5 text-blue-500" />
              {event.location}
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <FontAwesomeIcon icon={faUsers} className="mr-1.5 text-blue-500" />
              {getAttendeeInfo(event)} attendees
            </div>
          </div>

          {event.registrationDate && (
            <div className="text-xs text-gray-500 mb-3">
              Registered on: {event.registrationDate}
            </div>
          )}

          {showActions && (
            <div className="flex items-center space-x-2 mt-4">
              {status === 'Available' ? (
                <button
                  onClick={() => handleRegisterEvent(event.id)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Register
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded-md cursor-not-allowed"
                >
                  {status === 'Full' ? 'Full' : 'Registered'}
                </button>
              )}
              <button
                onClick={() => handleViewEvent(event.id)}
                className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                View Details
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

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
                {clubNames.map((clubName) => (
                  <option key={clubName} value={clubName}>
                    {clubName}
                  </option>
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
              activeTab === 'upcoming'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
            }`}
          >
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1.5" />
            Upcoming ({getFilteredEvents(upcomingEvents).length})
          </button>
          <button
            onClick={() => setActiveTab('registered')}
            className={`flex items-center px-4 py-2 rounded-md font-medium text-xs transition cursor-pointer ${
              activeTab === 'registered'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
            }`}
          >
            <FontAwesomeIcon icon={faCheckCircle} className="mr-1.5" />
            Registered ({getFilteredEvents(registeredEvents).length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex items-center px-4 py-2 rounded-md font-medium text-xs transition cursor-pointer ${
              activeTab === 'past'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
            }`}
          >
            <FontAwesomeIcon icon={faGraduationCap} className="mr-1.5" />
            Past ({getFilteredEvents(pastEvents).length})
          </button>
        </div>
      </div>

      {/* Events Content */}
      {eventsLoading || registeredEventsLoading ? (
        <div className="text-center py-10">
          <FontAwesomeIcon icon={faSpinner} spin className="text-blue-500 text-5xl mb-3" />
          <h3 className="text-lg font-medium text-gray-500 mb-1.5">Loading Events...</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTab === 'upcoming' &&
            getFilteredEvents(upcomingEvents).map((event) => (
              <EventCard key={event.id} event={event} registeredEvents={registeredEvents} />
            ))}

          {activeTab === 'registered' &&
            getFilteredEvents(registeredEvents).map((event) => (
              <EventCard key={event.id} event={event} registeredEvents={registeredEvents} />
            ))}

          {activeTab === 'past' &&
            getFilteredEvents(pastEvents).map((event) => (
              <EventCard key={event.id} event={event} showActions={false} registeredEvents={registeredEvents} />
            ))}
        </div>
      )}

      {/* Empty State */}
      {!eventsLoading &&
        !registeredEventsLoading &&
        ((activeTab === 'upcoming' && getFilteredEvents(upcomingEvents).length === 0) ||
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
