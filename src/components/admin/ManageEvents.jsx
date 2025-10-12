import { useState } from 'react';

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
    return <div className="text-center text-gray-500">No events available.</div>;
  }

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Events</h2>
          <p className="text-sm text-gray-500">
            View and manage events pending approval or refusal.
          </p>
        </div>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <input
            type="text"
            placeholder="Search events..."
            className="border border-gray-300 rounded-md px-4 py-2 w-xs"
          />
          <select className="border border-gray-300 rounded-md px-4 py-2">
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="refused">Refused</option>
          </select>
        </div>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-gray-400 text-xs font-bold">
            <tr>
              <th className="py-3 px-4 text-left">Club</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Location</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {events
              .filter((event) => event.status === 'pending')
              .map((event) => (
                <tr key={event.id} className="border-b border-gray-200">
                  <td className="py-3 px-4">{event.club}</td>
                  <td className="py-3 px-4">{event.title}</td>
                  <td className="py-3 px-4">{event.date}</td>
                  <td className="py-3 px-4">{event.location}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
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
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      onClick={() => handleApprove(event.id)}
                      className="bg-green-300 text-gray-800 px-3 py-1 rounded-md hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRefuse(event.id)}
                      className="bg-red-300 text-gray-800 px-3 py-1 rounded-md hover:bg-red-600"
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
