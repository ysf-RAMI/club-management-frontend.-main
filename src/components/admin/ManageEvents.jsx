import { useState } from 'react';
import Header from '../common/Header';
import { faCalendarAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ManageEvents() {
  const [events, setEvents] = useState([
    {
      id: 1,
      club: 'Robotics Club',
      title: 'Robot Building Workshop',
      date: 'Nov 18, 2024',
      time: '6:00 PM - 8:00 PM',
      location: 'Engineering Lab 3',
      status: 'pending', // pending, approved, refused
      description:
        'Hands-on workshop for building your first autonomous robot using Arduino and sensors.',
      image: '/img/Club1.png',
    },
    {
      id: 2,
      club: 'Programming Club',
      title: 'Coding Hackathon 2024',
      date: 'Nov 18, 2024',
      time: '9:00 AM - 5:00 PM',
      location: 'Student Center',
      status: 'pending',
      description: '24-hour coding marathon to build innovative solutions for real-world problems.',
      image: '/img/Club2.png',
    },
    {
      id: 3,
      club: 'Photography Club',
      title: 'Annual Photo Exhibition',
      date: 'Nov 22, 2024',
      time: '10:00 AM - 6:00 PM',
      location: 'Art Gallery',
      status: 'pending',
      description: 'Showcase of the best photography work from club members throughout the year.',
      image: '/img/Club3.png',
    },
  ]);

  const handleApprove = (id) => {
    setEvents(events.map((event) => (event.id === id ? { ...event, status: 'approved' } : event)));
  };

  const handleRefuse = (id) => {
    setEvents(events.map((event) => (event.id === id ? { ...event, status: 'refused' } : event)));
  };

  if (events.length === 0) {
    return <div className="text-center text-gray-500 p-4">No events available.</div>;
  }

  return (
    <div className="p-4">
      <Header 
        title="Manage Events" 
        subtitle="View and manage events pending approval or refusal." 
        icon={faCalendarAlt} 
      />
      <div className="overflow-x-auto bg-white shadow-sm rounded-lg">
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            />
          </div>
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="refused">Refused</option>
          </select>
        </div>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Club</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-200">
            {events
              .filter((event) => event.status === 'pending')
              .map((event) => (
                <tr key={event.id}>
                  <td className="py-4 px-6 whitespace-nowrap">{event.club}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{event.title}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{event.date}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{event.location}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        event.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : event.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap flex space-x-2">
                    <button
                      onClick={() => handleApprove(event.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 cursor-pointer"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRefuse(event.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 cursor-pointer"
                    >
                      Refuse
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
