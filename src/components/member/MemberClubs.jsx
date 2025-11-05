import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faSearch,
  faTag,
  faGraduationCap,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClubs } from '../../app/clubSlice';
import Header from '../common/Header';
import Loader from '../common/UI/Loader';

export default function MemberClubs({ onLinkClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  // Redux state
  const { clubs, loading } = useSelector((state) => state.clubs);
  const dispatch = useDispatch();

  // Get current user
  const me = localStorage.getItem('user');
  const meId = me ? JSON.parse(me).id : null;

  // Local state for joined clubs
  const [joinedClubs, setJoinedClubs] = useState([]);

  // Fetch clubs on mount
  useEffect(() => {
    dispatch(fetchClubs());
  }, [dispatch]);

  // Filter clubs where user is a member with approved status
  useEffect(() => {
    if (clubs.length > 0 && meId) {
      const myJoinedClubs = clubs.filter((club) => {
        if (!club.users) return false;

        // Check if user is in the club with approved status
        const userInClub = club.users.find(
          (user) => user.id === meId && user.pivot.status === 'approved',
        );

        return userInClub !== undefined;
      });

      setJoinedClubs(myJoinedClubs);
    }
  }, [clubs, meId]);

  // Filter clubs based on search and category
  const filteredClubs = joinedClubs.filter((club) => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || club.category === category;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories from joined clubs
  const categories = ['All', ...new Set(joinedClubs.map((club) => club.category).filter(Boolean))];


  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <Header
        title="My Clubs"
        subtitle={`Manage and view your ${joinedClubs.length} joined club${joinedClubs.length !== 1 ? 's' : ''}`}
        icon={faGraduationCap}
      />

      {/* Search and Filter Section */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search clubs..."
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            />
          </div>
          <div className="relative">
            <select
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
            <FontAwesomeIcon
              icon={faTag}
              className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            />
          </div>
        </div>
      </div>

      {/* Clubs Grid */}
      {filteredClubs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClubs.map((club) => (
            <div
              key={club.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={club.image || '/img/Club1.png'}
                alt={club.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = '/img/Club1.png';
                }}
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">{club.name}</h3>
                  {club.category && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                      {club.category}
                    </span>
                  )}
                </div>

                {club.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{club.description}</p>
                )}

                <div className="flex items-center justify-between text-gray-600 mb-4">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faUsers} className="mr-2 text-blue-500" />
                    <span className="text-sm font-medium">
                      {club.users_count || club.users?.length || 0} members
                    </span>
                  </div>
                  {club.events && club.events.length > 0 && (
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-green-500" />
                      <span className="text-sm font-medium">{club.events.length} events</span>
                    </div>
                  )}
                </div>

                <a
                  href={`/clubs/${club.id}`}
                  rel="noopener noreferrer"
                  className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 block text-center"
                >
                  View Club
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <FontAwesomeIcon icon={faUsers} className="text-gray-300 text-6xl mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {joinedClubs.length === 0 ? 'No Clubs Joined Yet' : 'No Clubs Found'}
          </h3>
          <p className="text-gray-600 mb-6">
            {joinedClubs.length === 0
              ? 'Start exploring and join clubs that interest you!'
              : 'Try adjusting your search or filter to find clubs.'}
          </p>
          {joinedClubs.length === 0 && (
            <button
              onClick={() => onLinkClick && onLinkClick('Browse Clubs')}
              className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300"
            >
              Browse Clubs
            </button>
          )}
        </div>
      )}

      {/* Summary Stats */}
      {joinedClubs.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Your Club Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">{joinedClubs.length}</p>
              <p className="text-sm text-gray-600 mt-1">Clubs Joined</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">
                {joinedClubs.reduce((sum, club) => sum + (club.events?.length || 0), 0)}
              </p>
              <p className="text-sm text-gray-600 mt-1">Total Events</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">
                {joinedClubs.reduce(
                  (sum, club) => sum + (club.users_count || club.users?.length || 0),
                  0,
                )}
              </p>
              <p className="text-sm text-gray-600 mt-1">Total Members</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-3xl font-bold text-yellow-600">{categories.length - 1}</p>
              <p className="text-sm text-gray-600 mt-1">Categories</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
