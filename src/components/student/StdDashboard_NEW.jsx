import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState, useContext } from 'react';
import { fetchUserRegisteredEvents, fetchPendingClubRequests } from '../../app/userSlice';
import { AuthContext, useAuth } from '../../contexts/AuthContext';
import { fetchEvents } from '../../app/eventSlice';
import Loader from '../common/UI/Loader';
import { useNavigate } from 'react-router-dom';
import { faEye, faGraduationCap, faPlus, faCalendarAlt, faUsers, faCheckCircle, faClipboardList, faClock } from '@fortawesome/free-solid-svg-icons';
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
        if (user && user.id) {
            dispatch(fetchUserRegisteredEvents(user.id));
            dispatch(fetchPendingClubRequests(user.id));
        }
    }, [user, dispatch]);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    useEffect(() => {
        console.log('this is user credantials : ' + user);
    }, [])

    const checkClubRegister = (userId) => {
        const joinedClubs = clubs.filter((club) =>
            club.users && Array.isArray(club.users) && club.users.some((user) => user.id === userId)
        );
        setClubRegister(joinedClubs);
    };

    useEffect(() => {
        if (userId) {
            checkClubRegister(userId);
        }
    }, [userId, clubs]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-indigo-50/30 p-4 pb-20">
            {/* Welcome Header */}
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-gray-600 text-sm">Here's what's happening with your clubs and events</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-600 mb-1">My Clubs</p>
                            <p className="text-2xl font-bold text-gray-900">{clubRegister.length}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-lg">
                            <FontAwesomeIcon icon={faUsers} className="text-white text-lg" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-600 mb-1">Registered Events</p>
                            <p className="text-2xl font-bold text-gray-900">{registeredEvents?.length || 0}</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-lg">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-white text-lg" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-600 mb-1">Pending Requests</p>
                            <p className="text-2xl font-bold text-gray-900">{clubRequests?.length || 0}</p>
                        </div>
                        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-lg">
                            <FontAwesomeIcon icon={faClock} className="text-white text-lg" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                {/* LEFT COLUMN */}
                <div className="lg:col-span-2 space-y-4">

                    {/* My Club Requests */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                                        <FontAwesomeIcon icon={faClipboardList} className="text-base" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">My Club Requests</h3>
                                        <p className="text-purple-100 text-xs">Track your club membership status</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate('/clubs')}
                                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer"
                                >
                                    View All
                                </button>
                            </div>
                        </div>

                        <div className="p-4">
                            {clubsLoading ? (
                                <Loader />
                            ) : !clubRequests || clubRequests.length === 0 ? (
                                <div className="text-center py-6">
                                    <div className="inline-block p-3 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl mb-2">
                                        <FontAwesomeIcon icon={faClipboardList} className="text-purple-400 text-2xl" />
                                    </div>
                                    <p className="text-gray-600 text-sm mb-3">No pending club requests</p>
                                    <button
                                        onClick={() => navigate('/clubs')}
                                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 inline-flex items-center gap-2 text-sm cursor-pointer"
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                        Join a Club
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {clubRequests.map((club) => {
                                        if (!club.users || !Array.isArray(club.users)) return null;
                                        const currentUserPivot = club.users.find(
                                            (u) => u.id === userId && u.pivot.status === 'pending'
                                        );
                                        if (!currentUserPivot) return null;

                                        return (
                                            <div
                                                key={club.id}
                                                className="group flex items-center justify-between p-3 rounded-lg border-2 border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-200 cursor-pointer bg-gradient-to-r from-white to-gray-50"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={club.image || '/img/Club1.png'}
                                                        alt={club.name}
                                                        className="h-11 w-11 rounded-lg object-cover ring-2 ring-purple-100 group-hover:ring-purple-300 transition-all duration-200"
                                                    />
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-sm mb-0.5">{club.name}</p>
                                                        <p className="text-xs text-gray-600 line-clamp-1 mb-0.5">{club.description}</p>
                                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                                            <FontAwesomeIcon icon={faClock} className="text-xs" />
                                                            Applied {new Date(currentUserPivot.pivot.created_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 flex items-center gap-1">
                                                        <FontAwesomeIcon icon={faClock} className="text-xs" />
                                                        Pending
                                                    </span>
                                                    <button
                                                        onClick={() => navigate(`/clubs/${club.id}`)}
                                                        className="text-gray-400 hover:text-purple-600 p-1.5 hover:bg-purple-50 rounded-lg transition-all duration-200 cursor-pointer"
                                                    >
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    }).filter(Boolean)}
                                </div>
                            )}

                            {clubRequests && clubRequests.length > 0 && (
                                <button
                                    onClick={() => navigate('/clubs')}
                                    className="mt-4 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                    Request to Join New Club
                                </button>
                            )}
                        </div>
                    </div>

                    {/* My Registered Events */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-base" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">My Registered Events</h3>
                                        <p className="text-green-100 text-xs">Events you're attending</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => onLinkClick('Events Registration')}
                                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer"
                                >
                                    View All
                                </button>
                            </div>
                        </div>

                        <div className="p-4">
                            {registeredEventsLoading ? (
                                <Loader />
                            ) : !registeredEvents || registeredEvents.length === 0 ? (
                                <div className="text-center py-6">
                                    <div className="inline-block p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl mb-2">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="text-green-400 text-2xl" />
                                    </div>
                                    <p className="text-gray-600 text-sm mb-3">No registered events yet</p>
                                    <button
                                        onClick={() => onLinkClick('Events Registration')}
                                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 inline-flex items-center gap-2 text-sm cursor-pointer"
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                        Browse Events
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {registeredEvents.map((evt) => {
                                        const club = clubs.find((c) => c.id === (evt.clubId || evt.club_id));
                                        const currentUserPivot = evt.users?.find((user) => user.id === userId);
                                        const status = currentUserPivot?.pivot?.status;

                                        return (
                                            <div
                                                key={evt.id}
                                                className="group flex items-center justify-between p-3 rounded-lg border-2 border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-200 cursor-pointer bg-gradient-to-r from-white to-gray-50"
                                                onClick={() => navigate(`/events/${evt.id}`)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={evt.image || '/img/Club1.png'}
                                                        alt={evt.title}
                                                        className="h-11 w-11 rounded-lg object-cover ring-2 ring-green-100 group-hover:ring-green-300 transition-all duration-200"
                                                    />
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-sm mb-0.5">{evt.title}</p>
                                                        <p className="text-xs text-gray-600 mb-0.5">{club ? club.name : '—'}</p>
                                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                                            <FontAwesomeIcon icon={faCalendarAlt} className="text-xs" />
                                                            {evt.date} • {evt.location}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {status && (
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${status === 'approved'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : status === 'pending'
                                                                        ? 'bg-yellow-100 text-yellow-800'
                                                                        : 'bg-red-100 text-red-800'
                                                                }`}
                                                        >
                                                            {status === 'approved' && <FontAwesomeIcon icon={faCheckCircle} className="text-xs" />}
                                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                                        </span>
                                                    )}
                                                    <button className="text-gray-400 hover:text-green-600 p-1.5 hover:bg-green-50 rounded-lg transition-all duration-200 cursor-pointer">
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-4 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="text-base" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">Upcoming Events</h3>
                                        <p className="text-indigo-100 text-xs">Don't miss out on these events</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => onLinkClick('Events Registration')}
                                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer"
                                >
                                    View All
                                </button>
                            </div>
                        </div>

                        <div className="p-4">
                            {eventsLoading ? (
                                <Loader />
                            ) : (
                                <div className="space-y-2">
                                    {(() => {
                                        const upcomingEvents = (filteredEvents || events).slice(0, 5);
                                        if (upcomingEvents.length === 0) {
                                            return (
                                                <div className="text-center py-6">
                                                    <div className="inline-block p-3 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl mb-2">
                                                        <FontAwesomeIcon icon={faCalendarAlt} className="text-indigo-400 text-2xl" />
                                                    </div>
                                                    <p className="text-gray-600 text-sm">No upcoming events</p>
                                                </div>
                                            );
                                        }
                                        return upcomingEvents.map((event) => (
                                            <div
                                                key={event.id}
                                                className="group flex items-center justify-between p-3 rounded-lg border-2 border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200 cursor-pointer bg-gradient-to-r from-white to-gray-50"
                                                onClick={() => navigate(`/events/${event.id}`)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={event.image || '/img/Club1.png'}
                                                        alt={event.title}
                                                        className="h-11 w-11 rounded-lg object-cover ring-2 ring-indigo-100 group-hover:ring-indigo-300 transition-all duration-200"
                                                    />
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-sm mb-0.5">{event.title}</p>
                                                        <p className="text-xs text-gray-600 mb-0.5">
                                                            {event.club?.name || event.club || '—'}
                                                        </p>
                                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                                            <FontAwesomeIcon icon={faCalendarAlt} className="text-xs" />
                                                            {event.date} • {event.time} • {event.location}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button className="text-gray-400 hover:text-indigo-600 p-1.5 hover:bg-indigo-50 rounded-lg transition-all duration-200 cursor-pointer">
                                                    <FontAwesomeIcon icon={faEye} />
                                                </button>
                                            </div>
                                        ));
                                    })()}
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN */}
                <div className="lg:col-span-1 space-y-3">

                    {/* Discover More Card */}
                    <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 text-white p-4 rounded-xl shadow-lg overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
                        </div>

                        <div className="relative z-10">
                            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-lg inline-block mb-2.5">
                                <FontAwesomeIcon icon={faGraduationCap} className="text-xl" />
                            </div>
                            <h3 className="text-lg font-bold mb-1.5">Discover More</h3>
                            <p className="text-purple-100 text-xs mb-3 leading-relaxed">
                                Explore new clubs, connect with peers, and expand your interests!
                            </p>
                            <button
                                onClick={() => navigate('/clubs')}
                                className="w-full bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg text-sm cursor-pointer"
                            >
                                Browse All Clubs
                            </button>
                        </div>
                    </div>

                    {/* Quick Actions Card */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
                        <h3 className="text-base font-bold text-gray-900 mb-3">Quick Actions</h3>
                        <div className="space-y-2">
                            <button
                                onClick={() => onLinkClick('Events Registration')}
                                className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border border-green-200 text-green-700 font-semibold transition-all duration-200 text-sm cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faCalendarAlt} />
                                View All Events
                            </button>
                            <button
                                onClick={() => navigate('/clubs')}
                                className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 border border-purple-200 text-purple-700 font-semibold transition-all duration-200 text-sm cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faUsers} />
                                Browse Clubs
                            </button>
                        </div>
                    </div>

                </div>

            </div>

            {/* Help Button */}
            <button className="fixed bottom-4 right-4 bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer z-50">
                <FontAwesomeIcon icon={faGraduationCap} className="text-lg" />
            </button>
        </div>
    );
}
