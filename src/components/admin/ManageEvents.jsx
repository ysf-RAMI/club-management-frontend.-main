import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchEvents,
  searchEvents,
  filterByClub,
  sortEvents,
  clearEventFilters,
  changeEventStatus,
  fetchClubs,
} from '../../app/eventSlice';
import Header from '../common/Header';
import {
  faCalendarAlt,
  faSearch,
  faExclamationTriangle,
  faCalendarXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../common/UI/Loader';

export default function ManageEvents() {
  const dispatch = useDispatch();
  const { events, clubs, loading, error, currentSearch, currentClub, currentSort, filteredEvents } =
    useSelector((state) => state.events);

  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchClubs());
  }, [dispatch]);

  const handleApprove = (eventId) => {
    dispatch(changeEventStatus({ eventId, status: 'approved' }));
  };

  const handleRefuse = (eventId) => {
    dispatch(changeEventStatus({ eventId, status: 'rejected' }));
  };

  const handleRetry = () => {
    dispatch(fetchEvents());
    dispatch(fetchClubs());
  };

  // Filter events by status
  const displayEvents =
    statusFilter === 'all'
      ? filteredEvents
      : filteredEvents.filter((event) => event.status === statusFilter);

  return (
    <div className="p-4">
      <Header
        title="Manage Events"
        subtitle="View and manage all events with different statuses."
        icon={faCalendarAlt}
      />

      {/* Error State */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="h-5 w-5 text-red-500 mt-0.5 mr-3"
          />
          <div className="flex-1">
            <h3 className="text-red-800 font-semibold mb-1">Error Loading Events</h3>
            <p className="text-red-700 text-sm">{error.message}</p>
            <button
              onClick={handleRetry}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow-sm rounded-lg">
        <div className="p-4 flex items-center justify-between border-b border-gray-200 gap-3">
          <div className="relative w-1/4">
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={currentSearch}
              onChange={(e) => dispatch(searchEvents({ search: e.target.value }))}
              disabled={loading}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            />
          </div>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            disabled={loading}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={currentClub}
            onChange={(e) => dispatch(filterByClub({ clubName: e.target.value }))}
            disabled={loading}
          >
            <option value="">All Clubs</option>
            {clubs.map((club) => (
              <option key={club.id} value={club.name}>
                {club.name}
              </option>
            ))}
          </select>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={currentSort}
            onChange={(e) => dispatch(sortEvents({ sort: e.target.value }))}
            disabled={loading}
          >
            <option value="">Sort By</option>
            <option value="date">Date</option>
            <option value="club">Club</option>
          </select>
          <button
            onClick={() => {
              dispatch(clearEventFilters());
              setStatusFilter('all');
            }}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            disabled={loading}
          >
            Clear Filters
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <Loader className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
        ) : (
          <>
            {/* Empty State */}
            {displayEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FontAwesomeIcon icon={faCalendarXmark} className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Events Found</h3>
                <p className="text-gray-500 mb-4">
                  {currentSearch || currentClub || currentSort || statusFilter !== 'all'
                    ? 'No events match your current filters.'
                    : 'There are no events available at this time.'}
                </p>
                {(currentSearch || currentClub || currentSort || statusFilter !== 'all') && (
                  <button
                    onClick={() => {
                      dispatch(clearEventFilters());
                      setStatusFilter('all');
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              /* Events Table */
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Club
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 divide-y divide-gray-200">
                  {displayEvents.map((event) => (
                    <tr key={event.id}>
                      <td className="py-4 px-6 whitespace-nowrap">{event.club.name}</td>
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
                          className={`px-3 py-1 rounded-lg cursor-pointer ${
                            event.status === 'approved'
                              ? 'bg-green-600 text-white'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                          disabled={event.status === 'approved'}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRefuse(event.id)}
                          className={`px-3 py-1 rounded-lg cursor-pointer ${
                            event.status === 'rejected'
                              ? 'bg-red-600 text-white'
                              : 'bg-red-500 text-white hover:bg-red-600'
                          }`}
                          disabled={event.status === 'rejected'}
                        >
                          Refuse
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
}
