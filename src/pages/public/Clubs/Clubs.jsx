import { useState } from 'react';

export default function Clubs() {
  const [currentPage, setCurrentPage] = useState(1);
  const clubsPerPage = 8; // Display 8 clubs per page

  const clubData = [
    {
      id: 1,
      image: '/img/Club1.png',
      category: 'Technology',
      status: 'Active',
      title: 'Robotics Club',
      description:
        'Build, program, and compete with cutting-edge robotics technology. Join us for workshops and competitions.',
      members: 45,
      events: 5,
    },
    {
      id: 2,
      image: '/img/Club2.png',
      category: 'Academic',
      status: 'Active',
      title: 'Debate Society',
      description:
        'Sharpen your argumentation skills and engage in intellectual discourse with passionate debaters.',
      members: 32,
      events: 3,
    },
    {
      id: 3,
      image: '/img/Club3.png',
      category: 'Arts & Culture',
      status: 'Active',
      title: 'Photography Club',
      description:
        'Capture moments and develop your artistic vision through photography workshops and photo walks.',
      members: 28,
      events: 7,
    },
    {
      id: 4,
      image: '/img/Club1.png',
      category: 'Sports',
      status: 'Active',
      title: 'Basketball Club',
      description:
        'Join our competitive basketball team and participate in inter-university tournaments.',
      members: 22,
      events: 12,
    },
    {
      id: 5,
      image: '/img/Club2.png',
      category: 'Arts & Culture',
      status: 'Active',
      title: 'Drama Society',
      description: 'Express yourself through theater, acting workshops, and dramatic performances.',
      members: 35,
      events: 4,
    },
    {
      id: 6,
      image: '/img/Club3.png',
      category: 'Volunteer',
      status: 'Active',
      title: 'Volunteer Club',
      description:
        'Make a difference in the community through various volunteer and service projects.',
      members: 67,
      events: 15,
    },
    {
      id: 7,
      image: '/img/Club1.png',
      category: 'Academic',
      status: 'Moderate',
      title: 'Chess Club',
      description:
        'Develop strategic thinking and compete in chess tournaments with fellow enthusiasts.',
      members: 18,
      events: 6,
    },
    {
      id: 8,
      image: '/img/Club2.png',
      category: 'Arts & Culture',
      status: 'Active',
      title: 'Music Society',
      description:
        'Share your love for music through performances, jam sessions, and musical collaborations.',
      members: 41,
      events: 8,
    },
    {
      id: 9,
      image: '/img/Club3.png',
      category: 'Technology',
      status: 'Active',
      title: 'Coding Club',
      description: 'Learn and practice various programming languages and algorithms.',
      members: 50,
      events: 10,
    },
    {
      id: 10,
      image: '/img/Club1.png',
      category: 'Sports',
      status: 'Active',
      title: 'Football Club',
      description: 'Join our football team and compete in inter-university tournaments.',
      members: 60,
      events: 10,
    },
    {
      id: 11,
      image: '/img/Club2.png',
      category: 'Academic',
      status: 'Active',
      title: 'Science Club',
      description: 'Explore scientific concepts through experiments and discussions.',
      members: 30,
      events: 5,
    },
    {
      id: 12,
      image: '/img/Club3.png',
      category: 'Arts & Culture',
      status: 'Active',
      title: 'Painting Club',
      description: 'Express your creativity through various painting techniques.',
      members: 25,
      events: 4,
    },
  ];

  // Pagination logic
  const indexOfLastClub = currentPage * clubsPerPage;
  const indexOfFirstClub = indexOfLastClub - clubsPerPage;
  const currentClubs = clubData.slice(indexOfFirstClub, indexOfLastClub);

  const totalPages = Math.ceil(clubData.length / clubsPerPage);

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

      {/* Search and Filters */}
      <div className="flex flex-wrap justify-center gap-4 bg-white p-7 px-22 shadow-md border-b-2 border-gray-300">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search clubs by name, description, or interests..."
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
          id=""
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Categories</option>
          <option value="technology">Technology</option>
          <option value="art">Art</option>
          <option value="sports">Sports</option>
          <option value="music">Music</option>
          <option value="academic">Academic</option>
          <option value="volunteer">Volunteer</option>
        </select>
        <select
          name="clubSize"
          id=""
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Club Size</option>
          <option value="small">Small (10-20)</option>
          <option value="medium">Medium (20-50)</option>
          <option value="large">Large (50+)</option>
        </select>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
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

      {/* Sorting and Club List */}
      <div className="bg-gray-100 p-4 min-h-screen ">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6 px-4 md:px-14">
            <div>
              <p className="text-gray-500">
                Showing <span className="font-bold text-black">{clubData.length}</span> clubs
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-gray-500 mr-2">Sort by:</p>
              <select
                name="sort"
                id=""
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="members-desc">Members (High to Low)</option>
                <option value="members-asc">Members (Low to High)</option>
              </select>
              <div className="flex ml-4">
                <button className="p-2 border border-gray-300 rounded-l-md bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                </button>
                <button className="p-2 border border-gray-300 rounded-r-md bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 17V7m0 10l-4-4m4 4l4-4m-4-4v10m0-10l4 4m-4-4l-4 4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-8 lg:px-4">
            {currentClubs.map((club) => (
              <div
                key={club.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={club.image}
                  alt={club.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      club.category === 'Technology'
                        ? 'bg-blue-100 text-blue-800'
                        : club.category === 'Academic'
                          ? 'bg-green-100 text-green-800'
                          : club.category === 'Arts & Culture'
                            ? 'bg-purple-100 text-purple-800'
                            : club.category === 'Sports'
                              ? 'bg-red-100 text-red-800'
                              : club.category === 'Volunteer'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {club.category}
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
                    {club.status}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{club.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{club.description}</p>
                <div className="flex justify-between text-gray-500 text-sm mb-4">
                  <span>{club.members} members</span>
                  <span>{club.events} events</span>
                </div>
                <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  View More
                </button>
              </div>
            ))}
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
    </div>
  );
}
