import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEvents } from '../../../app/eventSlice';
import { API_BASE_URL } from '../../../config/api';
import Loader from '../../../components/common/UI/Loader';

const UpComingEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Filter and get upcoming events (future events)
  const upcomingEvents = events
    ?.filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3) || [];

  // Format date nicely
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format time nicely
  const formatTime = (timeString) => {
    if (!timeString) return 'Time TBA';
    return timeString;
  };

  const handleViewMore = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  if (loading) {
    return (
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <Loader size="large" message="Loading upcoming events..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <p className="text-red-600">Failed to load events. Please try again later.</p>
        </div>
      </section>
    );
  }

  if (upcomingEvents.length === 0) {
    return (
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Upcoming Events</h2>
          <p className="text-center text-gray-600">No upcoming events at the moment. Check back later!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Upcoming Events</h2>
        <p className="text-center text-gray-600 mb-12">
          Don't miss out on exciting activities and workshops
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleViewMore(event.id)}
            >
              {event.image && (
                <div className="w-full mb-4">
                  <img
                    src={`${API_BASE_URL}${event.image}`}
                    alt={event.title}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h3>
              <p className="text-indigo-600 text-sm mb-4">{event.club?.name || 'General Event'}</p>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {formatDate(event.date)}
              </div>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {formatTime(event.time)}
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                </svg>
                {event.location || 'Location TBA'}
              </div>
              {event.description && (
                <p className="text-gray-600 text-sm mt-4 line-clamp-2">
                  {event.description}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate('/events');
            }}
            className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 shadow-lg"
          >
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpComingEvents;
