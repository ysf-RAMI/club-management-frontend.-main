import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchEventById, fetchEvents, registerForEvent } from '../../app/eventSlice';
import { addRegisteredEvent, fetchUserRegisteredEvents } from '../../app/userSlice';
import { fetchClubs } from '../../app/clubSlice';
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
  const [registeringEventId, setRegisteringEventId] = useState(null);

  const { events, eventsLoading, error } = useSelector((state) => state.events);
  const { registeredEvents, registeredEventsLoading } = useSelector((state) => state.user);
  const { clubs } = useSelector((state) => state.clubs);

  const clubNames = ['All Clubs', ...clubs.map((club) => club.name)];

  const isRegistered = (eventId) =>
    registeredEvents.some((event) => event.id === eventId);

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchClubs()); // Fetch clubs for filtering
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserRegisteredEvents(userId));
    }
  }, [userId, dispatch]);

  // Debug: Log events structure to identify club property
  useEffect(() => {
    if (events.length > 0) {
      console.log('Sample event structure:', events[0]);
      console.log('Available clubs for filter:', clubNames);
      console.log('Clubs data:', clubs);
    }
  }, [events, clubNames, clubs]);

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

  // Helper function to get club name by club_id
  const getClubNameById = (clubId) => {
    const club = clubs.find((c) => c.id === clubId);
    return club ? club.name : 'Unknown Club';
  };

  // Helper function to get club category by club_id
  const getClubCategoryById = (clubId) => {
    const club = clubs.find((c) => c.id === clubId);
    return club ? (club.categorie || club.category || 'General') : 'General';
  };

  // Helper function to get event status based on registration
  const getEventStatus = (event, registeredEvents) => {
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
      // Get club name using club_id from the clubs array
      const clubName = event.club_id ? getClubNameById(event.club_id) :
        event.club?.name ||
        event.club_info?.name ||
        event.clubName ||
        event.club_name ||
        'Unknown Club';

      const matchesSearch = (event.title?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      const matchesClub = filterClub === '' || filterClub === 'All Clubs' || clubName === filterClub;

      return matchesSearch && matchesClub;
    });
  };

  const today = new Date();
  const upcomingEvents = events.filter((event) => new Date(event.date) >= today);
  const pastEvents = events.filter((event) => new Date(event.date) < today);

  const handleRegisterEvent = async (id) => {
    if (id) {
      setRegisteringEventId(id); // Set loading state
      const eventToRegister = events.find((event) => event.id === id);
      if (!eventToRegister) {
        toast.error('Event not found.');
        setRegisteringEventId(null);
        return;
      }
      const result = await dispatch(registerForEvent({ eventId: id }));
      if (registerForEvent.fulfilled.match(result)) {
        // Refetch the event to get updated attendee count
        await dispatch(fetchEventById(id));

        // Add to registered events
        const registeredEventPayload = { ...eventToRegister, status: 'pending' };
        dispatch(addRegisteredEvent(registeredEventPayload));

        // Refetch all events to update the UI with latest data
        await dispatch(fetchEvents());

        // Refetch user's registered events to ensure sync
        if (userId) {
          await dispatch(fetchUserRegisteredEvents(userId));
        }

        toast.success('Successfully registered for the event!');
      } else if (registerForEvent.rejected.match(result)) {
        toast.error(result.payload || 'Failed to register for the event.');
      }
      setRegisteringEventId(null); // Clear loading state
    }
  }; const handleViewEvent = (eventId) => {
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
    // Get club name and category using club_id
    const clubName = event.club_id ? getClubNameById(event.club_id) :
      event.club?.name ||
      event.club_info?.name ||
      event.clubName ||
      event.club_name ||
      'Unknown Club';
    const category = event.club_id ? getClubCategoryById(event.club_id) :
      event.club?.categorie ||
      event.club?.category ||
      event.category ||
      'General';
    const eventImage = event.image || '/vite.svg';

    return (
      <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1">
        {/* Event Image Header */}
        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
          <img
            src={eventImage}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${getStatusColor(status)}`}>
              {status}
            </span>
          </div>
          <div className="absolute top-3 left-3">
            <span className="inline-block bg-white/90 backdrop-blur-sm text-purple-700 text-xs font-medium px-3 py-1 rounded-full shadow-md">
              {category}
            </span>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          {/* Title and Club Info */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors line-clamp-1">
              {event.title}
            </h3>
            <p className="text-sm text-gray-600 flex items-center">
              <FontAwesomeIcon icon={faGraduationCap} className="mr-2 text-purple-500" />
              {clubName}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
            {event.description}
          </p>

          {/* Event Details */}
          <div className="space-y-2.5 mb-4 flex-grow">
            <div className="flex items-center text-sm text-gray-700 bg-blue-50 p-2 rounded-lg">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2.5 text-blue-600 w-4" />
              <span className="font-medium">{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-700 bg-purple-50 p-2 rounded-lg">
              <FontAwesomeIcon icon={faClock} className="mr-2.5 text-purple-600 w-4" />
              <span className="font-medium">{formatTime(event.date)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-700 bg-green-50 p-2 rounded-lg">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2.5 text-green-600 w-4" />
              <span className="font-medium truncate">{event.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-700 bg-indigo-50 p-2 rounded-lg">
              <FontAwesomeIcon icon={faUsers} className="mr-2.5 text-indigo-600 w-4" />
              <span className="font-medium">{getAttendeeInfo(event)} attendees</span>
            </div>
          </div>

          {event.registrationDate && (
            <div className="text-xs text-gray-500 mb-3 flex items-center bg-gray-50 p-2 rounded-lg">
              <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-green-500" />
              Registered on: {event.registrationDate}
            </div>
          )}

          {/* Action Buttons */}
          {showActions && (
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
              {status === 'Available' ? (
                <button
                  onClick={() => handleRegisterEvent(event.id)}
                  disabled={registeringEventId === event.id}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {registeringEventId === event.id ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin className="mr-1.5" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPlus} className="mr-1.5" />
                      Register
                    </>
                  )}
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-gray-400 rounded-lg cursor-not-allowed opacity-60"
                >
                  {status === 'Full' ? 'Event Full' : 'Registered'}
                </button>
              )}
              <button
                onClick={() => handleViewEvent(event.id)}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-purple-700 bg-purple-50 border-2 border-purple-200 rounded-lg hover:bg-purple-100 hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
              >
                <FontAwesomeIcon icon={faEye} className="mr-1.5" />
                Details
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-3" />
                Events Registration
              </h1>
              <p className="text-purple-100 text-base">Discover amazing events and join your favorite clubs</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-white text-5xl" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter Controls */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 max-w-md">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search Events</label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg pl-11 pr-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-all duration-200"
                placeholder="Search by event name..."
              />
            </div>
          </div>

          <div className="flex items-end gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Club</label>
              <div className="flex items-center bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent transition-all duration-200">
                <FontAwesomeIcon icon={faFilter} className="text-purple-500 mr-3" />
                <select
                  value={filterClub}
                  onChange={(e) => setFilterClub(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm font-medium text-gray-700 cursor-pointer"
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
      </div>

      {/* Tab Navigation */}
      <div className="bg-white p-5 rounded-xl shadow-lg mb-8 border border-gray-100">
        <div className="flex items-center gap-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 whitespace-nowrap ${activeTab === 'upcoming'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
              }`}
          >
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
            Upcoming
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === 'upcoming' ? 'bg-white/30' : 'bg-purple-100 text-purple-700'
              }`}>
              {getFilteredEvents(upcomingEvents).length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('registered')}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 whitespace-nowrap ${activeTab === 'registered'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
              }`}
          >
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            Registered
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === 'registered' ? 'bg-white/30' : 'bg-green-100 text-green-700'
              }`}>
              {getFilteredEvents(registeredEvents).length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 whitespace-nowrap ${activeTab === 'past'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
              }`}
          >
            <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
            Past Events
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === 'past' ? 'bg-white/30' : 'bg-gray-200 text-gray-700'
              }`}>
              {getFilteredEvents(pastEvents).length}
            </span>
          </button>
        </div>
      </div>

      {/* Events Content */}
      {eventsLoading || registeredEventsLoading ? (
        <div className="text-center py-20">
          <div className="inline-block p-8 bg-white rounded-2xl shadow-lg">
            <FontAwesomeIcon icon={faSpinner} spin className="text-purple-500 text-6xl mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">Loading Events...</h3>
            <p className="text-gray-500 text-sm">Please wait while we fetch the latest events</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="text-center py-20">
            <div className="inline-block p-12 bg-white rounded-2xl shadow-lg">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-purple-500 text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">No events found</h3>
              <p className="text-gray-500 text-base mb-6 max-w-md mx-auto">
                Try adjusting your search or filter criteria to discover more events
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterClub('');
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
    </main>
  );
}
