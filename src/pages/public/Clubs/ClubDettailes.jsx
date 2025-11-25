import React, { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClubById, joinClub } from '../../../app/clubSlice';
import { fetchPendingClubRequests, fetchUserRegisteredEvents, addClubRequest } from '../../../app/userSlice';
import Loader from '../../../components/common/UI/Loader';
import { FaUsers, FaAward, FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthContext';
import { API_BASE_URL } from '../../../config/api';

export default function ClubDettailes() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentClub, loading, error, joinClubLoading, joinClubError } = useSelector((state) => state.clubs);
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const isClubFull = currentClub?.max_members && currentClub.users?.length >= currentClub.max_members;

  useEffect(() => {
    if (id) {
      dispatch(fetchClubById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Club</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!currentClub) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Club Not Found</h2>
          <p className="text-gray-500">The club you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const club = currentClub;

  const handleJoin = async () => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to join a club.');
      navigate('/login');
      return;
    }
    if (currentClub) {
      const result = await dispatch(joinClub(currentClub.id));
      if (joinClub.fulfilled.match(result)) {
        toast.success('Join request sent successfully!');
        // refresh club details
        dispatch(fetchClubById(currentClub.id));
        // Optimistic: immediately add this club to user's pending requests so dashboard shows it
        const payloadClub = result.payload && Object.keys(result.payload).length ? result.payload : currentClub;
        // Ensure the payloadClub includes the pivot/user entry if backend returned it; otherwise construct minimal pivot
        const uid = user?.id || (JSON.parse(localStorage.getItem('user') || 'null') || {}).id;
        if (uid) {
          // If backend didn't include the pivot entry for this user, create a minimal one
          if (!payloadClub.users || !payloadClub.users.some((u) => u.id === uid)) {
            const fakeUserEntry = { id: uid, pivot: { status: 'pending', created_at: new Date().toISOString() } };
            payloadClub.users = payloadClub.users ? [...payloadClub.users, fakeUserEntry] : [fakeUserEntry];
          }
          dispatch(addClubRequest(payloadClub));
          // Also trigger full fetch to sync with server state
          dispatch(fetchPendingClubRequests(uid));
          dispatch(fetchUserRegisteredEvents(uid));
        }
      } else if (joinClub.rejected.match(result)) {
        toast.error(result.payload || 'Failed to send join request.');
      }
    }
  };

  // Directly use events from currentClub
  const clubEvents = currentClub?.events || [];

  const currentUserMembership = currentClub?.users?.find(member => member.id === user?.id);
  const isMember = !!currentUserMembership;
  const isPending = currentUserMembership?.pivot?.status === 'pending';
  const isApproved = currentUserMembership?.pivot?.status === 'approved';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-white text-indigo-600 text-lg p-4 border-b border-gray-300 shadow-md">
        <div className="max-w-7xl mx-auto">
          <button
            type="button"
            onClick={() => {
              navigate('/');
            }}
            className="font-bold text-blue-600 hover:text-gray-700 cursor-pointer"
          >
            Home
          </button>{' '}
          &gt;{' '}
          <button
            type="button"
            onClick={() => {
              navigate('/clubs');
            }}
            className="font-bold text-blue-600 hover:text-gray-700 cursor-pointer"
          >
            Clubs
          </button>{' '}
          &gt; <span className="font-bold text-black">{club.name}</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div
          className="relative h-96 bg-cover bg-center max-w-7xl mx-auto"
          style={{ backgroundImage: `url(${API_BASE_URL}${club.image})` }}
        >
          <div className="absolute inset-0 flex justify-between items-end p-8">
            <div className="flex flex-col items-start justify-end h-full">
              <div className="flex space-x-2 mb-2">
                <span className="bg-blue-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {club.categorie || 'General'}
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${club.status === 'Active'
                    ? 'bg-green-500 text-white'
                    : 'bg-yellow-500 text-white'
                    }`}
                >
                  {club.status || 'Active'}
                </span>
              </div>
              <h1 className="text-5xl font-bold">{club.name}</h1>
              <div className="mt-4 flex items-center space-x-4">
                <span className="flex items-center text-lg">
                  <FaUsers className="mr-2" /> {club.users?.length || 0} Members
                </span>
                <span className="flex items-center text-lg">
                  <FaCalendarAlt className="mr-2" /> Created{' '}
                  {club.created_at ? new Date(club.created_at).getFullYear() : 'Recently'}
                </span>
              </div>
              <p className="mt-4 text-lg max-w-2xl">
                {club.description
                  ? club.description.slice(0, 100) + '...'
                  : 'No description available.'}
              </p>
            </div>
            <div>
              {isApproved ? (
                <p className="text-green-600 text-lg font-semibold">You are a member</p>
              ) : isPending ? (
                <button
                  className="bg-gray-400 text-white px-6 py-3 rounded-full text-lg font-semibold cursor-not-allowed"
                  disabled
                >
                  Pending
                </button>
              ) : isClubFull ? (
                <button
                  className="bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold cursor-not-allowed"
                  disabled
                >
                  Club is Full
                </button>
              ) : (
                <button
                  onClick={handleJoin}
                  className={`bg-white text-indigo-600 px-6 py-3 rounded-full text-lg font-semibold transition duration-300 ${joinClubLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                  disabled={joinClubLoading}
                >
                  {joinClubLoading ? 'Joining...' : 'Join Club'}
                </button>
              )}
              {isPending && (
                <p className="text-yellow-600 text-sm mt-2 text-center">Your membership request is pending approval.</p>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About the Club */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">About the Club</h2>
              <p className="text-gray-700 mb-6">{club.description}</p>
              <div className="grid grid-cols-2 gap-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <FaUsers className="text-purple-600" />
                  <span>{club.users?.length || 0} Members</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-purple-600" />
                  <span>
                    Created{' '}
                    {club.created_at ? new Date(club.created_at).toLocaleDateString() : 'Recently'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaClock className="text-purple-600" />
                  <span>
                    Updated{' '}
                    {club.updated_at ? new Date(club.updated_at).toLocaleDateString() : 'Recently'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaAward className="text-purple-600" />
                  <span>Created by User #{club.created_by || 'Unknown'}</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">Club Information</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-center space-x-2">
                  <IoMdCheckmarkCircleOutline className="text-green-500" />
                  <span>Category: {club.categorie || 'General'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <IoMdCheckmarkCircleOutline className="text-green-500" />
                  <span>Status: {club.status || 'Active'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <IoMdCheckmarkCircleOutline className="text-green-500" />
                  <span>Maximum Members: {club.max_members || 'Unlimited'}</span>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                {clubEvents.length > 0 ? (
                  clubEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex justify-between items-center p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <p className="text-gray-600 text-sm">{event.description}</p>
                        <p className="text-gray-500 text-sm mt-1">
                          <FaCalendarAlt className="inline mr-1" />{' '}
                          {new Date(event.date).toLocaleDateString()} |{' '}
                          <FaMapMarkerAlt className="inline mr-1" /> {event.location}
                        </p>
                        {event.max_participants && (
                          <p className="text-gray-500 text-sm">
                            Max Participants: {event.max_participants}
                          </p>
                        )}
                      </div>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
                        View Details
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No events scheduled for this club yet.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Club Info */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Club Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaUsers className="text-purple-600" />
                  <div>
                    <p className="font-semibold text-gray-800">{club.users?.length || 0} Members</p>
                    <p className="text-sm text-gray-600">{club.max_members || 0} maximum</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCalendarAlt className="text-purple-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Created</p>
                    <p className="text-sm text-gray-600">
                      {club.created_at
                        ? new Date(club.created_at).toLocaleDateString()
                        : 'Recently'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaAward className="text-purple-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Category</p>
                    <p className="text-sm text-gray-600">{club.categorie || 'General'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Join Club */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Join This Club</h2>
              <p className="text-gray-600 mb-4">
                Interested in joining {club.name}? Click the button below to request membership.
              </p>
              {isMember ? (
                <button
                  className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                  disabled
                >
                  Already a Member
                </button>
              ) : isPending ? (
                <button
                  className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                  disabled
                >
                  Pending Approval
                </button>
              ) : (
                <button
                  onClick={handleJoin}
                  className={`w-full bg-indigo-600 text-white px-4 py-2 rounded-lg transition duration-300 ${joinClubLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                  disabled={joinClubLoading}
                >
                  {joinClubLoading ? 'Joining...' : 'Request to Join'}
                </button>
              )}
              {isPending && !isMember && (
                <p className="text-yellow-600 text-sm mt-2 text-center">Your membership request is pending approval.</p>
              )}
              {joinClubError && <p className="text-red-500 text-sm mt-2">Error: {joinClubError}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
