import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import Header from '../common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { fetchStudentRegisteredEvents } from '../../app/studentSlice';
import { useNavigate } from 'react-router-dom';

export default function StdDashboard({ onLinkClick, activeContent }) {
  const dispatch = useDispatch();
  const studentState = useSelector((state) => (state ? state.student : null)) || {
    student: null,
    loading: false,
    error: null,
  };
  const { student, loading, error } = studentState;
  const eventsState = useSelector((state) => (state ? state.events : null)) || {
    events: [],
    filteredEvents: [],
  };
  const clubsState = useSelector((state) => (state ? state.clubs : null)) || { clubs: [] };
  const navigate = useNavigate();
  const didFetchRef = useRef(false);
  const loggedRef = useRef(false);
  // Use registered events from the student slice
  const registeredEvents =
    useSelector((state) => (state && state.student ? state.student.registeredEvents : [])) || [];
  const registeredLoading = useSelector((state) =>
    state && state.student ? state.student.registeredLoading : false,
  );

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

  useEffect(() => {
    if (!didFetchRef.current) {
      // dispatch(fetchStdDashboard()); // Removed as per user request
      didFetchRef.current = true;
    }
  }, [dispatch]);

  // Debug: log student state as `s` when it changes
  useEffect(() => {
    if (student && !loggedRef.current) {
      console.log('s =', student);
      loggedRef.current = true;
    }
  }, [student]);

  // When student becomes available, load registered events via slice thunk
  useEffect(() => {
    if (student && student.id) {
      dispatch(fetchStudentRegisteredEvents(student.id));
    }
  }, [student, dispatch]);

  return (
    <div className="p-4">
      <Header
        title={`Welcome, ${student ? student.name : 'Student'}! 👋`}
        subtitle="Ready to explore new clubs and events? Let's make the most of your university experience."
        icon={faGraduationCap}
      />

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
              {(student && Array.isArray(student.clubRequests) ? student.clubRequests : []).map(
                (request) => (
                  <div
                    key={request.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer ${
                      request.status === 'Approved'
                        ? 'bg-green-50 border-green-200'
                        : request.status === 'Pending'
                          ? 'bg-yellow-50 border-yellow-200'
                          : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <img
                        src={request.image}
                        alt={request.name}
                        className="h-10 w-10 rounded-lg object-cover mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{request.name}</p>
                        <p className="text-xs text-gray-600">{request.description}</p>
                        <p className="text-2xs text-gray-500">Applied {request.appliedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-2xs font-medium ${getStatusColor(
                          request.status,
                        )}`}
                      >
                        {request.status}
                      </span>
                      <button className="text-gray-500 hover:text-gray-700 p-0.5 cursor-pointer">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </div>
                  </div>
                ),
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
                onClick={() => navigate('/events')}
                className="text-blue-600 hover:text-blue-800 text-xs font-medium cursor-pointer"
              >
                View All Events
              </button>
            </div>
            <div className="space-y-2">
              {registeredEvents.length === 0 ? (
                <div className="text-sm text-gray-500">
                  You have not registered for any events yet.
                </div>
              ) : (
                registeredEvents.map((evt) => {
                  const club = clubsState.clubs.find((c) => c.id === (evt.clubId || evt.club_id));
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
            <div className="space-y-2">
              {(eventsState && (eventsState.filteredEvents || eventsState.events)
                ? (eventsState.filteredEvents || eventsState.events).slice(0, 5)
                : []
              ).map((event) => (
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
                      <p className="text-2xs text-gray-500">
                        {event.attendees ?? 0}/{event.max_participants ?? event.maxAttendees ?? '—'}{' '}
                        attendees
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-2xs font-medium ${getStatusColor(event.status)}`}
                    >
                      {event.status}
                    </span>
                    <button
                      onClick={() => navigate(`/events/${event.id}/register`)}
                      className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 text-xs font-medium transition-colors cursor-pointer"
                    >
                      Register
                    </button>
                    <button
                      onClick={() => navigate(`/events/${event.id}`)}
                      className="text-gray-500 hover:text-gray-700 p-0.5 cursor-pointer"
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
