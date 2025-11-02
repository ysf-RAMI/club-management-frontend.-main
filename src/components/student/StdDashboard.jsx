import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState, useContext } from 'react';
import { fetchUserRegisteredEvents, fetchPendingClubRequests } from '../../app/userSlice';
import { AuthContext } from '../../contexts/AuthContext';
import { fetchEvents } from '../../app/eventSlice';
import Loader from '../common/UI/Loader';
import { useNavigate } from 'react-router-dom';
import { faEye, faGraduationCap, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function StdDashboard({ onLinkClick }) {
  const dispatch = useDispatch();
  const { user, authLoading } = useContext(AuthContext);
  const [clubRegister, setClubRegister] = useState([]);
  const navigate = useNavigate();

  const userId = user ? user.id : null;

  const { clubs, loading: clubsLoading } = useSelector((state) => state.clubs);
  const { events, filteredEvents, eventsLoading } = useSelector((state) => state.events);
  const { registeredEvents, registeredEventsLoading, clubRequests, clubRequestsLoading } = useSelector((state) => state.user);

  console.log('Registered Events:', registeredEvents);
  console.log('Registered Events Loading:', registeredEventsLoading);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Available':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // When user becomes available, load registered events via slice thunk
  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchUserRegisteredEvents(user.id));
      dispatch(fetchPendingClubRequests(user.id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const checkClubRegister = (userId) => {
    const joinedClubs = clubs.filter((club) => club.users.some((user) => user.id === userId));
    setClubRegister(joinedClubs);
  };

  useEffect(() => {
    if (userId) {
      checkClubRegister(userId);
    }
  }, [userId, clubs]);

  return (
    <div className="p-4">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* My Club Requests */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="text-md font-semibold text-gray-800">My Club Requests</h3>
              <button
                onClick={() => navigate('/clubs')}
                className="text-blue-600 hover:text-blue-800 text-xs font-medium cursor-pointer"
              >
                Browse More Clubs
              </button>
            </div>

            <div className="space-y-2 mt-3">
              {clubRequestsLoading ? (
                <Loader />
              ) : clubRequests.length === 0 ? (
                <div className="text-sm text-gray-500">
                  You have no pending club requests.
                </div>
              ) : (
                clubRequests
                  .map((club) => {
                    const currentUserPivot = club.users.find(
                      (u) => u.id === userId && u.pivot.status === 'pending'
                    );
                    if (!currentUserPivot) return null; // Should not happen if filtered correctly

                    return (
                      <div
                        key={club.id}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer ${
                          currentUserPivot.pivot.status === 'approved'
                            ? 'bg-green-50 border-green-200'
                            : currentUserPivot.pivot.status === 'pending'
                              ? 'bg-yellow-50 border-yellow-200'
                              : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <img
                            src={club.image}
                            alt={club.name}
                            className="h-10 w-10 rounded-lg object-cover mr-3"
                          />
                          <div>
                            <p className="font-medium text-gray-800 text-sm">{club.name}</p>
                            <p className="text-xs text-gray-600">{club.description}</p>
                            <p className="text-2xs text-gray-500">Applied {currentUserPivot.pivot.created_at}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-2xs font-medium ${getStatusColor(
                              currentUserPivot.pivot.status,
                            )}`}
                          >
                            {currentUserPivot.pivot.status}
                          </span>
                          <button className="text-gray-500 hover:text-gray-700 p-0.5 cursor-pointer">
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                  .filter(Boolean) // Remove null entries from the map
              )}
            </div>

            <button
              onClick={() => navigate('/clubs')}
              className="mt-3 w-full py-2 px-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center justify-center text-sm cursor-pointer"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Request to Join New Club
            </button>
          </div>

          {/* My Registered Events */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-md font-semibold text-gray-800">My Registered Events</h3>
              <button
                onClick={() => onLinkClick('Events Registration')}
                className="text-blue-600 hover:text-blue-800 text-xs font-medium cursor-pointer"
              >
                View All Events
              </button>
            </div>

            <div className="space-y-2">
              {registeredEventsLoading ? (
                <Loader />
              ) : registeredEvents.length === 0 ? (
                <div className="text-sm text-gray-500">
                  You have not registered for any events yet.
                </div>
              ) : (
                registeredEvents.map((evt) => {
                  const club = clubs.find((c) => c.id === (evt.clubId || evt.club_id));
                  const currentUserPivot = evt.users?.find(
                    (user) => user.id === userId
                  );
                  const status = currentUserPivot?.pivot?.status;
                  let statusClass = '';
                  if (status === 'pending') {
                    statusClass = 'bg-yellow-100 text-yellow-800';
                  } else if (status === 'approved') {
                    statusClass = 'bg-green-100 text-green-800';
                  } else if (status === 'rejected') {
                    statusClass = 'bg-red-100 text-red-800';
                  }

                  return (
                    <div
                      key={evt.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center">
                        <img
                          src={evt.image}
                          alt={evt.title}
                          className="h-10 w-10 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{evt.title}</p>
                          <p className="text-xs text-gray-600">{club ? club.name : '—'}</p>
                          <p className="text-2xs text-gray-500">
                            {evt.date} • {evt.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {status && (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>
                        )}
                        <button
                          onClick={() => navigate(`/events/${evt.id}`)}
                          className="text-gray-500 hover:text-gray-700 p-0.5 cursor-pointer"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-md font-semibold text-gray-800">Upcoming Events</h3>
              <button
                onClick={() => onLinkClick('Events Registration')}
                className="text-blue-600 hover:text-blue-800 text-xs font-medium cursor-pointer"
              >
                View All Events
              </button>
            </div>
            {eventsLoading ? (
              <Loader />
            ) : (
              <div className="space-y-2">
                {(() => {
                  const upcomingEvents = (filteredEvents || events).slice(0, 5);
                  if (upcomingEvents.length === 0) {
                    return (
                      <div className="text-sm text-gray-500">
                        No upcoming events.
                      </div>
                    );
                  }
                  return upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="h-10 w-10 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{event.title}</p>
                          <p className="text-xs text-gray-600">
                            {event.club?.name || event.club || '—'}
                          </p>
                          <p className="text-2xs text-gray-500">
                            {event.date} • {event.time} • {event.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => navigate(`/events/${event.id}`)}
                          className="text-gray-500 hover:text-gray-700 p-0.5 cursor-pointer"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            )}
          </div>
        </div>
        {/* Right Column */}
        <div className="lg:col-span-1 space-y-4">
          {/* Discover More */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg shadow-sm">
            <h3 className="text-md font-bold mb-1.5">Discover More</h3>
            <p className="text-blue-100 text-xs mb-3">
              Explore new clubs and expand your interests!
            </p>
            <button
              onClick={() => (window.location.href = '/clubs')}
              className="bg-white text-blue-600 px-3 py-1.5 rounded-md font-semibold hover:bg-gray-100 transition-colors text-sm cursor-pointer"
            >
              Browse Clubs
            </button>
          </div>
        </div>
      </div>

      {/* Help Button */}
      <button className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors cursor-pointer">
        <FontAwesomeIcon icon={faGraduationCap} className="text-md" />
      </button>
    </div>
  );
}
