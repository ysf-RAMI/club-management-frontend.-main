import React from 'react';

const eventsData = [
  {
    id: 1,
    icon: '/img/robot.svg', // Using the new SVG image
    bgColor: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    title: 'Robot Competition',
    club: 'Robotics Club',
    date: 'March 15, 2024',
    time: '2:00 PM - 5:00 PM',
    location: 'Engineering Lab',
  },
  {
    id: 2,
    icon: '/img/mic.svg', // Using the new SVG image
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Debate Tournament',
    club: 'Debate Society',
    date: 'March 20, 2024',
    time: '10:00 AM - 4:00 PM',
    location: 'Main Auditorium',
  },
  {
    id: 3,
    icon: '/img/camera.svg', // Using the new SVG image
    bgColor: 'bg-teal-100',
    iconColor: 'text-teal-600',
    title: 'Photo Walk',
    club: 'Photography Club',
    date: 'March 22, 2024',
    time: '9:00 AM - 12:00 PM',
    location: 'Campus Gardens',
  },
];

const UpComingEvents = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Upcoming Events</h2>
        <p className="text-center text-gray-600 mb-12">
          Don't miss out on exciting activities and workshops
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsData.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h3>
              <p className={`${event.iconColor} text-sm mb-4`}>{event.club}</p>
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
                {event.date}
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
                {event.time}
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
                {event.location}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => (window.location.href = '/events')}
            className="bg-blue-100 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-700 hover:text-white active:bg-blue-800 active:text-white"
          >
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpComingEvents;
