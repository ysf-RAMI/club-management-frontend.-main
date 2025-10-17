import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventById } from '../../../app/eventSlice';
import { fetchClubs } from '../../../app/clubSlice';
import Loader from '../../../components/common/UI/Loader';

export default function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentEvent, loading, error } = useSelector((state) => state.events);
  const { clubs } = useSelector((state) => state.clubs);

  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(id));
      dispatch(fetchClubs());
    }
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Event</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!currentEvent) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Event Not Found</h2>
          <p className="text-gray-500">The event you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const event = currentEvent;
  const club = clubs.find((c) => c.id === event.club_id);
  return (
    <div className="min-h-screen bg-gray-100 max-w-7xl mx-auto">
      <p className=" bg-white text-indigo-600 text-lg p-4  border-b border-gray-100">
        <button
          onClick={() => {
            navigate('/');
          }}
          className=" text-blue-600 hover:text-gray-700 cursor-pointer"
        >
          Home
        </button>{' '}
        <span className="text-gray-600">&gt; </span>
        <button
          onClick={() => {
            navigate('/events');
          }}
          className="text-blue-600 hover:text-gray-700 cursor-pointer"
        >
          Events
        </button>
        <span className="text-gray-600 "> &gt; </span>
        <button className="text-gray-600 ">{event.title}</button>
      </p>
      <div className="relative bg-white shadow-md">
        <img
          className="w-full h-96 object-cover"
          src={event.image || '/img/Hero.jpg'}
          alt="Event Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <div className="flex space-x-2 mb-2">
            <span className="bg-violet-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {club ? club.name : 'Unknown Club'}
            </span>
            <span className="bg-gray-700 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Event
            </span>
          </div>
          <h1 className="text-4xl font-bold">{event.title}</h1>
          <p className="text-xl">{event.description}</p>
        </div>
      </div>
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Event Description</h2>
            <p className="mb-6">{event.description}</p>

            <h3 className="text-xl font-semibold mb-3">Event Details</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="font-semibold text-gray-800">Date</p>
                <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Location</p>
                <p className="text-gray-600">{event.location}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Club</p>
                <p className="text-gray-600">{club ? club.name : 'Unknown Club'}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Max Participants</p>
                <p className="text-gray-600">{event.max_participants || 'Unlimited'}</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-3">Created Information</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="font-semibold text-gray-800">Created By</p>
                <p className="text-gray-600">User #{event.created_by}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Created At</p>
                <p className="text-gray-600">{new Date(event.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          {/* Sidebar content will go here */}
          <div className="col-span-1 bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <p className="text-2xl font-bold text-violet-600 mb-2">FREE</p>
              <p className="text-sm text-gray-500">Event participation</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-900">{event.location}</p>
                  <p className="text-sm text-gray-500">Event Location</p>
                </div>
              </div>

              {event.max_participants && (
                <div className="flex items-center space-x-3">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM9 17a1 1 0 100-2h2a1 1 0 100 2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M11.02 1.02a4 4 0 014 4v1a1 1 0 11-2 0V5a2 2 0 00-2-2h-1a2 2 0 00-2 2v1a1 1 0 11-2 0V5a4 4 0 014-4h1zM4 13a1 1 0 011-1h10a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Max {event.max_participants} Participants
                    </p>
                    <p className="text-sm text-gray-500">Registration required</p>
                  </div>
                </div>
              )}
            </div>

            <button className="w-full bg-violet-600 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-violet-700 mb-4">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Register Now</span>
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Event Organizer</h3>
              <div className="flex items-center space-x-3 mb-2">
                <img
                  className="h-10 w-10 rounded-full"
                  src={club?.image || '/img/Club1.png'}
                  alt="Club Logo"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {club ? club.name : 'Unknown Club'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {club ? `${club.maxMembrs || 0} members` : 'Unknown'}
                  </p>
                </div>
              </div>
              <button
                className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
                onClick={() => navigate(`/clubs/${event.club_id}`)}
              >
                View Club Profile
              </button>
            </div>
          </div>
        </div>

        {/* Related Events Section */}
        <div className="container mx-auto p-8">
          <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4">
              More Events from {club ? club.name : 'This Club'}
            </h2>
            <div className="text-center py-8">
              <p className="text-gray-500">
                No other events from this club available at the moment.
              </p>
              <button
                className="mt-4 bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700"
                onClick={() => navigate('/events')}
              >
                View All Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
