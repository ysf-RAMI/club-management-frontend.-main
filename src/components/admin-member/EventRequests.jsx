import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClubs, fetchClubById } from '../../app/clubSlice';
import { approveEventRegistration, fetchClubEventRequests } from '../../app/eventSlice';
import { AuthContext } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faUserTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import Loader from '../common/UI/Loader';
import { toast } from 'react-toastify';

export default function EventRequests() {
    const dispatch = useDispatch();
    const { clubs, loading, currentClub } = useSelector((s) => s.clubs);
    const { userId } = useContext(AuthContext);
    const meId = userId;

    const [myClub, setMyClub] = useState(null);
    const [pendingRegistrations, setPendingRegistrations] = useState([]);

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
            dispatch(fetchClubById(myClub.id));
        } catch (err) {
            toast.error(err || 'Failed to approve');
        }
    };

    const handleReject = async (eventId, userId) => {
        try {
            await dispatch(approveEventRegistration({ eventId, userId, status: 'rejected' })).unwrap();
            toast.success('Registration rejected');
            dispatch(fetchClubById(myClub.id));
        } catch (err) {
            toast.error(err || 'Failed to reject');
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                <h2 className="text-2xl font-bold">Event Registration Requests</h2>
                <p className="text-sm text-gray-500">Review and approve or reject event registration requests for your club's events.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {pendingRegistrations.length === 0 ? (
                    <div className="bg-white p-6 rounded-xl shadow-md text-center text-gray-500">No pending event registrations.</div>
                ) : (
                    pendingRegistrations.map(({ event, user }) => (
                        <div key={`${event.id}-${user.id}`} className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
                            <div>
                                <div className="font-semibold">{user.name} <span className="text-xs text-gray-400">({user.email})</span></div>
                                <div className="text-sm text-gray-500">Requested for: <span className="font-medium">{event.title}</span></div>
                                <div className="text-xs text-gray-400">Requested: {new Date(user.pivot?.registered_at || user.pivot?.created_at || Date.now()).toLocaleString()}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handleApprove(event.id, user.id)} className="px-3 py-2 bg-green-100 text-green-800 rounded-md"><FontAwesomeIcon icon={faUserCheck} /></button>
                                <button onClick={() => handleReject(event.id, user.id)} className="px-3 py-2 bg-red-100 text-red-800 rounded-md"><FontAwesomeIcon icon={faUserTimes} /></button>
                                <a href={`/events/${event.id}`} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md"><FontAwesomeIcon icon={faEye} /></a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
