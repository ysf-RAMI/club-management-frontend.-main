import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchClubs } from '../../../app/clubSlice';
import { API_BASE_URL } from '../../../config/api';
import Loader from '../../../components/common/UI/Loader';

const FeaturedClubs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clubs, loading, error } = useSelector((state) => state.clubs);

  useEffect(() => {
    dispatch(fetchClubs());
  }, [dispatch]);

  const handleViewMore = (clubId) => {
    navigate(`/clubs/${clubId}`);
  };

  // Get the first 3 clubs for featured section
  const featuredClubs = clubs?.slice(0, 3) || [];

  if (loading) {
    return (
      <section className="bg-white py-20">
        <div className="container mx-auto text-center">
          <Loader size="large" message="Loading featured clubs..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-20">
        <div className="container mx-auto text-center">
          <p className="text-red-600">Failed to load clubs. Please try again later.</p>
        </div>
      </section>
    );
  }

  if (featuredClubs.length === 0) {
    return (
      <section className="bg-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Featured Clubs</h2>
          <p className="text-gray-600">No clubs available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Featured Clubs</h2>
        <p className="text-lg mb-12 px-12">
          Join amazing clubs and connect with like-minded individuals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto px-12">
          {featuredClubs.map((club) => (
            <div key={club.id} className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div>
                <img
                  src={club.image ? `${API_BASE_URL}${club.image}` : '/img/Club1.png'}
                  alt={club.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="bg-white p-4">
                <h3 className="text-xl text-left font-bold mb-4">{club.name}</h3>
                <p className="text-gray-700 text-left line-clamp-3">
                  {club.description || 'No description available.'}
                </p>
                <div className="flex justify-end"></div>
                <div className="flex justify-between py-4">
                  <p className="text-gray-500 text-left">
                    {club.members_count ? `${club.members_count} members` : 'New club'}
                  </p>
                  <p className="text-gray-500 text-right">
                    <span
                      onClick={() => handleViewMore(club.id)}
                      className="text-[#6366f1] cursor-pointer hover:underline"
                    >
                      View More →
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Clubs Button */}
        <div className="mt-12">
          <button
            onClick={() => navigate('/clubs')}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 shadow-lg"
          >
            View All Clubs
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedClubs;
