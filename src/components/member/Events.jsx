import { faCalendarAlt, faMapMarkerAlt, faSearch, faUsers, faTicket, faCheckCircle, faChartPie, faTag } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEvents } from "../../app/eventSlice"
import Loader from "../common/UI/Loader"
import { useNavigate } from "react-router-dom"
import { API_BASE_URL } from '../../config/api'

export default function Events() {
    const dispatch = useDispatch()
    const { events, loading } = useSelector(state => state.events)
    const [activeTab, setActiveTab] = useState('upcoming')
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedClub, setSelectedClub] = useState('All')
    const navigate = useNavigate()

    // Get current user ID
    const me = localStorage.getItem('user')
    const meId = me ? JSON.parse(me).id : null

    useEffect(() => {
        dispatch(fetchEvents())
    }, [dispatch])

    // Filter events registered by current user
    const myEvents = events.filter(event =>
        event.users?.find(u => u.id === meId)
    )

    // Separate upcoming and past events
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const upcomingEvents = myEvents.filter(event => {
        const eventDate = new Date(event.date)
        eventDate.setHours(0, 0, 0, 0)
        return eventDate >= today
    })

    const pastEvents = myEvents.filter(event => {
        const eventDate = new Date(event.date)
        eventDate.setHours(0, 0, 0, 0)
        return eventDate < today
    })

    // Get unique clubs from user's events
    const clubs = ['All', ...new Set(myEvents.map(event => event.club?.name).filter(Boolean))]

    // Apply search and club filter
    const filterEvents = (eventsList) => {
        return eventsList.filter(event => {
            const matchesSearch = event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.description?.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesClub = selectedClub === 'All' || event.club?.name === selectedClub
            return matchesSearch && matchesClub
        })
    }

    const filteredUpcoming = filterEvents(upcomingEvents)
    const filteredPast = filterEvents(pastEvents)

    // Get active filtered list
    const activeEvents = activeTab === 'upcoming' ? filteredUpcoming : filteredPast

    if (loading) {
        return <Loader fullScreen={true} size="large" message="Loading your events..." />
    }

    const EventCard = ({ event }) => {
        // Check registration status
        const userRegistration = event.users?.find(u => u.id === meId)
        const registrationStatus = userRegistration?.pivot?.status

        // Parse date and time from the date field
        const eventDateTime = new Date(event.date)
        const dateOnly = eventDateTime.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        const timeOnly = eventDateTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })

        // Calculate actual registered users count
        const registeredCount = event.users?.length || 0

        return (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
                {/* Event Image */}
                <div className="relative overflow-hidden h-48">
                    <img
                        src={event.image ? `${API_BASE_URL}${event.image}` : '/img/Club1.png'}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                            e.target.src = '/img/Club1.png'
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                    {registrationStatus && (
                        <span className={`absolute top-3 right-3 text-xs backdrop-blur-sm px-3 py-1.5 rounded-full font-semibold shadow-lg border flex items-center gap-1.5 ${registrationStatus === 'approved' ? 'bg-green-500/95 text-white border-green-400' :
                            registrationStatus === 'pending' ? 'bg-yellow-500/95 text-white border-yellow-400' :
                                'bg-red-500/95 text-white border-red-400'
                            }`}>
                            {registrationStatus === 'approved' && <FontAwesomeIcon icon={faCheckCircle} className="text-xs" />}
                            {registrationStatus.charAt(0).toUpperCase() + registrationStatus.slice(1)}
                        </span>
                    )}
                </div>

                {/* Event Content */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors line-clamp-1">
                        {event.title}
                    </h3>

                    {event.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                            {event.description}
                        </p>
                    )}

                    {/* Event Details */}
                    <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <FontAwesomeIcon icon={faCalendarAlt} className="text-purple-600 text-xs" />
                            </div>
                            <span className="font-medium">{dateOnly} at {timeOnly}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-indigo-600 text-xs" />
                            </div>
                            <span className="font-medium">{event.location || 'Location TBA'}</span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <FontAwesomeIcon icon={faUsers} className="text-green-600 text-xs" />
                            </div>
                            <span className="font-medium">
                                {event.max_participants ? `${registeredCount}/${event.max_participants}` : registeredCount}
                            </span>
                        </div>
                        {event.club?.name && (
                            <div className="flex items-center gap-2 text-gray-600">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FontAwesomeIcon icon={faTag} className="text-blue-600 text-xs" />
                                </div>
                                <span className="font-medium">{event.club.name}</span>
                            </div>
                        )}
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={() => navigate(`/events/${event.id}`)}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        View Event Details
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-white text-xl" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
                            <p className="text-gray-600 text-sm mt-1">
                                Manage and view your {myEvents.length} registered event{myEvents.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder="Search events by title or description..."
                                className="pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                            />
                        </div>
                        <div className="relative md:w-64">
                            <select
                                className="pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 cursor-pointer transition-all appearance-none"
                                value={selectedClub}
                                onChange={(e) => setSelectedClub(e.target.value)}
                            >
                                {clubs.map((club) => (
                                    <option key={club} value={club}>
                                        {club === 'All' ? 'All Clubs' : club}
                                    </option>
                                ))}
                            </select>
                            <FontAwesomeIcon
                                icon={faTag}
                                className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                            />
                            <svg className="w-4 h-4 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="mb-6 bg-white rounded-2xl shadow-lg p-2 border border-gray-100 inline-flex gap-2">
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${activeTab === 'upcoming'
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        Upcoming ({upcomingEvents.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('past')}
                        className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${activeTab === 'past'
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        Past Events ({pastEvents.length})
                    </button>
                </div>

                {/* Events Grid */}
                {activeEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {activeEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    // Empty State
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center mb-8 border border-gray-100">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-300 text-4xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            {myEvents.length === 0 ? 'No Events Registered Yet' : 'No Events Found'}
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            {myEvents.length === 0
                                ? 'Start exploring and register for events that interest you!'
                                : 'Try adjusting your search or filter to find events.'}
                        </p>
                        {myEvents.length === 0 && (
                            <button
                                onClick={() => navigate('/student/events')}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                Browse Events
                            </button>
                        )}
                    </div>
                )}

                {/* Summary Stats */}
                {myEvents.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <FontAwesomeIcon icon={faChartPie} className="text-purple-600 text-sm" />
                            </div>
                            Your Event Summary
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="text-purple-600 text-xl" />
                                </div>
                                <p className="text-3xl font-bold text-purple-700 mb-1">{myEvents.length}</p>
                                <p className="text-sm text-gray-600 font-medium">Total Events</p>
                            </div>
                            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                                    <FontAwesomeIcon icon={faTicket} className="text-green-600 text-xl" />
                                </div>
                                <p className="text-3xl font-bold text-green-700 mb-1">{upcomingEvents.length}</p>
                                <p className="text-sm text-gray-600 font-medium">Upcoming</p>
                            </div>
                            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600 text-xl" />
                                </div>
                                <p className="text-3xl font-bold text-blue-700 mb-1">
                                    {myEvents.filter(e => e.users?.find(u => u.id === meId)?.pivot?.status === 'approved').length}
                                </p>
                                <p className="text-sm text-gray-600 font-medium">Approved</p>
                            </div>
                            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                                    <FontAwesomeIcon icon={faTag} className="text-amber-600 text-xl" />
                                </div>
                                <p className="text-3xl font-bold text-amber-700 mb-1">{clubs.length - 1}</p>
                                <p className="text-sm text-gray-600 font-medium">Clubs</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
