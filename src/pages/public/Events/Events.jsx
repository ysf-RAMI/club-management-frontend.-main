import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const dummyEvents = [
  {
    id: 1,
    club: 'Robotics Club',
    title: 'Robot Building Workshop',
    date: 'Nov 18, 2024',
    time: '6:00 PM - 8:00 PM',
    location: 'Engineering Lab 3',
    registered: 20,
    description:
      'Hands-on workshop for building your first autonomous robot using Arduino and sensors.',
    image: '/img/Club1.png',
    tags: ['Technology', 'Workshop'],
  },
  {
    id: 2,
    club: 'Programming Club',
    title: 'Coding Hackathon 2024',
    date: 'Nov 18, 2024',
    time: '9:00 AM - 5:00 PM',
    location: 'Student Center',
    registered: 120,
    description: '24-hour coding marathon to build innovative solutions for real-world problems.',
    image: '/img/Club2.png',
    tags: ['Technology', 'Competition'],
  },
  {
    id: 3,
    club: 'Photography Club',
    title: 'Annual Photo Exhibition',
    date: 'Nov 22, 2024',
    time: '10:00 AM - 6:00 PM',
    location: 'Art Gallery',
    registered: null,
    description: 'Showcase of the best photography work from club members throughout the year.',
    image: '/img/Club3.png',
    tags: ['Arts', 'Exhibition'],
  },
  {
    id: 4,
    club: 'Drama Club',
    title: 'Shakespeare Night',
    date: 'Nov 25, 2024',
    time: '7:30 PM - 9:30 PM',
    location: 'Main Auditorium',
    registered: null,
    description: "A captivating performance of selected scenes from Shakespeare's greatest works.",
    image: '/img/Hero.jpg',
    tags: ['Arts', 'Performance'],
  },
  {
    id: 5,
    club: 'Robotics Club',
    title: 'Regional Robotics Competition',
    date: 'Dec 2-3, 2024',
    time: '9:00 AM - 6:00 PM',
    location: 'Convention Center',
    registered: null,
    description:
      'Compete against other universities in the annual robotics challenge championship.',
    image: '/img/Club1.png',
    tags: ['Technology', 'Competition'],
  },
  {
    id: 6,
    club: 'VR/AR Club',
    title: 'VR Experience Day',
    date: 'Dec 5, 2024',
    time: '1:00 PM - 5:00 PM',
    location: 'Tech Lab 2',
    registered: 15,
    description: 'Try the latest VR games and applications, learn about VR development basics.',
    image: '/img/Club2.png',
    tags: ['Technology', 'Workshop'],
  },
  {
    id: 7,
    club: 'Engineering Society',
    title: 'Design Thinking Workshop',
    date: 'Dec 8, 2024',
    time: '10:00 AM - 4:00 PM',
    location: 'Design Studio',
    registered: 30,
    description:
      'Learn the fundamentals of design thinking and apply them to engineering problems.',
    image: '/img/Club3.png',
    tags: ['Engineering', 'Workshop'],
  },
  {
    id: 8,
    club: 'Robotics Club',
    title: 'AI & Machine Learning Seminar',
    date: 'Dec 10, 2024',
    time: '7:00 PM - 9:00 PM',
    location: 'Main Auditorium',
    registered: null,
    description:
      'Guest speaker from Tesla will discuss the future of AI in robotics and autonomous systems.',
    image: '/img/Hero.jpg',
    tags: ['Technology', 'Seminar'],
  },
  {
    id: 9,
    club: 'All Clubs',
    title: 'Annual Networking Mixer',
    date: 'Dec 15, 2024',
    time: '6:00 PM - 9:00 PM',
    location: 'Grand Ballroom',
    registered: null,
    description: 'Connect with industry professionals, alumni, and fellow students from all clubs.',
    image: '/img/Club1.png',
    tags: ['Networking', 'Social'],
  },
];

export default function Events() {
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = dummyEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(dummyEvents.length / eventsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-12 text-center">
        <h1 className="text-4xl font-bold">Upcoming Events</h1>
        <p className="text-lg mt-4">
        Discover exciting events happening across all clubs
        </p>
      </div>

      <div className="container mx-auto ">
        {/* Search and Filter Bar */}
        <div className="bg-white p-6 px-12 shadow-sm mb-6">
          <div className="flex flex-wrap items-center gap-4 max-w-7xl mx-auto">
            {/* Search Input */}
            <div className="relative flex items-center flex-grow">
              <input
                type="text"
                placeholder="Search events titles, or descriptions"
                className="border border-gray-300 p-2 pl-10 rounded-lg w-full h-10"
              />
              <svg
                className="absolute left-3 text-gray-400 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>

            {/* Filter Dropdowns */}
            <select className="border border-gray-300 p-2 rounded-lg h-10 flex-grow">
              <option>All Clubs</option>
            </select>
            <select className="border border-gray-300 p-2 rounded-lg h-10 flex-grow">
              <option>All Dates</option>
            </select>
            <select className="border border-gray-300 p-2 rounded-lg h-10 flex-grow">
              <option>All Locations</option>
            </select>

            {/* Clear Filters Button */}
            <button className="text-white bg-gray-600 font-semibold flex items-center h-10 px-4 py-2 rounded-lg">
              <svg
                className="h-5 w-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                ></path>
              </svg>
              Clear Filters
            </button>
          </div>

          {/* Showing events text */}
          <div className="flex justify-end mt-4 max-w-7xl mx-auto">
            <p className="text-gray-600">Showing {dummyEvents.length} events</p>
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-12 max-w-7xl mx-auto">
          {currentEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
            >
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {event.club}
                  </span>
                  <span className="text-gray-500 text-sm">{event.date}</span>
                </div>
                <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                <p className="text-gray-700 text-sm mb-4 flex-grow">{event.description}</p>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <FaClock className="mr-2" /> {event.time}
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <FaMapMarkerAlt className="mr-2" /> {event.location}
                </div>
                {event.registered && (
                  <div className="flex items-center text-green-600 text-sm mb-4">
                    <FaUsers className="mr-2" /> {event.registered} registered
                  </div>
                )}
                <button
                  onClick={() => {
                    window.location.href = `/events/1`;
                  }}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 mt-auto"
                >
                  {event.registered === null ? 'View Details' : 'Register'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center p-6 max-w-7xl mx-auto">
          <nav
            className="relative z-0 inline-flex rounded-lg shadow-sm gap-2"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-transparent bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-300"
            >
              <span className="sr-only">Previous</span>
              {/* Heroicon name: solid/chevron-left */}
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            <a
              href="#"
              aria-current="page"
              className="z-10 relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-transparent bg-violet-600 text-sm font-medium text-white"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-transparent bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-300"
            >
              2
            </a>
            <a
              href="#"
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-transparent bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-300"
            >
              3
            </a>
            <span className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-transparent bg-gray-200 text-sm font-medium text-gray-700">
              ...
            </span>
            <a
              href="#"
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-transparent bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-300"
            >
              8
            </a>
            <a
              href="#"
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-transparent bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-300"
            >
              <span className="sr-only">Next</span>
              {/* Heroicon name: solid/chevron-right */}
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
