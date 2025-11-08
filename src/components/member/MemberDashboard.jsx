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
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClubs } from '../../app/clubSlice';
import { fetchEvents } from '../../app/eventSlice';
import { API_BASE_URL } from '../../config/api';
import Loader from '../common/UI/Loader';

export default function MemberDashboard(props) {
  const { clubs, loading } = useSelector((state) => state.clubs);
  const { events, loading: eventsLoading } = useSelector((state) => state.events);
  const dispatch = useDispatch();


  const me = localStorage.getItem('user');
  const meId = me ? JSON.parse(me).id : null;
  const { user } = useContext(AuthContext);
  const url = API_BASE_URL;
  const [joinedClubs, setJoinedClubs] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);

  // Fetch clubs and events on mount
  useEffect(() => {
    dispatch(fetchClubs());
    dispatch(fetchEvents());
  }, [dispatch]);

  // Filter clubs where user is a member with approved status
  useEffect(() => {
    if (clubs.length > 0 && meId) {
      const myJoinedClubs = clubs.filter((club) => {
        if (!club.users) return false;

        // Check if user is in the club with approved status
        const userInClub = club.users.find(
          (u) => u.id === meId && u.pivot.status === 'approved',
        );

        return userInClub !== undefined;
      });

      setJoinedClubs(myJoinedClubs);
    }
  }, [clubs, meId]);

  // Filter Events where user is a participant (registered)
  useEffect(() => {
    if (events.length > 0 && meId) {
      const myJoinedEvents = events.filter((event) => {
        // Check if event has users array
        if (!event.users || !Array.isArray(event.users)) return false;

        // Check if user is registered for the event
        const userInEvent = event.users.find((u) => u.id === meId);

        // Return true only if user is found in the event's users array
        return userInEvent !== undefined;
      });

      // Sort events by date (upcoming first)
      const sortedEvents = myJoinedEvents.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });

      setJoinedEvents(sortedEvents);
    }
  }, [events, meId]);

  // If user is not loaded yet, show loading
  if (!user) {
    return <Loader fullScreen={true} size="large" message="Loading your dashboard..." />;
  }

  // If data is still loading
  if (loading || eventsLoading) {
    return <Loader fullScreen={true} size="large" message="Loading your data..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white p-6 sm:p-8 rounded-2xl shadow-2xl mb-6 sm:mb-8 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  Welcome back, {user.name} 👋
                </h2>
                <p className="text-purple-100 text-sm sm:text-base mb-4 sm:mb-6">Here's your club activity overview</p>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-400/30 p-2 sm:p-3 rounded-lg flex-shrink-0">
                        <FontAwesomeIcon icon={faUsers} className="text-white text-lg sm:text-xl" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-2xl sm:text-3xl font-bold truncate">{joinedClubs.length}</p>
                        <p className="text-purple-100 text-xs sm:text-sm">Clubs Joined</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-400/30 p-2 sm:p-3 rounded-lg flex-shrink-0">
                        <FontAwesomeIcon icon={faCalendarAlt} className="text-white text-lg sm:text-xl" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-2xl sm:text-3xl font-bold truncate">{joinedEvents.length}</p>
                        <p className="text-purple-100 text-xs sm:text-sm">Events Registered</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-400/30 p-2 sm:p-3 rounded-lg flex-shrink-0">
                        <FontAwesomeIcon icon={faClock} className="text-white text-lg sm:text-xl" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-2xl sm:text-3xl font-bold truncate">
                          {joinedEvents.filter(e => new Date(e.date) > new Date()).length}
                        </p>
                        <p className="text-purple-100 text-xs sm:text-sm">Upcoming Events</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block">
                <FontAwesomeIcon icon={faGraduationCap} className="text-white text-8xl opacity-20" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Clubs */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-between items-center pb-4 border-b-2 border-gray-100">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FontAwesomeIcon icon={faUsers} className="text-purple-600" />
                    My Clubs
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{joinedClubs.length} active memberships</p>
                </div>

                <button
                  onClick={() => { props.onLinkClick('My Clubs'); props.activeContent('My Clubs') }}
                  className="text-purple-600 hover:text-purple-700 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all cursor-pointer  hover:bg-purple-100 px-3 py-1.5 rounded-lg"
                >
                  View All →
                </button>
              </div>

              <div className="space-y-3 mt-4">
                {loading ? (
                  <Loader size="medium" message="Loading clubs..." />
                ) : joinedClubs.length === 0 ? (
                  <div className="text-center py-12">
                    <FontAwesomeIcon icon={faUsers} className="text-gray-300 text-5xl mb-4" />
                    <p className="text-gray-500 text-sm">You haven't joined any clubs yet</p>
                    <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm transition-colors">
                      Browse Clubs
                    </button>
                  </div>
                ) : (
                  joinedClubs.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-base group-hover:text-purple-700 transition-colors">
                            {c.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                              <FontAwesomeIcon icon={faUser} className="text-xs" />
                              Member
                            </span>
                            <span className="ml-2">• {c.users_count} members</span>
                          </p>
                        </div>
                      </div>
                      <a
                        href={`/clubs/${c.id}`}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm font-medium transition-colors shadow-sm hover:shadow-md"
                      >
                        View Club
                      </a>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-purple-600" />
                    My Registered Events
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{joinedEvents.length} events registered</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                {eventsLoading ? (
                  <Loader size="medium" message="Loading events..." />
                ) : joinedEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-300 text-5xl mb-4" />
                    <p className="text-gray-500 text-sm mb-2">No events registered yet</p>
                    <p className="text-gray-400 text-xs mb-4">Register for events to see them here!</p>
                    <button
                      onClick={() => { props.onLinkClick('Events'); props.activeContent('Events') }}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm transition-colors"
                    >
                      Browse Events
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {joinedEvents.map((event) => {
                      // Find the current user's registration info
                      const userRegistration = event.users?.find((u) => u.id === meId);
                      const registrationStatus = userRegistration?.pivot?.status || 'registered';
                      const eventDate = new Date(event.date);
                      const isUpcoming = eventDate > new Date();

                      return (
                        <div
                          key={event.id}
                          className="p-4 bg-gradient-to-r from-white to-purple-50 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-start gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0 shadow-md">
                                  <FontAwesomeIcon icon={faCalendarAlt} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-gray-900 text-base mb-1">{event.title}</h4>
                                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <FontAwesomeIcon icon={faUsers} className="text-purple-500" />
                                      {event.club?.name || event.club_info?.name || 'N/A'}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                      <FontAwesomeIcon icon={faClock} className="text-blue-500" />
                                      {eventDate.toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                      })}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                      📍 {event.location || 'TBD'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 md:flex-col md:items-end">
                              <span className={`
                                px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap
                                ${registrationStatus === 'approved' ? 'bg-green-100 text-green-700 border border-green-200' : ''}
                                ${registrationStatus === 'pending' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' : ''}
                                ${registrationStatus === 'rejected' || registrationStatus === 'cancelled' ? 'bg-red-100 text-red-700 border border-red-200' : ''}
                              `}>
                                {registrationStatus.charAt(0).toUpperCase() + registrationStatus.slice(1)}
                              </span>
                              {isUpcoming && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                  Upcoming
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-2xl shadow-xl text-white">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faChartLine} />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => { props.onLinkClick('My Clubs'); props.activeContent('My Clubs') }}
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-xl flex items-center gap-3 transition-all duration-300 border border-white/30 hover:border-white/50 cursor-pointer"
                >
                  <div className="bg-white/20 p-2 rounded-lg">
                    <FontAwesomeIcon icon={faUsers} className="text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-sm">My Clubs</p>
                    <p className="text-xs text-purple-100">Manage memberships</p>
                  </div>
                  <FontAwesomeIcon icon={faChartLine} className="text-white/50" />
                </button>

                <button
                  onClick={() => { props.onLinkClick('Events'); props.activeContent('Events') }}
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-xl flex items-center gap-3 transition-all duration-300 border border-white/30 hover:border-white/50 cursor-pointer"
                >
                  <div className="bg-white/20 p-2 rounded-lg">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-sm">Browse Events</p>
                    <p className="text-xs text-purple-100">Find new events</p>
                  </div>
                  <FontAwesomeIcon icon={faChartLine} className="text-white/50" />
                </button>

                <button
                  onClick={() => { props.onLinkClick('Profile'); props.activeContent('Profile') }}
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-xl flex items-center gap-3 transition-all duration-300 border border-white/30 hover:border-white/50 cursor-pointer"
                >
                  <div className="bg-white/20 p-2 rounded-lg">
                    <FontAwesomeIcon icon={faUser} className="text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-sm">My Profile</p>
                    <p className="text-xs text-purple-100">Update information</p>
                  </div>
                  <FontAwesomeIcon icon={faChartLine} className="text-white/50" />
                </button>
              </div>
            </div>

            {/* Activity Summary */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faChartPie} className="text-purple-600" />
                Activity Summary
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                      <FontAwesomeIcon icon={faUsers} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Total Clubs</p>
                      <p className="text-xs text-gray-500">Active memberships</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">{joinedClubs.length}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Total Events</p>
                      <p className="text-xs text-gray-500">Registered events</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-indigo-600">{joinedEvents.length}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                      <FontAwesomeIcon icon={faClock} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Upcoming</p>
                      <p className="text-xs text-gray-500">Events ahead</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">
                    {joinedEvents.filter(e => new Date(e.date) > new Date()).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faBell} className="text-purple-600" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {joinedClubs.length === 0 && joinedEvents.length === 0 ? (
                  <div className="text-center py-8">
                    <FontAwesomeIcon icon={faBell} className="text-gray-300 text-4xl mb-3" />
                    <p className="text-gray-500 text-sm">No recent activity</p>
                    <p className="text-gray-400 text-xs mt-1">Join clubs and register for events to see activity</p>
                  </div>
                ) : (
                  <>
                    {joinedClubs.slice(0, 2).map((club) => (
                      <div key={club.id} className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-1">
                          <FontAwesomeIcon icon={faUsers} className="text-purple-600 text-xs" />
                          <p className="font-semibold text-gray-800 text-sm">Joined Club</p>
                        </div>
                        <p className="text-xs text-gray-700 font-medium mb-1">{club.name}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-2">
                          <span>{club.users_count} members</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faClock} className="text-xs" />
                            Active member
                          </span>
                        </p>
                      </div>
                    ))}

                    {joinedEvents.slice(0, 2).map((event) => {
                      const eventDate = new Date(event.date);
                      const isUpcoming = eventDate > new Date();
                      return (
                        <div key={event.id} className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200 hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-2 mb-1">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-indigo-600 text-xs" />
                            <p className="font-semibold text-gray-800 text-sm">
                              {isUpcoming ? 'Upcoming Event' : 'Registered Event'}
                            </p>
                          </div>
                          <p className="text-xs text-gray-700 font-medium mb-1">{event.title}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-2">
                            <span>{event.club?.name || event.club_info?.name}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <FontAwesomeIcon icon={faClock} className="text-xs" />
                              {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </p>
                        </div>
                      );
                    })}

                    {(joinedClubs.length + joinedEvents.length) > 4 && (
                      <button
                        onClick={() => { props.onLinkClick('Events'); props.activeContent('Events') }}
                        className="w-full text-center py-2 text-purple-600 hover:text-purple-700 text-sm font-semibold hover:bg-purple-50 rounded-lg transition-colors"
                      >
                        View More Activity
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
