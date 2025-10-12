import { faCalendarAlt, faClock, faMapMarkerAlt, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

export default function Events() {
    const [activeTab, setActiveTab] = useState('upcoming')

    // Sample data for upcoming events
    const upcomingEvents = [
        {
            id: 1,
            title: "Robot Building Workshop",
            description: "Hands-on workshop for building your first autonomous robot using Arduino and sensors.",
            club: "Robotics Club",
            date: "2024-01-15",
            time: "10:00 AM - 12:00 PM",
            location: "Robotics Lab, University of XYZ",
            image: "/img/Club1.png",
            canRegister: true
        },
        {
            id: 2,
            title: "AI & Machine Learning Seminar",
            description: "Learn about the latest trends in artificial intelligence and machine learning applications.",
            club: "Computer Science Club",
            date: "2024-01-20",
            time: "2:00 PM - 4:00 PM",
            location: "Computer Lab, Building A",
            image: "/img/Club2.png",
            canRegister: true
        },
        {
            id: 3,
            title: "Web Development Bootcamp",
            description: "Intensive workshop covering modern web development technologies and best practices.",
            club: "Tech Club",
            date: "2024-01-25",
            time: "9:00 AM - 5:00 PM",
            location: "Tech Center, Room 101",
            image: "/img/Club3.png",
            canRegister: false
        }
    ]

    // Sample data for past events
    const pastEvents = [
        {
            id: 4,
            title: "Hackathon 2023",
            description: "Annual coding competition with prizes for the best innovative projects.",
            club: "Programming Club",
            date: "2023-12-10",
            time: "9:00 AM - 6:00 PM",
            location: "Main Auditorium",
            image: "/img/Club1.png",
            status: "Completed"
        },
        {
            id: 5,
            title: "Design Thinking Workshop",
            description: "Learn creative problem-solving techniques used by top design companies.",
            club: "Design Club",
            date: "2023-12-05",
            time: "1:00 PM - 3:00 PM",
            location: "Design Studio",
            image: "/img/Club2.png",
            status: "Completed"
        },
        {
            id: 6,
            title: "Networking Event",
            description: "Connect with industry professionals and fellow students in a relaxed environment.",
            club: "Business Club",
            date: "2023-11-28",
            time: "6:00 PM - 8:00 PM",
            location: "Conference Hall",
            image: "/img/Club3.png",
            status: "Completed"
        }
    ]

    const EventCard = ({ event, isPast = false }) => (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="mb-3">
                <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-36 object-cover rounded-lg mb-3" 
                />
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                        {event.club}
                    </span>
                    {isPast && (
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            {event.status}
                        </span>
                    )}
                </div>
                <p className="text-gray-500 text-xs mb-2">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                    {event.date}
                </p>
            </div>
            
            <div className="flex-1">
                <h3 className="text-base font-bold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">{event.description}</p>
                
                <div className="space-y-1 mb-3">
                    <p className="text-gray-500 text-xs">
                        <FontAwesomeIcon icon={faClock} className="mr-2" />
                        {event.time}
                    </p>
                    <p className="text-gray-500 text-xs">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                        {event.location}
                    </p>
                </div>
            </div>
            
            {!isPast && event.canRegister && (
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-3 rounded-lg transition-colors duration-200 text-sm cursor-pointer">
                    Register Now
                </button>
            )}
            {!isPast && !event.canRegister && (
                <button className="w-full bg-gray-300 text-gray-500 font-medium py-2 px-3 rounded-lg cursor-not-allowed text-sm">
                    Registration Closed
                </button>
            )}
        </div>
    )

    return (
        <main className="min-h-screen bg-gray-50 p-4">
            {/* Header */}
            <header className="mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold mb-1">Events</h1>
                            <p className="text-purple-100 text-base">Manage and view your joined events</p>
                        </div>
                        <FontAwesomeIcon icon={faCalendarAlt} className="text-white text-5xl opacity-30" />
                    </div>
                </div>
            </header>

            {/* Search and Filter Controls */}
            <div className="bg-white p-4 rounded-xl shadow-md mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <FontAwesomeIcon 
                                icon={faSearch} 
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" 
                            />
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2 focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm" 
                                placeholder="Search events..." 
                            />
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex items-center">
                            <label htmlFor="clubs" className="text-xs font-medium text-gray-700 mr-2">
                                Club:
                            </label>
                            <select 
                                id="clubs" 
                                className="border border-gray-300 rounded-lg px-2 py-1 focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm cursor-pointer"
                            >
                                <option value="">All Clubs</option>
                                <option value="robotics">Robotics Club</option>
                                <option value="cs">Computer Science Club</option>
                                <option value="tech">Tech Club</option>
                            </select>
                        </div>
                        
                        <div className="flex items-center">
                            <label htmlFor="filter" className="text-xs font-medium text-gray-700 mr-2">
                                Filter:
                            </label>
                            <select 
                                id="filter" 
                                className="border border-gray-300 rounded-lg px-2 py-1 focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm cursor-pointer"
                            >
                                <option value="">All Events</option>
                                <option value="upcoming">Upcoming Events</option>
                                <option value="past">Past Events</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-md mb-6">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-6 px-4">
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={`py-3 px-1 border-b-2 font-medium text-xs transition-colors duration-200 cursor-pointer ${
                                activeTab === 'upcoming'
                                    ? 'border-purple-500 text-purple-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Upcoming Events ({upcomingEvents.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('past')}
                            className={`py-3 px-1 border-b-2 font-medium text-xs transition-colors duration-200 cursor-pointer ${
                                activeTab === 'past'
                                    ? 'border-purple-500 text-purple-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Past Events ({pastEvents.length})
                        </button>
                    </nav>
                </div>

                {/* Events Content */}
                <div className="p-4">
                    {activeTab === 'upcoming' && (
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
                            {upcomingEvents.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {upcomingEvents.map(event => (
                                        <EventCard key={event.id} event={event} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-300 text-5xl mb-3" />
                                    <h3 className="text-lg font-medium text-gray-500 mb-1">No upcoming events</h3>
                                    <p className="text-gray-400 text-sm">Check back later for new events!</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'past' && (
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Past Events</h2>
                            {pastEvents.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {pastEvents.map(event => (
                                        <EventCard key={event.id} event={event} isPast={true} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-300 text-5xl mb-3" />
                                    <h3 className="text-lg font-medium text-gray-500 mb-1">No past events</h3>
                                    <p className="text-gray-400 text-sm">Your event history will appear here.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
