import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faSearch,
  faTag,
  faGraduationCap,
  faCalendarAlt,
  faChartPie,
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
    const clubCategory = club.categorie || club.category || '';
    const matchesCategory = category === 'All' || clubCategory === category;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories from joined clubs
  const categories = ['All', ...new Set(joinedClubs.map((club) => club.categorie || club.category).filter(Boolean))];


  if (loading) {
    return <Loader fullScreen={true} size="large" message="Loading your clubs..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <FontAwesomeIcon icon={faGraduationCap} className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Clubs</h1>
              <p className="text-gray-600 text-sm mt-1">
                Manage and view your {joinedClubs.length} joined club{joinedClubs.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search clubs by name..."
                className="pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
              />
            </div>
            <div className="relative md:w-64">
              <select
                className="pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 cursor-pointer transition-all appearance-none"
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
                className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
              />
              <svg className="w-4 h-4 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Clubs Grid */}
        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredClubs.map((club) => (
              <div
                key={club.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              >
                {/* Club Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={club.image || '/img/Club1.png'}
                    alt={club.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = '/img/Club1.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  {(club.categorie || club.category) && (
                    <span className="absolute top-3 right-3 text-xs bg-white/95 backdrop-blur-sm text-purple-700 px-3 py-1.5 rounded-full font-semibold shadow-lg border border-purple-100">
                      {club.categorie || club.category}
                    </span>
                  )}
                </div>

                {/* Club Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors line-clamp-1">
                    {club.name}
                  </h3>

                  {club.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {club.description}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={faUsers} className="text-purple-600 text-xs" />
                      </div>
                      <span className="font-medium">
                        {club.users_count || club.users?.length || 0}
                      </span>
                    </div>
                    {club.events && club.events.length > 0 && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <FontAwesomeIcon icon={faCalendarAlt} className="text-green-600 text-xs" />
                        </div>
                        <span className="font-medium">{club.events.length}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <a
                    href={`/clubs/${club.id}`}
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 block text-center shadow-md hover:shadow-lg"
                  >
                    View Club Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center mb-8 border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faUsers} className="text-gray-300 text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {joinedClubs.length === 0 ? 'No Clubs Joined Yet' : 'No Clubs Found'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {joinedClubs.length === 0
                ? 'Start exploring and join clubs that match your interests!'
                : 'Try adjusting your search or filter to find clubs.'}
            </p>
            {joinedClubs.length === 0 && (
              <button
                onClick={() => onLinkClick && onLinkClick('Browse Clubs')}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Browse Clubs
              </button>
            )}
          </div>
        )}

        {/* Summary Stats */}
        {joinedClubs.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faChartPie} className="text-purple-600 text-sm" />
              </div>
              Your Club Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <FontAwesomeIcon icon={faUsers} className="text-purple-600 text-xl" />
                </div>
                <p className="text-3xl font-bold text-purple-700 mb-1">{joinedClubs.length}</p>
                <p className="text-sm text-gray-600 font-medium">Clubs Joined</p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-green-600 text-xl" />
                </div>
                <p className="text-3xl font-bold text-green-700 mb-1">
                  {joinedClubs.reduce((sum, club) => sum + (club.events?.length || 0), 0)}
                </p>
                <p className="text-sm text-gray-600 font-medium">Total Events</p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <FontAwesomeIcon icon={faUsers} className="text-blue-600 text-xl" />
                </div>
                <p className="text-3xl font-bold text-blue-700 mb-1">
                  {joinedClubs.reduce(
                    (sum, club) => sum + (club.users_count || club.users?.length || 0),
                    0,
                  )}
                </p>
                <p className="text-sm text-gray-600 font-medium">Total Members</p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <FontAwesomeIcon icon={faTag} className="text-amber-600 text-xl" />
                </div>
                <p className="text-3xl font-bold text-amber-700 mb-1">{categories.length - 1}</p>
                <p className="text-sm text-gray-600 font-medium">Categories</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
