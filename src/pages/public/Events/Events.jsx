import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, searchEvents, filterByClub, sortEvents, clearEventFilters } from '../../../app/eventSlice';
import { API_BASE_URL } from '../../../config/api';
import Loader from '../../../components/common/UI/Loader';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

export default function Events() {
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { filteredEvents, loading, error } = useSelector((state) => state.events);
  const { clubs } = useSelector((state) => state.clubs);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  if (error) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Events</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-12 text-center">
        <h1 className="text-4xl font-bold">Upcoming Events</h1>
        <p className="text-lg mt-4">
          Discover exciting events happening across all clubs
        </p>
      </div>

      <div className="container  mx-auto ">
        {/* Search and Filter Bar */}
        <div className="bg-white  p-6 px-12 shadow-sm mb-6">
          <div className="flex flex-wrap items-center gap-4 max-w-7xl mx-auto">
            {/* Search Input */}
            <div className="relative flex items-center flex-grow">
              <input
                type="text"
                placeholder="Search events titles, or descriptions"
                className="border border-gray-300 p-2 pl-10 rounded-lg w-full h-10"
                onChange={(e) => dispatch(searchEvents({ search: e.target.value }))}
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


            <select
              className="border border-gray-300 p-2 rounded-lg h-10 flex-grow"
              onChange={(e) => dispatch(sortEvents({ sort: e.target.value }))}
            >
              <option value="date-asc">Date (Earliest First)</option>
              <option value="date-desc">Date (Latest First)</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>

            {/* Clear Filters Button */}
            <button
              className="text-white bg-gray-600 font-semibold flex items-center h-10 px-4 py-2 rounded-lg"
              onClick={() => dispatch(clearEventFilters())}
            >
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
            <p className="text-gray-600">Showing {filteredEvents.length} events</p>
          </div>
        </div>

        {/* Event Cards Grid */}
        {loading ? <Loader /> : <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-12 max-w-7xl mx-auto">
            {currentEvents.map((event) => {

              return (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
                >
                  <img
                    src={event.image ? `${API_BASE_URL}${event.image}` : '/img/Hero.jpg'}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">

                      </span>
                      <span className="text-gray-500 text-sm">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                    <p className="text-gray-700 text-sm mb-4 flex-grow">{event.description}</p>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <FaMapMarkerAlt className="mr-2" /> {event.location}
                    </div>
                    {event.max_participants && (
                      <div className="flex items-center text-green-600 text-sm mb-4">
                        <FaUsers className="mr-2" /> Max {event.max_participants} participants
                      </div>
                    )}
                    <button
                      onClick={() => navigate(`/events/${event.id}`)}
                      className="w-full cursor-pointer bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 mt-auto"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex justify-center p-6 max-w-7xl mx-auto">
            <nav
              className="relative z-0 inline-flex rounded-lg shadow-sm gap-2"
              aria-label="Pagination"
            >
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-transparent bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              >
                <span className="sr-only">Previous</span>
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
              </button>
              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-transparent text-sm font-medium ${currentPage === number + 1
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  {number + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-transparent bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              >
                <span className="sr-only">Next</span>
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
              </button>
            </nav>
          </div>

        </>}


      </div>
    </div>
  );
}
