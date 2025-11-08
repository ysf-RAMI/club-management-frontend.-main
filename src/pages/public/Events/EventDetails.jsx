import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventById, registerForEvent } from '../../../app/eventSlice';
import { fetchUserById } from '../../../app/userSlice';
import { fetchClubById } from '../../../app/clubSlice';
import Loader from '../../../components/common/UI/Loader';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthContext';
import { API_BASE_URL } from '../../../config/api';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentEvent, loading, error, registerLoading, registerError } = useSelector(
    (state) => state.events,
  );
  const { user, isAuthenticated } = useContext(AuthContext);
  const { user: eventOrganizer } = useSelector((state) => state.user);
  const { currentClub } = useSelector((state) => state.clubs);

  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentEvent?.created_by) {
      dispatch(fetchUserById(currentEvent.created_by));
    }
    if (currentEvent?.club_id) {
      dispatch(fetchClubById(currentEvent.club_id));
    }
  }, [currentEvent, dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Event</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!currentEvent) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4"></h2>
          <Loader />
          <p className="text-gray-500">Loading event .</p>
        </div>
      </div>
    );
  }

  const event = currentEvent;
  const club = currentClub;
  const eventDate = new Date(event.date);
  const eventTime = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const remainingSpots = event.max_participants - event.users?.length || 0;

  const userRegistration = event.users?.find((regUser) => regUser.id === user?.id);
  const isPending = userRegistration?.pivot?.status === 'pending';
  const isApproved = userRegistration?.pivot?.status === 'approved';
  const isRejected = userRegistration?.pivot?.status === 'rejected';

  const isEventFull = event.max_participants && event.users?.length >= event.max_participants;

  const handleRegister = async () => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to register for an event.');
      navigate('/login');
      return;
    }

    if (event) {
      const result = await dispatch(registerForEvent({ eventId: event.id }));
      if (registerForEvent.fulfilled.match(result)) {
        toast.success('Successfully registered for the event!');
        dispatch(fetchEventById(event.id));
      } else if (registerForEvent.rejected.match(result)) {
        toast.error(result.payload || 'Failed to register for the event.');
      }
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const displayDescription = showFullDescription
    ? event.description
    : event.description?.slice(0, 150) + (event.description?.length > 150 ? '...' : '');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Breadcrumb */}
      <div className="bg-white text-gray-600 text-lg p-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">
              Home
            </button>
            <span>&gt;</span>
            <button onClick={() => navigate('/events')} className="text-blue-600 hover:underline">
              Events
            </button>
            <span>&gt;</span>
            <span className="text-gray-900">{event.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative bg-white shadow-md">
          <img
            src={event.image ? `${API_BASE_URL}${event.image}` : '/img/Hero.jpg'}
            alt={event.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <div className="flex space-x-2 mb-2">
              <span className="bg-violet-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {club?.name || event.club?.name || 'N/A'}
              </span>
              <span className="bg-gray-700 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {club?.categorie || event.club?.categorie || 'Event'}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
            <p className="text-xl">{event.tagline || 'No tagline available'}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Description */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Description</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{displayDescription}</p>
              {event.description?.length > 150 && (
                <button
                  onClick={toggleDescription}
                  className="text-violet-600 hover:text-violet-800 font-semibold"
                >
                  {showFullDescription ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Event Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-gray-800">Date</p>
                  <p className="text-gray-600">
                    {eventDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Time</p>
                  <p className="text-gray-600">{eventTime}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Location</p>
                  <p className="text-gray-600">{event.location}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Max Participants</p>
                  <p className="text-gray-600">{event.max_participants || 'Unlimited'}</p>
                </div>
              </div>
            </div>

            {/* Created Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Created Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-gray-800">Created By</p>
                  <p className="text-gray-600">
                    {eventOrganizer
                      ? eventOrganizer.name
                      : `User #${event.created_by}`}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Created At</p>
                  <p className="text-gray-600">{new Date(event.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Registration Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="mb-6">
                <p className="text-3xl font-bold text-violet-600 mb-2">
                  {event.price > 0 ? `$${event.price}` : 'FREE'}
                </p>
                <p className="text-sm text-gray-500">
                  {event.price > 0 ? 'All materials included' : 'Event participation'}
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <svg
                    className="h-5 w-5 text-violet-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {eventDate.toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {eventDate.toLocaleDateString('en-US', { weekday: 'long' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <svg
                    className="h-5 w-5 text-violet-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{eventTime}</p>
                    <p className="text-sm text-gray-500">Event Time</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <svg
                    className="h-5 w-5 text-violet-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{event.location}</p>
                    <p className="text-sm text-gray-500">Event Location</p>
                  </div>
                </div>

                {event.max_participants && (
                  <div className="flex items-center space-x-3">
                    <svg
                      className="h-5 w-5 text-violet-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {remainingSpots} spots remaining
                      </p>
                      <p className="text-sm text-gray-500">
                        Max {event.max_participants} participants
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Registration Button */}
              {isApproved ? (
                <button
                  className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg text-lg cursor-not-allowed mb-4"
                  disabled
                >
                  You are Approved!
                </button>
              ) : isPending ? (
                <button
                  className="w-full bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg text-lg cursor-not-allowed mb-4"
                  disabled
                >
                  Registration Pending...
                </button>
              ) : isRejected ? (
                <button
                  className="w-full bg-red-500 text-white font-bold py-3 px-6 rounded-lg text-lg cursor-not-allowed mb-4"
                  disabled
                >
                  Registration Rejected
                </button>
              ) : isEventFull ? (
                <button
                  className="w-full bg-red-500 text-white font-bold py-3 px-6 rounded-lg text-lg cursor-not-allowed mb-4"
                  disabled
                >
                  Event is Full
                </button>
              ) : (
                <button
                  onClick={handleRegister}
                  className={`w-full bg-violet-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 flex items-center justify-center space-x-2 ${registerLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-violet-700'} mb-4`}
                  disabled={registerLoading}
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{registerLoading ? 'Registering...' : 'Register Now'}</span>
                </button>
              )}
              {registerError && (
                <p className="text-red-500 text-center text-sm mt-2">Error: {registerError}</p>
              )}


            </div>

            {/* Event Organizer Card */}
            {club && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Event Organizer</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={club.image ? `${API_BASE_URL}${club.image}` : '/img/Club1.png'}
                    alt="Club Logo"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{club.name}</p>
                    <p className="text-sm text-gray-500">
                      {club.users.length ? `${club.users.length} members` : 'Club'}
                    </p>
                  </div>
                </div>
                <button
                  className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
                  onClick={() => navigate(`/clubs/${event.club_id}`)}
                >
                  View Club Profile
                </button>
              </div>
            )}


          </div>
        </div>

        {/* Related Events Section */}
        {club?.events && club.events.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-2xl font-bold mb-6">More Events from {club.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {club.events
                .filter((relatedEvent) => relatedEvent.id !== event.id)
                .slice(0, 3)
                .map((relatedEvent) => (
                  <div
                    key={relatedEvent.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
                    onClick={() => navigate(`/events/${relatedEvent.id}`)}
                  >
                    <h3 className="text-lg font-semibold mb-2">{relatedEvent.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {new Date(relatedEvent.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 text-sm mb-3">
                      {relatedEvent.description?.substring(0, 100)}...
                    </p>
                    <span className="text-violet-600 hover:text-violet-800 font-semibold text-sm">
                      View Event →
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
