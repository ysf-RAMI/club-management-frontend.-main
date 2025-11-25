import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClubs, fetchClubById } from '../../app/clubSlice';
import { approveEventRegistration, fetchClubEventRequests } from '../../app/eventSlice';
import { AuthContext } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faUserTimes, faEye, faSearch, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Loader from '../common/UI/Loader';
import { toast } from 'react-toastify';

export default function EventRequests() {
    const dispatch = useDispatch();
    const { clubs, loading, currentClub } = useSelector((s) => s.clubs);
    const { userId } = useContext(AuthContext);
    const meId = userId;

    const [myClub, setMyClub] = useState(null);
    const [pendingRegistrations, setPendingRegistrations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchClubs());
    }, [dispatch]);

    useEffect(() => {
        if (clubs.length > 0 && meId) {
            const foundClub = clubs.find((club) =>
                club.users && club.users.some((u) => u.id === meId && u.pivot?.role === 'admin-member'),
            );
            if (foundClub) {
                dispatch(fetchClubById(foundClub.id));
                // Also fetch pending event requests directly from backend
                dispatch(fetchClubEventRequests({ clubId: foundClub.id, status: 'pending', page: 1, limit: 200 }))
                    .unwrap()
                    .then((res) => {
                        const rows = Array.isArray(res) ? res : (res.data || []);
                        if (rows.length > 0) {
                            // Normalize rows to { event, user, pivot }
                            const mapped = rows.map((r) => ({
                                event: r.event || (r.event_id ? { id: r.event_id, title: r.event_title } : null),
                                user: r.user || (r.user_id ? { id: r.user_id, name: r.user_name || r.name, email: r.user_email } : null),
                                pivot: r.pivot || { status: r.status, registered_at: r.registered_at },
                            }));
                            setPendingRegistrations(mapped);
                        }
                    })
                    .catch((err) => {
                        console.debug('fetchClubEventRequests failed', err);
                    });
            }
        }
    }, [clubs, meId, dispatch]);

    useEffect(() => {
        if (currentClub && currentClub.id) {
            setMyClub(currentClub);
            // Collect pending registrations across events
            const pending = [];
            // Strategy 1: look for event.users pivot arrays returned by club detail
            if (Array.isArray(currentClub.events)) {
                currentClub.events.forEach((evt) => {
                    if (Array.isArray(evt.users)) {
                        evt.users.forEach((u) => {
                            const status = u.pivot?.status ?? u.status ?? null;
                            if (status && String(status).toLowerCase() === 'pending') {
                                pending.push({ event: evt, user: u, pivot: u.pivot });
                            }
                        });
                    }
                });
            }

            // Strategy 2: if nothing found, attempt a backend endpoint that returns event registrations for a club
            async function fetchClubEventRequestsFallback() {
                try {
                    const token = localStorage.getItem('access_token');
                    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL || ''}${'/api/clubs/'}${currentClub.id}/event-requests`, {
                        headers: token ? { Authorization: `Bearer ${token}` } : {},
                    });
                    if (res.ok) {
                        const json = await res.json();
                        // Expecting an array of registrations or {data: []}
                        const rows = Array.isArray(json) ? json : (json.data || []);
                        const mapped = rows.map((r) => {
                            // r may contain event and user objects, or event_id/user_id
                            return {
                                event: r.event || currentClub.events?.find((e) => e.id === (r.event_id || r.event?.id)),
                                user: r.user || { id: r.user_id, name: r.name || r.user?.name, email: r.user?.email },
                                pivot: { status: r.status || r.pivot?.status, registered_at: r.registered_at || r.pivot?.registered_at },
                            };
                        });
                        if (mapped.length > 0) {
                            setPendingRegistrations(mapped);
                            return;
                        }
                    } else {
                        console.debug('club event-requests endpoint returned', res.status);
                    }
                } catch (err) {
                    console.debug('club event-requests fetch error', err);
                }

                // Strategy 3: fallback to fetching events for the club and look for registrations on each event
                try {
                    const token = localStorage.getItem('access_token');
                    const eventsRes = await fetch(`${process.env.REACT_APP_API_BASE_URL || ''}${'/api/events?club_id='}${currentClub.id}`, {
                        headers: token ? { Authorization: `Bearer ${token}` } : {},
                    });
                    if (eventsRes.ok) {
                        const evList = await eventsRes.json();
                        const regs = [];
                        // events may include users/pivot or not; if they do, collect pending ones
                        (evList || []).forEach((evt) => {
                            if (Array.isArray(evt.users)) {
                                evt.users.forEach((u) => {
                                    const status = u.pivot?.status ?? u.status ?? null;
                                    if (status && String(status).toLowerCase() === 'pending') {
                                        regs.push({ event: evt, user: u, pivot: u.pivot });
                                    }
                                });
                            }
                        });
                        if (regs.length > 0) {
                            setPendingRegistrations(regs);
                            return;
                        }
                    }
                } catch (err) {
                    console.debug('events by club fallback error', err);
                }

            }

            if (pending.length > 0) {
                setPendingRegistrations(pending);
            } else {
                // run fallback attempts
                fetchClubEventRequestsFallback();
            }
        }
    }, [currentClub]);

    const handleApprove = async (eventId, userId) => {
        try {
            await dispatch(approveEventRegistration({ eventId, userId, status: 'approved' })).unwrap();
            toast.success('Registration approved');
            // Remove from local state immediately
            setPendingRegistrations(prev => prev.filter(reg => !(reg.event.id === eventId && reg.user.id === userId)));
            dispatch(fetchClubById(myClub.id));
        } catch (err) {
            toast.error(err || 'Failed to approve');
        }
    };

    const handleReject = async (eventId, userId) => {
        try {
            await dispatch(approveEventRegistration({ eventId, userId, status: 'rejected' })).unwrap();
            toast.success('Registration rejected');
            // Remove from local state immediately
            setPendingRegistrations(prev => prev.filter(reg => !(reg.event.id === eventId && reg.user.id === userId)));
            dispatch(fetchClubById(myClub.id));
        } catch (err) {
            toast.error(err || 'Failed to reject');
        }
    };

    if (loading) return <Loader />;

    // Filter requests based on search
    const filteredRequests = pendingRegistrations.filter((reg) =>
        reg.user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.event.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-gray-50 p-4 sm:p-6">
            {/* Header */}
            <header className="mb-8">
                <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-8 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Event Registration Requests</h1>
                            <p className="text-teal-100 text-lg">Review and manage pending event registration requests</p>
                        </div>
                        <FontAwesomeIcon icon={faCalendarAlt} className="text-white text-6xl opacity-30" />
                    </div>
                </div>
            </header>

            {/* Search Controls */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
                            />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder="Search by student name or event..."
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Requests List */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Pending Requests ({filteredRequests.length})
                    </h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    STUDENT NAME
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    EVENT NAME
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    REQUESTED DATE
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    ACTIONS
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredRequests.map((reg) => (
                                <tr key={`${reg.event.id}-${reg.user.id}`} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {reg.user.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {reg.user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {reg.event.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(reg.pivot?.registered_at || reg.pivot?.created_at || Date.now()).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleApprove(reg.event.id, reg.user.id)}
                                                className="text-green-600 hover:text-green-900"
                                                title="Approve request"
                                            >
                                                <FontAwesomeIcon icon={faUserCheck} />
                                            </button>
                                            <button
                                                onClick={() => handleReject(reg.event.id, reg.user.id)}
                                                className="text-red-600 hover:text-red-900"
                                                title="Reject request"
                                            >
                                                <FontAwesomeIcon icon={faUserTimes} />
                                            </button>
                                            <a
                                                href={`/events/${reg.event.id}`}
                                                rel="noopener noreferrer"
                                                className="text-gray-600 hover:text-gray-900"
                                                title="View event details"
                                            >
                                                <FontAwesomeIcon icon={faEye} />
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {filteredRequests.length === 0 && (
                    <div className="text-center py-12">
                        <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-300 text-6xl mb-4" />
                        <h3 className="text-xl font-medium text-gray-500 mb-2">
                            {pendingRegistrations.length === 0 ? 'No pending requests' : 'No requests found'}
                        </h3>
                        <p className="text-gray-400">
                            {pendingRegistrations.length === 0
                                ? 'All requests have been processed'
                                : 'Try adjusting your search'}
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
