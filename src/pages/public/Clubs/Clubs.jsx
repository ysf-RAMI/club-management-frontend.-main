import { useEffect, useState } from 'react';
import {
  fetchClubs,
  changeCategory,
  sortClubs,
  searchClubs,
  clearFilters,
} from '../../../app/clubSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/common/UI/Loader';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../config/api';

export default function Clubs() {
  const [currentPage, setCurrentPage] = useState(1);
  const clubsPerPage = 8;
  const dispatch = useDispatch();
  const { clubs, filteredClubs, loading, error, currentSort } = useSelector((state) => state.clubs);
  const navigate = useNavigate();
  const url = API_BASE_URL;

  useEffect(() => {
    dispatch(fetchClubs());
  }, [dispatch]);

  // Pagination logic
  const indexOfLastClub = currentPage * clubsPerPage;
  const indexOfFirstClub = indexOfLastClub - clubsPerPage;
  const currentClubs = filteredClubs.slice(indexOfFirstClub, indexOfLastClub);

  const totalPages = Math.ceil(filteredClubs.length / clubsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-12 text-center">
        <h1 className="text-4xl font-bold">Discover Amazing Clubs</h1>
        <p className="text-lg mt-4">
          Find your community and pursue your passions with fellow students
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 bg-white p-7 px-22 shadow-md border-b-2 border-gray-300">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search clubs by name, description, or interests..."
            onChange={(e) => dispatch(searchClubs({ search: e.target.value }))}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <select
          name="category"
          id="category-select"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => dispatch(changeCategory({ category: e.target.value }))}
        >
          <option value="all">All Categories</option>
          {Array.from(
            new Set(clubs.map((c) => (c.categorie || c.category || '').trim()).filter(Boolean)),
          ).map((category, idx) => (
            <option key={idx} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          name="sort"
          id="sort-select"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={currentSort || 'name-asc'}
          onChange={(e) => dispatch(sortClubs({ sort: e.target.value }))}
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="members-asc">Members (Low to High)</option>
          <option value="members-desc">Members (High to Low)</option>
        </select>

        <button
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => dispatch(clearFilters())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Clear
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="bg-gray-100 p-4 min-h-screen ">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6 px-4 md:px-14">
              <div>
                <p className="text-gray-500">
                  Showing <span className="font-bold text-black">{filteredClubs.length}</span> clubs
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              {/* Flexbox approach for proper centering of rows */}
              <div className="flex flex-col gap-6 max-w-6xl">
                {Array.from({ length: Math.ceil(currentClubs.length / 3) }, (_, rowIndex) => {
                  const startIndex = rowIndex * 3;
                  const endIndex = Math.min(startIndex + 3, currentClubs.length);
                  const rowClubs = currentClubs.slice(startIndex, endIndex);

                  return (
                    <div key={rowIndex} className="flex flex-col md:flex-row justify-center gap-6">
                      {rowClubs.map((club) => (
                        <div
                          key={club.id}
                          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-sm"
                        >
                          <img
                            src={club.image || `/images/default_club_image.jpg`}
                            alt={club.name || 'Club image'}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                          />
                          <div className="flex justify-between items-center mb-2">
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                (club.categorie || club.category || '').toLowerCase() ===
                                  'technologie' ||
                                (club.categorie || club.category || '').toLowerCase() ===
                                  'technology'
                                  ? 'bg-blue-100 text-blue-800'
                                  : (club.categorie || club.category || '').toLowerCase() ===
                                      'academic'
                                    ? 'bg-green-100 text-green-800'
                                    : (club.categorie || club.category || '').toLowerCase() ===
                                          'arts & culture' ||
                                        (club.categorie || club.category || '').toLowerCase() ===
                                          'art'
                                      ? 'bg-purple-100 text-purple-800'
                                      : (club.categorie || club.category || '').toLowerCase() ===
                                          'sports'
                                        ? 'bg-red-100 text-red-800'
                                        : (club.categorie || club.category || '').toLowerCase() ===
                                            'volunteer'
                                          ? 'bg-yellow-100 text-yellow-800'
                                          : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {club.categorie || club.category || 'Uncategorized'}
                            </span>
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                club.status === 'Active'
                                  ? 'bg-green-100 text-green-800'
                                  : club.status === 'Moderate'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {club.status || 'Unknown'}
                            </span>
                          </div>

                          <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            {club.name || 'No name'}
                          </h2>
                          <p className="text-gray-600 text-sm mb-4">
                            {club.description || 'No description available.'}
                          </p>

                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                            <div>
                              <div className="font-medium text-gray-800">Members</div>
                              <div>{club.max_members ?? 'N/A'}</div>
                            </div>
                            <div>
                              <div className="font-medium text-gray-800">Events</div>
                              <div>{club.events?.length ?? 0}</div>
                            </div>
                            <div>
                              <div className="font-medium text-gray-800">Created by</div>
                              <div>{club.created_by ?? 'System'}</div>
                            </div>
                            <div>
                              <div className="font-medium text-gray-800">Created at</div>
                              <div>
                                {club.created_at ? new Date(club.created_at).toLocaleString() : '—'}
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <button
                              onClick={() => navigate(`/clubs/${club.id}`)}
                              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors cursor-pointer duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              View More
                            </button>
                            <div className="text-xs text-gray-400">
                              Updated:{' '}
                              {club.updated_at
                                ? new Date(club.updated_at).toLocaleDateString()
                                : '—'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
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
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === number + 1
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
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
          </div>
        </div>
      )}
    </div>
  );
}
