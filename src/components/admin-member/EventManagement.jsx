import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faPlus,
  faEdit,
  faTrash,
  faEye,
  faSearch,
  faFilter,
  faClock,
  faMapMarkerAlt,
  faUsers,
  faCheckCircle,
  faExclamationTriangle,
  faCalendarPlus,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClubs } from '../../app/clubSlice';
import { toast } from 'react-toastify';
import Loader from '../common/UI/Loader';
import { addEvents, deleteEvents, fetchEvents, updateEvents } from '../../app/eventSlice';
import { API_BASE_URL } from '../../config/api';

export default function EventManagement() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { clubs } = useSelector((state) => state.clubs);
  const { events, loading, error } = useSelector((state) => state.events);
  const me = localStorage.getItem('user');
  const meId = JSON.parse(me)?.id;

  const [myClub, setMyClub] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    dispatch(fetchClubs());
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (clubs.length > 0 && meId) {
      const foundClub = clubs.find(
        (club) =>
          club.users &&
          club.users.some((user) => user.id === meId && user.pivot.role === 'admin-member'),
      );
      setMyClub(foundClub);
    }
  }, [clubs, meId]);

  // Filter events based on search and filters
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === '' || event.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Active':
        return 'bg-blue-100 text-blue-800';
      case 'Past':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle create event
  const handleCreateEvent = (formData) => {
    dispatch(addEvents(formData));
    setShowCreateEventModal(false);
  };

  // Handle edit event
  const handleEditEvent = (eventId, formData) => {
    dispatch(updateEvents({ eventId, eventData: formData }));
    setSelectedEvent(null);
  };

  // Handle delete event
  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      dispatch(deleteEvents(eventId));
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!myClub) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-300 text-6xl mb-4" />
          <h3 className="text-xl font-medium text-gray-500 mb-2">No Club Found</h3>
          <p className="text-gray-400">You are not an admin of any club.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Event Management</h1>
              <p className="text-teal-100 text-lg">Oversee and organize {myClub.name} events</p>
            </div>
            <FontAwesomeIcon icon={faCalendarAlt} className="text-white text-6xl opacity-30" />
          </div>
        </div>
      </header>

      {/* Search and Filter Controls */}
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
                placeholder="Search events..."
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Past">Past</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <button
              onClick={() => setShowCreateEventModal(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Create Event
            </button>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            All Events ({filteredEvents.length})
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
                  EVENT NAME
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  DATE & TIME
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  LOCATION
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  STATUS
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
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={API_BASE_URL + '/' + event.image}
                          alt={event.title || event.name}
                          onError={(e) => {
                            e.target.src = '/img/event1.jpg';
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {event.title || event.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {event.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{event.date}</div>
                    {event.time && <div className="text-gray-400">{event.time}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.location || 'TBD'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}
                    >
                      {event.status || 'Upcoming'}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <a
                        href={`/events/${event.id}`}
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900"
                        title="View details"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </a>
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit event"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete event"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-300 text-6xl mb-4" />
            <h3 className="text-xl font-medium text-gray-500 mb-2">
              {events.length === 0 ? 'No events created yet' : 'No events found'}
            </h3>
            <p className="text-gray-400 mb-6">
              {events.length === 0
                ? 'Start by creating your first event for the club'
                : 'Try adjusting your search or filters'}
            </p>
            {events.length === 0 && (
              <button
                onClick={() => setShowCreateEventModal(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Create Your First Event
              </button>
            )}
          </div>
        )}
      </div>

      {/* Create Event Modal */}
      {showCreateEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Create New Event</h3>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();

                const formData = new FormData(e.target);
                formData.append('club_id', myClub.id);
                if (e.target.image.files[0]) {
                  formData.append('image', e.target.image.files[0]);
                }

                handleCreateEvent(formData);
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                <input
                  type="text"
                  name="title"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter event name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date and Time
                </label>
                <input
                  type="datetime"
                  name="date"
                  defaultValue={
                    selectedEvent && selectedEvent.date
                      ? new Date(selectedEvent.date).toISOString().slice(0, 16)
                      : ''
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter event location"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Participants
                </label>
                <input
                  type="number"
                  name="max_participants"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter maximum participants"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/jpeg,image/png,image/jpg,image/gif"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCreateEventModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Edit Event</h3>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                formData.append('club_id', selectedEvent.club_id);
                if (e.target.image.files[0]) {
                  formData.append('image', e.target.image.files[0]);
                }
                handleEditEvent(selectedEvent.id, formData);
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedEvent.title || selectedEvent.name}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date and Time
                </label>
                <input
                  type="datetime"
                  name="date"
                  defaultValue={
                    selectedEvent.date
                      ? new Date(selectedEvent.date).toISOString().slice(0, 16)
                      : ''
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  defaultValue={selectedEvent.location}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter event location"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Participants
                </label>
                <input
                  type="number"
                  name="max_participants"
                  defaultValue={selectedEvent.max_participants}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter maximum participants"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  defaultValue={selectedEvent.description}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter event description"
                ></textarea>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
